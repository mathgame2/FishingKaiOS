// Global app state
var STATE = {
  // Used for storing a list of fish image boxes that have been chosen while not finalised
  chosenFish: new Array(),

  // Used for storing a list of gear image boxes during the process of registering
  registeredGear: new Array(),

  // Used to store values of the current haul
  currentRecord: {},

  // Used for swapping between different views
  views: null,

  // Current active view of the app
  activeView: null,

  // Used for navigation, contains a list of all the navigable items in the active view
  naviItems: null,

  // Used for navigation for "up" and "down" to know what value to increment/decrement by
  activeColumnSize: null,

  // Used when recording amount of fish caught, tracks whether the current value is total caught or returned to sea
  isCaught: false,

  // Used when recording amount of fish caught
  // Tracks the index of the current fish in the chosenFish array that we are recording for
  fishIndex: null,

  // A reference to the reference box of the current unit being chosen for the haul
  // Used for copy over the image src etc. to the record view
  currentUnit: null,
}


window.addEventListener("load", function () {
  var viewRoot = document.getElementById("viewRoot");

  STATE.views = viewRoot.querySelectorAll(".view");
  // First view should be registration view
  // Will need to implement logic (including persistence) to select landing view if already registered
  STATE.activeView = STATE.views[0];

  // Function for transferring to next view
  STATE.activeView.enterKeyHandler = event => {
    // Make sure both inputs areas are not blank
    const fisher_id = this.document.getElementById("fid");
    const boat_id = this.document.getElementById("bid");

    if (fisher_id.value && boat_id.value) {
      changeViewTo("gearView");
    }

  }


  // Add 'active' class to the landing view so that it is visible
  STATE.activeView.classList.add('active');

  // Get all the navigation items of this view
  STATE.naviItems = STATE.activeView.querySelectorAll("[nav-selectable]");

  // By default select the first navigation item
  const firstElement = STATE.activeView.querySelectorAll("[nav-selectable]")[0];

  firstElement.setAttribute("nav-selected", "true");
  firstElement.focus();

  setColumnNumber();
  setNavIndices();

});

// Key handler for button presses
window.addEventListener('keyup', function (e) {
  switch (e.key) {
    case 'Enter':
    case '5':
      STATE.activeView.enterKeyHandler(e);
      break;
    case 'ArrowUp':
    case '2':
      Up(e);
      break;
    case 'ArrowLeft':
    case '4':
      Left(e);
      break;
    case 'ArrowDown':
    case '8':
      Down(e);
      break
    case 'ArrowRight':
    case '6':
      Right(e);
      break;
  }
})

// Shortcut function for finding all navigation items of the active view and setting them for the current state
function setNaviItems() {
  STATE.naviItems = getAllElements();
}

// Function to get all navigation items for the current view
const getAllElements = () => STATE.activeView.querySelectorAll("[nav-selectable]");

const getTheIndexOfTheSelectedElement = () => {
  const element = document.activeElement;
  return element ? parseInt(element.getAttribute("nav-index"), 10) : 0;
};

// Provide logic for the process of selecting the next navigation item
const selectElement = setIndex => {
  const prevElement = document.activeElement;

  const nextElement = getAllElements()[setIndex];

  prevElement.setAttribute("nav-selected", false);
  nextElement.setAttribute("nav-selected", true);
  
  nextElement.focus();

}

// Logic for navigating "right" 
const Right = event => {
  if (STATE.activeView.id === "fishCaughtView") {
    // Get the count based on the text within the box
    var count = parseInt(STATE.activeView.querySelector("#numberText").textContent);
    count += 5;

    // Set the new count
    STATE.activeView.querySelector("#numberText").textContent = count.toString();
    set_tallies(count);
  } else if (document.activeElement.tagName.toLowerCase() !== 'input') {

    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();

    // Move to the subsequent navigation item, if the current element is the last one, move back to first
    const goToFirstElement = currentIndex + 1 > allElements.length - 1;
    const setIndex = goToFirstElement ? 0 : currentIndex + 1;

    selectElement(setIndex);
  }

};

// Logic for navigating "left" 
const Left = event => {
  if (STATE.activeView.id === "fishCaughtView") {
    // Get the count based on the text within the box
    var count = parseInt(STATE.activeView.querySelector("#numberText").textContent);
    count = count - 5 < 0 ? 0 : count - 5;

    // Set the new count
    STATE.activeView.querySelector("#numberText").textContent = count.toString();
    set_tallies(count);
  } else if (document.activeElement.tagName.toLowerCase() !== 'input') {
    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();

    // Move to the previous navigation item, if current element is first, then move to last
    const goToLastElement = currentIndex - 1 < 0;
    const setIndex = goToLastElement ? allElements.length - 1 : currentIndex - 1;
    selectElement(setIndex);
  }

};

// Logic for navigating "down"
const Down = event => {
  if (STATE.activeView.id === "fishCaughtView") {
    // Get the count based on the text within the box
    var count = parseInt(STATE.activeView.querySelector("#numberText").textContent);
    count = count - 1 < 0 ? 0 : count - 1;

    // Set the new count
    STATE.activeView.querySelector("#numberText").textContent = count.toString();
    set_tallies(count);
  } else {

    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();

    // Move to the previous navigation item, if next element exceeds total elements, then move to first element
    const goToFirstElement = currentIndex + STATE.activeColumnSize > allElements.length - 1;
    const setIndex = goToFirstElement ? 0 : currentIndex + STATE.activeColumnSize;

    selectElement(setIndex);
  }
};

// Logic for navigating "up"
const Up = event => {
  if (STATE.activeView.id === "fishCaughtView") {
    // Get the count based on the text within the box
    var count = parseInt(STATE.activeView.querySelector("#numberText").textContent);
    count += 1;

    // Set the new count
    STATE.activeView.querySelector("#numberText").textContent = count.toString();
    set_tallies(count);
  } else {
    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();

    // Move to the previous navigation item, if next element is before the first element, then move to last element
    const goToLastElement = currentIndex - STATE.activeColumnSize < 0;
    const setIndex = goToLastElement ? allElements.length - 1 : currentIndex - STATE.activeColumnSize;

    selectElement(setIndex);
  }
};

// Add the done button to a specific grid container
function addDoneButton(gridContainerID) {
  var gridContainer = document.getElementById(gridContainerID);

  // Create the relevant html tag elements
  var container = document.createElement("div");
  var tag = document.createElement("b");
  tag.textContent = "done";
  var entry = document.createElement("img");

  // Set the relevant information for the image
  entry.src = "../resources/done.png";;
  entry.alt = "done";
  entry.className = 'doneButton';

  // Needed to make the box focusable
  container.tabIndex = -1;

  // Set the relevant information for the box
  container.className = "imageBox";
  container.setAttribute('nav-selectable', 'true');
  container.setAttribute('selected', 'false');

  // Add the elements to the box
  container.appendChild(entry);
  container.appendChild(tag);
  container.id = "done";

  gridContainer.appendChild(container);
}

// Parse the attribute "nav-column-size" to see how many indices to jump when moving "up" or "down"
function setColumnNumber() {
  var navColumnSize = STATE.activeView.getAttribute("nav-column-size");
  STATE.activeColumnSize = navColumnSize ? parseInt(navColumnSize) : 2;
}

// Assign the correct navigation index to each of the navigation elements
function setNavIndices() {
  var allActiveElements = getAllElements();

  for (let index = 0; index < allActiveElements.length; index++) {
    allActiveElements[index].setAttribute("nav-index", index);
  }

}

// Change the current active view to the new view
function changeViewTo(viewName) {
  for (let index = 0; index < STATE.views.length; index++) {
    if (STATE.views[index].id === viewName) {

      // Remove active class so view returns to invisible
      STATE.activeView.classList.remove('active')

      // Set new view to active so it becomes visible
      STATE.activeView = STATE.views[index];
      STATE.activeView.classList.add('active')

      setNaviItems();
      setNavIndices();

      const firstElement = STATE.naviItems[0];
      firstElement.scrollIntoView({ behavior: "smooth" });
      firstElement.setAttribute("nav-selected", "true");
      firstElement.focus();
      firstElement.focus();

      setColumnNumber();
      setSoftKeys();

    }

  }
}

// Add a new navigable  image box item to a specific grid container, a file location for the image and the name of the image
function add_new_choice(gridContainerID, containerClassName, file_loc, name) {
  var gridContainer = document.getElementById(gridContainerID);

  // Create the relevant html tag elements
  var container = document.createElement("div");
  var tag = document.createElement("b");
  tag.textContent = name;
  var entry = document.createElement("img");

  entry.src = file_loc;
  entry.alt = name;

  // Needed to make the box focusable
  container.tabIndex = -1;

  // Set the relevant information for the box
  container.className = containerClassName;
  container.setAttribute('nav-selectable', 'true');
  container.setAttribute('image-selected', 'false');

  container.appendChild(entry);
  container.appendChild(tag);

  gridContainer.appendChild(container);
}

// Add a new image box that is not navigable
function add_static_image_box(gridContainerID, id, file_loc, name) {
  var gridContainer = document.getElementById(gridContainerID);

  var container = document.createElement("div");
  var tag = document.createElement("b");
  tag.textContent = name;
  var entry = document.createElement("img");

  entry.src = file_loc;
  entry.alt = name;

  container.className = "imageBox";
  container.id = id;
  container.appendChild(entry);
  container.appendChild(tag);

  gridContainer.appendChild(container);
}

// Expects current view to be fishCaughtView, sets the correct number of tally marks
function set_tallies(count) {
  const tallies = STATE.activeView.querySelector("#tallyText");
  // Clear children nodes (clearing all tallies)
  while (tallies.firstChild) {
    tallies.removeChild(tallies.lastChild);
  }

  // For every 5, add a 5 tally representation
  for (let i = 0; i < Math.floor(count / 5); i++) {
    const tally = document.createElement("s");
    const space = document.createElement("b");
    space.textContent = " ";
    tally.textContent = "||||"
    tallies.appendChild(tally);
    tallies.appendChild(space);
  }

  let tally = document.createElement("b");

  // For the remainder, insert the correct number of tallies.
  switch (count % 5) {
    case 1:
      tally.textContent = "|"
      break;
    case 2:
      tally.textContent = "||"
      break;
    case 3:
      tally.textContent = "|||"
      break;
    case 4:
      tally.textContent = "||||"
      break;
  }
  tallies.appendChild(tally)
}

// Set the soft key bar text content base on which view
function setSoftKeys() {
  const softKeyBar = document.getElementById("softkey");
  const left = softKeyBar.querySelector("#left");
  const right = softKeyBar.querySelector("#right");
  const center = softKeyBar.querySelector("#center");
  switch (STATE.activeView.id) {
    case "registerView":
    case "fishCaughtView":
    case "mapView":
      left.textContent = "";
      right.textContent = "";
      center.textContent = "Submit"
      break;
    case "gearView":
    case "staticGearView":
    case "encirclingGearView":
    case "towedGearView":
    case "gearRecordView":
    case "unitView":
    case "fishView":
      left.textContent = "";
      right.textContent = "";
      center.textContent = "Select"
      break;
  }
}