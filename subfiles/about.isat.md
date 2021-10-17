### Will these links block Tor user?

`Scan FQDN using API`

![](../image/isatpreview.jpg)


```

You′ve found something on the internet.
Are these links blocking Tor users or not?
 
This add-on is using[1] public[3] API to scan FQDN.
	e.g. https://ekzemplo.com/page.html → "ekzemplo.com"

This add-on never send other information.



[1] How to use offline database
	1. Open add-on's option page and select "Use Offline Local Database".
	2. Click "Database" link.
	3. Create a new text file[2] (or download text file from git)
	4. Click "Import Database" and select your text file.
	5. Wait until the message appear.

[2] Text file example
	(FQDN/Domain)
	--------------------
	www.cloudflare.com
	domain.com
	example.org
	--------------------

[3] Public API services
	You can select which API service you want to use.
	Additionally you can self-host and use your own API.

```


- [Code](https://git.disroot.org/dCF/deCloudflare/src/branch/master/addons/code/isattlink)
- [API Self-host Guide](../tool/api_for_ismm_isat/)
- Download add-on
  - From Gitea: [FirefoxESR](https://git.disroot.org/dCF/deCloudflare/raw/branch/master/addons/releases/isat.xpi) / [Chromium / Edge](https://git.disroot.org/dCF/deCloudflare/raw/branch/master/addons/releases/isat.crx)
