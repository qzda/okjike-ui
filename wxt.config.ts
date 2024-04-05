import { defineConfig } from "wxt";
import vue from "@vitejs/plugin-vue";

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
    chromiumArgs: ["--user-data-dir"],
  },
  outDir: "dist",
  vite: () => ({
    plugins: [vue()],
  }),
});
