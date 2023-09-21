<template>
  <component :is="arrList[activeComponent].component"></component>
  <el-select
    v-model="activeComponent"
    class="top-2 left-2 z-99 !fixed"
    placeholder="Select"
    size="large"
  >
    <el-option
      v-for="(item, index) in arrList"
      :key="item.name"
      :label="item.name"
      :value="index"
    />
  </el-select>
</template>

<script setup lang="ts">
import { markRaw, ref } from "vue"
import AppCesiumGltf from "@/App-cesium-gltf.vue"
import AppCesium3dtiles from "@/App-cesium-3dtiles.vue"
import AppCesiumLightRoad from "@/App-cesium-lightRoad.vue"
import AppCesiumTianDiTuMap from "@/App-cesium-tiandiMap.vue"
import AppArcgisTianDiTuMap from "@/App-arcgis-tianditu.vue"

const arrList = markRaw([
  {
    name: "Cesium渲染gltf模型",
    component: AppCesiumGltf
  },
  {
    name: "Cesium渲染3dtiles模型",
    component: AppCesium3dtiles
  },
  {
    name: "Cesium渲染流光道路",
    component: AppCesiumLightRoad
  },
  {
    name: "Cesium天地图",
    component: AppCesiumTianDiTuMap
  },
  {
    name: "Arcgis天地图",
    component: AppArcgisTianDiTuMap
  }
])
const activeComponent = ref(0)
</script>

<script lang="ts">
export default { name: "App" }
</script>
