import prolog from "@qzda/prolog"
import { name, version } from "../package.json"

export function log(...arg: any[]) {
  console.log(prolog.bgBlack(prolog.brightYellow(`${name} ${version}`)), ...arg)
}
