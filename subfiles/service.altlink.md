# Alternative Link


| 🖼 | 🖼 |
| -- | -- |
| ![](../image/altlink_sample.jpg) | ![](../image/altlink_suggest.jpg) |


This is `opt-in` service.


- Contents
  - [A little history](service.altlink.md#a-little-history)
  - [How to Subscribe](service.altlink.md#how-to-subscribe)
  - [How to Unsubscribe](service.altlink.md#how-to-unsubscribe)
  - ["Is it really CloudFlare!?" check](service.altlink.md#_is-it-really-cloudflare-_-check)
  - [CloudFlareTest it!](service.altlink.md#cloudflaretest-it)
  - [Report a problem / Create an Issue](service.altlink.md#report-a-problem-create-an-issue)
  - [Settings](service.altlink.md#settings)


----

### A little history

Once upon a time there was a bot named "_[CloudflareLink](https://social.privacytools.io/@cloudflarelink/with_replies)_" which was created by Anonymous.
It replied to many users who shared CF links publicly.

Not many people reacted it positively. Here is some of them.

- [kemonine@social.holdmybeer.solutions](https://social.holdmybeer.solutions/objects/9479c5be-40df-4ecd-a3fe-0209a9020dfd)
```
To the owner of this bot
You should be ashamed.
Quit drive by bro'ing our statuses.
Please fornicate with a pointy stick.
```

- [Sylvhem@eldritch.cafe](https://eldritch.cafe/@Sylvhem/102701484501099424)
```
Pointing to a copy rather than the original document if it's still online is bad practice too. Also, you are a very annoying bot.
```

They got annoyed and Mastodon server owner was pressured by their "spam" reports.

One of Mastodon server owner once [said](../tool/mastodonwch#some-public-reaction), "_your little protest bot is making people upset, and i'm worried it might cause people to defederate from the instance, please tone it down_."

For the record "_CloudflareLink_" was moved to other Mastodon servers 3 times and banned 2 times by 2 Mastodon services until the Anonymous decided to given up for good.

The main difference of AltLink is `opt-in`.
Those people who [share Cloudflare links casually](cloudflared/shared_mastodon.md) never receive notification until they have a good heart and follow AL.



### How to Subscribe

1. Follow [Alternative Link (AL)](https://mamot.fr/@altlink).
  - Some instances such as [mastodon.social](https://github.com/mastodon/mastodon/issues/16480) are blocking altlink.

| 🖼 | 🖼 |
| -- | -- |
| ![](../image/ban_altlink_mastodon.social.jpg) | ![](../image/ban_altlink_eldritch.cafe.jpg) |


2. AL will follow back you **within an hour**.
  - If you're locking your account, please accept AL's follow request otherwise AL can't read your toots.
  - **If** there is a network instability and AL failed to follow back you **after 1 hour**:
    - Please `unfollow`, `wait 1 hour`, and `follow` again.

3. When you share Cloudflared link, AL will send `direct` message to you with information.
  - Direct messages older than *24* hours will be deleted.
    - There is no good reason to keep old toots online.
      - [Should I Delete My Tweets?](https://www.wired.com/story/the-know-it-alls-should-i-delete-my-tweets/)


### How to Unsubscribe

1. Just `unfollow` AL's account **on your side**.
  - **AL will unfollow you within an hour**.
  - AL do not attempt to re-follow you.
  - If you've changed your mind and want to subscribe(opt-in) again, `unblock`, `unfollow` AL and `follow` again.


### "_Is it really CloudFlare!?_" check

Just send `domain name` or `URL` as `direct message` and AL will answer within 1 minute.

Here's an example.

```
@altlink blog.emsisoft.com
```

You can also query multiple at once / mix domain and URLs

```
@altlink
en.wikipedia.org
https://blog.emsisoft.com/wow/
www.wikimedia.org
```


### CloudFlareTest it!

You can call AltLink into your **public** **discussion** to test `above user's (not yours) URL`. 
All you have to do is hit `Reply` button and 
- Include user `altlink`
- Add the word `cloudflaretest` (case does not matter)

AL will answer within 1 minute.

- This is a simple `Yes`/`No` test.
  - If you need detailed check use above one instead.


Here's an example.

mad_dog wrote:
```
Check my new blog! https://oh.my.god/
```
you reply:
```
Hey @mad_dog, your blog need to do cloudflareTest. @altlink
```


### Report a problem / Create an Issue

You can create an Issue without git account. Just send a **direct** message.
And don't worry,

- Multiple mentions (e.g. `@randomUser @altlink @otherUser blah blah blah`)
- _Public_ message (e.g. `there's a bot called @altlink`)

...will be ignored to prevent spam.
Your username part (before `@`) will be masked to protect your privacy.


### Settings

You can configure AL via `direct message`.

# DEPRECATED - Settings_By_DM is DEPRECATED and will be REPLACED. Please wait!

- 1: Do not message me same domain again for a day.
  - Default is `off`.
  - By default AL will notify you each time when you share _inaccessible_ link. Turning this settings _on_ will silence second post for 24 hours.
- 2: Suggest other non-Cloudflare alternative sites _when available_.
  - Default is `off`.
    - If you turn _on_ this settings AL will help you find alternative better links for your normal toots.
  - Let's say you boost or post Cloudflared news site. AL will suggest some similar websites related to your URL within 1 minute. Note that AL might suggest inaccurate result.
    - AL will not suggest anything if your account is `Bot`.
    - Rate-Limit: AL will suggest `only once per 1 minute`.
- 3: Count my links and send me report monthly.
  - Default is `off`.
  - If you turn _on_ this settings AL will simply count how many links you shared publicly and how many were Cloudflared. Note that this count will have duplicates because we **never** save (& don't care) what you shared.
    - AL will not send a report if you did not post any links (share 0 links) for a month. (e.g. you have returned to Twitter and stopped using Mastodon)
  - If you change this settings _or_ each month has passed counter will reset to 0.
- 4: Set my preferred language to ??. 
  - Default is _unset_.
    - AL will use language based on your toot.
  - If you tell AL your language, AL will speak your language.
    - Need other language? Create an issue.
- 6: Ignore boosted toots.
  - Default is `off`.
  - By default AL will notify you when you boost(retweet) other user's post which has Cloudflare link.
- 7: Use alternative provider.
  - Default is `off`.
  - If you turn _on_ this settings AL will use [IAList](README.md) service.
- 8: Notify me if the link is known [Anti-Tor](../anti-tor_users/domains) link.
  - Default is `off`.
  - If you turn _on_ this settings AL will notify you when you share links that block Tor users.
    - "_Hey website.com why are you blocking Tor!?_"


```
set N V
```

- N is above numbers.
- V is value.
  - for number 1 to 3, 6 to 8:
    - _one of_: `yes` `no` `true` `false` `on` `off`
  - for number 4:
    - _one of_: `cc` (2 letter. see [/README.md](../README.md))
    - e.g. `es Español` -> `es`
    - [**Improve translation**](../tool/trans.altlink.txt)
- You can mix uppercase if you want.
  - `sEt 1 TRuE` is same as `set 1 true`


Here's an example.

- Speak Русский. Monthly Report please.
```
@altlink
set 4 ru
set 3 on
```


---

- Mastodon servers are controlled by third party.
  - Let us know if above account is censored by aggressive Cloudflare supporters.
- ↳ [Altlink IRC Service](service.altlink_irc.md)
- ↳ ["Cloudflare, we have a problem" Mastodon](people.mastodon.md)
- ↳ [How many % of public Fediverse services are using Cloudflare?](cloudflared/fediverse.md)
- ↳ [How many % of links people publicly shared on Mastodon are using Cloudflare?](cloudflared/shared_mastodon.md)

<a rel="me" href="https://mamot.fr/@altlink"></a>
