import type { AllDeps } from "./all-deps";

import { PrismaClient } from "@prisma/client";

import { Config } from "./config/config";

console.log("db", Config);
const db = new PrismaClient();

export const implementations: AllDeps = {
  Deps: {
    saveTodo: async ({ todos }) => {
      const withId = todos.map((todo) => ({
        id: Math.random().toString(36).substring(7),
        title: todo,
        completed: false,
      }));

      // @todo add all or nothing
      await db.todo.createMany({
        data: withId.map((todo) => ({
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
        })),
      });

      return { ok: true, data: withId.map((t) => ({ id: t.id })) };
    },
  },
};
