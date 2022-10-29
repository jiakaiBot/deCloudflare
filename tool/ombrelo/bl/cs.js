if (document.body) {
	if (['ombrelo.x66j7jej74efeulffzy3hu3p4dtfruiwb3vv6ec7b5bxlkogxw5vnpid.onion', 'ombrelo.eu.org'].includes(location.hostname)) {
		if (location.pathname == '/' || location.pathname == '/a/') {
			browser.storage.local.get().then(d => {
				let csl = 0,
					cs = (function () {
						let s = document.createElement('style');
						document.head.appendChild(s);
						return s.sheet;
					})();
				if (cs) {
					let bMain = (location.pathname == '/') ? true : false;
					(d.data || '').split("\n").forEach(e => {
						if (e.includes('/')) {
							e = e.split('/');
							if (bMain) {
								if (e[0] == 'f' || e[0] == 'd') {
									cs.insertRule("blockquote.seres[data-f*='/" + e[0] + "=" + e[1] + "']{display:none !important}", csl);
									csl++;
								}
								if (e[0] == 'a' || e[0] == 'v') {
									cs.insertRule("div#box_result table tr[z" + e[0] + "='" + e[1] + "']{display:none !important}", csl);
									csl++;
								}
							} else {
								if (e[0] == 'f' || e[0] == 'd') {
									cs.insertRule("div#m table tr[af*='/" + e[0] + "=" + e[1] + "']{display:none !important}", csl);
									csl++;
								}
							}
						}
					});
					if (d.idn == 'y') {
						cs.insertRule((bMain ? "blockquote.seres[data-f*='/d=xn--'],blockquote.seres[data-f*='/f=xn--']{display:none !important}" : "div#m table tr[af*='/d=xn--'],div#m table tr[af*='/f=xn--']{display:none !important}"), csl);
						csl++;
					}
					if (d.mim == 'y') {
						cs.insertRule((bMain ? "div#box_result > details blockquote.opmor,blockquote.seres[data-f*='/mitm']{display:none !important}" : "div#m > details,tr td.cf{display:none !important}"), csl);
						csl++;
					}
					if (bMain) {
						if (d.sex == 'y') {
							cs.insertRule("blockquote.seres[data-f*='/nsfw']{display:none !important}", csl);
							csl++;
						}
						if (d.att == 'y') {
							cs.insertRule("blockquote.seres[data-f*='/att']{display:none !important}", csl);
							csl++;
						}
						if (document.getElementById('box_result')) {
							(new MutationObserver(i => {
								document.querySelectorAll("blockquote.seres[data-f] span.poitu.banME").forEach(j => {
									if (j.dataset.done != 1) {
										j.removeAttribute('onclick');
										j.addEventListener('click', k => {
											let kB = (k.target).parentNode.parentNode;
											let f = kB.dataset.f.split('/f=', 2)[1].split('/', 2)[0];
											if (f.length >= 4) {
												browser.storage.local.get(['data']).then(d => {
													let od = (d.data || '').split("\n").filter(x => x != '');
													od.push('f/' + f);
													browser.storage.local.set({
														'data': od.sort().filter((v, i, a) => a.indexOf(v) === i).filter(x => x != '').join("\n")
													}).then(() => {
														cs.insertRule("blockquote.seres[data-f*='/f=" + f + "']{display:none !important}", csl);
														csl++;
													}, () => {});
												}, () => {});
											}
										});
										j.dataset.done = 1;
									}
								});
								document.querySelectorAll("table tr[za][zv] span.poitu.banME").forEach(j => {
									if (j.dataset.done != 1) {
										j.removeAttribute('onclick');
										j.addEventListener('click', k => {
											let f = (k.target).parentNode.parentNode.parentNode.getAttribute('za');
											if (f.length >= 3) {
												browser.storage.local.get(['data']).then(d => {
													let od = (d.data || '').split("\n").filter(x => x != '');
													od.push('a/' + f);
													browser.storage.local.set({
														'data': od.sort().filter((v, i, a) => a.indexOf(v) === i).filter(x => x != '').join("\n")
													}).then(() => {
														cs.insertRule("div#box_result table tr[za='" + f + "']{display:none !important}", csl);
														csl++;
													}, () => {});
												}, () => {});
											}
										});
										j.dataset.done = 1;
									}
								});
							})).observe(document.getElementById('box_result'), {
								childList: true,
								subtree: true
							});
						}
					} else {
						if (document.getElementById('m')) {
							document.querySelectorAll("div#m table tr[af] span.u").forEach(j => {
								if (j.dataset.done != 1) {
									j.removeAttribute('onclick');
									j.addEventListener('click', k => {
										let f = (k.target).parentNode.parentNode.getAttribute('af').split('/f=', 2)[1];
										if (f.length >= 4) {
											browser.storage.local.get(['data']).then(d => {
												let od = (d.data || '').split("\n").filter(x => x != '');
												od.push('f/' + f);
												browser.storage.local.set({
													'data': od.sort().filter((v, i, a) => a.indexOf(v) === i).filter(x => x != '').join("\n")
												}).then(() => {
													cs.insertRule("div#m table tr[af*='/f=" + f + "']{display:none !important}", csl);
													csl++;
												}, () => {});
											}, () => {});
										}
									});
									j.dataset.done = 1;
								}
							});
						}
					}
				}
			}, () => {});
		}
	} else {
		if (location.href.endsWith('/edit.html')) {
			document.addEventListener('DOMContentLoaded', () => {
				browser.storage.local.get().then(d => {
					fetch('i18n/' + (d.ul || 'eo') + '.json', {
						method: 'GET'
					}).then(j => j.json()).then(j => {
						document.querySelectorAll('span[transk]').forEach(x => {
							x.innerText = j[x.getAttribute('transk')];
						});
					});
					document.getElementById('bl').value = d.data || '';
					document.getElementById('haidn').checked = (d.idn == 'y') ? true : false;
					document.getElementById('hamim').checked = (d.mim == 'y') ? true : false;
					document.getElementById('hasex').checked = (d.sex == 'y') ? true : false;
					document.getElementById('haatt').checked = (d.att == 'y') ? true : false;
				}, () => {});
				document.getElementById('save').addEventListener('click', () => {
					document.getElementById('bl').style.display = 'none';
					let data = document.getElementById('bl').value.split("\n"),
						newdata = [];
					data.forEach(d => {
						if (/^(f|d|a|v)\/([a-zA-Z0-9._-]{3,255})$/.test(d)) {
							newdata.push(d);
						}
					});
					browser.storage.local.set({
						'data': newdata.sort().filter((v, i, a) => a.indexOf(v) === i).filter(x => x != '').join("\n")
					}).then(() => {
						location.reload(true);
					}, () => {});
				});
				document.getElementById('haidn').addEventListener('click', () => {
					browser.storage.local.set({
						'idn': (document.getElementById('haidn').checked ? 'y' : 'n')
					});
				});
				document.getElementById('hamim').addEventListener('click', () => {
					browser.storage.local.set({
						'mim': (document.getElementById('hamim').checked ? 'y' : 'n')
					});
				});
				document.getElementById('hasex').addEventListener('click', () => {
					browser.storage.local.set({
						'sex': (document.getElementById('hasex').checked ? 'y' : 'n')
					});
				});
				document.getElementById('haatt').addEventListener('click', () => {
					browser.storage.local.set({
						'att': (document.getElementById('haatt').checked ? 'y' : 'n')
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
		}
	}
}