import * as Cesium from "cesium"
import imgUrl1 from "@/assets/images/spriteline.png?url"
import defaultGeojson from "@/assets/geojson/qingdaoroad.json"

export default class throughRoad {
  public viewer: Cesium.Viewer
  public imgUrl: string
  constructor(viewer: Cesium.Viewer, geojson: any = defaultGeojson, imgUrl: string = imgUrl1) {
    this.viewer = viewer
    this.imgUrl = imgUrl
    Cesium.GeoJsonDataSource.load(geojson).then((dataSource) => {
      viewer.dataSources.add(dataSource)
      const entities = dataSource.entities.values
      entities.forEach((entity: any) => {
        entity.polyline.width = 1
        entity.polyline.material = new Cesium.PolylineDashMaterialProperty({
          color: Cesium.Color.fromCssColorString("#7ffeff").withAlpha(0.3),
          dashLength: 16,
          gapColor: Cesium.Color.TRANSPARENT,
          dashPattern: 255
        })
      })
      viewer.zoomTo(dataSource)
    })
    const { features } = geojson
    const instance: Cesium.GeometryInstance[] = []
    if (features?.length) {
      features.forEach((item: any) => {
        const arr = item.geometry.coordinates
        arr.forEach((el: any) => {
          let arr1: any[] = []

          el.forEach((_el: any) => {
            arr1 = arr1.concat(_el)
          })
          const polyline = new Cesium.PolylineGeometry({
            positions: Cesium.Cartesian3.fromDegreesArray(arr1),
            width: 1.7,
            vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT
          })
          const geometry = Cesium.PolylineGeometry.createGeometry(polyline)
          instance.push(
            new Cesium.GeometryInstance({
              geometry: geometry as Cesium.Geometry
              // attributes: {
              //   color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED),
              // },
            })
          )
        })
      })
      let source = `czm_material czm_getMaterial(czm_materialInput materialInput)
{
  czm_material material = czm_getDefaultMaterial(materialInput);
  vec2 st = materialInput.st;
  vec4 colorImage = texture(image, vec2(fract((st.s - speed * czm_frameNumber * 0.001)), st.t));
  material.alpha = colorImage.a * color.a;
  material.diffuse = colorImage.rgb * 1.5 ;
  return material;
}`

      const material = new Cesium.Material({
        fabric: {
          uniforms: {
            color: Cesium.Color.fromCssColorString("#7ffeff"),
            image: imgUrl,
            speed: 10
          },
          source
        },
        translucent: function () {
          return true
        }
      })
      const appearance = new Cesium.PolylineMaterialAppearance()
      appearance.material = material
      const primitive = new Cesium.Primitive({
        geometryInstances: instance,
        appearance,
        asynchronous: false
      })

      viewer.scene.primitives.add(primitive)
    }
  }
}
