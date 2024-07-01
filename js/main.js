import WebScene from '@arcgis/core/WebScene.js'
import SceneView from '@arcgis/core/views/SceneView.js'
import ActionBar from './components/ActionBar.js'
import { authenticate } from './utils/OAuth2.js'
import Settings from './Settings.js'
import { initViewShed, abortViewshed } from './ViewShed.js'

//const appId = 'xG2kkVesAXGRx5t1' // AppId for arcgis-calcite-template (Dev folder at geodata.maps.arcgis.com) 
const appId = 'iMjGV0Y00vq0Lzz9'
const websceneId = 'bac30fa0028a41a48c174f1b71e0c379' // Publicly available webmap

const portal = await authenticate(appId) //Authenticate with named user using OAuth2

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

scene.when(() => {
  const { title, description, thumbnailUrl, avgRating } = scene.portalItem
  document.querySelector("#header-title").textContent = title
  document.querySelector("calcite-shell").hidden = false
  document.querySelector("calcite-loader").hidden = true
  initViewShed(view)
})

// Cancel the creation process and updates the UI when ESC is pressed.
view.on("key-down", (event) => {
  if ((event.key = "Escape")) {
    abortViewshed()
  }
})