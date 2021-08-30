define([
],
function () {

  function init(view) {
    view.when(() => {
      let buildingLayer = view.map.allLayers.find(layer => {
        return layer.title === 'Meierifabrikken (BIM)';
      });  
  
      if (buildingLayer) {
        document.querySelector('#sliceDiv').style.display = '';
        document.querySelector('#slice').disabled = false
        buildingLayer.when(() => {
          buildingLayer.allSublayers.forEach(layer => {
            
            switch (layer.modelName) {
              case "FullModel":
                layer.visible = true;
                break;
              case "Overview":
              case "Rooms":
                layer.visible = false;
                break;
              default:
                layer.visible = true;
            }
          });
  
          let sliceWidget = view.ui.find('slice')
          sliceWidget = configureSliceWidget(sliceWidget);
          addEventListeners(sliceWidget);    
        });
      } else {
        document.querySelector('#slice').disabled = true
      }
    })
  }
  
  function configureSliceWidget(sliceWidget) {
    let clearPlaneBtn = document.getElementById("clearPlaneBtn");

    sliceWidget.viewModel.tiltEnabled = true;
    sliceWidget.viewModel.shape = null;
    sliceWidget.viewModel.watch("state", value => {
      if (value === "ready") {
        clearPlaneBtn.style.display = "none";
      } else {
        clearPlaneBtn.style.display = "inherit";
      }
    });
    return sliceWidget;
  }

  function addEventListeners(sliceWidget) {    
    let clearPlaneBtn = document.getElementById("clearPlaneBtn");
    clearPlaneBtn.addEventListener("click", () => {
      sliceWidget.viewModel.clear();
    });
  }
  
  return {
    enable: (view) => {
      init(view); 
    }
  }
});