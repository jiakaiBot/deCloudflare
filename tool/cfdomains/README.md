# CfDomains


CLI tool to look up Cloudflare domain list


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
| Version | v1.0.2 |
| Linux | sha256 2315366858261ab2e60710538d7d7cf39a091cdeb90d55c601255468028d29c1 |
| Windows | sha256 e14427741da4f78ffbcaa232313351b519bcb27f46fa01ae58a991195a205eca |
| Mac OS | sha256 f890211b0a707e8f528e95580480090830b8edb01c9f848a401049129e4e78e6 |


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
