import ActionBar from './components/ActionBar.js'
import { authenticate } from './utils/OAuth2.js'
import Settings from './Settings.js'
import { initViewShed, abortViewshed } from './ViewShed.js'

const appId = 'iMjGV0Y00vq0Lzz9'
const portal = await authenticate(appId)
const webscene = document.getElementById("viewDiv")

webscene.addEventListener("arcgisViewReadyChange", (event) => {
  const actionBar = new ActionBar(webscene.view, 'layers')
  const settings = new Settings(actionBar)
  const { portalItem } = event.target.map
  const navigationLogo = document.querySelector("calcite-navigation-logo")
  navigationLogo.heading = portalItem.title
  navigationLogo.description = portalItem.snippet
  navigationLogo.thumbnail = portalItem.thumbnailUrl
  navigationLogo.href = portalItem.itemPageUrl
  navigationLogo.label = "Thumbnail of map"
  
  initViewShed(webscene.view)
  document.querySelector("calcite-loader").hidden = true
})

// Cancel the creation process and updates the UI when ESC is pressed.
webscene.view.on("key-down", (event) => {
  if ((event.key = "Escape")) {
    abortViewshed()
  }
})

const arcgisProfile = document.querySelector('arcgis-elevation-profile')
arcgisProfile.profiles = [
  { type: "ground"}, 
  { type: "view"}
]