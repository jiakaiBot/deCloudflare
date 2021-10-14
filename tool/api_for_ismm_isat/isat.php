<?php
error_reporting(0);
header('HTTP/1.1 404 Not Found');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: private, no-cache, no-store, max-age=0');
//
// { Example API for IsAT }
//
define('JSON_FILE', './attd.json');
//
//
if (!file_exists(JSON_FILE))
{
    die('File Not Found');
}
elseif ($_SERVER['REQUEST_METHOD'] != 'POST')
{
    echo ('OK');
    exit;
}
header('Content-Type: application/json');
$got = @json_decode(file_get_contents(JSON_FILE) , true);
if (!is_array($got))
{
    die('File Error');
}
$fqdn = htmlspecialchars($_POST['f']);
if (!preg_match("/^([a-z0-9]{1})([a-z0-9.-]{0,254})\.([a-z]{2,50})$/", $fqdn))
{
    echo ('[false,false]');
    exit;
}
echo (isset($got[$fqdn]) ? '[true,true]' : '[true,false]');