const api_url = 'https://karma.crimeflare.eu.org/api/is/cloudflare/';
let fqdns = {},
   fqdn_self = location.hostname;
try {
   const style = document.createElement('style');
   document.head.appendChild(style);
   const styleSheet = style.sheet;
   styleSheet.insertRule("a[xcf='y']{background:#f9ab1d;filter:blur(1px)}", 0);
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
mark_fqdn(Object.keys(fqdns).join(','));