<?php
require '../handlers/session.php';

$stmt = $pdo->query(
    "SELECT username, MAX(score) AS best_score
    FROM scores
    JOIN users ON users.id = scores.user_id
    GROUP BY user_id
    ORDER BY best_score DESC"
);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Leaderboard</title>
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/leaderboard.css">
</head>
<body class="leaderboard-container">
    <ul class="leaderboard-list">
        <?php while ($row = $stmt->fetch()) : ?>
            <li>
                <span><?= htmlspecialchars($row['username']) ?></span>
                <span><?= $row['best_score'] ?></span>
            </li>
        <?php endwhile; ?>
    </ul>

    <hr>

    <h2> Le tue ultime partite </h2>

    <?php
    $stmt = $pdo->prepare(
      "SELECT score, played_at
       FROM scores
       WHERE user_id = ?
       ORDER BY played_at DESC
       LIMIT 10"
    );
    $stmt->execute([$_SESSION['user_id']]);
    ?>

    <ul class="history-list">
        <?php while ($row = $stmt->fetch()): ?>
            <li><?= $row['score'] ?> punti (<?= $row['played_at'] ?>)</li>
        <?php endwhile; ?>
    </ul>

    <div class="nav-links">
        <a href="game.php">Torna al gioco</a>
        <a href="../handlers/logout.php">Logout</a>
    </div>
</body>
</html>