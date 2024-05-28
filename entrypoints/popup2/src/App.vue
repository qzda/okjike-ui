<script setup lang="ts">
  import { version } from "../../../package.json"
  import MdiToggleSwitch from "./components/icon/MdiToggleSwitch.vue"
  import MdiToggleSwitchOffOutline from "./components/icon/MdiToggleSwitchOffOutline.vue"

  import { useToggle } from "@vueuse/core"
  import {
    AllSettingsKeys,
    KeyExtensionStatus,
    KeyTimelineWidth,
  } from "../../../storage-keys"
  import { getStorage, setStorage } from "../../../utils/chromeStorage"
  import { onMounted, ref, watch } from "vue"

  const [enable, toggleEnable] = useToggle()
  const allSettings = ref<Record<string, string | number>>()
  watch(allSettings, (_allSettings) => {
    toggleEnable(_allSettings?.[KeyExtensionStatus] === "on")
  })

  function updateAllSettings() {
    getStorage(AllSettingsKeys).then((val) => {
      allSettings.value = val
    })
  }

  function changeKeyExtensionStatus() {
    setStorage({
      [KeyExtensionStatus]: enable.value ? "off" : "on",
    }).then(() => {
      updateAllSettings()
    })
  }

  function changeKeyTimelineWidth(e: Event) {
    const w = +(e.target as HTMLInputElement).value
    setStorage({
      [KeyTimelineWidth]: Math.max(500, Math.min(w, 1000)),
    }).then(() => {
      updateAllSettings()
    })
  }

  onMounted(() => {
    updateAllSettings()
  })
</script>

<template>
  <div class="p2 w-300px flex flex-col gap-2">
    <div class="box xy-between">
      <div>
        <span class="font-bold text-xl">okjike-ui</span>
        <span class="mx-1 text-xs op50">v{{ version }}</span>
      </div>
      <div
        class="xy-center w-6 h-6 cursor-pointer c-#fbe54f"
        @click="changeKeyExtensionStatus()"
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
    <div class="box xy-between">
      <div>时间线</div>
      <div>
        <input
          class="w-50px outline-none box p1 mx-1 text-align-end"
          type="number"
          :value="allSettings?.[KeyTimelineWidth]"
          @change="changeKeyTimelineWidth"
        />
        <span class="text-xs op50">px</span>
      </div>
    </div>
    <div class="box">
      <pre>{{ JSON.stringify(allSettings, null, 2) }}</pre>
    </div>
  </div>
</template>
