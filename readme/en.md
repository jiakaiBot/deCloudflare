# 👋 [_Non-English_ versions](http://crimeflare.eu.org)

# The Great Cloudwall

![](../image/itsreallythatbad.jpg)
![](../image/telegram/c81238387627b4bfd3dcd60f56d41626.jpg)

## Stop Cloudflare

| 🖹 | 🖼 |
| --- | --- |
| “The Great Cloudwall” is [Cloudflare Inc.](https://www.cloudflare.com/), the [U.S. company](https://en.wikipedia.org/wiki/Cloudflare). It is providing [CDN](https://en.wikipedia.org/wiki/Content_delivery_network)(content delivery network) services, [DDoS mitigation](https://en.wikipedia.org/wiki/DDoS_mitigation), [Internet security](https://en.wikipedia.org/wiki/Internet_security), and distributed [DNS](https://en.wikipedia.org/wiki/Domain_Name_System)(domain name server) services. | ![](../image/cloudflaredearuser.jpg) |
| Cloudflare is the [world's](https://almanac.httparchive.org/en/2019/cdn) [largest](https://w3techs.com/technologies/history_overview/proxy) MITM proxy ([reverse proxy](https://en.wikipedia.org/wiki/Reverse_proxy)). Cloudflare owns [more than 80% of CDN market](https://w3techs.com/technologies/history_overview/proxy) share and the number of [cloudflare users](../cloudflare_users/) are growing each day. [They](../cloudflare_inc/cloudflare_members.md) have expanded their network to more than [100 countries](https://blog.cloudflare.com/cloudflare-network-expands-to-more-than-100-countries/). Cloudflare serves [more web traffic](https://wp-rocket.me/blog/cloudflare-use-not/) than [Twitter](https://en.wikipedia.org/wiki/Twitter), [Amazon](https://en.wikipedia.org/wiki/Amazon_(company)), [Apple](https://en.wikipedia.org/wiki/Apple_Inc.), [Instagram](https://en.wikipedia.org/wiki/Instagram), [Bing](https://en.wikipedia.org/wiki/Bing_(search_engine)) & [Wikipedia](https://en.wikipedia.org/wiki/Wikipedia) combined. Cloudflare is offering [free plan](https://www.cloudflare.com/plans/) and many people are using it instead of configuring their servers properly. They traded [privacy](https://en.wikipedia.org/wiki/Privacy) over [convenience](https://news.netcraft.com/archives/2013/10/07/phishers-using-cloudflare-for-ssl.html). | ![](../image/cfmarketshare.jpg) |
| Cloudflare sits between you and origin web server, acting like a [border patrol agent](https://www.cbp.gov/careers/bpa). You are not able to connect to your chosen destination. You are connecting to Cloudflare and all your information is being decrypted and handed over on the fly. Cloudflare has a [global view](https://web.archive.org/web/20210730102406/https://blog.cloudflare.com/crawler-hints-how-cloudflare-is-reducing-the-environmental-impact-of-web-searches/) into the traffic of the Internet, and they observe the traffic flowing to and from them continuously. | ![](../image/border_patrol.jpg) |
| The origin web server administrator allowed the agent — Cloudflare — to decide [who can access](https://web.archive.org/web/https://gitlab.com/iblech/tor-appeal/issues/1) to their “_web property_” and define “_restricted area_”. | ![](../image/usershoulddecide.jpg) |
| Take a look at the right image. You will think Cloudflare block _only_ [bad guys](https://en.wikipedia.org/wiki/Black_hat_(computer_security)). You will think _Cloudflare is always online(never go [down](https://twitter.com/bengoldacre/status/1146058200887648258))_. Furthermore, You will think _legit bots and [crawlers](https://en.wikipedia.org/wiki/Web_crawler) can index your website_. | ![](../image/howcfwork.jpg) |
| However, [those are not true](../PEOPLE.md) at all. Cloudflare is blocking innocent people with no reason. Cloudflare [can go down](../HISTORY.md#user-content-cloudflare-incidents). Cloudflare blocks legit bots. | ![](../image/cfdowncfcom.jpg) |
| Just like any [hosting service](https://en.wikipedia.org/wiki/Web_hosting_service), Cloudflare is not perfect. You will see this screen [even if the origin server is working well](../PEOPLE.md). | ![](../image/cfdown2019.jpg) |
| Do you really think Cloudflare has 100% [uptime](https://en.wikipedia.org/wiki/Uptime)? [You have no idea](../PEOPLE.md) [how many times](../HISTORY.md#cloudflare-incidents) Cloudflare [goes down](https://www.zerohedge.com/markets/major-part-web-offline-cloudflare-suffers-outage). If Cloudflare goes down, your customer cannot access your website. | ![](../image/cloudflareinternalerror.jpg)<br>![](../image/cloudflareoutage-2020.jpg) |
| It is called this in reference to the [Great Firewall of China](https://www.comparitech.com/privacy-security-tools/blockedinchina/) which does a comparable job of [filtering out many humans](../PEOPLE.md) from seeing web content (i.e., everyone in [mainland China](https://en.wikipedia.org/wiki/China) and people outside) while at the same time those not affected to see a drastically different web, a web free of [censorship](https://en.wikipedia.org/wiki/Internet_censorship) such as an image of [“tank man”](https://en.wikipedia.org/wiki/Tank_Man) and the history of [“Tiananmen Square protests”](https://en.wikipedia.org/wiki/1989_Tiananmen_Square_protests#Censorship_in_China). | ![](../image/cloudflarechina.jpg) |
| Cloudflare possesses [great power](https://web.archive.org/web/20220329115719/https://digdeeper.neocities.org/ghost/mozilla.html). In a sense, they control what the end user ultimately [sees](../image/cloudflare_withprivaon.mp4). You are [prevented from browsing](../image/cloudflared-sites/_images.md) the website because of Cloudflare. | ![](../image/onemorestep.jpg) |
| Cloudflare can be used for censorship. | ![](../image/accdenied.jpg) |
| You cannot view cloudflared website if you are using minor browser, which Cloudflare may think it is a bot(because not many people use it). | ![](../image/cfublock.jpg) |
| You cannot pass [this invasive](../image/cloudflared-sites/_images.md) “browser check” without enabling JavaScript. This is a waste of five(or more) seconds of your valuable life. | ![](../image/omsjsck.jpg) |
| Cloudflare also [automatically](https://twitter.com/itsybitsydots/status/1212691131508477952) [block](../PEOPLE.md) legit robots/crawlers such as Google, Yandex, Yacy, and [API clients](../PEOPLE.md). Cloudflare is actively [monitoring](../PEOPLE.md) “bypass cloudflare” community with an intent to break legit research bots. | ![](../image/cftestgoogle.jpg)<br>![](../image/htmlalertcloudflare2.jpg) |
| Cloudflare similarly prevents many people who have poor internet connectivity from accessing the websites behind it (for example, they could be behind 7+ layers of NAT or sharing the same IP, for example public Wi-Fi) unless they solve multiple image CAPTCHAs. In some cases, [this will take 10 to 30 minutes to satisfy Google](https://trac.torproject.org/projects/tor/ticket/23840). | ![](../image/googlerecaptcha.jpg) |
| In the year 2020 Cloudflare switched from [Google's reCAPTCHA](https://en.wikipedia.org/wiki/Recaptcha) to [hCaptcha](https://en.wikipedia.org/wiki/HCaptcha) as Google [intends to charge](https://professionalhackers.in/cloudflare-dumps-recaptcha-as-google-intends-to-charge-for-its-use/) for its use. Cloudflare told you they care in your privacy([“it helps address a privacy concern”](https://blog.cloudflare.com/moving-from-recaptcha-to-hcaptcha/)) but this is obviously a lie. It is all about money. "[hCaptcha](https://www.hcaptcha.com/) allows websites to make money serving this demand while blocking bots and other forms of abuse" | ![](../image/fedup_fucking_hcaptcha.jpg)<br>![](../image/hcaptchablockchain.jpg) |
| From user's perspective, this doesn't change much. You are being forced to solve it. | ![](../image/hcaptcha_abrv.jpg)<br>![](../image/hcaptcha_chrome.jpg) |
| Many humans and software are being blocked by Cloudflare [every day](../PEOPLE.md). | ![](../image/omsnote.jpg) |
| Cloudflare [annoys many people](../PEOPLE.md) around the world. Take a look at the [list](../PEOPLE.md) and think whether adopting Cloudflare on your site is good for user experience. | ![](../image/omsstream.jpg) |
| What is the purpose of the internet if you cannot do what you want? Most people who visit your website will just look for other pages if they [can't load](https://www.hostingmanual.net/3-seconds-how-website-speed-impacts-visitors-sales/) a webpage. You may be not blocking any visitors, but Cloudflare's default firewall is strict enough to block many people. | ![](../image/omsdroid.jpg)<br>![](../image/omsappl.jpg) |
| There is no way to solve the captcha without enabling JavaScript and Cookies. Cloudflare is [using them](../PEOPLE.md) to make a browser signature to [identify](https://cryptome.org/2016/07/cloudflare-de-anons-tor.htm) [you](../PEOPLE.md). Cloudflare needs to know your identity to decide whether you are eligible to continue browsing the site. | ![](../image/cferr1010bsig.jpg)<br>![](../image/omsredjs.jpg) |
| [Tor users](https://www.torproject.org/) and [VPN users](https://airvpn.org/topic/23090-cloudflare-often-bans-my-ip-address/) are also a [victim](https://blog.torproject.org/trouble-cloudflare) of Cloudflare. Both solutions are being used by many people who cannot afford uncensored internet due to their country/corporation/network policy or who wants to add an extra layer to protect their privacy. Cloudflare is shamelessly attacking those people, forcing them to turn off their proxy solution. | ![](../image/banvpn2.jpg) |
| If you didn't try Tor until this moment, we encourage you to [download Tor Browser](https://www.torproject.org/) and visit your favorite websites. (advice: _Do not log in to your bank website or government webpage, or they will flag your account. [Use VPN](https://www.vpngate.net/en/) for those websites._) | ![](../image/banvpn.jpg) |
| You might want to say, “_Tor is illegal! Tor users are criminal! Tor is bad!_”. No. You might learn about Tor from television, saying Tor can be used to browse [darknet](https://en.wikipedia.org/wiki/Darknet) and trade guns, drugs or [child porn](https://en.wikipedia.org/wiki/Child_sexual_abuse_material). While above statement is true that there are many market websites where you can buy such items, those sites are often appear on clearnet too. | ![](../image/whousetor.jpg) |
| Tor _was_ [developed by US Army](https://www.nrl.navy.mil/itd/chacs/dingledine-tor-second-generation-onion-router), but current Tor is developed by the [Tor project](https://www.torproject.org/). There are many people and organizations [who use Tor](https://blog.torproject.org/tor-misused-criminals), including your future friends. So, if you are using Cloudflare on your website, you are blocking _real_ humans. You will lose a potential friendship and business deal. | ![](../image/iusetor_alith.jpg) |
| And their DNS service, [1.1.1.1](https://1.1.1.1/), is also filtering out users from visiting the website by returning [fake](https://trac.torproject.org/projects/tor/ticket/32915) IP address [owned by Cloudflare](https://www.reddit.com/r/CloudFlare/comments/hiqm4u/no_cloudflare_website_is_loading/), localhost IP such as “127.0.0.x”, or just return nothing. | ![](../image/cferr1016.jpg)<br>![](../image/cferr1016sp.jpg) |
| Cloudflare DNS also [break](https://twitter.com/bowranger/status/1213031783576428550) [online](https://twitter.com/jb510/status/1212521533907668992) [software](https://twitter.com/No_Style/status/1201525422795710466) [from](https://twitter.com/daemuth/status/1187758306535903233) [smartphone](https://twitter.com/gregortorrence/status/1183102089439805441) [app](https://www.reddit.com/r/CloudFlare/comments/gmfm4i/us_bank_website_is_not_in_cloudflare_dns/) [to computer game because of their fake DNS answer](../PEOPLE.md). Cloudflare DNS [cannot query](../PEOPLE.md) some bank websites. | ![](../image/cfdnsprob.jpg)<br>![](../image/dnsfailtest.jpg) |
| And here you might think,<br>"_I am not using Tor or VPN, why should I care?_"<br>"_I trust Cloudflare marketing, why should I care_"<br>"_My website is HTTPS, why should I care_" | ![](../image/annoyed.jpg) |
| If you visit website which use Cloudflare, you are sharing your information not only to website owner _but also Cloudflare_. This is how the [reverse proxy](https://en.wikipedia.org/wiki/Reverse_proxy) works. | ![](../image/prism_gfe.jpg) |
| It is impossible to [analyze](https://blog.cloudflare.com/the-csam-scanning-tool/) without [decrypting TLS traffic](https://github.com/nym-zone/block_cloudflare_mitm_fx/issues/15#issuecomment-354773389). | ![](../image/cfhelp204144518.jpg) |
| Cloudflare knows all your data such as raw password. | ![](../image/cfhelpforum.jpg) |
| [Cloudbeed](https://en.wikipedia.org/wiki/Cloudbleed) can happen anytime. | ![](../image/cfbloghtmledit.jpg) |
| Cloudflare's HTTPS is never end-to-end. | ![](../image/sniff2.gif) |
| Do you really want to share your data with Cloudflare, and also 3-letter agency? | ![](../image/cfstrengthdata.jpg) |
| Internet user's online profile is a “product” that the government and big tech companies wants to buy. | ![](../image/federalinterest.jpg) |
| U.S. [Department of Homeland Security](https://www.dhs.gov/) said:<br><br>“Do you have any idea how valuable the data you have is? Is there any way you would sell us that data?” | ![](../image/dhssaid.jpg) |
| Cloudflare also offer _FREE_ VPN service called "[Cloudflare Warp](https://blog.cloudflare.com/1111-warp-better-vpn/)". If you use it, all your smartphone ([or your computer](https://techniapps.com/2019/09/26/download-cloudflare-warp-vpn-for-pc-windows-10-mac/)) connections are sent to Cloudflare servers. Cloudflare can know which website you've read, what comment you've posted, who you've talked to, etc. You are voluntary giving [all your information](https://github.com/privacytoolsIO/privacytools.io/issues/374#issuecomment-478686469) to Cloudflare. If you think "_Are you joking? Cloudflare is secure._" then you need to learn how [VPN works](https://en.wikipedia.org/wiki/VPN). | ![](../image/howvpnwork.jpg) |
| Cloudflare said their VPN service make your internet [fast](https://www.wired.com/story/cloudflare-says-new-vpn-service-wont-slow-you-down/). But VPN make your internet connection _slower_ than [your](https://twitter.com/ExYakuza/status/1182317536089526273) [existing](https://twitter.com/waddling/status/1177615384616325120) [connection](https://techcrunch.com/2019/04/01/cloudflares-warp-is-a-vpn-that-might-actually-make-your-mobile-connection-better/). | ![](../image/notfastervpn.jpg) |
| You might already know about the [PRISM](https://en.wikipedia.org/wiki/PRISM_(surveillance_program)) scandal. It is true that [AT&T](https://en.wikipedia.org/wiki/AT%26T) lets [NSA](https://en.wikipedia.org/wiki/National_Security_Agency) [copy all internet data](https://www.cnet.com/news/at-t-lets-nsa-hide-and-surveil-in-plain-sight-the-intercept-reports/) for surveillance. | ![](../image/prismattnsa.jpg) |
| Let's say you're working at the NSA, and you want _every citizen's internet profile_. You know most of them are [blindly trusting Cloudflare](https://twitter.com/search?q=Cloudflare&f=live) and using it - only one centralized gateway - to proxy their company server connection([SSH](https://blog.cloudflare.com/public-keys-are-not-enough-for-ssh-security/)/[RDP](https://blog.cloudflare.com/cloudflare-access-now-supports-rdp/)), [emails](https://developers.cloudflare.com/email-routing/), personal website, chat website, forum website, bank website, insurance website, search engine, secret member-only website, auction website, [shopping](https://www.cloudflare.com/case-studies/shopify-powering-the-biggest-shopping-weekend-of-the-year/), video website, [game website](../image/README.md), NSFW website, and illegal website. You also know they use Cloudflare's DNS service ("_1.1.1.1_") and VPN service ("_Cloudflare Warp_") for "_Secure! Faster! Better!_" internet experience. Combining them with user's IP address, browser [fingerprint](https://github.com/VeNoMouS/cloudscraper/issues/209#issuecomment-624853689), cookies and RAY-ID will be useful to build target's online profile. | ![](../image/edw_snow.jpg)<br>![](../image/peopledonotthink.jpg) |
| You want their data. [What will you do](https://www.reddit.com/r/privacy/comments/1gb0pa/how_prism_actually_works_1520_att_fiber_optic/)? | ![](../image/nsaslide_prismcorp.gif) |
| **Cloudflare is a honeypot.** | ![](../image/honeypot.gif) |
| **Free honey for everyone. _Some_ strings attached.** | ![](../image/iminurtls.jpg) |
| **Do not use Cloudflare.** | ![](../image/shadycloudflare.jpg) |
| **Decentralize the internet.** | ![](../image/cfisnotanoption.jpg) |

## Please continue to next page:  "[Cloudflare Ethics](en.ethics.md)"

| 🖼 | 🖼 | 🖼 |
| --- | --- | --- |
| ![](../image/fbi_on_cloudflare.jpg) | ![](../image/cloudflare_cisa_govtld.png) | ![](../image/twitterban_cloudflare.jpg) |


<details>
<summary><h3>Data & More Information</h3></summary>

This repository is a list of websites that are behind "The Great Cloudwall", blocking Tor users and other CDNs.

**Data**
* [Cloudflare Inc.](../cloudflare_inc/)
* [Cloudflare Users](../cloudflare_users/)
* [Cloudflare Domains](http://cloudflare-domains.project.crimeflare.eu.org/)
* [Non-Cloudflare CDN users](../not_cloudflare/)
* [Anti-Tor users](../anti-tor_users/)

![](../image/goodorbad.jpg)

**More Information**
* **[☞ deCloudflare Subfiles ☜](../subfiles/README.md)**
* [The Great Cloudwall](../pdf/2019-Jeff_Cliff_Book1.txt), [Mr. Jeff Cliff](https://shitposter.club/users/jeffcliff)
  * Download: [PDF](../pdf/2019-The_Great_Cloudwall.pdf), [ePUB](../pdf/2019-Jeff_Cliff_The_Great_Cloudwall.epub)
  * The original eBook(ePUB) was deleted by BookRix GmbH due to copyright infringement of CC0 material
* [Padlock icon indicates a secure SSL connection established w MITM-ed](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=831835), Anonymous
* [Block Global Active Adversary Cloudflare](https://trac.torproject.org/projects/tor/ticket/24351), nym-zone
  * The ticket was vandalized so many times.
  * [Deleted by the Tor Project.](https://lists.torproject.org/pipermail/anti-censorship-team/2020-May/000098.html) [See ticket 34175.](https://trac.torproject.org/projects/tor/ticket/34175)
  * [Last archive ticket 24351](https://web.archive.org/web/20200301013104/https://trac.torproject.org/projects/tor/ticket/24351)
* [Cloudflare Watch](http://www.crimeflare.org:82/)
  * Archived - [CloudFlare Watch](../subfiles/classics/README.md)
* [Criticism and controversies](https://en.wikipedia.org/wiki/Cloudflare#Criticism_and_controversies), Wikipedia
* [CloudFlare rap sheet](../subfiles/rapsheet.cloudflare.md)

![](../image/watcloudflare.jpg)

</details>

<details>
<summary><h3>What can you do?</h3>
</summary>

* [Read our list of recommended actions and share it with your friends.](en.action.md)
* [Read other user's voice and write your thoughts.](../PEOPLE.md)
* Search something: [Ombrelo](../subfiles/service/ombrelo.md)
* Update the domain list: [List instructions](../INSTRUCTION.md).
* [Add Cloudflare or project related event to history.](../HISTORY.md)
* [Try & write new Tool/Script.](../tool/)
   * [CfDomains](../tool/cfdomains/README.md)
* [Here's some PDF/ePUB to read.](../pdf/)

### About fake accounts

We know about the existence of fake accounts impersonating our official channels, be it Twitter, [Facebook](https://www.fsf.org/facebook), Mastodon, Github, Gitea, Patreon, OpenCollective, Villages etc.
**We never ask your email. 
We never ask your name. 
We never ask your identity. 
We never ask your location. 
We never ask your review. 
We never ask you to follow on social media. 
We never ask your social media.**

# DO NOT TRUST FAKE ACCOUNTS.

| 🖼 | 🖼 |
| --- | --- |
| ![](../image/wtfcf.jpg) | ![](../image/omsirl2.jpg) |
| ![](../image/omsirl.jpg) | ![](../image/whydoihavetosolveacaptcha.jpg) |
| ![](../image/fixthedamn.jpg) | ![](../image/imnotarobot.jpg) |

</details>

![](../image/twe_lb.jpg)

![](../image/twe_dz.jpg)

![](../image/twe_jb.jpg)

![](../image/twe_ial.jpg)

![](../image/twe_eptg.jpg)

![](../image/twe_crc32ae80d4d3.jpg)

![](../image/eastdakota_1273277839102656515.jpg)

![](../image/stopcf.jpg) [🖼 Poster](../image/poster/README.md)
