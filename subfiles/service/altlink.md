# Alternative Link (AltLink; MitiGator)


| 🖼 | 🖼 |
| -- | -- |
| ![](../../image/altlink_sample.jpg) | ![](../../image/altlink_suggest.jpg) |


This is `opt-in` service.

MitiGator can help you preventing sharing inaccessible links.


- Contents
  - [A little history](altlink.md#a-little-history)
  - [How to Subscribe](altlink.md#how-to-subscribe)
  - [How to Unsubscribe](altlink.md#how-to-unsubscribe)
  - [Suggest clean alternatives](altlink.md#suggest-clean-alternatives)
  - [Settings](altlink.md#settings)
  - [Download PNG Logo](altlink.md#download-png-logo)
  - [The Difference between MitiGator and MGLite](altlink.md#the-difference-between-mitigator-and-mglite)


----

### A little history

Once upon a time there was a bot named "_[CloudflareLink](https://social.privacytools.io/@cloudflarelink/with_replies)_" which was created by Anonymous.
It replied to many users who shared CF links publicly.

Not many people reacted it positively. Here is some of them.

- kemonine@social.holdmybeer.solutions
```
To the owner of this bot
You should be ashamed.
Quit drive by bro'ing our statuses.
Please fornicate with a pointy stick.
```

- Sylvhem@eldritch.cafe
```
Pointing to a copy rather than the original document if it's still online is bad practice too. Also, you are a very annoying bot.
```

They got annoyed and Mastodon server owner was pressured by their "spam" reports.

One of Mastodon server owner once [said](../../tool/mastodonwch#some-public-reaction), "_your little protest bot is making people upset, and i'm worried it might cause people to defederate from the instance, please tone it down_."

For the record "_CloudflareLink_" was moved to other Mastodon servers 3 times and banned 2 times by 2 Mastodon services until the Anonymous decided to given up for good.

The main difference of AltLink is `opt-in`.
Those people who [share Cloudflare links casually](../cloudflared/social/shared_mastodon.md) never receive notification until they have a good heart and follow AL.

Initially this bot's name was `AltLink`. It was changed to `MitiGator`.


### How to Subscribe

Below steps is for MitiGator and not MGLite.

1. **Follow** the [MitiGator Account](https://101010.pl/@mg). (if you [do not have Mastodon account](https://101010.pl/invite/txvFuk9h))
  - Some instances such as [mastodon.social](https://github.com/mastodon/mastodon/issues/16480) are blocking MitiGator.

2. Send _any text_ as **direct** ("Mentioned people only") message to above account.
  - e.g. `@mg follow`
  - And it will follow back you _instantly_ with introduction message.
    - If you're locking your account, please accept it's follow request otherwise it can't read your toots.
  - If you didn't got any reply make sure you are following it.

3. You're all set!
  - When you share Cloudflared link, it will send `direct` message to you with information.
  - If you want to tune your preference, visit Settings (explained below)


### How to Unsubscribe

1. Just `unfollow` it's account.
  - **it should unfollow you within an hour**.
    - it do not attempt to re-follow you.
  - If you've changed your mind and want to subscribe(opt-in) again simply `follow` again.


### Suggest clean alternatives

Just ask (send **direct** message to) it and he will provide some suggestions.

- This is related to Settings' `Suggest other non-Cloudflare alternative sites when available`.
  - It is `on` by default; you can disable it from Settings website (below).

Syntax: `@mg ?URL` or `？URL`

Put Cloudflared URL like this.

```
@mg ?https://cflove.myblog.site/cloud_is_internet/?blog=true
```

```
@mg

？https://invite.party/cloudflare_users_only/
```


**1** question per toot. Below does **not** work.

```
@mg
?https://matthew.prince/blog/
?https://matthewprince.site/
?https://matthew.prince.name/
```

And you will receive something like below within 1 minute if there are alternatives.

```
@mygoodperson 🤔

➤ GOOD_ALTERNATIVE_SITE_1
https://...

➤ GOOD_ALTERNATIVE_SITE_2
https://...

➤ GOOD_ALTERNATIVE_SITE_3🚨
https://...
```

- The "🚨" icon means the website is known Anti-Tor website. Tor users better avoid this result.


### Settings

You can configure it from [this website](https://services.crimeflare.eu.org/mitigator/).


- **Easier way**: From your Mastodon, send a Direct Message with keyword below.
  - _one of_: `help` `set` `settings` `conf` `config` `cfg`
  - e.g. `@mg set`


### Download PNG Logo

For your poster/meme needs.

- Try [Meme Generator](https://services.crimeflare.eu.org/mitigator/meme/)

MitiGator's profile image shows an orange shield and a cartoon of the mascot character, 𝙈𝙞𝙩𝙞𝙂𝙖𝙩𝙤𝙧, who stands proud as the MITM Prevention Alligator.
The mascot wears a referee top and red sash across chest. Above the shield is 'MitiGator' in arching, bold, small caps, serif lettering.


| 🖼 | 🖼 | 🖼 | 🖼 |
| -- | -- | -- | -- |
| ![](../../image/mitigator.png) | ![](../../image/mitigatorB.png) | - | - |
| ![](../../image/mitigatorC01.png) | ![](../../image/mitigatorC02.png) | ![](../../image/mitigatorC03.png) | ![](../../image/mitigatorC04.png) |


### The Difference between MitiGator and MGLite

MGLite is a lite version of MitiGator. It provides one basic feature - notify you about Cloudflare.

It also have following difference:

| ? | MitiGator | MGLite |
| -- | -- | -- |
| _Subscribe Users_ | `All` | `Local server only` |
| _How to Subscribe_<br>_Require send DM after follow_ | ✔️ | ❌ |
| _Reply Message as_ | `Direct` | `Unlisted` |
| _Boosted post: Mention original poster_ | ❌ | ✔️ |
| _Customisable Options_ | ✔️ | ❌ |

- 📣 If you are **Mastodon admin** and want to serve MGLite to your instant users contact us!


----

- Mastodon servers are controlled by third party.
  - Let us know if above account is censored by aggressive Cloudflare supporters.
- ↳ ["Cloudflare, we have a problem" Mastodon](../people/mastodon.md)
- ↳ [How many % of public Fediverse services are using Cloudflare?](../cloudflared/social/fediverse.md)
- ↳ [How many % of links people publicly shared on Mastodon are using Cloudflare?](../cloudflared/social/shared_mastodon.md)
