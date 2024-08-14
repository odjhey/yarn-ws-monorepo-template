import { describe, expect, it } from "vitest";

import { NoopLogger } from "@repo/cross-concerns";

import { hello, hello2, hello2async } from "./hello";

describe("hello", () => {
  const subject = () => hello({ logger: NoopLogger() });

  it("should be curryable", () => {
    expect(subject()).toBe("world");
  });
});

describe("hello2", () => {
  const subject = hello2({ logger: NoopLogger() });

  it("should be curryable", () => {
    expect(subject({ someargs: "--halaka" })).toBe("world--halaka");
  });
});

describe("async hello2", () => {
  const subject = hello2async({ logger: NoopLogger() });

  it("should be curryable", async () => {
    expect(await subject({ someargs: "--halaka" })).toBe("world--halaka");
  });
});
