import { hello } from "./hello";

const main = async () => {
  const v = hello()();

  console.log("ano pa ba");
  console.log(v);
};

main();
