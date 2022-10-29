let mul, csserr = '';
function chgmenu(z) {
	document.querySelectorAll('div[id^=submu_]').forEach(x => {
		x.style.display = (x.id.replace('submu_', '') == z) ? 'block' : 'none';
	});
	document.querySelectorAll('button[id^=chgmu_]').forEach(x => {
		x.disabled = (x.id.replace('chgmu_', '') == z) ? true : false;
	});
	if (z == 13) {
		browser.browsingData.removeCache({});
	}
}
function savekv(k, v) {
	browser.storage.local.set({
		[k]: v
	});
}
function saveme() {
	document.body.style.display = 'none';
	browser.browsingData.removeCache({});
	let junk = '',
		mycss = [];
	junk = document.querySelector("input[type=radio][name='stp1_1']:checked").value;
	savekv('stp1_1', (['0', 'c', 'cr', 'tr'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_1_1').value.length == 7) {
		mycss.push("body#webpage,form#msf{background-color:" + document.getElementById('iact_1_1').value + "}");
	}
	if (junk == 'cr') {
		mycss.push("body{background-position:center center;background-repeat:no-repeat;background-attachment:fixed;background-size:cover;background-image:url(https://ombrelo.eu.org/dosiero/bildo/ekranfono)}");
	}
	if (junk == 'tr') {
		mycss.push("body{background-position:center center;background-repeat:no-repeat;background-attachment:fixed;background-size:cover;background-image:url(http://ombrelo.x66j7jej74efeulffzy3hu3p4dtfruiwb3vv6ec7b5bxlkogxw5vnpid.onion/dosiero/bildo/ekranfono)}");
	}
	junk = document.querySelector("input[type=radio][name='stp1_2']:checked").value;
	savekv('stp1_2', (['0', 'y'].includes(junk) ? junk : '0'));
	if (junk == 'y') {
		mycss.push("hr{opacity:0}");
	}
	junk = document.querySelector("input[type=radio][name='stp2_1']:checked").value;
	savekv('stp2_1', (['0', 'c', 'bl'].includes(junk) ? junk : '0'));
	if (junk == 'bl') {
		mycss.push("span#srchbox,input#qbar.srch_input{background:black}");
		mycss.push("span#srchbox input[type=image]{filter:invert(1)}");
	}
	if (junk == 'c' && document.getElementById('iact_2_1').value.length == 7) {
		mycss.push("span#srchbox,input#qbar.srch_input{background:" + document.getElementById('iact_2_1').value + "}");
		mycss.push("span#srchbox input[type=image]{display:none}");
	}
	junk = document.querySelector("input[type=radio][name='stp2_2']:checked").value;
	savekv('stp2_2', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_2_2').value.length == 7) {
		mycss.push("span#srchbox{border:1px solid " + document.getElementById('iact_2_2').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp2_3']:checked").value;
	savekv('stp2_3', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_2_3').value.length == 7) {
		mycss.push("input#qbar.srch_input{color:" + document.getElementById('iact_2_3').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp3_1']:checked").value;
	savekv('stp3_1', (['0', 'y'].includes(junk) ? junk : '0'));
	if (junk == 'y') {
		mycss.push("span#srchbox input[type=image],img#clrme{display:none}");
	}
	junk = document.querySelector("input[type=radio][name='stp3_2']:checked").value;
	savekv('stp3_2', (['0', 'y'].includes(junk) ? junk : '0'));
	if (junk == 'y') {
		mycss.push("div#ctbx details img,img#clrme{filter:invert(1)}");
	}
	junk = document.querySelector("input[type=radio][name='stp4_1']:checked").value;
	savekv('stp4_1', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_4_1').value.length == 7) {
		mycss.push("select.srch_input{background:" + document.getElementById('iact_4_1').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp4_2']:checked").value;
	savekv('stp4_2', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_4_2').value.length == 7) {
		mycss.push("select.srch_input{color:" + document.getElementById('iact_4_2').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp5_1']:checked").value;
	savekv('stp5_1', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_5_1').value.length == 7) {
		mycss.push("table#cats td label.lbon,table#cats td label.lbon:hover{background:" + document.getElementById('iact_5_1').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp5_2']:checked").value;
	savekv('stp5_2', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_5_2').value.length == 7) {
		mycss.push("table#cats td label.lbon{color:" + document.getElementById('iact_5_2').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp6_1']:checked").value;
	savekv('stp6_1', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_6_1').value.length == 7) {
		mycss.push("table#cats td label:not(.lbon):hover{background:" + document.getElementById('iact_6_1').value + " !important}")
		mycss.push("table#cats td label,table#cats td summary{background:" + document.getElementById('iact_6_1').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp6_2']:checked").value;
	savekv('stp6_2', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_6_2').value.length == 7) {
		mycss.push("table#cats td label,table#cats td summary{color:" + document.getElementById('iact_6_2').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp6_3']:checked").value;
	savekv('stp6_3', (['0', 'y'].includes(junk) ? junk : '0'));
	if (junk == 'y') {
		mycss.push("form#msf:not(:hover) span#scjs{display:unset !important}");
	}
	junk = document.querySelector("input[type=radio][name='stp6_4']:checked").value;
	savekv('stp6_4', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_6_4').value.length == 7) {
		mycss.push("form#msf{background:" + document.getElementById('iact_6_4').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp7_1']:checked").value;
	savekv('stp7_1', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_7_1').value.length == 7) {
		mycss.push("blockquote.nfobox{border:1px solid " + document.getElementById('iact_7_1').value + " !important}");
	}
	junk = document.querySelector("input[type=radio][name='stp7_2']:checked").value;
	savekv('stp7_2', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_7_2').value.length == 7) {
		mycss.push("span.sx_tx{color:" + document.getElementById('iact_7_2').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp8_1']:checked").value;
	savekv('stp8_1', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_8_1').value.length == 7) {
		mycss.push("a:not(.ind),details summary{color:" + document.getElementById('iact_8_1').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp8_2']:checked").value;
	savekv('stp8_2', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_8_2').value.length == 7) {
		mycss.push("a:not(.ind):hover,details summary:hover{color:" + document.getElementById('iact_8_2').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp9_1']:checked").value;
	savekv('stp9_1', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_9_1').value.length == 7) {
		mycss.push("span.sx_l,span.sx_l2{color:" + document.getElementById('iact_9_1').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp10_1']:checked").value;
	savekv('stp10_1', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_10_1').value.length == 7) {
		mycss.push("span.sx_d,a.ind{color:" + document.getElementById('iact_10_1').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp10_2']:checked").value;
	savekv('stp10_2', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_10_2').value.length == 7) {
		mycss.push("a:not(.mitm) > span.marker{text-decoration:underline " + document.getElementById('iact_10_2').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp11_1']:checked").value;
	savekv('stp11_1', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_11_1').value.length == 7) {
		mycss.push("blockquote.seres,blockquote.seres:not(:hover){background:" + document.getElementById('iact_11_1').value + "}");
		mycss.push("hr.dotd{border:1px solid " + document.getElementById('iact_11_1').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp11_2']:checked").value;
	savekv('stp11_2', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_11_2').value.length == 7) {
		mycss.push("blockquote.seres,blockquote.seres:not(:hover){border:1px solid " + document.getElementById('iact_11_2').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp11_3']:checked").value;
	savekv('stp11_3', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_11_3').value.length == 7) {
		mycss.push("blockquote.seres:hover{background:" + document.getElementById('iact_11_3').value + "}");
		mycss.push("blockquote.seres:hover hr.dotd{border:1px solid " + document.getElementById('iact_11_3').value + "}");
	}
	junk = document.querySelector("input[type=radio][name='stp11_4']:checked").value;
	savekv('stp11_4', (['0', 'c'].includes(junk) ? junk : '0'));
	if (junk == 'c' && document.getElementById('iact_11_4').value.length == 7) {
		mycss.push("blockquote.seres:hover{border:1px solid " + document.getElementById('iact_11_4').value + "}");
	}
	document.querySelectorAll('input[type=color][id^=iact_]').forEach(t => {
		savekv(t.id.replace('iact_', 'clrvar_'), (t.value.length == 7 ? t.value : '#ffffff'));
	});
	let isbad = false,
		utest;
	junk = document.getElementById('stp12_css').value.split("\n").filter(v => v != '');
	junk.forEach(t => {
		t = t.toLowerCase().replace('"', "'").replace("\t", ' ').trim();
		if (!/^(.*)\{(.*)\}$/.test(t) || t.includes('[]') || t.includes('scri') || t.includes('url(') || t.includes('//')) {
			isbad = true;
			console.log('!', t);
		}
		t = t.split('{')[0];
		try {
			utest = document.querySelectorAll(t);
			utest = document.querySelectorAll("a," + t + ",b");
		} catch (u) {
			isbad = true;
			console.log('!', u);
		}
	});
	if (!isbad) {
		savekv('stp12_css', junk.join("\n"));
		junk.forEach(x => {
			mycss.push(x);
		});
	} else {
		alert(csserr);
	}
	savekv('fcss', mycss);
	document.body.style.display = 'block';
}
document.addEventListener('DOMContentLoaded', function () {
	if (location.search != '?ss') {
		browser.tabs.query({
			active: true,
			currentWindow: true
		}).then(t => {
			if (t[0]) {
				browser.tabs.update(t[0].id, {
					active: true,
					url: browser.runtime.getURL('dt.html?ss')
				});
			}
		}, () => {});
	}
	document.body.bgColor = '#f9f9fa';
	document.querySelectorAll('div[id^=submu_]').forEach(x => {
		if (x.id != 'submu_99') {
			x.style.display = 'none';
		}
	});
	document.querySelectorAll('map area[id^=chgma_]').forEach(x => {
		let xi = x.id.replace('chgma_', '');
		x.addEventListener('click', (y) => {
			y.preventDefault();
			chgmenu(xi);
		});
	});
	document.querySelectorAll('button[id^=chgmu_]').forEach(x => {
		let xi = x.id.replace('chgmu_', '');
		x.addEventListener('click', () => {
			chgmenu(xi);
		});
	});
	document.querySelectorAll('input[type=color][id^=iact_]').forEach(x => {
		let xi = x.id.replace('iact_', 'stp');
		x.addEventListener('click', () => {
			document.querySelector('input[type=radio][name=' + xi + '][value=c]').checked = true;
		});
	});
	browser.storage.local.get().then(d => {
		if (d.stp1_1 != undefined) {
			Object.keys(d).forEach(x => {
				if (x.startsWith('clrvar_') || x == 'stp12_css') {
					document.getElementById(x.replace('clrvar_', 'iact_')).value = d[x];
				}
				if (x.startsWith('stp') && x != 'stp12_css') {
					if (document.querySelector("input[type=radio][name='" + x + "'][value='" + d[x] + "']")) {
						document.querySelector("input[type=radio][name='" + x + "'][value='" + d[x] + "']").checked = true;
					}
				}
			});
		}
		fetch('i18n/' + (d.ul || 'eo') + '.json', {
			method: 'GET'
		}).then(j => j.json()).then(j => {
			document.querySelectorAll('span[transk]').forEach(x => {
				x.innerText = j[x.getAttribute('transk')];
			});
			mul = d.ul || 'eo';
			csserr = j['er1'];
		});
	}, () => {});
	document.body.style.display = 'block';
	document.getElementById('impfile').addEventListener('change', function (ev) {
		let fr = new FileReader();
		fr.onload = function () {
			let junk = fr.result;
			if (junk.startsWith('{') && junk.endsWith('}')) {
				junk = JSON.parse(junk);
				if (junk.fcss != undefined) {
					Object.keys(junk).forEach(x => {
						savekv(x, junk[x]);
					});
				}
				browser.browsingData.removeCache({});
				location.reload(true);
			}
		}
		fr.readAsText(ev.target.files[0]);
	});
	document.getElementById('bt_save').addEventListener('click', () => {
		document.documentElement.style.animation = null;
		document.documentElement.offsetHeight;
		saveme();
		document.documentElement.style.animation = 'yfr 0.3s 1';
	});
	document.getElementById('bt_reld').addEventListener('click', () => {
		location.reload(true);
	});
	document.getElementById('bt_rst').addEventListener('click', () => {
		browser.storage.local.clear().then(() => {
			browser.storage.local.set({
				'ul': mul
			}).then(() => {
				location.reload(true);
			});
		});
	});
	document.getElementById('bt_opwc').addEventListener('click', () => {
		browser.tabs.create({
			active: true,
			url: 'https://ombrelo.eu.org/'
		});
	});
	document.getElementById('bt_opwt').addEventListener('click', () => {
		browser.tabs.create({
			active: true,
			url: 'http://ombrelo.x66j7jej74efeulffzy3hu3p4dtfruiwb3vv6ec7b5bxlkogxw5vnpid.onion/'
		});
	});
	document.getElementById('bt_opwg').addEventListener('click', () => {
		browser.tabs.create({
			active: true,
			url: 'http://ombrelo.x66j7jej74efeulffzy3hu3p4dtfruiwb3vv6ec7b5bxlkogxw5vnpid.onion/oo/desegno/#ul=' + mul
		});
	});
	document.getElementById('bt_exp').addEventListener('click', () => {
		browser.storage.local.get().then(d => {
			delete d.ul;
			let tmpFile, tmpDL;
			tmpFile = new Blob([JSON.stringify(d)], {
				type: 'text/plain'
			});
			tmpDL = document.createElement('a');
			tmpDL.download = 'mia.json';
			tmpDL.href = window.URL.createObjectURL(tmpFile);
			tmpDL.style.display = 'none';
			document.body.appendChild(tmpDL);
			tmpDL.click();
		}, () => {});
	});
	document.getElementById('bt_imp').addEventListener('click', () => {
		document.getElementById('impfile').click();
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
	document.addEventListener('contextmenu', function (z) {
		if (z.target.tagName != 'TEXTAREA') {
			z.preventDefault();
		}
	});
});