import Bookmarks from '@arcgis/core/widgets/Bookmarks.js'
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery.js'
import LayerList from '@arcgis/core/widgets/LayerList.js'
import Legend from '@arcgis/core/widgets/Legend.js'
import Fullscreen from "@arcgis/core/widgets/Fullscreen.js"
import Daylight from '@arcgis/core/widgets/Daylight.js'
import ShadowCast from '@arcgis/core/widgets/ShadowCast.js'
import ElevationProfile from '@arcgis/core/widgets/ElevationProfile.js'
import LineOfSight from '@arcgis/core/widgets/LineOfSight.js'
import Slice from '@arcgis/core/widgets/Slice.js'
import Editor from '@arcgis/core/widgets/Editor.js'
import EditorConfig from '../EditorConfig.js'
import SliceConfig from '../SliceConfig.js'

export default class ActionBar {
  constructor(view, defaultActiveWidgetId = null) {
    this.view = view
    this.activeWidget = defaultActiveWidgetId
    this.widgets = {
      basemaps: new BasemapGallery({
        view,
        container: "basemaps-container"
      }),
     layerList: new LayerList({
        view,
        selectionEnabled: true,
        container: "layers-container"
      }),
      legend: new Legend({
        view,
        container: "legend-container"
      }),
      bookmarks: new Bookmarks({
        view,
        container: "bookmarks-container"
      }),
      daylight: new Daylight({
        view,
        id: 'daylight',
        container: "daylight-container",
        visible: false
      }),
      shadow: new ShadowCast({
        view,
        id: 'shadow',
        container: "shadow-container",
        visible: false
      }),
      elevation: new ElevationProfile({
        view,
        id: 'elevationProfile',
        container: "elevationprofile-container",
        visible: false,
        profiles: [{
          type: "ground" // first profile line samples the ground elevation
        }, {
          type: "view" // second profile line samples the view and shows building profiles
        }]
      }),
      los: new LineOfSight({
        view,
        id: 'los',
        container: "lineofsight-container",
        visible: false
      }),
      slice: new Slice({
        view,
        id: 'slice',
        container: "slice-container",
        visible: false
      }),
      editor: new Editor({
        view,
        container: "editor-container",
        visible: false,
        snappingOptions: {
          enabled: true,
          selfEnabled: true,
          featureEnabled: true,
        }
      }),
      fullscreen: new Fullscreen({
        view: view
      })
    }
    document.querySelector("calcite-action-bar").addEventListener("click", this.handleActionBarClick)
    view.ui.move("zoom", "bottom-right") 
    view.ui.add(this.widgets.fullscreen, "top-right")

    view.when(() => {
      new EditorConfig(view, this.widgets.editor, 'Mulighetsrom') // Only enable widget if layer is in view
      new SliceConfig(view, this.widgets.slice, 'Meierifabrikken (BIM)') // Only enable widget if layer is in view
    })
  }

  handleActionBarClick = ({ target }) => { // Use fat arrow function or this will point at the clicked html element
    if (target.tagName !== "CALCITE-ACTION") return
    if (this.activeWidget) this.toggleActionBarItem(this.activeWidget, false)
    
    const nextWidget = target.dataset.actionId
    
    if (nextWidget !== this.activeWidget) {
      this.toggleActionBarItem(nextWidget, true)
      this.activeWidget = nextWidget
    } else {
      this.activeWidget = null
    }
  }

  toggleActionBarItem = (id, visible) => {
    document.querySelector(`[data-action-id=${id}]`).active = visible
    document.querySelector(`[data-panel-id=${id}]`).hidden = !visible
    let widget = this.widgets[id]
    if (widget) widget.visible = visible
  }   
}
