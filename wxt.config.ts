import { defineConfig } from "wxt";
import vue from "@vitejs/plugin-vue";
import unocssVite from "unocss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  imports: {
    addons: {
      vueTemplate: true,
    },
  },
  manifest: {
    permissions: ["storage"],
  },
  runner: {
    startUrls: ["https://web.okjike.com"],
  },
  outDir: "dist",
  vite: () => ({
    plugins: [vue(), unocssVite()],
  }),
});
