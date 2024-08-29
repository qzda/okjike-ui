import prolog from "@qzda/prolog";
import { name, version } from "../package.json";
import { isDev } from "./dev";

export function log(...arg: any[]) {
  console.log(
    prolog.bgBlack(prolog.brightYellow(`${name} ${version}`)),
    ...arg
  );
}

export function devLog(...arg: any[]) {
  if (isDev) {
    log(...arg);
  }
}
