document.addEventListener('DOMContentLoaded', () => {
	browser.storage.local.get(['onion']).then(g => {
		if (g.onion == 'y') {
			document.getElementById('ut1').checked = true;
			document.getElementById('ut2').checked = false;
		} else {
			document.getElementById('ut1').checked = false;
			document.getElementById('ut2').checked = true;
		}
	});
	document.getElementById('ut1').addEventListener('click', () => {
		browser.runtime.sendMessage(['onion', true]);
	});
	document.getElementById('ut2').addEventListener('click', () => {
		browser.runtime.sendMessage(['onion', false]);
	});
});
