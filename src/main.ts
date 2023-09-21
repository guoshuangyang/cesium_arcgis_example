import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import "cesium/Build/Cesium/Widgets/widgets.css"
import "virtual:windi.css"

// 导入element-plus
import ElementPlus from "element-plus"
import "element-plus/theme-chalk/index.css"

window.CESIUM_BASE_URL = import.meta.env.PROD
  ? import.meta.env.BASE_URL + "Cesium"
  : "node_modules/cesium/Build/Cesium/"

const app = createApp(App).use(ElementPlus)
app.mount("#app")
