import { PluginOption, defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { viteStaticCopy } from "vite-plugin-static-copy"
import WindiCSS from "vite-plugin-windicss"

// I don't know why import.meta.env.NODE_ENV not work, so I use process.env.NODE_ENV
const isProduction = process.env.NODE_ENV === "production"

const pluginArr: PluginOption[] = [vue(), WindiCSS()]
if (isProduction) {
  pluginArr.push(
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/cesium/Build/Cesium",
          dest: ""
        }
      ]
    })
  )
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "/cesium_arcgis_example/",
  plugins: pluginArr,
  server: {
    host: "0.0.0.0",
    port: 4499
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
})
