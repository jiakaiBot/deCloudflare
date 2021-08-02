## Useful IP List

- [vps.txt](vps.txt): Known VPS/Hosting. This doesn't include known VPN IP ranges (so you won't piss off VPN users)
  - For Amazon go to `not_cloudflare`.
  - **If you got blocked as legit VPN user don't hestitate to create an issue and tell which CIDR is the problem**!!
- [facebook.txt](facebook.txt): Facebook
- [tornodes.txt](tornodes.txt): Tor Relay Servers IP list

---


If you have public website you surely agree that so many attacks are coming from `VPS/Hosting` IPs.

At first you would block them all.

Now stop right there! Most of Tor servers are hosted on VPS. You don't want to block Tor users, amiright? :)

So to the ultimate bot protection would be:

`state NEW match-set cidr_vps src ! match-set ip_tor src`

(Block VPS but NOT in TorIPs)
