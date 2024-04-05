<script lang="ts" setup>
  import { onMounted, reactive, ref } from "vue";
  import { browser } from "wxt/browser";
  import { storage } from "wxt/storage";

  onMounted(() => {
    browser.runtime.sendMessage("message!");
  });

  const configRef = reactive<{
    layout?: "waterfall" | "normal";
  }>({ layout: "waterfall" });
</script>

<template>
  <div class="popup-container">
    <form class="form-config-container">
      <div
        v-for="layout in ['waterfall', 'normal']"
        class="form-item"
      >
        <input
          type="radio"
          name="layout"
          :value="layout"
          :id="layout"
          v-model="configRef.layout"
        />
        <label :for="layout">{{ layout }}</label>
      </div>
    </form>

    <!-- <pre>{{ JSON.stringify(configRef, null, 2) }}</pre> -->
  </div>
</template>

<style scoped lang="scss">
  .popup-container {
    width: 200px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;

    > .form-config-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      > .form-item {
        label {
          cursor: pointer;
        }

        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.2rem;

        input {
          margin: 0;
        }
      }
    }

    p {
      font-size: 1rem;
    }
  }
</style>
