import { exec } from "node:child_process"
import { copyFile, rm, writeFile } from "node:fs/promises"
import process from "node:process"
import readline from "node:readline"
import { copy } from "fs-extra"
import { MANIFEST_CHROME, MANIFEST_FIREFOX } from "./config"

async function bundle(manifest: Record<string, any>, bundleDirectory: string) {
  try {
    await rm(bundleDirectory, { recursive: true, force: true })
    console.log(`🧹  Cleaned up \`${bundleDirectory}\` directory.`)

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
          process.stdout.write(
            `${spinner}   Building popup and content scripts...`
          )
        }, 250)

        try {
          await runCommand(`cd ./${directory} && bun i && bun run build`)
          clearInterval(intervalId)
          resolve(null)
        } catch (error) {
          clearInterval(intervalId)
          console.error(`Error running build script for ${directory}: ${error}`)
          reject(error)
        }
      })
    }

    // await runBuildScript("entrypoints/popup")
    await runBuildScript("entrypoints/popup2")
    await runBuildScript("entrypoints/content-scripts")

    process.stdout.clearLine(0)
    process.stdout.cursorTo(0)
    console.log("🔥  Built popup and content scripts.")

    // Bundle popup Next.js export
    // await copy("entrypoints/popup/out", `${bundleDirectory}`)
    // console.log(`🚗  Moved export to bundle.`)

    // Bundle popup2 Vite export
    await copy("entrypoints/popup2/dist", `${bundleDirectory}`)
    console.log(`🚗  Moved export to bundle.`)

    // Bundle content-scripts
    await copy("entrypoints/content-scripts/dist", `${bundleDirectory}/dist`)
    console.log(`🚗  Moved content_scripts to bundle.`)

    // Bundle background.ts
    await runCommand(
      `bun build entrypoints/background.ts --outdir='./${bundleDirectory}/'`
    )
    console.log(`🚗  Moved background.ts to bundle.`)

    // Bundle css
    await copy("css", `${bundleDirectory}/css`)
    console.log(`🚗  Moved css to bundle.`)

    // Bundle fonts
    await copy("fonts", `${bundleDirectory}/fonts`)
    console.log(`🚗  Moved fonts to bundle.`)

    // Bundle images
    await copy("images", `${bundleDirectory}/images`)
    console.log(`🚗  Moved images to bundle.`)

    // Create manifest
    await writeFile(
      `${bundleDirectory}/manifest.json`,
      Buffer.from(JSON.stringify(manifest, null, 2)),
      "utf8"
    )

    console.log(`📦  Bundled \`${bundleDirectory}\`.`)

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
        await bundle(MANIFEST_CHROME, "dist/chrome")
        break

      case "Firefox":
        await bundle(MANIFEST_FIREFOX, "dist/firefox")
        break

      default:
        await bundleAll()
    }

    rl.close()
  }
)

rl.on("close", () => {
  process.exit(0)
})
