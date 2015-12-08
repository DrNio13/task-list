<?php

require_once 'dbconnection.php';

$_POST = file_get_contents('php://input');

if (isset($_POST)) {
	header('Content-type: application/json');
	echo json_encode($_POST);
	saveData($_POST);
} else {
	echo "post error occured.";
}

function saveData($post) {
	$db = new Connection();
}