// Build with assumption of grid with width of 2 items

window.addEventListener('DOMContentLoaded', function() {
    var mainlist = document.getElementById('gear_list')
    var totalGear = 0;

    window.addEventListener('keydown', function(e) {
      switch(e.key) {
        case 'Enter':
          Enter(e);
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
          Right(e)
          break;
      }})



    function add_new_gear(file_loc, name){
        var gridContainer = document.getElementById('gear_list');
        var itemWidth = 50;

        var entry = document.createElement("img");
        entry.tabIndex = totalGear;
        entry.src = file_loc;
        entry.alt = name;
        entry.className = 'gearItem';
        entry.style.width = itemWidth + "%";
        entry.setAttribute('nav-selectable', 'true');
        entry.setAttribute('selected', 'false');

        totalGear++;

        gridContainer.appendChild(entry);
    }

    function addDoneButton(){
      var gridContainer = document.getElementById('gear_list');
      var itemWidth = 50;

      var entry = document.createElement("img");
      entry.tabIndex = totalGear;
      entry.src = "../resources/done.png";
      entry.alt = "done";
      entry.className = 'doneButton';
      entry.id = 'done';
      entry.style.width = itemWidth + "%";
      entry.setAttribute('nav-selectable', 'true');
      entry.setAttribute('selected', 'false');

      totalGear++;

      gridContainer.appendChild(entry);
  }

    add_new_gear("../resources/gear/rodandhook.png", "rodandhook");
    add_new_gear("../resources/gear/net.png", "net");
    add_new_gear("../resources/gear/spear.png", "spear");
    add_new_gear("../resources/gear/realfish1.png", "realfish1");
    add_new_gear("../resources/gear/realfish2.png", "realfish2");
    addDoneButton();

    (() => {
      const firstElement = document.querySelectorAll("[nav-selectable]")[0];
      firstElement.setAttribute("nav-selected", "true");
      firstElement.setAttribute("nav-index", "0");
      firstElement.focus();
    })();

  }, false)


  const getAllElements = () => document.querySelectorAll("[nav-selectable]");


const getTheIndexOfTheSelectedElement = () => {
  const element = document.querySelector("[nav-selected=true]");
  return element ? parseInt(element.getAttribute("nav-index"), 10) : 0;
};

const selectElement = selectElement =>
  [].forEach.call(getAllElements(), (element, index) => {
    const selectThisElement = element === selectElement;
    element.setAttribute("nav-selected", selectThisElement);
    element.setAttribute("nav-index", index);
    selectThisElement ? element.focus() : element.blur();
    // console.log(index + " : " + element.alt);
  });

  const Down = event => {
    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();
    const goToFirstElement = currentIndex + 2 > allElements.length - 1;
    const setIndex = goToFirstElement ? 0 : currentIndex + 2;
    selectElement(allElements[setIndex] || allElements[0]);
  };
  
  const Up = event => {
    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();
    const goToLastElement = currentIndex === 0 || currentIndex === 1;
    const setIndex = goToLastElement ? allElements.length - 1 : currentIndex - 2;
    selectElement(allElements[setIndex] || allElements[0]);
  };

  const Left = event => {
    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();
    const goToLastElement = currentIndex === 0;
    const setIndex = goToLastElement ? allElements.length - 1 : currentIndex - 1;
    selectElement(allElements[setIndex] || allElements[0]);
  };

  const Right = event => {
    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();
    const goToFirstElement = currentIndex + 1 > allElements.length - 1;
    const setIndex = goToFirstElement ? 0 : currentIndex + 1;
    selectElement(allElements[setIndex] || allElements[0]);
  };

  const Enter = event => {
    const allElements = getAllElements();
    const currentIndex = getTheIndexOfTheSelectedElement();
    currentElement = allElements[currentIndex];
    if(currentElement.id === "done") {
      const chosenGear = storeChosen();
      console.log(chosenGear);
    } else if(currentElement.getAttribute('selected') === 'true') {
      currentElement.setAttribute('selected', 'false');
    } else {
      currentElement.setAttribute('selected', 'true');
    }
  }

  function storeChosen() {
    const allElements = getAllElements();
    const chosenIds = [];
    for (let index = 0; index < allElements.length; index++) {
      const element = allElements[index]; 
      if(element.getAttribute('selected') === 'true'){
              chosenIds.push(parseInt(element.getAttribute("nav-index"), 10));
            }

    }
    
    return chosenIds;
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

      // navigator.geolocation.getCurrentPosition(success, error, options);

  
  