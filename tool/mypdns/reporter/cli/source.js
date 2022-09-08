// based on CrimeFlare::deCloudflare#cli-cfdomains
// http://crimeflare.eu.org
const version = '1.0.3.3';
const args = process.argv,
	argl = process.argv.length,
	fs = require('fs'),
	rq = require('request'),
	fToken = require('os').homedir() + '/.mypdnsrep_token';
let token = fs.existsSync(fToken) ? fs.readFileSync(fToken) : '';
function forceExit(m) {
	console.log(m);
	process.exit();
}
function testToken(x) {
	return /^([0-9a-zA-Z_\-]{20})$/.test(x);
}
function testCAT(x) {
	return /^([a-zA-Z_:]{4,20})$/.test(x);
}
function testURL(x) {
	return /^http(|s):\/\/([a-z0-9]{1})([a-z0-9.-]{0,254})\.([a-z]{2,50})(|\/(.*))$/.test(x);
}
function toBinary(string) {
	const codeUnits = new Uint16Array(string.length);
	for (let i = 0; i < codeUnits.length; i++) {
		codeUnits[i] = string.charCodeAt(i);
	}
	return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
}
function reporter(cat, url, msg) {
	return new Promise(function (ok, nope) {
		rq({
			uri: 'https://karma.crimeflare.eu.org:1984/api/mypdns/',
			body: 'k=' + token + '&cat=' + encodeURIComponent(cat) + '&url=' + encodeURIComponent(url) + (msg == '' ? '' : '&wmemo=' + encodeURIComponent(toBinary(msg))),
			method: 'POST',
			headers: {
				'User-Agent': 'mypdnsrep-cli',
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}, function (e, r, b) {
			if (e) {
				forceExit('Connection Error');
			}
			if (r.statusCode != 404) {
				forceExit('Server error');
			}
			try {
				JSON.parse(b)
			} catch (e1) {
				forceExit('Bad Response Error');
			}
			ok(b);
		});
	});
}
async function reporting(cat, url, msg) {
	console.log('Reporting ' + cat);
	let w = await reporter(cat, url, msg);
	if (w == '{"reply":"roger"}') {
		console.log('Done');
	} else if (w.startsWith('{"reply":"')) {
		w = JSON.parse(w);
		console.log('\x1b[36mReply:\x1b[0m ' + w['reply']);
		if (w['reply'].indexOf('Issue for this domain is already exist') == 0) {
			console.log('\x1b[36mIssue:\x1b[0m https://mypdns.org/my-privacy-dns/matrix/-/issues/' + w['issue']);
		}
		process.exit();
	} else {
		forceExit('Unknown Error');
	}
	process.exit();
}
function chgTOKEN() {
	const rle = require('readline');
	let rl = rle.createInterface(process.stdin, process.stdout);
	rl.question('Input your Access Token: ', (l) => {
		rl.close();
		if (testToken(l)) {
			fs.writeFileSync(fToken, l);
			if (token != '') {
				console.log("Your Access Token is changed.\n");
			} else {
				console.log("Welcome! Thank you for helping out this project.\n");
			}
		} else {
			try {
				fs.unlinkSync(fToken);
			} catch (e) {}
			if (token != '') {
				console.log("Your Access Token is cleared.\n");
			}
		}
		process.exit();
	});
}
if (argl == 3 && args[2] == 'token') {
	chgTOKEN();
} else if (argl == 4 || argl == 5) {
	if (!testToken(token)) {
		console.log("\n	Before you use \x1b[33mmypdnsrep\x1b[0m\n");
		console.log("	Your token is not set.\n");
		console.log('\x1b[36mCreate your token:\x1b[0m');
		console.log('	https://mypdns.org/-/profile/personal_access_tokens?name=mypdnsrep-cli&scopes=read_user,api');
		console.log('\x1b[36mHow to set Access Token:\x1b[0m');
		console.log("	Run 'mypdnsrep token'\n");
		process.exit();
	}
	let _cat = args[2],
		_url = args[3],
		_msg = (argl != 5) ? '' : args[4].replace(/ {2,}/g, ' ');
	if (!testCAT(_cat)) {
		forceExit('Invalid Category');
	}
	if (_url.indexOf('://') < 4) {
		_url = 'http://' + _url;
	}
	if (!testURL(_url)) {
		forceExit('Invalid URL');
	}
	reporting(_cat, _url, _msg);
} else {
	console.log("\n	\x1b[33mmypdnsrep\x1b[0m  v" + version + "\n");
	console.log('\x1b[36mUsage:\x1b[0m');
	console.log('	mypdnsrep token');
	console.log('		Edit your mypdns.org token');
	console.log('	mypdnsrep category URL|Domain[| Comment]');
	console.log("		report URL as category (see website for cat value)\n");
	process.exit();
}