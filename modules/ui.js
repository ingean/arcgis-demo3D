define([
], function() {
  var sceneUI = null

  function toggleWidgets(event) {
    
    let btn = event.currentTarget
    let btns = document.querySelectorAll('.toggle-widgets')
    btns.forEach(b => {
      b.active = false
      let widget = sceneUI.find(b.id)
      widget.visible = false
    })
    btn.active = true
    let widget = sceneUI.find(btn.id)
    widget.visible = true
  }
  
  return {
    init: (ui) => {
      document
      .querySelectorAll('.toggle-widgets').forEach(element => {
        element.addEventListener('click', toggleWidgets);   
      })

      sceneUI = ui
    }
  }
});










