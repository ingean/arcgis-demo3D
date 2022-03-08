export default class EditorConfig {
  constructor(view, editorWidget, editLayerTitle, id = 'editor') {
    this.view = view
    this.id = id

    let editLayer = null
    view.map.allLayers.forEach((layer) => {
      if (layer.title === editLayerTitle) {
        editLayer = layer;
      }
    });

    if (editLayer) {
      document.querySelector(`[data-action-id=${id}]`).disabled = false
      editorWidget.snappingOptions.featureSources = [{ layer: editLayer }]
    } else {
      document.querySelector(`[data-action-id=${id}]`).disabled = true
    }
  }
}