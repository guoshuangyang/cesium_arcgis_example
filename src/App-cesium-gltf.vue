<template>
  <div id="cesiumContainer" style="height: 100vh"></div>
</template>

<script setup lang="ts">
import * as Cesium from "cesium"
import { onMounted } from "vue"
import { Viewer } from "cesium"
// import gltfUrl from "@/assets/gltf/test.glb?url"
onMounted(() => {
  // 创建Cesium Viewer 根据window.devicePixelRatio 渲染清晰度
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
    sceneModePicker: false,
    // 根据window.devicePixelRatio 渲染清晰度
    // resolutionScale: window.devicePixelRatio
    skyBox: false,
    skyAtmosphere: false,
    scene3DOnly: true,
    baseLayer: false,
    fullscreenButton: false,
    useBrowserRecommendedResolution: true
  })

  ;(viewer.cesiumWidget.creditContainer as HTMLElement).style.display = "none"
  // 移除默认地图底图
  viewer.imageryLayers.removeAll()
  // 移除地球
  // viewer.scene.globe.show = false
  // viewer.scene.moon.show = false
  // viewer.scene.skyBox.show = false
  // 背景变成透明的
  viewer.scene.backgroundColor = Cesium.Color.TRANSPARENT
  // 地球变成黑色
  viewer.scene.globe.baseColor = Cesium.Color.BLACK

  function createModel(url: string, height: number) {
    viewer.entities.removeAll()

    const position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, height)
    const heading = Cesium.Math.toRadians(135)
    const pitch = 0
    const roll = 0
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)

    const entity = viewer.entities.add({
      name: url,
      position: position,
      orientation: new Cesium.CallbackProperty(function () {
        return orientation
      }, false),
      model: {
        uri: url,
        minimumPixelSize: 1000,
        maximumScale: 2000000
      }
    })
    viewer.trackedEntity = entity
    // 返回模型对象
    return entity
  }

  createModel("https://raw.githubusercontent.com/guoshuangyang/model/main/gltf/0913.glb", 110)
})
</script>

<script lang="ts">
export default { name: "App" }
</script>
