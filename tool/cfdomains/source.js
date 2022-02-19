const args = process.argv,
	fs = require('fs');
const {
	Curl,
	CurlHttpVersion
} = require('node-libcurl');
const cur1 = new Curl();
cur1.setOpt('SSL_VERIFYPEER', false);
cur1.setOpt('HTTP_VERSION', CurlHttpVersion.V2PriorKnowledge);
cur1.setOpt('FOLLOWLOCATION', true);
cur1.setOpt('CONNECTTIMEOUT', 8);
cur1.setOpt('TIMEOUT', 600);
const Fconfig = require('os').homedir() + '/.cfdomains.cfg',
	Fproxy = require('os').homedir() + '/.cfdomains_sox.cfg';
let Dlist = './cfdomains_Data/',
	myproxy = '';
function forceExit(m) {
	console.log('\x1b[31m%s\x1b[0m', m);
	process.exit();
}
function is_domain(x) {
	return /^([a-z0-9]{1})([a-z0-9.-]{0,254})\.([a-z]{2,50})$/.test(x);
}
if (fs.existsSync(Fconfig)) {
	Dlist = fs.readFileSync(Fconfig);
	if (!fs.existsSync(Dlist)) {
		try {
			fs.unlinkSync(Fconfig);
		} catch (e) {}
		forceExit('List directory is not okay! Fix this by running --dir');
	}
}
if (fs.existsSync(Fproxy)) {
	myproxy = fs.readFileSync(Fproxy);
	if (myproxy.indexOf(':') < 6) {
		myproxy = '';
	}
}
function showUsage() {
	console.log("\n	\x1b[33mCfDomains\x1b[0m  v1.0.2\n");
	console.log('\x1b[36mUsage:\x1b[0m');
	console.log('	cfdomains \x1b[43mexample.com\x1b[0m');
	console.log('	cfdomains --dir');
	console.log('	cfdomains --proxy');
	console.log('	cfdomains [--dl|--dl2][ |0,1,...,a,b,...z]');
	console.log("	cfdomains [--report|--delist] \x1b[43mexample.com\x1b[0m\n");
	console.log('\x1b[36mDetails:\x1b[0m');
	console.log('	cfdomains \x1b[43mexample.com\x1b[0m');
	console.log('		return "\x1b[32my\x1b[0m", "\x1b[32mn\x1b[0m", or "\x1b[32me\x1b[0m"');
	console.log('			\x1b[32my\x1b[0m: Domain is on the list');
	console.log('			\x1b[32mn\x1b[0m: Domain is not listed');
	console.log("			\x1b[32me\x1b[0m: List data not found (fix it by running --dl)\n");
	console.log('	cfdomains --dir');
	console.log('		Change list directory');
	console.log('		\x1b[4mCurrent directory\x1b[0m: ' + Dlist + "\n");
	console.log('	cfdomains --proxy');
	console.log('		Set or Unset SOCKS proxy');
	console.log('		\x1b[4mCurrent SOCKS proxy\x1b[0m: ' + myproxy + "\n");
	console.log('	cfdomains --dl|dl2');
	console.log('	cfdomains --dl|dl2 \x1b[43ma,b,c\x1b[0m');
	console.log('		\x1b[32mdl\x1b[0m: Download list files from Archive.org');
	console.log('		\x1b[32mdl2\x1b[0m: Download list files from deCloudflare git');
	console.log("		\x1b[32ma,b,c\x1b[0m: Download only these files (comma-separated)\n");
	console.log('	cfdomains --report|delist \x1b[43mexample.com\x1b[0m');
	console.log('		Submit domain to #Karma for automated analysis');
	console.log('		\x1b[4mOnly the domain will be submitted\x1b[0m. We NEVER record anything else.');
	console.log('		\x1b[32mreport\x1b[0m: Report not-yet-listed domain (New Cloudflare)');
	console.log("		\x1b[32mdelist\x1b[0m: Report currently-listed domain (Left Cloudflare)\n");
	console.log();
	process.exit();
}
function chgLDR() {
	const rle = require('readline');
	let rl = rle.createInterface(process.stdin, process.stdout);
	console.log('Current save directory: ' + Dlist);
	console.log('Set "empty" to use default location.');
	rl.question('List save directory: ', (l) => {
		rl.close();
		if (l.length > 1 && l !== 'empty') {
			if (l.indexOf('/', l.length - 1) !== -1) {
				if (fs.existsSync(l) && fs.lstatSync(l).isDirectory()) {
					fs.writeFileSync(Fconfig, l);
				} else {
					forceExit('Directory not found');
				}
			} else {
				forceExit('Directory is not ended with /');
			}
		} else {
			try {
				fs.unlinkSync(Fconfig);
			} catch (e) {}
		}
		process.exit();
	});
}
function chgPROXY() {
	const rle = require('readline');
	let rl = rle.createInterface(process.stdin, process.stdout);
	console.log('Current SOCKS Proxy: ' + myproxy);
	console.log('Set none to use direct connection.');
	rl.question('Input SOCKS Proxy [IP:Port]: ', (l) => {
		rl.close();
		if (/^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\:([0-9]{1,5})$/.test(l)) {
			fs.writeFileSync(Fproxy, l);
		} else {
			try {
				fs.unlinkSync(Fproxy);
			} catch (e) {}
		}
		process.exit();
	});
}
function dlFile(bu, i) {
	return new Promise((okay, nope) => {
		const curl = cur1.dupHandle(false);
		curl.setOpt('URL', bu + 'cloudflare_' + i + '.json');
		curl.setOpt('USERAGENT', 'CfDomains');
		if (myproxy != '') {
			curl.setOpt('HTTPPROXYTUNNEL', 1);
			curl.setOpt('PROXY', 'socks5h://' + myproxy + '/');
		}
		curl.on('error', (er, ec) => {
			curl.close();
			console.log('\x1b[31m%s\x1b[0m', er);
			forceExit('Connection Error while downloading list ' + i);
		});
		curl.on('end', (sc, b) => {
			curl.close();
			if (sc != 200) {
				forceExit('Server error ' + r.statusCode);
			}
			try {
				JSON.parse(b)
			} catch (e1) {
				forceExit('Bad Data Error while downloading list ' + i);
			}
			fs.writeFileSync(Dlist + i, b);
			okay();
		});
		curl.perform();
	});
}
function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;
	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]
		];
	}
	return array;
}
async function dlFiles(bu) {
	if (!fs.existsSync(Dlist)) {
		fs.mkdirSync(Dlist);
	}
	if (!fs.existsSync(Dlist)) {
		forceExit('Directory not found!');
	}
	if (myproxy == '') {
		console.log('\x1b[36mNOTICE\x1b[0m: You are not using any proxy.');
	}
	console.log('Downloading lists: ' + bu);
	let w, names = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	let aonly = args[3];
	if (aonly && aonly.length > 0) {
		let names1 = [];
		for (x of aonly.split(',')) {
			if (names.indexOf(x) > -1) {
				names1.push(x);
			}
		}
		if (names1.length > 0) {
			names = names1;
		} else {
			forceExit('invalid input');
		}
	}
	shuffle(names);
	for (x of names) {
		console.log('Downloading ' + x);
		w = await dlFile(bu, x);
	}
	for (x of names) {
		console.log('Testing ' + x);
		if (!fs.existsSync(Dlist + x)) {
			forceExit('File not found');
		}
		let data = fs.readFileSync(Dlist + x, {
			encoding: 'utf8'
		});
		try {
			JSON.parse(data)
		} catch (e) {
			forceExit('Bad data found');
		}
	}
	process.exit();
}
function queryDom() {
	let dom = args[2];
	if (!is_domain(dom)) {
		showUsage();
	}
	if (!fs.existsSync(Dlist + dom[0])) {
		process.stdout.write('e');
		process.exit();
	}
	let data = fs.readFileSync(Dlist + dom[0], {
		encoding: 'utf8'
	});
	data = JSON.parse(data);
	if (data[dom]) {
		process.stdout.write('y');
	} else {
		process.stdout.write('n');
	}
	process.exit();
}
function reporter(dom, t) {
	return new Promise((okay, nope) => {
		const curl = cur1.dupHandle(false);
		curl.setOpt('URL', 'https://karma.clearnetonion.eu.org/api/is_cf.php');
		curl.setOpt('USERAGENT', 'CfDomains');
		if (myproxy != '') {
			curl.setOpt('HTTPPROXYTUNNEL', 1);
			curl.setOpt('PROXY', 'socks5h://' + myproxy + '/');
		}
		curl.setOpt(Curl.option.POST, true);
		curl.setOpt(Curl.option.POSTFIELDS, 'ana=' + t + '&f=' + dom);
		curl.on('error', (er, ec) => {
			curl.close();
			console.log('\x1b[31m%s\x1b[0m', er);
			forceExit('Connection Error');
		});
		curl.on('end', (sc, b) => {
			curl.close();
			if (sc != 404) {
				forceExit('Server error');
			}
			try {
				JSON.parse(b)
			} catch (e1) {
				forceExit('Bad Response Error');
			}
			console.log('Done!');
			okay(b);
		});
		curl.perform();
	});
}
async function reporters(yn) {
	let dom = args[3];
	if (!is_domain(dom)) {
		showUsage();
	}
	if (!fs.existsSync(Dlist + dom[0])) {
		forceExit('List not found');
	}
	let data = fs.readFileSync(Dlist + dom[0], {
		encoding: 'utf8'
	});
	data = JSON.parse(data);
	if (data[dom]) {
		if (yn == 'y') {
			forceExit('Already exist, no need to report.');
		}
	} else {
		if (yn == 'n') {
			forceExit('Already not listed, no need to report.');
		}
	}
	if (myproxy == '') {
		console.log('\x1b[36mNOTICE\x1b[0m: You are not using any proxy.');
	}
	console.log('Reporting ' + dom);
	let w = await reporter(dom, yn);
	if (yn == 'y') {
		if (w == '[true,true]') {
			console.log('\x1b[32mResponse\x1b[0m: \x1b[33mNo\x1b[0m, It is already known. (try updating your local copy by --dl)');
		} else if (w == '[true,false]') {
			console.log('\x1b[32mResponse\x1b[0m: \x1b[35mRequest received\x1b[0m. It is not listed in \x1b[4mdelayed\x1b[0m channel at this moment.');
		} else {
			forceExit('Bad Response Error!');
		}
	} else {
		if (w == '[true,false]') {
			console.log('\x1b[32mResponse\x1b[0m: \x1b[33mNo\x1b[0m, It is not listed. (try updating your local copy by --dl)');
		} else if (w == '[true,true]') {
			console.log('\x1b[32mResponse\x1b[0m: \x1b[35mRequest received\x1b[0m. It is listed in \x1b[4mdelayed\x1b[0m channel at this moment.');
		} else {
			forceExit('Bad Response Error!');
		}
	}
	process.exit();
}
if (args.length <= 2) {
	showUsage();
} else if (args[2] === '--dir') {
	chgLDR();
} else if (args[2] === '--proxy') {
	chgPROXY();
} else if (args[2] === '--dl') {
	dlFiles('https://archive.org/download/crimeflare/');
} else if (args[2] === '--dl2') {
	dlFiles('https://git.disroot.org/dCF/deCloudflare/raw/branch/master/cloudflare_users/domains/');
} else if (args[2] === '--report') {
	reporters('y');
} else if (args[2] === '--delist') {
	reporters('n');
} else {
	queryDom();
}