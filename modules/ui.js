define([
], function() {

  function toggleWidgets(event, ui) {
    
    let btn = event.currentTarget
    let btns = document.querySelectorAll('.toggle-widgets')
    btns.forEach(b => {
      b.active = false
      let widget = ui.find(b.id)
      if (widget) widget.visible = false
    })
    btn.active = true
    let widget = ui.find(btn.id)
    widget.visible = true
  }

  function togglePanels(event) {
  
    let id = event.currentTarget.id
    let p = document.querySelector(`#panel-${id}`)
    let display = p.style.display

    //Close and deactivate all panels
    document
    .querySelectorAll('.panel-right').forEach(e => {
      e.style.display = 'none';   
    });

    document
    .querySelectorAll('.togglePanels').forEach(e => {
      e.className = e.classList.remove('active')  
    });  

    if (display === 'none') {
      p.style.display = '';
      event.currentTarget.classList.add('active')
    }  
  }
  
  return {
    init: (ui) => {
      document
      .querySelectorAll('.toggle-widgets').forEach(element => {
        element.addEventListener('click', event => toggleWidgets(event, ui));   
      })

      document
      .querySelectorAll('.toggle-panels').forEach(element => {
        element.addEventListener('click', togglePanels);   
      })
    }
  }
});










