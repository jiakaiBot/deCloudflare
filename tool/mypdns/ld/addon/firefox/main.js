let timr, memcache = {},
   forcePurge = false,
   apiHost = ['https://karma.crimeflare.eu.org:1984', 'http://karma.im5wixghmfmt7gf7wb4xrgdm6byx2gj26zn47da6nwo7xvybgxnqryid.onion'],
   apiBase = apiHost[0];
function get_matrix_cat(domain) {
   if (memcache[domain]) {
      return new Promise((g, b) => {
         g(memcache[domain]);
      });
   }
   return new Promise((g, b) => {
      browser.storage.local.get([domain]).then(c => {
         if (c[domain]) {
            memcache[domain] = c[domain];
            g(memcache[domain]);
         } else {
            fetch(apiBase + '/api/mypdns/cat/', {
               method: 'POST',
               mode: 'cors',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
               },
               body: 'f=' + domain
            }).then(r => r.json()).then(r => {
               if (r && r.length == 2) {
                  let m = {
                     'cat': r[0],
                     'labels': r[1]
                  };
                  browser.storage.local.set({
                     [domain]: m
                  });
                  memcache[domain] = m;
                  if (Object.keys(memcache).length > 1200) {
                     memcache = {};
                  }
                  g(m);
               } else {
                  b();
               }
            }).catch(b);
         }
      });
   });
}
function forget_cache(x) {
   if (x) {
      browser.storage.local.get(['opt00', 'opt01', 'opt02', 'opt03', 'opt04', 'lastU', 'lastV']).then(g => {
         browser.storage.local.clear();
         memcache = {};
         browser.storage.local.set({
            'opt00': (g.opt00 == 'y' ? 'y' : 'n')
         });
         browser.storage.local.set({
            'opt01': (g.opt01 == 'y' ? 'y' : 'n')
         });
         browser.storage.local.set({
            'opt02': (g.opt02 == 'y' ? 'y' : 'n')
         });
         browser.storage.local.set({
            'opt03': (g.opt03 == 'y' ? 'y' : 'n')
         });
         browser.storage.local.set({
            'opt04': (g.opt04 == 'y' ? 'y' : 'n')
         });
         browser.storage.local.set({
            'lastU': Math.round((new Date()).getTime() / 1000)
         });
         browser.storage.local.set({
            'lastV': (browser.runtime.getManifest()).version
         });
      });
   }
   clearTimeout(timr);
   timr = setTimeout(function () {
      forget_cache(true);
   }, 1814400000);
}
browser.storage.local.get(['lastU', 'lastV', 'opt04']).then(g => {
   if (g.lastU == undefined || Math.abs(Math.round((new Date()).getTime() / 1000) - g.lastU) > 1814400 || g.lastV != (browser.runtime.getManifest()).version || forcePurge) {
      forget_cache(true);
   } else {
      forget_cache(false);
   }
   if (g.opt04 == 'y') {
      apiBase = apiHost[1];
   }
});
browser.runtime.onMessage.addListener((requests, sender, sendResponse) => {
   if (requests) {
      if (requests === 'clear') {
         forget_cache(true);
         return;
      }
      if (requests == 'abase-y') {
         apiBase = apiHost[1];
         return;
      }
      if (requests == 'abase-n') {
         apiBase = apiHost[0];
         return;
      }
      requests.forEach(request => {
         get_matrix_cat(request).then((r) => {
            browser.tabs.sendMessage(sender.tab.id, [request, r]);
         }, () => {});
      });
   }
   return;
});
browser.runtime.onInstalled.addListener(g => {
   if (g.reason == 'install') {
      browser.runtime.openOptionsPage();
   }
});