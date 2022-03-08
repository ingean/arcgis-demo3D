import WebScene from 'https://js.arcgis.com/4.22/@arcgis/core/WebScene.js'
import EditorConfig from './EditorConfig.js'
import SliceConfig from './SliceConfig.js'

export default class Settings {
  constructor(actionBar) {
    this.view = actionBar.view
    this.scenes = {
      shadow: 'f2220db76c6448b4be8083d19ef4cf8d', 
      editor: 'bd8f9599b6dd42b6bd4f0a5ab381b5b6', // Default
      slice: '08ba5c76e6ed444185f372b0484fdd8f'
    }
    
    document
    .querySelector('#btn-updateScene')
    .addEventListener('click', e => this.updateScene(this.view, actionBar.widgets))

    document
    .querySelector('#radio-sceneSelect')
    .addEventListener('click', this.toggleDefaultScene)
  }

  toggleDefaultScene = () => {
    let selector = document.querySelector('#radio-sceneSelect')
    let portalId = this.scenes[selector.selectedItem.value]
    document.querySelector('#txt-portalID').value = portalId
  }

  updateScene = (view, widgets) => {
    let portalId = this.validateId(document.querySelector('#txt-portalID').value)
    if (portalId) {
      let scene = new WebScene({
        portalItem: {
          id: portalId
        }
      })
      view.map = scene
      view.when(() => {
        new EditorConfig(view, widgets.editor, 'Mulighetsrom') // Only enable widget if layer is in view
        new SliceConfig(view, widgets.slice, 'Meierifabrikken (BIM)') // Only enable widget if layer is in view
      })
    }
  }

  validateId = (id) => {
    let notice = document.querySelector('#notice-portalId')
    if (id.length != 32) {
      notice.active = true
      return false
    } else {
      notice.active = false
      return id
    }
  }
}