<?php
require '../handlers/session.php';

//LEADERBOARD GLOBALE (max score per difficoltà)
$stmt = $pdo->query(
    "SELECT
        username,
        MAX(CASE WHEN difficulty = 'Facile' THEN score ELSE NULL END) AS max_facile,
        MAX(CASE WHEN difficulty = 'Normale' THEN score ELSE NULL END) AS max_normale,
        MAX(CASE WHEN difficulty = 'Difficile' THEN score ELSE NULL END) AS max_difficile
    FROM scores
    JOIN users ON users.id = scores.user_id
    GROUP BY users.id, username
    ORDER BY max_difficile DESC, max_normale DESC, max_facile DESC"
);
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <title>Leaderboard</title>
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/leaderboard.css">
    <script src="../../js/leaderboard-sort.js"></script>
</head>
<body class="leaderboard-container">

    <h1>Leaderboard</h1>
    
    <ul class="leaderboard-list" id="leaderboard">
        <li class="list-header">
            <span class="col-username">Utente</span>
            <span class="sortable" data-col="1">Facile</span>
            <span class="sortable" data-col="2">Normale</span>
            <span class="sortable" data-col="3">Difficile</span>
        </li>
        
        <?php while ($row = $stmt->fetch()) : ?>
            <li>
                <span class="col-username"><?= htmlspecialchars($row['username']) ?></span>
                <span><?= $row['max_facile'] !== null ? $row['max_facile'] : 'N/D' ?></span>
                <span><?= $row['max_normale'] !== null ? $row['max_normale'] : 'N/D' ?></span>
                <span><?= $row['max_difficile'] !== null ? $row['max_difficile'] : 'N/D' ?></span>
            </li>
        <?php endwhile; ?>
    </ul>

    <hr>

    <h2> Le tue ultime partite </h2>

    <?php
    //STORICO UTENTE
    $stmt = $pdo->prepare(
      "SELECT score, played_at, difficulty
       FROM scores
       WHERE user_id = ?
       ORDER BY played_at DESC
       LIMIT 10"
    );
    $stmt->execute([$_SESSION['user_id']]);
    ?>

    <ul class="history-list">
        <li class="list-header">
            <span class="col-history-difficulty">Difficoltà</span>
            <span class="col-history-score">Punteggio</span>
            <span class="col-history-date">Data</span>
        </li>
        
        <?php while ($row = $stmt->fetch()): ?>
            <li>
                <span class="col-history-difficulty"><?= htmlspecialchars($row['difficulty']) ?></span>
                <span class="col-history-score"><?= $row['score'] ?> punti</span>
                <span class="col-history-date">(<?= $row['played_at'] ?>)</span>
            </li>
        <?php endwhile; ?>
    </ul>

    <div class="nav-links">
        <a href="game.php">Torna al gioco</a>
        <a href="../handlers/logout.php">Logout</a>
    </div>
</body>
</html>
