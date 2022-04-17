# CfDomains
### v1.0.2.3

CLI tool to look up Cloudflare domain list


- [Linux](https://git.disroot.org/dCF/deCloudflare/raw/branch/master/tool/cfdomains/cfdomains.linux?inline=false)
```
$ chmod +x cfdomains
$ ./cfdomains
```

- [Windows](https://git.disroot.org/dCF/deCloudflare/raw/branch/master/tool/cfdomains/cfdomains.exe?inline=false)
- [Mac OS](https://git.disroot.org/dCF/deCloudflare/raw/branch/master/tool/cfdomains/cfdomains.app?inline=false)


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
