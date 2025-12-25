<?php
require 'session.php';

$userId = $_SESSION['user_id'];

try {
    $pdo->beginTransaction();

    //Cancella storico punteggi
    $stmt = $pdo->prepare("DELETE FROM scores WHERE user_id = ?");
    $stmt->execute([$userId]);

    //Cancella utente
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$userId]);

    //Commit
    $pdo->commit();

    //Logout
    session_unset();
    session_destroy();

    //Redirect alla home/login con messaggio di successo
    session_start(); //session start per messaggio
    $_SESSION['messaggio'] = "Account cancellato con successo";
    header("Location: ../../index.php");
    exit;

} catch (PDOException $e) {
    $pdo->rollBack();
    die("Errore durante la cancellazione dell'account.");
}

?>