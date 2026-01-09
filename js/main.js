const CONFIG = {
    CELLS: 51,   //larghezza automa (celle)
    STEPS: 50,   //numero di righe (evoluzioni)
    CELL_SIZE: 10,
    WRAP_AROUND: true, //effetto pacman
    RENDER_DELAY_MS: 25,
    MAX_ROUNDS: 5
};

let gameAutomaton;
let playerAutomaton;

document.addEventListener("DOMContentLoaded", () => {
    //creazione dell'automa di gioco 
    gameAutomaton = new CellularAutomaton(
        "gameCanvas", 
        CONFIG
    );

    //creazione dell'automa del giocatore 
    playerAutomaton = new CellularAutomaton(
        "playerCanvas", 
        CONFIG
    );

    CONFIG.MAX_ROUNDS = LEVEL_ROUNDS[livello];    
    const select = document.getElementById("levelSelect");
    select.addEventListener("change", (e) => {
        livello = e.target.value;
        CONFIG.MAX_ROUNDS = LEVEL_ROUNDS[livello];
    });

    document.getElementById("logoutButton").addEventListener("click", () => {window.location.href = "../handlers/logout.php";});

    const iniziaBtn = document.getElementById("startGameButton");
    iniziaBtn.addEventListener("click", start);
});