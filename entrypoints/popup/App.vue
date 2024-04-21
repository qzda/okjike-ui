<script lang="ts" setup>
  import { onMounted, reactive, ref } from "vue";
  import { useDark, useToggle } from "@vueuse/core";

  const isDark = useDark();

  const Layout = ["waterfall", "normal"] as const;

  const configRef = reactive<{
    layout?: (typeof Layout)[number];
  }>({ layout: "waterfall" });
</script>
<template>
  <div
    class="font-sans text-gray-700 dark:text-gray-200 dark:bg-dark w-300px p-2"
  >
    <div>
      <h3 class="m-0">Theme:</h3>
      <div class="flex gap-2">
        <span
          @click="isDark = false"
          class="flex gap-1 items-center cursor-pointer"
        >
          <input
            class="m-0"
            type="radio"
            name="theme"
            title="theme"
            :checked="!isDark"
          />light
        </span>
        <span
          @click="isDark = true"
          class="flex gap-1 items-center cursor-pointer"
        >
          <input
            class="m-0"
            type="radio"
            name="theme"
            title="theme"
            :checked="isDark"
          />dark
        </span>
      </div>
    </div>

    <div>
      <h3 class="m-0">Layout:</h3>
      <div class="flex gap-2">
        <span
          v-for="layout in Layout"
          @click="configRef.layout = layout"
          class="flex gap-1 items-center cursor-pointer"
        >
          <input
            class="m-0"
            type="radio"
            name="layout"
            :title="layout"
            :checked="configRef.layout === layout"
          />{{ layout }}
        </span>
      </div>
    </div>
    <pre class="font-mono text-3 m-0 p-2 bg-gray-200">{{
      JSON.stringify(configRef, null, 2)
    }}</pre>
  </div>
</template>
