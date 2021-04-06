# Cloudflare Alternatives


## Self-hosting
Self-hosting often works great, but it requires some effort to setup.
It is more aimed at technical people.

We might create a guide for some self-hosting basics which don't require Cloudflare.
[IPFS](https://ipfs.io/) may be worth consideration if performance is the main concern.

`Apache` is vulnerable to various low-bandwidth attacks. Use other server software such as [Caddy](https://caddyserver.com/), [lighttpd](https://www.lighttpd.net/) or [nginx](https://nginx.org/).


## Best way to protect your server from DDoS
- Avoid any third-party service that _can intercept_ HTTP traffic (like Cloudflare)
- Install WAF on your loadbalancer.
  - Even simple [ModSecurity](https://www.modsecurity.org/) can save you.
- Add rate-limit to your nftable(firewall) and server software.
  - Just drop the excessive connection.


## Alternatives
| Alternative       | Drawback                          | Price | Link |
| ----------------- | --------------------------------- | ------ | ---- |
| Akamai | can be used to block Tor | ? | https://akamai.net/ |
| BunnyCDN | ? | $0.01+ | https://bunnycdn.com/ |
| Codeberg pages    | [support censorship](../HISTORY.md); no custom domain support; tor hostility | Free | https://pages.codeberg.org/ |
| Gitee pages | must understand Chinese | Free | https://gitee.com/help/articles/4136 |
| Github pages      | uses Microsoft servers            | Free | https://pages.github.com/ (WARNING: Tor/VPN users will get their account blocked automatically by Github) |
| Level 3 | ? | Enterprise | https://www.centurylink.com/ |
| PerimeterX        | not gratis                        | ? | - |
| Sharktech DDoS Solutions | ? | ? | https://sharktech.net/ |
| Surge.sh      | Modifies *.surge.sh/robots.txt response           | Free | https://surge.sh/ |
| Voxility | ? | ? | https://www.voxility.com/ |
| eQualitie | not gratis | gratis during COVID19 | https://equalit.ie/ |
| neoCities | static pages | Free | https://neocities.org/ |
| sucuri | not gratis; tor hostility at ~3.483% | $200+ | https://sucuri.net/|


## Not researched yet
- CDNJS: sponsored by Cloudflare. It might use it in the background.


## Why X is not included
| X       | Reason |
| ------- | ------ |
| Cloudflare Argo | Uses Cloudflare. |
| DDoS-GUARD | just like CloudFlare. |
| Gitlab pages      | GitLab is now Cloudflared |
| Imperva | Uses Cloudflare. |
| jsDelivr | Uses Cloudflare, see their [network page](https://www.jsdelivr.com/network) |
| Netlify | Uses Amazon AWS which is also a content delivery network. It would be hypocritical to include it. |
| Siteground | Tor-hostile people. |


## History
Sucuri and eQualitie have a history of CloudFlare patronage, but no longer.

