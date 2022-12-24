# How to Block Cloudflare
## with Firewall

This page show you how to block CloudFlare websites with your firewall, preventing from connecting to them.


### With UFW

<details><summary> _click me_ </summary>

```
ufw deny from 103.21.244.0/22
ufw deny from 103.22.200.0/22
ufw deny from 103.31.4.0/22
ufw deny from 104.16.0.0/13
ufw deny from 104.24.0.0/14
ufw deny from 108.162.192.0/18
ufw deny from 131.0.72.0/22
ufw deny from 141.101.64.0/18
ufw deny from 162.158.0.0/15
ufw deny from 172.64.0.0/13
ufw deny from 173.245.48.0/20
ufw deny from 188.114.96.0/20
ufw deny from 190.93.240.0/20
ufw deny from 197.234.240.0/22
ufw deny from 198.41.128.0/17
ufw deny from 2400:cb00::/32
ufw deny from 2405:8100::/32
ufw deny from 2405:b500::/32
ufw deny from 2606:4700::/32
ufw deny from 2803:f800::/32
ufw deny from 2a06:98c0::/29
ufw deny from 2c0f:f248::/32
```

</details>

### With iptables

<details><summary> _click me_ </summary>

```
iptables -A input -s 103.21.244.0/22 -j DROP
iptables -A input -s 103.22.200.0/22 -j DROP
iptables -A input -s 103.31.4.0/22 -j DROP
iptables -A input -s 104.16.0.0/13 -j DROP
iptables -A input -s 104.24.0.0/14 -j DROP
iptables -A input -s 108.162.192.0/18 -j DROP
iptables -A input -s 131.0.72.0/22 -j DROP
iptables -A input -s 141.101.64.0/18 -j DROP
iptables -A input -s 162.158.0.0/15 -j DROP
iptables -A input -s 172.64.0.0/13 -j DROP
iptables -A input -s 173.245.48.0/20 -j DROP
iptables -A input -s 188.114.96.0/20 -j DROP
iptables -A input -s 190.93.240.0/20 -j DROP
iptables -A input -s 197.234.240.0/22 -j DROP
iptables -A input -s 198.41.128.0/17 -j DROP
iptables -A input -s 2400:cb00::/32 -j DROP
iptables -A input -s 2405:8100::/32 -j DROP
iptables -A input -s 2405:b500::/32 -j DROP
iptables -A input -s 2606:4700::/32 -j DROP
iptables -A input -s 2803:f800::/32 -j DROP
iptables -A input -s 2a06:98c0::/29 -j DROP
iptables -A input -s 2c0f:f248::/32 -j DROP
```

</details>

### With Windows Firewall

<details><summary> _click me_ </summary>

```
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 103.21.244.0/22
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 103.22.200.0/22
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 103.31.4.0/22
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 104.16.0.0/13
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 104.24.0.0/14
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 108.162.192.0/18
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 131.0.72.0/22
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 141.101.64.0/18
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 162.158.0.0/15
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 172.64.0.0/13
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 173.245.48.0/20
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 188.114.96.0/20
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 190.93.240.0/20
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 197.234.240.0/22
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 198.41.128.0/17
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 2400:cb00::/32
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 2405:8100::/32
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 2405:b500::/32
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 2606:4700::/32
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 2803:f800::/32
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 2a06:98c0::/29
New-NetFirewallRule -DisplayName "Block CF" -Direction Outbound –LocalPort Any -Action Block -RemoteAddress 2c0f:f248::/32
```

</details>
