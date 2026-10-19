import { describe, expect, test } from "vitest";
import {
  FIELD_MESSAGES,
  NAME_MAX_LENGTH,
  firstNameOf,
  normalizeName,
  normalizePhone,
  validateContact,
} from "./contact";
import { GOAL_OPTIONS } from "./content";

const VALID = { name: "ישראל ישראלי", phone: "054-345-1727", goal: GOAL_OPTIONS[0] };

describe("normalizeName", () => {
  test("collapses whitespace and strips control characters and angle brackets", () => {
    expect(normalizeName("  דנה\n\t<b>כהן</b>  ")).toBe("דנה bכהן/b");
  });

  test("keeps emoji and mixed scripts", () => {
    expect(normalizeName("Noa 🙂 נועה")).toBe("Noa 🙂 נועה");
  });
});

describe("normalizePhone", () => {
  test("removes spaces, dashes, dots and brackets", () => {
    expect(normalizePhone("(054) 345-17.27")).toBe("0543451727");
  });
});

describe("validateContact", () => {
  test("accepts a complete Israeli submission", () => {
    expect(validateContact(VALID)).toEqual({});
  });

  test("accepts an international number with a plus", () => {
    expect(validateContact({ ...VALID, phone: "+972 54 345 1727" })).toEqual({});
  });

  test("reports every missing field at once", () => {
    expect(validateContact({ name: "  ", phone: "", goal: "" })).toEqual({
      name: FIELD_MESSAGES.nameRequired,
      phone: FIELD_MESSAGES.phoneRequired,
      goal: FIELD_MESSAGES.goalRequired,
    });
  });

  test("rejects a name made only of markup characters", () => {
    expect(validateContact({ ...VALID, name: "<>" }).name).toBe(FIELD_MESSAGES.nameRequired);
  });

  test("rejects a name over the length limit", () => {
    const longName = "א".repeat(NAME_MAX_LENGTH + 1);
    expect(validateContact({ ...VALID, name: longName }).name).toBe(FIELD_MESSAGES.nameTooLong);
  });

  test("rejects malformed and overlong phone numbers", () => {
    expect(validateContact({ ...VALID, phone: "12345" }).phone).toBe(FIELD_MESSAGES.phoneInvalid);
    expect(validateContact({ ...VALID, phone: "05a3451727" }).phone).toBe(FIELD_MESSAGES.phoneInvalid);
    expect(validateContact({ ...VALID, phone: "0".repeat(30) }).phone).toBe(FIELD_MESSAGES.phoneInvalid);
  });

  test("rejects a goal that is not one of the offered options", () => {
    expect(validateContact({ ...VALID, goal: "something else" }).goal).toBe(FIELD_MESSAGES.goalRequired);
  });
});

describe("firstNameOf", () => {
  test("returns the first word of a normalised name", () => {
    expect(firstNameOf("  דנה   כהן ")).toBe("דנה");
  });

  test("returns empty for an empty name", () => {
    expect(firstNameOf("   ")).toBe("");
  });
});
