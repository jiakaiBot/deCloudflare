# CfDomains


CLI tool to look up Cloudflare domain list


- [Linux](https://mypdns.org/dCF/deCloudflare/-/raw/master/tool/cfdomains/cfdomains.linux?inline=false)
```
$ chmod +x cfdomains
$ ./cfdomains
```

- [Windows](https://mypdns.org/dCF/deCloudflare/-/raw/master/tool/cfdomains/cfdomains.exe?inline=false)
- [Mac OS](https://mypdns.org/dCF/deCloudflare/-/raw/master/tool/cfdomains/cfdomains.app?inline=false)


### Version & Hash

| Name | Value |
| -- | -- |
| Version | v1.0.2.1 |
| Linux | sha256 24e1e1affecd25839aa699e2ec17037425f153e68d9f6cc0c828231033603f5a |
| Windows | sha256 a92aa29dd02cf7a373d7574a50734666d9ec242c767ea45058d22b70dcf0db8c |
| Mac OS | sha256 8299b4854a0f6847107167c9d0af534e4ada83bb0184ddab8f3111adeaa14a55 |


----

```
Usage:
        cfdomains example.com
        cfdomains --dir
        cfdomains --proxy
        cfdomains [--dl|--dl2][ |0,1,...,a,b,...z]
        cfdomains [--report|--delist] example.com

Details:
        cfdomains example.com
                return "y", "n", or "e"
                        y: Domain is on the list
                        n: Domain is not listed
                        e: List data not found (fix it by running --dl)

        cfdomains --dir
                Change list directory
                Current directory: ./cfdomains_Data/

        cfdomains --proxy
                Set or Unset SOCKS proxy
                Current SOCKS proxy:

        cfdomains --dl|dl2
        cfdomains --dl|dl2 a,b,c
                dl: Download list files from Archive.org
                dl2: Download list files from deCloudflare git
                a,b,c: Download only these files (comma-separated)

        cfdomains --report|delist example.com
                Submit domain to #Karma for automated analysis
                Only the domain will be submitted. We NEVER record anything else.
                report: Report not-yet-listed domain (New Cloudflare)
                delist: Report currently-listed domain (Left Cloudflare)
```
