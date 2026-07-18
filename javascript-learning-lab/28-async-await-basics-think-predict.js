/*
THINK-PREDICT: Async / Await
*/
async function getData() {
  return 42;
}
getData().then(console.log);

async function run() {
  const v = await getData();
  console.log(v);
}
/*
PREDICT: order of execution vs sync code.
*/
