import { describe, expect, test, vi } from "vitest";
import { submitContact } from "./contact-client";
import { GOAL_OPTIONS } from "./content";

const PAYLOAD = { name: "דנה", phone: "0543451727", goal: GOAL_OPTIONS[0], hp_check: "" };
const online = () => true;

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

describe("submitContact", () => {
  test("returns ok on success", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse(200, { success: true }));

    expect(await submitContact(PAYLOAD, { fetchImpl, isOnline: online })).toEqual({ ok: true });
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body)).toEqual(PAYLOAD);
  });

  test("short-circuits when the browser is offline", async () => {
    const fetchImpl = vi.fn();

    const result = await submitContact(PAYLOAD, { fetchImpl, isOnline: () => false });

    expect(result).toEqual({ ok: false, reason: "offline" });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  test("maps 429 to rate_limited", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(
      jsonResponse(429, { success: false, error: { code: "rate_limited" } })
    );

    expect(await submitContact(PAYLOAD, { fetchImpl, isOnline: online })).toEqual({
      ok: false,
      reason: "rate_limited",
    });
  });

  test("passes server field errors through", async () => {
    const fields = { phone: "מספר הטלפון לא תקין" };
    const fetchImpl = vi.fn().mockResolvedValue(
      jsonResponse(400, { success: false, error: { code: "invalid_input", fields } })
    );

    expect(await submitContact(PAYLOAD, { fetchImpl, isOnline: online })).toEqual({
      ok: false,
      reason: "invalid",
      fields,
    });
  });

  test("maps 5xx and unreadable bodies to server", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response("<html>oops</html>", { status: 502 }));

    expect(await submitContact(PAYLOAD, { fetchImpl, isOnline: online })).toEqual({
      ok: false,
      reason: "server",
    });
  });

  test("aborts and reports timeout when the server hangs", async () => {
    const fetchImpl = vi.fn(
      (_url: string, init: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
        })
    );

    const result = await submitContact(PAYLOAD, { fetchImpl: fetchImpl as typeof fetch, timeoutMs: 20, isOnline: online });

    expect(result).toEqual({ ok: false, reason: "timeout" });
  });

  test("reports offline when the request fails after the connection drops", async () => {
    let connected = true;
    const fetchImpl = vi.fn().mockImplementation(() => {
      connected = false;
      return Promise.reject(new TypeError("Failed to fetch"));
    });

    const result = await submitContact(PAYLOAD, { fetchImpl, isOnline: () => connected });

    expect(result).toEqual({ ok: false, reason: "offline" });
  });
});
