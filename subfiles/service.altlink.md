# Alternative Link


![](../image/altlink_sample.jpg)


This is `opt-in` service.


> Subscribe

1. Follow [Alternative Link (AL)](https://mamot.fr/@altlink).
  - Some trigger-happy instances such as `mastodon.social` are blocking altlink.

2. AL will accept your follow request and follow back you.
  - If you're locking your account, please accept AL's follow request otherwise AL can't read your toots.
  - If you're marking your account as `Bot`, AL will reject your request and send you a message.
    - Try to follow again within 24 hours. (opt-in by human)

3. When you post Cloudflared link, AL will send `direct` message to you with information.
  - `Boosts` will be ignored.
  - Direct messages older than 7 days will be deleted.
    - There is no good reason to keep old toots online.


> Unsubscribe

1. Just `block` or `mute` AL's account on your side.
  - AL do not attempt to re-follow you.
  - If you've changed your mind and want to subscribe(opt-in) again, `unblock`, `unfollow` AL and `follow` again.


> Settings

You can configure AL via `direct message`.

- 1: Do not message me same domain again for a day.
  - Default is `off`.
  - By default AL will notify you each time when you post _cf-example.com_. Turning this settings _on_ will silence second post for 24 hours.
- 2: Message me onionsite if available.
  - Default is `off`.
  - If you turn _on_ this settings AL will notify you with onionsite link. Note that AL will also notify you for non-cloudflare sites when onion is available.
- 3: Count my links and send me monthly report.
  - Default is `off`.
  - If you turn _on_ this settings AL will simply count how many links you shared publicly. Note that this might have duplicates. (because we DO NOT save what you shared)
  - If you change this settings counter will reset to 0.
- 4: Set my preferred language to "??". 
  - Default is unset.
  - If you tell AL your language, AL will always use your language.
  - Available languages are below.
    - de el en eo es fr hi ja kk ko ky ru zh
- 5: Show my current preferences.
  - No settings option.


```
set N V
```

- N is above numbers.
- V is value.
  - for number 1 to 3:
    - _one of_: y n yes no true false 1 0 on off
  - for number 4:
    - _one of_: available languages (see above)
  - for number 5:
    - none (see below example)
- You can mix uppercase if you want.
  - `sEt 1 TRuE` is same as `set 1 true`


Here's an example.

- Speak Russian. Enable onion. Report please.
```
@AL
set 4 ru
set 2 1
set 3 on
```

- What is my current settings?
```
@AL
set 5
```

- Turn 1 on and show settings.
```
@AL set 1 yes
set 5
```


---

- Mastodon servers are controlled by third party.
  - Let us know if above account is censored by aggressive Cloudflare supporters.
- AL don't read direct messages. e.g. `@AL hey read me`
  - It will reply to basic questions in case you did not read this documentation.
  - If you have something to say, you are welcome to create new Issue for public discussion.
- ↳ ["Cloudflare, we have a problem" Mastodon](people.mastodon.md)
- ↳ [Shared on Mastodon](shared_on_mastodon.md)

<a rel="me" href="https://mamot.fr/@altlink"></a>
