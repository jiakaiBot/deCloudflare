<?php
// 'cfdomains warrior' on PHP
error_reporting(0);
set_time_limit(0); // run until got killed - edit me
define('HELPER_ID', hash('sha256', 'add your sexy comment here - EDIT ME'));
//----
function echol($e, $x = null)
{
    echo $e . "\n";
    if ($x) {
        exit();
    }
}
function apiwar($posts)
{
    $cu = curl_init();
    curl_setopt($cu, CURLOPT_URL, 'https://karma.crimeflare.eu.org/api/cfdomains/');
    curl_setopt($cu, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($cu, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
    curl_setopt($cu, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_2_0);
    curl_setopt($cu, CURLOPT_ENCODING, 'gzip, deflate');
    curl_setopt($cu, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($cu, CURLOPT_CONNECTTIMEOUT, 9);
    curl_setopt($cu, CURLOPT_TIMEOUT, 120);
    curl_setopt($cu, CURLOPT_HEADER, false);
    curl_setopt($cu, CURLOPT_USERAGENT, 'CfDomains');
    curl_setopt($cu, CURLOPT_POST, 1);
    curl_setopt($cu, CURLOPT_POSTFIELDS, rtrim($posts, '&'));
    return curl_exec($cu);
}
function dns_exists_NS($d)
{
    $g = dns_get_record($d . '.', DNS_NS);
    if ($g === false) {
        return 0;
    }
    return count($g) < 1 ? -1 : 1;
}
function dns_exists_A($d)
{
    $g = dns_get_record($d . '.', DNS_A);
    if ($g === false) {
        return 0;
    }
    return count($g) < 1 ? -1 : 1;
}
if (dns_exists_NS('microsoft.com') != 1 || dns_exists_NS('google.com') != 1) {
    echol('FATAL: NS not found!', true);
}
if (dns_exists_A('www.google.com') != 1 || dns_exists_A('www.youtube.com') != 1) {
    echol('FATAL: A not found!', true);
}
$got = @json_decode(apiwar('do=init&hv=' . HELPER_ID), true);
if (!is_array($got)) {
    echol('FATAL: init failed!', true);
}
echol($got[1], !$got[0] ? true : null);
//BEGIN_LOOP
while (1) {
    sleep(2);
    echol(':: GET');
    $got = @json_decode(apiwar('do=get&hv=' . HELPER_ID), true);
    if (!is_array($got)) {
        echol('Unable to connect, will retry later');
        sleep(10);
        continue;
    }
    if (!$got[0]) {
        echol($got[1], true);
    }
    if (count($got[1]) < 5) {
        if ($got[1][0] == 'wait!') {
            echol('Busy. Waiting for my turn.');
            sleep(200);
            continue;
        }
        continue;
    }
    $totalC = count($got[1]);
    echol(':: Received ' . $totalC);
    echol(':: Scanning');
    $apples = [];
    foreach ($got[1] as $domain) {
        if (preg_match("/\.crimeflare$/", $domain)) {
            continue;
        }
        usleep(120000);
        if (dns_exists_NS($domain) >= 0) {
            continue;
        }
        usleep(120000);
        if (dns_exists_A($domain) >= 0) {
            continue;
        }
        $apples[$domain] = 1;
    }
    $apples = array_keys($apples);
    $totalA = count($apples);
    if ($totalA < 1 || $totalA == $totalC) {
        continue;
    }
    echol(':: Suspected ' . $totalA);
    echol(':: Reporting');
    $got = @json_decode(apiwar('do=rb&hv=' . HELPER_ID . '&ds=' . implode(',', $apples)), true);
    $apples = null;
    if (!is_array($got)) {
        echol('Unable to connect, skip');
        sleep(10);
        continue;
    }
    if (!$got[0]) {
        echol($got[1], true);
    }
}
//END_LOOP
//
