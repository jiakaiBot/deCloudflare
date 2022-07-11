# CfDomains
### v1.0.3

CLI tool to look up Cloudflare domain list


- Binary
  - [Linux](https://git.disroot.org/dCF/deCloudflare/raw/branch/master/tool/cfdomains/cfdomains.linux?inline=false)
    - e.g. `$ chmod +x cfdomains; ./cfdomains`
  - [Windows](https://git.disroot.org/dCF/deCloudflare/raw/branch/master/tool/cfdomains/cfdomains.exe?inline=false)
  - [Mac OS](https://git.disroot.org/dCF/deCloudflare/raw/branch/master/tool/cfdomains/cfdomains.app?inline=false)
- Source
  - [source.js](source.js)
  - e.g. `# apt install npm nodejs; npm i node-libcurl --save; nodejs source.js`

----

```
        CfDomains  v1.0.3

Usage:
        cfdomains [| --online ]www.example.com
        cfdomains --dir
        cfdomains --proxy
        cfdomains --dl[| 0,1,...,a,b,...z]
        cfdomains [--report|--delist] www.example.com
        cfdomains [--categorise[|online]|--categorize[|online]] input.txt export.csv
        cfdomains --cleanlink[|online] story.html story_publish.html

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
                With online: Use Online API / Without it: Use Offline files
                e.g. cfdomains --categoriseonline dirtyUrls.txt /tmp/washing.csv

        cfdomains --cleanlink[|online] (Document; Text, HTML, Markdown) (Output file)
                Replace infected links in document
                With online: Use Online API / Without it: Use Offline files
                e.g. cfdomains --cleanlinkonline sunny.md /tmp/sunnyCleaned.md
```
