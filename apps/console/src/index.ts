import { UserCreatesTodos } from "@repo/core-todo";

import { hello } from "./hello";

const main = async () => {
  hello();
  const myCreate = UserCreatesTodos.userCreatesTodos({
    isAdmin: true,
    username: "juan",
  })({
    saveTodo: async ({ username: _, todos }) => ({
      ok: true,
      data: todos.map((todo) => ({ id: "idddd___" + todo })),
    }),
  });

  const result = await myCreate({
    todos: ["todo1", "todo2"],
  });

  console.log(JSON.stringify(result, null, 2));
};

main();
