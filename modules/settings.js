define([
  "esri/WebScene",
  "modules/SliceWidget.js",
  "modules/EditorWidget.js"
], function(WebScene, SliceWidget, EditorWidget) {
  
  function toggleDefaultScene() {
    let scenes = {
      shadow: 'f2220db76c6448b4be8083d19ef4cf8d', 
      editor: 'bd8f9599b6dd42b6bd4f0a5ab381b5b6', // Default
      slice: '08ba5c76e6ed444185f372b0484fdd8f'
    }

    let selector = document.querySelector('#radio-sceneSelect')
    let portalId = scenes[selector.selectedItem.value]
    document.querySelector('#txt-portalID').value = portalId
  }

  function updateScene(view) {
    let portalId = validateId(document.querySelector('#txt-portalID').value)
    if (portalId) {
      let scene = new WebScene({
        portalItem: {
          id: portalId
        }
      })
      view.map = scene
      view.when(() => {
        SliceWidget.enable(view) // Only adds widget if 
        EditorWidget.enable(view) //Enable editing if editable layer exitst
      })
    }
  }

  function validateId(id) {
    let notice = document.querySelector('#notice-portalId')
    if (id.length != 32) {
      notice.active = true
      return false
    } else {
      notice.active = false
      return id
    }
  }

  return {
    init: (view) => {
      sceneView = view

      document
      .querySelector('#btn-updateScene')
      .addEventListener('click', event => updateScene(view))

      document
      .querySelector('#radio-sceneSelect')
      .addEventListener('click', toggleDefaultScene)
    }
  }
});