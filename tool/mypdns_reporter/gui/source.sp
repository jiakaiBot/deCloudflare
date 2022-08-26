gsel 0,-1
onerror *bye
onexit *leave
#define SELF_VER "1.0.1"
#define SELF_NAME "My Privacy DNS Reporter"
#define CONF_FILE "mypdns.conf"
title SELF_NAME
exist "hspext.dll":if (strsize==-1){dialog "DLL not found",1,SELF_NAME:end}
exist dir_cur+"/curl.exe":if (strsize==-1){
exist dir_sys+"/curl.exe":if (strsize==-1){
dialog "curl.exe not found",1,SELF_NAME:end
}else{_curl=dir_sys+"/curl.exe"}
}else{_curl=dir_cur+"/curl.exe"}
#module
#defcfunc sub str o, str ai, str al
	org = o : aim = ai : alt = al
	bef = "" : af = ""
	r = instr(org,0,aim)
	if r = -1 : return org
	bef = strmid(org,0,r)
	af = strmid(org,-1,strlen(org)-strlen(bef)-strlen(aim))
	return bef+alt+af
#defcfunc gsub str o, str ai, str al
	org = o : aim = ai : alt = al
	res = org
	repeat
		r = instr(res,0,aim)
		if r = -1 : break
		res = sub(res,aim,alt)
	loop
	return res
#deffunc __initBase64
	if fInitBase64:return
	encodeTable="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
	dim decodeTable,256/4 : memset decodeTable,128,256
	repeat 26:poke decodeTable,'A'+cnt,cnt:loop
	repeat 26:poke decodeTable,'a'+cnt,cnt+26:loop
	repeat 10:poke decodeTable,'0'+cnt,cnt+52:loop
	poke decodeTable,'+',62
	poke decodeTable,'/',63
	poke decodeTable,13,129
	poke decodeTable,10,129
	poke decodeTable,'=',254
	poke decodeTable,0,255
	fInitBase64=1
	return
#defcfunc EncodeBase64 var src,int srclen
	__InitBase64
	mref destIndex,64
	dest="":memexpand dest,(srclen+2)/3*4+(srclen+2)/3*4/76*2+1
	srcIndex=0 : destIndex=0
	repeat srclen/3
		rdata=peek(src,srcIndex)<<16 | peek(src,srcIndex+1)<<8 | peek(src,srcIndex+2)
		poke dest,destIndex,peek(encodeTable,rdata>>18)
		poke dest,destIndex+1,peek(encodeTable,rdata>>12&63)
		poke dest,destIndex+2,peek(encodeTable,rdata>>6&63)
		poke dest,destIndex+3,peek(encodeTable,rdata&63)
		srcIndex+=3 : destIndex+=4
		if destIndex\78==76: poke dest,destIndex,"\n" : destIndex+=2
	loop
	if srclen\3>0{
		rdata=peek(src,srcIndex)
		poke dest,destIndex,peek(encodeTable,rdata>>2)
		if srclen\3==1{
			poke dest,destIndex+1,peek(encodeTable,rdata<<4&63)
			wpoke dest,destIndex+2,0x3d3d
		}else{
			rdata=(rdata&3)<<8 | peek(src,srcIndex+1)
			poke dest,destIndex+1,peek(encodeTable,rdata>>4)
			poke dest,destIndex+2,peek(encodeTable,rdata<<2&63)
			poke dest,destIndex+3,'='
		}
		destIndex+=4
		if destIndex\78==76: poke dest,destIndex,"\n" : destIndex+=2
	}
	poke dest,destIndex,0
	return gsub(dest,"\n","")
#global
#include "hspext.as"
//load conf
sdim _conf,10240
exist CONF_FILE:if (strsize==-1){
	notesel _conf
	noteadd "50\n50\n-\n#noTop\n#useTor"
	notesave CONF_FILE
}
exist CONF_FILE:if (strsize==-1){dialog "Config file not found",1:end}
_conf=""
notesel _conf
noteload CONF_FILE
noteget iX,0:noteget iY,1
	screen 0,450,340,12,int(iX),int(iY)
noteget sTOKEN,2
noteget snTOP,3:if (instr(snTOP,0,"no")==0){wTOP=1}else{wTOP=2}
noteget suTOR,4:if (instr(suTOR,0,"use")==0){pTor=1}else{pTor=0}
noteunsel
color 249,249,251:boxf
font "Segoe UI",15:objmode 2,1
_dnc=0
_url=""
_cat=0
_cats="-\nAdware\nDrugs\nGambling\nGore\nMalicious\nMovies\nNews\nPhishing\nPolitics\nPorn\nPorn (Strict)\nRedirector\nReligion\nScamming\nSnuff\nSpyware\nTorrent\nTracking\nTypo Squatting\nWeapons"
_catsREAL="-\nadware\ndrugs\ngambling\nporngore\nmalicious\nmovies\nnews\nphishing\npolitics\nporn\npornstrict\nredirector\nreligion\nscamming\npornsnuff\nspyware\ntorrent\ntracking\ntyposquatting\nweapons"
_msg=""
_nfo="Version "+SELF_VER
pos 10,10:picload "link.png",1
pos 10,50:picload "com.png",1
pos 10,160:picload "cat.png",1
pos 55,5:input _url,385,30,0
pos 55,45:mesbox _msg,385,100,1,400
pos 55,155:objsize 180,30:combox _cat,10,_cats
pos 290,155:objsize 150,30:button "Report",*uiReport
pos 0,190:mesbox _nfo,450,110,0,0
pos 5,305:input sTOKEN,300,30,0
pos 340,305:objsize 100,30:button "Set Token",*uiSetToken
if (strlen(sTOKEN)!=20){
	objenable 0,0
	objenable 1,0
	objenable 2,0
	objenable 3,0
	objprm 4,"Your token is not set. Create your token:\n\nhttps://mypdns.org/-/profile/personal_access_tokens?name=mypdnsrep-gui&scopes=read_user,api"
	objprm 5,""
	objsel 5
}else{
	objenable 5,0
	objenable 6,0
	width 450,300
	objsel 0
}
gsel 0,int(wTOP)
stop

*uiSetToken
	if (strlen(sTOKEN)!=20){stop}
	objenable 5,0
	objenable 6,0
	notesel _conf
	noteadd sTOKEN,2,1
	notesave CONF_FILE
	noteunsel
	width 450,300
	objprm 4,"Welcome!\nThank you for helping out this project."
	goto *uiEnable
	stop

*uiEnable
	if (_dnc!=1){objprm 0,"":objprm 1,"":objprm 2,0}
	_dnc=0
	objenable 0,1
	objenable 1,1
	objenable 2,1
	objenable 3,1
	objsel 0
	stop

*uiReport
	_url=gsub(gsub(_url,"'",""),"\"","")
		if (strlen(_url)<4||_cat<=0){objprm 4,"Invalid.":stop}
	now_URL=_url
		if (instr(now_URL,0,"://")<4){now_URL="http://"+now_URL}
	notesel _catsREAL:noteget now_cat,_cat:noteunsel
		if (strlen(now_cat)<4){objprm 4,"Invalid.":stop}
	if (strlen(_msg)>=4){now_msg=EncodeBase64(_msg,strlen(_msg))}else{now_msg=""}		
	objenable 0,0
	objenable 1,0
	objenable 2,0
	objenable 3,0
	objprm 4,"Reporting..."
	sdim ln,4096:sdim buf,32000
	_cmd=_curl+" -s --connect-timeout 9 --max-time 60 -k --http2 "
	if (pTor==1){_cmd+="-x socks5h://127.0.0.1:9050 "}
	_cmd+="-d \"k="+sTOKEN+"&cat="+now_cat+"&url="+now_URL
	if (now_msg!=""){_cmd+="&wmemo="+now_msg}
	_cmd+="\" -X POST https://karma.crimeflare.eu.org:1984/api/mypdns/"
	pipeexec buf,_cmd,0
	if (stat){objprm 4,"/!\\ curl Error!":goto *uiEnable}
	repeat
		pipeget ln:if (stat==0){break}
		await 100
	loop
	if (instr(buf,0,"{\"reply\":\"")!=0){_dnc=1:objprm 4,"/!\\ Server response failed.\nTry again later.":goto *uiEnable}
	split buf,",\"issue\":",msgA,msgB:buf=""
	msgA=sub(msgA,"}","")
	msgL=strmid(msgA,9,255)
	if (instr(msgL,0,"\"Issue for this domain is already exist.")==0){
		msgL+="\n\nhttps://mypdns.org/my-privacy-dns/matrix/-/issues/"
		msgB=gsub(sub(sub(msgB,"]",""),"}",""),"\"","")
		msgL+=msgB
	}
	if (msgA=="{\"reply\":\"roger\""){msgL="Reported."}
	objprm 4,msgL
	goto *uiEnable
	stop

*leave
	gsel 0,-1
	notesel _conf
	noteadd str(ginfo(4)),0,1
	noteadd str(ginfo(5)),1,1
	notesave CONF_FILE
	noteunsel
	end

*bye
	end
