<?php
require 'config.php';
if ($_POST['action'] === 'register') {
    if (strlen($_POST['password']) > 20 || $_POST['password'] !== $_POST['password_confirm']) {
        header("Location: ../../index.php?error=4");
        exit;
    }

    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare(
            "INSERT INTO users (username, password_hash) VALUES (?, ?)"
        );
        $stmt->execute([$username, $password]);
        
        //successo
        $_SESSION['messaggio'] = "Account creato con successo";
        header("Location: ../../index.php");

    } catch (PDOException $e) {
        //codice 23000: username duplicato
        if ($e->getCode() === '23000') { 
            header("Location: ../../index.php?error=2"); 
        } else {
            //gestione di altri errori SQL
            error_log("Database Error: " . $e->getMessage());
            header("Location: ../../index.php?error=3"); 
        }
    }
    exit;
}

if ($_POST['action'] === 'login'){
    $stmt = $pdo->prepare(
        "SELECT * FROM users WHERE username = ?"
    );
    $stmt->execute([$_POST['username']]);
    $user = $stmt->fetch();

    if ($user && password_verify($_POST['password'], $user['password_hash'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        header("Location: ../pages/game.php");
    } else {
        header("Location: ../../index.php?error=1");
    }
}
