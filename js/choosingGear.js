window.addEventListener("load", function () {
    populateGear();
    setEnterKeyHandler();
})

function add_new_gear(file_loc, name){
    var gridContainer = document.getElementById('gearList');

    var container = document.createElement("div");
    var tag = document.createElement("b");
    tag.textContent = name;
    var entry = document.createElement("img");

    entry.src = file_loc;
    entry.alt = name;
    entry.className = 'gearItem';

    // Needed to make the image tags focusable
    container.tabIndex = -1;

    container.className = "gearBox";
    
    container.setAttribute('nav-selectable', 'true');
    container.setAttribute('selected', 'false');

    container.appendChild(entry);
    container.appendChild(tag);


    gridContainer.appendChild(container);
}


// Add new gear types here
function populateGear(){
    add_new_gear("../resources/gear/rodandhook.png", "rodandhook");
    add_new_gear("../resources/gear/net.png", "net");
    add_new_gear("../resources/gear/spear.png", "spear");
    add_new_gear("../resources/fish/fish1.png", "fish1");
    add_new_gear("../resources/fish/fish2.png", "fish2");
    add_new_gear("../resources/gear/rodandhook.png", "rodandhook");
    add_new_gear("../resources/gear/net.png", "net");
    add_new_gear("../resources/gear/spear.png", "spear");
    add_new_gear("../resources/fish/fish1.png", "fish1");
    add_new_gear("../resources/fish/fish2.png", "fish2");
}

function setEnterKeyHandler(){
    var gridContainer = document.getElementById('gearView');
    gridContainer.enterKeyHandler = event => {
        const allElements = getAllElements();
        const currentIndex = getTheIndexOfTheSelectedElement();
        currentElement = allElements[currentIndex];
        if(currentElement.id === "done") {
          const chosenGear = storeChosen();
        } else if(currentElement.getAttribute('gear-selected') === 'true') {
            console.log("HELLO");
          currentElement.setAttribute('gear-selected', 'false');
        } else {
            console.log("HEL");
          currentElement.setAttribute('gear-selected', 'true');
        }
      }
}

//   function storeChosen() {
//     const allElements = getAllElements();
//     const chosenIds = [];
//     for (let index = 0; index < allElements.length; index++) {
//       const element = allElements[index]; 
//       if(element.getAttribute('selected') === 'true'){
//               chosenIds.push(parseInt(element.getAttribute("nav-index"), 10));
//             }

//     }

//     return chosenIds;
//   }