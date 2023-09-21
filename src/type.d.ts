// 给window添加属性
interface Window {
  CESIUM_BASE_URL: string
}

declare module "*.json" {
  const value: any
  export default value
}

declare module "*.gltf" {
  const value: any
  export default value
}
