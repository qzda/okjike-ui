import prolog from "@qzda/prolog";
import { name, version } from "../package.json";

export function log(...arg: any[]) {
  console.log(
    prolog.bgBlack(prolog.brightYellow(`${name} ${version}`)),
    ...arg
  );
}

export function devLog(...arg: any[]) {
  if (process.env.NODE_ENV === "dev") {
    log(...arg);
  }
}
