## Karma API

- Operated by `Crimeflare #Karma` with `No log` policy.
  - There is a rate-limit and anti-attack system so please be nice.
- List data is almost identical to [Cloudflare Domains](../cloudflare_users/domains).

There are many APIs live on Karma.
In this page we explain 2 major read-only APIs.


Replace the (base url) to:
| Type | URL |
| -- | -- |
| Clearnet(Recommend) | `https://karma.crimeflare.eu.org:1984/api/` |
| Clearnet(Discouraged) | `https://karma.crimeflare.eu.org/api/` |
| Tor | http://karma.im5wixghmfmt7gf7wb4xrgdm6byx2gj26zn47da6nwo7xvybgxnqryid.onion/api/ |

-----

> Cloudflare Domains Lookup

For looking up domain's existence as a MITM domain.

| ? | ? |
| -- | -- |
| Location | `(base url)is_cf.php` |
| Request Method | `POST` |
| Input | `f` or `u` is required.<br>`f` FQDN (e.g. www.google.com)<br>`u` URL (e.g. https://www.google.com/) |
| Output | JSON value as array.<br>[false,false] (Error or not Cloudflare)<br>[true,false] (Not Cloudflare)<br>[true,true] (Cloudflare) |
| cURL Example | `curl -X POST -F 'f=www.example.com' -k --http2 https://.../api/is_cf.php` |


> Anti-Tor Lookup

For looking up website's existence in the known Anti-tor list.


| ? | ? |
| -- | -- |
| Location | `(base url)is_at.php` |
| Request Method | `POST` |
| Input | `f` or `u` is required.<br>`f` FQDN (e.g. www.google.com) |
| Output | JSON value as array.<br>[false,false] (Error or not AntiTor)<br>[true,false] (Not AntiTor)<br>[true,true] (AntiTor) |
| cURL Example | `curl -X POST -F 'f=www.example.com' -k --http2 https://.../api/is_at.php` |
