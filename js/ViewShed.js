import * as reactiveUtils from '@arcgis/core/core/reactiveUtils.js'
import * as promiseUtils from '@arcgis/core/core/promiseUtils.js'
import ViewshedAnalysis from '@arcgis/core/analysis/ViewshedAnalysis.js'
import Viewshed from '@arcgis/core/analysis/Viewshed.js'

const viewshedAnalysis = new ViewshedAnalysis()

const createButton = document.getElementById("createButton")
const deleteButton = document.getElementById("deleteButton")
const cancelButton = document.getElementById("cancelButton")
const promptText = document.getElementById("promptText")

let abortController = null
let analysisView = null

createButton.addEventListener("click", () => {
  // Cancel any pending creation operation.
  stopCreating()
  abortController = new AbortController()
  updateUI()
  
  // Save current number of viewsheds to track whenever a new one is created.
  const viewshedCounter = viewshedAnalysis.viewsheds.length
  // Watch whenever the a new viewshed is created and selected and then stop the creation method.
  reactiveUtils.when(
    () => viewshedAnalysis.viewsheds.length > viewshedCounter && analysisView.selectedViewshed,
    () => {
      abortViewshed()
    }
  )

  // Pass the controller as an argument to the interactive creation method
  // and schedule the updateUI function after creating viewsheds is finished.
  analysisView
    .createViewsheds(abortController)
    .catch((e) => {
      // When the operation is cancelled, don't do anything. Any other errors are thrown.
      if (!promiseUtils.isAbortError(e)) {
        throw e
      }
    })
    .finally(() => {
      // Update the UI to reflect the non-creating mode.
      updateUI()
    });
});

deleteButton.addEventListener("click", () => {
  viewshedAnalysis.viewsheds = []
  deleteButton.style.display = "none"
})

cancelButton.addEventListener("click", () => {
  // Pressing the Cancel button stops the viewshed creation process and updates the UI accordingly.
  abortViewshed()
})


// Cancel any pending viewshed creation operation.
const stopCreating = () => {
  abortController?.abort()
  abortController = null
}

// Update the UI component according to whether there is a pending operation.
const updateUI = () => {
  const creating = abortController != null
  createButton.style.display = !creating ? "flex" : "none"
  deleteButton.style.display = !creating ? "flex" : "none"
  cancelButton.style.display = creating ? "flex" : "none"
  promptText.style.display = creating ? "flex" : "none"
}

export const initViewShed = async (view) => {
  view.analyses.add(viewshedAnalysis)
  analysisView = await view.whenAnalysisView(viewshedAnalysis)
  analysisView.interactive = true
}

export const abortViewshed = () => {
  stopCreating()
  updateUI()
}