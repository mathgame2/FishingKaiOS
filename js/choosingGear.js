window.addEventListener("load", function () {
    populateGear();
    setGearEnterKeyHandlers();
})

// Add new gear types here
// Loads gear images into the correct views
function populateGear() {
    const rootView = document.getElementById("rootView");
    for (let i = 0; i < gearConfig.length; i++) {
        const newView = createNewGearTypeView(gearConfig[i].viewName, gearConfig[i].gearType, gearConfig[i].filePath, gearConfig[i].id);
        rootView.appendChild(newView);
        attachGearsToView(newView, gearConfig[i].gears);
    }

    // Update all views
    STATE.views = document.getElementById("rootView").querySelectorAll(".view");

    addDoneButton('gearView');
    addDoneButton('staticGearView');
    addDoneButton('encirclingGearView');
    addDoneButton('towedGearView');

}

function createNewGearTypeView(viewName, gearType, filePath, typeID) {
    const view = document.createElement("div");
    view.classList.add("view");
    view.id = viewName;
    view.setAttribute("nav-column-size", "2");

    add_new_image_box("gearView", typeID, filePath, gearType);

    return view;
}

function attachGearsToView(gearView, gears) {
    for (let i = 0; i < gears.length; i++) {
        add_new_image_box(gearView.id, gears[i].id, gears[i].filePath, gears[i].gearName)
    }
}

function setGearEnterKeyHandlers() {
    var gridViewContainer = document.getElementById('gearView');

    gridViewContainer.enterKeyHandler = event => {
        const gearViewIndex = parseInt(event.target.getAttribute("localid"));
        if (gearViewIndex === -1) {
            populateChosenGear();
            changeViewTo("gearRecordView");
        } else {
            changeViewTo(gearConfig[gearViewIndex].viewName);
        }
    }

    const specificGearViewEnterKeyHandler = event => {
        const allElements = getAllElements();
        const currentIndex = getTheIndexOfTheSelectedElement();
        const currentElement = allElements[currentIndex];

        // If done is selected, return back to gearView view
        if (parseInt(event.target.getAttribute("localid")) === -1) {
            changeViewTo("gearView");
            // If not, toggle the currently focused gear
        } else if (currentElement.getAttribute('image-selected') === 'true') {
            // Remove the gear from the selected list if already chosen
            currentElement.setAttribute('image-selected', 'false');
            for (let i = 0; i < STATE.registeredGear.length; i++) {
                if (STATE.registeredGear[i].getAttribute("localid") === currentElement.getAttribute("localid")) {
                    STATE.registeredGear.splice(i, 1);
                }
            }
        } else {
            // Add gear to selected list if not already chosen
            currentElement.setAttribute('image-selected', 'true');
            STATE.registeredGear.push(currentElement);
        }
    };

    document.getElementById('staticGearView').enterKeyHandler = specificGearViewEnterKeyHandler;
    document.getElementById('towedGearView').enterKeyHandler = specificGearViewEnterKeyHandler;
    document.getElementById('encirclingGearView').enterKeyHandler = specificGearViewEnterKeyHandler;


    document.getElementById("gearRecordView").enterKeyHandler = event => {
        const curElement = event.target;
        // current record is for persistence, currently not fully utilised or implemented except for image loading purposes
        var currentRecord = {};
        currentRecord.gear = curElement.querySelector("b").textContent;
        STATE.currentRecord = currentRecord;
        changeViewTo("unitView");
    }

}

// Add the registered gear to the screen for choosing gear
function populateChosenGear() {
    const gearRecordView = document.getElementById("gearRecordView");

    // Clear children nodes
    while (gearRecordView.firstChild) {
        gearRecordView.removeChild(gearRecordView.lastChild);
    }

    // Create new nodes and copy over the information such as image src and text content to the new node
    for (let index = 0; index < STATE.registeredGear.length; index++) {
        const copy = document.createElement('div');
        copy.tabIndex = -1;

        copy.className = "imageBox";

        copy.setAttribute('nav-selectable', 'true');
        copy.setAttribute('selected', 'false');
        copy.innerHTML = STATE.registeredGear[index].innerHTML;
        gearRecordView.appendChild(copy);
    }
}