export default class Settings {
  constructor() {
    
    document
    .querySelector('#btn-updateScene')
    .addEventListener('click', e => this.updateScene())
  }

  updateScene = () => {
    let sceneId = this.validateId(document.querySelector('#txt-portalID').value)
    if (sceneId) {
      const arcgisScene = document.querySelector('arcgis-scene')
      arcgisScene.itemId = sceneId
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