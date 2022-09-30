let _done = false,
   notify = 'mypdnsdefender',
   myConfig = {},
   myActiveCats = [],
   _working = false,
   _updatelog = [],
   _wgctrl = new AbortController(),
   _wgsignal = _wgctrl.signal;
function dymd() {
   let t = new Date();
   return t.getUTCFullYear() + 'x' + t.getUTCMonth() + 'x' + t.getUTCDate() + 'x' + t.getUTCHours();
}
function is_valid_fqdn(s) {
   return (/^([a-z0-9]{1})([a-z0-9.-]{0,254})\.(([a-z]{2,50})|xn--([a-z0-9-]{2,60}))$/.test(s)) ? true : false;
}
function stopDownload() {
   _wgctrl.abort();
   _wgctrl = new AbortController();
   _wgsignal = _wgctrl.signal;
}
function doDownload(url) {
   return new Promise((g, b) => {
      fetch('https://mypdns.org/my-privacy-dns/matrix/-/raw/master/source/' + url + '?no_cache=' + dymd(), {
         method: 'GET',
         mode: 'no-cors',
         cache: 'force-cache',
         signal: _wgsignal
      }).then(r => r.text()).then(r => {
         g(r);
      }).catch(b);
   });
}
async function insertOBJ(o) {
   return new Promise((ok, ng) => {
      browser.storage.local.set(o).then(() => {
         ok();
      }, () => {
         ok();
      });
   });
}
async function importList(cats, withOnion) {
   let wtp = {};
   for (let rI of cats) {
      wtp = {};
      _updatelog.push('Downloading wildcard.list ' + rI[0]);
      junk = await doDownload(rI[0] + '/wildcard.list');
      if (junk.length < 4) {
         _updatelog.push('WARN: Download failed');
      } else {
         for (let jl of junk.split("\n")) {
            if (is_valid_fqdn(jl)) {
               wtp[rI[1] + '@' + jl] = 1;
            }
         }
      }
      _updatelog.push('Downloading domains.list ' + rI[0]);
      junk = await doDownload(rI[0] + '/domains.list');
      if (junk.length < 4) {
         _updatelog.push('WARN: Download failed');
      } else {
         for (let jl of junk.split("\n")) {
            if (is_valid_fqdn(jl)) {
               wtp[rI[1] + '@' + jl] = 1;
            }
         }
      }
      if (withOnion) {
         _updatelog.push('Downloading onions.list ' + rI[0]);
         junk = await doDownload(rI[0] + '/onions.list');
         if (junk.length < 4) {
            _updatelog.push('WARN: Download failed');
         } else {
            for (let jl of junk.split("\n")) {
               if (is_valid_fqdn(jl)) {
                  wtp[rI[1] + '@' + jl] = 1;
               }
            }
         }
      }
      if (Object.keys(wtp).length < 1) {
         _updatelog.push('Nothing to save');
         continue;
      }
      _updatelog.push('Saving list');
      await insertOBJ(wtp);
      wtp = {};
   }
   _updatelog.push('Done!');
}
function nocat_to_catname(c) {
   switch (c) {
      case 'nocat01':
         return 'adware';
         break;
      case 'nocat22':
         return 'coinblocker';
         break;
      case 'nocat02':
         return 'drugs';
         break;
      case 'nocat03':
         return 'gambling';
         break;
      case 'nocat04':
         return 'malicious';
         break;
      case 'nocat05':
         return 'movies';
         break;
      case 'nocat06':
         return 'news';
         break;
      case 'nocat07':
         return 'phishing';
         break;
      case 'nocat08':
         return 'politics';
         break;
      case 'nocat09':
         return 'porn';
         break;
      case 'nocat19':
         return 'pornstrict';
         break;
      case 'nocat15':
         return 'redirector';
         break;
      case 'nocat10':
         return 'religion';
         break;
      case 'nocat14':
         return 'scamming';
         break;
      case 'nocat11':
         return 'spyware';
         break;
      case 'nocat20':
         return 'torrent';
         break;
      case 'nocat12':
         return 'tracking';
         break;
      case 'nocat16':
         return 'typosquatting';
         break;
      case 'nocat13':
         return 'weapons';
         break;
      default:
         return '_error_';
         break;
   }
}
async function startDownload() {
   stopDownload();
   _updatelog = ['// Your settings are already saved. You can close this page.'];
   browser.storage.local.clear().then(r => {
      browser.storage.local.set({
         'conf': myConfig
      }).then(r => {
         if (_working) {
            _updatelog.push('Reading config');
            let whatDL = [],
               inclOnion = (myConfig['opt04'] && myConfig['opt04'] == 1) ? true : false;
            for (let rI in myConfig) {
               if (rI.startsWith('nocat') && myConfig[rI] == 1) {
                  switch (rI) {
                     case 'nocat01':
                        whatDL.push(['adware', 'nocat01']);
                        break;
                     case 'nocat22':
                        whatDL.push(['coinblocker', 'nocat22']);
                        break;
                     case 'nocat02':
                        whatDL.push(['drugs', 'nocat02']);
                        break;
                     case 'nocat03':
                        whatDL.push(['gambling', 'nocat03']);
                        break;
                     case 'nocat04':
                        whatDL.push(['malicious', 'nocat04']);
                        break;
                     case 'nocat05':
                        whatDL.push(['movies', 'nocat05']);
                        break;
                     case 'nocat06':
                        whatDL.push(['news', 'nocat06']);
                        break;
                     case 'nocat07':
                        whatDL.push(['phishing', 'nocat07']);
                        break;
                     case 'nocat08':
                        whatDL.push(['politics', 'nocat08']);
                        break;
                     case 'nocat09':
                        whatDL.push(['porn_filters/explicit_content', 'nocat09']);
                        break;
                     case 'nocat19':
                        whatDL.push(['porn_filters/strict_filters', 'nocat19']);
                        break;
                     case 'nocat15':
                        whatDL.push(['redirector', 'nocat15']);
                        break;
                     case 'nocat10':
                        whatDL.push(['religion', 'nocat10']);
                        break;
                     case 'nocat14':
                        whatDL.push(['scamming', 'nocat14']);
                        break;
                     case 'nocat11':
                        whatDL.push(['spyware', 'nocat11']);
                        break;
                     case 'nocat20':
                        whatDL.push(['torrent', 'nocat20']);
                        break;
                     case 'nocat12':
                        whatDL.push(['tracking', 'nocat12']);
                        break;
                     case 'nocat16':
                        whatDL.push(['typosquatting', 'nocat16']);
                        break;
                     case 'nocat13':
                        whatDL.push(['weapons', 'nocat13']);
                        break;
                  }
               }
            }
            importList(whatDL, inclOnion);
         } else {
            _updatelog.push('No category selected, no need to update.');
            _updatelog.push('Done!');
         }
      });
   });
}
function get_realdomain(w) {
   let wa = w.split('.');
   let wa_l = wa.length;
   if (wa_l < 3 || (wa_l == 4 && /^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/.test(w))) {
      return w;
   }
   wa.reverse();
   switch (wa[0]) {
      case 'ac':
         if (['com', 'edu', 'gov', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ad':
         if (['gov', 'nom'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ae':
         if (['ac', 'co', 'gov', 'mil', 'net', 'org', 'sch'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'aero':
         if (['accident-investigation', 'accident-prevention', 'aerobatic', 'aeroclub', 'aerodrome', 'agents', 'air-surveillance', 'air-traffic-control', 'aircraft', 'airline', 'airport', 'airtraffic', 'ambulance', 'amusement', 'association', 'author', 'ballooning', 'broker', 'caa', 'cargo', 'catering', 'certification', 'championship', 'charter', 'civilaviation', 'club', 'conference', 'consultant', 'consulting', 'control', 'council', 'crew', 'design', 'dgca', 'educator', 'emergency', 'engine', 'engineer', 'entertainment', 'equipment', 'exchange', 'express', 'federation', 'flight', 'freight', 'fuel', 'gliding', 'government', 'groundhandling', 'group', 'hanggliding', 'homebuilt', 'insurance', 'journal', 'journalist', 'leasing', 'logistics', 'magazine', 'maintenance', 'media', 'microlight', 'modelling', 'navigation', 'parachuting', 'paragliding', 'passenger-association', 'pilot', 'press', 'production', 'recreation', 'repbody', 'res', 'research', 'rotorcraft', 'safety', 'scientist', 'services', 'show', 'skydiving', 'software', 'student', 'trader', 'trading', 'trainer', 'union', 'workinggroup', 'works'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'af':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ag':
         if (['co', 'com', 'edu', 'gov', 'net', 'nom', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ai':
         if (['com', 'gov', 'net', 'off', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'al':
         if (['com', 'edu', 'gov', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'am':
         if (['co', 'com', 'commune', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ao':
         if (['co', 'ed', 'gov', 'gv', 'it', 'og', 'pb'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ar':
         if (['bet', 'com', 'coop', 'edu', 'gob', 'gov', 'int', 'mil', 'musica', 'mutual', 'net', 'org', 'senasa', 'tur'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'as':
         if (wa[1] == 'gov') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'at':
         if (wa[1] == 'ac' && wa[3] != undefined) {
            if (wa[2] == 'sth') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (['ac', 'co', 'gv', 'or', 'priv'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'au':
         if (wa[1] == 'gov' && wa[3] != undefined) {
            if (['act', 'nsw', 'nt', 'qld', 'sa', 'tas', 'vic', 'wa'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'edu' && wa[3] != undefined) {
            if (['act', 'catholic', 'eq', 'nsw', 'nt', 'qld', 'sa', 'tas', 'vic', 'wa'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (['act', 'asn', 'com', 'conf', 'csiro', 'edu', 'gov', 'id', 'info', 'net', 'nsw', 'nt', 'org', 'oz', 'qld', 'sa', 'tas', 'vic', 'wa'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'aw':
         if (['com', 'gov'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ax':
         if (wa[1] == 'gov') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'az':
         if (['biz', 'com', 'edu', 'gov', 'info', 'int', 'mil', 'name', 'net', 'org', 'pp', 'pro'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ba':
         if (['co', 'com', 'edu', 'gov', 'mil', 'net', 'org', 'rs'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'bb':
         if (['biz', 'co', 'com', 'edu', 'gov', 'info', 'net', 'org', 'store', 'tv'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'bd':
         if (wa[1] == 'org' && wa[3] != undefined) {
            if (wa[2] == 'judiciary') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (['ac', 'co', 'com', 'edu', 'gov', 'info', 'mil', 'net', 'org', 'sw', 'tv'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'be':
         if (['ac', 'gov'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'bf':
         if (wa[1] == 'gov') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'bg':
         if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'gov', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'bh':
         if (['biz', 'cc', 'com', 'edu', 'gov', 'info', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'bi':
         if (['ac', 'co', 'com', 'edu', 'gouv', 'gov', 'info', 'int', 'mil', 'net', 'or', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'bj':
         if (['asso', 'barreau', 'gouv'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'bm':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'bn':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'bo':
         if (['academia', 'agro', 'arte', 'blog', 'bolivia', 'ciencia', 'com', 'cooperativa', 'democracia', 'deporte', 'ecologia', 'economia', 'edu', 'empresa', 'gob', 'gov', 'indigena', 'industria', 'info', 'int', 'medicina', 'mil', 'movimiento', 'musica', 'natural', 'net', 'nombre', 'noticias', 'org', 'patria', 'plurinacional', 'politica', 'profesional', 'pueblo', 'revista', 'salud', 'tecnologia', 'tksat', 'transporte', 'tv', 'web', 'wiki'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'br':
         if (wa[1] == 'gov' && wa[3] != undefined) {
            if (['ac', 'al', 'am', 'ap', 'ba', 'ce', 'df', 'es', 'go', 'ma', 'mg', 'ms', 'mt', 'pa', 'pb', 'pe', 'pi', 'pr', 'rj', 'rn', 'ro', 'rr', 'rs', 'sc', 'se', 'sp', 'to'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (['9guacu', 'abc', 'adm', 'adv', 'agr', 'aju', 'am', 'anani', 'aparecida', 'app', 'arq', 'art', 'ato', 'b', 'barueri', 'belem', 'bhz', 'bib', 'bio', 'blog', 'bmd', 'boavista', 'bsb', 'campinagrande', 'campinas', 'caxias', 'cim', 'cng', 'cnt', 'com', 'contagem', 'coop', 'coz', 'cri', 'cuiaba', 'curitiba', 'def', 'des', 'det', 'dev', 'ecn', 'eco', 'edu', 'emp', 'enf', 'eng', 'esp', 'etc', 'eti', 'far', 'feira', 'flog', 'floripa', 'fm', 'fnd', 'fortal', 'fot', 'foz', 'fst', 'g12', 'geo', 'ggf', 'goiania', 'gov', 'gru', 'imb', 'ind', 'inf', 'jab', 'jampa', 'jdf', 'joinville', 'jor', 'jus', 'leg', 'lel', 'log', 'londrina', 'macapa', 'maceio', 'manaus', 'maringa', 'mat', 'med', 'mil', 'morena', 'mp', 'mus', 'natal', 'net', 'niteroi', 'nom', 'not', 'ntr', 'odo', 'ong', 'org', 'osasco', 'palmas', 'poa', 'ppg', 'pro', 'psc', 'psi', 'pvh', 'qsl', 'radio', 'rec', 'recife', 'rep', 'ribeirao', 'rio', 'riobranco', 'riopreto', 'salvador', 'sampa', 'santamaria', 'santoandre', 'saobernardo', 'saogonca', 'seg', 'sjc', 'slg', 'slz', 'sorocaba', 'srv', 'taxi', 'tc', 'tec', 'teo', 'the', 'tmp', 'trd', 'tur', 'tv', 'udi', 'vet', 'vix', 'vlog', 'wiki', 'zlg'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'bs':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'bt':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'bw':
         if (['ac', 'co', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'by':
         if (['com', 'gov', 'mil', 'of'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'bz':
         if (['com', 'edu', 'gov', 'mil', 'net', 'nym', 'of', 'org', 'za'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ca':
         if (wa[1] == 'qc' && wa[3] != undefined) {
            if (wa[2] == 'gouv') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'pe' && wa[3] != undefined) {
            if (wa[2] == 'gouv') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'on' && wa[3] != undefined) {
            if (wa[2] == 'gouv') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (['ab', 'bc', 'gc', 'gnb', 'mb', 'nb', 'nf', 'nl', 'ns', 'nt', 'nu', 'on', 'pe', 'qc', 'sk', 'yk'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'cd':
         if (wa[1] == 'gov') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ch':
         if (wa[1] == 'admin') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ci':
         if (['ac', 'asso', 'co', 'com', 'ed', 'edu', 'go', 'gouv', 'int', 'md', 'net', 'or', 'org', 'presse', 'xn--aroport-bya'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ck':
         if (['biz', 'co', 'edu', 'gen', 'gov', 'info', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'cl':
         if (['co', 'gob', 'gov', 'mil'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'cm':
         if (['co', 'com', 'gov', 'net'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'cn':
         if (['ac', 'ah', 'bj', 'com', 'cq', 'edu', 'fj', 'gd', 'gov', 'gs', 'gx', 'gz', 'ha', 'hb', 'he', 'hi', 'hk', 'hl', 'hn', 'jl', 'js', 'jx', 'ln', 'mil', 'mo', 'net', 'nm', 'nx', 'org', 'qh', 'sc', 'sd', 'sh', 'sn', 'sx', 'tj', 'tw', 'xj', 'xn--55qx5d', 'xn--io0a7i', 'xn--od0alg', 'xz', 'yn', 'zj'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'co':
         if (['arts', 'com', 'edu', 'firm', 'gov', 'info', 'int', 'mil', 'net', 'nom', 'org', 'rec', 'web'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'com':
         if (['africa', 'ar', 'br', 'cn', 'co', 'de', 'eu', 'gb', 'gr', 'hu', 'jpn', 'kr', 'mex', 'no', 'qc', 'ru', 'sa', 'se', 'uk', 'us', 'uy', 'za'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'cr':
         if (['ac', 'co', 'ed', 'fi', 'go', 'or', 'sa'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'cu':
         if (['com', 'edu', 'gov', 'inf', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'cv':
         if (['com', 'edu', 'gov', 'int', 'net', 'nome', 'org', 'publ'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'cw':
         if (['com', 'edu', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'cx':
         if (wa[1] == 'gov') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'cy':
         if (['ac', 'biz', 'com', 'ekloges', 'gov', 'ltd', 'mil', 'name', 'net', 'org', 'parliament', 'press', 'pro', 'tm'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'cz':
         if (wa[1] == 'gov') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'dm':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'do':
         if (['art', 'com', 'edu', 'gob', 'gov', 'mil', 'net', 'org', 'sld', 'web'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'dz':
         if (['art', 'asso', 'com', 'edu', 'gov', 'net', 'org', 'pol', 'soc', 'tm'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ec':
         if (['com', 'edu', 'fin', 'gob', 'gov', 'info', 'k12', 'med', 'mil', 'net', 'org', 'pro'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ee':
         if (['aip', 'com', 'edu', 'fie', 'gov', 'lib', 'med', 'org', 'pri', 'riik'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'eg':
         if (['com', 'edu', 'eun', 'gov', 'mil', 'name', 'net', 'org', 'sci'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'es':
         if (['com', 'edu', 'gob', 'nom', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'et':
         if (['biz', 'com', 'edu', 'gov', 'info', 'name', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'fi':
         if (['aland', 'gov'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'fj':
         if (['ac', 'biz', 'com', 'gov', 'info', 'mil', 'name', 'net', 'org', 'pro'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'fk':
         if (['ac', 'co', 'gov', 'net', 'nom', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'fm':
         if (['com', 'edu', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'fr':
         if (['abr', 'abruzzo', 'aeroport', 'ag', 'agrigento', 'al', 'alessandria', 'alto-adige', 'altoadige', 'an', 'ancona', 'andria-barletta-trani', 'andria-trani-barletta', 'andriabarlettatrani', 'andriatranibarletta', 'ao', 'aosta', 'aosta-valley', 'aostavalley', 'aoste', 'ap', 'aq', 'aquila', 'ar', 'arezzo', 'ascoli-piceno', 'ascolipiceno', 'assedic', 'asso', 'asti', 'at', 'av', 'avellino', 'avocat', 'avoues', 'ba', 'balsan', 'balsan-sudtirol', 'balsan-suedtirol', 'bari', 'barletta-trani-andria', 'barlettatraniandria', 'bas', 'basilicata', 'belluno', 'benevento', 'bergamo', 'bg', 'bi', 'biella', 'bl', 'bn', 'bo', 'bologna', 'bolzano', 'bolzano-altoadige', 'bozen', 'bozen-sudtirol', 'bozen-suedtirol', 'br', 'brescia', 'brindisi', 'bs', 'bt', 'bulsan', 'bulsan-sudtirol', 'bulsan-suedtirol', 'bz', 'ca', 'cagliari', 'cal', 'calabria', 'caltanissetta', 'cam', 'campania', 'campidano-medio', 'campidanomedio', 'campobasso', 'carbonia-iglesias', 'carboniaiglesias', 'carrara-massa', 'carraramassa', 'caserta', 'catania', 'catanzaro', 'cb', 'cci', 'ce', 'cesena-forli', 'cesenaforli', 'ch', 'chambagri', 'chieti', 'chirurgiens-dentistes', 'ci', 'cl', 'cn', 'co', 'com', 'como', 'cosenza', 'cr', 'cremona', 'crotone', 'cs', 'ct', 'cuneo', 'cz', 'dell-ogliastra', 'dellogliastra', 'edu', 'emilia-romagna', 'emiliaromagna', 'emr', 'en', 'enna', 'experts-comptables', 'fc', 'fe', 'fermo', 'ferrara', 'fg', 'fi', 'firenze', 'florence', 'fm', 'foggia', 'forli-cesena', 'forlicesena', 'fr', 'friuli-v-giulia', 'friuli-ve-giulia', 'friuli-vegiulia', 'friuli-venezia-giulia', 'friuli-veneziagiulia', 'friuli-vgiulia', 'friuliv-giulia', 'friulive-giulia', 'friulivegiulia', 'friulivenezia-giulia', 'friuliveneziagiulia', 'friulivgiulia', 'frosinone', 'fvg', 'ge', 'genoa', 'genova', 'geometre-expert', 'go', 'gorizia', 'gouv', 'gov', 'gr', 'greta', 'grosseto', 'huissier-justice', 'iglesias-carbonia', 'iglesiascarbonia', 'im', 'imperia', 'is', 'isernia', 'kr', 'la-spezia', 'laquila', 'laspezia', 'latina', 'laz', 'lazio', 'lc', 'le', 'lecce', 'lecco', 'li', 'lig', 'liguria', 'livorno', 'lo', 'lodi', 'lom', 'lombardia', 'lombardy', 'lt', 'lu', 'lucania', 'lucca', 'macerata', 'mantova', 'mar', 'marche', 'massa-carrara', 'massacarrara', 'matera', 'mb', 'mc', 'me', 'medecin', 'medio-campidano', 'mediocampidano', 'messina', 'mi', 'milan', 'milano', 'mn', 'mo', 'modena', 'mol', 'molise', 'monza', 'monza-brianza', 'monza-e-della-brianza', 'monzabrianza', 'monzaebrianza', 'monzaedellabrianza', 'ms', 'mt', 'na', 'naples', 'napoli', 'no', 'nom', 'notaires', 'novara', 'nu', 'nuoro', 'og', 'ogliastra', 'olbia-tempio', 'olbiatempio', 'or', 'oristano', 'ot', 'pa', 'padova', 'padua', 'palermo', 'parma', 'pavia', 'pc', 'pd', 'pe', 'perugia', 'pesaro-urbino', 'pesarourbino', 'pescara', 'pg', 'pharmacien', 'pi', 'piacenza', 'piedmont', 'piemonte', 'pisa', 'pistoia', 'pmn', 'pn', 'po', 'pordenone', 'port', 'potenza', 'pr', 'prato', 'prd', 'presse', 'pt', 'pu', 'pug', 'puglia', 'pv', 'pz', 'ra', 'ragusa', 'ravenna', 'rc', 're', 'reggio-calabria', 'reggio-emilia', 'reggiocalabria', 'reggioemilia', 'rg', 'ri', 'rieti', 'rimini', 'rm', 'rn', 'ro', 'roma', 'rome', 'rovigo', 'sa', 'salerno', 'sar', 'sardegna', 'sardinia', 'sassari', 'savona', 'si', 'sic', 'sicilia', 'sicily', 'siena', 'siracusa', 'so', 'sondrio', 'sp', 'sr', 'ss', 'suedtirol', 'sv', 'ta', 'taa', 'taranto', 'te', 'tempio-olbia', 'tempioolbia', 'teramo', 'terni', 'tm', 'tn', 'to', 'torino', 'tos', 'toscana', 'tp', 'tr', 'trani-andria-barletta', 'trani-barletta-andria', 'traniandriabarletta', 'tranibarlettaandria', 'trapani', 'trentin-sud-tirol', 'trentin-sudtirol', 'trentin-sued-tirol', 'trentin-suedtirol', 'trentino', 'trentino-a-adige', 'trentino-aadige', 'trentino-alto-adige', 'trentino-altoadige', 'trentino-s-tirol', 'trentino-stirol', 'trentino-sud-tirol', 'trentino-sudtirol', 'trentino-sued-tirol', 'trentino-suedtirol', 'trentinoa-adige', 'trentinoaadige', 'trentinoalto-adige', 'trentinoaltoadige', 'trentinos-tirol', 'trentinostirol', 'trentinosud-tirol', 'trentinosudtirol', 'trentinosued-tirol', 'trentinosuedtirol', 'trentinsud-tirol', 'trentinsudtirol', 'trentinsued-tirol', 'trentinsuedtirol', 'trento', 'treviso', 'trieste', 'ts', 'turin', 'tuscany', 'tv', 'ud', 'udine', 'umb', 'umbria', 'urbino-pesaro', 'urbinopesaro', 'va', 'val-d-aosta', 'val-daosta', 'vald-aosta', 'valdaosta', 'valle-aosta', 'valle-d-aosta', 'valle-daosta', 'valleaosta', 'valled-aosta', 'valledaosta', 'vallee-aoste', 'vallee-d-aoste', 'valleeaoste', 'valleedaoste', 'vao', 'varese', 'vb', 'vc', 'vda', 've', 'ven', 'veneto', 'venezia', 'venice', 'verbania', 'vercelli', 'verona', 'veterinaire', 'vi', 'vibo-valentia', 'vibovalentia', 'vicenza', 'viterbo', 'vr', 'vs', 'vt', 'vv', 'xn--balsan-sdtirol-nsb', 'xn--bozen-sdtirol-2ob', 'xn--bulsan-sdtirol-nsb', 'xn--cesena-forl-mcb', 'xn--cesenaforl-i8a', 'xn--forl-cesena-fcb', 'xn--forlcesena-c8a', 'xn--sdtirol-n2a', 'xn--trentin-sd-tirol-rzb', 'xn--trentin-sdtirol-7vb', 'xn--trentino-sd-tirol-c3b', 'xn--trentino-sdtirol-szb', 'xn--trentinosd-tirol-rzb', 'xn--trentinosdtirol-7vb', 'xn--trentinsd-tirol-6vb', 'xn--trentinsdtirol-nsb', 'xn--valle-aoste-ebb', 'xn--valle-d-aoste-ehb', 'xn--valleaoste-e7a', 'xn--valledaoste-ebb'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'gd':
         if (['edu', 'gov'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ge':
         if (['com', 'edu', 'gov', 'mil', 'net', 'org', 'pvt'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'gg':
         if (['co', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'gh':
         if (['com', 'edu', 'gov', 'mil', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'gi':
         if (['com', 'edu', 'gov', 'ltd', 'mod', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'gl':
         if (['co', 'com', 'edu', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'gn':
         if (['ac', 'com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'gov':
         if (['al', 'alabama', 'alaska', 'americansamoa', 'ar', 'arizona', 'arkansas', 'as', 'az', 'ca', 'co', 'colorado', 'ct', 'dc', 'de', 'delaware', 'ehawaii', 'fl', 'florida', 'ga', 'georgia', 'guam', 'hawaii', 'ia', 'idaho', 'il', 'illinois', 'in', 'indiana', 'iowa', 'kansas', 'kentucky', 'ks', 'ky', 'la', 'louisiana', 'ma', 'maine', 'maryland', 'mass', 'massachusetts', 'md', 'mi', 'michigan', 'minnesota', 'mississippi', 'missouri', 'mn', 'mo', 'montana', 'ms', 'mt', 'nc', 'nd', 'ne', 'nebraska', 'nevada', 'newjersey', 'newmexico', 'nh', 'nj', 'northcarolina', 'northdakota', 'nv', 'ny', 'ohio', 'ok', 'oklahoma', 'oregon', 'pa', 'pennsylvania', 'pr', 'rhodeisland', 'ri', 'sc', 'sd', 'tennessee', 'texas', 'tn', 'utah', 'vermont', 'vi', 'virginia', 'vt', 'wa', 'washington', 'wi', 'wisconsin', 'wv', 'wy', 'wyoming'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'gp':
         if (['asso', 'com', 'edu', 'mobi', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'gr':
         if (['co', 'com', 'edu', 'gov', 'mil', 'mod', 'net', 'org', 'sch'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'gt':
         if (['com', 'edu', 'gob', 'ind', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'gu':
         if (['com', 'edu', 'gov', 'guam', 'info', 'net', 'org', 'web'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'gy':
         if (['co', 'com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'hk':
         if (['com', 'edu', 'gov', 'idv', 'net', 'org', 'xn--55qx5d', 'xn--ciqpn', 'xn--gmq050i', 'xn--gmqw5a', 'xn--io0a7i', 'xn--lcvr32d', 'xn--mk0axi', 'xn--mxtq1m', 'xn--od0alg', 'xn--od0aq3b', 'xn--tn0ag', 'xn--uc0atv', 'xn--uc0ay4a', 'xn--wcvs22d', 'xn--zf0avx'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'hn':
         if (['com', 'edu', 'gob', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'hr':
         if (['com', 'from', 'gov', 'iz', 'name'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ht':
         if (['adult', 'art', 'asso', 'com', 'coop', 'edu', 'firm', 'gouv', 'info', 'med', 'net', 'org', 'perso', 'pol', 'pro', 'rel', 'shop'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'hu':
         if (['2000', 'agrar', 'bolt', 'casino', 'city', 'co', 'edu', 'erotica', 'erotika', 'film', 'forum', 'games', 'gov', 'hotel', 'info', 'ingatlan', 'jogasz', 'konyvelo', 'lakas', 'media', 'mobi', 'net', 'news', 'org', 'priv', 'reklam', 'sex', 'shop', 'sport', 'suli', 'szex', 'tm', 'tozsde', 'utazas', 'video'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'id':
         if (['ac', 'biz', 'co', 'desa', 'go', 'mil', 'my', 'net', 'or', 'ponpes', 'sch', 'web'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ie':
         if (wa[1] == 'gov') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'il':
         if (['ac', 'co', 'gov', 'idf', 'k12', 'muni', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'im':
         if (wa[1] == 'co' && wa[3] != undefined) {
            if (['ltd', 'plc'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (['ac', 'co', 'com', 'gov', 'net', 'org', 'ro', 'tt', 'tv'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'in':
         if (['5g', '6g', 'ac', 'ai', 'am', 'bihar', 'biz', 'business', 'ca', 'cn', 'co', 'com', 'coop', 'cs', 'delhi', 'dr', 'edu', 'er', 'ernet', 'firm', 'gen', 'gov', 'gujarat', 'ind', 'info', 'int', 'internet', 'io', 'me', 'mil', 'net', 'nic', 'org', 'pg', 'post', 'pro', 'res', 'travel', 'tv', 'uk', 'up', 'us'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'int':
         if (wa[1] == 'eu') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'io':
         if (wa[1] == 'com') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'iq':
         if (['com', 'edu', 'gov', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ir':
         if (['ac', 'co', 'gov', 'id', 'net', 'org', 'sch', 'xn--mgba3a4f16a', 'xn--mgba3a4fra'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'is':
         if (['com', 'edu', 'gov', 'int', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'it':
         if (['abr', 'abruzzo', 'ag', 'agrigento', 'al', 'alessandria', 'alto-adige', 'altoadige', 'an', 'ancona', 'andria-barletta-trani', 'andria-trani-barletta', 'andriabarlettatrani', 'andriatranibarletta', 'ao', 'aosta', 'aosta-valley', 'aostavalley', 'aoste', 'ap', 'aq', 'aquila', 'ar', 'arezzo', 'ascoli-piceno', 'ascolipiceno', 'asti', 'at', 'av', 'avellino', 'ba', 'balsan', 'balsan-sudtirol', 'balsan-suedtirol', 'bari', 'barletta-trani-andria', 'barlettatraniandria', 'bas', 'basilicata', 'belluno', 'benevento', 'bergamo', 'bg', 'bi', 'biella', 'bl', 'bn', 'bo', 'bologna', 'bolzano', 'bolzano-altoadige', 'bozen', 'bozen-sudtirol', 'bozen-suedtirol', 'br', 'brescia', 'brindisi', 'bs', 'bt', 'bulsan', 'bulsan-sudtirol', 'bulsan-suedtirol', 'bz', 'ca', 'cagliari', 'cal', 'calabria', 'caltanissetta', 'cam', 'campania', 'campidano-medio', 'campidanomedio', 'campobasso', 'carbonia-iglesias', 'carboniaiglesias', 'carrara-massa', 'carraramassa', 'caserta', 'catania', 'catanzaro', 'cb', 'ce', 'cesena-forli', 'cesenaforli', 'ch', 'chieti', 'ci', 'cl', 'cn', 'co', 'como', 'cosenza', 'cr', 'cremona', 'crotone', 'cs', 'ct', 'cuneo', 'cz', 'dell-ogliastra', 'dellogliastra', 'edu', 'emilia-romagna', 'emiliaromagna', 'emr', 'en', 'enna', 'fc', 'fe', 'fermo', 'ferrara', 'fg', 'fi', 'firenze', 'florence', 'fm', 'foggia', 'forli-cesena', 'forlicesena', 'fr', 'friuli-v-giulia', 'friuli-ve-giulia', 'friuli-vegiulia', 'friuli-venezia-giulia', 'friuli-veneziagiulia', 'friuli-vgiulia', 'friuliv-giulia', 'friulive-giulia', 'friulivegiulia', 'friulivenezia-giulia', 'friuliveneziagiulia', 'friulivgiulia', 'frosinone', 'fvg', 'ge', 'genoa', 'genova', 'go', 'gorizia', 'gov', 'gr', 'grosseto', 'iglesias-carbonia', 'iglesiascarbonia', 'im', 'imperia', 'is', 'isernia', 'kr', 'la-spezia', 'laquila', 'laspezia', 'latina', 'laz', 'lazio', 'lc', 'le', 'lecce', 'lecco', 'li', 'lig', 'liguria', 'livorno', 'lo', 'lodi', 'lom', 'lombardia', 'lombardy', 'lt', 'lu', 'lucania', 'lucca', 'macerata', 'mantova', 'mar', 'marche', 'massa-carrara', 'massacarrara', 'matera', 'mb', 'mc', 'me', 'medio-campidano', 'mediocampidano', 'messina', 'mi', 'milan', 'milano', 'mn', 'mo', 'modena', 'mol', 'molise', 'monza', 'monza-brianza', 'monza-e-della-brianza', 'monzabrianza', 'monzaebrianza', 'monzaedellabrianza', 'ms', 'mt', 'na', 'naples', 'napoli', 'no', 'novara', 'nu', 'nuoro', 'og', 'ogliastra', 'olbia-tempio', 'olbiatempio', 'or', 'oristano', 'ot', 'pa', 'padova', 'padua', 'palermo', 'parma', 'pavia', 'pc', 'pd', 'pe', 'perugia', 'pesaro-urbino', 'pesarourbino', 'pescara', 'pg', 'pi', 'piacenza', 'piedmont', 'piemonte', 'pisa', 'pistoia', 'pmn', 'pn', 'po', 'pordenone', 'potenza', 'pr', 'prato', 'pt', 'pu', 'pug', 'puglia', 'pv', 'pz', 'ra', 'ragusa', 'ravenna', 'rc', 're', 'reggio-calabria', 'reggio-emilia', 'reggiocalabria', 'reggioemilia', 'rg', 'ri', 'rieti', 'rimini', 'rm', 'rn', 'ro', 'roma', 'rome', 'rovigo', 'sa', 'salerno', 'sar', 'sardegna', 'sardinia', 'sassari', 'savona', 'si', 'sic', 'sicilia', 'sicily', 'siena', 'siracusa', 'so', 'sondrio', 'sp', 'sr', 'ss', 'suedtirol', 'sv', 'ta', 'taa', 'taranto', 'te', 'tempio-olbia', 'tempioolbia', 'teramo', 'terni', 'tn', 'to', 'torino', 'tos', 'toscana', 'tp', 'tr', 'trani-andria-barletta', 'trani-barletta-andria', 'traniandriabarletta', 'tranibarlettaandria', 'trapani', 'trentin-sud-tirol', 'trentin-sudtirol', 'trentin-sued-tirol', 'trentin-suedtirol', 'trentino', 'trentino-a-adige', 'trentino-aadige', 'trentino-alto-adige', 'trentino-altoadige', 'trentino-s-tirol', 'trentino-stirol', 'trentino-sud-tirol', 'trentino-sudtirol', 'trentino-sued-tirol', 'trentino-suedtirol', 'trentinoa-adige', 'trentinoaadige', 'trentinoalto-adige', 'trentinoaltoadige', 'trentinos-tirol', 'trentinostirol', 'trentinosud-tirol', 'trentinosudtirol', 'trentinosued-tirol', 'trentinosuedtirol', 'trentinsud-tirol', 'trentinsudtirol', 'trentinsued-tirol', 'trentinsuedtirol', 'trento', 'treviso', 'trieste', 'ts', 'turin', 'tuscany', 'tv', 'ud', 'udine', 'umb', 'umbria', 'urbino-pesaro', 'urbinopesaro', 'va', 'val-d-aosta', 'val-daosta', 'vald-aosta', 'valdaosta', 'valle-aosta', 'valle-d-aosta', 'valle-daosta', 'valleaosta', 'valled-aosta', 'valledaosta', 'vallee-aoste', 'vallee-d-aoste', 'valleeaoste', 'valleedaoste', 'vao', 'varese', 'vb', 'vc', 'vda', 've', 'ven', 'veneto', 'venezia', 'venice', 'verbania', 'vercelli', 'verona', 'vi', 'vibo-valentia', 'vibovalentia', 'vicenza', 'viterbo', 'vr', 'vs', 'vt', 'vv', 'xn--balsan-sdtirol-nsb', 'xn--bozen-sdtirol-2ob', 'xn--bulsan-sdtirol-nsb', 'xn--cesena-forl-mcb', 'xn--cesenaforl-i8a', 'xn--forl-cesena-fcb', 'xn--forlcesena-c8a', 'xn--sdtirol-n2a', 'xn--trentin-sd-tirol-rzb', 'xn--trentin-sdtirol-7vb', 'xn--trentino-sd-tirol-c3b', 'xn--trentino-sdtirol-szb', 'xn--trentinosd-tirol-rzb', 'xn--trentinosdtirol-7vb', 'xn--trentinsd-tirol-6vb', 'xn--trentinsdtirol-nsb', 'xn--valle-aoste-ebb', 'xn--valle-d-aoste-ehb', 'xn--valleaoste-e7a', 'xn--valledaoste-ebb'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'je':
         if (['co', 'gov', 'net', 'org', 'sch'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'jm':
         if (['com', 'edu', 'gov', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'jo':
         if (['com', 'edu', 'gov', 'mil', 'name', 'net', 'org', 'sch'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'jp':
         if (wa[1] == 'yamanashi' && wa[3] != undefined) {
            if (['chuo', 'doshi', 'fuefuki', 'fujikawa', 'fujikawaguchiko', 'fujiyoshida', 'hayakawa', 'hokuto', 'ichikawamisato', 'kai', 'kofu', 'koshu', 'kosuge', 'minami-alps', 'minobu', 'nakamichi', 'nanbu', 'narusawa', 'nirasaki', 'nishikatsura', 'oshino', 'otsuki', 'showa', 'tabayama', 'tsuru', 'uenohara', 'yamanakako', 'yamanashi'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'yamaguchi' && wa[3] != undefined) {
            if (['abu', 'hagi', 'hikari', 'hofu', 'iwakuni', 'kudamatsu', 'mitou', 'nagato', 'oshima', 'shimonoseki', 'shunan', 'tabuse', 'tokuyama', 'toyota', 'ube', 'yuu'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'yamagata' && wa[3] != undefined) {
            if (['asahi', 'funagata', 'higashine', 'iide', 'kahoku', 'kaminoyama', 'kaneyama', 'kawanishi', 'mamurogawa', 'mikawa', 'murayama', 'nagai', 'nakayama', 'nanyo', 'nishikawa', 'obanazawa', 'oe', 'oguni', 'ohkura', 'oishida', 'sagae', 'sakata', 'sakegawa', 'shinjo', 'shirataka', 'shonai', 'takahata', 'tendo', 'tozawa', 'tsuruoka', 'yamagata', 'yamanobe', 'yonezawa', 'yuza'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'wakayama' && wa[3] != undefined) {
            if (['arida', 'aridagawa', 'gobo', 'hashimoto', 'hidaka', 'hirogawa', 'inami', 'iwade', 'kainan', 'kamitonda', 'katsuragi', 'kimino', 'kinokawa', 'kitayama', 'koya', 'koza', 'kozagawa', 'kudoyama', 'kushimoto', 'mihama', 'misato', 'nachikatsuura', 'shingu', 'shirahama', 'taiji', 'tanabe', 'wakayama', 'yuasa', 'yura'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'toyama' && wa[3] != undefined) {
            if (['asahi', 'fuchu', 'fukumitsu', 'funahashi', 'himi', 'imizu', 'inami', 'johana', 'kamiichi', 'kurobe', 'nakaniikawa', 'namerikawa', 'nanto', 'nyuzen', 'oyabe', 'taira', 'takaoka', 'tateyama', 'toga', 'tonami', 'toyama', 'unazuki', 'uozu', 'yamada'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'tottori' && wa[3] != undefined) {
            if (['chizu', 'hino', 'kawahara', 'koge', 'kotoura', 'misasa', 'nanbu', 'nichinan', 'sakaiminato', 'tottori', 'wakasa', 'yazu', 'yonago'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'tokyo' && wa[3] != undefined) {
            if (['adachi', 'akiruno', 'akishima', 'aogashima', 'arakawa', 'bunkyo', 'chiyoda', 'chofu', 'chuo', 'edogawa', 'fuchu', 'fussa', 'hachijo', 'hachioji', 'hamura', 'higashikurume', 'higashimurayama', 'higashiyamato', 'hino', 'hinode', 'hinohara', 'inagi', 'itabashi', 'katsushika', 'kita', 'kiyose', 'kodaira', 'koganei', 'kokubunji', 'komae', 'koto', 'kouzushima', 'kunitachi', 'machida', 'meguro', 'minato', 'mitaka', 'mizuho', 'musashimurayama', 'musashino', 'nakano', 'nerima', 'ogasawara', 'okutama', 'ome', 'oshima', 'ota', 'setagaya', 'shibuya', 'shinagawa', 'shinjuku', 'suginami', 'sumida', 'tachikawa', 'taito', 'tama', 'toshima'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'tokushima' && wa[3] != undefined) {
            if (['aizumi', 'anan', 'ichiba', 'itano', 'kainan', 'komatsushima', 'matsushige', 'mima', 'minami', 'miyoshi', 'mugi', 'nakagawa', 'naruto', 'sanagochi', 'shishikui', 'tokushima', 'wajiki'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'tochigi' && wa[3] != undefined) {
            if (['ashikaga', 'bato', 'haga', 'ichikai', 'iwafune', 'kaminokawa', 'kanuma', 'karasuyama', 'kuroiso', 'mashiko', 'mibu', 'moka', 'motegi', 'nasu', 'nasushiobara', 'nikko', 'nishikata', 'nogi', 'ohira', 'ohtawara', 'oyama', 'sakura', 'sano', 'shimotsuke', 'shioya', 'takanezawa', 'tochigi', 'tsuga', 'ujiie', 'utsunomiya', 'yaita'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'shizuoka' && wa[3] != undefined) {
            if (['arai', 'atami', 'fuji', 'fujieda', 'fujikawa', 'fujinomiya', 'fukuroi', 'gotemba', 'haibara', 'hamamatsu', 'higashiizu', 'ito', 'iwata', 'izu', 'izunokuni', 'kakegawa', 'kannami', 'kawanehon', 'kawazu', 'kikugawa', 'kosai', 'makinohara', 'matsuzaki', 'minamiizu', 'mishima', 'morimachi', 'nishiizu', 'numazu', 'omaezaki', 'shimada', 'shimizu', 'shimoda', 'shizuoka', 'susono', 'yaizu', 'yoshida'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'shimane' && wa[3] != undefined) {
            if (['akagi', 'ama', 'gotsu', 'hamada', 'higashiizumo', 'hikawa', 'hikimi', 'izumo', 'kakinoki', 'masuda', 'matsue', 'misato', 'nishinoshima', 'ohda', 'okinoshima', 'okuizumo', 'shimane', 'tamayu', 'tsuwano', 'unnan', 'yakumo', 'yasugi', 'yatsuka'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'shiga' && wa[3] != undefined) {
            if (['aisho', 'gamo', 'higashiomi', 'hikone', 'koka', 'konan', 'kosei', 'koto', 'kusatsu', 'maibara', 'moriyama', 'nagahama', 'nishiazai', 'notogawa', 'omihachiman', 'otsu', 'ritto', 'ryuoh', 'takashima', 'takatsuki', 'torahime', 'toyosato', 'yasu'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'saitama' && wa[3] != undefined) {
            if (['arakawa', 'asaka', 'chichibu', 'fujimi', 'fujimino', 'fukaya', 'hanno', 'hanyu', 'hasuda', 'hatogaya', 'hatoyama', 'hidaka', 'higashichichibu', 'higashimatsuyama', 'honjo', 'ina', 'iruma', 'iwatsuki', 'kamiizumi', 'kamikawa', 'kamisato', 'kasukabe', 'kawagoe', 'kawaguchi', 'kawajima', 'kazo', 'kitamoto', 'koshigaya', 'kounosu', 'kuki', 'kumagaya', 'matsubushi', 'minano', 'misato', 'miyashiro', 'miyoshi', 'moroyama', 'nagatoro', 'namegawa', 'niiza', 'ogano', 'ogawa', 'ogose', 'okegawa', 'omiya', 'otaki', 'ranzan', 'ryokami', 'saitama', 'sakado', 'satte', 'sayama', 'shiki', 'shiraoka', 'soka', 'sugito', 'toda', 'tokigawa', 'tokorozawa', 'tsurugashima', 'urawa', 'warabi', 'yashio', 'yokoze', 'yono', 'yorii', 'yoshida', 'yoshikawa', 'yoshimi'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'saga' && wa[3] != undefined) {
            if (['ariake', 'arita', 'fukudomi', 'genkai', 'hamatama', 'hizen', 'imari', 'kamimine', 'kanzaki', 'karatsu', 'kashima', 'kitagata', 'kitahata', 'kiyama', 'kouhoku', 'kyuragi', 'nishiarita', 'ogi', 'omachi', 'ouchi', 'saga', 'shiroishi', 'taku', 'tara', 'tosu', 'yoshinogari'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'osaka' && wa[3] != undefined) {
            if (['abeno', 'chihayaakasaka', 'chuo', 'daito', 'fujiidera', 'habikino', 'hannan', 'higashiosaka', 'higashisumiyoshi', 'higashiyodogawa', 'hirakata', 'ibaraki', 'ikeda', 'izumi', 'izumiotsu', 'izumisano', 'kadoma', 'kaizuka', 'kanan', 'kashiwara', 'katano', 'kawachinagano', 'kishiwada', 'kita', 'kumatori', 'matsubara', 'minato', 'minoh', 'misaki', 'moriguchi', 'neyagawa', 'nishi', 'nose', 'osakasayama', 'sakai', 'sayama', 'sennan', 'settsu', 'shijonawate', 'shimamoto', 'suita', 'tadaoka', 'taishi', 'tajiri', 'takaishi', 'takatsuki', 'tondabayashi', 'toyonaka', 'toyono', 'yao'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'okinawa' && wa[3] != undefined) {
            if (['aguni', 'ginowan', 'ginoza', 'gushikami', 'haebaru', 'higashi', 'hirara', 'iheya', 'ishigaki', 'ishikawa', 'itoman', 'izena', 'kadena', 'kin', 'kitadaito', 'kitanakagusuku', 'kumejima', 'kunigami', 'minamidaito', 'motobu', 'nago', 'naha', 'nakagusuku', 'nakijin', 'nanjo', 'nishihara', 'ogimi', 'okinawa', 'onna', 'shimoji', 'taketomi', 'tarama', 'tokashiki', 'tomigusuku', 'tonaki', 'urasoe', 'uruma', 'yaese', 'yomitan', 'yonabaru', 'yonaguni', 'zamami'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'okayama' && wa[3] != undefined) {
            if (['akaiwa', 'asakuchi', 'bizen', 'hayashima', 'ibara', 'kagamino', 'kasaoka', 'kibichuo', 'kumenan', 'kurashiki', 'maniwa', 'misaki', 'nagi', 'niimi', 'nishiawakura', 'okayama', 'satosho', 'setouchi', 'shinjo', 'shoo', 'soja', 'takahashi', 'tamano', 'tsuyama', 'wake', 'yakage'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'oita' && wa[3] != undefined) {
            if (['beppu', 'bungoono', 'bungotakada', 'hasama', 'hiji', 'himeshima', 'hita', 'kamitsue', 'kokonoe', 'kuju', 'kunisaki', 'kusu', 'oita', 'saiki', 'taketa', 'tsukumi', 'usa', 'usuki', 'yufu'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'niigata' && wa[3] != undefined) {
            if (['aga', 'agano', 'gosen', 'itoigawa', 'izumozaki', 'joetsu', 'kamo', 'kariwa', 'kashiwazaki', 'minamiuonuma', 'mitsuke', 'muika', 'murakami', 'myoko', 'nagaoka', 'niigata', 'ojiya', 'omi', 'sado', 'sanjo', 'seiro', 'seirou', 'sekikawa', 'shibata', 'tagami', 'tainai', 'tochio', 'tokamachi', 'tsubame', 'tsunan', 'uonuma', 'yahiko', 'yoita', 'yuzawa'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'nara' && wa[3] != undefined) {
            if (['ando', 'gose', 'heguri', 'higashiyoshino', 'ikaruga', 'ikoma', 'kamikitayama', 'kanmaki', 'kashiba', 'kashihara', 'katsuragi', 'kawai', 'kawakami', 'kawanishi', 'koryo', 'kurotaki', 'mitsue', 'miyake', 'nara', 'nosegawa', 'oji', 'ouda', 'oyodo', 'sakurai', 'sango', 'shimoichi', 'shimokitayama', 'shinjo', 'soni', 'takatori', 'tawaramoto', 'tenkawa', 'tenri', 'uda', 'yamatokoriyama', 'yamatotakada', 'yamazoe', 'yoshino'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'nagasaki' && wa[3] != undefined) {
            if (['chijiwa', 'futsu', 'goto', 'hasami', 'hirado', 'iki', 'isahaya', 'kawatana', 'kuchinotsu', 'matsuura', 'nagasaki', 'obama', 'omura', 'oseto', 'saikai', 'sasebo', 'seihi', 'shimabara', 'shinkamigoto', 'togitsu', 'tsushima', 'unzen'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'nagano' && wa[3] != undefined) {
            if (['achi', 'agematsu', 'anan', 'aoki', 'asahi', 'azumino', 'chikuhoku', 'chikuma', 'chino', 'fujimi', 'hakuba', 'hara', 'hiraya', 'iida', 'iijima', 'iiyama', 'iizuna', 'ikeda', 'ikusaka', 'ina', 'karuizawa', 'kawakami', 'kiso', 'kisofukushima', 'kitaaiki', 'komagane', 'komoro', 'matsukawa', 'matsumoto', 'miasa', 'minamiaiki', 'minamimaki', 'minamiminowa', 'minowa', 'miyada', 'miyota', 'mochizuki', 'nagano', 'nagawa', 'nagiso', 'nakagawa', 'nakano', 'nozawaonsen', 'obuse', 'ogawa', 'okaya', 'omachi', 'omi', 'ookuwa', 'ooshika', 'otaki', 'otari', 'sakae', 'sakaki', 'saku', 'sakuho', 'shimosuwa', 'shinanomachi', 'shiojiri', 'suwa', 'suzaka', 'takagi', 'takamori', 'takayama', 'tateshina', 'tatsuno', 'togakushi', 'togura', 'tomi', 'ueda', 'wada', 'yamagata', 'yamanouchi', 'yasaka', 'yasuoka'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'miyazaki' && wa[3] != undefined) {
            if (['aya', 'ebino', 'gokase', 'hyuga', 'kadogawa', 'kawaminami', 'kijo', 'kitagawa', 'kitakata', 'kitaura', 'kobayashi', 'kunitomi', 'kushima', 'mimata', 'miyakonojo', 'miyazaki', 'morotsuka', 'nichinan', 'nishimera', 'nobeoka', 'saito', 'shiiba', 'shintomi', 'takaharu', 'takanabe', 'takazaki', 'tsuno'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'miyagi' && wa[3] != undefined) {
            if (['furukawa', 'higashimatsushima', 'ishinomaki', 'iwanuma', 'kakuda', 'kami', 'kawasaki', 'marumori', 'matsushima', 'minamisanriku', 'misato', 'murata', 'natori', 'ogawara', 'ohira', 'onagawa', 'osaki', 'rifu', 'semine', 'shibata', 'shichikashuku', 'shikama', 'shiogama', 'shiroishi', 'tagajo', 'taiwa', 'tome', 'tomiya', 'wakuya', 'watari', 'yamamoto', 'zao'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'mie' && wa[3] != undefined) {
            if (['asahi', 'inabe', 'ise', 'kameyama', 'kawagoe', 'kiho', 'kisosaki', 'kiwa', 'komono', 'kumano', 'kuwana', 'matsusaka', 'meiwa', 'mihama', 'minamiise', 'misugi', 'miyama', 'nabari', 'shima', 'suzuka', 'tado', 'taiki', 'taki', 'tamaki', 'toba', 'tsu', 'udono', 'ureshino', 'watarai', 'yokkaichi'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'kyoto' && wa[3] != undefined) {
            if (['ayabe', 'fukuchiyama', 'higashiyama', 'ide', 'ine', 'joyo', 'kameoka', 'kamo', 'kita', 'kizu', 'kumiyama', 'kyotamba', 'kyotanabe', 'kyotango', 'maizuru', 'minami', 'minamiyamashiro', 'miyazu', 'muko', 'nagaokakyo', 'nakagyo', 'nantan', 'oyamazaki', 'sakyo', 'seika', 'tanabe', 'uji', 'ujitawara', 'wazuka', 'yamashina', 'yawata'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'kumamoto' && wa[3] != undefined) {
            if (['amakusa', 'arao', 'aso', 'choyo', 'gyokuto', 'kamiamakusa', 'kikuchi', 'kumamoto', 'mashiki', 'mifune', 'minamata', 'minamioguni', 'nagasu', 'nishihara', 'oguni', 'ozu', 'sumoto', 'takamori', 'uki', 'uto', 'yamaga', 'yamato', 'yatsushiro'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'kochi' && wa[3] != undefined) {
            if (['aki', 'geisei', 'hidaka', 'higashitsuno', 'ino', 'kagami', 'kami', 'kitagawa', 'kochi', 'mihara', 'motoyama', 'muroto', 'nahari', 'nakamura', 'nankoku', 'nishitosa', 'niyodogawa', 'ochi', 'okawa', 'otoyo', 'otsuki', 'sakawa', 'sukumo', 'susaki', 'tosa', 'tosashimizu', 'toyo', 'tsuno', 'umaji', 'yasuda', 'yusuhara'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'kanagawa' && wa[3] != undefined) {
            if (['aikawa', 'atsugi', 'ayase', 'chigasaki', 'ebina', 'fujisawa', 'hadano', 'hakone', 'hiratsuka', 'isehara', 'kaisei', 'kamakura', 'kiyokawa', 'matsuda', 'minamiashigara', 'miura', 'nakai', 'ninomiya', 'odawara', 'oi', 'oiso', 'sagamihara', 'samukawa', 'tsukui', 'yamakita', 'yamato', 'yokosuka', 'yugawara', 'zama', 'zushi'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'kagoshima' && wa[3] != undefined) {
            if (['akune', 'amami', 'hioki', 'isa', 'isen', 'izumi', 'kagoshima', 'kanoya', 'kawanabe', 'kinko', 'kouyama', 'makurazaki', 'matsumoto', 'minamitane', 'nakatane', 'nishinoomote', 'satsumasendai', 'soo', 'tarumizu', 'yusui'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'kagawa' && wa[3] != undefined) {
            if (['ayagawa', 'higashikagawa', 'kanonji', 'kotohira', 'manno', 'marugame', 'mitoyo', 'naoshima', 'sanuki', 'tadotsu', 'takamatsu', 'tonosho', 'uchinomi', 'utazu', 'zentsuji'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'iwate' && wa[3] != undefined) {
            if (['fudai', 'fujisawa', 'hanamaki', 'hiraizumi', 'hirono', 'ichinohe', 'ichinoseki', 'iwaizumi', 'iwate', 'joboji', 'kamaishi', 'kanegasaki', 'karumai', 'kawai', 'kitakami', 'kuji', 'kunohe', 'kuzumaki', 'miyako', 'mizusawa', 'morioka', 'ninohe', 'noda', 'ofunato', 'oshu', 'otsuchi', 'rikuzentakata', 'shiwa', 'shizukuishi', 'sumita', 'tanohata', 'tono', 'yahaba', 'yamada'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ishikawa' && wa[3] != undefined) {
            if (['anamizu', 'hakui', 'hakusan', 'kaga', 'kahoku', 'kanazawa', 'kawakita', 'komatsu', 'nakanoto', 'nanao', 'nomi', 'nonoichi', 'noto', 'shika', 'suzu', 'tsubata', 'tsurugi', 'uchinada', 'wajima'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ibaraki' && wa[3] != undefined) {
            if (['ami', 'asahi', 'bando', 'chikusei', 'daigo', 'fujishiro', 'hitachi', 'hitachinaka', 'hitachiomiya', 'hitachiota', 'ibaraki', 'ina', 'inashiki', 'itako', 'iwama', 'joso', 'kamisu', 'kasama', 'kashima', 'kasumigaura', 'koga', 'miho', 'mito', 'moriya', 'naka', 'namegata', 'oarai', 'ogawa', 'omitama', 'ryugasaki', 'sakai', 'sakuragawa', 'shimodate', 'shimotsuma', 'shirosato', 'sowa', 'suifu', 'takahagi', 'tamatsukuri', 'tokai', 'tomobe', 'tone', 'toride', 'tsuchiura', 'tsukuba', 'uchihara', 'ushiku', 'yachiyo', 'yamagata', 'yawara', 'yuki'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'hyogo' && wa[3] != undefined) {
            if (['aioi', 'akashi', 'ako', 'amagasaki', 'aogaki', 'asago', 'ashiya', 'awaji', 'fukusaki', 'goshiki', 'harima', 'himeji', 'ichikawa', 'inagawa', 'itami', 'kakogawa', 'kamigori', 'kamikawa', 'kasai', 'kasuga', 'kawanishi', 'miki', 'minamiawaji', 'nishinomiya', 'nishiwaki', 'ono', 'sanda', 'sannan', 'sasayama', 'sayo', 'shingu', 'shinonsen', 'shiso', 'sumoto', 'taishi', 'taka', 'takarazuka', 'takasago', 'takino', 'tamba', 'tatsuno', 'toyooka', 'yabu', 'yashiro', 'yoka', 'yokawa'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'hokkaido' && wa[3] != undefined) {
            if (['abashiri', 'abira', 'aibetsu', 'akabira', 'akkeshi', 'asahikawa', 'ashibetsu', 'ashoro', 'assabu', 'atsuma', 'bibai', 'biei', 'bifuka', 'bihoro', 'biratori', 'chippubetsu', 'chitose', 'date', 'ebetsu', 'embetsu', 'eniwa', 'erimo', 'esan', 'esashi', 'fukagawa', 'fukushima', 'furano', 'furubira', 'haboro', 'hakodate', 'hamatonbetsu', 'hidaka', 'higashikagura', 'higashikawa', 'hiroo', 'hokuryu', 'hokuto', 'honbetsu', 'horokanai', 'horonobe', 'ikeda', 'imakane', 'ishikari', 'iwamizawa', 'iwanai', 'kamifurano', 'kamikawa', 'kamishihoro', 'kamisunagawa', 'kamoenai', 'kayabe', 'kembuchi', 'kikonai', 'kimobetsu', 'kitahiroshima', 'kitami', 'kiyosato', 'koshimizu', 'kunneppu', 'kuriyama', 'kuromatsunai', 'kushiro', 'kutchan', 'kyowa', 'mashike', 'matsumae', 'mikasa', 'minamifurano', 'mombetsu', 'moseushi', 'mukawa', 'muroran', 'naie', 'nakagawa', 'nakasatsunai', 'nakatombetsu', 'nanae', 'nanporo', 'nayoro', 'nemuro', 'niikappu', 'niki', 'nishiokoppe', 'noboribetsu', 'numata', 'obihiro', 'obira', 'oketo', 'okoppe', 'otaru', 'otobe', 'otofuke', 'otoineppu', 'oumu', 'ozora', 'pippu', 'rankoshi', 'rebun', 'rikubetsu', 'rishiri', 'rishirifuji', 'saroma', 'sarufutsu', 'shakotan', 'shari', 'shibecha', 'shibetsu', 'shikabe', 'shikaoi', 'shimamaki', 'shimizu', 'shimokawa', 'shinshinotsu', 'shintoku', 'shiranuka', 'shiraoi', 'shiriuchi', 'sobetsu', 'sunagawa', 'taiki', 'takasu', 'takikawa', 'takinoue', 'teshikaga', 'tobetsu', 'tohma', 'tomakomai', 'tomari', 'toya', 'toyako', 'toyotomi', 'toyoura', 'tsubetsu', 'tsukigata', 'urakawa', 'urausu', 'uryu', 'utashinai', 'wakkanai', 'wassamu', 'yakumo', 'yoichi'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'hiroshima' && wa[3] != undefined) {
            if (['asaminami', 'daiwa', 'etajima', 'fuchu', 'fukuyama', 'hatsukaichi', 'higashihiroshima', 'hongo', 'jinsekikogen', 'kaita', 'kui', 'kumano', 'kure', 'mihara', 'miyoshi', 'naka', 'onomichi', 'osakikamijima', 'otake', 'saka', 'sera', 'seranishi', 'shinichi', 'shobara', 'takehara'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'gunma' && wa[3] != undefined) {
            if (['annaka', 'chiyoda', 'fujioka', 'higashiagatsuma', 'isesaki', 'itakura', 'kanna', 'kanra', 'katashina', 'kawaba', 'kiryu', 'kusatsu', 'maebashi', 'meiwa', 'midori', 'minakami', 'naganohara', 'nakanojo', 'nanmoku', 'numata', 'oizumi', 'ora', 'ota', 'shibukawa', 'shimonita', 'shinto', 'showa', 'takasaki', 'takayama', 'tamamura', 'tatebayashi', 'tomioka', 'tsukiyono', 'tsumagoi', 'ueno', 'yoshioka'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'gifu' && wa[3] != undefined) {
            if (['anpachi', 'ena', 'gifu', 'ginan', 'godo', 'gujo', 'hashima', 'hichiso', 'hida', 'higashishirakawa', 'ibigawa', 'ikeda', 'kakamigahara', 'kani', 'kasahara', 'kasamatsu', 'kawaue', 'kitagata', 'mino', 'minokamo', 'mitake', 'mizunami', 'motosu', 'nakatsugawa', 'ogaki', 'sakahogi', 'seki', 'sekigahara', 'shirakawa', 'tajimi', 'takayama', 'tarui', 'toki', 'tomika', 'wanouchi', 'yamagata', 'yaotsu', 'yoro'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'fukushima' && wa[3] != undefined) {
            if (['aizubange', 'aizumisato', 'aizuwakamatsu', 'asakawa', 'bandai', 'date', 'fukushima', 'furudono', 'futaba', 'hanawa', 'higashi', 'hirata', 'hirono', 'iitate', 'inawashiro', 'ishikawa', 'iwaki', 'izumizaki', 'kagamiishi', 'kaneyama', 'kawamata', 'kitakata', 'kitashiobara', 'koori', 'koriyama', 'kunimi', 'miharu', 'mishima', 'namie', 'nango', 'nishiaizu', 'nishigo', 'okuma', 'omotego', 'ono', 'otama', 'samegawa', 'shimogo', 'shirakawa', 'showa', 'soma', 'sukagawa', 'taishin', 'tamakawa', 'tanagura', 'tenei', 'yabuki', 'yamato', 'yamatsuri', 'yanaizu', 'yugawa'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'fukuoka' && wa[3] != undefined) {
            if (['ashiya', 'buzen', 'chikugo', 'chikuho', 'chikujo', 'chikushino', 'chikuzen', 'chuo', 'dazaifu', 'fukuchi', 'hakata', 'higashi', 'hirokawa', 'hisayama', 'iizuka', 'inatsuki', 'kaho', 'kasuga', 'kasuya', 'kawara', 'keisen', 'koga', 'kurate', 'kurogi', 'kurume', 'minami', 'miyako', 'miyama', 'miyawaka', 'mizumaki', 'munakata', 'nakagawa', 'nakama', 'nishi', 'nogata', 'ogori', 'okagaki', 'okawa', 'oki', 'omuta', 'onga', 'onojo', 'oto', 'saigawa', 'sasaguri', 'shingu', 'shinyoshitomi', 'shonai', 'soeda', 'sue', 'tachiarai', 'tagawa', 'takata', 'toho', 'toyotsu', 'tsuiki', 'ukiha', 'umi', 'usui', 'yamada', 'yame', 'yanagawa', 'yukuhashi'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'fukui' && wa[3] != undefined) {
            if (['echizen', 'eiheiji', 'fukui', 'ikeda', 'katsuyama', 'mihama', 'minamiechizen', 'obama', 'ohi', 'ono', 'sabae', 'sakai', 'takahama', 'tsuruga', 'wakasa'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ehime' && wa[3] != undefined) {
            if (['ainan', 'honai', 'ikata', 'imabari', 'iyo', 'kamijima', 'kihoku', 'kumakogen', 'masaki', 'matsuno', 'matsuyama', 'namikata', 'niihama', 'ozu', 'saijo', 'seiyo', 'shikokuchuo', 'tobe', 'toon', 'uchiko', 'uwajima', 'yawatahama'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'chiba' && wa[3] != undefined) {
            if (['abiko', 'asahi', 'chonan', 'chosei', 'choshi', 'chuo', 'funabashi', 'futtsu', 'hanamigawa', 'ichihara', 'ichikawa', 'ichinomiya', 'inzai', 'isumi', 'kamagaya', 'kamogawa', 'kashiwa', 'katori', 'katsuura', 'kimitsu', 'kisarazu', 'kozaki', 'kujukuri', 'kyonan', 'matsudo', 'midori', 'mihama', 'minamiboso', 'mobara', 'mutsuzawa', 'nagara', 'nagareyama', 'narashino', 'narita', 'noda', 'oamishirasato', 'omigawa', 'onjuku', 'otaki', 'sakae', 'sakura', 'shimofusa', 'shirako', 'shiroi', 'shisui', 'sodegaura', 'sosa', 'tako', 'tateyama', 'togane', 'tohnosho', 'tomisato', 'urayasu', 'yachimata', 'yachiyo', 'yokaichiba', 'yokoshibahikari', 'yotsukaido'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'aomori' && wa[3] != undefined) {
            if (['aomori', 'gonohe', 'hachinohe', 'hashikami', 'hiranai', 'hirosaki', 'itayanagi', 'kuroishi', 'misawa', 'mutsu', 'nakadomari', 'noheji', 'oirase', 'owani', 'rokunohe', 'sannohe', 'shichinohe', 'shingo', 'takko', 'towada', 'tsugaru', 'tsuruta'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'akita' && wa[3] != undefined) {
            if (['akita', 'daisen', 'fujisato', 'gojome', 'hachirogata', 'happou', 'higashinaruse', 'honjo', 'honjyo', 'ikawa', 'kamikoani', 'kamioka', 'katagami', 'kazuno', 'kitaakita', 'kosaka', 'kyowa', 'misato', 'mitane', 'moriyoshi', 'nikaho', 'noshiro', 'odate', 'oga', 'ogata', 'semboku', 'yokote', 'yurihonjo'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'aichi' && wa[3] != undefined) {
            if (['aisai', 'ama', 'anjo', 'asuke', 'chiryu', 'chita', 'fuso', 'gamagori', 'handa', 'hazu', 'hekinan', 'higashiura', 'ichinomiya', 'inazawa', 'inuyama', 'isshiki', 'iwakura', 'kanie', 'kariya', 'kasugai', 'kira', 'kiyosu', 'komaki', 'konan', 'kota', 'mihama', 'miyoshi', 'nishio', 'nisshin', 'obu', 'oguchi', 'oharu', 'okazaki', 'owariasahi', 'seto', 'shikatsu', 'shinshiro', 'shitara', 'tahara', 'takahama', 'tobishima', 'toei', 'togo', 'tokai', 'tokoname', 'toyoake', 'toyohashi', 'toyokawa', 'toyone', 'toyota', 'tsushima', 'yatomi'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (['ac', 'ad', 'aichi', 'akita', 'aomori', 'chiba', 'co', 'ed', 'ehime', 'fukui', 'fukuoka', 'fukushima', 'gifu', 'go', 'gr', 'gunma', 'hiroshima', 'hokkaido', 'hyogo', 'ibaraki', 'ishikawa', 'iwate', 'kagawa', 'kagoshima', 'kanagawa', 'kawasaki', 'kitakyushu', 'kobe', 'kochi', 'kumamoto', 'kyoto', 'lg', 'mie', 'miyagi', 'miyazaki', 'nagano', 'nagasaki', 'nagoya', 'nara', 'ne', 'niigata', 'oita', 'okayama', 'okinawa', 'or', 'osaka', 'saga', 'saitama', 'sapporo', 'sendai', 'shiga', 'shimane', 'shizuoka', 'tochigi', 'tokushima', 'tokyo', 'tottori', 'toyama', 'wakayama', 'xn--0trq7p7nn', 'xn--1ctwo', 'xn--1lqs03n', 'xn--1lqs71d', 'xn--2m4a15e', 'xn--32vp30h', 'xn--4it168d', 'xn--4it797k', 'xn--4pvxs', 'xn--5js045d', 'xn--5rtp49c', 'xn--5rtq34k', 'xn--6btw5a', 'xn--6orx2r', 'xn--7t0a264c', 'xn--8ltr62k', 'xn--8pvr4u', 'xn--c3s14m', 'xn--d5qv7z876c', 'xn--djrs72d6uy', 'xn--djty4k', 'xn--efvn9s', 'xn--ehqz56n', 'xn--elqq16h', 'xn--f6qx53a', 'xn--k7yn95e', 'xn--kbrq7o', 'xn--klt787d', 'xn--kltp7d', 'xn--kltx9a', 'xn--klty5x', 'xn--mkru45i', 'xn--nit225k', 'xn--ntso0iqx3a', 'xn--ntsq17g', 'xn--pssu33l', 'xn--qqqt11m', 'xn--rht27z', 'xn--rht3d', 'xn--rht61e', 'xn--rny31h', 'xn--tor131o', 'xn--uist22h', 'xn--uisz3g', 'xn--uuwu58a', 'xn--vgu402c', 'xn--zbx025d', 'yamagata', 'yamaguchi', 'yamanashi', 'yokohama'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ke':
         if (['ac', 'co', 'go', 'info', 'me', 'mobi', 'ne', 'or', 'sc'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'kg':
         if (['com', 'edu', 'gov', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'kh':
         if (['com', 'edu', 'gov', 'mil', 'net', 'org', 'per'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ki':
         if (['biz', 'com', 'edu', 'gov', 'info', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'km':
         if (['ass', 'asso', 'com', 'coop', 'edu', 'gouv', 'gov', 'medecin', 'mil', 'nom', 'notaires', 'org', 'pharmaciens', 'prd', 'presse', 'tm', 'veterinaire'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'kn':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'kp':
         if (['aca', 'com', 'edu', 'gov', 'law', 'net', 'org', 'rep', 'sca', 'tra'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'kr':
         if (['ac', 'busan', 'cheju', 'chonbuk', 'chonnam', 'chungbuk', 'chungnam', 'co', 'daegu', 'daejeon', 'es', 'gangwon', 'go', 'gwangju', 'gyeongbuk', 'gyeonggi', 'gyeongnam', 'hs', 'incheon', 'inchon', 'jeju', 'jeonbuk', 'jeonnam', 'kangwon', 'kg', 'kwangju', 'kyongbuk', 'kyonggi', 'kyongnam', 'mil', 'ms', 'ne', 'nm', 'or', 'pe', 'pusan', 're', 'sc', 'seoul', 'taegu', 'taejon', 'ulsan', 'xn--bj0bj06e'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'krd':
         if (wa[1] == 'gov') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'kw':
         if (['com', 'edu', 'emb', 'gov', 'ind', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ky':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'kz':
         if (['com', 'edu', 'gov', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'la':
         if (['com', 'edu', 'gov', 'info', 'int', 'net', 'org', 'per'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'lb':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'lc':
         if (['co', 'com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'lk':
         if (['ac', 'assn', 'com', 'edu', 'gov', 'grp', 'hotel', 'int', 'ltd', 'net', 'ngo', 'org', 'sch', 'soc', 'web'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'lr':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ls':
         if (['ac', 'biz', 'co', 'edu', 'gov', 'info', 'net', 'nul', 'org', 'parliament', 'quadrant', 'sc'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'lt':
         if (wa[1] == 'gov') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'lv':
         if (['asn', 'com', 'conf', 'edu', 'gov', 'id', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ly':
         if (['com', 'edu', 'gov', 'id', 'med', 'net', 'org', 'plc', 'sch'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ma':
         if (['ac', 'co', 'gov', 'net', 'org', 'press'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'mc':
         if (['asso', 'tm'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'me':
         if (['ac', 'co', 'edu', 'gov', 'its', 'net', 'org', 'priv'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'mg':
         if (['co', 'com', 'edu', 'gov', 'mil', 'nom', 'org', 'prd', 'tm'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'mk':
         if (['com', 'edu', 'gov', 'inf', 'name', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ml':
         if (['com', 'edu', 'gouv', 'gov', 'net', 'org', 'presse'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'mm':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'mn':
         if (['edu', 'gov', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'mo':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'mr':
         if (wa[1] == 'gov') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ms':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'mt':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'mu':
         if (['ac', 'co', 'com', 'gov', 'net', 'or', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'museum':
         if (['academy', 'agriculture', 'air', 'airguard', 'alabama', 'alaska', 'amber', 'ambulance', 'american', 'americana', 'americanantiques', 'americanart', 'amsterdam', 'and', 'annefrank', 'anthro', 'anthropology', 'antiques', 'aquarium', 'arboretum', 'archaeological', 'archaeology', 'architecture', 'art', 'artanddesign', 'artcenter', 'artdeco', 'arteducation', 'artgallery', 'arts', 'artsandcrafts', 'asmatart', 'assassination', 'assisi', 'association', 'astronomy', 'atlanta', 'austin', 'australia', 'automotive', 'aviation', 'axis', 'badajoz', 'baghdad', 'bahn', 'bale', 'baltimore', 'barcelona', 'baseball', 'basel', 'baths', 'bauern', 'beauxarts', 'beeldengeluid', 'bellevue', 'bergbau', 'berkeley', 'berlin', 'bern', 'bible', 'bilbao', 'bill', 'birdart', 'birthplace', 'bonn', 'boston', 'botanical', 'botanicalgarden', 'botanicgarden', 'botany', 'brandywinevalley', 'brasil', 'bristol', 'british', 'britishcolumbia', 'broadcast', 'brunel', 'brussel', 'brussels', 'bruxelles', 'building', 'burghof', 'bus', 'bushey', 'cadaques', 'california', 'cambridge', 'can', 'canada', 'capebreton', 'carrier', 'cartoonart', 'casadelamoneda', 'castle', 'castres', 'celtic', 'center', 'chattanooga', 'cheltenham', 'chesapeakebay', 'chicago', 'children', 'childrens', 'childrensgarden', 'chiropractic', 'chocolate', 'christiansburg', 'cincinnati', 'cinema', 'circus', 'civilisation', 'civilization', 'civilwar', 'clinton', 'clock', 'coal', 'coastaldefence', 'cody', 'coldwar', 'collection', 'colonialwilliamsburg', 'coloradoplateau', 'columbia', 'columbus', 'communication', 'communications', 'community', 'computer', 'computerhistory', 'contemporary', 'contemporaryart', 'convent', 'copenhagen', 'corporation', 'corvette', 'costume', 'countryestate', 'county', 'crafts', 'cranbrook', 'creation', 'cultural', 'culturalcenter', 'culture', 'cyber', 'cymru', 'dali', 'dallas', 'database', 'ddr', 'decorativearts', 'delaware', 'delmenhorst', 'denmark', 'depot', 'design', 'detroit', 'dinosaur', 'discovery', 'dolls', 'donostia', 'durham', 'eastafrica', 'eastcoast', 'education', 'educational', 'egyptian', 'eisenbahn', 'elburg', 'elvendrell', 'embroidery', 'encyclopedic', 'england', 'entomology', 'environment', 'environmentalconservation', 'epilepsy', 'essex', 'estate', 'ethnology', 'exeter', 'exhibition', 'family', 'farm', 'farmequipment', 'farmers', 'farmstead', 'field', 'figueres', 'filatelia', 'film', 'fineart', 'finearts', 'finland', 'flanders', 'florida', 'force', 'fortmissoula', 'fortworth', 'foundation', 'francaise', 'frankfurt', 'franziskaner', 'freemasonry', 'freiburg', 'fribourg', 'frog', 'fundacio', 'furniture', 'gallery', 'garden', 'gateway', 'geelvinck', 'gemological', 'geology', 'georgia', 'giessen', 'glas', 'glass', 'gorge', 'grandrapids', 'graz', 'guernsey', 'halloffame', 'hamburg', 'handson', 'harvestcelebration', 'hawaii', 'health', 'heimatunduhren', 'hellas', 'helsinki', 'hembygdsforbund', 'heritage', 'histoire', 'historical', 'historicalsociety', 'historichouses', 'historisch', 'historisches', 'history', 'historyofscience', 'horology', 'house', 'humanities', 'illustration', 'imageandsound', 'indian', 'indiana', 'indianapolis', 'indianmarket', 'intelligence', 'interactive', 'iraq', 'iron', 'isleofman', 'jamison', 'jefferson', 'jerusalem', 'jewelry', 'jewish', 'jewishart', 'jfk', 'journalism', 'judaica', 'judygarland', 'juedisches', 'juif', 'karate', 'karikatur', 'kids', 'koebenhavn', 'koeln', 'kunst', 'kunstsammlung', 'kunstunddesign', 'labor', 'labour', 'lajolla', 'lancashire', 'landes', 'lans', 'larsson', 'lewismiller', 'lincoln', 'linz', 'living', 'livinghistory', 'localhistory', 'london', 'losangeles', 'louvre', 'loyalist', 'lucerne', 'luxembourg', 'luzern', 'mad', 'madrid', 'mallorca', 'manchester', 'mansion', 'mansions', 'manx', 'marburg', 'maritime', 'maritimo', 'maryland', 'marylhurst', 'media', 'medical', 'medizinhistorisches', 'meeres', 'memorial', 'mesaverde', 'michigan', 'midatlantic', 'military', 'mill', 'miners', 'mining', 'minnesota', 'missile', 'missoula', 'modern', 'moma', 'money', 'monmouth', 'monticello', 'montreal', 'moscow', 'motorcycle', 'muenchen', 'muenster', 'mulhouse', 'muncie', 'museet', 'museumcenter', 'museumvereniging', 'music', 'national', 'nationalfirearms', 'nationalheritage', 'nativeamerican', 'naturalhistory', 'naturalhistorymuseum', 'naturalsciences', 'nature', 'naturhistorisches', 'natuurwetenschappen', 'naumburg', 'naval', 'nebraska', 'neues', 'newhampshire', 'newjersey', 'newmexico', 'newport', 'newspaper', 'newyork', 'niepce', 'norfolk', 'north', 'nrw', 'nuernberg', 'nuremberg', 'nyc', 'nyny', 'oceanographic', 'oceanographique', 'omaha', 'online', 'ontario', 'openair', 'oregon', 'oregontrail', 'otago', 'oxford', 'pacific', 'paderborn', 'palace', 'paleo', 'palmsprings', 'panama', 'paris', 'pasadena', 'pharmacy', 'philadelphia', 'philadelphiaarea', 'philately', 'phoenix', 'photography', 'pilots', 'pittsburgh', 'planetarium', 'plantation', 'plants', 'plaza', 'portal', 'portland', 'portlligat', 'posts-and-telecommunications', 'preservation', 'presidio', 'press', 'project', 'public', 'pubol', 'quebec', 'railroad', 'railway', 'research', 'resistance', 'riodejaneiro', 'rochester', 'rockart', 'roma', 'russia', 'saintlouis', 'salem', 'salvadordali', 'salzburg', 'sandiego', 'sanfrancisco', 'santabarbara', 'santacruz', 'santafe', 'saskatchewan', 'satx', 'savannahga', 'schlesisches', 'schoenbrunn', 'schokoladen', 'school', 'schweiz', 'science', 'science-fiction', 'scienceandhistory', 'scienceandindustry', 'sciencecenter', 'sciencecenters', 'sciencehistory', 'sciences', 'sciencesnaturelles', 'scotland', 'seaport', 'settlement', 'settlers', 'shell', 'sherbrooke', 'sibenik', 'silk', 'ski', 'skole', 'society', 'sologne', 'soundandvision', 'southcarolina', 'southwest', 'space', 'spy', 'square', 'stadt', 'stalbans', 'starnberg', 'state', 'stateofdelaware', 'station', 'steam', 'steiermark', 'stjohn', 'stockholm', 'stpetersburg', 'stuttgart', 'suisse', 'surgeonshall', 'surrey', 'svizzera', 'sweden', 'sydney', 'tank', 'tcm', 'technology', 'telekommunikation', 'television', 'texas', 'textile', 'theater', 'time', 'timekeeping', 'topology', 'torino', 'touch', 'town', 'transport', 'tree', 'trolley', 'trust', 'trustee', 'uhren', 'ulm', 'undersea', 'university', 'usa', 'usantiques', 'usarts', 'uscountryestate', 'usculture', 'usdecorativearts', 'usgarden', 'ushistory', 'ushuaia', 'uslivinghistory', 'utah', 'uvic', 'valley', 'vantaa', 'versailles', 'viking', 'village', 'virginia', 'virtual', 'virtuel', 'vlaanderen', 'volkenkunde', 'wales', 'wallonie', 'war', 'washingtondc', 'watch-and-clock', 'watchandclock', 'western', 'westfalen', 'whaling', 'wildlife', 'williamsburg', 'windmill', 'workshop', 'xn--9dbhblg6di', 'xn--comunicaes-v6a2o', 'xn--correios-e-telecomunicaes-ghc29a', 'xn--h1aegh', 'xn--lns-qla', 'york', 'yorkshire', 'yosemite', 'youth', 'zoological', 'zoology'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'mv':
         if (['aero', 'biz', 'com', 'coop', 'edu', 'gov', 'info', 'int', 'mil', 'museum', 'name', 'net', 'org', 'pro'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'mw':
         if (['ac', 'biz', 'co', 'com', 'coop', 'edu', 'gov', 'int', 'museum', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'mx':
         if (['com', 'edu', 'gob', 'net', 'ngo', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'my':
         if (['biz', 'com', 'edu', 'gov', 'mil', 'name', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'mz':
         if (['ac', 'adv', 'co', 'edu', 'gov', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'na':
         if (['ca', 'cc', 'co', 'com', 'dr', 'in', 'info', 'mobi', 'mx', 'name', 'or', 'org', 'pro', 'school', 'tv', 'us', 'ws'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'nc':
         if (['asso', 'gouv', 'nom'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'net':
         if (['gb', 'hu', 'in', 'jp', 'ru', 'se', 'uk', 'za'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'nf':
         if (['arts', 'com', 'firm', 'info', 'net', 'other', 'per', 'rec', 'store', 'web'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ng':
         if (['com', 'edu', 'gov', 'i', 'mil', 'mobi', 'name', 'net', 'org', 'sch'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ni':
         if (['ac', 'biz', 'co', 'com', 'edu', 'gob', 'in', 'info', 'int', 'mil', 'net', 'nom', 'org', 'web'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'nl':
         if (wa[1] == 'bv') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'no':
         if (wa[1] == 'xn--stfold-9xa' && wa[3] != undefined) {
            if (wa[2] == 'xn--vler-qoa') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'xn--mre-og-romsdal-qqb' && wa[3] != undefined) {
            if (['sande', 'xn--hery-ira'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'vf' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'vestfold' && wa[3] != undefined) {
            if (wa[2] == 'sande') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'va' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'tr' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'tm' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'telemark' && wa[3] != undefined) {
            if (['bo', 'xn--b-5ga'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'svalbard' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'st' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'sf' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'rl' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ostfold' && wa[3] != undefined) {
            if (wa[2] == 'valer') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'oslo' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ol' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'of' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'nt' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'nordland' && wa[3] != undefined) {
            if (['bo', 'heroy', 'xn--b-5ga', 'xn--hery-ira'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'nl' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'mr' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'more-og-romsdal' && wa[3] != undefined) {
            if (['heroy', 'sande'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'jan-mayen' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'hordaland' && wa[3] != undefined) {
            if (wa[2] == 'os') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'hm' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'hl' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'hedmark' && wa[3] != undefined) {
            if (['os', 'valer', 'xn--vler-qoa'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'fm' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'buskerud' && wa[3] != undefined) {
            if (wa[2] == 'nes') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'bu' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'akershus' && wa[3] != undefined) {
            if (wa[2] == 'nes') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ah' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'aa' && wa[3] != undefined) {
            if (wa[2] == 'gs') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (['aa', 'aarborte', 'aejrie', 'afjord', 'agdenes', 'ah', 'aknoluokta', 'akrehamn', 'al', 'alaheadju', 'alesund', 'algard', 'alstahaug', 'alta', 'alvdal', 'amli', 'amot', 'andasuolo', 'andebu', 'andoy', 'ardal', 'aremark', 'arendal', 'arna', 'aseral', 'asker', 'askim', 'askoy', 'askvoll', 'asnes', 'audnedaln', 'aukra', 'aure', 'aurland', 'aurskog-holand', 'austevoll', 'austrheim', 'averoy', 'badaddja', 'bahcavuotna', 'bahccavuotna', 'baidar', 'bajddar', 'balat', 'balestrand', 'ballangen', 'balsfjord', 'bamble', 'bardu', 'barum', 'batsfjord', 'bearalvahki', 'beardu', 'beiarn', 'berg', 'bergen', 'berlevag', 'bievat', 'bindal', 'birkenes', 'bjarkoy', 'bjerkreim', 'bjugn', 'bodo', 'bokn', 'bomlo', 'bremanger', 'bronnoy', 'bronnoysund', 'brumunddal', 'bryne', 'bu', 'budejju', 'bygland', 'bykle', 'cahcesuolo', 'davvenjarga', 'davvesiida', 'deatnu', 'dep', 'dielddanuorri', 'divtasvuodna', 'divttasvuotna', 'donna', 'dovre', 'drammen', 'drangedal', 'drobak', 'dyroy', 'egersund', 'eid', 'eidfjord', 'eidsberg', 'eidskog', 'eidsvoll', 'eigersund', 'elverum', 'enebakk', 'engerdal', 'etne', 'etnedal', 'evenassi', 'evenes', 'evje-og-hornnes', 'farsund', 'fauske', 'fedje', 'fet', 'fetsund', 'fhs', 'finnoy', 'fitjar', 'fjaler', 'fjell', 'fla', 'flakstad', 'flatanger', 'flekkefjord', 'flesberg', 'flora', 'floro', 'fm', 'folkebibl', 'folldal', 'forde', 'forsand', 'fosnes', 'frana', 'fredrikstad', 'frei', 'frogn', 'froland', 'frosta', 'froya', 'fuoisku', 'fuossko', 'fusa', 'fylkesbibl', 'fyresdal', 'gaivuotna', 'galsa', 'gamvik', 'gangaviika', 'gaular', 'gausdal', 'giehtavuoatna', 'gildeskal', 'giske', 'gjemnes', 'gjerdrum', 'gjerstad', 'gjesdal', 'gjovik', 'gloppen', 'gol', 'gran', 'grane', 'granvin', 'gratangen', 'grimstad', 'grong', 'grue', 'gulen', 'guovdageaidnu', 'ha', 'habmer', 'hadsel', 'hagebostad', 'halden', 'halsa', 'hamar', 'hamaroy', 'hammarfeasta', 'hammerfest', 'hapmir', 'haram', 'hareid', 'harstad', 'hasvik', 'hattfjelldal', 'haugesund', 'hemne', 'hemnes', 'hemsedal', 'herad', 'hitra', 'hjartdal', 'hjelmeland', 'hl', 'hm', 'hobol', 'hof', 'hokksund', 'hol', 'hole', 'holmestrand', 'holtalen', 'honefoss', 'hornindal', 'horten', 'hoyanger', 'hoylandet', 'hurdal', 'hurum', 'hvaler', 'hyllestad', 'ibestad', 'idrett', 'inderoy', 'iveland', 'ivgu', 'jan-mayen', 'jessheim', 'jevnaker', 'jolster', 'jondal', 'jorpeland', 'kafjord', 'karasjohka', 'karasjok', 'karlsoy', 'karmoy', 'kautokeino', 'kirkenes', 'klabu', 'klepp', 'kommune', 'kongsberg', 'kongsvinger', 'kopervik', 'kraanghke', 'kragero', 'kristiansand', 'kristiansund', 'krodsherad', 'krokstadelva', 'kvafjord', 'kvalsund', 'kvam', 'kvanangen', 'kvinesdal', 'kvinnherad', 'kviteseid', 'kvitsoy', 'laakesvuemie', 'lahppi', 'langevag', 'lardal', 'larvik', 'lavagis', 'lavangen', 'leangaviika', 'lebesby', 'leikanger', 'leirfjord', 'leirvik', 'leka', 'leksvik', 'lenvik', 'lerdal', 'lesja', 'levanger', 'lier', 'lierne', 'lillehammer', 'lillesand', 'lindas', 'lindesnes', 'loabat', 'lodingen', 'lom', 'loppa', 'lorenskog', 'loten', 'lund', 'lunner', 'luroy', 'luster', 'lyngdal', 'lyngen', 'malatvuopmi', 'malselv', 'malvik', 'mandal', 'marker', 'marnardal', 'masfjorden', 'masoy', 'matta-varjjat', 'meland', 'meldal', 'melhus', 'meloy', 'meraker', 'midsund', 'midtre-gauldal', 'mil', 'mjondalen', 'mo-i-rana', 'moareke', 'modalen', 'modum', 'molde', 'mosjoen', 'moskenes', 'moss', 'mosvik', 'mr', 'muosat', 'museum', 'naamesjevuemie', 'namdalseid', 'namsos', 'namsskogan', 'nannestad', 'naroy', 'narviika', 'narvik', 'naustdal', 'navuotna', 'nedre-eiker', 'nesna', 'nesodden', 'nesoddtangen', 'nesseby', 'nesset', 'nissedal', 'nittedal', 'nl', 'nord-aurdal', 'nord-fron', 'nord-odal', 'norddal', 'nordkapp', 'nordre-land', 'nordreisa', 'nore-og-uvdal', 'notodden', 'notteroy', 'nt', 'odda', 'of', 'oksnes', 'ol', 'omasvuotna', 'oppdal', 'oppegard', 'orkanger', 'orkdal', 'orland', 'orskog', 'orsta', 'osen', 'oslo', 'osoyro', 'osteroy', 'ostre-toten', 'overhalla', 'ovre-eiker', 'oyer', 'oygarden', 'oystre-slidre', 'porsanger', 'porsangu', 'porsgrunn', 'priv', 'rade', 'radoy', 'rahkkeravju', 'raholt', 'raisa', 'rakkestad', 'ralingen', 'rana', 'randaberg', 'rauma', 'rendalen', 'rennebu', 'rennesoy', 'rindal', 'ringebu', 'ringerike', 'ringsaker', 'risor', 'rissa', 'rl', 'roan', 'rodoy', 'rollag', 'romsa', 'romskog', 'roros', 'rost', 'royken', 'royrvik', 'ruovat', 'rygge', 'salangen', 'salat', 'saltdal', 'samnanger', 'sandefjord', 'sandnes', 'sandnessjoen', 'sandoy', 'sarpsborg', 'sauda', 'sauherad', 'sel', 'selbu', 'selje', 'seljord', 'sf', 'siellak', 'sigdal', 'siljan', 'sirdal', 'skanit', 'skanland', 'skaun', 'skedsmo', 'skedsmokorset', 'ski', 'skien', 'skierva', 'skiptvet', 'skjak', 'skjervoy', 'skodje', 'slattum', 'smola', 'snaase', 'snasa', 'snillfjord', 'snoasa', 'sogndal', 'sogne', 'sokndal', 'sola', 'solund', 'somna', 'sondre-land', 'songdalen', 'sor-aurdal', 'sor-fron', 'sor-odal', 'sor-varanger', 'sorfold', 'sorreisa', 'sortland', 'sorum', 'spjelkavik', 'spydeberg', 'st', 'stange', 'stat', 'stathelle', 'stavanger', 'stavern', 'steigen', 'steinkjer', 'stjordal', 'stjordalshalsen', 'stokke', 'stor-elvdal', 'stord', 'stordal', 'storfjord', 'strand', 'stranda', 'stryn', 'sula', 'suldal', 'sund', 'sunndal', 'surnadal', 'svalbard', 'sveio', 'svelvik', 'sykkylven', 'tana', 'tananger', 'time', 'tingvoll', 'tinn', 'tjeldsund', 'tjome', 'tm', 'tokke', 'tolga', 'tonsberg', 'torsken', 'tr', 'trana', 'tranby', 'tranoy', 'troandin', 'trogstad', 'tromsa', 'tromso', 'trondheim', 'trysil', 'tvedestrand', 'tydal', 'tynset', 'tysfjord', 'tysnes', 'tysvar', 'uenorge', 'ullensaker', 'ullensvang', 'ulvik', 'unjarga', 'utsira', 'va', 'vaapste', 'vadso', 'vaga', 'vagan', 'vagsoy', 'vaksdal', 'valle', 'vang', 'vanylven', 'vardo', 'varggat', 'varoy', 'vefsn', 'vega', 'vegarshei', 'vennesla', 'verdal', 'verran', 'vestby', 'vestnes', 'vestre-slidre', 'vestre-toten', 'vestvagoy', 'vevelstad', 'vf', 'vgs', 'vik', 'vikna', 'vindafjord', 'voagat', 'volda', 'voss', 'vossevangen', 'xn--andy-ira', 'xn--asky-ira', 'xn--aurskog-hland-jnb', 'xn--avery-yua', 'xn--bdddj-mrabd', 'xn--bearalvhki-y4a', 'xn--berlevg-jxa', 'xn--bhcavuotna-s4a', 'xn--bhccavuotna-k7a', 'xn--bidr-5nac', 'xn--bievt-0qa', 'xn--bjarky-fya', 'xn--bjddar-pta', 'xn--blt-elab', 'xn--bmlo-gra', 'xn--bod-2na', 'xn--brnny-wuac', 'xn--brnnysund-m8ac', 'xn--brum-voa', 'xn--btsfjord-9za', 'xn--davvenjrga-y4a', 'xn--dnna-gra', 'xn--drbak-wua', 'xn--dyry-ira', 'xn--eveni-0qa01ga', 'xn--finny-yua', 'xn--fjord-lra', 'xn--fl-zia', 'xn--flor-jra', 'xn--frde-gra', 'xn--frna-woa', 'xn--frya-hra', 'xn--ggaviika-8ya47h', 'xn--gildeskl-g0a', 'xn--givuotna-8ya', 'xn--gjvik-wua', 'xn--gls-elac', 'xn--h-2fa', 'xn--hbmer-xqa', 'xn--hcesuolo-7ya35b', 'xn--hgebostad-g3a', 'xn--hmmrfeasta-s4ac', 'xn--hnefoss-q1a', 'xn--hobl-ira', 'xn--holtlen-hxa', 'xn--hpmir-xqa', 'xn--hyanger-q1a', 'xn--hylandet-54a', 'xn--indery-fya', 'xn--jlster-bya', 'xn--jrpeland-54a', 'xn--karmy-yua', 'xn--kfjord-iua', 'xn--klbu-woa', 'xn--koluokta-7ya57h', 'xn--krager-gya', 'xn--kranghke-b0a', 'xn--krdsherad-m8a', 'xn--krehamn-dxa', 'xn--krjohka-hwab49j', 'xn--ksnes-uua', 'xn--kvfjord-nxa', 'xn--kvitsy-fya', 'xn--kvnangen-k0a', 'xn--l-1fa', 'xn--laheadju-7ya', 'xn--langevg-jxa', 'xn--ldingen-q1a', 'xn--leagaviika-52b', 'xn--lesund-hua', 'xn--lgrd-poac', 'xn--lhppi-xqa', 'xn--linds-pra', 'xn--loabt-0qa', 'xn--lrdal-sra', 'xn--lrenskog-54a', 'xn--lt-liac', 'xn--lten-gra', 'xn--lury-ira', 'xn--mely-ira', 'xn--merker-kua', 'xn--mjndalen-64a', 'xn--mlatvuopmi-s4a', 'xn--mli-tla', 'xn--mlselv-iua', 'xn--moreke-jua', 'xn--mosjen-eya', 'xn--mot-tla', 'xn--msy-ula0h', 'xn--mtta-vrjjat-k7af', 'xn--muost-0qa', 'xn--nmesjevuemie-tcba', 'xn--nry-yla5g', 'xn--nttery-byae', 'xn--nvuotna-hwa', 'xn--oppegrd-ixa', 'xn--ostery-fya', 'xn--osyro-wua', 'xn--porsgu-sta26f', 'xn--rady-ira', 'xn--rdal-poa', 'xn--rde-ula', 'xn--rdy-0nab', 'xn--rennesy-v1a', 'xn--rhkkervju-01af', 'xn--rholt-mra', 'xn--risa-5na', 'xn--risr-ira', 'xn--rland-uua', 'xn--rlingen-mxa', 'xn--rmskog-bya', 'xn--rros-gra', 'xn--rskog-uua', 'xn--rst-0na', 'xn--rsta-fra', 'xn--ryken-vua', 'xn--ryrvik-bya', 'xn--s-1fa', 'xn--sandnessjen-ogb', 'xn--sandy-yua', 'xn--seral-lra', 'xn--sgne-gra', 'xn--skierv-uta', 'xn--skjervy-v1a', 'xn--skjk-soa', 'xn--sknit-yqa', 'xn--sknland-fxa', 'xn--slat-5na', 'xn--slt-elab', 'xn--smla-hra', 'xn--smna-gra', 'xn--snase-nra', 'xn--sndre-land-0cb', 'xn--snes-poa', 'xn--snsa-roa', 'xn--sr-aurdal-l8a', 'xn--sr-fron-q1a', 'xn--sr-odal-q1a', 'xn--sr-varanger-ggb', 'xn--srfold-bya', 'xn--srreisa-q1a', 'xn--srum-gra', 'xn--stjrdal-s1a', 'xn--stjrdalshalsen-sqb', 'xn--stre-toten-zcb', 'xn--tjme-hra', 'xn--tnsberg-q1a', 'xn--trany-yua', 'xn--trgstad-r1a', 'xn--trna-woa', 'xn--troms-zua', 'xn--tysvr-vra', 'xn--unjrga-rta', 'xn--vads-jra', 'xn--vard-jra', 'xn--vegrshei-c0a', 'xn--vestvgy-ixa6o', 'xn--vg-yiab', 'xn--vgan-qoa', 'xn--vgsy-qoa0j', 'xn--vre-eiker-k8a', 'xn--vrggt-xqad', 'xn--vry-yla5g', 'xn--yer-zna', 'xn--ygarden-p1a', 'xn--ystre-slidre-ujb'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'np':
         if (['aero', 'asia', 'biz', 'com', 'coop', 'edu', 'gov', 'info', 'jobs', 'mil', 'mobi', 'museum', 'name', 'net', 'org', 'pro', 'services', 'travel'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'nr':
         if (['biz', 'com', 'edu', 'gov', 'info', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'nz':
         if (['ac', 'archie', 'co', 'cri', 'geek', 'gen', 'govt', 'health', 'iwi', 'kiwi', 'maori', 'mil', 'net', 'org', 'parliament', 'school', 'xn--mori-qsa'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'om':
         if (['co', 'com', 'edu', 'gov', 'med', 'museum', 'net', 'org', 'pro'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'org':
         if (wa[1] == 'eu' && wa[3] != undefined) {
            if (['al', 'asso', 'at', 'au', 'be', 'bg', 'ca', 'cd', 'ch', 'cn', 'cy', 'cz', 'de', 'dk', 'edu', 'ee', 'es', 'fi', 'fr', 'gr', 'hr', 'hu', 'ie', 'il', 'in', 'int', 'is', 'it', 'jp', 'kr', 'lt', 'lu', 'lv', 'me', 'mk', 'mt', 'my', 'net', 'ng', 'nl', 'no', 'nz', 'pl', 'pt', 'ro', 'ru', 'se', 'si', 'sk', 'tr', 'uk', 'us'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (['ae', 'eu', 'hk', 'jpn', 'js', 'us', 'za'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'pa':
         if (['abo', 'ac', 'com', 'edu', 'gob', 'ing', 'med', 'net', 'nom', 'org', 'sld'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'pe':
         if (['com', 'edu', 'gob', 'mil', 'net', 'nom', 'org', 'sld'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'pf':
         if (['com', 'edu', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'pg':
         if (['ac', 'com', 'gov', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ph':
         if (['com', 'edu', 'gov', 'i', 'mil', 'net', 'ngo', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'pk':
         if (['biz', 'com', 'edu', 'fam', 'gob', 'gok', 'gon', 'gop', 'gos', 'gov', 'info', 'net', 'org', 'web'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'pl':
         if (wa[1] == 'gov' && wa[3] != undefined) {
            if (['ap', 'griw', 'ic', 'is', 'kmpsp', 'konsulat', 'kppsp', 'kwp', 'kwpsp', 'mup', 'mw', 'oirm', 'oum', 'pa', 'pinb', 'piw', 'po', 'psp', 'psse', 'pup', 'rzgw', 'sa', 'sdn', 'sko', 'so', 'sr', 'starostwo', 'ug', 'ugim', 'um', 'umig', 'upow', 'uppo', 'us', 'uw', 'uzs', 'wif', 'wiih', 'winb', 'wios', 'witd', 'wiw', 'wsa', 'wskr', 'wuoz', 'wzmiuw', 'zp'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (['agro', 'aid', 'art', 'atm', 'augustow', 'auto', 'babia-gora', 'bedzin', 'beskidy', 'bialowieza', 'bialystok', 'bielawa', 'bieszczady', 'biz', 'boleslawiec', 'bydgoszcz', 'bytom', 'cieszyn', 'com', 'czeladz', 'czest', 'dlugoleka', 'edu', 'elblag', 'elk', 'gda', 'gdansk', 'glogow', 'gmina', 'gniezno', 'gorlice', 'gov', 'grajewo', 'gsm', 'ilawa', 'info', 'jaworzno', 'jelenia-gora', 'jgora', 'kalisz', 'karpacz', 'kartuzy', 'kaszuby', 'katowice', 'kazimierz-dolny', 'kepno', 'ketrzyn', 'klodzko', 'kobierzyce', 'kolobrzeg', 'konin', 'konskowola', 'krakow', 'kutno', 'lapy', 'lebork', 'legnica', 'lezajsk', 'limanowa', 'lodz', 'lomza', 'lowicz', 'lubin', 'lublin', 'lukow', 'mail', 'malbork', 'malopolska', 'mazowsze', 'mazury', 'media', 'miasta', 'mielec', 'mielno', 'mil', 'mragowo', 'naklo', 'net', 'ngo', 'nieruchomosci', 'nom', 'nowaruda', 'nysa', 'olawa', 'olecko', 'olkusz', 'olsztyn', 'opoczno', 'opole', 'org', 'ostroda', 'ostroleka', 'ostrowiec', 'ostrowwlkp', 'pc', 'pila', 'pisz', 'podhale', 'podlasie', 'polkowice', 'pomorskie', 'pomorze', 'powiat', 'poznan', 'priv', 'prochowice', 'pruszkow', 'przeworsk', 'pulawy', 'radom', 'rawa-maz', 'realestate', 'rel', 'rybnik', 'rzeszow', 'sanok', 'sejny', 'sex', 'shop', 'sklep', 'skoczow', 'slask', 'slupsk', 'sos', 'sosnowiec', 'stalowa-wola', 'starachowice', 'stargard', 'suwalki', 'swidnica', 'swiebodzin', 'swinoujscie', 'szczecin', 'szczytno', 'szkola', 'targi', 'tarnobrzeg', 'tgory', 'tm', 'torun', 'tourism', 'travel', 'turek', 'turystyka', 'tychy', 'ustka', 'walbrzych', 'warmia', 'warszawa', 'waw', 'wegrow', 'wielun', 'wlocl', 'wloclawek', 'wodzislaw', 'wolomin', 'wroc', 'wroclaw', 'zachpomor', 'zagan', 'zarow', 'zgora', 'zgorzelec'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'pn':
         if (['co', 'edu', 'eu', 'gov', 'government', 'in', 'me', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'pr':
         if (['ac', 'biz', 'com', 'edu', 'est', 'gov', 'info', 'isla', 'name', 'net', 'org', 'pro', 'prof'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'pro':
         if (['aaa', 'aca', 'acct', 'avocat', 'bar', 'cpa', 'eng', 'jur', 'law', 'med', 'recht'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ps':
         if (['com', 'edu', 'gov', 'net', 'org', 'plo', 'sec'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'pt':
         if (['com', 'edu', 'gov', 'int', 'net', 'nome', 'org', 'publ'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'pw':
         if (['belau', 'co', 'ed', 'go', 'ne', 'or'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'py':
         if (['com', 'coop', 'edu', 'gov', 'mil', 'net', 'org', 'una'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'qa':
         if (['com', 'edu', 'gov', 'mil', 'name', 'net', 'org', 'sch'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 're':
         if (['asso', 'com', 'nom'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ro':
         if (['arts', 'com', 'firm', 'gov', 'info', 'nom', 'nt', 'org', 'rec', 'store', 'tm', 'www'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'rs':
         if (['ac', 'co', 'edu', 'gov', 'in', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ru':
         if (['ac', 'adygeya', 'altai', 'amur', 'amursk', 'arkhangelsk', 'astrakhan', 'baikal', 'bashkiria', 'belgorod', 'bir', 'bryansk', 'buryatia', 'cap', 'cbg', 'chel', 'chelyabinsk', 'chita', 'chukotka', 'cmw', 'com', 'dagestan', 'e-burg', 'edu', 'fareast', 'gov', 'grozny', 'int', 'irkutsk', 'ivanovo', 'izhevsk', 'jamal', 'jar', 'joshkar-ola', 'k-uralsk', 'kalmykia', 'kaluga', 'kamchatka', 'karelia', 'kazan', 'kchr', 'kemerovo', 'khabarovsk', 'khakassia', 'khv', 'kirov', 'kms', 'koenig', 'komi', 'kostroma', 'krasnoyarsk', 'kuban', 'kurgan', 'kursk', 'kustanai', 'kuzbass', 'lipetsk', 'magadan', 'magnitka', 'mari', 'mari-el', 'marine', 'mil', 'mordovia', 'mos', 'mosreg', 'msk', 'murmansk', 'mytis', 'nakhodka', 'nalchik', 'net', 'nkz', 'nnov', 'norilsk', 'nov', 'novosibirsk', 'nsk', 'omsk', 'orenburg', 'org', 'oryol', 'oskol', 'palana', 'penza', 'perm', 'pp', 'pskov', 'ptz', 'pyatigorsk', 'rnd', 'rubtsovsk', 'ryazan', 'sakhalin', 'samara', 'saratov', 'simbirsk', 'smolensk', 'snz', 'spb', 'stavropol', 'stv', 'surgut', 'syzran', 'tambov', 'tatarstan', 'test', 'tlt', 'tom', 'tomsk', 'tsaritsyn', 'tsk', 'tula', 'tuva', 'tver', 'tyumen', 'udm', 'udmurtia', 'ulan-ude', 'vdonsk', 'vladikavkaz', 'vladimir', 'vladivostok', 'volgograd', 'vologda', 'voronezh', 'vrn', 'vyatka', 'yakutia', 'yamal', 'yaroslavl', 'yekaterinburg', 'yuzhno-sakhalinsk', 'zgrad'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'rw':
         if (['ac', 'co', 'com', 'coop', 'edu', 'gouv', 'gov', 'int', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'sa':
         if (['com', 'edu', 'gov', 'med', 'net', 'org', 'pub', 'sch'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'sb':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'sc':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'scot':
         if (wa[1] == 'gov') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'sd':
         if (['com', 'edu', 'gov', 'info', 'med', 'net', 'org', 'tv'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'se':
         if (['a', 'ac', 'b', 'bd', 'brand', 'c', 'd', 'e', 'f', 'fh', 'fhsk', 'fhv', 'g', 'gov', 'h', 'i', 'k', 'komforb', 'kommunalforbund', 'komvux', 'l', 'lanbib', 'm', 'n', 'naturbruksgymn', 'o', 'org', 'p', 'parti', 'pp', 'press', 'r', 's', 't', 'tm', 'u', 'w', 'x', 'y', 'z'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'sg':
         if (['com', 'edu', 'gov', 'idn', 'net', 'org', 'per'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'sh':
         if (['com', 'gov', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'si':
         if (wa[1] == 'gov') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'sk':
         if (wa[1] == 'gov') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'sl':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'sn':
         if (['art', 'com', 'edu', 'gouv', 'org', 'perso', 'univ'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'so':
         if (['com', 'edu', 'gm', 'gov', 'hs', 'jl', 'me', 'net', 'org', 'pl', 'sch', 'sw'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ss':
         if (['biz', 'com', 'edu', 'gov', 'me', 'net', 'org', 'sch'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'st':
         if (['co', 'com', 'consulado', 'edu', 'embaixada', 'gov', 'mil', 'net', 'org', 'principe', 'saotome', 'store'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'sv':
         if (['com', 'edu', 'gob', 'gov', 'org', 'red'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'sx':
         if (wa[1] == 'gov') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'sy':
         if (['com', 'edu', 'gov', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'sz':
         if (['ac', 'co', 'gov', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'th':
         if (['ac', 'co', 'go', 'in', 'mi', 'net', 'or'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'tj':
         if (['ac', 'aero', 'biz', 'co', 'com', 'coop', 'dyn', 'edu', 'go', 'gov', 'info', 'int', 'mil', 'museum', 'my', 'name', 'net', 'nic', 'org', 'per', 'pro', 'test', 'web'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'tl':
         if (wa[1] == 'gov') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'tm':
         if (['co', 'com', 'edu', 'gov', 'mil', 'net', 'nom', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'tn':
         if (['agrinet', 'com', 'defense', 'edunet', 'ens', 'fin', 'gov', 'ind', 'info', 'intl', 'mincom', 'nat', 'net', 'org', 'perso', 'rnrt', 'rns', 'rnu', 'tourism', 'turen'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'to':
         if (['com', 'edu', 'gov', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'tr':
         if (wa[1] == 'nc' && wa[3] != undefined) {
            if (wa[2] == 'gov') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (['av', 'bbs', 'bel', 'biz', 'com', 'dr', 'edu', 'gen', 'gov', 'info', 'k12', 'kep', 'mil', 'name', 'nc', 'net', 'nom', 'org', 'pol', 'tel', 'tsk', 'tv', 'web'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'tt':
         if (['aero', 'biz', 'co', 'com', 'coop', 'edu', 'gov', 'info', 'int', 'jobs', 'mobi', 'museum', 'name', 'net', 'org', 'pro', 'travel'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'tw':
         if (['club', 'com', 'ebiz', 'edu', 'game', 'gov', 'idv', 'mil', 'net', 'org', 'xn--czrw28b', 'xn--uc0atv', 'xn--zf0ao64a'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'tz':
         if (['ac', 'co', 'go', 'hotel', 'info', 'me', 'mil', 'mobi', 'ne', 'or', 'sc', 'tv'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ua':
         if (['at', 'cherkassy', 'cherkasy', 'chernigov', 'chernihiv', 'chernivtsi', 'chernovtsy', 'ck', 'cn', 'co', 'com', 'cr', 'crimea', 'cv', 'dn', 'dnepropetrovsk', 'dnipropetrovsk', 'dominic', 'donetsk', 'dp', 'edu', 'gov', 'if', 'in', 'ivano-frankivsk', 'kh', 'kharkiv', 'kharkov', 'kherson', 'khmelnitskiy', 'khmelnytskyi', 'kiev', 'kirovograd', 'km', 'kr', 'krym', 'ks', 'kv', 'kyiv', 'lg', 'lt', 'lugansk', 'lutsk', 'lv', 'lviv', 'mk', 'mykolaiv', 'net', 'nikolaev', 'od', 'odesa', 'odessa', 'org', 'pl', 'poltava', 'pp', 'rivne', 'rovno', 'rv', 'sb', 'sebastopol', 'sevastopol', 'sm', 'sumy', 'te', 'ternopil', 'uz', 'uzhgorod', 'vinnica', 'vinnytsia', 'vn', 'volyn', 'yalta', 'zaporizhzhe', 'zaporizhzhia', 'zhitomir', 'zhytomyr', 'zp', 'zt'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ug':
         if (['ac', 'co', 'com', 'go', 'ne', 'or', 'org', 'sc'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'uk':
         if (['ac', 'bl', 'british-library', 'co', 'gov', 'govt', 'jcpc', 'jet', 'judiciary', 'lea', 'ltd', 'me', 'mil', 'mod', 'net', 'nhs', 'nic', 'nls', 'org', 'orgn', 'parliament', 'plc', 'police', 'rct', 'royal', 'sch', 'supremecourt'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'us':
         if (wa[1] == 'wy' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'wv' && wa[3] != undefined) {
            if (wa[2] == 'cc') {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'wi' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'wa' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'vt' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'vi' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'va' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ut' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'tx' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'tn' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'sd' && wa[3] != undefined) {
            if (['cc', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'sc' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ri' && wa[3] != undefined) {
            if (['cc', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'pr' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'pa' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'or' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ok' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'oh' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ny' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'nv' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'nm' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'nj' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'nh' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ne' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'nd' && wa[3] != undefined) {
            if (['cc', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'nc' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'mt' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ms' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'mo' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'mn' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'mi' && wa[3] != undefined) {
            if (['ann-arbor', 'cc', 'cog', 'dst', 'eaton', 'gen', 'k12', 'lib', 'mus', 'tec', 'washtenaw'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'me' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'md' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ma' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'la' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ky' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ks' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'in' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'il' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'id' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ia' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'hi' && wa[3] != undefined) {
            if (['cc', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'gu' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ga' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'fl' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'de' && wa[3] != undefined) {
            if (['cc', 'k12'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'dc' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ct' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'co' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ca' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'az' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'as' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ar' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'al' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (wa[1] == 'ak' && wa[3] != undefined) {
            if (['cc', 'k12', 'lib'].includes(wa[2])) {
               return wa[3] + '.' + wa[2] + '.' + wa[1] + '.' + wa[0];
            }
         }
         if (['aa', 'ae', 'ak', 'al', 'ap', 'ar', 'as', 'az', 'ca', 'cm', 'co', 'ct', 'cz', 'dc', 'de', 'dni', 'fed', 'fl', 'fm', 'ga', 'gu', 'hi', 'ia', 'id', 'il', 'in', 'isa', 'kids', 'ks', 'ky', 'la', 'ma', 'md', 'me', 'mh', 'mi', 'mn', 'mo', 'mp', 'ms', 'mt', 'nb', 'nc', 'nd', 'ne', 'nh', 'nj', 'nm', 'nsn', 'nv', 'ny', 'oh', 'ok', 'or', 'pa', 'pi', 'pr', 'pw', 'ri', 'sc', 'sd', 'tn', 'tt', 'tx', 'ut', 'va', 'vi', 'vt', 'wa', 'wi', 'wv', 'wy'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'uy':
         if (['com', 'edu', 'gub', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'uz':
         if (['co', 'com', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'vc':
         if (['com', 'edu', 'gov', 'mil', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 've':
         if (['arts', 'bib', 'co', 'com', 'e12', 'edu', 'firm', 'gob', 'gov', 'info', 'int', 'mil', 'net', 'nom', 'org', 'radio', 'rar', 'rec', 'store', 'tec', 'web'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'vi':
         if (['co', 'com', 'k12', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'vn':
         if (['ac', 'biz', 'com', 'edu', 'gov', 'health', 'info', 'int', 'mil', 'name', 'net', 'org', 'pro'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'vu':
         if (['com', 'edu', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'wales':
         if (wa[1] == 'gov') {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ws':
         if (['com', 'edu', 'gov', 'net', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'xn--4dbrk0ce':
         if (['xn--4dbgdty6c', 'xn--5dbhl8d', 'xn--8dbq2a', 'xn--hebda8b'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'xn--90a3ac':
         if (['xn--80au', 'xn--90azh', 'xn--c1avg', 'xn--d1at', 'xn--o1ac', 'xn--o1ach'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'xn--j6w193g':
         if (['xn--55qx5d', 'xn--gmqw5a', 'xn--mxtq1m', 'xn--od0alg', 'xn--uc0atv', 'xn--wcvs22d'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'xn--o3cw4h':
         if (['xn--12c1fe0br', 'xn--12cfi8ixb8l', 'xn--12co0c3b4eva', 'xn--h3cuzk1di', 'xn--m3ch0j3a', 'xn--o3cyx2a'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'ye':
         if (['co', 'com', 'edu', 'gov', 'ltd', 'me', 'mil', 'net', 'org', 'plc'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'za':
         if (['ac', 'agric', 'alt', 'bourse', 'city', 'co', 'cybernet', 'db', 'edu', 'gov', 'grondar', 'iaccess', 'imt', 'inca', 'landesign', 'law', 'mil', 'net', 'ngo', 'nic', 'nis', 'nom', 'olivetti', 'org', 'pix', 'school', 'tm', 'web'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'zm':
         if (['ac', 'biz', 'co', 'com', 'edu', 'gov', 'info', 'mil', 'net', 'org', 'sch'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
      case 'zw':
         if (['ac', 'co', 'gov', 'mil', 'org'].includes(wa[1])) {
            return wa[2] + '.' + wa[1] + '.' + wa[0];
         }
         break;
   }
   return wa[1] + '.' + wa[0];
}
async function reload_config() {
   await browser.storage.local.get('conf').then(r => {
      if (r.conf) {
         let shouldWork = false;
         myActiveCats = [];
         for (let rI in r.conf) {
            if (rI.startsWith('nocat') && r['conf'][rI] == 1) {
               shouldWork = true;
               myActiveCats.push(rI);
            }
         }
         _working = shouldWork;
         myConfig = JSON.parse(JSON.stringify(r.conf));
         if (myConfig['ignored'] == undefined) {
            myConfig['ignored'] = {};
         }
      } else {
         _working = false;
         myConfig['ignored'] = {};
      }
   });
}
if (!_done) {
   _done = true;
   reload_config();
}
function dailyUpdater() {
   if (myConfig['opt01'] && myConfig['opt01'] == 1) {
      stopDownload();
      startDownload();
   }
   setTimeout(dailyUpdater, 86400000); //1d
}
setTimeout(dailyUpdater, 3600000); //1h
function notify_me(x) {
   browser.notifications.clear(notify);
   let catname, dom, msg = '';
   for (let xl in x) {
      xlx = xl.split('@', 2);
      catname = nocat_to_catname(xlx[0]);
      dom = xlx[1];
      msg += catname + ' ' + dom + "\n";
   }
   browser.notifications.create(notify, {
      'type': 'basic',
      'title': 'Blocked ' + dom,
      'message': msg,
      iconUrl: browser.runtime.getURL('i/' + catname + '.png')
   });
}
browser.webRequest.onBeforeRequest.addListener(g => {
   if (!_working) {
      return;
   }
   let fqdn = (new URL(g.url)).hostname,
      domain = get_realdomain(fqdn);
   if (domain.length < 4) {
      return;
   }
   if (myConfig['ignored'][domain] || myConfig['ignored'][fqdn]) {
      return;
   }
   let keys = [];
   for (let cat of myActiveCats) {
      keys.push(cat + '@' + fqdn);
      keys.push(cat + '@' + domain);
   }
   return new Promise((o, n) => {
      browser.storage.local.get(keys).then(x => {
         if (Object.keys(x).length >= 1) {
            if (myConfig['opt02'] == 1) {
               notify_me(x);
            }
            if (g.type == 'image') {
               o({
                  redirectUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQBCgAAACwAAAAAAQABAAACAkQBADs='
               });
            } else if (myConfig['opt03'] == 1 && g.type == 'main_frame') {
               o({
                  redirectUrl: browser.runtime.getURL('blocked.html#' + domain)
               });
            } else {
               o({
                  cancel: true
               });
            }
         } else {
            o({});
         }
      }, () => {
         o({});
      });
   });
}, {
   urls: ["http://*/*", "https://*/*"]
}, ['blocking']);
browser.runtime.onMessage.addListener((r, s, sr) => {
   if (r[0] == 'reload') {
      reload_config();
      stopDownload();
      sr([true]);
   }
   if (r[0] == 'update') {
      startDownload();
      sr([true]);
   }
   if (r[0] == 'ping') {
      sr(_updatelog);
   }
   return true;
});