const args = process.argv,
	fs = require('fs'),
	rq = require('request');
const Fconfig = require('os').homedir() + '/.cfdomains.cfg';
let Dlist = './cfdomains_Data/';
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
function showUsage() {
	console.log("\n	\x1b[33mCfDomains\x1b[0m  v1.0.0\n");
	console.log('\x1b[36mUsage:\x1b[0m');
	console.log('	cfdomains \x1b[43mexample.com\x1b[0m');
	console.log('	cfdomains [--dir|--dl|--dl2]');
	console.log("	cfdomains --report \x1b[43mexample.com\x1b[0m\n");
	console.log('\x1b[36mDetails:\x1b[0m');
	console.log('	cfdomains \x1b[43mexample.com\x1b[0m');
	console.log('		return "\x1b[32my\x1b[0m", "\x1b[32mn\x1b[0m", or "\x1b[32me\x1b[0m"');
	console.log('			\x1b[32my\x1b[0m: Domain is on the list');
	console.log('			\x1b[32mn\x1b[0m: Domain is not listed');
	console.log("			\x1b[32me\x1b[0m: List data not found (fix it by running --dl)\n");
	console.log('	cfdomains --dir');
	console.log('		Change list directory');
	console.log('		\x1b[4mCurrent directory\x1b[0m: ' + Dlist + "\n");
	console.log('	cfdomains --dl|dl2');
	console.log('		\x1b[32mdl\x1b[0m: Download list files from Archive.org');
	console.log("		\x1b[32mdl2\x1b[0m: Download list files from deCloudflare git\n");
	console.log('	cfdomains --report \x1b[43mexample.com\x1b[0m');
	console.log('		Submit unlisted domain to #Karma for analysis');
	console.log("		\x1b[4mOnly the domain will be submitted. We NEVER record anything else.\x1b[0m\n");
	console.log();
	process.exit();
}
function chgLDR() {
	const rle = require('readline');
	let rl = rle.createInterface(process.stdin, process.stdout);
	console.log('Current save directory: ' + Dlist);
	console.log(' Set empty to use default location.');
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
function dlFile(bu, i) {
	return new Promise(function (ok, nope) {
		rq({
			uri: bu + 'cloudflare_' + i + '.json',
			headers: {
				'User-Agent': ''
			}
		}, function (e, r, b) {
			if (e) {
				forceExit('Connection Error while downloading list ' + i);
			}
			if (r.statusCode != 200) {
				forceExit('Server error ' + r.statusCode);
			}
			try {
				JSON.parse(b)
			} catch (e1) {
				forceExit('Bad Data Error while downloading list ' + i);
			}
			fs.writeFileSync(Dlist + i, b);
			ok();
		});
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
	console.log('Downloading lists: ' + bu);
	let w, names = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
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
	console.log("Done!\n");
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
function reporter(i) {
	return new Promise(function (ok, nope) {
		rq({
			uri: 'https://karma.clearnetonion.eu.org/api/is_cf.php',
			body: 'ana=1&f=' + i,
			method: 'POST',
			headers: {
				'User-Agent': 'CfDomains',
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
				forceExit('Bad Response Error A');
			}
			if (b == '[true,true]') {
				console.log('\x1b[32mResponse\x1b[0m: \x1b[33mNo\x1b[0m, It is already known. (try updating your local copy by --dl)');
			} else if (b == '[true,false]') {
				console.log('\x1b[32mResponse\x1b[0m: \x1b[35mYes\x1b[0m. It is not listed in \x1b[4mdelayed\x1b[0m channel at this moment.');
			} else {
				forceExit('Bad Response Error B');
			}
			ok();
		});
	});
}
async function reporters() {
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
		forceExit('Already exist, no need to report.');
	}
	console.log('Reporting ' + dom);
	let w = await reporter(dom);
	process.exit();
}
if (args.length <= 2) {
	showUsage();
} else if (args[2] === '--dir') {
	chgLDR();
} else if (args[2] === '--dl') {
	dlFiles('https://archive.org/download/crimeflare/');
} else if (args[2] === '--dl2') {
	dlFiles('https://git.disroot.org/dCF/deCloudflare/raw/branch/master/cloudflare_users/domains/');
} else if (args[2] === '--report') {
	reporters();
} else {
	queryDom();
}