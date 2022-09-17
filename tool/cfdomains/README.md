# CfDomains

`CfDomains` is a simple CLI tool to:

- Look up Cloudflare domain list, offline or online
- Replace CF links in your writings (text, HTML and Markdown)
- Categorise the domain list
- Join as warrior to help our mission


### What is CfDomains Warrior?

You can run the `CfDomains Warrior` (`cfdomains --warrior`) mode to help with the Crimeflare domain verification efforts.
It will download some domains from us, do some simple test and report back to us - it is really easy to use!

There is no security risk to your computer because it just do DNS lookup test.
The warrior will only use your DNS server, so no CPU nor memory will be used.
It will get tasks from Karma and report the result back to Karma.

The Warrior runs on Linux, Windows and macOS. You can run it on anything like virtual machiene as 
long as it can use _clean_ DNS.


### Installing and Uninstalling

- Linux: Installing
```
wget https://git.disroot.org/dCF/deCloudflare/raw/branch/master/tool/cfdomains/cfdomains.linux \
  -O /usr/local/bin/cfdomains
chmod +x /usr/local/bin/cfdomains
cfdomains
```

- Linux: Uninstalling
```
rm -f /usr/local/bin/cfdomains
rm -r .cfdomains_conf
```

- Windows
  - Install: Just run the executable, this is portable.
  - Uninstall: Just delete the file and `.cfdomains_conf`(configuration) file.


### Download
Current Version: **1.0.4.1**

- [Linux](https://git.disroot.org/dCF/deCloudflare/raw/branch/master/tool/cfdomains/cfdomains.linux?inline=false)
- [Windows](https://git.disroot.org/dCF/deCloudflare/raw/branch/master/tool/cfdomains/cfdomains.exe?inline=false)
- [Mac OS](https://git.disroot.org/dCF/deCloudflare/raw/branch/master/tool/cfdomains/cfdomains.app?inline=false)
- Source
  - [source.js](source.js)
  - e.g. `# apt install npm nodejs; npm i node-libcurl --save; nodejs source.js`

----


```
        CfDomains  v1.0.4.1

Usage:
        cfdomains [| --online ]www.example.com
        cfdomains --dir
        cfdomains --proxy
        cfdomains --dl[| 0,1,...,a,b,...z]
        cfdomains [--report|--delist] www.example.com
        cfdomains [--categorise[|online]|--categorize[|online]] input.txt export.csv
        cfdomains --cleanlink[|online] story.html story_publish.html
        cfdomains --warrior

Details:
        cfdomains (Base Domain or FQDN)
                return "y", "n", or "e"
                        y: Domain is on the list
                        n: Domain is not listed
                        e: List data not found (fix it by running --dl)

        cfdomains --online (Base Domain or FQDN)
                return "y", "n", or "e"
                        y: Domain is on the list
                        n: Domain is not listed
                        e: Internet Connection Error

        cfdomains --dir
                Change list directory
                Current directory: ./cfdomains_Data/

        cfdomains --proxy
                Set or Unset SOCKS proxy
                Current SOCKS proxy:

        cfdomains --dl
        cfdomains --dl a,b,c
                dl: Download list files from deCloudflare git
                a,b,c: Download only these files (comma-separated)

        cfdomains --report|delist www.example.com
                Submit domain to #Karma for automated analysis
                Only the domain will be submitted. We NEVER record anything else.
                report: Report not-yet-listed domain (New Cloudflare)
                delist: Report currently-listed domain (Left Cloudflare)

        cfdomains --categorise[|online]|categorize[|online] (List file; URL or FQDNs) (Output file)
                Export Listed/NotListed status in CSV format
                With online: Use Online API / Without: Use Offline files
                e.g. cfdomains --categoriseonline dirtyUrls.txt /tmp/washing.csv

        cfdomains --cleanlink[|online] (Document; Text, HTML, Markdown) (Output file)
                Replace infected links in document
                With online: Use Online API / Without: Use Offline files
                e.g. cfdomains --cleanlinkonline sunny.md /tmp/sunnyCleaned.md

        cfdomains --warrior
                Run this to help with the #Karma domain verification efforts.
                This will download some domain from #Karma and report changes.
```

_We need warriors to assist our hunters :)_

![](../../image/what_are_you_hunting_cloudflare.png)
