import { UserCreatesTodos } from "@repo/core-todo";
import { PrismaImplementations } from "@repo/database";

import { hello } from "./hello";

const main = async () => {
  hello();
  const myCreate = UserCreatesTodos.userCreatesTodos({
    isAdmin: true,
    username: "juan",
  })(PrismaImplementations);

  const result = await myCreate({
    todos: ["todo1", "todoalskjdf2"],
  });

  console.log(JSON.stringify(result, null, 2));
};

main();
