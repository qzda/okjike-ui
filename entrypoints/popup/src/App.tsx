import { useEffect, useState } from "react"
import { InputNumber, Radio, Switch } from "antd"

import { version } from "../../../package.json"
import { getStorage, setStorage } from "../../../utils/chromeStorage"
import {
  AllSettingsKeys,
  KeyExtensionStatus,
  KeyTimelineLayout,
  KeyTimelineWidth,
  KeyTimelinePostAlign,
  KeyHiddenSidebar,
} from "../../../storageKeys"
import { CarbonLogoGithub } from "./components/CarbonLogoGithub"

export default function App() {
  const [devMode, setDevMode] = useState<boolean>(false)

  const [enable, setEnable] = useState<boolean>()
  const [hiddenSidebar, setHiddenSidebar] = useState<boolean>()
  const [enableTimelinePostAlign, setEnableTimelinePostAlign] =
    useState<boolean>()

  const [allSettings, setAllSettings] = useState<
    Record<string, string | number>
  >({})
  useEffect(() => {
    setEnable(allSettings[KeyExtensionStatus] === "on")
    setHiddenSidebar(allSettings[KeyHiddenSidebar] === "on")
    setEnableTimelinePostAlign(allSettings[KeyTimelinePostAlign] === "on")
  }, [allSettings])

  function updateAllSettings() {
    getStorage(AllSettingsKeys).then((val) => {
      setAllSettings(val)
    })
  }

  function changeKeyExtensionStatus() {
    setStorage({
      [KeyExtensionStatus]: enable ? "off" : "on",
    }).then(() => {
      updateAllSettings()
    })
  }

  function changeKeyTimelineWidth(w: number) {
    setStorage({
      [KeyTimelineWidth]: w,
    }).then(() => {
      updateAllSettings()
    })
  }

  function changeKeyTimelineLayout(layout: string) {
    setStorage({
      [KeyTimelineLayout]: layout,
      // [KeyHiddenSidebar]: layout === "waterfall" ? "on" : "off",
    }).then(() => {
      updateAllSettings()
    })
  }

  function changeKeyTimelinePostAlign(b: boolean) {
    setStorage({
      [KeyTimelinePostAlign]: b ? "on" : "off",
    }).then(() => {
      updateAllSettings()
    })
  }

  function changeKeyHiddenSidebar(b: boolean) {
    setStorage({
      [KeyHiddenSidebar]: b ? "on" : "off",
    }).then(() => {
      updateAllSettings()
    })
  }

  useEffect(() => {
    updateAllSettings()
  }, [])

  return (
    <div className="p2 w-300px flex flex-col gap-2 select-none text-base">
      <div className="box xy-between">
        <div className="xy-center">
          <span className="font-bold text-xl">okjike-ui</span>
          <span
            className="ml-2 text-xs op50 cursor-pointer"
            onDoubleClick={() => {
              setDevMode(!devMode)
            }}
          >
            v{version}
          </span>
          <a
            href="https://github.com/qzda/okjike-ui"
            target="_blank"
            className="ml-2 color-inherit flex"
          >
            <CarbonLogoGithub />
          </a>
        </div>
        <Switch
          value={enable}
          onChange={changeKeyExtensionStatus}
        />
      </div>
      <div className="box flex flex-col gap2">
        <div className="xy-between">
          <div>时间线宽度</div>
          <InputNumber
            className="w-100px"
            min={500}
            controls={false}
            addonAfter={"px"}
            value={allSettings[KeyTimelineWidth]}
            onChange={(v) => {
              if (v) {
                changeKeyTimelineWidth(+v >> 0)
              }
            }}
          />
        </div>
        <div className="xy-between">
          <div>内容与头像对齐</div>
          <Switch
            value={enableTimelinePostAlign}
            onChange={changeKeyTimelinePostAlign}
          />
        </div>
      </div>
      <div className="box flex flex-col gap2">
        {/* 布局 */}
        <div className="xy-between">
          <div>布局</div>
          <Radio.Group
            options={[
              { label: "默认", value: "default" },
              { label: "瀑布流", value: "waterfall" },
            ]}
            optionType="button"
            value={allSettings[KeyTimelineLayout]}
            onChange={(e) => {
              changeKeyTimelineLayout(e.target.value)
            }}
          />
        </div>
        {/* 侧边栏 */}
        <div className="xy-between">
          <div>隐藏侧边栏</div>
          <Switch
            value={hiddenSidebar}
            onChange={changeKeyHiddenSidebar}
          />
        </div>
      </div>
      <div
        className="box"
        hidden={!devMode}
      >
        <pre className="m0 text-xs select-text overflow-auto">
          {JSON.stringify(allSettings, null, 2)}
        </pre>
      </div>
    </div>
  )
}
