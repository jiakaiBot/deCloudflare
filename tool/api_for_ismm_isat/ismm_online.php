<?php
error_reporting(0);
header('HTTP/1.1 404 Not Found');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: private, no-cache, no-store, max-age=0');
//
// { Example API for IsMM }
//
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    echo('OK');
    exit();
}
header('Content-Type: application/json');
$fqdn = htmlspecialchars($_POST['f']);
if (!preg_match("/^([a-z0-9]{1})([a-z0-9.-]{0,254})\.([a-z]{2,50})$/", $fqdn)) {
    echo('[false,false]');
    exit();
}
$ck = curl_init();
curl_setopt($ck, CURLOPT_URL, 'https://karma.crimeflare.eu.org/api/is/cloudflare/');
curl_setopt($ck, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ck, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
curl_setopt($ck, CURLOPT_POST, true);
curl_setopt($ck, CURLOPT_POSTFIELDS, 'f=' . $fqdn);
curl_setopt($ck, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ck, CURLOPT_CONNECTTIMEOUT, 7);
curl_setopt($ck, CURLOPT_TIMEOUT, 13);
curl_setopt($ck, CURLOPT_USERAGENT, 'curl/ismm');
$got = curl_exec($ck);
if ($got === false || strpos($got, '[') !== 0) {
    echo('[false,false]');
    exit();
}
echo($got);