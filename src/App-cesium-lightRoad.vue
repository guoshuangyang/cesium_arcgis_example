<template>
  <div id="cesiumContainer" style="height: 100vh"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { Color, Viewer } from "cesium"
import geojsonQingdaoRoad from "@/assets/geojson/qingdaoroad.json"
import throughRoad from "@/cesium/lightRoad"

onMounted(() => {
  // 创建Cesium Viewer
  var viewer = new Viewer("cesiumContainer", {
    infoBox: false,
    timeline: false,
    selectionIndicator: false, // 是否显示选中指示器组件
    shadows: true, // 是否显示阴影
    shouldAnimate: false, // 是否开启动画
    // 移除默认的Home按钮和logo
    homeButton: false,
    navigationHelpButton: false,
    baseLayerPicker: false,
    animation: false,
    // 不显示地图的地图的方式的控件
    geocoder: false,
    sceneModePicker: false
  })
  ;(viewer.cesiumWidget.creditContainer as HTMLElement).style.display = "none"
  // 移除默认地图底图
  viewer.imageryLayers.removeAll()
  // 变成黑色
  viewer.scene.globe.baseColor = Color.BLACK
  new throughRoad(viewer, geojsonQingdaoRoad)
})
</script>

<script lang="ts">
export default { name: "App" }
</script>
@/cesium/lightRoad