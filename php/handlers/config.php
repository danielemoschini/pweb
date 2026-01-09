<?php //starta la session e crea pdo
$pdo = new PDO(
    "mysql:host=localhost;dbname=moschini_660071;charset=utf8",
    "root",
    "",
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_EMULATE_PREPARES => false] //sicurezza per sql injection
);
session_start();
