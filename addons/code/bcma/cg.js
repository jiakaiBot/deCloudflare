document.addEventListener('DOMContentLoaded', () => {
   browser.runtime.sendMessage(['cf']).then((r) => {
      fetch('i18n/' + r[5] + '.json', {
         method: 'GET'
      }).then(j => j.json()).then(j => {
         document.querySelectorAll('span[transk]').forEach(x => {
            x.innerText = j[x.getAttribute('transk')];
         });
      });
      let junk0 = '',
         junk1 = JSON.parse(r[0]);
      for (k in junk1) {
         junk0 += k + ' ' + junk1[k] + "\n";
      }
      document.getElementById('t').value = junk0;
      document.getElementById('g').value = JSON.parse(r[1]).join("\n");
      document.getElementById('vau').value = r[3];
      document.getElementById('nnf1').checked = r[4][0];
      document.getElementById('nnf2').checked = r[4][1];
      document.getElementById('csa1').checked = r[4][2];
      document.getElementById('csa2').checked = r[4][3];
      document.getElementById('csa3').checked = r[4][4];
      document.getElementById('csa4').checked = r[4][5];
      document.getElementById('csa5').checked = r[4][6];
      document.getElementById('csa6').checked = r[4][7];
      switch (r[2]) {
         case 0:
            document.getElementById('ta0').checked = true;
            document.getElementById('ta1').checked = false;
            document.getElementById('ta2').checked = false;
            document.getElementById('ta3').checked = false;
            document.getElementById('ta4').checked = false;
            break;
         case 1:
            document.getElementById('ta0').checked = false;
            document.getElementById('ta1').checked = true;
            document.getElementById('ta2').checked = false;
            document.getElementById('ta3').checked = false;
            document.getElementById('ta4').checked = false;
            break;
         case 3:
            document.getElementById('ta0').checked = false;
            document.getElementById('ta1').checked = false;
            document.getElementById('ta2').checked = false;
            document.getElementById('ta3').checked = true;
            document.getElementById('ta4').checked = false;
            break;
         case 4:
            document.getElementById('ta0').checked = false;
            document.getElementById('ta1').checked = false;
            document.getElementById('ta2').checked = false;
            document.getElementById('ta3').checked = false;
            document.getElementById('ta4').checked = true;
            break;
         default:
            document.getElementById('ta0').checked = true;
            document.getElementById('ta1').checked = false;
            document.getElementById('ta2').checked = false;
            document.getElementById('ta3').checked = false;
            document.getElementById('ta4').checked = false;
            break;
      }
   });
   document.getElementById('aus').addEventListener('click', function () {
      if (!/^http(|s):\/\/([a-z0-9.-]{4,})\/(.*)%%(U|E)RL%%/.test(document.getElementById('vau').value)) {
         document.getElementById('vau').value = '';
      }
      browser.runtime.sendMessage(['au', document.getElementById('vau').value]);
   });
   document.getElementById('exp').addEventListener('click', () => {
      browser.tabs.create({
         active: true,
         url: 'about:blank'
      }).then(function (t) {
         let junk = "| Domain | First Seen |\n| ------ | ------ |\n";
         document.getElementById('t').value.split("\n").forEach(x => {
            x = x.split(' ');
            if (x[1]) {
               junk += '| ' + x[0] + ' | ' + x[1] + " |\n";
            }
         });
         browser.tabs.executeScript(t.id, {
            matchAboutBlank: true,
            code: "document.documentElement.innerHTML='<html><body><pre>'+atob('" + btoa(junk) + "')+'</pre></body></html>';window.stop();"
         });
      });
   });
   document.getElementById('clr').addEventListener('click', () => {
      document.getElementById('clr').disabled = true;
      document.getElementById('clrREAL').style.display = 'inline';
   });
   document.getElementById('clr2').addEventListener('click', () => {
      browser.runtime.sendMessage(['dy']);
      document.getElementById('t').value = '';
      document.getElementById('clrREAL').style.display = 'none';
      document.getElementById('clr').disabled = false;
   });
   document.getElementById('nnf1').addEventListener('click', function () {
      browser.runtime.sendMessage(['nnf', '1', (this.checked ? true : false)]);
   });
   document.getElementById('nnf2').addEventListener('click', function () {
      browser.runtime.sendMessage(['nnf', '2', (this.checked ? true : false)]);
   });
   document.getElementById('csa1').addEventListener('click', function () {
      browser.runtime.sendMessage(['csa', '1', (this.checked ? true : false)]);
   });
   document.getElementById('csa2').addEventListener('click', function () {
      browser.runtime.sendMessage(['csa', '2', (this.checked ? true : false)]);
   });
   document.getElementById('csa3').addEventListener('click', function () {
      browser.runtime.sendMessage(['csa', '3', (this.checked ? true : false)]);
   });
   document.getElementById('csa4').addEventListener('click', function () {
      browser.runtime.sendMessage(['csa', '4', (this.checked ? true : false)]);
   });
   document.getElementById('csa5').addEventListener('click', function () {
      browser.runtime.sendMessage(['csa', '5', (this.checked ? true : false)]);
   });
   document.getElementById('csa6').addEventListener('click', function () {
      browser.runtime.sendMessage(['csa', '6', (this.checked ? true : false)]);
   });
   document.getElementById('ta0').addEventListener('click', function () {
      if (this.checked) {
         browser.runtime.sendMessage(['ta', '0']);
      }
   });
   document.getElementById('ta1').addEventListener('click', function () {
      if (this.checked) {
         browser.runtime.sendMessage(['ta', '1']);
      }
   });
   document.getElementById('ta2').addEventListener('click', function () {
      if (this.checked) {
         browser.runtime.sendMessage(['ta', '2']);
      }
   });
   document.getElementById('ta3').addEventListener('click', function () {
      if (this.checked) {
         browser.runtime.sendMessage(['ta', '3']);
      }
   });
   document.getElementById('ta4').addEventListener('click', function () {
      if (this.checked) {
         browser.runtime.sendMessage(['ta', '4']);
      }
   });
   document.getElementById('ign').addEventListener('click', function () {
      browser.runtime.sendMessage(['ig', document.getElementById('g').value.split("\n")]);
   });
   document.getElementById('myul').addEventListener('change', () => {
      if (document.getElementById('myul').value != '') {
         browser.runtime.sendMessage(['ul', document.getElementById('myul').value]);
         location.reload(true);
      }
   });
});