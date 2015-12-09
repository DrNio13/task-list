<?php

$_POST = file_get_contents('php://input');

if (!empty($_POST)) {
	header('Content-type: text/html');
	echo 'POST success';

} else {
	echo "empty POST";
}

require_once 'dbconnection.php';
$s = new Connection();
$s->insert($_POST);
// print_r(json_decode($_POST, true));