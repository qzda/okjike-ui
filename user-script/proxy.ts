import { log } from "../utils/log";

const postsProxy = new Proxy(new Array<any>(), {
  set: (t, p, v) => {
    // if (p === "length") {
    log("postsProxy set", t, p, v);
    // }
    t[p] = v;
    return true;
  },
});
postsProxy.push(1);
delete postsProxy[postsProxy.length - 1];
postsProxy.pop();
