<script setup lang="ts">
  import { version } from "../../../package.json"
  import MdiToggleSwitch from "./components/icon/MdiToggleSwitch.vue"
  import MdiToggleSwitchOffOutline from "./components/icon/MdiToggleSwitchOffOutline.vue"

  import { useToggle } from "@vueuse/core"

  const [enable, toggleEnable] = useToggle(true)
</script>

<template>
  <div class="p2 w-300px flex flex-col gap-2">
    <div class="box xy-between">
      <div>
        <span class="my-0 font-bold text-xl">okjike-ui</span>
        <span class="mx-1 text-xs op50">v{{ version }}</span>
      </div>
      <div
        class="xy-center w-6 h-6 cursor-pointer"
        @click="toggleEnable()"
      >
        <MdiToggleSwitch
          v-if="enable"
          class="w-100% h-100%"
        />
        <MdiToggleSwitchOffOutline
          v-else
          class="w-100% h-100%"
        />
      </div>
    </div>
    <div class="box flex-1">hello</div>
  </div>
</template>
