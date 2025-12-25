let punti = 0;
let rounds = 0;

function compareGrids(gridA, gridB) {
    if (gridA.length !== gridB.length) return false;

    for (let i = 0; i < gridA.length; i++) {
        const rowA = gridA[i];
        const rowB = gridB[i];

        if (rowA.length !== rowB.length) return false;
        
        // Confronto riga per riga, cella per cella
        for (let j = 0; j < rowA.length; j++) {
            if (rowA[j] !== rowB[j]) {
                return false;
            }
        }
    }
    return true; // Se tutti gli elementi coincidono
}

function checkMatch() {
    // Confronta la griglia finale dell'automa di gioco con quella del giocatore
    const match = compareGrids(gameAutomaton.grid, playerAutomaton.grid);
    
    const display = document.getElementById("roundDisplay");
    
    if (match) {
        punti++; 
        display.innerHTML = "✅ **MATCH!** Regola trovata. (+1 Punto)";
    } else {
        display.innerHTML = "❌ **NO MATCH!** Le evoluzioni non coincidono.";
    }

    // Aggiorna subito il display del punteggio
    const punteggio = document.getElementById("scoreDisplay");
    punteggio.innerHTML = "Punti: " + punti;
    
    // Passa al round successivo dopo aver mostrato il risultato per 3 secondi
    setTimeout(() => {
        rounds++;
        gameAutomaton.reset();
        playerAutomaton.reset();
        
        // Resetta l'interfaccia delle regole (checkbox)
        document.querySelectorAll('#ruleset-selectors input[type="checkbox"]').forEach(input => {
            input.checked = false;
        });

        start(); // Avvia il nuovo round
    }, 3000); // 3 secondi per visualizzare il risultato
}

function submit() {
    const ruleInputs = document.querySelectorAll('#ruleset-selectors input[type="checkbox"]');

    //Leggi il ruleset del giocatore
    ruleInputs.forEach(input => {
        const index = parseInt(input.dataset.index); 
        if (input.checked) {
            playerAutomaton.ruleset[index] = 1; 
        } 
    });

    //Disabilita il pulsante e avvia l'evoluzione del giocatore
    const confirm = document.getElementById("submitRulesButton");
    confirm.disabled = true;
    playerAutomaton.startRendering();
    
    //Attendi che l'animazione del giocatore finisca prima di controllare il match
    //Il ritardo deve essere ALMENO pari alla durata totale dell'animazione.
    setTimeout(() => {
        checkMatch();
      }, CONFIG.STEPS * CONFIG.RENDER_DELAY_MS);
}

function gameEnd() {
    const display = document.getElementById("roundDisplay");
    display.innerHTML = `🏆 **GIOCO FINITO!** Punteggio finale: ${punti} su ${CONFIG.MAX_ROUNDS}.`;
    //Disabilita il pulsante Inizia/Avvia per finire
    document.getElementById("startGameButton").disabled = true;
    document.getElementById("submitRulesButton").disabled = true;
    fetch("../handlers/score.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "score=" + punti
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
    //Avvia l'animazione per l'automa di gioco
    gameAutomaton.startRendering();

    const confirm = document.getElementById("submitRulesButton");
    confirm.disabled = false;
    if(rounds === 0) {
        confirm.addEventListener("click", submit); // 1 volta
        document.getElementById("startGameButton").disabled = true;
    }

    const display = document.getElementById("roundDisplay");
    display.innerHTML = "Round " + (rounds+1) + " di " + CONFIG.MAX_ROUNDS;
    const punteggio = document.getElementById("scoreDisplay");
    punteggio.innerHTML = "Punti: " + punti;
}
