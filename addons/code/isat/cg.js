document.addEventListener('DOMContentLoaded', () => {
	browser.storage.local.get(['ign1', 'obs', 'dbg', 'alt', 'mul', 'opd', 'cep', 'aep']).then(g => {
		document.getElementById('ign1').checked = (g.ign1 == 'y') ? true : false;
		document.getElementById('obs').checked = (g.obs == 'y') ? true : false;
		document.getElementById('dbg').checked = (g.dbg == 'y') ? true : false;
		document.getElementById('alt').checked = (g.alt == 'y') ? true : false;
		document.getElementById('opon').checked = (g.opd != 'n') ? true : false;
		document.getElementById('opoff').checked = (g.opd == 'n') ? true : false;
		document.getElementById('ut3').checked = (g.cep || 3) == 3 ? true : false;
		document.getElementById('ut2').checked = g.cep == 2 ? true : false;
		document.getElementById('ut9').checked = g.cep == 9 ? true : false;
		document.getElementById('ut9x').value = (g.aep == undefined) ? '' : g.aep;
		fetch('i18n/' + (g.mul || 'eo') + '.json', {
			method: 'GET'
		}).then(j => j.json()).then(j => {
			document.querySelectorAll('span[tek]').forEach(x => {
				x.innerText = j[x.getAttribute('tek')];
			});
			document.body.style.display = 'block';
		});
	});
});
document.getElementById('myul').addEventListener('change', () => {
	let xul = document.getElementById('myul').value;
	if (xul.length == 2) {
		browser.storage.local.set({
			'mul': xul
		});
		location.reload(true);
	}
});
document.getElementById('ign1').addEventListener('click', () => {
	browser.storage.local.set({
		'ign1': (document.getElementById('ign1').checked ? 'y' : 'n')
	});
});
document.getElementById('obs').addEventListener('click', () => {
	browser.storage.local.set({
		'obs': (document.getElementById('obs').checked ? 'y' : 'n')
	});
});
document.getElementById('dbg').addEventListener('click', () => {
	browser.storage.local.set({
		'dbg': (document.getElementById('dbg').checked ? 'y' : 'n')
	});
});
document.getElementById('alt').addEventListener('click', () => {
	browser.storage.local.set({
		'alt': (document.getElementById('alt').checked ? 'y' : 'n')
	});
});
document.getElementById('opon').addEventListener('click', () => {
	browser.runtime.sendMessage('dbmode,s1').then(() => {
		location.reload();
	});
});
document.getElementById('opoff').addEventListener('click', () => {
	browser.runtime.sendMessage('dbmode,s0').then(() => {
		location.reload();
	});
});
document.getElementById('crs').addEventListener('click', () => {
	browser.runtime.sendMessage('clear').then(() => {
		location.reload();
	});
});
document.getElementById('ut2').addEventListener('click', () => {
	browser.runtime.sendMessage('urltype,2').then(() => {
		location.reload();
	});
});
document.getElementById('ut3').addEventListener('click', () => {
	browser.runtime.sendMessage('urltype,3').then(() => {
		location.reload();
	});
});
document.getElementById('ut9').addEventListener('click', () => {
	browser.runtime.sendMessage('urltype,9').then(() => {
		location.reload();
	});
});
document.getElementById('ut9x').addEventListener('change', () => {
	browser.runtime.sendMessage('customaep,' + document.getElementById('ut9x').value).then(() => {});
});
document.getElementById('sms').addEventListener('click', () => {
	document.getElementById('smsa').style.display = 'none';
	browser.storage.local.get().then(g => {
		let iY = 0,
			iN = 0,
			iT, tmp, akd = [];
		Object.keys(g).forEach(a => {
			if (!['ign1', 'obs', 'dbg', 'alt', 'lastU', 'lastV', 'cep', 'mul', 'opd', 'ldb', 'aep'].includes(a) && (g[a] == 'y' || g[a] == 'n')) {
				if (!akd.includes(a)) {
					akd.push(a);
					if (g[a] == 'y') {
						iY++;
					} else {
						iN++;
					}
				}
			}
		});
		iT = iY + iN;
		if (iT > 0) {
			tmp = (iY * 100 / iT).toFixed(1);
			document.getElementById('viry').innerText = iY + ' (' + tmp + '%)';
			tmp = (iN * 100 / iT).toFixed(1);
			document.getElementById('virn').innerText = iN + ' (' + tmp + '%)';
			document.getElementById('viro').innerText = (iY + iN);
		} else {
			document.getElementById('viry').innerText = 0;
			document.getElementById('virn').innerText = 0;
			document.getElementById('viro').innerText = 0;
		}
		document.getElementById('smsb').style.display = 'inline';
	});
});