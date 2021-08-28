define([
  "esri/WebScene",
], function(WebScene) {
  
  var sceneView

  function toggleDefaultScene() {
    let scenes = {
      USA: 'f2220db76c6448b4be8083d19ef4cf8d', // Default
      Norge: 'd649e6dfa626418d8b05645f1c46dc5d'
    }

    let selector = document.querySelector('#radio-sceneSelect')
    let portalId = scenes[selector.selectedItem.value]
    document.querySelector('#txt-portalID').value = portalId
  }

  function updateScene() {
    let portalId = validateId(document.querySelector('#txt-portalID').value)
    if (portalId) {
      let scene = new WebScene({
        portalItem: {
          id: portalId
        }
      })
      sceneView.map = scene
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
      .addEventListener('click', updateScene)

      document
      .querySelector('#radio-sceneSelect')
      .addEventListener('click', toggleDefaultScene)
    }
  }
});