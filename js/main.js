// configurazione
const CELLS = 101;   // larghezza automa (celle)
const STEPS = 200;   // numero di righe (evoluzioni)
const CELL_SIZE = 4;

let canvas;
let ctx;
let grid = [];
let ruleset = [1, 0, 1, 1, 0, 1, 1, 0];

document.addEventListener("DOMContentLoaded", () => {
  initCanvas();
  initGrid();
  drawGrid();
});

function initCanvas() {
    canvas = document.getElementById("automataCanvas");
    ctx = canvas.getContext("2d");

    canvas.width  = CELLS * CELL_SIZE;
    canvas.height = STEPS * CELL_SIZE;

    ctx.fillStyle = "black";
    //prova
    for(let i = 1; i < STEPS; i++) {
        setTimeout(function () {
            step(i);
            drawNextRow(i);
        }, i*25); //evoluzione ogni 0.025s
    }
}

function initGrid() {
    grid = [];

    for (let y = 0; y < STEPS; y++) {
      let row = new Array(CELLS).fill(0);

      // condizione iniziale: cella centrale accesa
      if (y === 0) {
        row[Math.floor(CELLS / 2)] = 1;
      }

      grid.push(row);
    }
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === 1) {
          ctx.fillRect(
            x * CELL_SIZE,
            y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
          );
        }
      }
    }
}

function step(idx) {
    const prev = grid[idx-1];
    const next = new Array(CELLS).fill(0);
    
    //celle laterali copiano il valore superiore
    next[0] = prev[0];
    next[CELLS-1] = prev[CELLS-1];
    
    for(let x = 1; x < CELLS-1; x++) {
        next[x] = calculateState(prev[x-1], prev[x], prev[x+1]); //calcolo l'evoluzione dalle 3 celle superiori in base al ruleset
    }

    grid[idx] = next;
}

function drawNextRow(idx) {
    for(let x = 1; x < CELLS-1; x++) {
        if(grid[idx][x] === 1){
            ctx.fillRect(
                x * CELL_SIZE,
                idx * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE
              );
        }
    }
}

function calculateState (left, center, right) {
    //uso aritmetica per determinare il caso
    //    lcr = l00+0c0+00r = state = ruleset[i]
    const state = (left << 2) + (center << 1) + right;
    return ruleset[state];
}