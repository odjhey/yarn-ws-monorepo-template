import { UserCreatesTodos } from "@repo/core-todo";
import { implementations } from "@repo/database";

import { hello } from "./hello";

const main = async () => {
  hello();
  const myCreate = UserCreatesTodos.userCreatesTodos({
    isAdmin: true,
    username: "juan",
  })({
    saveTodo: implementations.Deps.saveTodo,
  });

  const result = await myCreate({
    todos: ["todo1", "todo2"],
  });

  console.log(JSON.stringify(result, null, 2));
};

main();
