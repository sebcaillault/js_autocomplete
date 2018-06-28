<?php
declare(strict_types=1);
header('Content-Type:text/plain');
require_once('SearchManager.php');

$user_name = 'root';
$db_password='';

try {
    $conn = new PDO("mysql:host=localhost;dbname=liste_chainee;charset=UTF8", $user_name, $db_password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Connexion échouée : ' . $e->getMessage();
    die();
}

$request = $_REQUEST; // recup la valeure de l'input de la recherche

if ($request['action'] == 'autocomplete') {
    $sManager = new SearchManager($conn);
    $cities = $sManager->getCities($request['query']);

    if ($cities) {
        sendInJson($cities);
    } else {
        sendInJson([
            'message' => 'Aucune correspondance trouvé.'
        ]);
    }
}

/**
 *  Converts a PHP array to Json and makes 
 *  the echo to return it to the js script
 */
function sendInJson(array $array) : void
{
    if (!headers_sent()) {
        header('Content-Type: application/json');
        echo json_encode($array);
    }
}