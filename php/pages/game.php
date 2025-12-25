<?php
require '../handlers/session.php';
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/style.css">
    <title>Automata Match</title>

    <script src="../../js/automaton.js"></script>
    <script src="../../js/rulegenerator.js"></script>
    <script src="../../js/game.js"></script>
    <script src="../../js/main.js"></script>
</head>
<body>

    <header>
        <div class="account-links">
            <p id="username">Utente: <strong><?= htmlspecialchars($_SESSION['username']) ?></strong></p>
            <button id="logoutButton">Log Out</button>
            <form action="../handlers/delete.php" method="POST" onsubmit="return confirm('Sei sicuro di voler cancellare l’account?');">
                <button id="deleteAccountButton" type="submit">Cancella Account</button>
            </form>
        </div>
        <div class="game-links">
            <a href="leaderboard.php">Leaderboard</a> |
            <a href="manual.html">Manuale del gioco</a>
        </div>
    </header>

    <h1>AUTOMATA MATCH</h1>
    <div id="gameStatus">
        <p id="roundDisplay">Pronto. Premi 'Inizia Gioco'.</p>
        <p id="scoreDisplay"><strong>Punti: 0</strong></p>
        <button id="startGameButton">Inizia Gioco</button>
    </div>

    <div id="mainLayoutGrid">
        
        <div class="canvas-container" id="game-view">
            <h2>Automa Nascosto</h2>
            <canvas id="gameCanvas"></canvas>
        </div>
        
        <div id="playerInterface">
            <h2>Imposta la Regola (Output cella)</h2>
            
            <div id="ruleset-selectors">
                <label for="rule-7" class="rule-block">
                    <input type="checkbox" id="rule-7" data-index="7">
                    <div class="input-pattern">
                        <span class="cell active"></span><span class="cell active"></span><span class="cell active"></span>
                    </div>
                    <span class="arrow">⬇</span>
                    <div class="output-cell"><span class="cell output"></span></div>
                </label>

                <label for="rule-6" class="rule-block">
                    <input type="checkbox" id="rule-6" data-index="6">
                    <div class="input-pattern">
                        <span class="cell active"></span><span class="cell active"></span><span class="cell"></span>
                    </div>
                    <span class="arrow">⬇</span>
                    <div class="output-cell"><span class="cell output"></span></div>
                </label>

                <label for="rule-5" class="rule-block">
                    <input type="checkbox" id="rule-5" data-index="5">
                    <div class="input-pattern">
                        <span class="cell active"></span><span class="cell"></span><span class="cell active"></span>
                    </div>
                    <span class="arrow">⬇</span>
                    <div class="output-cell"><span class="cell output"></span></div>
                </label>

                <label for="rule-4" class="rule-block">
                    <input type="checkbox" id="rule-4" data-index="4">
                    <div class="input-pattern">
                        <span class="cell active"></span><span class="cell"></span><span class="cell"></span>
                    </div>
                    <span class="arrow">⬇</span>
                    <div class="output-cell"><span class="cell output"></span></div>
                </label>

                <label for="rule-3" class="rule-block">
                    <input type="checkbox" id="rule-3" data-index="3">
                    <div class="input-pattern">
                        <span class="cell"></span><span class="cell active"></span><span class="cell active"></span>
                    </div>
                    <span class="arrow">⬇</span>
                    <div class="output-cell"><span class="cell output"></span></div>
                </label>

                <label for="rule-2" class="rule-block">
                    <input type="checkbox" id="rule-2" data-index="2">
                    <div class="input-pattern">
                        <span class="cell"></span><span class="cell active"></span><span class="cell"></span>
                    </div>
                    <span class="arrow">⬇</span>
                    <div class="output-cell"><span class="cell output"></span></div>
                </label>

                <label for="rule-1" class="rule-block">
                    <input type="checkbox" id="rule-1" data-index="1">
                    <div class="input-pattern">
                        <span class="cell"></span><span class="cell"></span><span class="cell active"></span>
                    </div>
                    <span class="arrow">⬇</span>
                    <div class="output-cell"><span class="cell output"></span></div>
                </label>

                <label for="rule-0" class="rule-block">
                    <input type="checkbox" id="rule-0" data-index="0">
                    <div class="input-pattern">
                        <span class="cell"></span><span class="cell"></span><span class="cell"></span>
                    </div>
                    <span class="arrow">⬇</span>
                    <div class="output-cell"><span class="cell output"></span></div>
                </label>
            </div>
            
            <div class="controls">
                <button id="submitRulesButton" disabled>Conferma Regole</button>
            </div>
        </div>
        
        <div class="canvas-container" id="player-view">
            <h2>La Tua Evoluzione</h2>
            <canvas id="playerCanvas"></canvas>
        </div>
        
    </div>
</body>
</html>