// Global app state
var STATE = {}

STATE.keyFunctions = {
  dUp: function () { Up(); },
  dDown: function () { Down(); },
  dLeft: function () { Left(); },
  dRight: function () { Right(); },
  softLeft: function () { goBack(); },
  softRight: function () { executeOption(); },
  enter: function () { execute(); },
  menu: function () { },
  back: function () { goBack(); },
  quit: function () { },
  other: function () { }
}


window.addEventListener("load", function() {
  var viewRoot = document.getElementById("viewRoot");

  STATE.views = viewRoot.querySelectorAll(".view");
  STATE.activeView = STATE.views[0];

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
  
  window.addEventListener('keydown', function(e) {
    switch(e.key) {
      case 'Enter':
          Enter(e)
        break;
      case 'ArrowUp': //scroll up
        Up(e);
        break;
      case 'ArrowLeft':
        break;
      case 'ArrowDown': //scroll down
        Down(e);
        break
      case 'ArrowRight':
        break;
    }})
  
    function Enter(event){
      switch (STATE.activeView.id){
        case 'registerView':
          const fisher_id = this.document.getElementById("fid");
          const boat_id = this.document.getElementById("bid");
          if (fisher_id.value && boat_id.value) {
            STATE.activeView.classList.remove('active');
            STATE.activeView = STATE.views[1];
            STATE.activeViewID = 1;
            STATE.activeViewName = STATE.activeView.getAttribute("id");
            STATE.activeView.classList.add('active');

            document.activeElement.blur();
            setNaviItems();
            setNavIndices();

            const firstElement = STATE.naviItems[0];
            firstElement.setAttribute("nav-selected", "true");

            firstElement.focus();
            setColumnNumber();
        }
        break;
      }
    }
  
    function setNaviItems(){
      for(var i = 0; i < STATE.naviItems.length; i++){
        STATE.naviItems[i].blur();
      }

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
    console.log(setIndex);
    console.log(nextElement);

    prevElement.setAttribute("nav-selected", false);
    prevElement.blur();

    nextElement.setAttribute("nav-selected", true);
    nextElement.focus();

    console.log(nextElement);

  }
  
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
  

  function addDoneButton(containerID){
    var gridContainer = document.getElementById(containerID);
    var itemWidth = 50;

    var entry = document.createElement("img");
    entry.src = "../resources/done.png";
    entry.alt = "done";
    entry.className = 'doneButton';
    entry.id = 'done';
    entry.style.width = itemWidth + "%";
    entry.setAttribute('nav-selectable', 'true');
    entry.setAttribute('selected', 'false');

    gridContainer.appendChild(entry);
}

function setColumnNumber(){
  var navColumnSize = STATE.activeView.getAttribute("nav-column-size");
  STATE.activeColumnSize = navColumnSize ? parseInt(navColumnSize) : 2;
}

function setNavIndices(){
  var allActiveElements = getAllElements();

  for (let index = 0; index < allActiveElements.length; index++) {
    allActiveElements[index].setAttribute("nav-index", index);
  }

}