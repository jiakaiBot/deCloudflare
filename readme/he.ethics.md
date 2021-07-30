<div dir="rtl">

# בעיות אתיות

![](../image/itsreallythatbad.jpg)
![](../image/telegram/c81238387627b4bfd3dcd60f56d41626.jpg)

"אל תתמוך בחברה זו שהיא בטלה באתיקה"

"החברה שלך לא אמינה. אתה טוען לאכוף DMCA אך יש לך תביעות רבות על כך שלא עשית זאת."

"הם מצנזרים רק את מי שמטיל ספק באתיקה שלהם."

"אני מניח שהאמת לא נוחה ומסתירה טוב יותר מהצפייה הציבורית."  -- [phyzonloop](https://twitter.com/phyzonloop)


---


<details>
<summary>לחץ עלי

## CloudFlare דואר זבל אנשים
</summary>


Cloudflare שולח דוא"ל ספאם למשתמשים שאינם Cloudflare.

- שלח דוא"ל רק למנויים שהצטרפו
- כאשר המשתמש אומר "עצור", הפסיק לשלוח דוא"ל

זה כזה פשוט. אבל לענן זה לא אכפת.
Cloudflare מסר כי השימוש בשירותם יכול לעצור את כל הדוארסים והתוקפים.
כיצד נוכל לעצור את Cloudflare מבלי להפעיל את Cloudflare?


| 🖼 | 🖼 |
| --- | --- |
| ![](../image/cfspam01.jpg) | ![](../image/cfspam03.jpg) |
| ![](../image/cfspam02.jpg) | ![](../image/cfspambrittany.jpg)<br>![](../image/cfspamtwtr.jpg) |

</details>

---

<details>
<summary>לחץ עלי

## הסר את ביקורת המשתמש
</summary>


מצנזר ביקורות שליליות בענן.
אם אתה מפרסם טקסט נגד Cloudflare בטוויטר, יש לך סיכוי לקבל תשובה מעובד Cloudflare בהודעה "לא, זה לא".
אם אתה מפרסם ביקורת שלילית באתר ביקורת כלשהו, ​​הם ינסו לצנזר אותו.


| 🖼 | 🖼 |
| --- | --- |
| ![](../image/cfcenrev_01.jpg)<br>![](../image/cfcenrev_02.jpg) | ![](../image/cfcenrev_03.jpg) |

</details>

---

<details>
<summary>לחץ עלי

## שתף את המידע הפרטי של המשתמש
</summary>


ב- Cloudflare יש בעיית הטרדה מסיבית.
Cloudflare משתף מידע אישי של מי שמתלונן על אתרים מתארחים.
לפעמים הם מבקשים ממך לספק את תעודת הזהות האמיתית שלך.
אם אינך רוצה להתנכל, להתנפל עליו, להחליף או להרוג, מוטב שתתרחק מאתרי Cloudflared.


| 🖼 | 🖼 |
| --- | --- |
| ![](../image/cfdox_what.jpg) | ![](../image/cfdox_swat.jpg) |
| ![](../image/cfdox_kill.jpg) | ![](../image/cfdox_threat.jpg) |
| ![](../image/cfdox_dox.jpg) | ![](../image/cfdox_ex1.jpg) |
| ![](../image/cfabuseform.jpg) | ![](../image/cfdox_ex2.jpg) |

</details>

---

<details>
<summary>לחץ עלי

## שידול ארגוני לתרומות לצדקה
</summary>


CloudFlare מבקש תרומות לצדקה.
זה די מחריד שתאגיד אמריקני יבקש צדקה לצד עמותות שיש להם מטרות טובות.
אם אתה אוהב לחסום אנשים או לבזבז זמן של אנשים אחרים, אולי תרצה להזמין כמה פיצות לעובדי Cloudflare.


![](../image/cfdonate.jpg)

</details>

---

<details>
<summary>לחץ עלי

## סיום אתרים
</summary>


מה תעשה אם האתר שלך יירד פתאום?
יש דיווחים כי Cloudflare מוחק את תצורת המשתמש או מפסיק את השירות ללא כל אזהרה, בשקט.
אנו מציעים לך למצוא ספק טוב יותר.

![](../image/cftmnt.jpg)

</details>

---

<details>
<summary>לחץ עלי

## אפליה של ספק הדפדפן
</summary>


CloudFlare מעניקה יחס מועדף לאלה המשתמשים בפיירפוקס תוך מתן יחס עוין למשתמשים שאינם טור-דפדפן על פני טור.
משתמשי טור אשר מסרבים בצדק לבצע ג'אווה סקריפט ללא חינם זוכים גם הם לטיפול עוין.
אי-שוויון גישה זה הוא ניצול לרעה של ניטרליות ברשת וניצול לרעה של כוח.

![](../image/browdifftbcx.gif)

- משמאל: דפדפן טור, מימין: כרום. אותה כתובת IP.

![](../image/browserdiff.jpg)

- משמאל: דפדפן Javascript של דפדפן Tor מושבת, קובץ Cookie מופעל
- מימין: JavaScript Javascript מופעל, Cookie מושבת

![](../image/cfsiryoublocked.jpg)

- QuteBrowser (דפדפן מינורי) ללא Tor (IP של Clearnet)

| ***דפדפן*** | ***גישה לטיפול*** |
| --- | --- |
| Tor Browser (Javascript מופעל) | גישה מותרת |
| Firefox (Javascript מופעל) | גישה מושפלת |
| Chromium (Javascript מופעל) | גישה מושפלת |
| Chromium or Firefox (Javascript מושבת) | גישה נדחתה |
| Chromium or Firefox (העוגיה הושבתה) | גישה נדחתה |
| QuteBrowser | גישה נדחתה |
| lynx | גישה נדחתה |
| w3m | גישה נדחתה |
| wget | גישה נדחתה |


מדוע לא להשתמש בכפתור שמע כדי לפתור אתגר קל?

כן, יש כפתור שמע, אבל זה תמיד לא עובד מעל טור.
תקבל הודעה זו כשתלחץ עליה:

```
נסה שוב מאוחר יותר
ייתכן שהמחשב או הרשת שלך שולחים שאילתות אוטומטיות.
כדי להגן על המשתמשים שלנו, איננו יכולים לעבד את בקשתך ברגע זה.
לפרטים נוספים בקר בדף העזרה שלנו
```

</details>

---

<details>
<summary>לחץ עלי

## דיכוי בוחרים
</summary>


מצביעים במדינות ארה"ב נרשמים להצביע בסופו של דבר דרך אתר מזכיר המדינה במדינת מגוריהם.
משרדי מזכירות המדינה הנשלטים על ידי הרפובליקנים עוסקים בדיכוי המצביעים על ידי הקרנת אתר מזכיר המדינה באמצעות Cloudflare.
הטיפול העוין של Cloudflare במשתמשי טור, עמדת ה- MITM שלה כנקודת מעקב עולמית ריכוזית, ותפקידה המזיק בכללותו גורם לבוחרים פוטנציאליים להימנע מלהירשם.
ליברלים בפרט נוטים לאמץ פרטיות.
טפסי הרשמה של בוחרים אוספים מידע רגיש אודות נטייתו הפוליטית של הבוחר, כתובת פיזית אישית, מספר תעודת זהות ותאריך לידה.
מרבית המדינות רק מייצגות תת-קבוצה של מידע זה באופן ציבורי, אך Cloudflare רואה את כל המידע הזה כאשר מישהו נרשם להצביע.

שים לב כי רישום הנייר אינו עוקף את Cloudflare מכיוון שמזכיר עובדי עובדי הזנת נתוני המדינה ככל הנראה ישתמש באתר Cloudflare בכדי להזין את הנתונים.

| 🖼 | 🖼 |
| --- | --- |
| ![](../image/cfvotm_01.jpg) | ![](../image/cfvotm_02.jpg) |

- Change.org הוא אתר מפורסם לאיסוף קולות ולנקיטת פעולות.
“אנשים בכל מקום פותחים בקמפיינים, מגייסים תומכים ופועלים עם מקבלי החלטות כדי להניע פתרונות.”
לרוע המזל, אנשים רבים אינם יכולים לצפות ב-.org בכלל בגלל המסנן האגרסיבי של Cloudflare.
הם נחסמים מלחתום על העצומה, ובכך להוציא אותם מהליך דמוקרטי.
שימוש בפלטפורמה אחרת שאינה מעורפלת בענן, כגון OpenPetition, עוזר לתקן את הבעיה.

| 🖼 | 🖼 |
| --- | --- |
| ![](../image/changeorgasn.jpg) | ![](../image/changeorgtor.jpg) |

- "הפרויקט האתונאי" של Cloudflare מציע הגנה חופשית ברמת הארגון לאתרי בחירות ממלכתיים ומקומיים.
הם אמרו כי "בוחריהם יכולים לגשת למידע על בחירות ורישום בוחרים", אך זהו שקר מכיוון שאנשים רבים אינם יכולים כלל לגלוש באתר.

</details>

---

<details>
<summary>לחץ עלי

## התעלמות מהעדפת המשתמש
</summary>


אם תבטל את הסכמתך למשהו, אתה מצפה שלא תקבל שום דוא"ל לגביו.
Cloudflare מתעלמים מהעדפת המשתמש ומשתפים נתונים עם חברות צד ג 'ללא הסכמת הלקוח.
אם אתה משתמש בתוכנית החינמית שלהם, לפעמים הם שולחים אליך דוא"ל ומבקשים לקנות מנוי חודשי.

![](../image/cfviopl_tp.jpg)

</details>

---

<details>
<summary>לחץ עלי

## שקר לגבי מחיקת נתוני המשתמש
</summary>


על פי הבלוג של הלקוח לשעבר ב- Cloudflare, Cloudflare משקרת על מחיקת חשבונות.
בימינו חברות רבות שומרות את הנתונים שלך לאחר שסגרת או הסרת את חשבונך.
רוב החברות הטובות אכן מזכירות זאת במדיניות הפרטיות שלהן.
פרפר ענן? לא.

```
2019-08-05 CloudFlare שלחה לי אישור שהסירו את חשבוני.
2019-10-02 קיבלתי דוא"ל מ- CloudFlare "כי אני לקוח"
```

Cloudflare לא ידע על המילה "הסר".
אם זה באמת מוסר, מדוע לקוח לשעבר זה קיבל דוא"ל?
הוא ציין כי מדיניות הפרטיות של Cloudflare אינה מציינת זאת.

```
מדיניות הפרטיות החדשה שלהם לא מזכירה שמירה על נתונים במשך שנה.
```

![](../image/cfviopl_notdel.jpg)

איך אתה יכול לסמוך על Cloudflare אם מדיניות הפרטיות שלהם היא LIE?

</details>

---

<details>
<summary>לחץ עלי

## שמור את המידע האישי שלך
</summary>


מחיקת חשבון Cloudflare היא ברמה קשה.

```
הגיש כרטיס תמיכה באמצעות הקטגוריה "חשבון",
ולבקש מחיקת חשבון בגוף ההודעות.
אסור שיהיו לך תחומים או כרטיסי אשראי מחוברים לחשבונך לפני שתבקש למחוק.
```

תקבל דוא"ל אישור זה.

![](../image/cf_deleteandkeep.jpg)

"התחלנו לעבד את בקשת המחיקה שלך" אך "נמשיך לאחסן את המידע האישי שלך".

האם אתה יכול "לסמוך" על זה?

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

## המשך לדף הבא:   [Kion vi povas fari por rezisti kontraŭ Cloudflare?](he.action.md)

|  🖼  |  🖼 |
| --- | --- |
| ![](../image/cfcommunity_ban.jpg) | ![](../image/censor_cloudflare_blogcomment.jpg) |

![](../image/freemoldybread.jpg)
![](../image/cfisnotanoption.jpg)

</div>