export default class SliceConfig {
  constructor(view, sliceWidget, sliceLayerTitle) {
    this.view = view
    view.when(() => {
      this.configureSliceLayer(sliceLayerTitle)
      sliceWidget = this.configureSliceWidget(sliceWidget)
          
      document.querySelector('#clearPlaneBtn')
      .addEventListener('click', () => sliceWidget.viewModel.clear()) 
    })
  }

  configureSliceLayer = (sliceLayerTitle) => {
    let visibility = {
      FullModel: true,
      Rooms: false,
    }
    
    let sliceLayer = this.getLayer(sliceLayerTitle)
  
    if (sliceLayer) {
      document.querySelector('#sliceDiv').style.display = '';
      document.querySelector(`[data-action-id=slice]`).disabled = false
      sliceLayer.when(() => {
        sliceLayer.allSublayers.forEach(layer => {     
          layer.visible = visibility[layer.modelName] ?? true
        })
      })
    } else {
      document.querySelector(`[data-action-id=slice]`).disabled = true
    }
  }

  configureSliceWidget = (sliceWidget) => {
    let clearPlaneBtn = document.querySelector('#clearPlaneBtn')

    sliceWidget.viewModel.tiltEnabled = true
    sliceWidget.viewModel.shape = null
    sliceWidget.viewModel.watch('state', value => {
      clearPlaneBtn.style.display = (value === 'ready') ? 'none' : 'inherit'
    })
    return sliceWidget
  }

  getLayer = (title) => {
    return this.view.map.allLayers.find(l => l.title === title)  
  }
}