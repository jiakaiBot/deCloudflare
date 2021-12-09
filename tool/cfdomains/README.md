# CfDomains

CLI tool to look up CF domain list


- Linux
```
$ wget https://git.disroot.org/dCF/deCloudflare/raw/branch/master/tool/cfdomains/cfdomains.linux -O cfdomains
$ chmod +x cfdomains

$ cfdomains --dl

$ cfdomains disroot.org
n
```

- [Windows](https://git.disroot.org/dCF/deCloudflare/raw/branch/master/tool/cfdomains/cfdomains.exe)
- [Mac OS](https://git.disroot.org/dCF/deCloudflare/raw/branch/master/tool/cfdomains/cfdomains.macos)


----

```
Usage:
        cfdomains example.com
        cfdomains [--dir|--dl|--dl2]
        cfdomains --report example.com

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
                dl: Download list files from Archive.org
                dl2: Download list files from deCloudflare git

        cfdomains --report example.com
                Submit unlisted domain to #Karma for analysis
                Only the domain will be submitted. We NEVER record anything else.
```
