const Cc = Components.classes,
	Ci = Components.interfaces;
function ignoreCF(h) {
	return /(cloudflare((|support|warp)|\-(dns|free|ipfs|quic)))\.com$/.test(h) ? true : false;
}
let knownCF = [];
let CFBlocking = {
	observe: function (subject, topic, data) {
		let httpChl = subject.QueryInterface(Ci.nsIHttpChannel),
			reqURL = subject.URI.spec;
		if (reqURL.indexOf('http') === 0 && reqURL.indexOf('.archive.org/') === -1) {
			let hostN = (new URL(reqURL)).hostname;
			if (topic == 'http-on-modify-request') {
				if (knownCF.includes(hostN)) {
					httpChl.cancel(Cr.NS_BINDING_ABORTED);
				}
			}
			if (topic == 'http-on-examine-response') {
				let rayid = '';
				try {
					rayid = httpChl.getResponseHeader('cf-ray');
				} catch (e) {}
				if (rayid.length > 4 && !ignoreCF(hostN)) {
					if (!knownCF.includes(hostN)) {
						knownCF.push(hostN);
					}
					httpChl.cancel(Cr.NS_BINDING_ABORTED);
				}
			}
		}
	}
};
let OBS = Cc['@mozilla.org/observer-service;1'].getService(Ci.nsIObserverService);
OBS.addObserver(CFBlocking, 'http-on-modify-request', false);
OBS.addObserver(CFBlocking, 'http-on-examine-response', false);