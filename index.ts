import { exec } from "node:child_process"
import { rm, writeFile } from "node:fs/promises"
import process from "node:process"
import readline from "node:readline"
import { copy } from "fs-extra"
import { MANIFEST_CHROME, MANIFEST_FIREFOX } from "./config"
import { logColorCyan } from "./utils/log"

function runCommand(command: string, yes?: boolean) {
  return new Promise((resolve, reject) => {
    exec(yes ? `echo "y" | ${command}` : command, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      } else {
        resolve({ stdout, stderr })
      }
    })
  })
}

function runBuildScript(directory: string) {
  return new Promise(async (resolve, reject) => {
    const P = ["\\", "|", "/", "-"]
    let spinner = "\\"
    const intervalId = setInterval(() => {
      process.stdout.clearLine(0)
      process.stdout.cursorTo(0)
      spinner = P[P.indexOf(spinner) + 1] || P[0]
      process.stdout.write(`${spinner}   Building popup and content scripts...`)
    }, 250)

    try {
      await runCommand(`cd ./${directory} && bun i && bun run build`)
      clearInterval(intervalId)
      resolve(null)
    } catch (error) {
      clearInterval(intervalId)
      console.error(`Error running build script for ${directory}: ${error}`)
      reject(error)
    } finally {
      process.stdout.clearLine(0)
      process.stdout.cursorTo(0)
    }
  })
}

async function bundle(manifest: Record<string, any>, bundleDirectory: string) {
  try {
    await rm(bundleDirectory, { recursive: true, force: true })
    console.log(`🧹  Cleaned up ${logColorCyan(bundleDirectory)} directory.`)

    console.log("🔥  Built popup and content scripts.")

    // Bundle popup Vite export
    await runBuildScript("entrypoints/popup")
    await copy("entrypoints/popup/dist", `${bundleDirectory}`)
    console.log(
      `🚗  Moved popup export\t\t=> ${logColorCyan(
        `${bundleDirectory}/index.html`
      )}`
    )

    // Bundle content-scripts
    await runBuildScript("entrypoints/content-scripts")
    await copy(
      "entrypoints/content-scripts/dist",
      `${bundleDirectory}/content-scripts`
    )
    console.log(
      `🚗  Moved content-scripts\t=> ${logColorCyan(
        `${bundleDirectory}/content-scripts`
      )}`
    )

    // Bundle background.ts
    await runBuildScript("entrypoints/background")
    await copy("entrypoints/background/dist", `${bundleDirectory}/background`)
    console.log(
      `🚗  Moved background\t\t=> ${logColorCyan(
        `${bundleDirectory}/background`
      )}`
    )

    // Bundle css
    await copy("css", `${bundleDirectory}/css`)
    console.log(
      `🚗  Moved css\t\t\t=> ${logColorCyan(`${bundleDirectory}/css`)}`
    )

    // Bundle images
    await copy("images", `${bundleDirectory}/images`)
    console.log(
      `🚗  Moved images\t\t=> ${logColorCyan(`${bundleDirectory}/images`)}`
    )

    // Create manifest
    await writeFile(
      `${bundleDirectory}/manifest.json`,
      Buffer.from(JSON.stringify(manifest, null, 2)),
      "utf8"
    )
    console.log(
      `🚗  Moved manifest.json\t\t=> ${logColorCyan(
        `${bundleDirectory}/manifest.json`
      )}`
    )

    console.log(`📦  Bundled\t\t\t=> ${logColorCyan(bundleDirectory)}`)

    // todo: zip

    console.log()
  } catch (error) {
    console.error(error)
  }
}

async function bundleAll() {
  await bundle(MANIFEST_CHROME, "dist/chrome")
  await bundle(MANIFEST_FIREFOX, "dist/firefox")
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question(
  "Which browser would you like to build for? [All / Chrome / Firefox] ",
  async (browser) => {
    switch (browser) {
      case "Chrome":
      case "chrome":
      case "c":
        await bundle(MANIFEST_CHROME, "dist/chrome")
        break

      case "Firefox":
      case "firefox":
      case "f":
        await bundle(MANIFEST_FIREFOX, "dist/firefox")
        break

      case "All":
      case "all":
      case "a":
      default:
        await bundleAll()
    }

    rl.close()
  }
)

rl.on("close", () => {
  process.exit(0)
})
