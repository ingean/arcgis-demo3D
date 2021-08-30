require([
  "modules/ui.js",
  "modules/settings.js",
  "modules/SliceWidget.js",
  "modules/EditorWidget.js",
  "esri/intl",
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/widgets/LayerList",
  "esri/widgets/Daylight",
  "esri/widgets/ShadowAccumulation",
  "esri/widgets/ElevationProfile",
  "esri/widgets/LineOfSight",
  "esri/widgets/Slice",
  "esri/widgets/Slice/SlicePlane",
  "esri/widgets/Editor",
], function(UI, Settings, SliceWidget, EditorWidget, intl, WebScene, SceneView, LayerList, Daylight, ShadowAccumulation, ElevationProfile, LineOfSight, Slice, SlicePlane, Editor) {

  // Initialization 
  intl.setLocale("nb")

  const view = new SceneView({
    container: "viewDiv",
    map: new WebScene({
      portalItem: {
        id: "bd8f9599b6dd42b6bd4f0a5ab381b5b6"
      }
    }),
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
  
  // Layerlist widget
  const layerListWidget = new LayerList({
    id: 'layers',
    view
  });
  layerListWidget.visible = false;
  view.ui.add(layerListWidget, "top-right");


  // Daylight widget
  const daylightWidget = new Daylight({
    id: 'daylight',
    view: view
  });
  
  view.ui.add(daylightWidget, "top-right");
  daylightWidget.viewModel.localDate = new Date("May 1, 2021 12:00:00");

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

  // Slice widget
  const sliceWidget = new Slice({
    id: 'slice',
    view: view,
    container: "sliceContainer"
  });

  sliceWidget.visible = false
  view.ui.add(sliceWidget, "top-right");

  // Editor widget
  const editorWidget = new Editor({
    id: 'editor',
    view: view,
    snappingOptions: {
      enabled: true,
      selfEnabled: true,
      featureEnabled: true,
    }
  })
 
  editorWidget.visible = false
  view.ui.add(editorWidget, "top-right"); // Editor widget

  view.when(() => {
    EditorWidget.enable(view)
    SliceWidget.enable(view)
  });
})