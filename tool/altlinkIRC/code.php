<?php
set_time_limit(0);
require '/collaboration/your_collaboration_matters.pr';
require '/collaboration/gitlab.pr';
require '/collaboration/irc.pr';
require '/collaboration/domains.pr';
//-
define('OBSERVE_SERVER', $argv[1]);
define('OBSERVE_CHAN', explode(',', $argv[2]));
define('MY_NAME', 'altlink_' . randBytes(9));
define('MAX_CONNECT_RETRY', 100);
//-
irc_connect();
$irc_connectcnt = 0;
$irc_lastACK = gmdate('U');
while (1) {
    if ($irc_lastACK < gmdate('U', strtotime('9 minutes ago'))) {
        $sox = false;
        debugatme('[INFO] last PING was not heard.', false);
    }
    if ($sox === false) {
        $irc_connectcnt++;
        if ($irc_connectcnt < MAX_CONNECT_RETRY) {
            debugatme('reconnect ' . OBSERVE_SERVER);
            sleep(5);
            irc_connect();
        } else {
            debugatme('[WARN] tried enough, disconnecting ' . OBSERVE_SERVER, true);
        }
    }
    while ($data = fgets($sox, 2048)) {
        flush();
        $dataP = explode(' ', $data);
        if ($dataP[0] == 'PING') {
            $irc_connectcnt = 0;
            $irc_lastACK = gmdate('U');
            fwrite($sox, "PONG {$dataP[1]}\n");
            continue;
        }
        if (strpos($dataP[0], ':') !== 0) {
            continue;
        }
        $user_who = ltrim(explode('!', $dataP[0], 2)[0], ':');
        if ($user_who == MY_NAME) {
            continue;
        }
        if ($dataP[1] == 'KICK' && $dataP[3] == MY_NAME) {
            debugatme("Murder {$dataP[2]} by {$user_who}", true);
        }
        if ($dataP[1] != 'PRIVMSG') {
            continue;
        }
        $irc_connectcnt = 0;
        $irc_lastACK = gmdate('U');
        if (strpos($dataP[2], '#') === 0) {
            $user_said = str_clnspace(explode($dataP[2] . ' :', $data, 2)[1]);
            if (strpos($user_said, MY_NAME) !== false) {
                $user_said = str_clean_str($user_said, MY_NAME);
                if (strlen($user_said) < 10 || string_has_bitch($user_said)) {
                    continue;
                }
                debugatme(' sending to git!');
                $got = @json_decode(gitlab_create_anonymous('[scrubbed]@' . OBSERVE_SERVER, get_clean_title($user_said), $user_said, 'IRC'), true);
                if (isset($got['web_url'])) {
                    fwrite($sox, "PRIVMSG {$dataP[2]} :👍 {$got['web_url']}\n");
                }
                continue;
            }
            if (strlen($user_said) < 11 || strpos($user_said, '://') === false) {
                continue;
            }
            $urls = array_values(
                array_unique(
                    array_filter(
                        array_map(function ($l) {
                            return is_valid_url($l) ? $l : '';
                        }, explode(' ', $user_said))
                    )
                )
            );
            if (count($urls) == 0) {
                continue;
            }
            $kvs = [];
            foreach ($urls as $url) {
                $fqdn = explode('/', explode('://', $url, 2)[1], 2)[0];
                if (strlen($fqdn) < 4) {
                    continue;
                }
                $domain = toBaseDomain($fqdn);
                if (domain_typeWhite($domain)) {
                    continue;
                }
                dbcall_hi();
                $yesCloudFlare = domain_typeCloudflare($domain);
                dbcall_bye();
                if (!$yesCloudFlare) {
                    continue;
                }
                if (!isset($kvs[$domain])) {
                    $kvs[$domain] = $url;
                }
            }
            if (count(array_keys($kvs)) == 0) {
                continue;
            }
            foreach ($kvs as $k => $v) {
                fwrite($sox, "NOTICE {$dataP[2]} :📣 CloudFlare: {$k} | 🙆 Alternative: https://web.archive.org/web/{$v} , https://timetravel.mementoweb.org/list/" . gmdate('Ym') . "/{$v}\n");
            }
        } elseif ($dataP[2] == MY_NAME) {
            $user_said = str_clean_str($data, MY_NAME);
            if (strlen($user_said) < 10 || string_has_bitch($user_said)) {
                continue;
            }
            debugatme(' sending to git!');
            $got = @json_decode(gitlab_create_anonymous('[scrubbed]@' . OBSERVE_SERVER, get_clean_title($user_said), $user_said, 'IRC'), true);
            if (isset($got['web_url'])) {
                fwrite($sox, "PRIVMSG {$user_who} :👍 {$got['web_url']}\n");
            }
        } else {
            continue;
        }
    }
}