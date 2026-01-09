<?php
require 'config.php';

$maxScore = [
  'Facile' => 5,
  'Normale' => 10,
  'Difficile' => 15
];

if (isset($_SESSION['user_id'], $_POST['score'], $_POST['difficulty'])) {

  //controllo modifiche js lato utente
  $score = (int) $_POST['score'];
  $allowed = ['Facile', 'Normale', 'Difficile'];
  if (!in_array($_POST['difficulty'], $allowed, true)) { 
    exit;
  }
  if ($score < 0 || $score > $maxScore[$_POST['difficulty']]) { 
    exit;
  }

  $stmt = $pdo->prepare(
    "INSERT INTO scores (user_id, difficulty, score) VALUES (?, ?, ?)"
  );
  $stmt->execute([$_SESSION['user_id'], $_POST['difficulty'], $_POST['score']]);
}
?>  
