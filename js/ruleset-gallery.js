const CONFIG = {
    CELLS: 101,   // larghezza automa (celle)
    STEPS: 100,   // numero di righe (evoluzioni)
    CELL_SIZE: 15,
    WRAP_AROUND: true, // effetto pacman
    RENDER_DELAY_MS: 25
};

const container = document.getElementById("rulesetGrid");

let automaton;

document.addEventListener("DOMContentLoaded", () => {
    automaton = new CellularAutomaton(
        "playerCanvas", 
        CONFIG
    );

    document.getElementById("submitRulesButton").addEventListener("click", render)
});

function render(){
    const ruleInputs = document.querySelectorAll('#ruleset-selectors input[type="checkbox"]');

    ruleInputs.forEach(input => {
        const index = parseInt(input.dataset.index); 
        if (input.checked) {
            automaton.ruleset[index] = 1; 
        } 
    });

    automaton.startRendering();
}

function ruleToRulesetArray(rule) { //Converte numero in array in binario
    const binaryString = rule.toString(2); 
    const paddedBinaryString = binaryString.padStart(8, '0');
    const binaryStringArray = paddedBinaryString.split(''); 

    const ruleset = []; // Array vuoto che conterrà i numeri
    
    //Scorro l'array
    binaryStringArray.forEach(stringaDigit => {
        //Converte la stringa ('0' o '1') nel numero (0 o 1) e lo aggiunge al nuovo array
        const numeroDigit = parseInt(stringaDigit);
        ruleset.push(numeroDigit);
    });

    ruleset.reverse(); //La classe codifica i ruleset per un'interfaccia di gioco che li codifica all'inverso (lsb...msb)

    return ruleset;
}