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
    <script src="../../js/game.js"></script>
    <script src="../../js/main.js"></script>
</head>
<body>

    <header>
        <div class="account-links">
            <p id="username">Utente: <strong><?= htmlspecialchars($_SESSION['username']) ?></strong></p>
            <button id="logoutButton">Logout</button>
            <form action="../handlers/delete.php" method="POST" onsubmit="return confirm('Sei sicuro di voler cancellare l’account?');">
                <button id="deleteAccountButton" type="submit">Cancella Account</button>
            </form>
        </div>
        <div class="game-links">
            <a href="leaderboard.php">Leaderboard</a> |
            <a href="manual.html">Manuale del gioco</a> |
            <a href="gallery.html">Visualizzatore di Ruleset</a>
        </div>
    </header>

    <h1>AUTOMATA MATCH</h1>
    <div id="gameStatus">
        <p id="roundDisplay">Pronto. Premi 'Inizia Gioco'.</p>
        <p id="scoreDisplay"><strong>Punti: 0</strong></p>
        <button id="startGameButton">Inizia Gioco</button>
        <label for="levelSelect">Difficoltà:</label>
        <select id="levelSelect">
            <option value="Facile" selected>Facile (5 round)</option>
            <option value="Normale">Normale (10 round)</option>
            <option value="Difficile">Difficile (15 round)</option>
        </select>
    </div>

    <div id="mainLayoutGrid">
        
        <div class="canvas-container" id="game-view">
            <h2>Automa Nascosto</h2>
            <canvas id="gameCanvas"></canvas>
        </div>
        
    <div id="playerInterface">
        <h2>Imposta la Regola (Output cella)</h2>

        <div id="ruleset-selectors">

            <!-- RULE 7 -->
            <div class="rule-block">
                <label>
                    <input type="checkbox" id="rule-7" data-index="7">

                    <span class="input-pattern">
                        <span class="cell active"></span>
                        <span class="cell active"></span>
                        <span class="cell active"></span>
                    </span>

                    <span class="arrow">⬇</span>

                    <span class="output-cell">
                        <span class="cell output"></span>
                    </span>
                </label>
            </div>

            <!-- RULE 6 -->
            <div class="rule-block">
                <label>
                    <input type="checkbox" id="rule-6" data-index="6">

                    <span class="input-pattern">
                        <span class="cell active"></span>
                        <span class="cell active"></span>
                        <span class="cell"></span>
                    </span>

                    <span class="arrow">⬇</span>

                    <span class="output-cell">
                        <span class="cell output"></span>
                    </span>
                </label>
            </div>

            <!-- RULE 5 -->
            <div class="rule-block">
                <label>
                    <input type="checkbox" id="rule-5" data-index="5">

                    <span class="input-pattern">
                        <span class="cell active"></span>
                        <span class="cell"></span>
                        <span class="cell active"></span>
                    </span>

                    <span class="arrow">⬇</span>

                    <span class="output-cell">
                        <span class="cell output"></span>
                    </span>
                </label>
            </div>

            <!-- RULE 4 -->
            <div class="rule-block">
                <label>
                    <input type="checkbox" id="rule-4" data-index="4">

                    <span class="input-pattern">
                        <span class="cell active"></span>
                        <span class="cell"></span>
                        <span class="cell"></span>
                    </span>

                    <span class="arrow">⬇</span>

                    <span class="output-cell">
                        <span class="cell output"></span>
                    </span>
                </label>
            </div>

            <!-- RULE 3 -->
            <div class="rule-block">
                <label>
                    <input type="checkbox" id="rule-3" data-index="3">

                    <span class="input-pattern">
                        <span class="cell"></span>
                        <span class="cell active"></span>
                        <span class="cell active"></span>
                    </span>

                    <span class="arrow">⬇</span>

                    <span class="output-cell">
                        <span class="cell output"></span>
                    </span>
                </label>
            </div>

            <!-- RULE 2 -->
            <div class="rule-block">
                <label>
                    <input type="checkbox" id="rule-2" data-index="2">

                    <span class="input-pattern">
                        <span class="cell"></span>
                        <span class="cell active"></span>
                        <span class="cell"></span>
                    </span>

                    <span class="arrow">⬇</span>

                    <span class="output-cell">
                        <span class="cell output"></span>
                    </span>
                </label>
            </div>

            <!-- RULE 1 -->
            <div class="rule-block">
                <label>
                    <input type="checkbox" id="rule-1" data-index="1">

                    <span class="input-pattern">
                        <span class="cell"></span>
                        <span class="cell"></span>
                        <span class="cell active"></span>
                    </span>

                    <span class="arrow">⬇</span>

                    <span class="output-cell">
                        <span class="cell output"></span>
                    </span>
                </label>
            </div>

            <!-- RULE 0 -->
            <div class="rule-block">
                <label>
                    <input type="checkbox" id="rule-0" data-index="0">

                    <span class="input-pattern">
                        <span class="cell"></span>
                        <span class="cell"></span>
                        <span class="cell"></span>
                    </span>

                    <span class="arrow">⬇</span>

                    <span class="output-cell">
                        <span class="cell output"></span>
                    </span>
                </label>
            </div>

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
