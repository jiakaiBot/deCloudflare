# Etik konular

![](../image/itsreallythatbad.jpg)
![](../image/telegram/c81238387627b4bfd3dcd60f56d41626.jpg)

"Etik olmayan bu şirketi desteklemeyin"

"Şirketiniz güvenilir değil. DMCA'yı uyguladığınızı iddia ediyorsunuz ancak bunu yapmadığınız için birçok davanız var."

"Sadece etiklerini sorgulayanları sansürlüyorlar."

"Sanırım gerçek uygunsuzdur ve kamuoyunun gözünden daha iyi saklanır."  -- [phyzonloop](https://twitter.com/phyzonloop)


---


<details>
<summary>beni tıkla

## CloudFlare insanları spamlıyor
</summary>


Cloudflare, Cloudflare olmayan kullanıcılara spam e-postalar gönderiyor.

- Yalnızca kaydolan abonelere e-posta gönderin
- Kullanıcı "dur" dediğinde e-posta göndermeyi durdurun

Bu kadar basit. Ancak Cloudflare umursamıyor.
Cloudflare, hizmetlerini kullanmanın tüm spam gönderenleri veya saldırganları durdurabileceğini söyledi.
Cloudflare'yi etkinleştirmeden Cloudflare'yi nasıl durdurabiliriz?


| 🖼 | 🖼 |
| --- | --- |
| ![](../image/cfspam01.jpg) | ![](../image/cfspam03.jpg) |
| ![](../image/cfspam02.jpg) | ![](../image/cfspambrittany.jpg)<br>![](../image/cfspamtwtr.jpg) |

</details>

---

<details>
<summary>beni tıkla

## Kullanıcının incelemesini kaldır
</summary>


Cloudflare sansür olumsuz yorumlar.
Cloudflare önleyici metni Twitter'da yayınlarsanız, Cloudflare çalışanından "Hayır, değil" mesajıyla yanıt alma şansınız olur.
Herhangi bir inceleme sitesinde olumsuz bir inceleme gönderirseniz, onu sansürlemeye çalışırlar.


| 🖼 | 🖼 |
| --- | --- |
| ![](../image/cfcenrev_01.jpg)<br>![](../image/cfcenrev_02.jpg) | ![](../image/cfcenrev_03.jpg) |

</details>

---

<details>
<summary>beni tıkla

## Kullanıcının özel bilgilerini paylaşın
</summary>


Cloudflare'nin büyük bir taciz sorunu var.
Cloudflare, barındırılan siteler hakkında şikayette bulunanların kişisel bilgilerini paylaşır.
Bazen sizden gerçek kimliğinizi vermenizi isterler.
Tacize uğramak, saldırıya uğramak, dövülmek veya öldürülmek istemiyorsanız, Cloudflared web sitelerinden uzak durun.


| 🖼 | 🖼 |
| --- | --- |
| ![](../image/cfdox_what.jpg) | ![](../image/cfdox_swat.jpg) |
| ![](../image/cfdox_kill.jpg) | ![](../image/cfdox_threat.jpg) |
| ![](../image/cfdox_dox.jpg) | ![](../image/cfdox_ex1.jpg) |
| ![](../image/cfabuseform.jpg) | ![](../image/cfdox_ex2.jpg) |

</details>

---

<details>
<summary>beni tıkla

## Hayırsever katkılar için kurumsal talep
</summary>


CloudFlare hayır amaçlı katkılar istiyor.
Bir Amerikan şirketinin, iyi nedenleri olan kar amacı gütmeyen kuruluşların yanı sıra hayır işleri istemesi oldukça ürkütücü.
İnsanları engellemeyi veya başkalarının zamanını boşa harcamayı seviyorsanız, Cloudflare çalışanları için pizza sipariş etmek isteyebilirsiniz.


![](../image/cfdonate.jpg)

</details>

---

<details>
<summary>beni tıkla

## Siteleri feshetme
</summary>


Siteniz aniden kapanırsa ne yapacaksınız?
Cloudflare'nin kullanıcının yapılandırmasını sildiğine veya herhangi bir uyarı vermeden, sessizce hizmeti durdurduğuna dair raporlar var.
Daha iyi bir sağlayıcı bulmanızı öneririz.

![](../image/cftmnt.jpg)

</details>

---

<details>
<summary>beni tıkla

## Tarayıcı satıcı ayrımcılığı
</summary>


CloudFlare, Firefox kullananlara Tor üzerinden Tor-Tarayıcı olmayan kullanıcılara düşmanca muamele ederken, tercihli muamele sağlar.
Özgür olmayan javascript çalıştırmayı haklı olarak reddeden Tor kullanıcıları da düşmanca muamele görürler.
Bu erişim eşitsizliği, ağ tarafsızlığının kötüye kullanılması ve gücün kötüye kullanılmasıdır.

![](../image/browdifftbcx.gif)

- Sol: Tor Tarayıcı, Sağ: Chrome. Aynı IP adresi.

![](../image/browserdiff.jpg)

- Sol: Tor Tarayıcı Javascript Devre Dışı, Çerez Etkin
- Sağ: Chrome Javascript Etkin, Çerez Devre Dışı

![](../image/cfsiryoublocked.jpg)

- Tor (Clearnet IP) olmadan QuteBrowser (küçük tarayıcı)

| ***Tarayıcı*** | ***Erişim tedavisi*** |
| --- | --- |
| Tor Browser (Javascript etkinleştirildi) | erişime izin verildi |
| Firefox (Javascript etkinleştirildi) | erişim azaldı |
| Chromium (Javascript etkinleştirildi) | erişim azaldı |
| Chromium or Firefox (Javascript devre dışı) | erişim reddedildi |
| Chromium or Firefox (Çerez devre dışı bırakıldı) | erişim reddedildi |
| QuteBrowser | erişim reddedildi |
| lynx | erişim reddedildi |
| w3m | erişim reddedildi |
| wget | erişim reddedildi |


Kolay zorlukları çözmek için neden Ses düğmesini kullanmıyorsunuz?

Evet, bir ses düğmesi var, ancak her zaman Tor üzerinden çalışmıyor.
Bu mesajı tıkladığınızda alacaksınız:

```
Daha sonra tekrar deneyin
Bilgisayarınız veya ağınız otomatik sorgular gönderiyor olabilir.
Kullanıcılarımızı korumak için isteğinizi şu anda işleme koyamıyoruz.
Daha fazla ayrıntı için yardım sayfamızı ziyaret edin
```

</details>

---

<details>
<summary>beni tıkla

## Seçmen bastırma
</summary>


ABD eyaletlerindeki seçmenler, ikamet ettikleri eyaletteki devlet bakanı web sitesi üzerinden nihai olarak oy kullanmak için kaydolurlar.
Cumhuriyet kontrolündeki devlet sekreterlikleri, Cloudflare aracılığıyla devlet sekreterinin web sitesine vekalet vererek seçmenleri bastırmaya çalışıyor.
Cloudflare'nın Tor kullanıcılarına yönelik düşmanca muamelesi, merkezi bir küresel gözetim noktası olarak MITM konumu ve genel olarak zararlı rolü, olası seçmenleri kaydolmaya isteksiz kılıyor.
Özellikle liberaller mahremiyeti benimseme eğilimindedir.
Seçmen kayıt formları, bir seçmenin siyasi eğilimi, kişisel fiziksel adresi, sosyal güvenlik numarası ve doğum tarihi hakkında hassas bilgiler toplar.
Çoğu eyalet, bu bilgilerin yalnızca bir alt kümesini halka açık hale getirir, ancak Cloudflare, bir kişi oy vermek için kaydolduğunda tüm bu bilgileri görür.

Devlet veri girişi sekreteri personel çalışanları, verileri girmek için büyük olasılıkla Cloudflare web sitesini kullanacağından, kağıt kaydının Cloudflare'yi engellemediğini unutmayın.

| 🖼 | 🖼 |
| --- | --- |
| ![](../image/cfvotm_01.jpg) | ![](../image/cfvotm_02.jpg) |

- Change.org, oy toplamak ve harekete geçmek için ünlü bir web sitesidir.
“her yerdeki insanlar kampanyalar başlatıyor, destekçileri harekete geçiriyor ve çözümlere yön vermek için karar vericilerle çalışıyor.”
Ne yazık ki, Cloudflare'nin agresif filtresi nedeniyle birçok kişi change.org'u görüntüleyemiyor.
Dilekçeyi imzalamaları engelleniyor, böylece demokratik bir sürecin dışında kalıyorlar.
OpenPetition gibi diğer bulut içermeyen platformların kullanılması sorunun çözülmesine yardımcı olur.

| 🖼 | 🖼 |
| --- | --- |
| ![](../image/changeorgasn.jpg) | ![](../image/changeorgtor.jpg) |

- Cloudflare'nin "Atina Projesi", eyalet ve yerel seçim web sitelerine kurumsal düzeyde ücretsiz koruma sağlar.
"Seçmenleri seçim bilgilerine ve seçmen kayıtlarına erişebilir" dediler, ancak bu bir yalan çünkü birçok kişi siteye hiç göz atamıyor.

</details>

---

<details>
<summary>beni tıkla

## Kullanıcının tercihini görmezden gelmek
</summary>


Bir şeyi devre dışı bırakırsanız, bununla ilgili hiçbir e-posta almamayı beklersiniz.
Cloudflare, kullanıcının tercihini görmezden gelir ve verileri müşterinin izni olmadan üçüncü taraf şirketlerle paylaşır.
Ücretsiz planlarını kullanıyorsanız, bazen size aylık abonelik satın almanızı isteyen e-posta gönderirler.

![](../image/cfviopl_tp.jpg)

</details>

---

<details>
<summary>beni tıkla

## Kullanıcı verilerini silme konusunda yalan söylemek
</summary>


Bu eski cloudflare müşterisinin bloguna göre, Cloudflare hesapları silme konusunda yalan söylüyor.
Günümüzde birçok şirket, hesabınızı kapattıktan veya kaldırdıktan sonra verilerinizi saklamaktadır.
İyi şirketlerin çoğu gizlilik politikalarında bundan bahsediyor.
Cloudflare? Hayır.

```
2019-08-05 CloudFlare, hesabımı kaldırdıklarına dair bana onay gönderdi.
2019-10-02 CloudFlare'den "müşteri olduğum için" bir e-posta aldım
```

Cloudflare, "kaldır" kelimesini bilmiyordu.
Gerçekten kaldırılmışsa, bu eski müşteri neden bir e-posta aldı?
Ayrıca Cloudflare'nın gizlilik politikasının bundan bahsetmediğini de belirtti.

```
Yeni gizlilik politikaları, verilerin bir yıl boyunca saklanmasından bahsetmiyor.
```

![](../image/cfviopl_notdel.jpg)

Gizlilik politikaları bir YALAN ise Cloudflare'ye nasıl güvenebilirsiniz?

</details>

---

<details>
<summary>beni tıkla

## Kişisel bilgilerinizi saklayın
</summary>


Cloudflare hesabını silmek zor seviyededir.

```
"Hesap" kategorisini kullanarak bir destek bileti gönderin,
ve mesaj gövdesinde hesabın silinmesini talep edin.
Silme talebinde bulunmadan önce hesabınıza hiçbir etki alanı veya kredi kartı eklememelisiniz.
```

Bu onay e-postasını alacaksınız.

![](../image/cf_deleteandkeep.jpg)

"Silme talebinizi işleme koymaya başladık" ancak "Kişisel bilgilerinizi saklamaya devam edeceğiz".

Buna "güvenebilir misin"?

</details>

---

<details>
<summary>_klaku min_

## Mi nuligis abonon kaj ricevis tro multajn retpoŝtojn
</summary>


La uzanto nuligis sian 'Cloudflare stream' abonon kaj li ricevas retpoŝtajn memorigilojn ĉiutage por rememorigi lin pri nuligita abono.
Ne estas malaprobita butono. Kiel vi ĉesas ĉi tiun frenezon?

![](../image/barrageemailcancelsubscription.jpg)

Cloudflare diris al ĉi tiu uzanto kontakti subtenteamo kaj peti ĉiujn viajn enhavojn forigi.

- [t](https://web.archive.org/web/20210412165334/https://twitter.com/JohnHaldson/status/1381651569247088650)

</details>

---

## Aliaj informoj

- [Joseph Sullivan (Joe Sullivan)](../cloudflare_inc/cloudflare_members.md) ([Cloudflare CSO](https://twitter.com/eastdakota/status/1296522269313785862))
  - [Ex-Uber security head charged in connection with the cover-up of a 2016 hack that affected 57 million customers](https://www.businessinsider.com/uber-data-hack-security-head-joe-sullivan-charged-cover-up-2020-8)
  - [Former Chief Security Officer For Uber Charged With Obstruction Of Justice](https://www.justice.gov/usao-ndca/pr/former-chief-security-officer-uber-charged-obstruction-justice)


---

## Lütfen sonraki sayfaya devam edin:   [Cloudflare karşı direnmek için ne yapabilirsin?](tr.action.md)

![](../image/censor_cloudflare_blogcomment.jpg)
![](../image/freemoldybread.jpg)
![](../image/cfisnotanoption.jpg)
