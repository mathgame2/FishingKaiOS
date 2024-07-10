window.addEventListener("load", function () {
    populateGear();
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