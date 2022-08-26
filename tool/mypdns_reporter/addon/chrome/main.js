let done = false,
	running = false,
	notify = 'mypdnsreporter',
	token = '',
	apiurl = '',
	tabOp1 = false,
	tabOp2 = false;
const baseurl = ['https://karma.crimeflare.eu.org:1984', 'http://karma.im5wixghmfmt7gf7wb4xrgdm6byx2gj26zn47da6nwo7xvybgxnqryid.onion'];
const waitstc = ['Hold on', 'One moment', 'Just a moment', 'Just a sec', 'Just a second', 'Nice find', 'Knock-knock!', 'Brill!', 'Brilliant!', 'Cool!', 'Good going!', 'Good job!', 'Good work!', 'Great!', 'Keep it up!', 'Marvelous!', 'Nice going!', 'Outstanding!', 'Perfect!', 'Right on!', 'Super!', 'Superb!', 'Terrific!', 'Thanks!', 'Wonderful!', 'Wow!', 'You are doing a good job!'];
function showreply(t, d, icon = '') {
	chrome.notifications.clear(notify);
	chrome.notifications.create(notify, {
		type: 'basic',
		title: t,
		message: d,
		iconUrl: chrome.runtime.getURL(icon == '' ? 'icon.png' : 'i/' + icon + '.png')
	});
}
function toBinary(string) {
	const codeUnits = new Uint16Array(string.length);
	for (let i = 0; i < codeUnits.length; i++) {
		codeUnits[i] = string.charCodeAt(i);
	}
	return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
}
function ireport(url, type, comment) {
	return new Promise((g, b) => {
		fetch(apiurl + '/api/mypdns/', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: (tabOp2 ? 'wdesc&' : '') + 'k=' + token + '&cat=' + type + '&url=' + encodeURIComponent(url) + (comment == '' ? '' : '&wmemo=' + encodeURIComponent(toBinary(comment)))
		}).then(r => r.json()).then(r => {
			g(r);
		}).catch(b);
	});
}
function try_onion() {
	return new Promise((g, b) => {
		fetch(baseurl[1] + '/api/mypdns/', {
			method: 'GET',
			mode: 'cors'
		}).then(r => r.json()).then(r => {
			if (r.reply) {
				g();
			} else {
				b();
			}
		}).catch(b);
	});
}
function testing_onion() {
	chrome.storage.local.set({
		'tryonion': 1
	});
	try_onion().then(() => {
		chrome.storage.local.set({
			'top3': 1
		});
		apiurl = baseurl[1];
	}, () => {});
}
function reporting(i, t) {
	if (i.menuItemId == 'openMass') {
		chrome.tabs.create({
			active: true,
			url: chrome.runtime.getURL('massrep/index.html')
		});
		return;
	}
	if (i.menuItemId == 'searchIt') {
		chrome.tabs.create({
			active: true,
			url: 'https://mypdns.org/my-privacy-dns/matrix/-/issues?scope=all&sort=created_date&state=opened&search=' + encodeURIComponent(i.selectionText.trim())
		});
		return;
	}
	if (running) {
		return;
	}
	let cattype, url = '';
	if (i.menuItemId.startsWith('actPAGE')) {
		url = i.pageUrl;
		cattype = i.menuItemId.split('_')[1];
	}
	if (i.menuItemId.startsWith('actLINK')) {
		url = i.linkUrl;
		cattype = i.menuItemId.split('_')[1];
	}
	if (!/^http(|s):\/\/([a-z0-9]{1})([a-z0-9.-]{0,254})\.([a-z]{2,50})(|\/(.*))$/.test(url)) {
		showreply('Sorry', 'You cannot report this site.');
		return;
	}
	let fqdn = (new URL(url)).host;
	if (/^(mypdns\.org|youtube\.com)$/.test(fqdn)) {
		showreply('Sorry', 'You cannot report this site.');
		return;
	}
	if (token == '') {
		showreply('Before you begin', 'Please set your token.');
		chrome.runtime.openOptionsPage();
		return;
	}
	running = true;
	showreply(waitstc[Math.floor(Math.random() * waitstc.length)], 'Reporting ' + cattype + ' ' + fqdn + '...', cattype);
	ireport(url, cattype, i.comment || '').then(g => {
		if (g.reply) {
			if (g.reply == 'roger') {
				showreply('Reported ' + fqdn, url);
			} else {
				showreply('Reply', g.reply);
				if (tabOp1 && g.reply.startsWith('Issue for this domain is already exist.')) {
					chrome.tabs.create({
						active: true,
						url: 'https://mypdns.org/my-privacy-dns/matrix/-/issues/' + g.issue
					});
				}
			}
		} else {
			showreply('Sorry', 'Something is wrong. Please try again later.');
		}
		running = false;
	}, b => {
		showreply('Sorry', 'Unable to connect. Please try again later.');
		running = false;
	});
}
function reload_menu() {
	chrome.storage.local.get(null, r => {
		chrome.contextMenus.removeAll();
		chrome.contextMenus.create({
			id: 'iactLINK',
			documentUrlPatterns: ['http://*/*', 'https://*/*'],
			title: 'Report this Link as',
			contexts: ['link']
		});
		chrome.contextMenus.create({
			id: 'iactPAGE',
			documentUrlPatterns: ['http://*/*', 'https://*/*'],
			title: 'Report this Page as',
			contexts: ['page']
		});
		let iLastMenu = '';
		if (r.nocat01 != '1') {
			iLastMenu = '01';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_adware',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Adware',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_adware',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Adware',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat02 != '1') {
			iLastMenu = '02';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_drugs',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Drugs',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_drugs',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Drugs',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat03 != '1') {
			iLastMenu = '03';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_gambling',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Gambling',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_gambling',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Gambling',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat17 != '1') {
			iLastMenu = '17';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_porngore',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Gore',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_porngore',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Gore',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat04 != '1') {
			iLastMenu = '04';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_malicious',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Malicious',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_malicious',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Malicious',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat05 != '1') {
			iLastMenu = '05';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_movies',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Movies',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_movies',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Movies',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat06 != '1') {
			iLastMenu = '06';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_news',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'News',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_news',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'News',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat07 != '1') {
			iLastMenu = '07';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_phishing',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Phishing',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_phishing',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Phishing',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat08 != '1') {
			iLastMenu = '08';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_politics',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Politics',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_politics',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Politics',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat09 != '1') {
			iLastMenu = '09';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_porn',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Porn',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_porn',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Porn',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat19 != '1') {
			iLastMenu = '19';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_pornstrict',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Porn (Strict)',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_pornstrict',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Porn (Strict)',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat15 != '1') {
			iLastMenu = '15';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_redirector',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Redirector',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_redirector',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Redirector',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat10 != '1') {
			iLastMenu = '10';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_religion',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Religion',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_religion',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Religion',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat14 != '1') {
			iLastMenu = '14';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_scamming',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Scamming',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_scamming',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Scamming',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat18 != '1') {
			iLastMenu = '18';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_pornsnuff',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Snuff',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_pornsnuff',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Snuff',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat11 != '1') {
			iLastMenu = '11';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_spyware',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Spyware',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_spyware',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Spyware',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat20 != '1') {
			iLastMenu = '20';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_torrent',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Torrent',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_torrent',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Torrent',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat12 != '1') {
			iLastMenu = '12';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_tracking',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Tracking',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_tracking',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Tracking',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat16 != '1') {
			iLastMenu = '16';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_typosquatting',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Typo Squatting',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_typosquatting',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Typo Squatting',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (r.nocat13 != '1') {
			iLastMenu = '13';
			chrome.contextMenus.create({
				parentId: 'iactLINK',
				id: 'actLINK_weapons',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Weapons',
				contexts: ['link']
			});
			chrome.contextMenus.create({
				parentId: 'iactPAGE',
				id: 'actPAGE_weapons',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Weapons',
				contexts: ['page']
			});
			if (r.nocat98 != '1') {
				chrome.contextMenus.create({
					parentId: 'iactLINK',
					id: 'sepaLink_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['link']
				});
				chrome.contextMenus.create({
					parentId: 'iactPAGE',
					id: 'sepaPage_' + iLastMenu,
					documentUrlPatterns: ['http://*/*', 'https://*/*'],
					type: 'separator',
					contexts: ['page']
				});
			}
		}
		if (iLastMenu == '') {
			chrome.contextMenus.removeAll();
		}
		if (r.nocat99 == '1') {
			chrome.contextMenus.create({
				id: 'openMass',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Open Mass Report tool',
				contexts: ['page']
			});
		}
		if (r.nocat97 == '1') {
			chrome.contextMenus.create({
				id: 'searchIt',
				documentUrlPatterns: ['http://*/*', 'https://*/*'],
				title: 'Search "%s" on Matrix',
				contexts: ['selection']
			});
		}
		if (r.nocat96 == '1') {
			chrome.contextMenus.removeAll();
		}
	});
}
chrome.contextMenus.onClicked.addListener(reporting);
if (!done) {
	done = true;
	chrome.storage.local.get(null, r => {
		apiurl = (r.top3 != 1) ? baseurl[0] : baseurl[1];
		if (r.token && r.token.length == 20) {
			token = r.token;
		}
		tabOp1 = (r.top1 == 1) ? true : false;
		tabOp2 = (r.top2 == 1) ? true : false;
		if (r.tryonion != 1) {
			setTimeout(testing_onion, 70000);
		}
	});
	reload_menu();
}
chrome.runtime.onMessage.addListener((r, s, sr) => {
	if (r[0] == 'set') {
		token = r[1];
		if (token.length == 20) {
			showreply('Welcome!', 'Thank you for helping out this project.');
		} else {
			showreply('See you later.', 'Your Access Token is cleared.');
		}
		sr(true);
	}
	if (r[0] == 'report') {
		reporting({
			menuItemId: 'actPAGE_' + r[1],
			pageUrl: r[2],
			comment: r[3] || ''
		}, null);
		sr(true);
	}
	if (r[0] == 'top1') {
		tabOp1 = (r[1] == 1) ? true : false;
		sr(true);
	}
	if (r[0] == 'top2') {
		tabOp2 = (r[1] == 1) ? true : false;
		sr(true);
	}
	if (r[0] == 'top3') {
		apiurl = (r[1] != 1) ? baseurl[0] : baseurl[1];
		sr(true);
	}
	if (r[0].startsWith('topWP')||r[0] == 'top4' || r[0] == 'top5' || r[0] == 'top6' || r[0] == 'top7') {
		sr(true);
	}
	if (r[0] == 'menu') {
		reload_menu();
		sr(true);
	}
	if (r[0] == 'screenshot') {
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, tab => {
			if (tab && tab[0]) {
				let tabFQDN = (new URL(tab[0].url)).host;
				chrome.tabs.captureVisibleTab(tab[0].windowId, {
					format: 'jpeg',
					quality: 100
				}, ss => {
					fetch(ss).then(ssd => ssd.blob()).then(ssd => {
						let pic = URL.createObjectURL(ssd);
						chrome.downloads.download({
							url: pic,
							filename: '[' + tabFQDN + '] ' + Math.round((new Date()).getTime() / 1000) + '.jpg',
							saveAs: true
						});
					});
				});
			}
		});
		sr(true);
	}
	return true;
});
chrome.runtime.onInstalled.addListener(g => {
	if (g.reason == 'install') {
		chrome.runtime.openOptionsPage();
		showreply('Hello!', 'Please set your token to begin.');
	}
});