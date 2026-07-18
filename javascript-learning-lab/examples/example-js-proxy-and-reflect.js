/*
Example: Proxy and Reflect for Meta-programming
*/

const user = { name: "Alex" };

const proxied = new Proxy(user, {
  get(target, prop, receiver) {
    console.log("Getting", prop);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value) {
    if (prop === "age" && typeof value !== "number") throw new TypeError();
    return Reflect.set(target, prop, value);
  }
});

/*
Proxy lets you intercept fundamental operations on objects. Reflect provides the default behavior so you don't have to re-implement everything.

Common uses: validation on property sets, logging access, creating reactive objects (Vue 3), and building ORM-like APIs.

A junior should know proxies exist and reach for them only when simpler approaches are insufficient, because they can make code harder to reason about.
*/
