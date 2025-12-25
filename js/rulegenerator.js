
// Lista curata di regole note per generare pattern complessi (Classe III e IV).
const COMPLEX_RULE_NUMBERS = [
    30, 54, 60, 90, 106, 110, 126, 150, 182, 188, 190, 225
];

// Regole che producono buoni pattern stabili, ma non banali (Classe II)
const STABLE_RULE_NUMBERS = [
    18, 50, 73, 137, 146, 154, 184
];

// Percentuale di probabilità di scegliere una regola *garantita* (COMPLEX o STABLE)
const CURATED_RULE_PROBABILITY = 0.8; // 80% di probabilità di scegliere una buona regola

/*
  Genera un ruleset con alta probabilità di produrre pattern complessi.
  L'80% delle volte, sceglie una regola da una lista curata.
  Il 20% delle volte, usa la randomizzazione con filtro di bilanciamento.
 */
function generateComplexRuleset() { 
    let ruleNumber;

    if (Math.random() < CURATED_RULE_PROBABILITY) {
        // Opzione A: Scegli una regola nota (80% delle volte)
        const allCuratedRules = COMPLEX_RULE_NUMBERS.concat(STABLE_RULE_NUMBERS);
        const randomIndex = Math.floor(Math.random() * allCuratedRules.length);
        ruleNumber = allCuratedRules[randomIndex];
    } else {
        // Opzione B: Randomizzazione pura con filtro di bilanciamento (20% delle volte)
        const MIN_ONES = 3;
        const MAX_ONES = 6;
        let ruleset = new Array(8);
        let onesCount;

        do {
            onesCount = 0;
            for (let i = 0; i < 8; i++) {
                ruleset[i] = Math.round(Math.random());
                if (ruleset[i] === 1) {
                    onesCount++;
                }
            }
        } while (onesCount < MIN_ONES || onesCount > MAX_ONES);
        
        return ruleset; 
    }

    // Se abbiamo scelto un numero (Opzione A), dobbiamo convertirlo in ruleset binario
    const ruleset = new Array(8);
    for (let i = 0; i < 8; i++) {
        // Converte il numero decimale (es. 110) nel ruleset binario [0, 1, 1, 0, 1, 1, 1, 0]
        // Utilizziamo l'operatore bitwise >> (shift a destra) e & (AND bitwise)
        ruleset[i] = (ruleNumber >> (7 - i)) & 1;
    }
    
    // NOTA: Wolfram convention è Rule[111] = ruleset[7], Rule[000] = ruleset[0]
    // La conversione binaria (ruleNumber) è già nell'ordine corretto se letta da 7 a 0 (MSB a LSB).
    return ruleset;
};