// ==UserScript==
// @name Mark CloudFlare links
// @description Mark CloudFlare links
// @namespace deCloudflare_us_color-cf
// @author Matthew L. Tanner
// @match https://*/*
// @match http://*/*
// @version 1.0.0.1
// @grant none
// @run-at document-end
// @license MIT
// ==/UserScript==
// this script will not run on those sites
// e.g. ['www.youtube.com','www.google.com']
let DONT_RUN_FQDNS = [];
//-----
// [Documentation] https://0xacab.org/dCF/deCloudflare/-/blob/master/tool/userscripts/README.md
// [About API] http://about-karmaapi.go.crimeflare.eu.org
const api_url = 'https://karma.crimeflare.eu.org/api/is/cloudflare/';
let fqdns = {},
   fqdn_self = location.hostname;
function mark_fqdn(fl) {
   try {
      if (fl == '') {
         return;
      }
      fetch(api_url, {
         method: 'POST',
         mode: 'cors',
         body: 'ff=' + fl,
         referrer: '',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         }
      }).then(x => x.json()).then(x => {
         for (let xx in x) {
            if (fqdns[xx]) {
               if (x[xx]) {
                  fqdns[xx].forEach(qs => {
                     qs.setAttribute('xcf', 'y');
                  });
               } else {
                  fqdns[xx].forEach(qs => {
                     qs.setAttribute('xcf', 'n');
                  });
               }
               delete fqdns[xx];
            }
         }
      }).catch(x => {});
   } catch (x) {}
}
if (!DONT_RUN_FQDNS.includes(fqdn_self) && !/\.crimeflare\.eu\.org$/.test(fqdn_self)) {
   try {
      const style = document.createElement('style');
      document.head.appendChild(style);
      const styleSheet = style.sheet;
      styleSheet.insertRule("a[xcf='y']{background:#f9ab1d;opacity:0.6}", 0);
   } catch (x) {}
   document.querySelectorAll('a[href]:not([xcf])').forEach(l => {
      try {
         let u = new URL(l.href);
         if (u.hostname != fqdn_self && (u.protocol == 'https:' || u.protocol == 'http:')) {
            let fqdn = u.hostname;
            if (fqdns[fqdn] == undefined) {
               fqdns[fqdn] = [];
            }
            fqdns[fqdn].push(l);
            l.setAttribute('xcf', 'q');
         }
      } catch (x) {}
   });
   mark_fqdn(Object.keys(fqdns).join(','));
}