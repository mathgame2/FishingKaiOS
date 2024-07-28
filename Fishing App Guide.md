

[**General Overview	1**](\#general-overview)

[Views	1](\#views)

[Data Persistence	1](\#data-persistence)

[Navigation, Navigation Items, and Navigation Key Handlers	2](\#navigation,-navigation-items,-and-navigation-key-handlers)

[Image Boxes and Configuration	2](\#image-boxes-and-configuration)

[Mapping	3](\#mapping)

[**Technical Details	3**](\#technical-details)

[State	3](\#state)

[Geolocation Details	4](\#geolocation-details)

[Loading the Application onto a KaiOS Phone	4](\#sideloading-applications)

[**Helper Functions	4**](\#helper-functions)

[changeViewTo(viewName)	4](\#changeviewto(viewname))

[addNewImageBox(gridContainerID, localID, filePath, subtitle)	4](\#addnewimagebox(gridcontainerid,-localid,-filepath,-subtitle))

[addStaticImageBox(gridContainerID, id, filePath, name)	5](\#addstaticimagebox(gridcontainerid,-id,-filepath,-name))

[addDoneButton(gridContainerID)	5](\#adddonebutton(gridcontainerid))

[**App Limitations	5**](\#app-limitations)

# General Overview {#general-overview}

I’ve been testing on a phone with KaiOS 2.5.1.1, which is running Firefox 48\. Most web features supported after this version (such as multiline strings) most likely will not work. All application files should be packaged in a zip file with a manifest file describing the security level of the app and the specific permissions that this app requires, such as geolocation. More information on the manifest can be found following [this link](https://developer.kaiostech.com/docs/getting-started/main-concepts/manifest).

## Views {#views}

The application itself is a simple website (HTML, CSS, and Javascript). A good example app can be found [here](https://github.com/Sekuta82/KaiOS-sample/blob/master/code/app.js). The entire app is built upon one HTML page which is split into multiple \<div\> tags with the “view” class. By default, the “view” class is hidden through CSS styling, but is given an additional “active” class to denote when to display any view. An active “view” is displayed as a grid with two columns by default and all the items added to it as its children will dynamically increase the rows in the grid as necessary.

## Data Persistence {#data-persistence}

As a web app, there are two options for data persistence: [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB\_API)  
I would recommend using local storage as it is simple and should be enough for storing small amounts of data (up to 5 MiB). Local storage stores things using key-value pairs, but as most Javascript objects can be serialised and deserialised into JSON, you can store more complex information as well. If you need to use indexedDB for larger quantities of structured data, I would recommend reading [this page](https://developer.kaiostech.com/docs/getting-started/main-concepts/storage) from KaiOS regarding some of their recommendations.

## Navigation, Navigation Items, and Navigation Key Handlers {#navigation,-navigation-items,-and-navigation-key-handlers}

To make the app simpler to traverse, some number keys are mapped to navigation as well. This can be modified by modifying the event listener for “keydown” event types in *app.js*.  

Selectable objects in a view are given the attribute “nav-selectable”. The STATE object keeps an ordered list of the navigable items of the current view and reloads a new list when a new view becomes active. For views that have multiple traversable objects, it is necessary for that view to have the attribute “nav-column-size” with the corresponding number of columns. This value is used to increment/decrement the selected item index when navigating up or down the grid. The app is implemented this way as initially I wanted to avoid having an assumed number of columns and it stuck.

The *focus()* method is called to change the selected item. It is important to note that normally unfocusable tags such as \<div\> require the attribute “tabIndex” to be set or you will not be able to *focus()* on them. When focused, the selected item also has the “nav-selected” attribute set to true. This is styled differently in CSS and provides more visual feedback to the selected item. I would recommend changing the current background and focus colours as these were chosen arbitrarily and may not be the best under bright sunlight. 

The behaviour when the enter or [softleft](https://developer.kaiostech.com/docs/design-guide/key) keys are pressed is mostly unique between views. That is why each view is assigned its own *enterKeyHandler* and *softleftKeyHandler* method which details what should happen when the enter key is pressed. Note that these methods are not in-built JS ones but are assigned to them in the program.

## Image Boxes and Configuration {#image-boxes-and-configuration}

Most of the selectable items in this app are currently a \<div\> tag with the CSS class “imageBox”. These boxes then contain an image and a text underneath that image. These containers have an additional attribute “localID”, which is the integer ID that identifies the thing this box represents in its local group (such as fishes, units, gears etc.).

The application is technically a web app, so it is impossible to perform file traversal to load the images at runtime. That is why images and subtitles for units, gear types, specific gears, and fishes are loaded based on the configuration file *config.js*. 

There are three pieces of information that is necessary for all categories: an integer “id” that is unique within each category, a “filePath” denoting where the image file is located, and “\[type\]Name” that is the subtitle/hint text underneath the image file. Gears have an additional layer due to their hierarchical implementation and require more information. For each gear type, it requires an additional “viewName” field which is a unique HTML id assigned to the view of this gear type and a “gears” array that contains the specific gears under this gear type. So all the gears in this array will be loaded to the newly created view for this gear type.

![][image1]

To change the image for the done icon, change the *DONE\_BUTTON\_FILE\_PATH* field in the config.js file.

## Mapping {#mapping}

The map functionality is implemented using the [LeaftletJS library](https://leafletjs.com/index.html), which has been downloaded and included with the app in the *lib* directory. This library requires the mapping tiles to be already downloaded as part of the app in the OSMdroid format. These tiles are memory intensive so it would be best to limit the bounds of the map (using *setMaxBounds()*) to a known area and only download and ship the relevant tiles. This option was chosen as other mapping APIs (such as Google Maps) require an active network connection, though if an active network connection is available, it should be relatively easy to switch out to use the [Google Maps API](https://developers.google.com/maps/documentation/javascript/add-google-map) as that is just loading the relevant JS file. To download tiles, you can follow [this guide](https://stackoverflow.com/questions/43608919/html-offline-map-with-local-tiles-via-leaflet) on StackOverflow (or get them from [Open Street Maps](https://planet.openstreetmap.org/) directly, but this may require further processing). The default keyboard controls have been disabled to remap controls. The map object is stored in the STATE.mymap field and must be called for all interactions related to the map.

# Technical Details {#technical-details}

## State {#state}

“STATE” is a global object for the app to track application state. This state does not persist if the app is closed. The STATE object contains the “currentRecord” field, which tracks the information currently being input by the user. Right now, this information is not persisted. The record is cleared every time a new record is started, so any manipulations or persistence will need to happen before then.

## Geolocation Details {#geolocation-details}

The geolocation permission must be added to the manifest in order for the geolocation api to be used. In order to keep geolocation running in the background, you need to request a “gps” [wakeLock](https://kaios.dev/2023/07/common-kaios-apis-and-interfaces/). This prevents the phone from going into deep sleep and causes significant battery drain (on full charge, about 10% per hour). After requesting the wakeLock, you can then assign a handler function by using the *Geolocation.watchPosition()* method that will fire every time the position of the device changes. However, upon testing, this method seems to fire about every second, and there does not seem to be a way of slowing it down other than to simply set a cooldown timer and ignore it firing during the cooldown timer.

The fact that the KaiOS phone might be used purely for data collection may actually be useful. The phone does not immediately shut down an app or prevent it from running in the background when exiting it. However, if another app is opened and requires a lot of resources (such as google maps), the background app will be stopped, including the *watchPosition()* handler.

## Sideloading Applications {#sideloading-applications}

To load an application onto the phone, you may follow the [tutorial](https://developer.kaiostech.com/docs/getting-started/env-setup/os-env-setup) by KaiOS. You will need Android Debug Bridge (ADB) installed and a way to build the app on the phone. For newer devices that are no longer able to run the old versions of Firefox, you can try using [WaterFox Classic](https://classic.waterfox.net/)’s WebIDE (Tools \> Web Developer \> WebIDE). This version is insecure as it lacks security patches. 

Debug mode must be enabled on the phone, a detailed guide on how can be found [here](https://ivan-hc.github.io/bananahackers/devices.html). Try the browser debug first as it is simplest.

## Helper Functions {#helper-functions}

### *changeViewTo(viewName)* {#changeviewto(viewname)}

Provided with the HTML ID of the new view, this function will take the necessary steps towards making the new view visible. These steps are: 

1. Remove the active class from the previous view,   
1. Add the active class to the newly selected view,   
1. Load the new list of navigable items for the new view into the *STATE.naviItems* field  
1. Set the focus to the first element in the of the new list of navigable items  
1. Set *STATE.activeColumnSize* to the correct value by parsing the “nav-column-size” attribute  
1. Change the softkey bar text

### *addNewImageBox(gridContainerID, localID, filePath, subtitle)* {#addnewimagebox(gridcontainerid,-localid,-filepath,-subtitle)}

This function adds a new navigable image box child to a view. The parameters are: the HTML ID of the view you want to add to, the local integer ID of this new box, the file path to the image, and a string that is the subtitle to the image. This function will create a new child node and append it to the specified view’s children nodes.

### *addStaticImageBox(gridContainerID, id, filePath, name)* {#addstaticimagebox(gridcontainerid,-id,-filepath,-name)}

This function adds a non-navigable image box child to a view. This function is similar to *addNewImageBox()* except the id provided will be the HTML id of this new image box rather than the localID.

### *addDoneButton(gridContainerID)* {#adddonebutton(gridcontainerid)}

This function adds a navigable “done” image box. It takes the HTML id of the view to add the done button to as a parameter. The “localId” of “done” image boxes are always set to \-1. It loads the image from *DONE\_BUTTON\_FILE\_PATH* from the config file.

# App Limitations {#app-limitations}

Currently, the app does not provide enough feedback when a bad operation happens, such as when no gear is selected on registration or if no fish is chosen when registering a catch.

[image1]: <data:image/png;base64,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>