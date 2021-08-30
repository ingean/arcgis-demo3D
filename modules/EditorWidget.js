define([
], function() {
  return {
    enable: (view) => {
      let editLayer = null
      view.map.allLayers.forEach((layer) => {
        if (layer.title === "Mulighetsrom") {
          editLayer = layer;
        }
      });

      if (editLayer) {
        document.querySelector('#editor').disabled = false
        view.ui.find('editor').snappingOptions.featureSources = [{ layer: editLayer }]
      } else {
        document.querySelector('#editor').disabled = true
      }
    }
  }
});