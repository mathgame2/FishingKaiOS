window.addEventListener("load", function () {
    populateGear();
    setGearEnterKeyHandlers();
})

// Add new gear types here
function populateGear() {
    add_new_gear_icons("../resources/gear/staticGearIcon.png", "Static Gear");
    add_new_gear_icons("../resources/gear/towedGearIcon.png", "Towed Gear");
    add_new_gear_icons("../resources/gear/encirclingGearIcon.png", "Encircling Gear");
    addDoneButton('gearView');

    add_new_static_gear("../resources/gear/static/crabpot.png", "Crabpot");
    add_new_static_gear("../resources/gear/static/gillnet.png", "Gillnet");
    add_new_static_gear("../resources/gear/static/lining.png", "Lining");
    addDoneButton('staticGearView');

    add_new_encircling_gear("../resources/gear/encircling/beachSeine.png", "Beach Seine");
    add_new_encircling_gear("../resources/gear/encircling/purseSeine.png", "Purse Seine");
    add_new_encircling_gear("../resources/gear/encircling/ringnet.png", "Ringnet");
    addDoneButton('encirclingGearView');

    add_new_towed_gear("../resources/gear/towed/beamTrawl.png", "Beam Trawl");
    add_new_towed_gear("../resources/gear/towed/demersalTrawl.png", "Demersal Trawl");
    add_new_towed_gear("../resources/gear/towed/pelagicTrawl.png", "Pelagic Trawl");
    addDoneButton('towedGearView');

}

function add_new_gear_icons(file_loc, name) {
    add_new_choice("gearView", "imageBox", file_loc, name);
}

function add_new_static_gear(file_loc, name) {
    add_new_choice("staticGearView", "imageBox", file_loc, name);
}

function add_new_towed_gear(file_loc, name) {
    add_new_choice("towedGearView", "imageBox", file_loc, name);
}
function add_new_encircling_gear(file_loc, name) {
    add_new_choice("encirclingGearView", "imageBox", file_loc, name);
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

function setGearEnterKeyHandlers() {
    var gridViewContainer = document.getElementById('gearView');

    gridViewContainer.enterKeyHandler = event => {
        switch (event.target.querySelector("b").textContent) {
            case "Static Gear":
                changeViewTo("staticGearView");
                break;

            case "Towed Gear":
                changeViewTo("towedGearView");
                break;

            case "Encircling Gear":
                changeViewTo("encirclingGearView");
                break;

            case "done":
                populateChosenGear();
                changeViewTo("gearRecordView");
                break;
            default:
                break;
        }
    }

    const specificGearViewEnterKeyHandler = event => {
        const allElements = getAllElements();
        const currentIndex = getTheIndexOfTheSelectedElement();
        currentElement = allElements[currentIndex];
        if (currentElement.id === "done") {
            changeViewTo("gearView");
        } else if (currentElement.getAttribute('image-selected') === 'true') {

            currentElement.setAttribute('image-selected', 'false');
            for (let i = 0; i < STATE.registeredGear.length; i++) {
                if (STATE.registeredGear[i].querySelector("b").textContent === currentElement.querySelector("b").textContent) {
                    STATE.registeredGear.splice(i, 1);
                }

            }

        } else {
            currentElement.setAttribute('image-selected', 'true');
            STATE.registeredGear.push(currentElement);
        }
    };

    document.getElementById('staticGearView').enterKeyHandler = specificGearViewEnterKeyHandler;
    document.getElementById('towedGearView').enterKeyHandler = specificGearViewEnterKeyHandler;
    document.getElementById('encirclingGearView').enterKeyHandler = specificGearViewEnterKeyHandler;

    document.getElementById("gearRecordView").enterKeyHandler = event => {
        const curElement = event.target;
        var currentRecord = {};
        currentRecord.gear = curElement.querySelector("b").textContent;
        STATE.currentRecord = currentRecord;
        changeViewTo("unitView");
    }

}

function populateChosenGear() {
    const gearRecordView = document.getElementById("gearRecordView");

    // Clear children nodes
    while (gearRecordView.firstChild) {
        gearRecordView.removeChild(gearRecordView.lastChild);
    }

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