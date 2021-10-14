## API files for IsMM/IsAT Add-ons


### Requirements
```
- Web server
- PHP 7 or later
```


### 1a. Set up API for `Ĉu ligoj estas vundeblaj al MITM-atako?`(isMM) add-on

1. Copy [ismm.php](ismm.php) to your website directory.<br>
    e.g. `/api/ismm.php`
2. Create `listdata` directory.<br>
    e.g. `/api/listdata/`
3. Download JSON files (*.json) from [/cloudflare_users/domains](../../cloudflare_users/domains) and save them to dir above.<br>
    e.g. `/api/listdata/cloudflare_e.json`
4. Open your API. It should say `OK`.<br>
    e.g. `http://localhost/api/ismm.php`


### 1b. Set up API for `Ĉu ĉi tiuj ligoj blokos Tor-uzanton?`(isAT) add-on

1. Copy [isat.php](isat.php) to your website directory.<br>
    e.g. `/api/isat.php`
2. Download JSON file, `attd.json`, from [/anti-tor_users/domains](../../anti-tor_users/domains) and save it to same dir.<br>
    e.g. `/api/attd.json`
3. Open your API. It should say `OK`.<br>
    e.g. `http://localhost/api/isat.php`


### 2. Use your API

1. Open Add-on's `Options` page.
2. Select `API URL`.
3. Input your API URL into right box.
4. Done!
