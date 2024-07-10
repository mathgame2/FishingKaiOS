window.addEventListener("load", function () {
    populateGear();
})

function add_new_gear(file_loc, name){
    var gridContainer = document.getElementById('gearList');
    var itemWidth = 50;

    var entry = document.createElement("img");

    entry.src = file_loc;
    entry.alt = name;
    entry.className = 'gearItem';

    entry.style.width = itemWidth + "%";
    
    entry.setAttribute('nav-selectable', 'true');
    entry.setAttribute('selected', 'false');

    gridContainer.appendChild(entry);
}


// Add new gear types here
function populateGear(){
    add_new_gear("../resources/gear/rodandhook.png", "rodandhook");
    add_new_gear("../resources/gear/net.png", "net");
    add_new_gear("../resources/gear/spear.png", "spear");
    add_new_gear("../resources/fish/fish1.png", "fish1");
    add_new_gear("../resources/fish/fish2.png", "fish2");
}