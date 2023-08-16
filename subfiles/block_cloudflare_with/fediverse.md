# How to Block Cloudflare
## on Fediverse

This page show you how to block CloudFlare servers from your timeline.

- [Cloudflare-only Fediverse list](https://karma.crimeflare.eu.org:1984/api/listdata/?name=cf_fediverse_CSV), from [Cloudflared Fediverse](../cloudflared/social/fediverse.md)
- [Alternative Link](../service/altlink.md)


### With Mastodon (as User)

<details><summary> _click me_ </summary>

1. Download `Cloudflare-only Fediverse list` above.
2. Go to your `Preferences` -> `Import and Export` section.
3. Select Import type `Domain blocklist list`, select Data file to your downloaded text file, click `UPLOAD`.
4. Confirm the import if asked.
5. Wait for Mastodon complete the import. This will take a long time.

</details>


### With Mastodon (as Admin)

<details><summary> _click me_ </summary>

1. Download `Cloudflare-only Fediverse list` above. ([API info](../service/karma_api.md#get-data))
2. Save below script and run it.

```
#!/bin/bash

while IFS= read -r domain
do
  tootctl domains block "$domain"
done < cf_fediverse.txt
```

</details>
