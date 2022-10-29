if (document.body && ['ombrelo.x66j7jej74efeulffzy3hu3p4dtfruiwb3vv6ec7b5bxlkogxw5vnpid.onion', 'ombrelo.eu.org'].includes(location.hostname)) {
	if (location.pathname == '/' && document.querySelectorAll("link[rel=stylesheet][href^='./oocss/']").length == 1) {
		browser.storage.local.get(['fcss']).then(d => {
			if (d.fcss && d.fcss.length > 0) {
				let csl = 0,
					cs = (function () {
						let s = document.createElement('style');
						document.head.appendChild(s);
						return s.sheet;
					})();
				if (cs) {
					d.fcss.forEach(x => {
						cs.insertRule(x, csl);
						csl++;
					});
				}
			}
		}, () => {});
	}
}