# Spamhaus blocks CloudFlare's IP ranges


Spamhaus says about CloudFlare:

```
Hosting service refuses to shut off abusers. Spam & cybercrime
'reverse proxies' stay up after being reported. Cybercrime world
now knows of this 'bulletproof hosting' and is rushing here.
```

> July 2012


[Spamhaus](https://web.archive.org/web/20210826103614/http://en.wikipedia.org/wiki/Spamhaus) is an international nonprofit organization founded in 1998. On July 11, 2012 they added nearly the entire CloudFlare range of IP addresses to their SBL (Spamhaus Block List). [These three entries](spamhaus.md) are labeled "escalation" and include 37,000 addresses. (CloudFlare's own complete list of their IP ranges contained 44,500 IP addresses in July, 2012. Assuming that some of these were for future expansion and presently unused, this meant that Spamhaus had essentially added all of cloudflare.com to their SBL.)

This doesn't mean that the domains are unavailable. All it means is that you are less likely to find a CloudFlare-affiliated domain embedded in spam or phishing emails. And if your email address is based on a domain that is protected by CloudFlare, your system administrator might discover that outgoing emails are blocked by upstream providers who use Spamhaus blacklists. There is nothing your sysadmin can do about this except to turn off CloudFlare's service, causing your domain to resolve to a non-CloudFlare IP address.

![](img/prince.jpg)

Matthew Browning Prince, born on 1974-11-13, is the CEO and co-founder of CloudFlare. Thanks to a [rich dad](https://web.archive.org/web/20210826103614/http://web.archive.org/web/20081002173414/http://www.mufranchisee.com/article/453/), he attended the University of Chicago Law School ('00) and Harvard Business School ('09). Prince taught Internet law and was a specialist in anti-spam laws and phishing investigations. It's a mystery why he joined the Dark Side.

CloudFlare has not yet borrowed Google's "don't be evil" motto. Perhaps this is because his company was wantonly libertarian and aggressively overhyped right out of the starting gate, so that pretending to embrace probity could prove embarrassing. His [thoughts on abuse](https://web.archive.org/web/20210826103614/http://blog.cloudflare.com/thoughts-on-abuse) are pathetic for someone who should know better.

See also (Oct 2013):  [Phishers using CloudFlare for SSL](https://web.archive.org/web/20210826103614/http://news.netcraft.com/archives/2013/10/07/phishers-using-cloudflare-for-ssl.html)

In fact, sysadmins everywhere will feel safer if they block all of CloudFlare's ranges:

```
            103.21.244.0/22   (103.21.244.0 - 103.21.247.255)
            103.22.200.0/22   (103.22.200.0 - 103.22.203.255)
            103.31.4.0/22   (103.31.4.0 - 103.31.7.255)
            104.16.0.0/12   (104.16.0.0 - 104.31.255.255)
            108.162.192.0/18   (108.162.192.0 - 108.162.255.255)
            131.0.72.0/22   (131.0.72.0 - 131.0.75.255)
            141.101.64.0/18   (141.101.64.0 - 141.101.127.255)
            162.158.0.0/15   (162.158.0.0 - 162.159.255.255)
            172.64.0.0/13   (172.64.0.0 - 172.71.255.255)
            173.245.48.0/20   (173.245.48.0 - 173.245.63.255)
            188.114.96.0/20   (188.114.96.0 - 188.114.111.255)
            190.93.240.0/20   (190.93.240.0 - 190.93.255.255)
            197.234.240.0/22   (197.234.240.0 - 197.234.243.255)
            198.41.128.0/17   (198.41.128.0 - 198.41.255.255)
            199.27.128.0/21   (199.27.128.0 - 199.27.135.255)
```

![](img/cleary2.jpg)

If you are running Linux, you can enter nullroutes for CloudFlare without trying to figure out iptables. We use it on our server because CloudFlare-affiliated cybercriminals have a history of DDoSing us. One of them is named Ryan Cleary and he is in jail now in the UK. He won't get out anytime soon — he pleaded guilty and has also been indicted by a U.S. grand jury. Poor Ryan would feel better if Mr. Prince visited him in jail and offered a little bit of immoral support.

These commands will block access to CloudFlare domains for all traffic to and from your Linux box. Normally a domain that uses CloudFlare won't be coming into your box with their CloudFlare IP address. But with all those cybercriminals using CloudFlare, you never know what trickery is afoot. After these blocks, any attempt to access your box from cloudflare.com will time out. Best of all, anyone sharing your box won't be able to get to CloudFlare to read Mr. Prince's excuses. To remove these blocks, just change "add" to "del" and run the script again, or you can reboot.

```
            /sbin/route add -net 103.21.244.0 netmask 255.255.252.0 reject
            /sbin/route add -net 103.22.200.0 netmask 255.255.252.0 reject
            /sbin/route add -net 103.31.4.0 netmask 255.255.252.0 reject
            /sbin/route add -net 104.16.0.0 netmask 255.240.0.0 reject
            /sbin/route add -net 108.162.192.0 netmask 255.255.192.0 reject
            /sbin/route add -net 131.0.72.0 netmask 255.255.252.0 reject
            /sbin/route add -net 141.101.64.0 netmask 255.255.192.0 reject
            /sbin/route add -net 162.158.0.0 netmask 255.254.0.0 reject
            /sbin/route add -net 172.64.0.0 netmask 255.248.0.0 reject
            /sbin/route add -net 173.245.48.0 netmask 255.255.240.0 reject
            /sbin/route add -net 188.114.96.0 netmask 255.255.240.0 reject
            /sbin/route add -net 190.93.240.0 netmask 255.255.240.0 reject
            /sbin/route add -net 197.234.240.0 netmask 255.255.252.0 reject
            /sbin/route add -net 198.41.128.0 netmask 255.255.128.0 reject
            /sbin/route add -net 199.27.128.0 netmask 255.255.248.0 reject
```

### Snake oil for harried webmasters

In 2009, [New York Times](https://web.archive.org/web/20210826103614/http://www.nytimes.com/external/readwriteweb/2009/10/13/13readwriteweb-google-accounts-for-6-of-all-internet-traff-90323.html) reported that according to a two-year study, Google accounts for six percent of all Internet traffic worldwide. One year later CloudFlare launched. By early 2012, according to Matthew Prince in [Forbes](https://web.archive.org/web/20210826103614/http://www.forbes.com/sites/eliseackerman/2012/02/29/how-cloudflares-free-ddos-protection-service-is-disrupting-the-multibillion-dollar-computer-security-and-content-delivery-markets), on any given day 25 percent of the Internet's visitors pass through CloudFlare. Does this mean that CloudFlare handles four times more traffic than Google? They obviously know what they're doing. You cannot go wrong!

![](img/snake3.gif)

Matthew Prince made a similar statement on July 18, 2012: "We do more traffic than Amazon, Wikipedia, Twitter, Zynga, AOL, Apple, Bing, eBay, PayPal and Instagram combined," chief executive Matthew Prince told [VentureBeat](https://web.archive.org/web/20210826103614/http://venturebeat.com/2012/07/18/cloudflare-amazon-wikipedia-twitter/). "We're about half of a Facebook, and this month we'll surpass Yahoo in terms of pageviews and unique visitors."

Curiously, Mr. Prince changed his tune in [August 2013](https://web.archive.org/web/20210826103614/http://blog.cloudflare.com/cloudflare-and-free-speech): "Today, approximately four percent of web requests flow through our network." Is CloudFlare slowing down? Not at all. The previous June he told [The Economist](https://web.archive.org/web/20210826103614/http://www.economist.com/news/international/21579818-theres-only-so-much-you-can-do-denying-deniers) that he is adding 5,000 customers per day.

If CloudFlare adds 5,000 per day over the course of a year, how does its share of Internet traffic go from 25 percent to 4 percent? Who is more guilty of spreading bullshit — high-tech CEOs, or fanboy publications that print anything they say? (More background on Prince is available [here](honeypot.md).) 

---

[home page](README.md)