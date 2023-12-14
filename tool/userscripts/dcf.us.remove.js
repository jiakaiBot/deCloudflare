// ==UserScript==
// @name Remove CloudFlare links
// @author Matthew L. Tanner
// @match https://*/*
// @version 1.0.0.0
// @grant none
// @run-at document-end
// ==/UserScript==
// this script will not run on those sites
// e.g. ['www.youtube.com','www.google.com']
let DONT_RUN_FQDNS = [];
//-----
(function () {
   let lh = location.hostname;
   if (DONT_RUN_FQDNS.includes(lh) || /\.crimeflare\.eu\.org$/.test(lh)) {
      return;
   }
   let script = document.createElement('script');
   script.src = 'https://karma.crimeflare.eu.org/api/is/cloudflare/script/?type=remove';
   document.head.appendChild(script);
})();