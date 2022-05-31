const width = document.getElementById("width");
const height = document.getElementById("height");
const density = document.getElementById("density");
const debugMode = document.getElementById("debug");
const regenerateButton = document.getElementById("regenerate");
const themeSelect = document.getElementById("themeSelect");
const themeLink = document.getElementById("themeLink");

function regenerate() {
    table.textContent = "";
    generate(width.value, height.value, density.value / 100);
}

function setDebugMode() {
    if (debugMode.checked) {
        table.classList.add("debugMode");
    } else {
        table.classList.remove("debugMode");
    }
}

function switchTheme() {
    themeLink.setAttribute("href", `css/${themeSelect.value}.css`);
}

width.addEventListener("input", regenerate);
height.addEventListener("input", regenerate);
density.addEventListener("input", regenerate);
regenerateButton.addEventListener("click", regenerate);
debugMode.addEventListener("input", setDebugMode);
themeSelect.addEventListener("input", switchTheme);

regenerate();
setDebugMode();
switchTheme();