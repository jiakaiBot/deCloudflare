let baseURL = 'http://ombrelo.x66j7jej74efeulffzy3hu3p4dtfruiwb3vv6ec7b5bxlkogxw5vnpid.onion/',
	uChoices = '';
const BUclear = 'https://ombrelo.eu.org/',
	BUonion = 'http://ombrelo.x66j7jej74efeulffzy3hu3p4dtfruiwb3vv6ec7b5bxlkogxw5vnpid.onion/';
browser.storage.local.get(null).then(g => {
	baseURL = (g.onion == 'y') ? BUonion : BUclear;
	uChoices = g.params || '';
});
browser.webRequest.onBeforeRequest.addListener(g => {
	if (g.method != 'GET' || g.type != 'main_frame' || g.parentFrameId != -1 || g.documentUrl != undefined || g.frameId != 0) {
		return {
			cancel: true
		};
	}
	let tmp;
	if (g.url.startsWith('https://ombrelo.test/?q=')) {
		let q = (new URL(g.url)).searchParams.get('q');
		if (q.length >= 2) {
			let htmlChoices = '';
			uChoices.split('&').forEach(akv => {
				if (akv.includes('=')) {
					tmp = akv.split('=');
					htmlChoices += '<input name=\"' + tmp[0] + '\" value=\"' + tmp[1] + '\">';
				}
			});
			browser.tabs.create({
				active: true,
				openerTabId: g.tabId,
				url: 'about:blank'
			}).then(t => {
				browser.tabs.remove(g.tabId);
				browser.tabs.executeScript(t.id, {
					matchAboutBlank: true,
					code: "document.documentElement.innerHTML='<html><head><meta http-equiv=\"content-type\" content=\"text/html;charset=UTF-8\"><title>&#127972;</title></head><body style=\"cursor:wait;height:100vh;overflow:hidden\"><form id=\"f\" method=\"POST\" style=\"display:none\">" + htmlChoices + "<input id=\"q\" name=\"query\"></form></body></html>';window.stop();" +
						"document.getElementById('f').action='" + baseURL + "';" +
						"document.getElementById('q').value=decodeURIComponent(atob('" +
						btoa(encodeURIComponent(q).replace(/%([0-9A-F]{2})/g, function (match, p1) {
							return String.fromCharCode(parseInt(p1, 16))
						})) +
						"').split('').map(function(c){return '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2);}).join(''));" +
						"document.getElementById('f').submit();"
				});
			});
			return {
				cancel: true
			};
		}
	}
	if (g.url.startsWith('https://ombrelo.test/config,' + ((new Date()).toISOString().slice(0, 10).replace(/-/g, '')) + '!!') && /^http(:\/\/ombrelo\.x66j7jej74efeulffzy3hu3p4dtfruiwb3vv6ec7b5bxlkogxw5vnpid\.onion|s:\/\/ombrelo\.eu\.org)\//.test(g.originUrl)) {
		let ok = true,
			conf = atob(g.url.split('!!')[1]);
		if (!/^http(:\/\/ombrelo\.x66j7jej74efeulffzy3hu3p4dtfruiwb3vv6ec7b5bxlkogxw5vnpid\.onion|s:\/\/ombrelo\.eu\.org)\/\?oo\&(.*)rq=%s$/.test(conf)) {
			ok = false;
		}
		if (ok) {
			tmp = conf.split('?oo&')[0];
			if (tmp == BUclear || tmp == BUonion) {
				baseURL = tmp;
			} else {
				ok = false;
			}
		}
		if (ok) {
			tmp = (conf.split('/?oo')[1]).replace('&rq=%s', '');
			if (tmp.length == 0) {
				uChoices = '';
			} else {
				if (!/^\&([a-zA-Z0-9&=-]{4,})$/.test(tmp) || tmp.endsWith('&') || tmp.includes('&rq=') || tmp.includes('&&')) {
					ok = false;
				} else {
					uChoices = tmp;
				}
			}
		}
		if (ok) {
			browser.storage.local.set({
				'onion': (baseURL == BUonion ? 'y' : 'n')
			});
			browser.storage.local.set({
				'params': uChoices
			});
			return {
				redirectUrl: conf.replace('rq=%s', 'rq').replace('/?oo&rq', '/')
			};
		}
	}
	return {
		cancel: true
	};
}, {
	urls: ['https://ombrelo.test/*']
}, ['blocking']);
browser.runtime.onMessage.addListener((r, s, sr) => {
	if (r && r[0] == 'onion') {
		browser.storage.local.set({
			'onion': (r[1] ? 'y' : 'n')
		});
		baseURL = (r[1]) ? BUonion : BUclear;
	}
	return;
});