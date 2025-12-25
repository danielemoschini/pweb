/**
 * Classe che gestisce l'inizializzazione, l'evoluzione e il rendering
 * di un singolo Automa Cellulare su un canvas.
 */
class CellularAutomaton {
  constructor(canvasId, config) {
    // Configurazione ereditata
    this.CELLS = config.CELLS;
    this.STEPS = config.STEPS;
    this.CELL_SIZE = config.CELL_SIZE;
    this.WRAP_AROUND = config.WRAP_AROUND;

    // Dati dell'automa
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.ruleset = new Array(8).fill(0);
    this.grid = [];

    // Inizializzazione
    this.initCanvas();
    this.grid = this.initGrid();

    // Disegna lo stato iniziale (riga 0) immediatamente
    this.drawRow(0);
  }

  initCanvas() {
    this.canvas.width = this.CELLS * this.CELL_SIZE;
    this.canvas.height = this.STEPS * this.CELL_SIZE;
    this.ctx.fillStyle = "#1B6E98";
  }

  initGrid() { // Crea la griglia e piazza la cella centrale nera nella riga 0
    let grid = [];

    for (let y = 0; y < this.STEPS; y++) {
      let row = new Array(this.CELLS).fill(0);

      if (y === 0) {
        row[Math.floor(this.CELLS / 2)] = 1;
      }

      grid.push(row);
    }
    return grid;
  }

  // Corrisponde alla tua vecchia calculateState (deve ricevere ruleset)
  calculateState(left, center, right) {
    if (!this.ruleset) return 0; // Se non ci sono regole, non evolve
    const state = (left << 2) + (center << 1) + right;
    return this.ruleset[state];
  }

  // Corrisponde alla tua vecchia step (opera su this.grid)
  step(idx) {
    const prev = this.grid[idx - 1];
    const next = new Array(this.CELLS).fill(0);

    for (let x = 0; x < this.CELLS; x++) {
      let left, right;

      // Logica per gestire i bordi e il wrap-around
      if (this.WRAP_AROUND) {
        left = prev[(x - 1 + this.CELLS) % this.CELLS];
        right = prev[(x + 1 + this.CELLS) % this.CELLS];
      } else {
        // Senza wrap-around: i vicini esterni sono 0, gli interni sono prev[x +/- 1]
        left = (x === 0) ? 0 : prev[x - 1];
        right = (x === this.CELLS - 1) ? 0 : prev[x + 1];
      }

      // Regola: se non c'è wrap-around, i bordi copiano il valore superiore
      if (!this.WRAP_AROUND && (x === 0 || x === this.CELLS - 1)) {
        next[x] = prev[x];
      } else {
        next[x] = this.calculateState(left, prev[x], right);
      }
    }
    this.grid[idx] = next;
  }

  drawRow(idx) {
    for (let x = 0; x < this.CELLS; x++) {
      if (this.grid[idx] && this.grid[idx][x] === 1) {
        this.ctx.fillRect(
          x * this.CELL_SIZE,
          idx * this.CELL_SIZE,
          this.CELL_SIZE,
          this.CELL_SIZE
        );
      }
    }
  }

  startRendering() {
    if (!this.ruleset) {
      console.error("Ruleset non definito. Impossibile iniziare l'evoluzione.");
      return;
    }

    // Animazione riga per riga, parte dalla riga 1 (la 0 è già disegnata)
    for (let i = 1; i < this.STEPS; i++) {
      setTimeout(() => {
        this.step(i);
        this.drawRow(i);
      }, i * CONFIG.RENDER_DELAY_MS);
    }
  }

  reset() {
    this.grid = this.initGrid();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawRow(0);
  }
}