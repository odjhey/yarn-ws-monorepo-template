import { hello } from "./hello";

const main = async () => {
  const v = hello({ logger: console });

  console.log("ano pa ba");
  console.log(v);
};

main();
