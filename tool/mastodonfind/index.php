<?php
header('HTTP/1.1 404 Not Found');
header('Referrer-Policy: no-referrer');
define('NOWTIME_U', gmdate('U'));
$vi_json = $_GET['json']??$_POST['json'];
$vi_query = $_GET['q']??$_POST['q'];
$vi_opt_sm = ($_GET['sm'] == 'a' || $_POST['sm'] == 'a') ? 'a' : 't';
$vi_opt_inclcf = $_GET['cf']??$_POST['cf'];
$vi_opt_inclcf = isset($vi_opt_inclcf) ? true : false;
$vi_opt_limitlg = $_GET['lg']??$_POST['lg'];
if (!preg_match("/^([a-z]{2})$/", $vi_opt_limitlg)) {
    $vi_opt_limitlg = '';
}
$vi_opt_timeA = $_GET['tia']??$_POST['tia'];
if (!preg_match("/^2([0-9]{3})\-([0-9]{2})\-([0-9]{2})$/", $vi_opt_timeA)) {
    $vi_opt_timeA = '';
} //A->
$vi_opt_timeB = $_GET['tib']??$_POST['tib'];
if (!preg_match("/^2([0-9]{3})\-([0-9]{2})\-([0-9]{2})$/", $vi_opt_timeB)) {
    $vi_opt_timeB = '';
} //<-B
$vi_internal_tia = $vi_internal_tib = '';
if ($vi_opt_timeA != '') {
    $vi_internal_tia = gmdate('U', strtotime($vi_opt_timeA . ' 00:00:00'));
    if ($vi_internal_tia > NOWTIME_U) {
        $vi_internal_tia = NOWTIME_U;
    }
}
if ($vi_opt_timeB != '') {
    $vi_internal_tib = gmdate('U', strtotime($vi_opt_timeB . ' 23:59:59'));
    if ($vi_internal_tib > NOWTIME_U) {
        $vi_internal_tib = NOWTIME_U;
    }
}
if (isset($vi_query)) {
    $vi_query = cleanse_str($vi_query);
    if (is_attackable_str($vi_query)) {
        $vi_query = '';
    }
}
$vi_showquery = htmlspecialchars($vi_query, ENT_QUOTES);
$sql_Result = [];
if (strlen($vi_query) >= 2) {
    $sqlme = @new mysqli('localhost', 'REDACTED', 'REDACTED', 'REDACTED');
    if ($sqlme->connect_errno) {
        echo ('DB ERROR TRY AGAIN LATER');
        exit;
    }
    $sql_Query = 'SELECT * FROM REDACTED WHERE ';
    $sql_Pcs = [];
    $sql_smt = ($vi_opt_sm == 'a') ? 'who' : 'body';
    if (!$vi_opt_inclcf) {
        $sql_Pcs[] = "iscf = '0' ";
    }
    if ($vi_opt_limitlg != '') {
        $sql_Pcs[] = "lang = '{$vi_opt_limitlg}' ";
    }
    if ($vi_internal_tia != '') {
        $sql_Pcs[] = "`when` >= '{$vi_internal_tia}' ";
    }
    if ($vi_internal_tib != '') {
        $sql_Pcs[] = "`when` <= '{$vi_internal_tib}' ";
    }
    foreach (explode(' ', $vi_query) as $w) {
        if (strlen($w) <= 1) {
            continue;
        }
        if (strpos($w, 'author:') === 0) {
            $w = str_replace('author:', '', $w);
            if (strlen($w) < 2) {
                continue;
            }
            $sql_Pcs[] = "who LIKE '%{$w}%' ";
            continue;
        }
        if (strpos($w, '-author:') === 0) {
            $w = str_replace('-author:', '', $w);
            if (strlen($w) < 2) {
                continue;
            }
            $sql_Pcs[] = "who NOT LIKE '%{$w}%' ";
            continue;
        }
        if (strpos($w, '-') === 0) {
            $w = str_replace('-', '', $w);
            if (strlen($w) < 2) {
                continue;
            }
            $sql_Pcs[] = "{$sql_smt} NOT LIKE '%{$w}%' ";
            continue;
        }
        $sql_Pcs[] = "{$sql_smt} LIKE '%{$w}%' ";
    }
    if ($result = $sqlme->query($sql_Query . implode('AND ', $sql_Pcs) . ' ORDER BY `when` DESC LIMIT 500;')) {
        while ($g = $result->fetch_array()) {
            $sql_Result[] = $g;
        }
    }
    $sqlme->close();
}
if (isset($vi_json)) {
    header('Content-Type: application/json; charset=utf-8');
    $finalRESP = [];
    if ($vi_showquery == '') {
        $finalRESP = ['method' => ['POST', 'GET'], 'accept_param' => ['q' => ['type' => 'string', 'value' => 'any', 'note' => 'Required'], 'sm' => ['type' => 'string', 'value' => ['a' => 'Account', 't' => 'Toot'], 'note' => 'default is t'], 'cf' => ['type' => 'existence', 'value' => 'any'], 'lg' => ['type' => 'string', 'value' => '2 letter'], 'tia' => ['type' => 'date', 'value' => 'Y-m-d'], 'tib' => ['type' => 'date', 'value' => 'Y-m-d']], 'example' => ['GET' => ['/?json&q=friend', '/?json&cf&lg=en&q=news']]];
    } else {
        foreach ($sql_Result as $g) {
            $finalRESP[] = ['url' => $g['url'], 'who' => $g['who'], 'when' => $g['when'], 'iscf' => $g['iscf'], 'lang' => $g['lang'], 'body' => str_replace('&nbsp;', ' ', $g['body']) ];
        }
    }
    echo (json_encode($finalRESP));
    exit;
} else {
    header('Content-Type: text/html; charset=UTF-8');
    $finalRESP = '';
    foreach ($sql_Result as $g) {
        $finalRESP.= '<tr><td class="sh"><a href="' . $g['url'] . '" rel="noreferer" target="_blank">' . $g['who'] . '</a>' . ($g['iscf'] ? '&#127785;' : '') . '<br><i>' . humanTiming($g['when']) . ' ago / ' . $g['lang'] . '</i></td><td class="xp">' . htmlspecialchars(htmlspecialchars_decode(str_replace('&nbsp;', ' ', $g['body']), ENT_QUOTES), ENT_QUOTES) . '</td></tr>';
    }
    $ui_sma = ($vi_opt_sm == 'a') ? ['', ' selected'] : [' selected', ''];
    $ui_cfc = ($vi_opt_inclcf) ? ' checked' : '';
    $finish = <<<HTMLDATA
<html>
   <head>
      <title>&#x1F418;</title>
      <style>
html{background:#f3f6fa}div#ha{background:#e4e9f0;position:fixed;top:0;left:0;right:0;padding:18px 0;z-index:10}div#ha form{padding:0 20px}div#ub{margin-top:40px;background:#e4e9f0;position:absolute;left:0;right:0}details summary,button[type=submit]{cursor:pointer}form input[name=q],button[type=submit]{font-size:20px}button[type=submit]{background:transparent;border:0}div#mb table{width:80%;border-collapse:collapse}div#mb table tr:nth-child(2n){background:#f8fbff}div#mb td.sh{white-space:nowrap}div#mb td.xp{width:99%;padding:10px 0 10px 20px;word-wrap:anywhere}
      </style>
   </head>
   <body>
      <div id="ha">
         <form action="./" method="POST">
            <input type="text" name="q" size="60" minlength="2" value="{$vi_showquery}" autofocus required>
            <button type="submit">&#x1F50E;</button><br>
            <details>
               <summary>Advanced</summary>
               <p>
                  Search mode: <select name="sm">
                  <option value="t"{$ui_sma[0]}>Toots</option>
                  <option value="a"{$ui_sma[1]}>Account</option>
                  </select><br>
                  <br><br>
                  <label><input type="checkbox" name="cf"{$ui_cfc}> Include <a href="http://crimeflare.eu.org/" target="_blank">Cloudflared Mastodon</a> servers to search result</label><br>
                  <br><br>
                  Limit language code: <input type="text" name="lg" size="4" minlength="2" maxlength="2" value="{$vi_opt_limitlg}">  (e.g <i>de</i>)<br>
                  <br><br>
                  Limit time range:<br>
                  <label for="tia">Newer than </label><input type="date" id="tia" name="tia" value="{$vi_opt_timeA}"><br>
                  <label for="tib">Older than </label><input type="date" id="tib" name="tib" value="{$vi_opt_timeB}"><br>
                  <br>
               <hr>
               <ul>
                  <li> cat pic (search toots about "cat" and "pic")</li>
                  <li> my friend <b>-</b>enemy <b>-</b>joke (search "my" and "friend" toots but not include "enemy" "joke")</li>
                  <li> news <b>-author</b>:bot <b>-author</b>:blog (search "news" but not from author named "*bot*" "*blog*")</li>
                  <li> <b>author</b>:friend@my.site (show only about friend@my.site)</li>
                  <li> Max limit: 500 search results</li>
               </ul>
               </p>
            </details>
         </form>
      </div>
      <br><br><br><br><br><br><br><br>
      <div id="mb">
         <table>{$finalRESP}</table>
      </div>
      <div id="ub">
         <ul>
            <li> Search: Mastodon public toots & Accounts</li>
            <li> API: <a href="./?json">API guide</a></li>
            <li> Index: Toots older than 7 months will be removed</li>
            <li> Privacy: No collection (search keyword, IP, whatever)</li>
            <li> <a href="http://qyo4hcmvxiysc6zrxdn6rhofgkroyoygszkljw5izwdqklxfantseiyd.onion/">Tor</a>
         </ul>
      </div>
   </body>
</html>
HTMLDATA;
}
echo (str_replace("\n", '', $finish));