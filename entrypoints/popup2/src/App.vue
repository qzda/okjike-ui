<script setup lang="ts">
  import { version } from "../../../package.json"
  import MdiToggleSwitch from "./components/icon/MdiToggleSwitch.vue"
  import MdiToggleSwitchOffOutline from "./components/icon/MdiToggleSwitchOffOutline.vue"

  import { useToggle } from "@vueuse/core"
  import { AllSettingsKeys } from "../../../storage-keys"
  import { getStorage } from "../../../utils/chromeStorage"
  import { onMounted, ref } from "vue"

  const [enable, toggleEnable] = useToggle(true)
  const allSettings = ref<Record<string, string | number>>()
  onMounted(() => {
    getStorage(AllSettingsKeys).then((val) => {
      allSettings.value = val
    })
  })
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
    <div class="box flex-1">
      <pre>{{ JSON.stringify(allSettings, null, 2) }}</pre>
    </div>
  </div>
</template>
