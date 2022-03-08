import WebScene from 'https://js.arcgis.com/4.22/@arcgis/core/WebScene.js'
import SceneView from 'https://js.arcgis.com/4.22/@arcgis/core/views/SceneView.js'
import ActionBar from './ActionBar.js'
import Settings from './Settings.js'

const websceneId = 'bd8f9599b6dd42b6bd4f0a5ab381b5b6' // Publicly available webmap

const scene = new WebScene({
  portalItem: {
    id: websceneId
  }
});

const view = new SceneView({
  map: scene,
  container: "viewDiv",
  padding: {
    left: 49
  }
})

await scene.load()

const actionBar = new ActionBar(view)
const settings = new Settings(actionBar)

const { title, description, thumbnailUrl, avgRating } = scene.portalItem
document.querySelector("#header-title").textContent = title
document.querySelector("calcite-shell").hidden = false
document.querySelector("calcite-loader").active = false