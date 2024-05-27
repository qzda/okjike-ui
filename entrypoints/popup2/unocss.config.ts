import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from "unocss"

export default defineConfig({
  shortcuts: {
    link: "cursor-pointer select-none transition duration-200 ease-in-out op-75 hover:op-100",
    box: "border border-solid border-gray-200 rd p2 box-border",
    "xy-center": "flex justify-center items-center",
    "xy-between": "flex justify-between items-center",
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        height: "1.2em",
        width: "1.2em",
        "vertical-align": "text-bottom",
      },
    }),
    presetWebFonts({
      provider: "google",
      fonts: {
        mono: ["JetBrains Mono"],
      },
    }),
  ],
})
