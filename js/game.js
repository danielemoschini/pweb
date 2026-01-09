const LEVEL_ROUNDS = {
    "Facile": 5,
    "Normale": 10,
    "Difficile": 15
};

let livello = "Facile";

let punti = 0;
let rounds = 0;

function compareGrids(gridA, gridB) { //return true se sono identiche
    if (gridA.length !== gridB.length) return false;

    for (let i = 0; i < gridA.length; i++) {
        const rowA = gridA[i];
        const rowB = gridB[i];

        if (rowA.length !== rowB.length) return false;
        
        for (let j = 0; j < rowA.length; j++) {
            if (rowA[j] !== rowB[j]) {
                return false;
            }
        }
    }
    return true;
}

function checkMatch() {
    //confronta la griglia finale dell'automa di gioco con quella del giocatore
    const match = compareGrids(gameAutomaton.grid, playerAutomaton.grid);
    
    const display = document.getElementById("roundDisplay");
    
    if (match) {
        punti++; 
        display.textContent = "✅ MATCH! Regola trovata. (+1 Punto)";
    } else {
        display.textContent = "❌ NO MATCH! Le evoluzioni non coincidono.";
    }

    //aggiorna il display del punteggio
    const punteggio = document.getElementById("scoreDisplay");
    punteggio.textContent = "Punti: " + punti;
    
    //passa al round successivo dopo aver mostrato il risultato per 3 secondi
    setTimeout(() => {
        rounds++;
        gameAutomaton.reset();
        playerAutomaton.reset();
        
        //resetta l'interfaccia delle regole (checkbox)
        document.querySelectorAll('#ruleset-selectors input[type="checkbox"]').forEach(input => {
            input.checked = false;
        });

        start(); //nuovo round
    }, 3000); //3 secondi per visualizzare il risultato
}

function submit() {
    const ruleInputs = document.querySelectorAll('#ruleset-selectors input[type="checkbox"]');

    //legge il ruleset del giocatore
    ruleInputs.forEach(input => {
        const index = parseInt(input.dataset.index); 
        if (input.checked) {
            playerAutomaton.ruleset[index] = 1; 
        } 
    });

    //disabilita il pulsante e avvia l'evoluzione del giocatore
    const confirm = document.getElementById("submitRulesButton");
    confirm.disabled = true;
    playerAutomaton.startRendering();
    
    //attende che l'animazione del giocatore finisca prima di controllare il match
    //il ritardo deve essere pari alla durata totale dell'animazione
    setTimeout(() => {
        checkMatch();
      }, CONFIG.STEPS * CONFIG.RENDER_DELAY_MS);
}

function gameEnd() {
    const display = document.getElementById("roundDisplay");
    display.textContent = `🏆 GIOCO FINITO! Punteggio finale: ${punti} su ${CONFIG.MAX_ROUNDS}.`;
    document.getElementById("submitRulesButton").disabled = true;
    fetch("../handlers/score.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "score=" + punti + "&difficulty=" + livello //livello => difficulty nel db
    });
}

function start() {
    //controllo round finiti
    if(rounds === CONFIG.MAX_ROUNDS){
        gameEnd();
        return;
    }
    //imposta ruleset automa di gioco e reset ruleset automa giocatore
    for (let i = 0; i < 8; i++) {
        gameAutomaton.ruleset[i] = Math.round(Math.random());
    }
    playerAutomaton.ruleset.fill(0);
    //avvia l'animazione per l'automa di gioco
    gameAutomaton.startRendering();

    const confirm = document.getElementById("submitRulesButton");
    confirm.disabled = false;
    if(rounds === 0) {  
        confirm.addEventListener("click", submit);
        document.getElementById("levelSelect").disabled = true;
        document.getElementById("startGameButton").disabled = true;
    }

    const display = document.getElementById("roundDisplay");
    display.textContent = "Round " + (rounds+1) + " di " + CONFIG.MAX_ROUNDS;
    const punteggio = document.getElementById("scoreDisplay");
    punteggio.textContent = "Punti: " + punti;
}
