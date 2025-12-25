<?php
require 'config.php';

if (isset($_SESSION['user_id'], $_POST['score'])) {
  $stmt = $pdo->prepare(
    "INSERT INTO scores (user_id, score) VALUES (?, ?)"
  );
  $stmt->execute([$_SESSION['user_id'], $_POST['score']]);
}
?>  