# #CloudflareTest


### About #CloudflareTest

When you post a `URL` with hashtag `CloudflareTest` (or other hashtag below) CloudflareTest will tell you whether your link is Cloudflared or not.

- This is **simplified** version of [AltLink's "Is it really CloudFlare!?" check](service.altlink.md#_is-it-really-cloudflare-_-check).
  - Mastodon won't share your hashtagged toot if your account is new or not followed by anyone. If you need _reliable_ answer use AltLink instead.



### Difference

| ? | [AltLink](service.altlink.md) | CloudflareTest |
| -- | -- | -- |
| For | Followers only | All users |
| Trigger | Direct Message | **Hashtag** |
| Accept | `URL`, `Domain` | `URL` only |
| Reply | Direct Message | **Public** Message |
| Speed | Immediate (<1m) | **Stacked** (4m) |
| Result | Detailed (Retest) | **Simplified** (Y/N) |


### Hashtags

#CloudflareTest can be triggered by one of:

- #cloudflaretest
- #cloudflarecheck
- #testcloudflare
- #checkcloudflare
- #isitcloudflare
- #isthiscloudflare
- #mitmtest
- #internetfreedomtest
- #walledgarden


### Example of usage

> Hashtag with URL

- Input

_dear_human_:
```
Homemade Pizza #isThisCloudFlare
https://www.tasteofhome.com/recipes/homemade-pizza/
https://www.allrecipes.com/article/topping-and-baking-pizza/
```

- Output

```
@dear_human
tasteofhome.com: 🌩
allrecipes.com: 👍
```


> Hashtag above toot (e.g. other user's toot)

- Input

_top_user_:
```
Let's go to this party!
https://greatparty.cloudflaredexample.site/
```

_replied_user_:
```
@top_user
Hey I can't read it! #InternetFreedomTest
```

- Output

```
@replied_user @top_user
cloudflaredexample.site: 🌩
```



<a rel="me" href="https://social.kyushojitsu.ca/@cloudflaretest"></a>
