const CONFIG = {
    CELLS: 51,   // larghezza automa (celle)
    STEPS: 50,   // numero di righe (evoluzioni)
    CELL_SIZE: 10,
    WRAP_AROUND: true, // effetto pacman
    RENDER_DELAY_MS: 25,
    MAX_ROUNDS: 5
};

// temp placement: random ruleset con bit bilanciati per l'automa di gioco 
// pattern più complessi e interessanti si creano più spesso

//utilizzo di header rulegenerator.js per generare solo pattern "interessanti" di classe 4

/*
let gameRules = (() => {
        let ruleset = new Array(8);
        let onesCount = 0;

        // Bucle che continua finché non si genera un ruleset con un numero 
        // di '1' compreso tra MIN_ONES e MAX_ONES.
        do {
            onesCount = 0;
            for (let i = 0; i < 8; i++) {
                // Genera casualmente 0 o 1
                ruleset[i] = Math.round(Math.random());
                if (ruleset[i] === 1) {
                    onesCount++;
                }
            }
        } while (onesCount < 3 || onesCount > 6);

        return ruleset;
    })();*/
/* in alternativa random puro
for (let i = 0; i < 8; i++) {
    gameRules[i] = Math.round(Math.random());
}
*/

let gameAutomaton;
let playerAutomaton;

document.addEventListener("DOMContentLoaded", () => {
    //Creazione dell'Automa di Gioco 
    gameAutomaton = new CellularAutomaton(
        "gameCanvas", 
        CONFIG
    );

    //Creazione dell'Automa del Giocatore 
    playerAutomaton = new CellularAutomaton(
        "playerCanvas", 
        CONFIG
    );
    
    document.getElementById("logoutButton").addEventListener("click", () => {window.location.href = "../handlers/logout.php";});

    const iniziaBtn = document.getElementById("startGameButton");
    iniziaBtn.addEventListener("click", start);
});
