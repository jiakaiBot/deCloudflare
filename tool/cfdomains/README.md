# CfDomains

CLI tool to look up CF domain list


- Linux
```
$ wget https://karma.clearnetonion.eu.org/api/f/cfdomains.linux -O cfdomains
$ chmod +x cfdomains

$ ./cfdomains
```

- [Windows](https://karma.clearnetonion.eu.org/api/f/cfdomains.exe)
- [Mac OS](https://karma.clearnetonion.eu.org/api/f/cfdomains.app)


### Version & Hash

| Name | Value |
| -- | -- |
| Version | v1.0.1 |
| Linux | sha256 098c2bb8e17d84a8e05971a5b9b1eb730264caa4cbf3c65aba2974d129a3c59e |
| Windows | sha256 c3fb19fa4def2543a7133f41ac3ffc3c80e4028f82e21da1688cfc9ce8f3e72e |
| Mac OS | sha256 fae21f5876df8812c06fec4f764e875812679e062d4eacc01c5f6273e7a7b519 |


----

```
Usage:
        cfdomains example.com
        cfdomains --dir
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

        cfdomains --dl|dl2
        cfdomains --dl|dl2 a,b,c
                dl: Download list files from Archive.org
                dl2: Download list files from deCloudflare git
                a,b,c: Download only these files (comma-separated)

        cfdomains --report|delist example.com
                Submit domain to #Karma for analysis
                Only the domain will be submitted. We NEVER record anything else.
                report: Report not-yet-listed domain (Cloudflared)
                delist: Report currently-listed domain (Left Cloudflare)
```
