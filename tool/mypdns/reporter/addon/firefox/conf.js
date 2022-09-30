document.addEventListener('DOMContentLoaded', () => {
   browser.storage.local.get().then(r => {
      document.getElementById('token').value = r.token || '';
      document.getElementById('top1').checked = (r.top1 == '1') ? true : false;
      document.getElementById('top2').checked = (r.top2 == '1') ? true : false;
      document.getElementById('top3').checked = (r.top3 == '1') ? true : false;
      document.getElementById('top4').checked = (r.top4 == '1') ? true : false;
      document.getElementById('top5').checked = (r.top5 == '1') ? true : false;
      document.getElementById('top6').checked = (r.top6 == '1') ? true : false;
      document.getElementById('top7').checked = (r.top7 == '1') ? true : false;
      document.getElementById('top8').checked = (r.top8 == '1') ? true : false;
      document.getElementById('topWP1').checked = (r.topWP1 == '1') ? true : false;
      document.getElementById('topWP2').checked = (r.topWP2 == '1') ? true : false;
      document.getElementById('topWP3').checked = (r.topWP3 == '1') ? true : false;
      document.getElementById('topWP4').checked = (r.topWP4 == '1') ? true : false;
      document.getElementById('topWP5').checked = (r.topWP5 == '1') ? true : false;
      document.getElementById('topWP6').checked = (r.topWP6 == '1') ? true : false;
      document.getElementById('topWP7').checked = (r.topWP7 == '1') ? true : false;
      document.getElementById('nocat01').checked = (r.nocat01 == '1') ? true : false;
      document.getElementById('nocat02').checked = (r.nocat02 == '1') ? true : false;
      document.getElementById('nocat03').checked = (r.nocat03 == '1') ? true : false;
      document.getElementById('nocat04').checked = (r.nocat04 == '1') ? true : false;
      document.getElementById('nocat05').checked = (r.nocat05 == '1') ? true : false;
      document.getElementById('nocat06').checked = (r.nocat06 == '1') ? true : false;
      document.getElementById('nocat07').checked = (r.nocat07 == '1') ? true : false;
      document.getElementById('nocat08').checked = (r.nocat08 == '1') ? true : false;
      document.getElementById('nocat09').checked = (r.nocat09 == '1') ? true : false;
      document.getElementById('nocat10').checked = (r.nocat10 == '1') ? true : false;
      document.getElementById('nocat11').checked = (r.nocat11 == '1') ? true : false;
      document.getElementById('nocat12').checked = (r.nocat12 == '1') ? true : false;
      document.getElementById('nocat13').checked = (r.nocat13 == '1') ? true : false;
      document.getElementById('nocat14').checked = (r.nocat14 == '1') ? true : false;
      document.getElementById('nocat15').checked = (r.nocat15 == '1') ? true : false;
      document.getElementById('nocat16').checked = (r.nocat16 == '1') ? true : false;
      document.getElementById('nocat17').checked = (r.nocat17 == '1') ? true : false;
      document.getElementById('nocat18').checked = (r.nocat18 == '1') ? true : false;
      document.getElementById('nocat19').checked = (r.nocat19 == '1') ? true : false;
      document.getElementById('nocat20').checked = (r.nocat20 == '1') ? true : false;
      document.getElementById('nocat21').checked = (r.nocat21 == '1') ? true : false;
      document.getElementById('nocat22').checked = (r.nocat22 == '1') ? true : false;
      document.getElementById('nocat86').checked = (r.nocat86 == '1') ? true : false;
      document.getElementById('nocat87').checked = (r.nocat87 == '1') ? true : false;
      document.getElementById('nocat88').checked = (r.nocat88 == '1') ? true : false;
      document.getElementById('nocat89').checked = (r.nocat89 == '1') ? true : false;
      document.getElementById('nocat90').checked = (r.nocat90 == '1') ? true : false;
      document.getElementById('nocat91').checked = (r.nocat91 == '1') ? true : false;
      document.getElementById('nocat92').checked = (r.nocat92 == '1') ? true : false;
      document.getElementById('nocat93').checked = (r.nocat93 == '1') ? true : false;
      document.getElementById('nocat94').checked = (r.nocat94 == '1') ? true : false;
      document.getElementById('nocat95').checked = (r.nocat95 == '1') ? true : false;
      if (r.nocat95 != '1') {
         document.getElementById('aboutPOP').style.display = 'none';
         document.getElementById('aboutSID').style.display = 'inline';
      } else {
         document.getElementById('aboutPOP').style.display = 'inline';
         document.getElementById('aboutSID').style.display = 'none';
      }
      document.getElementById('nocat96').checked = (r.nocat96 == '1') ? true : false;
      if (r.nocat96 == '1') {
         document.getElementById('aboutRCM').style.display = 'none';
      }
      document.getElementById('nocat97').checked = (r.nocat97 == '1') ? true : false;
      document.getElementById('nocat98').checked = (r.nocat98 == '1') ? true : false;
      document.getElementById('nocat99').checked = (r.nocat99 == '1') ? true : false;
   });
});
document.querySelectorAll("input[type=checkbox][id^='top']").forEach(x => {
   x.addEventListener('click', t => {
      let v = t.target.checked ? '1' : '0';
      browser.storage.local.set({
         [t.target.id]: v
      });
      browser.runtime.sendMessage([t.target.id, v]).then(() => {}, () => {});
   });
});
document.querySelectorAll("input[type=checkbox][id^='nocat']").forEach(x => {
   x.addEventListener('click', t => {
      browser.storage.local.set({
         [t.target.id]: (t.target.checked ? '1' : '0')
      });
      browser.runtime.sendMessage(['menu']).then(() => {}, () => {});
      if (t.target.id == 'nocat95') {
         if (t.target.checked) {
            document.getElementById('aboutPOP').style.display = 'inline';
            document.getElementById('aboutSID').style.display = 'none';
         } else {
            document.getElementById('aboutPOP').style.display = 'none';
            document.getElementById('aboutSID').style.display = 'inline';
         }
      }
      if (t.target.id == 'nocat96') {
         document.getElementById('aboutRCM').style.display = t.target.checked ? 'none' : 'inline';
      }
   });
});
document.getElementById('set').addEventListener('click', () => {
   let token = document.getElementById('token').value;
   if (!/^([0-9a-zA-Z_\-]{20})$/.test(token)) {
      token = '';
   }
   browser.storage.local.set({
      token: token
   });
   document.getElementById('token').value = token;
   browser.runtime.sendMessage(['set', token]).then(() => {}, () => {});
});