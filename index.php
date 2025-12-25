<?php
require 'php/handlers/config.php';

if (isset($_SESSION['user_id'])) {
    header("Location: php/pages/game.php");

    exit;
}
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Automata Match - Login</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <h1>Automata Match</h1>

    <?php 
    $errorCode = $_GET['error'] ?? null;
    ?>

    <?php if ($errorCode) : ?>
        <p class="login-error">
            <?php 
            switch ($errorCode) {
                case '1':
                    echo "❌ Credenziali non valide. Riprova."; // Errore di login (Password/Username sbagliati)
                    break;
                case '2':
                    echo "⚠️ Username già in uso. Scegline un altro."; // Errore di registrazione (Username UNIQUE)
                    break;
                case '3':
                    echo "❌ Errore interno del server durante la registrazione."; // Altri errori SQL
                    break;
                default:
                    echo "Si è verificato un errore sconosciuto.";
                    break;
            }
            ?>
        </p>
    <?php endif; ?>

    <?php if (isset($_SESSION['messaggio'])) : ?>
        <p style="color: green; font-size: 1.5rem;">
            <?= $_SESSION['messaggio'] ?>
        </p>
    <?php endif; ?>

    <div class="login-container">

        <!-- login -->
        <form class="login-card" action="php/handlers/auth.php" method="POST">
            <h2>Login</h2>
            <input type="hidden" name="action" value="login">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Accedi</button>
        </form>

        <!-- register -->
        <form class="login-card" action="php/handlers/auth.php" method="POST">
            <h2>Registrazione</h2>
            <input type="hidden" name="action" value="register">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Registrati</button>
        </form>

    </div>
</body>
</html>