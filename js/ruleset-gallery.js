const GALLERY_CONFIG = {
    CELLS: 81,
    STEPS: 200,
    CELL_SIZE: 3,
    WRAP_AROUND: false
};

let currentStartRule = 0;   //visualizzazione iniziale
const RULES_PER_PAGE = 16;  //numero di canvas da visualizzare
const MAX_RULE = 255;  //numero massimo di regole possibili (è sempre 255 per neighborhood da 3)
const automatonInstances = [];

document.addEventListener("DOMContentLoaded", () => {
    //inizializzazione della prima pagina
    setupAutomatons();
    renderRulesetBatch(currentStartRule);

    //setup dei listeners per i bottoni
    document.getElementById("prevBtn").addEventListener("click", handlePrev);
    document.getElementById("nextBtn").addEventListener("click", handleNext);
    document.getElementById("wrapAround").addEventListener("change", toggleWrapAround);
});

function toggleWrapAround(){
    GALLERY_CONFIG.WRAP_AROUND ? GALLERY_CONFIG.WRAP_AROUND = false : GALLERY_CONFIG.WRAP_AROUND = true;
    renderRulesetBatch(currentStartRule);
}

function handleNext() {
    // controlla se si trova già all'ultima pagina
    if (currentStartRule + RULES_PER_PAGE <= MAX_RULE) {
        currentStartRule += RULES_PER_PAGE;
        renderRulesetBatch(currentStartRule);
    }
}

function handlePrev() {
    if (currentStartRule - RULES_PER_PAGE >= 0) {
        currentStartRule -= RULES_PER_PAGE;
        renderRulesetBatch(currentStartRule);
    }
}

function setupAutomatons() {
    const container = document.getElementById("rulesetGrid");

    for (let i = 0; i < RULES_PER_PAGE; i++) {
        const ruleId = i; //id temporaneo, verrà aggiornato nel rendering
        
        const canvas = document.createElement("canvas");
        canvas.id = `gallery-canvas-${ruleId}`; // ID univoco

        const wrapper = document.createElement("div");
        wrapper.className = "rule-item";

        const label = document.createElement("div");
        label.className = "rule-label";

        wrapper.appendChild(canvas);
        wrapper.appendChild(label);
        container.appendChild(wrapper);
        
        //crea l'istanza e la salva nella mappa
        const automaton = new CellularAutomaton(canvas.id, GALLERY_CONFIG);
        automatonInstances.push(automaton);
    }
}

function renderRulesetBatch(startRule) {
    const container = document.getElementById("rulesetGrid");
    const rangeLabel = document.getElementById("rangeLabel");
    
    //calcola l'ultima regola di questo batch
    const endRule = Math.min(startRule + RULES_PER_PAGE - 1, MAX_RULE);
    
    //aggiorna l'etichetta del range
    rangeLabel.textContent = `Regole da ${startRule} a ${endRule}`;
    
    //itera e renderizza
    for (let i = 0; i < RULES_PER_PAGE; i++) {
        const wrapper = container.children[i];
        const label = wrapper.querySelector('.rule-label');
        label.textContent = `Regola ${startRule+i}`;
        const automaton = automatonInstances[i];
        automaton.WRAP_AROUND = GALLERY_CONFIG.WRAP_AROUND;
        automaton.reset();
        automaton.ruleset = ruleToRulesetArray(startRule+i);

        renderStaticAutomaton(automaton);
    }
}

function renderStaticAutomaton(automaton) { //render istantaneo per automi statici di galleria
    for (let i = 1; i < automaton.STEPS; i++) {
        automaton.step(i);
        automaton.drawRow(i);
    }
}

function ruleToRulesetArray(rule) { //converte numero in array in binario
    const binaryString = rule.toString(2); 
    const paddedBinaryString = binaryString.padStart(8, '0');
    const binaryStringArray = paddedBinaryString.split(''); 

    const ruleset = [];
    
    binaryStringArray.forEach(stringaDigit => {
        const numeroDigit = parseInt(stringaDigit);
        ruleset.push(numeroDigit);
    });

    ruleset.reverse(); //la classe codifica i ruleset per un'interfaccia di gioco che li codifica all'inverso (lsb...msb)

    return ruleset;
}