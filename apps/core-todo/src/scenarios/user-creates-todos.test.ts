import { describe, expect, it } from "vitest";

import { userCreatesTodos } from "./user-creates-todos";

describe("User creates todos", () => {
  const subjectRaw = userCreatesTodos;

  describe("when user is not an admin", () => {
    const subject = subjectRaw({ isAdmin: false, username: "juan" });

    it("should return notAuthorized error", async () => {
      const result = await subject({
        saveTodo: async () => ({ ok: true, data: [{ id: "todo1" }] }),
      })({ todos: ["todo1"] });

      expect(result).toEqual({ ok: false, errorKind: "notAuthorized" });
    });
  });

  describe("when user is an admin", () => {
    const subject = subjectRaw({ isAdmin: true, username: "admin" });

    describe("when saveTodo fails", () => {
      it("should return saveTodo error", async () => {
        const result = await subject({
          saveTodo: async () => ({ ok: false, errorKind: "failed" }),
        })({ todos: ["todo1"] });

        expect(result).toEqual({ ok: false, errorKind: "failed" });
      });
    });

    describe("when saveTodo succeeds", () => {
      it("should return todo ids", async () => {
        const result = await subject({
          saveTodo: async () => ({ ok: true, data: [{ id: "todo1" }] }),
        })({ todos: ["todo1"] });

        expect(result).toEqual({
          ok: true,
          data: { todoIds: [{ id: "todo1" }] },
        });
      });
    });
  });
});
