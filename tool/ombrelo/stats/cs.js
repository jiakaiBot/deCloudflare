if (document.body && ['ombrelo.x66j7jej74efeulffzy3hu3p4dtfruiwb3vv6ec7b5bxlkogxw5vnpid.onion', 'ombrelo.eu.org'].includes(location.hostname) && location.pathname == '/') {
	let iY = 0,
		iN = 0,
		iRUN = false;
	function update_stat() {
		let iTTL = document.querySelectorAll("div#box_result blockquote.seres[data-f^='/d']").length;
		let iNCF = document.querySelectorAll("div#box_result blockquote.seres[data-f^='/d']:not([data-f*='/mitm'])").length;
		let iICF = document.querySelectorAll("div#box_result blockquote.seres[data-f^='/d'][data-f*='/mitm']").length;
		if (iTTL > 0 && (iNCF + iICF) == iTTL) {
			iY += iNCF;
			browser.storage.local.set({
				'g': iY
			});
			iN += iICF;
			browser.storage.local.set({
				'b': iN
			});
		}
		if (iTTL > 0 && (iY > 0 || iN > 0) && document.querySelectorAll('div#box_extinfo span.sx_tx small').length > 0) {
			document.querySelector('div#box_extinfo span.sx_tx small').innerHTML = document.querySelector('div#box_extinfo span.sx_tx small').innerHTML + '<br>&nbsp;&nbsp;&#11177; MITM: <i><u>' + (iN * 100 / (iY + iN)).toFixed(1) + '</u></i>%';
		}
	}
	if (document.getElementById('box_result')) {
		browser.storage.local.get(['g', 'b']).then(x => {
			iY = x.g || 0;
			iN = x.b || 0;
			update_stat();
			if (document.getElementById('box_result')) {
				(new MutationObserver(i => {
					if (document.querySelectorAll('div#box_result blockquote.seres.nfobox').length == 1 && document.querySelectorAll('div#box_result blockquote.seres').length == 1) {
						iRUN = true;
						return;
					}
					if (document.querySelectorAll("div#box_result blockquote#empage").length > 0) {
						iRUN = false;
						return;
					}
					if (document.querySelectorAll("div#box_result blockquote.seres[data-f^='/d']").length == 0) {
						iRUN = false;
						return;
					}
					if (iRUN) {
						update_stat();
					}
					iRUN = false;
				})).observe(document.getElementById('box_result'), {
					childList: true
				});
			}
		});
	}
}
