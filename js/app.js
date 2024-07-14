// Global app state
var STATE = {}

STATE.chosenFish = new Array();

window.addEventListener("load", function () {
  var viewRoot = document.getElementById("viewRoot");

  // Will need to implement loading of registered gear.
  STATE.registeredGear = new Array();
  STATE.views = viewRoot.querySelectorAll(".view");
  STATE.activeView = STATE.views[0];

  // Function for transferring to next view
  STATE.activeView.enterKeyHandler = event => {
    const fisher_id = this.document.getElementById("fid");
    const boat_id = this.document.getElementById("bid");
    if (fisher_id.value && boat_id.value) {
      changeViewTo("gearView");
    }
  }

  STATE.activeViewID = 0;
  STATE.activeViewName = STATE.activeView.getAttribute("id");

  STATE.activeView.classList.add('active');
  STATE.naviItems = STATE.activeView.querySelectorAll("[nav-selectable]");

  const firstElement = STATE.activeView.querySelectorAll("[nav-selectable]")[0];
  firstElement.setAttribute("nav-selected", "true");
  firstElement.setAttribute("nav-index", "0");

  firstElement.focus();

  setColumnNumber();
  setNavIndices();

});

window.addEventListener('keydown', function (e) {
  switch (e.key) {
    case 'Enter':
      STATE.activeView.enterKeyHandler(e);
      break;
    case 'ArrowUp': //scroll up
      Up(e);
      break;
    case 'ArrowLeft':
      Left(e);
      break;
    case 'ArrowDown': //scroll down
      Down(e);
      break
    case 'ArrowRight':
      Right(e);
      break;
  }
})

function setNaviItems() {
  STATE.naviItems = STATE.activeView.querySelectorAll("[nav-selectable]");
}

const getAllElements = () => STATE.activeView.querySelectorAll("[nav-selectable]");

const getTheIndexOfTheSelectedElement = () => {
  const element = document.activeElement;
  return element ? parseInt(element.getAttribute("nav-index"), 10) : 0;
};

const selectElement = setIndex => {
  const prevElement = document.activeElement;

  const nextElement = getAllElements()[setIndex];

  prevElement.setAttribute("nav-selected", false);
  prevElement.blur();

  nextElement.setAttribute("nav-selected", true);
  nextElement.focus();

}

const Right = event => {
  if (STATE.activeView.id === "fishCaughtView") {
    var count = parseInt(STATE.activeView.querySelector("#numberText").textContent);
    count += 5;
    STATE.activeView.querySelector("#numberText").textContent = count.toString();
    set_tallies(count);
  } else if (document.activeElement.tagName.toLowerCase() !== 'input') {
    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();
    const goToFirstElement = currentIndex + 1 > allElements.length - 1;
    const setIndex = goToFirstElement ? 0 : currentIndex + 1;
    selectElement(setIndex);
  }

};

const Left = event => {
  if (STATE.activeView.id === "fishCaughtView") {
    var count = parseInt(STATE.activeView.querySelector("#numberText").textContent);
    count = count - 5 < 0 ? 0 : count - 5;
    console.log(count);
    STATE.activeView.querySelector("#numberText").textContent = count.toString();
    set_tallies(count);
  } else if (document.activeElement.tagName.toLowerCase() !== 'input') {
    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();
    const goToLastElement = currentIndex - 1 < 0;
    const setIndex = goToLastElement ? allElements.length - 1 : currentIndex - 1;
    selectElement(setIndex);
  }

};

const Down = event => {
  if (STATE.activeView.id === "fishCaughtView") {
    var count = parseInt(STATE.activeView.querySelector("#numberText").textContent);
    count = count - 1 < 0 ? 0 : count - 1;
    STATE.activeView.querySelector("#numberText").textContent = count.toString();
    set_tallies(count);
  } else {
    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();
    const goToFirstElement = currentIndex + STATE.activeColumnSize > allElements.length - 1;
    const setIndex = goToFirstElement ? 0 : currentIndex + STATE.activeColumnSize;

    selectElement(setIndex);
  }
};

const Up = event => {
  if (STATE.activeView.id === "fishCaughtView") {
    var count = parseInt(STATE.activeView.querySelector("#numberText").textContent);
    count += 1;
    STATE.activeView.querySelector("#numberText").textContent = count.toString();
    set_tallies(count);
  } else {
    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();
    const goToLastElement = currentIndex - STATE.activeColumnSize < 0;
    const setIndex = goToLastElement ? allElements.length - 1 : currentIndex - STATE.activeColumnSize;

    selectElement(setIndex);
  }
};


function addDoneButton(containerID) {
  var gridContainer = document.getElementById(containerID);

  var container = document.createElement("div");
  var tag = document.createElement("b");
  tag.textContent = "done";
  var entry = document.createElement("img");

  entry.src = "../resources/done.png";;
  entry.alt = "done";
  entry.className = 'doneButton';

  // Needed to make the image tags focusable
  container.tabIndex = -1;

  container.className = "imageBox";

  container.setAttribute('nav-selectable', 'true');
  container.setAttribute('selected', 'false');

  container.appendChild(entry);
  container.appendChild(tag);
  container.id = "done";

  gridContainer.appendChild(container);
}

function setColumnNumber() {
  var navColumnSize = STATE.activeView.getAttribute("nav-column-size");
  STATE.activeColumnSize = navColumnSize ? parseInt(navColumnSize) : 2;
}

function setNavIndices() {
  var allActiveElements = getAllElements();

  for (let index = 0; index < allActiveElements.length; index++) {
    allActiveElements[index].setAttribute("nav-index", index);
  }

}

function changeViewTo(viewName) {
  for (let index = 0; index < STATE.views.length; index++) {
    if (STATE.views[index].id === viewName) {
      STATE.activeView.classList.remove('active')
      STATE.activeView = STATE.views[index];
      STATE.activeViewID = index;

      STATE.activeViewName = STATE.activeView.id;
      STATE.activeView.classList.add('active')

      setNaviItems();
      setNavIndices();

      const firstElement = STATE.naviItems[0];
      firstElement.scrollIntoView({ behavior: "smooth" });
      firstElement.setAttribute("nav-selected", "true");
      firstElement.focus();
      firstElement.focus();

      setColumnNumber();

    }

  }
}

function add_new_choice(gridContainerID, containerClassName, file_loc, name) {
  var gridContainer = document.getElementById(gridContainerID);

  var container = document.createElement("div");
  var tag = document.createElement("b");
  tag.textContent = name;
  var entry = document.createElement("img");

  entry.src = file_loc;
  entry.alt = name;

  // Needed to make the image tags focusable
  container.tabIndex = -1;

  container.className = containerClassName;

  container.setAttribute('nav-selectable', 'true');
  container.setAttribute('image-selected', 'false');

  container.appendChild(entry);
  container.appendChild(tag);

  gridContainer.appendChild(container);
}

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

// Expects current view to be fishCaughtView
function set_tallies(count) {
  const tallies = STATE.activeView.querySelector("#tallyText");
  // Clear children nodes
  while (tallies.firstChild) {
    tallies.removeChild(tallies.lastChild);
  }
  // tallies.innerHtml = '';
  for (let i = 0; i < Math.floor(count / 5); i++) {
    const tally = document.createElement("s");
    const space = document.createElement("b");
    space.textContent = " ";
    tally.textContent = "||||"
    tallies.appendChild(tally);
    tallies.appendChild(space);
  }
  let tally = document.createElement("b");
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