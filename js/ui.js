const width = document.getElementById("width");
const height = document.getElementById("height");
const density = document.getElementById("density");
const debugMode = document.getElementById("debug");
const regenerateButton = document.getElementById("regenerate");

function regenerate() {
    table.textContent = "";
    generate(width.value, height.value, density.value / 100);
}

width.addEventListener("input", regenerate);
height.addEventListener("input", regenerate);
density.addEventListener("input", regenerate);
regenerateButton.addEventListener("click", regenerate);

regenerate();

function setDebugMode() {
    if (debugMode.checked) {
        table.classList.add("debugMode");
    } else {
        table.classList.remove("debugMode");
    }
}

debugMode.addEventListener("input", setDebugMode);

setDebugMode();
