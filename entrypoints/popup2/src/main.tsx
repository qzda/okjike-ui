import React from "react"
import ReactDOM from "react-dom/client"
import { ConfigProvider } from "antd"

import "uno.css"

import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#fbe54f",
          fontSize: 12,
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
