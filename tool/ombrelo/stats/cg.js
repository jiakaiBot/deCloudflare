document.addEventListener('DOMContentLoaded', () => {
	browser.storage.local.get(['ul']).then((r) => {
		fetch('i18n/' + (r.ul || 'eo') + '.json', {
			method: 'GET'
		}).then(j => j.json()).then(j => {
			document.querySelectorAll('span[transk]').forEach(x => {
				x.innerText = j[x.getAttribute('transk')];
			});
		});
	});
	document.getElementById('crs').addEventListener('click', () => {
		browser.storage.local.set({
			'g': 0
		});
		browser.storage.local.set({
			'b': 0
		});
		location.reload();
	});
	document.getElementById('sms').addEventListener('click', () => {
		document.getElementById('smsa').style.display = 'none';
		browser.storage.local.get(['g', 'b']).then(x => {
			let iY = x.g || 0,
				iN = x.b || 0,
				iT;
			iT = iY + iN;
			if (iT > 0) {
				document.getElementById('viry').innerText = iY + ' (' + (iY * 100 / iT).toFixed(1) + '%)';
				document.getElementById('virn').innerText = iN + ' (' + (iN * 100 / iT).toFixed(1) + '%)';
				document.getElementById('viro').innerText = iT;
			} else {
				document.getElementById('viry').innerText = 0;
				document.getElementById('virn').innerText = 0;
				document.getElementById('viro').innerText = 0;
			}
			document.getElementById('smsb').style.display = 'inline';
		});
	});
	document.getElementById('myul').addEventListener('change', () => {
		if (document.getElementById('myul').value != '') {
			browser.storage.local.set({
				'ul': document.getElementById('myul').value
			}).then(() => {
				location.reload(true);
			});
		}
	});
});