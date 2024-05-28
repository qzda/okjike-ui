import { useEffect, useState } from "react"
import { Input, InputNumber, Radio, Switch } from "antd"

import { version } from "../../../package.json"
import { getStorage, setStorage } from "../../../utils/chromeStorage"
import {
  AllSettingsKeys,
  KeyExtensionStatus,
  KeyTimelineWidth,
} from "../../../storage-keys"

export default function App() {
  const [enable, setEnable] = useState<boolean>()
  const [allSettings, setAllSettings] = useState<
    Record<string, string | number>
  >({})
  useEffect(() => {
    setEnable(allSettings[KeyExtensionStatus] === "on")
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

  useEffect(() => {
    updateAllSettings()
  }, [])

  return (
    <div className="p2 w-300px flex flex-col gap-2">
      <div className="box xy-between">
        <div>
          <span className="font-bold text-xl">okjike-ui</span>
          <span className="mx-1 text-xs op50">v{version}</span>
        </div>
        <Switch
          value={enable}
          onChange={changeKeyExtensionStatus}
        />
      </div>
      <div className="box flex flex-col gap2">
        <div className="xy-between">
          <div>时间线</div>
          <InputNumber
            className="w-100px"
            min={500}
            max={1400}
            step={1}
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
          <div>布局</div>
          <Radio.Group
            options={[
              { label: "默认", value: "default" },
              { label: "瀑布流", value: "waterfall" },
            ]}
            optionType="button"
          />
        </div>
      </div>
      <div className="box">
        <pre>{JSON.stringify(allSettings, null, 2)}</pre>
      </div>
    </div>
  )
}
