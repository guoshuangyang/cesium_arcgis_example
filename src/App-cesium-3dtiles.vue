<template>
  <div id="cesiumContainer" style="height: 100vh"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { Viewer, Cesium3DTileset, HeadingPitchRange, Color } from "cesium"

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
  // 地球变成黑色
  viewer.scene.globe.baseColor = Color.BLACK
  // 创建3D Tileset并加载包含b3dm模型的tileset
  var tileset = Cesium3DTileset.fromUrl("https://raw.githubusercontent.com/guoshuangyang/model/main/3dtiles/tiles1/tileset.json")
  // tileset 加载完成后添加到场景
  tileset.then((res) => {
    console.log("加载完成", res)
    res.tileLoad.addEventListener(function () {
      console.log("加载完成")
    })
    viewer.scene.primitives.add(res)
    // 设置相机视角 - 控制可视范围的大小
    // viewer.camera.viewBoundingSphere(res.boundingSphere, new HeadingPitchRange(0, -0.5, 0))
    // 视角跟随模型飞入模型所在地
    viewer.camera.flyToBoundingSphere(res.boundingSphere, {
      duration: 0,
      offset: new HeadingPitchRange(0, -0.5, 0)
    })
  })
  // 可以通过拖拽实现平移
  viewer.scene.screenSpaceCameraController.enableTranslate = true
})
</script>

<script lang="ts">
export default { name: "App" }
</script>
