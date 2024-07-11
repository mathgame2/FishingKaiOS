window.addEventListener("load", function () {
    populateGear();
    setEnterKeyHandler();
})

// Add new gear types here
function populateGear() {
    add_new_gear_icons("../resources/gear/staticGearIcon.png", "Static Gear");
    add_new_gear_icons("../resources/gear/towedGearIcon.png", "Towed Gear");
    add_new_gear_icons("../resources/gear/encirclingGearIcon.png", "Encircling Gear");

    add_new_static_gear("../resources/gear/static/crabpot.png", "Crabpot");
    add_new_static_gear("../resources/gear/static/gillnet.png", "Gillnet");
    add_new_static_gear("../resources/gear/static/lining.png", "Lining");
    addDoneButton('staticGearList');

    add_new_encircling_gear("../resources/gear/encircling/beachSeine.png", "Beach Seine");
    add_new_encircling_gear("../resources/gear/encircling/purseSeine.png", "Purse Seine");
    add_new_encircling_gear("../resources/gear/encircling/ringnet.png", "Ringnet");
    addDoneButton('encirclingGearList');

    add_new_towed_gear("../resources/gear/towed/beamTrawl.png", "Beam Trawl");
    add_new_towed_gear("../resources/gear/towed/demersalTrawl.png", "Demersal Trawl");
    add_new_towed_gear("../resources/gear/towed/pelagicTrawl.png", "Pelagic Trawl");
    addDoneButton('towedGearList');

    addDoneButton('gearList');
}

function add_new_gear_icons(file_loc, name) {
    add_new_choice("gearList", "gearBox", file_loc, name);
}

function add_new_static_gear(file_loc, name) {
    add_new_choice("staticGearList", "gearBox", file_loc, name);
}

function add_new_towed_gear(file_loc, name) {
    add_new_choice("towedGearList", "gearBox", file_loc, name);
}
function add_new_encircling_gear(file_loc, name) {
    add_new_choice("encirclingGearList", "gearBox", file_loc, name);
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
    container.setAttribute('selected', 'false');

    container.appendChild(entry);
    container.appendChild(tag);


    gridContainer.appendChild(container);
}

function setEnterKeyHandler() {
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
                console.log("MOVING ON : )");
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
        } else if (currentElement.getAttribute('gear-selected') === 'true') {
            currentElement.setAttribute('gear-selected', 'false');
        } else {
            currentElement.setAttribute('gear-selected', 'true');
        }
    };

    document.getElementById('staticGearView').enterKeyHandler = specificGearViewEnterKeyHandler;
    document.getElementById('towedGearView').enterKeyHandler = specificGearViewEnterKeyHandler;
    document.getElementById('encirclingGearView').enterKeyHandler = specificGearViewEnterKeyHandler;

}