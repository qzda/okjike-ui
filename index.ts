import { exec } from "node:child_process";
import { rm, writeFile } from "node:fs/promises";
import process from "node:process";
import readline from "node:readline";
import { copy, mkdir } from "fs-extra";
import admZip from "adm-zip";
import prolog from "@qzda/prolog";
import { MANIFEST_CHROME, MANIFEST_FIREFOX } from "./config";
import { version } from "./package.json";
import userScriptConfig from "./entrypoints/user-script/user-script.config";

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

function runBuildScript(directory: string) {
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
      await runCommand(`cd ./${directory} && bun i && bun run build `);
      clearInterval(intervalId);
      resolve(null);
    } catch (error) {
      clearInterval(intervalId);
      console.error(`Error running build script for ${directory}: ${error}`);
      reject(error);
    } finally {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
    }
  });
}

async function bundle(manifest: Record<string, any>, bundleDirectory: string) {
  try {
    await rm(bundleDirectory, { recursive: true, force: true });
    console.log(`🧹  Cleaned up ${prolog.cyan(bundleDirectory)} directory.`);

    console.log("🔥  Built popup and content scripts.");

    // Bundle popup Vite export
    await runBuildScript("entrypoints/popup");
    await copy("entrypoints/popup/dist", `${bundleDirectory}`);
    console.log(
      `🚗  Moved popup export\t\t=> ${prolog.cyan(
        `${bundleDirectory}/index.html`
      )}`
    );

    // Bundle content-scripts
    await runBuildScript("entrypoints/content-scripts");
    await copy(
      "entrypoints/content-scripts/dist",
      `${bundleDirectory}/content-scripts`
    );
    console.log(
      `🚗  Moved content-scripts\t=> ${prolog.cyan(
        `${bundleDirectory}/content-scripts`
      )}`
    );

    // Bundle background.ts
    await runBuildScript("entrypoints/background");
    await copy("entrypoints/background/dist", `${bundleDirectory}/background`);
    console.log(
      `🚗  Moved background\t\t=> ${prolog.cyan(
        `${bundleDirectory}/background`
      )}`
    );

    // Bundle css
    await copy("css", `${bundleDirectory}/css`);
    console.log(
      `🚗  Moved css\t\t\t=> ${prolog.cyan(`${bundleDirectory}/css`)}`
    );

    // Bundle images
    await copy("images", `${bundleDirectory}/images`);
    console.log(
      `🚗  Moved images\t\t=> ${prolog.cyan(`${bundleDirectory}/images`)}`
    );

    // Create manifest
    await writeFile(
      `${bundleDirectory}/manifest.json`,
      Buffer.from(JSON.stringify(manifest, null, 2)),
      "utf8"
    );
    console.log(
      `🚗  Moved manifest.json\t\t=> ${prolog.cyan(
        `${bundleDirectory}/manifest.json`
      )}`
    );

    console.log(`📦  Bundled\t\t\t=> ${prolog.cyan(bundleDirectory)}`);

    const zip = new admZip();
    zip.addLocalFolder(`${bundleDirectory}`);
    zip.writeZip(`${bundleDirectory}.zip`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    console.log(
      `📦  Compressed\t\t\t=> ${prolog.cyan(`${bundleDirectory}.zip`)}`
    );

    console.log();
  } catch (error) {
    console.error(error);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function buildChrome() {
  await bundle(MANIFEST_CHROME, `dist/chrome-${version}`);
}

async function buildFirefox() {
  await bundle(MANIFEST_FIREFOX, `dist/firefox-${version}`);
}

async function buildUserScript() {
  const userScriptBuildPath = `dist/user-script-${version}`;
  await rm(userScriptBuildPath, { recursive: true, force: true });
  console.log(`🧹  Cleaned up ${prolog.cyan(userScriptBuildPath)} directory.`);
  console.log("🔥  Built user-script.");
  const { stdout } = await runCommand(
    "cd entrypoints/user-script && bun build --target=browser ./index.ts "
  );
  const userScriptLines: string[] = ["// ==UserScript=="];
  Object.entries(userScriptConfig).map(([key, value]) => {
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

  await mkdir(userScriptBuildPath);
  await writeFile(
    `${userScriptBuildPath}/index.js`,
    Buffer.from(userScriptLines.join("\n")),
    "utf8"
  );
  console.log(
    `📦  Bundled\t\t\t=> ${prolog.cyan(`${userScriptBuildPath}/index.js`)}`
  );

  const zip = new admZip();
  zip.addLocalFolder(`${userScriptBuildPath}`);
  zip.writeZip(`${userScriptBuildPath}.zip`, (err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log(
    `📦  Compressed\t\t\t=> ${prolog.cyan(`${userScriptBuildPath}.zip`)}`
  );

  console.log();
}

rl.question(
  "Which browser would you like to build for? [All / Chrome / Firefox / UserScript] ",
  async (browser) => {
    switch (browser) {
      case "Chrome":
      case "chrome":
      case "c":
        await buildChrome();
        break;

      case "Firefox":
      case "firefox":
      case "f":
        await buildFirefox();
        break;

      case "UserScript":
      case "userscript":
      case "u":
        await buildUserScript();
        break;

      case "All":
      case "all":
      case "a":
      default:
        await buildChrome();
        await buildFirefox();
        await buildUserScript();
    }

    rl.close();
  }
);

rl.on("close", () => {
  process.exit(0);
});
