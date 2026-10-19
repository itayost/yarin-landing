import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { GOAL_OPTIONS } from "@/lib/content";

const sendMock = vi.fn();
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

const { POST } = await import("./route");

const VALID = { name: "דנה כהן", phone: "054-345-1727", goal: GOAL_OPTIONS[1] };
let ipCounter = 0;

function makeRequest(body: unknown, headers: Record<string, string> = {}): Request {
  ipCounter += 1;
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      host: "localhost:3000",
      "x-forwarded-for": `10.0.0.${ipCounter}`,
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

beforeEach(() => {
  sendMock.mockReset();
  vi.stubEnv("RESEND_API_KEY", "test-key");
  vi.stubEnv("WEBHOOK_URL", "");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("POST /api/contact", () => {
  test("delivers a valid lead by email and reports success", async () => {
    sendMock.mockResolvedValue({ data: { id: "1" }, error: null });

    const res = await POST(makeRequest(VALID));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(sendMock).toHaveBeenCalledOnce();
    expect(sendMock.mock.calls[0][0].subject).toContain("דנה כהן");
  });

  test("returns 400 bad_request for malformed JSON", async () => {
    const res = await POST(makeRequest("{not json"));

    expect(res.status).toBe(400);
    expect((await res.json()).error.code).toBe("bad_request");
  });

  test("returns field errors when fields are not strings", async () => {
    const res = await POST(makeRequest({ name: 42, phone: ["x"], goal: null }));

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error.code).toBe("invalid_input");
    expect(Object.keys(body.error.fields)).toEqual(["name", "phone", "goal"]);
  });

  test("returns field errors for an invalid phone", async () => {
    const res = await POST(makeRequest({ ...VALID, phone: "123" }));

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error.code).toBe("invalid_input");
    expect(body.error.fields).toHaveProperty("phone");
    expect(sendMock).not.toHaveBeenCalled();
  });

  test("rejects a cross-origin request", async () => {
    const res = await POST(makeRequest(VALID, { origin: "https://evil.example" }));

    expect(res.status).toBe(403);
    expect(sendMock).not.toHaveBeenCalled();
  });

  test("rejects an oversized body", async () => {
    const res = await POST(makeRequest({ ...VALID, padding: "x".repeat(10_000) }));

    expect(res.status).toBe(413);
  });

  test("rejects an oversized streamed body that has no Content-Length", async () => {
    const chunk = new TextEncoder().encode("x".repeat(1_024));
    let pulled = 0;
    const stream = new ReadableStream<Uint8Array>({
      pull(controller) {
        pulled += 1;
        if (pulled > 1_000) controller.close();
        else controller.enqueue(chunk);
      },
    });
    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", host: "localhost:3000", "x-forwarded-for": "198.51.100.7" },
      body: stream,
      duplex: "half",
    } as RequestInit);

    const res = await POST(request);

    expect(request.headers.get("content-length")).toBeNull();
    expect(res.status).toBe(413);
    /* stopped reading soon after the cap instead of buffering ~1 MB */
    expect(pulled).toBeLessThan(10);
  });

  test("accepts and drops a filled honeypot, logging the drop", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    const res = await POST(makeRequest({ ...VALID, hp_check: "Spam Inc" }));

    expect(res.status).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledWith("Contact form: honeypot filled, submission dropped");
  });

  test("still delivers a lead whose browser autofilled a company field", async () => {
    sendMock.mockResolvedValue({ data: { id: "1" }, error: null });

    const res = await POST(makeRequest({ ...VALID, company: "ItayOst", hp_check: "" }));

    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledOnce();
  });

  test("reports delivery_failed when Resend returns an error and nothing else is set", async () => {
    sendMock.mockResolvedValue({ data: null, error: { name: "validation_error", message: "bad from" } });
    vi.spyOn(console, "error").mockImplementation(() => {});

    const res = await POST(makeRequest(VALID));

    expect(res.status).toBe(502);
    expect((await res.json()).error.code).toBe("delivery_failed");
  });

  test("succeeds through the webhook when email fails", async () => {
    sendMock.mockResolvedValue({ data: null, error: { name: "api_error", message: "down" } });
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubEnv("WEBHOOK_URL", "https://hooks.example/lead");
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const res = await POST(makeRequest(VALID));

    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  test("returns 503 in production when no delivery channel is configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("NODE_ENV", "production");
    vi.spyOn(console, "error").mockImplementation(() => {});

    const res = await POST(makeRequest(VALID));

    expect(res.status).toBe(503);
    expect((await res.json()).error.code).toBe("delivery_failed");
  });

  test("accepts without a channel outside production so the form can be tried locally", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("NODE_ENV", "development");
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const res = await POST(makeRequest(VALID));

    expect(res.status).toBe(200);
  });

  test("rate limits a sixth request from the same address within a minute", async () => {
    sendMock.mockResolvedValue({ data: { id: "1" }, error: null });
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) {
      const res = await POST(makeRequest(VALID, { "x-forwarded-for": "203.0.113.9" }));
      statuses.push(res.status);
    }

    expect(statuses).toEqual([200, 200, 200, 200, 200, 429]);
  });
});
