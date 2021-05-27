# Ētikas jautājumi

![](../image/itsreallythatbad.jpg)
![](../image/telegram/c81238387627b4bfd3dcd60f56d41626.jpg)

"Neatbalstiet šo uzņēmumu, kas ir ētikas pārkāpums"

"Jūsu uzņēmums nav uzticams. Jūs apgalvojat, ka izpildāt Digitālās tūkstošgades autortiesību likumu, taču jums ir daudz tiesas procesu, ja to nedarāt."

"Viņi cenzē tikai tos, kas apšauba viņu ētiku."

"Es domāju, ka patiesība ir neērta un labāk slēpta no sabiedrības viedokļa."  -- [phyzonloop](https://twitter.com/phyzonloop)


---


<details>
<summary>noklikšķiniet uz manis

## CloudFlare surogātpastu cilvēkiem
</summary>


Cloudflare sūta surogātpasta e-pastus lietotājiem, kuri nav Cloudflare.

- Sūtiet e-pastus tikai tiem abonentiem, kuri ir izvēlējušies
- Kad lietotājs saka "apstāties", pēc tam pārtrauciet e-pasta sūtīšanu

Tas ir tik vienkārši. Bet Cloudflare ir vienalga.
Cloudflare teica, ka, izmantojot viņu pakalpojumu, var apturēt visus surogātpasta izplatītājus vai uzbrucējus.
Kā mēs varam apturēt Cloudflare, neaktivizējot Cloudflare?


| 🖼 | 🖼 |
| --- | --- |
| ![](../image/cfspam01.jpg) | ![](../image/cfspam03.jpg) |
| ![](../image/cfspam02.jpg) | ![](../image/cfspambrittany.jpg)<br>![](../image/cfspamtwtr.jpg) |

</details>

---

<details>
<summary>noklikšķiniet uz manis

## Noņemt lietotāja atsauksmi
</summary>


Cloudflare cenzora negatīvās atsauksmes.
Ja Twitter vietnē publicējat pretmākoņainu tekstu, jums ir iespēja saņemt Cloudflare darbinieka atbildi ar ziņojumu "Nē, tas nav".
Ja kādā atsauksmju vietnē ievietojat negatīvu atsauksmi, viņi mēģinās to cenzēt.


| 🖼 | 🖼 |
| --- | --- |
| ![](../image/cfcenrev_01.jpg)<br>![](../image/cfcenrev_02.jpg) | ![](../image/cfcenrev_03.jpg) |

</details>

---

<details>
<summary>noklikšķiniet uz manis

## Dalieties ar lietotāja privāto informāciju
</summary>


Cloudflare ir liela uzmākšanās problēma.
Cloudflare dalās ar to personu personisko informāciju, kas sūdzas par mitinātajām vietnēm.
Dažreiz viņi lūdz jūs norādīt savu patieso personu apliecinošu dokumentu.
Ja jūs nevēlaties, lai jūs uzmāktos, uzbruktu, sagrābtu vai nogalinātu, labāk turieties prom no Cloudflared vietnēm.


| 🖼 | 🖼 |
| --- | --- |
| ![](../image/cfdox_what.jpg) | ![](../image/cfdox_swat.jpg) |
| ![](../image/cfdox_kill.jpg) | ![](../image/cfdox_threat.jpg) |
| ![](../image/cfdox_dox.jpg) | ![](../image/cfdox_ex1.jpg) |
| ![](../image/cfabuseform.jpg) | ![](../image/cfdox_ex2.jpg) |

</details>

---

<details>
<summary>noklikšķiniet uz manis

## Korporatīvie labdarības ieguldījumi
</summary>


CloudFlare lūdz labdarības ieguldījumus.
Ir diezgan šausmīgi, ka Amerikas korporācija lūdz labdarību līdzās bezpeļņas organizācijām, kurām ir labi iemesli.
Ja jums patīk bloķēt cilvēkus vai tērēt citu cilvēku laiku, iespējams, vēlēsities pasūtīt dažas picas Cloudflare darbiniekiem.


![](../image/cfdonate.jpg)

</details>

---

<details>
<summary>noklikšķiniet uz manis

## Vietņu izbeigšana
</summary>


Ko jūs darīsit, ja jūsu vietne pēkšņi samazināsies?
Ir ziņas, ka Cloudflare bez jebkāda brīdinājuma dzēš lietotāja konfigurāciju vai pārtrauc pakalpojumu.
Mēs iesakām atrast labāku pakalpojumu sniedzēju.

![](../image/cftmnt.jpg)

</details>

---

<details>
<summary>noklikšķiniet uz manis

## Pārlūkprogrammu pārdevēju diskriminācija
</summary>


CloudFlare dod priekšroku tiem, kas izmanto Firefox, vienlaikus naidīgi izturoties pret Tor-Browser lietotājiem, kas nav Tor.
Arī Tor lietotāji, kuri pamatoti atsakās no bezmaksas Javascript izpildes, izturas pret naidīgi.
Šī piekļuves nevienlīdzība ir tīkla neitralitātes un varas ļaunprātīga izmantošana.

![](../image/browdifftbcx.gif)

- Kreisais: Tor pārlūks, labais: Chrome. Tā pati IP adrese.

![](../image/browserdiff.jpg)

- Kreisais: Tor pārlūka Javascript ir atspējots, sīkfails iespējots
- Labajā pusē: iespējots Chrome Javascript, atspējots sīkfails

![](../image/cfsiryoublocked.jpg)

- QuteBrowser (neliela pārlūkprogramma) bez Tor (Clearnet IP)

![](../image/lynx_cloudflare.gif)

- Lynx


| ***Pārlūkprogramma*** | ***Piekļuve ārstēšanai*** |
| --- | --- |
| Tor Browser (Javascript ir iespējots) | atļauta piekļuve |
| Firefox (Javascript ir iespējots) | piekļuve degradēta |
| Chromium (Javascript ir iespējots) | piekļuve degradēta |
| Chromium or Firefox (Javascript ir atspējots) | pieeja noliegta |
| Chromium or Firefox (Sīkdatne ir atspējota) | pieeja noliegta |
| QuteBrowser | pieeja noliegta |
| lynx | pieeja noliegta |
| w3m | pieeja noliegta |
| wget | pieeja noliegta |


Kāpēc neizmantot pogu Audio, lai atrisinātu vieglu izaicinājumu?

Jā, ir audio poga, taču tā vienmēr nedarbojas pār Tor.
Jūs saņemsit šo ziņojumu, noklikšķinot uz tā:

```
Pamēģini vēlreiz vēlāk
Iespējams, ka jūsu dators vai tīkls sūta automatizētus vaicājumus.
Lai aizsargātu mūsu lietotājus, mēs pašlaik nevaram apstrādāt jūsu pieprasījumu.
Lai iegūtu sīkāku informāciju, apmeklējiet mūsu palīdzības lapu
```

</details>

---

<details>
<summary>noklikšķiniet uz manis

## Vēlētāju apspiešana
</summary>


Vēlētāji ASV štatos reģistrējas balsošanai galu galā ar valsts sekretāra vietni viņu dzīvesvietas štatā.
Republikāņu kontrolētie valsts sekretariāti iesaistās vēlētāju apspiešanā, izmantojot Cloudflare starpniecību valsts sekretāra vietni.
Cloudflare naidīgā attieksme pret Tor lietotājiem, tā MITM pozīcija kā centralizēts globālais uzraudzības punkts un tā kaitīgā loma kopumā potenciālajiem vēlētājiem rada nevēlēšanos reģistrēties.
Īpaši liberāļi mēdz uztvert privātumu.
Vēlētāju reģistrācijas veidlapās tiek apkopota sensitīva informācija par vēlētāja politisko noslieci, personas fizisko adresi, sociālās apdrošināšanas numuru un dzimšanas datumu.
Lielākā daļa štatu padara publiski pieejamu tikai šīs informācijas apakškopu, bet Cloudflare redz visu šo informāciju, kad kāds reģistrējas balsot.

Ņemiet vērā, ka reģistrācija papīra formā neapiet Cloudflare, jo valsts datu ievades darbinieku sekretārs, iespējams, izmantos Cloudflare vietni, lai ievadītu datus.

| 🖼 | 🖼 |
| --- | --- |
| ![](../image/cfvotm_01.jpg) | ![](../image/cfvotm_02.jpg) |

- Change.org ir slavena vietne, kur apkopot balsis un rīkoties.
“cilvēki visur sāk kampaņas, mobilizē atbalstītājus un strādā ar lēmumu pieņēmējiem, lai virzītu risinājumus.”
Diemžēl daudzi cilvēki nemaz nevar skatīt change.org, pateicoties Cloudflare agresīvajam filtram.
Viņiem tiek bloķēta petīcijas parakstīšana, tādējādi izslēdzot viņus no demokrātiska procesa.
Citas bezmākoņainas platformas, piemēram, OpenPetition, izmantošana palīdz novērst problēmu.

| 🖼 | 🖼 |
| --- | --- |
| ![](../image/changeorgasn.jpg) | ![](../image/changeorgtor.jpg) |

- Cloudflare "Atēnu projekts" piedāvā bezmaksas uzņēmuma līmeņa aizsardzību valsts un vietējo vēlēšanu vietnēm.
Viņi teica, ka "viņu vēlētāji var piekļūt vēlēšanu informācijai un vēlētāju reģistrācijai", taču tie ir meli, jo daudzi cilvēki vienkārši nemaz nevar pārlūkot vietni.

</details>

---

<details>
<summary>noklikšķiniet uz manis

## Ignorējot lietotāja izvēli
</summary>


Ja atteiksieties no kaut kā, jūs domājat, ka nesaņemsit par to e-pastu.
Cloudflare ignorē lietotāja izvēli un koplieto datus ar trešo pušu korporācijām bez klienta piekrišanas.
Ja izmantojat viņu bezmaksas plānu, viņi dažreiz nosūta jums e-pastu ar lūgumu iegādāties ikmēneša abonementu.

![](../image/cfviopl_tp.jpg)

</details>

---

<details>
<summary>noklikšķiniet uz manis

## Meli par lietotāja datu dzēšanu
</summary>


Saskaņā ar šī bijušā cloudflare klienta emuāru, Cloudflare melo par kontu dzēšanu.
Mūsdienās daudzi uzņēmumi saglabā jūsu datus pēc konta slēgšanas vai noņemšanas.
Lielākā daļa labu uzņēmumu par to savā privātuma politikā piemin.
Mākoņainība? Nē.

```
2019-08-05 CloudFlare man nosūtīja apstiprinājumu, ka viņi ir noņēmuši manu kontu.
2019-10-02 Es saņēmu e-pasta ziņojumu no CloudFlare "tāpēc, ka esmu klients"
```

Cloudflare nezināja par vārdu "noņemt".
Ja tas tiešām tiek noņemts, kāpēc šis bijušais klients saņēma e-pastu?
Viņš arī minēja, ka Cloudflare privātuma politikā par to nav minēts.

```
Viņu jaunajā konfidencialitātes politikā nav pieminēts datu saglabāšana gadu.
```

![](../image/cfviopl_notdel.jpg)

Kā jūs varat uzticēties Cloudflare, ja viņu privātuma politika ir MELS?

- [Pagāja vairāk nekā gads, kopš es atcēlu savu Cloudflare kontu](https://shkspr.mobi/blog/2020/09/dont-trust-cloudflare-with-your-personal-data/)

</details>

---

<details>
<summary>noklikšķiniet uz manis

## Saglabājiet savu personisko informāciju
</summary>


Cloudflare konta dzēšana ir sarežģīta.

```
Iesniedziet atbalsta biļeti, izmantojot kategoriju "Konts",
un pieprasīt konta dzēšanu ziņojuma pamattekstā.
Pirms dzēšanas pieprasīšanas kontam nedrīkst būt pievienots neviens domēns vai kredītkarte.
```

Jūs saņemsiet šo apstiprinājuma e-pastu.

![](../image/cf_deleteandkeep.jpg)

"Mēs sākām apstrādāt jūsu dzēšanas pieprasījumu", bet "Mēs turpināsim glabāt jūsu personisko informāciju".

Vai jūs varat tam "uzticēties"?


- Kā atcelt savu Cloudflare kontu

1. Piesakieties savā Cloudflare informācijas panelī.
2. Izdzēsiet visas zonas (domēnus) no informācijas paneļa.
3. Noklikšķiniet uz atbalsta saites.
4. Nosūtiet jaunu biļeti. Pastāstiet viņiem, ka vēlaties slēgt savu kontu.
5. Pagaidiet vairākas dienas.
6. Cloudflare darbinieki lūgs jūsu apstiprinājumu un iemeslu, kāpēc esat nolēmis pamest Cloudflare.
7. Nosūtiet atbildi vēlreiz.
8. Pagaidiet vairākas dienas.
9. Jūs saņemsit ziņojumu: mēs esam veiksmīgi izdzēsuši jūsu kontu


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

## Cita informācija

- [Joseph Sullivan (Joe Sullivan)](../cloudflare_inc/cloudflare_members.md) ([Cloudflare CSO](https://twitter.com/eastdakota/status/1296522269313785862))
  - [Ex-Uber security head charged in connection with the cover-up of a 2016 hack that affected 57 million customers](https://www.businessinsider.com/uber-data-hack-security-head-joe-sullivan-charged-cover-up-2020-8)
  - [Former Chief Security Officer For Uber Charged With Obstruction Of Justice](https://www.justice.gov/usao-ndca/pr/former-chief-security-officer-uber-charged-obstruction-justice)


---


## Lūdzu, pārejiet uz nākamo lapu:   [Kion vi povas fari por rezisti kontraŭ Cloudflare?](lv.action.md)

![](../image/freemoldybread.jpg)
![](../image/cfisnotanoption.jpg)
