# How to Block Cloudflare
## with DNS

This page show you how to block CloudFlare websites with localhost DNS server.


### With DNSMasq (Type 1)

1. Install `dnsmasq`.
2. Open configuration file of dnsmasq.
3. Add those lines to your config file and restart dnsmasq.
4. Try `dig www.emsisoft.com`

```
bogus-nxdomain=103.21.244.0/22
bogus-nxdomain=103.22.200.0/22
bogus-nxdomain=103.31.4.0/22
bogus-nxdomain=104.16.0.0/13
bogus-nxdomain=104.24.0.0/14
bogus-nxdomain=108.162.192.0/18
bogus-nxdomain=131.0.72.0/22
bogus-nxdomain=141.101.64.0/18
bogus-nxdomain=162.158.0.0/15
bogus-nxdomain=172.64.0.0/13
bogus-nxdomain=173.245.48.0/20
bogus-nxdomain=188.114.96.0/20
bogus-nxdomain=190.93.240.0/20
bogus-nxdomain=197.234.240.0/22
bogus-nxdomain=198.41.128.0/17
bogus-nxdomain=2400:cb00::/32
bogus-nxdomain=2405:8100::/32
bogus-nxdomain=2405:b500::/32
bogus-nxdomain=2606:4700::/32
bogus-nxdomain=2803:f800::/32
bogus-nxdomain=2a06:98c0::/29
bogus-nxdomain=2c0f:f248::/32
```

### With DNSMasq (Type 2)

In step 3, add those lines and restart dnsmasq.

```
stop-dns-rebind
alias=104.16.0.0-104.23.255.255,127.0.0.0,255.255.255.0
alias=104.24.0.0-104.27.255.255,127.0.0.0,255.255.255.0
```

### With PowerDNS

```
badips = newNMG()
badips:addMask("103.21.244.0/22")
badips:addMask("103.22.200.0/22")
badips:addMask("103.31.4.0/22")
badips:addMask("104.16.0.0/13")
badips:addMask("104.24.0.0/14")
badips:addMask("108.162.192.0/18")
badips:addMask("131.0.72.0/22")
badips:addMask("141.101.64.0/18")
badips:addMask("162.158.0.0/15")
badips:addMask("172.64.0.0/13")
badips:addMask("173.245.48.0/20")
badips:addMask("188.114.96.0/20")
badips:addMask("190.93.240.0/20")
badips:addMask("197.234.240.0/22")
badips:addMask("198.41.128.0/17")
badips:addMask("2400:cb00::/32")
badips:addMask("2405:8100::/32")
badips:addMask("2405:b500::/32")
badips:addMask("2606:4700::/32")
badips:addMask("2803:f800::/32")
badips:addMask("2a06:98c0::/29")
badips:addMask("2c0f:f248::/32")

function ipfilter(rem, loc, dh)
    return badips:match(rem) or dh:getAD()
end
```

### With BIND

```
deny-answer-addresses {
103.21.244.0/22;
103.22.200.0/22;
103.31.4.0/22;
104.16.0.0/13;
104.24.0.0/14;
108.162.192.0/18;
131.0.72.0/22;
141.101.64.0/18;
162.158.0.0/15;
172.64.0.0/13;
173.245.48.0/20;
188.114.96.0/20;
190.93.240.0/20;
197.234.240.0/22;
198.41.128.0/17;
2400:cb00::/32;
2405:8100::/32;
2405:b500::/32;
2606:4700::/32;
2803:f800::/32;
2a06:98c0::/29;
2c0f:f248::/32;
} except-from { "localhost.invalid"; };
deny-answer-aliases { "localhost.invalid"; };
```
