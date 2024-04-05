// entrypoints/example-ui.content/index.ts
import { createApp } from "vue";
import Content from "../components/Content.vue";

export default defineContentScript({
  matches: ["https://web.okjike.com/*"],

  main(ctx) {
    console.log("Hello content.", browser.runtime.id);

    const ui = createIntegratedUi(ctx, {
      position: "inline",
      onMount: (container) => {
        // Create the app and mount it to the UI container
        const app = createApp(Content);

        // hidden original element
        const originalElement =
          document.querySelector<HTMLDivElement>("body > div");
        if (originalElement) {
          originalElement.style.setProperty("opacity", "0.3");
        }
        app.mount(container);
        return app;
      },
      onRemove: (app) => {
        // Unmount the app when the UI is removed
        app?.unmount();
      },
    });

    // Call mount to add the UI to the DOM
    ui.mount();
  },
});
