<script setup lang="ts">
import { onMounted } from "vue"
import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import WebTileLayer from "@arcgis/core/layers/WebTileLayer"

const titleLayer = new WebTileLayer({
  urlTemplate: `//{subDomain}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${
    import.meta.env.VITE_mapkey
  }`,
  subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"]
})
// 创建一个地图并设置天地图作为底图
const map = new Map({
  basemap: {
    baseLayers: [titleLayer],
    title: "天地图",
    id: "tdtBasemap"
  }
})

onMounted(() => {
  // 创建一个视图
  const view = new MapView({
    container: "viewDiv", // 替换成你的地图容器的 ID
    map: map,
    center: [116.39, 39.9], // 设置地图的初始中心点
    zoom: 12 // 设置地图的初始缩放级别
  })
  console.log(view)
})
</script>

<template>
  <div id="viewDiv" style="width: 100vw; height: 100vh"></div>
</template>
