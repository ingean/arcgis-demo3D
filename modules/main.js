require([
  "modules/ui.js",
  "modules/settings.js",
  "esri/intl",
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/widgets/Daylight",
  "esri/widgets/ShadowAccumulation",
  "esri/widgets/ElevationProfile",
  "esri/widgets/LineOfSight"
], function(UI, Settings, intl, WebScene, SceneView, Daylight, ShadowAccumulation, ElevationProfile, LineOfSight) {

  // Initialization 
  intl.setLocale("nb")

  let scene = new WebScene({
    portalItem: {
      id: "f2220db76c6448b4be8083d19ef4cf8d"
    }
  })

  const view = new SceneView({
    container: "viewDiv",
    map: scene,
    qualityProfile: "high",
    environment: {
      lighting: {
        directShadowsEnabled: false
      }
    }
  });

  UI.init(view.ui)
  Settings.init(view)

  // Add widgets
  
  // Daylight widget
  const daylightWidget = new Daylight({
    id: 'daylight',
    view: view
  });
  
  view.ui.add(daylightWidget, "top-right");
  daylightWidget.viewModel.localDate = new Date("May 1, 2021");

  // Shadow widget
  const shadowWidget = new ShadowAccumulation({
    id: 'shadow',
    view
  });
  shadowWidget.visible = false;
  view.ui.add(shadowWidget, "top-right");
  shadowWidget.viewModel.date = new Date("May 1, 2021");

  // Elevation profile widget
  const elevationProfileWidget = new ElevationProfile({
    id: 'elevation',
    view: view,
    profiles: [{
      type: "ground" // first profile line samples the ground elevation
    }, {
      type: "view" // second profile line samples the view and shows building profiles
    }]
  })
  elevationProfileWidget.visible = false
  view.ui.add(elevationProfileWidget, "top-right");

  // Line of Sight widget
  const losWidget = new LineOfSight({
    id: 'los',
    view: view
  })
  losWidget.visible = false
  view.ui.add(losWidget, "top-right");
})