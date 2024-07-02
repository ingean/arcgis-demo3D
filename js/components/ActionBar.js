import Fullscreen from "@arcgis/core/widgets/Fullscreen.js"

export default class ActionBar {
  constructor(view, defaultActiveWidgetId = null) {
    this.view = view
    this.activeWidget = defaultActiveWidgetId
    this.widgets = {
      fullscreen: new Fullscreen({
        view: view
      })
    }
    document.querySelector("calcite-action-bar").addEventListener("click", this.handleActionBarClick)
    view.ui.add(this.widgets.fullscreen, "top-right")
  }

  handleActionBarClick = ({ target }) => { // Use fat arrow function or this will point at the clicked html element
    const nextWidget = target.dataset.actionId
    const arcgisShadow = document.querySelector('arcgis-shadow-cast')
    
    if (target.tagName !== "CALCITE-ACTION") return
    if (this.activeWidget) this.toggleActionBarItem(this.activeWidget, false)

    arcgisShadow.referenceElement = (nextWidget === 'shadow') ? 'viewDiv' : null
   
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
