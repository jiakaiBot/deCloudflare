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
| Linux | sha256 09dea89e6797fffac45db5a9c5f6f7e08fd71a29ebaac0231954b1f3d343d6ea |
| Windows | sha256 a3d54e858171b6053d1865eff277cd92c8b9fdd8a0d6c57856cdd139daff1d88 |
| Mac OS | sha256 a64a810c956f54517489ad69cff57e455d9000138857229434db0da890fceec8 |


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
