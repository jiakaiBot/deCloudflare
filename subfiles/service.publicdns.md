# Public DNS


> About this service

- No logs. No statistics. No collection. Plain simple DNS!
- Block sites using Cloudflare.
  - DNS will return empty result if the answer IP is Cloudflare.
- Block [adverts, trackers, adware, malware](https://github.com/StevenBlack/hosts/) sites.
- Randomly pick good DNS root servers.
- Block [DNS-rebind](https://en.wikipedia.org/wiki/DNS_rebinding) attack.


| Type | Value | Example |
| --- | --- | --- |
| DNS over TLS<br>**_Recommend_** | `dns.crimeflare.eu.org` | ![](../image/dnsset-dot.jpg) |
| DNS over HTTPS | `https://dns.crimeflare.eu.org/dns-query` | ![](../image/dnsset-doh.jpg) |
| DNS over Onion | `http://dns.im5wixghmfmt7gf7wb4xrgdm6byx2gj26zn47da6nwo7xvybgxnqryid.onion/dns-query` | - |
