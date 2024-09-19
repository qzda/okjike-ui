import { exec } from "node:child_process";
import { rm, writeFile } from "node:fs/promises";
import process from "node:process";
import { mkdir } from "fs-extra";
import prolog from "@qzda/prolog";
import { name } from "./package.json";
import { UserScriptConfig } from "./config";
import { isDev } from "./utils/dev";

function runCommand(
  command: string,
  yes?: boolean
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(yes ? `echo "y" | ${command}` : command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

function runScript(func: () => any) {
  return new Promise(async (resolve, reject) => {
    const P = "⌛⏳";
    let spinner = P[0];
    const intervalId = setInterval(() => {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      spinner = P[P.indexOf(spinner) + 1] || P[0];
      process.stdout.write(`${spinner}  Building popup and content scripts...`);
    }, 250);

    try {
      await func();
      clearInterval(intervalId);
      resolve(null);
    } catch (error) {
      clearInterval(intervalId);
      console.error(error);
      reject(error);
    } finally {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
    }
  });
}

async function buildUserScript() {
  const userScriptBuildPath = `dist`;
  await rm(userScriptBuildPath, { recursive: true, force: true });
  console.log(`🧹  Cleaned up ${prolog.cyan(userScriptBuildPath)} directory.`);
  console.log("🔥  Built user-script.");
  const { stdout } = await runCommand(
    isDev
      ? "cd ./user-script && bun build --target=browser ./index.ts "
      : "cd ./user-script && bun build --target=browser ./index.ts "
  );
  const userScriptLines: string[] = ["// ==UserScript=="];
  Object.entries(UserScriptConfig).map(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        userScriptLines.push(`// @${key} ${v}`);
      });
    } else {
      userScriptLines.push(`// @${key} ${value}`);
    }
  });
  userScriptLines.push("// ==/UserScript==");
  userScriptLines.push("");
  userScriptLines.push(stdout);

  await mkdir(userScriptBuildPath, {
    recursive: true,
  });
  const buildFilePath = `${userScriptBuildPath}/${name}.user.js`;
  await writeFile(
    buildFilePath,
    Buffer.from(userScriptLines.join("\n")),
    "utf8"
  );
  console.log(`📦  Bundled\t=> ${prolog.cyan(buildFilePath)}`);

  // const zip = new admZip();
  // zip.addLocalFolder(`${userScriptBuildPath}`);
  // zip.writeZip(`${userScriptBuildPath}.zip`, (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  // console.log(
  //   `📦  Compressed\t=> ${prolog.cyan(`${userScriptBuildPath}.zip`)}`
  // );

  console.log();
}

runScript(buildUserScript);
