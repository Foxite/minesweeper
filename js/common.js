const table = document.querySelector("#gametable");

function getWidth() {
    return parseInt(table.getAttribute("data-width"));
}

function getHeight() {
    return parseInt(table.getAttribute("data-height"));
}

function generate(width, height, freq) {
    table.setAttribute("data-width", width);
    table.setAttribute("data-height", height);

    table.classList.remove("revealed");

    for (let y = 0; y < height; y++) {
        const row = document.createElement("tr");
        for (let x = 0; x < width; x++) {
            const cell = document.createElement("td");

            cell.addEventListener("click", evt => revealCell(evt.target));
            cell.addEventListener("contextmenu", evt => {
                evt.preventDefault();
                flagCell(evt.target)
            });

            cell.setAttribute("data-x", x);
            cell.setAttribute("data-y", y);

            if (Math.random() < freq) {
                cell.classList.add("mine")
            }

            cell.innerText = " ";

            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    for (let y = 0; y < height; y++) {
        const row = table.rows[y];
        for (let x = 0; x < width; x++) {
            const cell = row.cells[x];
            const surroundingMines = getNeighboringCells(cell).filter(cell2 => cell2.classList.contains("mine")).length;
            cell.setAttribute("data-surrounding-mines", surroundingMines);

            cell.style.color = [
                "",
                "blue",
                "green",
                "red",
                "darkblue",
                "brown",
                "turqoise",
                "black",
                "scarlet",
            ][surroundingMines];
        }
    }
}

function getCell(x, y) {
    return table.rows[y].cells[x];
}

function getNeighboringCells(cell) {
    const cellX = parseInt(cell.getAttribute("data-x"));
    const cellY = parseInt(cell.getAttribute("data-y"));
    const offsets = [[0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1]];
    const positions = offsets.map(pos => [cellX + pos[0], cellY + pos[1]])
    const width = getWidth();
    const height = getHeight();
    const existingPositions = positions.filter(pos => pos[0] >= 0 && pos[0] < width && pos[1] >= 0 && pos[1] < height);
    const cells = existingPositions.map(pos => getCell(pos[0], pos[1]));
    return cells;
}

function revealCell(cell) {
    cell.classList.add("revealed");
    if (cell.classList.contains("mine")) {
        table.classList.add("revealed");
    } else if (cell.getAttribute("data-surrounding-mines") == "0") {
        getNeighboringCells(cell).filter(cell => !cell.classList.contains("mine") && !cell.classList.contains("revealed")).forEach(revealCell);
    } else {
        cell.textContent = cell.getAttribute("data-surrounding-mines");
    }
}

function flagCell(cell) {
    if (cell.classList.contains("flag")) {
        cell.classList.remove("flag");
    } else {
        cell.classList.add("flag");
    }
}
