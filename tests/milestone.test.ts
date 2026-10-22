import { describe, it, expect } from "vitest";
import { isMilestoneReached } from "../src/lib/price";

describe("isMilestoneReached", () => {
  it("returns true at exact 2x", () => {
    expect(isMilestoneReached(0.001, 0.002, 2)).toBe(true);
  });

  it("returns true above 2x", () => {
    expect(isMilestoneReached(1, 2.5, 2)).toBe(true);
  });

  it("returns false below 2x", () => {
    expect(isMilestoneReached(1, 1.99, 2)).toBe(false);
  });

  it("returns false for zero/negative", () => {
    expect(isMilestoneReached(0, 1, 2)).toBe(false);
    expect(isMilestoneReached(1, 0, 2)).toBe(false);
  });
});
