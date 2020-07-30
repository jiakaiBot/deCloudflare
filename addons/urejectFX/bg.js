let history = {};
browser.webRequest.onResponseStarted.addListener(i => {
	if ([403, 406, 410, 429, 451, 462].includes(i.statusCode)) {
		let iFQDN = (new URL(i.url)).hostname;
		if (['searxes.eu.org', 'ansero.eu.org', 'ss.wodferndripvpe6ib4uz4rtngrnzichnirgn7t5x64gxcyroopbhsuqd.onion', 'searxes.wodferndripvpe6ib4uz4rtngrnzichnirgn7t5x64gxcyroopbhsuqd.onion', 'ansero.wodferndripvpe6ib4uz4rtngrnzichnirgn7t5x64gxcyroopbhsuqd.onion'].includes(iFQDN)) {
			return;
		}
		let iServer = '?';
		i.responseHeaders.forEach(x => {
			if (x.name == 'Server' || x.name == 'server') {
				iServer = x.value;
			}
		});
		history[iFQDN] = [i.url, iServer, i.statusCode, (new Date()).toUTCString()];
	}
	return;
}, {
	urls: ['http://*/*', 'https://*/*'],
	types: ['main_frame']
}, ['responseHeaders']);
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request && sender) {
		if (request == 'get') {
			sendResponse(history);
		}
		if (request == 'clear') {
			history = {};
			sendResponse(true);
		}
	}
});
browser.browserAction.onClicked.addListener(() => {
	browser.runtime.openOptionsPage();
});