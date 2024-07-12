// Global app state
var STATE = {}

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
  if (document.activeElement.tagName.toLowerCase() !== 'input') {
    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();
    const goToFirstElement = currentIndex + 1 > allElements.length - 1;
    const setIndex = goToFirstElement ? 0 : currentIndex + 1;
    selectElement(setIndex);
  }

};

const Left = event => {
  if (document.activeElement.tagName.toLowerCase() !== 'input') {
    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();
    const goToLastElement = currentIndex - 1 < 0;
    const setIndex = goToLastElement ? allElements.length - 1 : currentIndex - 1;
    selectElement(setIndex);
  }

};

const Down = event => {
  const allElements = getAllElements();
  const currentIndex = getTheIndexOfTheSelectedElement();
  const goToFirstElement = currentIndex + STATE.activeColumnSize > allElements.length - 1;
  const setIndex = goToFirstElement ? 0 : currentIndex + STATE.activeColumnSize;

  selectElement(setIndex);
};

const Up = event => {
  const allElements = getAllElements();
  const currentIndex = getTheIndexOfTheSelectedElement();
  const goToLastElement = currentIndex - STATE.activeColumnSize < 0;
  const setIndex = goToLastElement ? allElements.length - 1 : currentIndex - STATE.activeColumnSize;

  selectElement(setIndex);
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

function changeViewTo(viewName){
  for (let index = 0; index < STATE.views.length; index++) {
    if (STATE.views[index].id === viewName) {
        STATE.activeView.classList.remove('active')
        STATE.activeView = STATE.views[index];
        STATE.activeViewID = index;

        STATE.activeViewName = STATE.activeView.getAttribute("id");
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