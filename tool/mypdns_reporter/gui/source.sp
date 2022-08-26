<!DOCTYPE html>
<html class="with-system-header with-system-footer" lang="en">
<head prefix="og: http://ogp.me/ns#">
<meta charset="utf-8">
<title>gui/source.sp · master · Infrastructure / MyPDNS Reporter · GitLab</title>
<link rel="preload" href="/assets/application_utilities-bc405f753d3fc57a7c9cf1aafc04c07ef4c758eced90f0d06275492f20f8fcbf.css" as="style" type="text/css">
<link rel="preload" href="/assets/application-1caf2b894e48f649fcfd6b20de756e07ce64c1a756b9a20ff4505caeffa1a361.css" as="style" type="text/css">
<link rel="preload" href="/assets/highlight/themes/white-69223daaf028b2b7665d7b9256b5d2f2703ce7f83cb2b7c86479acaf55a59001.css" as="style" type="text/css">

<meta content="IE=edge" http-equiv="X-UA-Compatible">

<link rel="prefetch" href="/assets/webpack/monaco.aa8823e5.chunk.js">
<link rel="shortcut icon" type="image/png" href="/uploads/-/system/appearance/favicon/1/Icon___Wordmark.png" id="favicon" data-original-href="/uploads/-/system/appearance/favicon/1/Icon___Wordmark.png" />
<style>
@keyframes blinking-dot{0%{opacity:1}25%{opacity:0.4}75%{opacity:0.4}100%{opacity:1}}@keyframes blinking-scroll-button{0%{opacity:0.2}50%{opacity:1}100%{opacity:0.2}}@keyframes gl-spinner-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}body.ui-gray{--gl-theme-accent: #999}body.ui-gray .navbar-gitlab{background-color:#303030}body.ui-gray .navbar-gitlab .navbar-collapse{color:#bfbfbf}body.ui-gray .navbar-gitlab .container-fluid .navbar-toggler{border-left:1px solid gray;color:#bfbfbf}body.ui-gray .navbar-gitlab .navbar-sub-nav>li>a:hover,body.ui-gray .navbar-gitlab .navbar-sub-nav>li>a:focus,body.ui-gray .navbar-gitlab .navbar-sub-nav>li>button:hover,body.ui-gray .navbar-gitlab .navbar-sub-nav>li>button:focus,body.ui-gray .navbar-gitlab .navbar-nav>li>a:hover,body.ui-gray .navbar-gitlab .navbar-nav>li>a:focus,body.ui-gray .navbar-gitlab .navbar-nav>li>button:hover,body.ui-gray .navbar-gitlab .navbar-nav>li>button:focus{background-color:rgba(191,191,191,0.2)}body.ui-gray .navbar-gitlab .navbar-sub-nav>li.active>a,body.ui-gray .navbar-gitlab .navbar-sub-nav>li.active>button,body.ui-gray .navbar-gitlab .navbar-sub-nav>li.dropdown.show>a,body.ui-gray .navbar-gitlab .navbar-sub-nav>li.dropdown.show>button,body.ui-gray .navbar-gitlab .navbar-nav>li.active>a,body.ui-gray .navbar-gitlab .navbar-nav>li.active>button,body.ui-gray .navbar-gitlab .navbar-nav>li.dropdown.show>a,body.ui-gray .navbar-gitlab .navbar-nav>li.dropdown.show>button{color:#303030;background-color:#fff}body.ui-gray .navbar-gitlab .navbar-sub-nav>li.line-separator,body.ui-gray .navbar-gitlab .navbar-nav>li.line-separator{border-left:1px solid rgba(191,191,191,0.2)}body.ui-gray .navbar-gitlab .navbar-sub-nav{color:#bfbfbf}body.ui-gray .navbar-gitlab .nav>li{color:#bfbfbf}body.ui-gray .navbar-gitlab .nav>li.header-search-new{color:#303030}body.ui-gray .navbar-gitlab .nav>li>a .notification-dot{border:2px solid #303030}body.ui-gray .navbar-gitlab .nav>li>a.header-help-dropdown-toggle .notification-dot{background-color:#bfbfbf}body.ui-gray .navbar-gitlab .nav>li>a.header-user-dropdown-toggle .header-user-avatar{border-color:#bfbfbf}@media (min-width: 576px){body.ui-gray .navbar-gitlab .nav>li>a:hover,body.ui-gray .navbar-gitlab .nav>li>a:focus{background-color:rgba(191,191,191,0.2)}}body.ui-gray .navbar-gitlab .nav>li>a:hover svg,body.ui-gray .navbar-gitlab .nav>li>a:focus svg{fill:currentColor}body.ui-gray .navbar-gitlab .nav>li>a:hover .notification-dot,body.ui-gray .navbar-gitlab .nav>li>a:focus .notification-dot{will-change:border-color, background-color;border-color:#515151}body.ui-gray .navbar-gitlab .nav>li>a.header-help-dropdown-toggle:hover .notification-dot,body.ui-gray .navbar-gitlab .nav>li>a.header-help-dropdown-toggle:focus .notification-dot{background-color:#fff}body.ui-gray .navbar-gitlab .nav>li.active>a,body.ui-gray .navbar-gitlab .nav>li.dropdown.show>a{color:#303030;background-color:#fff}body.ui-gray .navbar-gitlab .nav>li.active>a:hover svg,body.ui-gray .navbar-gitlab .nav>li.dropdown.show>a:hover svg{fill:#303030}body.ui-gray .navbar-gitlab .nav>li.active>a .notification-dot,body.ui-gray .navbar-gitlab .nav>li.dropdown.show>a .notification-dot{border-color:#fff}body.ui-gray .navbar-gitlab .nav>li.active>a.header-help-dropdown-toggle .notification-dot,body.ui-gray .navbar-gitlab .nav>li.dropdown.show>a.header-help-dropdown-toggle .notification-dot{background-color:#303030}body.ui-gray .navbar-gitlab .nav>li .impersonated-user svg,body.ui-gray .navbar-gitlab .nav>li .impersonated-user:hover svg{fill:#303030}body.ui-gray .navbar .title>a:hover,body.ui-gray .navbar .title>a:focus{background-color:rgba(191,191,191,0.2)}body.ui-gray .header-search{background-color:rgba(191,191,191,0.2) !important;border-radius:4px}body.ui-gray .header-search:hover{background-color:rgba(191,191,191,0.3) !important}body.ui-gray .header-search svg.gl-search-box-by-type-search-icon{color:rgba(191,191,191,0.8)}body.ui-gray .header-search input{background-color:transparent;color:rgba(191,191,191,0.8);box-shadow:inset 0 0 0 1px rgba(191,191,191,0.4)}body.ui-gray .header-search input::placeholder{color:rgba(191,191,191,0.8)}body.ui-gray .header-search input:focus::placeholder,body.ui-gray .header-search input:active::placeholder{color:#868686}body.ui-gray .header-search .keyboard-shortcut-helper{color:#bfbfbf;background-color:rgba(191,191,191,0.2)}body.ui-gray .search form{background-color:rgba(191,191,191,0.2)}body.ui-gray .search form:hover{background-color:rgba(191,191,191,0.3)}body.ui-gray .search .search-input::placeholder{color:rgba(191,191,191,0.8)}body.ui-gray .search .search-input-wrap .search-icon,body.ui-gray .search .search-input-wrap .clear-icon{fill:rgba(191,191,191,0.8)}body.ui-gray .search.search-active form{background-color:#fff}body.ui-gray .search.search-active .search-input-wrap .search-icon{fill:rgba(191,191,191,0.8)}body.ui-gray .nav-sidebar li.active>a{color:#303030}body.ui-gray .nav-sidebar .fly-out-top-item a,body.ui-gray .nav-sidebar .fly-out-top-item a:hover,body.ui-gray .nav-sidebar .fly-out-top-item.active a,body.ui-gray .nav-sidebar .fly-out-top-item .fly-out-top-item-container{background-color:var(--gray-100, #f0f0f0);color:var(--gray-900, #303030)}body.ui-gray .branch-header-title{color:#666}body.ui-gray .ide-sidebar-link.active{color:#666}body.ui-gray .ide-sidebar-link.active.is-right{box-shadow:inset -3px 0 #666}

*,*::before,*::after{box-sizing:border-box}html{font-family:sans-serif;line-height:1.15}aside,header{display:block}body{margin:0;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:1rem;font-weight:400;line-height:1.5;color:#303030;text-align:left;background-color:#fff}ul{margin-top:0;margin-bottom:1rem}ul ul{margin-bottom:0}strong{font-weight:bolder}a{color:#007bff;text-decoration:none;background-color:transparent}a:not([href]):not([class]){color:inherit;text-decoration:none}kbd{font-family:"Menlo", "DejaVu Sans Mono", "Liberation Mono", "Consolas", "Ubuntu Mono", "Courier New", "andale mono", "lucida console", monospace;font-size:1em}img{vertical-align:middle;border-style:none}svg{overflow:hidden;vertical-align:middle}button{border-radius:0}input,button{margin:0;font-family:inherit;font-size:inherit;line-height:inherit}button,input{overflow:visible}button{text-transform:none}[role="button"]{cursor:pointer}button:not(:disabled),[type="button"]:not(:disabled){cursor:pointer}button::-moz-focus-inner,[type="button"]::-moz-focus-inner{padding:0;border-style:none}[type="search"]{outline-offset:-2px}.list-unstyled{padding-left:0;list-style:none}kbd{padding:0.2rem 0.4rem;font-size:90%;color:#fff;background-color:#303030;border-radius:0.2rem}kbd kbd{padding:0;font-size:100%;font-weight:600}.container-fluid{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}.form-control{display:block;width:100%;height:34px;padding:0.375rem 0.75rem;font-size:0.875rem;font-weight:400;line-height:1.5;color:#303030;background-color:#fff;background-clip:padding-box;border:1px solid #868686;border-radius:0.25rem}.form-control:-moz-focusring{color:transparent;text-shadow:0 0 0 #303030}.form-control::placeholder{color:#5e5e5e;opacity:1}.form-control:disabled{background-color:#fafafa;opacity:1}.form-inline{display:flex;flex-flow:row wrap;align-items:center}@media (min-width: 576px){.form-inline .form-control{display:inline-block;width:auto;vertical-align:middle}}.btn{display:inline-block;font-weight:400;color:#303030;text-align:center;vertical-align:middle;-webkit-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;padding:0.375rem 0.75rem;font-size:1rem;line-height:20px;border-radius:0.25rem}.btn:disabled{opacity:0.65}.btn:not(:disabled):not(.disabled){cursor:pointer}.collapse:not(.show){display:none}.dropdown{position:relative}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:10rem;padding:0.5rem 0;margin:0.125rem 0 0;font-size:1rem;color:#303030;text-align:left;list-style:none;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,0.15);border-radius:0.25rem}.nav{display:flex;flex-wrap:wrap;padding-left:0;margin-bottom:0;list-style:none}.navbar{position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;padding:0.25rem 0.5rem}.navbar .container-fluid{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between}.navbar-nav{display:flex;flex-direction:column;padding-left:0;margin-bottom:0;list-style:none}.navbar-nav .dropdown-menu{position:static;float:none}.navbar-collapse{flex-basis:100%;flex-grow:1;align-items:center}.navbar-toggler{padding:0.25rem 0.75rem;font-size:1.25rem;line-height:1;background-color:transparent;border:1px solid transparent;border-radius:0.25rem}@media (max-width: 575.98px){.navbar-expand-sm>.container-fluid{padding-right:0;padding-left:0}}@media (min-width: 576px){.navbar-expand-sm{flex-flow:row nowrap;justify-content:flex-start}.navbar-expand-sm .navbar-nav{flex-direction:row}.navbar-expand-sm .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-sm>.container-fluid{flex-wrap:nowrap}.navbar-expand-sm .navbar-collapse{display:flex !important;flex-basis:auto}.navbar-expand-sm .navbar-toggler{display:none}}.badge{display:inline-block;padding:0.25em 0.4em;font-size:75%;font-weight:600;line-height:1;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:0.25rem}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.badge-pill{padding-right:0.6em;padding-left:0.6em;border-radius:10rem}.badge-success{color:#fff;background-color:#108548}.badge-info{color:#fff;background-color:#1f75cb}.badge-warning{color:#fff;background-color:#ab6100}.bg-transparent{background-color:transparent !important}.rounded-circle{border-radius:50% !important}.d-none{display:none !important}.d-block{display:block !important}@media (min-width: 576px){.d-sm-none{display:none !important}.d-sm-inline-block{display:inline-block !important}}@media (min-width: 768px){.d-md-block{display:block !important}}@media (min-width: 992px){.d-lg-none{display:none !important}}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}.gl-badge{display:inline-flex;align-items:center;font-size:0.75rem;font-weight:400;line-height:1rem;padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.5rem;padding-right:0.5rem}.gl-badge.sm{padding-top:0;padding-bottom:0}.gl-badge.badge-info{background-color:#cbe2f9;color:#0b5cad}a.gl-badge.badge-info.active,a.gl-badge.badge-info:active{color:#033464;background-color:#9dc7f1}a.gl-badge.badge-info:active{box-shadow:0 0 0 1px #fff, 0 0 0 3px #428fdc;outline:none}.gl-badge.badge-success{background-color:#c3e6cd;color:#24663b}a.gl-badge.badge-success.active,a.gl-badge.badge-success:active{color:#0a4020;background-color:#91d4a8}a.gl-badge.badge-success:active{box-shadow:0 0 0 1px #fff, 0 0 0 3px #428fdc;outline:none}.gl-badge.badge-warning{background-color:#f5d9a8;color:#8f4700}a.gl-badge.badge-warning.active,a.gl-badge.badge-warning:active{color:#5c2900;background-color:#e9be74}a.gl-badge.badge-warning:active{box-shadow:0 0 0 1px #fff, 0 0 0 3px #428fdc;outline:none}.gl-button .gl-badge{top:0}.gl-form-input,.gl-form-input.form-control{background-color:#fff;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-size:0.875rem;line-height:1rem;padding-top:0.5rem;padding-bottom:0.5rem;padding-left:0.75rem;padding-right:0.75rem;height:auto;color:#303030;box-shadow:inset 0 0 0 1px #868686;border-style:none;-webkit-appearance:none;appearance:none;-moz-appearance:none}.gl-form-input:disabled,.gl-form-input:not(.form-control-plaintext):not([type="color"]):read-only,.gl-form-input.form-control:disabled,.gl-form-input.form-control:not(.form-control-plaintext):not([type="color"]):read-only{background-color:#f5f5f5;box-shadow:inset 0 0 0 1px #dbdbdb}.gl-form-input:disabled,.gl-form-input.form-control:disabled{cursor:not-allowed;color:#868686}.gl-form-input::placeholder,.gl-form-input.form-control::placeholder{color:#868686}.gl-icon{fill:currentColor}.gl-icon.s12{width:12px;height:12px}.gl-icon.s16{width:16px;height:16px}.gl-icon.s32{width:32px;height:32px}.gl-link{font-size:0.875rem;color:#1f75cb}.gl-link:active{color:#0b5cad}.gl-link:active{text-decoration:underline;outline:2px solid #428fdc;outline-offset:2px}.gl-button{display:inline-flex}.gl-button:not(.btn-link):active{text-decoration:none}.gl-button.gl-button{border-width:0;padding-top:0.5rem;padding-bottom:0.5rem;padding-left:0.75rem;padding-right:0.75rem;background-color:transparent;line-height:1rem;color:#303030;fill:currentColor;box-shadow:inset 0 0 0 1px #bfbfbf;justify-content:center;align-items:center;font-size:0.875rem;border-radius:0.25rem}.gl-button.gl-button.btn-default{background-color:#fff}.gl-button.gl-button.btn-default:active,.gl-button.gl-button.btn-default.active{box-shadow:inset 0 0 0 1px #5e5e5e, 0 0 0 1px #fff, 0 0 0 3px #428fdc;outline:none;background-color:#dbdbdb}.gl-button.gl-button.btn-default:active .gl-icon,.gl-button.gl-button.btn-default.active .gl-icon{color:#303030}.gl-button.gl-button.btn-default .gl-icon{color:#666}.gl-search-box-by-type-search-icon{margin:0.5rem;color:#666;width:1rem;position:absolute}.gl-search-box-by-type{display:flex;position:relative}.gl-search-box-by-type-input,.gl-search-box-by-type-input.gl-form-input{height:2rem;padding-right:2rem;padding-left:1.75rem}body{font-size:0.875rem}button,html [type="button"],[role="button"]{cursor:pointer}strong{font-weight:bold}a{color:#1068bf}svg{vertical-align:baseline}.form-control,.search form{font-size:0.875rem}.hidden{display:none !important;visibility:hidden !important}.hide{display:none}.badge:not(.gl-badge){padding:4px 5px;font-size:12px;font-style:normal;font-weight:400;display:inline-block}.divider{height:0;margin:4px 0;overflow:hidden;border-top:1px solid #dbdbdb}.toggle-sidebar-button .collapse-text,.toggle-sidebar-button .icon-chevron-double-lg-left{color:#666}html{overflow-y:scroll}body{text-decoration-skip:ink}.btn{border-radius:4px;font-size:0.875rem;font-weight:400;padding:6px 10px;background-color:#fff;border-color:#dbdbdb;color:#303030;color:#303030;white-space:nowrap}.btn:active{background-color:#f0f0f0;box-shadow:none}.btn:active,.btn.active{background-color:#eaeaea;border-color:#e3e3e3;color:#303030}.btn svg{height:15px;width:15px}.btn svg:not(:last-child){margin-right:5px}.badge.badge-pill:not(.gl-badge){font-weight:400;background-color:rgba(0,0,0,0.07);color:#525252;vertical-align:baseline}.gl-font-sm{font-size:12px}.dropdown{position:relative}.dropdown-menu-toggle:active{box-shadow:0 0 0 1px #fff, 0 0 0 3px #428fdc;outline:none}.search-input-container .dropdown-menu{margin-top:11px}.dropdown-menu-toggle{padding:6px 8px 6px 10px;background-color:#fff;color:#303030;font-size:14px;text-align:left;border:1px solid #dbdbdb;border-radius:0.25rem;white-space:nowrap}.dropdown-menu-toggle.no-outline{outline:0}.dropdown-menu-toggle.dropdown-menu-toggle{justify-content:flex-start;overflow:hidden;padding-right:25px;position:relative;text-overflow:ellipsis;width:160px}.dropdown-menu{display:none;position:absolute;width:auto;top:100%;z-index:300;min-width:240px;max-width:500px;margin-top:4px;margin-bottom:24px;font-size:0.875rem;font-weight:400;padding:8px 0;background-color:#fff;border:1px solid #dbdbdb;border-radius:0.25rem;box-shadow:0 2px 4px rgba(0,0,0,0.1)}.dropdown-menu ul{margin:0;padding:0}.dropdown-menu li{display:block;text-align:left;list-style:none}.dropdown-menu li>a,.dropdown-menu li button{background:transparent;border:0;border-radius:0;box-shadow:none;display:block;font-weight:400;position:relative;padding:8px 12px;color:#303030;line-height:16px;white-space:normal;overflow:hidden;text-align:left;width:100%}.dropdown-menu li>a:active,.dropdown-menu li button:active{background-color:#eee;color:#303030;outline:0;text-decoration:none}.dropdown-menu li>a:active,.dropdown-menu li button:active{box-shadow:inset 0 0 0 2px #428fdc, inset 0 0 0 3px #fff, inset 0 0 0 1px #fff;outline:none}.dropdown-menu .divider{height:1px;margin:0.25rem 0;padding:0;background-color:#dbdbdb}.dropdown-menu .badge.badge-pill+span:not(.badge):not(.badge-pill){margin-right:40px}@media (max-width: 575.98px){.navbar-gitlab li.dropdown{position:static}.navbar-gitlab li.dropdown.user-counter{margin-left:8px !important}.navbar-gitlab li.dropdown.user-counter>a{padding:0 4px !important}header.navbar-gitlab .dropdown .dropdown-menu{width:100%;min-width:100%}}@media (max-width: 767.98px){.dropdown-menu-toggle.dropdown-menu-toggle{width:100%}}input{border-radius:0.25rem;color:#303030;background-color:#fff}.form-control{border-radius:4px;padding:6px 10px}.form-control::placeholder{color:#868686}kbd{display:inline-block;padding:3px 5px;font-size:0.6875rem;line-height:10px;color:var(--gray-700, #525252);vertical-align:middle;background-color:var(--gray-10, #f5f5f5);border-width:1px;border-style:solid;border-color:var(--gray-100, #dbdbdb) var(--gray-100, #dbdbdb) var(--gray-200, #bfbfbf);border-image:none;border-radius:3px;box-shadow:0 -1px 0 var(--gray-200, #bfbfbf) inset}.navbar-gitlab{padding:0 16px;z-index:1000;margin-bottom:0;min-height:var(--header-height, 48px);border:0;position:fixed;top:0;left:0;right:0;border-radius:0}.navbar-gitlab .close-icon{display:none}.navbar-gitlab .header-content{width:100%;display:flex;justify-content:space-between;position:relative;min-height:var(--header-height, 48px);padding-left:0}.navbar-gitlab .header-content .title{padding-right:0;color:currentColor;display:flex;position:relative;margin:0;font-size:18px;vertical-align:top;white-space:nowrap}.navbar-gitlab .header-content .title img{height:24px}.navbar-gitlab .header-content .title a{display:flex;align-items:center;padding:2px 8px;margin:4px 2px 4px -8px;border-radius:4px}.navbar-gitlab .header-content .title a:active{box-shadow:0 0 0 1px rgba(0,0,0,0.6),0 0 0 3px #63a6e9;outline:none}.navbar-gitlab .header-content .title .canary-badge{margin-left:-8px}.navbar-gitlab .header-content .navbar-collapse>ul.nav>li:not(.d-none){margin:0 2px}.navbar-gitlab .navbar-collapse{flex:0 0 auto;border-top:0;padding:0}@media (max-width: 575.98px){.navbar-gitlab .navbar-collapse{flex:1 1 auto}}.navbar-gitlab .navbar-collapse .nav{flex-wrap:nowrap}@media (max-width: 575.98px){.navbar-gitlab .navbar-collapse .nav>li:not(.d-none) a{margin-left:0}}.navbar-gitlab .container-fluid{padding:0}.navbar-gitlab .container-fluid .user-counter svg{margin-right:3px}.navbar-gitlab .container-fluid .navbar-toggler{position:relative;right:-10px;border-radius:0;min-width:45px;padding:0;margin:8px 8px 8px 0;font-size:14px;text-align:center;color:currentColor}.navbar-gitlab .container-fluid .navbar-toggler.active{color:currentColor;background-color:transparent}@media (max-width: 575.98px){.navbar-gitlab .container-fluid .navbar-nav{display:flex;padding-right:10px;flex-direction:row}}.navbar-gitlab .container-fluid .navbar-nav li .badge.badge-pill:not(.gl-badge){box-shadow:none;font-weight:600}@media (max-width: 575.98px){.navbar-gitlab .container-fluid .nav>li.header-user{padding-left:10px}}.navbar-gitlab .container-fluid .nav>li>a{will-change:color;margin:4px 0;padding:6px 8px;height:32px}@media (max-width: 575.98px){.navbar-gitlab .container-fluid .nav>li>a{padding:0}}.navbar-gitlab .container-fluid .nav>li>a.header-user-dropdown-toggle{margin-left:2px}.navbar-gitlab .container-fluid .nav>li>a.header-user-dropdown-toggle .header-user-avatar{margin-right:0}.navbar-gitlab .container-fluid .nav>li .header-new-dropdown-toggle{margin-right:0}.navbar-sub-nav>li>a,.navbar-sub-nav>li>button,.navbar-nav>li>a,.navbar-nav>li>button{display:flex;align-items:center;justify-content:center;padding:6px 8px;margin:4px 2px;font-size:12px;color:currentColor;border-radius:4px;height:32px;font-weight:600}.navbar-sub-nav>li>a:active,.navbar-sub-nav>li>button:active,.navbar-nav>li>a:active,.navbar-nav>li>button:active{box-shadow:0 0 0 1px rgba(0,0,0,0.6),0 0 0 3px #63a6e9;outline:none}.navbar-sub-nav>li .top-nav-toggle,.navbar-sub-nav>li>button,.navbar-nav>li .top-nav-toggle,.navbar-nav>li>button{background:transparent;border:0}.navbar-sub-nav .dropdown-menu,.navbar-nav .dropdown-menu{position:absolute}.navbar-sub-nav{display:flex;align-items:center;height:100%;margin:0 0 0 6px}.caret-down,.btn .caret-down{top:0;height:11px;width:11px;margin-left:4px;fill:currentColor}.header-user .dropdown-menu,.header-new .dropdown-menu{margin-top:4px}.btn-sign-in{background-color:#ebebfa;color:#292961;font-weight:600;line-height:18px;margin:4px 0 4px 2px}@media (max-width: 575.98px){.navbar-gitlab .container-fluid{font-size:18px}.navbar-gitlab .container-fluid .navbar-nav{table-layout:fixed;width:100%;margin:0;text-align:right}.navbar-gitlab .container-fluid .navbar-collapse{margin-left:-8px;margin-right:-10px}.navbar-gitlab .container-fluid .navbar-collapse .nav>li:not(.d-none){flex:1}.header-user-dropdown-toggle{text-align:center}.header-user-avatar{float:none}}.header-user-avatar{float:left;margin-right:5px;border-radius:50%;border:1px solid #f5f5f5}.notification-dot{background-color:#d99530;height:12px;width:12px;pointer-events:none;visibility:hidden;top:3px}.top-nav-toggle .dropdown-icon{margin-right:0.5rem}.tanuki-logo .tanuki{fill:#e24329}.tanuki-logo .left-cheek,.tanuki-logo .right-cheek{fill:#fc6d26}.tanuki-logo .chin{fill:#fca326}.context-header{position:relative;margin-right:2px;width:256px}.context-header>a,.context-header>button{font-weight:600;display:flex;width:100%;align-items:center;padding:10px 16px 10px 10px;color:#303030;background-color:transparent;border:0;text-align:left}.context-header .avatar-container{flex:0 0 32px;background-color:#fff}.context-header .sidebar-context-title{overflow:hidden;text-overflow:ellipsis;color:#303030}@media (min-width: 768px){.page-with-contextual-sidebar{padding-left:56px}}@media (min-width: 1200px){.page-with-contextual-sidebar{padding-left:256px}}@media (min-width: 768px){.page-with-icon-sidebar{padding-left:56px}}.nav-sidebar{position:fixed;bottom:0;left:0;z-index:600;width:256px;top:var(--header-height, 48px);background-color:#f5f5f5;border-right:1px solid #e9e9e9;transform:translate3d(0, 0, 0)}.nav-sidebar.sidebar-collapsed-desktop{width:56px}.nav-sidebar.sidebar-collapsed-desktop .nav-sidebar-inner-scroll{overflow-x:hidden}.nav-sidebar.sidebar-collapsed-desktop .badge.badge-pill:not(.fly-out-badge),.nav-sidebar.sidebar-collapsed-desktop .nav-item-name,.nav-sidebar.sidebar-collapsed-desktop .collapse-text{border:0;clip:rect(0, 0, 0, 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.nav-sidebar.sidebar-collapsed-desktop .sidebar-top-level-items>li>a{min-height:unset}.nav-sidebar.sidebar-collapsed-desktop .fly-out-top-item:not(.divider){display:block !important}.nav-sidebar.sidebar-collapsed-desktop .avatar-container{margin:0 auto}.nav-sidebar.sidebar-collapsed-desktop li.active:not(.fly-out-top-item)>a{background-color:rgba(41,41,97,0.08)}.nav-sidebar a{text-decoration:none;color:#303030}.nav-sidebar li{white-space:nowrap}.nav-sidebar li .nav-item-name{flex:1;overflow:hidden;text-overflow:ellipsis}.nav-sidebar li>a,.nav-sidebar li>.fly-out-top-item-container{padding-left:0.75rem;padding-right:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;display:flex;align-items:center;border-radius:0.25rem;width:auto;line-height:1rem;margin:1px 8px}.nav-sidebar li.active>a{font-weight:600}.nav-sidebar li.active:not(.fly-out-top-item)>a:not(.has-sub-items){background-color:rgba(41,41,97,0.08)}.nav-sidebar ul{padding-left:0;list-style:none}@media (max-width: 767.98px){.nav-sidebar{left:-256px}}.nav-sidebar .nav-icon-container{display:flex;margin-right:8px}.nav-sidebar a:not(.has-sub-items)+.sidebar-sub-level-items .fly-out-top-item{display:none}.nav-sidebar a:not(.has-sub-items)+.sidebar-sub-level-items .fly-out-top-item a,.nav-sidebar a:not(.has-sub-items)+.sidebar-sub-level-items .fly-out-top-item.active a,.nav-sidebar a:not(.has-sub-items)+.sidebar-sub-level-items .fly-out-top-item .fly-out-top-item-container{margin-left:0;margin-right:0;padding-left:1rem;padding-right:1rem;cursor:default;pointer-events:none;font-size:0.75rem;margin-top:-0.25rem;margin-bottom:-0.25rem;margin-top:0;position:relative;color:#fff;background:var(--black, #000)}.nav-sidebar a:not(.has-sub-items)+.sidebar-sub-level-items .fly-out-top-item a strong,.nav-sidebar a:not(.has-sub-items)+.sidebar-sub-level-items .fly-out-top-item.active a strong,.nav-sidebar a:not(.has-sub-items)+.sidebar-sub-level-items .fly-out-top-item .fly-out-top-item-container strong{font-weight:400}.nav-sidebar a:not(.has-sub-items)+.sidebar-sub-level-items .fly-out-top-item a::before,.nav-sidebar a:not(.has-sub-items)+.sidebar-sub-level-items .fly-out-top-item.active a::before,.nav-sidebar a:not(.has-sub-items)+.sidebar-sub-level-items .fly-out-top-item .fly-out-top-item-container::before{position:absolute;content:"";display:block;top:50%;left:-0.25rem;margin-top:-0.25rem;width:0;height:0;border-top:0.25rem solid transparent;border-bottom:0.25rem solid transparent;border-right:0.25rem solid #000;border-right-color:var(--black, #000)}@media (min-width: 576px){.nav-sidebar a.has-sub-items+.sidebar-sub-level-items{min-width:150px}}.nav-sidebar a.has-sub-items+.sidebar-sub-level-items .fly-out-top-item{display:none}.nav-sidebar a.has-sub-items+.sidebar-sub-level-items .fly-out-top-item a,.nav-sidebar a.has-sub-items+.sidebar-sub-level-items .fly-out-top-item.active a,.nav-sidebar a.has-sub-items+.sidebar-sub-level-items .fly-out-top-item .fly-out-top-item-container{margin-left:0;margin-right:0;padding-left:1rem;padding-right:1rem;cursor:default;pointer-events:none;font-size:0.75rem;margin-top:0;border-bottom-left-radius:0;border-bottom-right-radius:0}@media (min-width: 768px) and (max-width: 1199px){.nav-sidebar:not(.sidebar-expanded-mobile){width:56px}.nav-sidebar:not(.sidebar-expanded-mobile) .nav-sidebar-inner-scroll{overflow-x:hidden}.nav-sidebar:not(.sidebar-expanded-mobile) .badge.badge-pill:not(.fly-out-badge),.nav-sidebar:not(.sidebar-expanded-mobile) .nav-item-name,.nav-sidebar:not(.sidebar-expanded-mobile) .collapse-text{border:0;clip:rect(0, 0, 0, 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.nav-sidebar:not(.sidebar-expanded-mobile) .sidebar-top-level-items>li>a{min-height:unset}.nav-sidebar:not(.sidebar-expanded-mobile) .fly-out-top-item:not(.divider){display:block !important}.nav-sidebar:not(.sidebar-expanded-mobile) .avatar-container{margin:0 auto}.nav-sidebar:not(.sidebar-expanded-mobile) li.active:not(.fly-out-top-item)>a{background-color:rgba(41,41,97,0.08)}.nav-sidebar:not(.sidebar-expanded-mobile) .context-header{height:60px;width:56px}.nav-sidebar:not(.sidebar-expanded-mobile) .context-header a{padding:10px 4px}.nav-sidebar:not(.sidebar-expanded-mobile) .sidebar-context-title{border:0;clip:rect(0, 0, 0, 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.nav-sidebar:not(.sidebar-expanded-mobile) .context-header{height:auto}.nav-sidebar:not(.sidebar-expanded-mobile) .context-header a{padding:0.25rem}.nav-sidebar:not(.sidebar-expanded-mobile) .sidebar-top-level-items>li .sidebar-sub-level-items:not(.flyout-list){display:none}.nav-sidebar:not(.sidebar-expanded-mobile) .nav-icon-container{margin-right:0}.nav-sidebar:not(.sidebar-expanded-mobile) .toggle-sidebar-button{width:55px;padding:0 21px}.nav-sidebar:not(.sidebar-expanded-mobile) .toggle-sidebar-button .collapse-text{display:none}.nav-sidebar:not(.sidebar-expanded-mobile) .toggle-sidebar-button .icon-chevron-double-lg-left{transform:rotate(180deg);margin:0}}.nav-sidebar-inner-scroll{height:100%;width:100%;overflow-x:hidden;overflow-y:auto}.nav-sidebar-inner-scroll>div.context-header{margin-top:0.25rem}.nav-sidebar-inner-scroll>div.context-header a{padding-left:0.75rem;padding-right:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;display:flex;align-items:center;border-radius:0.25rem;width:auto;line-height:1rem;margin:1px 8px;padding:0.25rem;margin-bottom:0.25rem;margin-top:0.125rem}.nav-sidebar-inner-scroll>div.context-header a .avatar-container{font-weight:400;flex:none}.sidebar-top-level-items{margin-bottom:60px}.sidebar-top-level-items .context-header a{padding:0.25rem;margin-bottom:0.25rem;margin-top:0.125rem}.sidebar-top-level-items .context-header a .avatar-container{font-weight:400;flex:none}.sidebar-top-level-items>li.active .sidebar-sub-level-items:not(.is-fly-out-only){display:block}.sidebar-top-level-items li>a.gl-link{color:#303030}.sidebar-top-level-items li>a.gl-link:active{text-decoration:none}.sidebar-sub-level-items{padding-top:0;padding-bottom:0;display:none}.sidebar-sub-level-items:not(.fly-out-list) li>a{padding-left:2.25rem}.toggle-sidebar-button,.close-nav-button{height:48px;padding:0 16px;background-color:#fafafa;border:0;color:#666;display:flex;align-items:center;background-color:#f5f5f5;position:fixed;bottom:0;width:255px}.toggle-sidebar-button .collapse-text,.toggle-sidebar-button .icon-chevron-double-lg-left,.close-nav-button .collapse-text,.close-nav-button .icon-chevron-double-lg-left{color:inherit}.collapse-text{white-space:nowrap;overflow:hidden}.sidebar-collapsed-desktop .context-header{height:60px;width:56px}.sidebar-collapsed-desktop .context-header a{padding:10px 4px}.sidebar-collapsed-desktop .sidebar-context-title{border:0;clip:rect(0, 0, 0, 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.sidebar-collapsed-desktop .context-header{height:auto}.sidebar-collapsed-desktop .context-header a{padding:0.25rem}.sidebar-collapsed-desktop .sidebar-top-level-items>li .sidebar-sub-level-items:not(.flyout-list){display:none}.sidebar-collapsed-desktop .nav-icon-container{margin-right:0}.sidebar-collapsed-desktop .toggle-sidebar-button{width:55px;padding:0 21px}.sidebar-collapsed-desktop .toggle-sidebar-button .collapse-text{display:none}.sidebar-collapsed-desktop .toggle-sidebar-button .icon-chevron-double-lg-left{transform:rotate(180deg);margin:0}.close-nav-button{display:none}@media (max-width: 767.98px){.close-nav-button{display:flex}.toggle-sidebar-button{display:none}}input::-moz-placeholder{color:#868686;opacity:1}input::-ms-input-placeholder{color:#868686}input:-ms-input-placeholder{color:#868686}svg{fill:currentColor}svg.s12{width:12px;height:12px}svg.s16{width:16px;height:16px}svg.s32{width:32px;height:32px}svg.s12{vertical-align:-1px}svg.s16{vertical-align:-3px}.header-content .header-search-new{max-width:640px}.header-search{min-width:320px}@media (min-width: 768px) and (max-width: 1199.98px){.header-search{min-width:200px}}.header-search .keyboard-shortcut-helper{transform:translateY(calc(50% - 2px));box-shadow:none;border-color:transparent}.search{margin:0 8px}.search form{display:block;margin:0;padding:4px;width:200px;line-height:24px;height:32px;border:0;border-radius:4px}@media (min-width: 1200px){.search form{width:320px}}.search .search-input{border:0;font-size:14px;padding:0 20px 0 0;margin-left:5px;line-height:25px;width:98%;color:#fff;background:none}.search .search-input-container{display:flex;position:relative}.search .search-input-wrap{width:100%}.search .search-input-wrap .search-icon,.search .search-input-wrap .clear-icon{position:absolute;right:5px;top:4px}.search .search-input-wrap .search-icon{-webkit-user-select:none;user-select:none}.search .search-input-wrap .clear-icon{display:none}.search .search-input-wrap .dropdown{position:static}.search .search-input-wrap .dropdown-menu{left:-5px;max-height:400px;overflow:auto}@media (min-width: 1200px){.search .search-input-wrap .dropdown-menu{width:320px}}.search .identicon{flex-basis:16px;flex-shrink:0;margin-right:4px}.avatar,.avatar-container{float:left;margin-right:16px;border-radius:50%}.avatar.s16,.avatar-container.s16{width:16px;height:16px;margin-right:8px}.avatar.s32,.avatar-container.s32{width:32px;height:32px;margin-right:8px}.avatar{transition-property:none;width:40px;height:40px;padding:0;background:#fdfdfd;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(31,31,31,0.1)}.avatar.avatar-tile{border-radius:0;border:0}.identicon{text-align:center;vertical-align:top;color:#303030;background-color:#f0f0f0}.identicon.s16{font-size:10px;line-height:16px}.identicon.s32{font-size:14px;line-height:32px}.identicon.bg1{background-color:#fcf1ef}.identicon.bg2{background-color:#f4f0ff}.identicon.bg3{background-color:#f1f1ff}.identicon.bg4{background-color:#e9f3fc}.identicon.bg5{background-color:#ecf4ee}.identicon.bg6{background-color:#fdf1dd}.identicon.bg7{background-color:#f0f0f0}.avatar-container{overflow:hidden;display:flex}.avatar-container a{width:100%;height:100%;display:flex;text-decoration:none}.avatar-container .avatar{border-radius:0;border:0;height:auto;width:100%;margin:0;align-self:center}.rect-avatar{border-radius:2px}.rect-avatar.s16{border-radius:2px}.rect-avatar.s16 .avatar{border-radius:2px}.rect-avatar.s32{border-radius:4px}.rect-avatar.s32 .avatar{border-radius:4px}.tab-width-8{tab-size:8}.gl-sr-only{border:0;clip:rect(0, 0, 0, 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.gl-border-none\!{border-style:none !important}.gl-display-none{display:none}.gl-display-flex{display:flex}@media (min-width: 576px){.gl-sm-display-block{display:block}}@media (min-width: 992px){.gl-lg-display-block{display:block}}.gl-display-inline-block\!{display:inline-block !important}.gl-align-items-center{align-items:center}.gl-align-items-stretch{align-items:stretch}.gl-flex-grow-1{flex-grow:1}.gl-justify-content-end{justify-content:flex-end}.gl-relative{position:relative}.gl-absolute{position:absolute}.gl-top-0{top:0}.gl-right-3{right:0.5rem}.gl-w-full{width:100%}.gl-px-3{padding-left:0.5rem;padding-right:0.5rem}.gl-pr-2{padding-right:0.25rem}.gl-pt-0{padding-top:0}.gl-ml-n2{margin-left:-0.25rem}.gl-ml-3{margin-left:0.5rem}.gl-mx-0\!{margin-left:0 !important;margin-right:0 !important}.gl-text-right{text-align:right}.gl-white-space-nowrap{white-space:nowrap}.gl-font-sm{font-size:0.75rem}.gl-font-weight-bold{font-weight:600}.gl-z-index-1{z-index:1}.cloak-startup,.content-wrapper>.alert-wrapper,#content-body,.modal-dialog{display:none}

</style>


<link rel="stylesheet" media="print" href="/assets/application-1caf2b894e48f649fcfd6b20de756e07ce64c1a756b9a20ff4505caeffa1a361.css" />

<link rel="stylesheet" media="print" href="/assets/application_utilities-bc405f753d3fc57a7c9cf1aafc04c07ef4c758eced90f0d06275492f20f8fcbf.css" />


<link rel="stylesheet" media="print" href="/assets/highlight/themes/white-69223daaf028b2b7665d7b9256b5d2f2703ce7f83cb2b7c86479acaf55a59001.css" />
<script>
//<![CDATA[
document.querySelectorAll('link[media="print"]').forEach(linkTag => {
  linkTag.setAttribute('data-startupcss', 'loading');
  const startupLinkLoadedEvent = new CustomEvent('CSSStartupLinkLoaded');
  linkTag.addEventListener('load',function(){this.media='all';this.setAttribute('data-startupcss', 'loaded');document.dispatchEvent(startupLinkLoadedEvent);},{once: true});
})

//]]>
</script>

<script>
//<![CDATA[
window.gon={};gon.api_version="v4";gon.default_avatar_url="https://mypdns.org/assets/no_avatar-849f9c04a3a0d0cea2424ae97b27447dc64a7dbfae83c036c45b403392f0e8ba.png";gon.max_file_size=18;gon.asset_host=null;gon.webpack_public_path="/assets/webpack/";gon.relative_url_root="";gon.user_color_scheme="white";gon.markdown_surround_selection=null;gon.recaptcha_api_server_url="https://www.google.com/recaptcha/api.js";gon.recaptcha_sitekey="";gon.gitlab_url="https://mypdns.org";gon.revision="518311979e3";gon.feature_category="source_code_management";gon.gitlab_logo="/assets/gitlab_logo-2957169c8ef64c58616a1ac3f4fc626e8a35ce4eb3ed31bb0d873712f2a041a0.png";gon.secure=true;gon.sprite_icons="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg";gon.sprite_file_icons="/assets/file_icons-958d18a1c33aa82a81e2eb1ffbffc33131d501c41ad95838a70b089e5ffbd7a0.svg";gon.emoji_sprites_css_path="/assets/emoji_sprites-e1b1ba2d7a86a445dcb1110d1b6e7dd0200ecaa993a445df77a07537dbf8f475.css";gon.select2_css_path="/assets/lazy_bundles/select2-972cb11866a2afb07749efdf63c646325d6ad61bac72ad794042166dcbecfc81.css";gon.test_env=false;gon.disable_animations=null;gon.suggested_label_colors={"#009966":"Green-cyan","#8fbc8f":"Dark sea green","#3cb371":"Medium sea green","#00b140":"Green screen","#013220":"Dark green","#6699cc":"Blue-gray","#0000ff":"Blue","#e6e6fa":"Lavendar","#9400d3":"Dark violet","#330066":"Deep violet","#808080":"Gray","#36454f":"Charcoal grey","#f7e7ce":"Champagne","#c21e56":"Rose red","#cc338b":"Magenta-pink","#dc143c":"Crimson","#ff0000":"Red","#cd5b45":"Dark coral","#eee600":"Titanium yellow","#ed9121":"Carrot orange","#c39953":"Aztec Gold"};gon.first_day_of_week=1;gon.time_display_relative=true;gon.ee=true;gon.jh=false;gon.dot_com=false;gon.features={"usageDataApi":true,"securityAutoFix":false,"newHeaderSearch":true,"sourceEditorToolbar":false,"glAvatarForAllUserAvatars":false,"mrAttentionRequests":false,"highlightJs":true,"fileLineBlame":false};gon.roadmap_epics_limit=1000;
//]]>
</script>





<script src="/assets/webpack/runtime.8b640006.bundle.js" defer="defer"></script>
<script src="/assets/webpack/main.23fa18f3.chunk.js" defer="defer"></script>
<script src="/assets/webpack/graphql.7a7c3f9d.chunk.js" defer="defer"></script>
<script src="/assets/webpack/3.127e2957.chunk.js" defer="defer"></script>
<script src="/assets/webpack/4.265e1784.chunk.js" defer="defer"></script>
<script src="/assets/webpack/commons-pages.groups.boards-pages.groups.details-pages.groups.epic_boards-pages.groups.show-pages.gr-3de21e32.57b2f962.chunk.js" defer="defer"></script>
<script src="/assets/webpack/commons-pages.projects-pages.projects.activity-pages.projects.alert_management.details-pages.project-d5b3cd4f.4e9be9ff.chunk.js" defer="defer"></script>
<script src="/assets/webpack/commons-pages.projects-pages.projects.activity-pages.projects.alert_management.details-pages.project-ef927ba2.83276be2.chunk.js" defer="defer"></script>
<script src="/assets/webpack/commons-pages.admin.subscriptions.show-pages.projects.blob.show-pages.projects.forks.new-pages.proje-a7b8e099.9cc33d26.chunk.js" defer="defer"></script>
<script src="/assets/webpack/commons-pages.projects.blob.show-pages.projects.show-pages.projects.snippets.edit-pages.projects.sni-dd84f7c7.c6606f7d.chunk.js" defer="defer"></script>
<script src="/assets/webpack/commons-pages.projects.blob.show-pages.projects.show-pages.projects.snippets.show-pages.projects.tre-25c821a4.5ccb6a4f.chunk.js" defer="defer"></script>
<script src="/assets/webpack/commons-pages.projects.blob.show-pages.projects.show-pages.projects.tree.show.28460519.chunk.js" defer="defer"></script>
<script src="/assets/webpack/commons-pages.projects.blame.show-pages.projects.blob.show.630f5e8a.chunk.js" defer="defer"></script>
<script src="/assets/webpack/pages.projects.blob.show.9d4860cd.chunk.js" defer="defer"></script>

<meta content="object" property="og:type">
<meta content="GitLab" property="og:site_name">
<meta content="gui/source.sp · master · Infrastructure / MyPDNS Reporter · GitLab" property="og:title">
<meta content="Reporting websites made easy." property="og:description">
<meta content="https://mypdns.org/uploads/-/system/project/avatar/122/icon.png" property="og:image">
<meta content="64" property="og:image:width">
<meta content="64" property="og:image:height">
<meta content="https://mypdns.org/infrastructure/mypdns-reporter/-/blob/master/gui/source.sp" property="og:url">
<meta content="summary" property="twitter:card">
<meta content="gui/source.sp · master · Infrastructure / MyPDNS Reporter · GitLab" property="twitter:title">
<meta content="Reporting websites made easy." property="twitter:description">
<meta content="https://mypdns.org/uploads/-/system/project/avatar/122/icon.png" property="twitter:image">

<meta content="Reporting websites made easy." name="description">
<link href="/-/manifest.json" rel="manifest">
<meta content="width=device-width, initial-scale=1, maximum-scale=1" name="viewport">
<meta content="#303030" name="theme-color">
<meta name="csrf-param" content="authenticity_token" />
<meta name="csrf-token" content="lFN3hRxcSGzL891FZTY5H1rja5JHWULRZ5GKR0cLvSMlM8e20KENzKpLOOgMWWoWqIlcUf2husJB7j3UL4A6Vw==" />
<meta name="csp-nonce" />
<meta name="action-cable-url" content="/-/cable" />
<link rel="apple-touch-icon" type="image/x-icon" href="/assets/apple-touch-icon-b049d4bc0dd9626f31db825d61880737befc7835982586d015bded10b4435460.png" />
<link href="/search/opensearch.xml" rel="search" title="Search GitLab" type="application/opensearchdescription+xml">





</head>

<body class="ui-gray tab-width-8 gl-browser-firefox gl-platform-linux" data-find-file="/infrastructure/mypdns-reporter/-/find_file/master" data-group="infrastructure" data-namespace-id="378" data-page="projects:blob:show" data-page-type-id="master/gui/source.sp" data-project="mypdns-reporter" data-project-id="122">

<script>
//<![CDATA[
gl = window.gl || {};
gl.client = {"isFirefox":true,"isLinux":true};


//]]>
</script>


<div class="header-message" style="background-color: #303030;color: #d3d7cf"><p>My Privacy DNS | Shortcuts: <a href="/my-privacy-dns/matrix/-/issues">Matrix</a> | Porn Records (merged with matrix) | Mypdns <a href="/infrastructure/mypdns-reporter">Reporter</a> | <a href="/trust/web-of-trust">WOT</a> | <a href="/MypDNS/support/-/issues">Support</a></p></div>
<header class="navbar navbar-gitlab navbar-expand-sm js-navbar" data-qa-selector="navbar">
<a class="gl-sr-only gl-accessibility" href="#content-body">Skip to content</a>
<div class="container-fluid">
<div class="header-content js-header-content">
<div class="title-container hide-when-top-nav-responsive-open gl-transition-medium gl-display-flex gl-align-items-stretch gl-pt-0">
<div class="title">
<span class="gl-sr-only">GitLab</span>
<a title="Dashboard" id="logo" class="has-tooltip" href="/"><img class="brand-header-logo lazy" data-src="/uploads/-/system/appearance/header_logo/1/Icon___Wordmark.png" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
</a></div>
<div class="gl-display-none gl-sm-display-block">
<ul class="list-unstyled navbar-sub-nav" data-view-model="{&quot;primary&quot;:[{&quot;id&quot;:&quot;project&quot;,&quot;title&quot;:&quot;Projects&quot;,&quot;active&quot;:true,&quot;icon&quot;:&quot;project&quot;,&quot;href&quot;:&quot;/explore&quot;,&quot;view&quot;:&quot;&quot;,&quot;css_class&quot;:null,&quot;data&quot;:{&quot;qa_selector&quot;:&quot;menu_item_link&quot;,&quot;qa_title&quot;:&quot;Projects&quot;},&quot;emoji&quot;:null},{&quot;id&quot;:&quot;groups&quot;,&quot;title&quot;:&quot;Groups&quot;,&quot;active&quot;:false,&quot;icon&quot;:&quot;group&quot;,&quot;href&quot;:&quot;/explore/groups&quot;,&quot;view&quot;:&quot;&quot;,&quot;css_class&quot;:null,&quot;data&quot;:{&quot;qa_selector&quot;:&quot;menu_item_link&quot;,&quot;qa_title&quot;:&quot;Groups&quot;},&quot;emoji&quot;:null},{&quot;id&quot;:&quot;snippets&quot;,&quot;title&quot;:&quot;Snippets&quot;,&quot;active&quot;:false,&quot;icon&quot;:&quot;snippet&quot;,&quot;href&quot;:&quot;/explore/snippets&quot;,&quot;view&quot;:&quot;&quot;,&quot;css_class&quot;:null,&quot;data&quot;:{&quot;qa_selector&quot;:&quot;menu_item_link&quot;,&quot;qa_title&quot;:&quot;Snippets&quot;},&quot;emoji&quot;:null}],&quot;secondary&quot;:[],&quot;views&quot;:{},&quot;shortcuts&quot;:[{&quot;id&quot;:&quot;project-shortcut&quot;,&quot;title&quot;:&quot;Projects&quot;,&quot;active&quot;:false,&quot;icon&quot;:&quot;&quot;,&quot;href&quot;:&quot;/explore&quot;,&quot;view&quot;:&quot;&quot;,&quot;css_class&quot;:&quot;dashboard-shortcuts-projects&quot;,&quot;data&quot;:{&quot;qa_selector&quot;:&quot;menu_item_link&quot;,&quot;qa_title&quot;:&quot;Projects&quot;},&quot;emoji&quot;:null},{&quot;id&quot;:&quot;groups-shortcut&quot;,&quot;title&quot;:&quot;Groups&quot;,&quot;active&quot;:false,&quot;icon&quot;:&quot;&quot;,&quot;href&quot;:&quot;/explore/groups&quot;,&quot;view&quot;:&quot;&quot;,&quot;css_class&quot;:&quot;dashboard-shortcuts-groups&quot;,&quot;data&quot;:{&quot;qa_selector&quot;:&quot;menu_item_link&quot;,&quot;qa_title&quot;:&quot;Groups&quot;},&quot;emoji&quot;:null},{&quot;id&quot;:&quot;snippets-shortcut&quot;,&quot;title&quot;:&quot;Snippets&quot;,&quot;active&quot;:false,&quot;icon&quot;:&quot;&quot;,&quot;href&quot;:&quot;/explore/snippets&quot;,&quot;view&quot;:&quot;&quot;,&quot;css_class&quot;:&quot;dashboard-shortcuts-snippets&quot;,&quot;data&quot;:{&quot;qa_selector&quot;:&quot;menu_item_link&quot;,&quot;qa_title&quot;:&quot;Snippets&quot;},&quot;emoji&quot;:null}],&quot;activeTitle&quot;:&quot;Menu&quot;}" id="js-top-nav">
<li>
<a class="top-nav-toggle" data-toggle="dropdown" href="#" type="button">
<svg class="s16 dropdown-icon" data-testid="hamburger-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#hamburger"></use></svg>
Menu
</a>
</li>
</ul>
<div class="hidden">
<a class="dashboard-shortcuts-projects" href="/explore">Projects
</a><a class="dashboard-shortcuts-groups" href="/explore/groups">Groups
</a><a class="dashboard-shortcuts-snippets" href="/explore/snippets">Snippets
</a></div>

</div>
</div>
<div class="navbar-collapse gl-transition-medium collapse">
<ul class="nav navbar-nav gl-w-full gl-align-items-center gl-justify-content-end">
<li class="nav-item header-search-new gl-display-none gl-lg-display-block gl-w-full">
<div class="header-search is-not-active gl-relative gl-w-full" data-autocomplete-path="/search/autocomplete" data-issues-path="/dashboard/issues" data-mr-path="/dashboard/merge_requests" data-search-context="{&quot;group&quot;:{&quot;id&quot;:378,&quot;name&quot;:&quot;Infrastructure&quot;,&quot;full_name&quot;:&quot;Infrastructure&quot;},&quot;group_metadata&quot;:{&quot;group_path&quot;:&quot;infrastructure&quot;,&quot;name&quot;:&quot;Infrastructure&quot;,&quot;issues_path&quot;:&quot;/groups/infrastructure/-/issues&quot;,&quot;mr_path&quot;:&quot;/groups/infrastructure/-/merge_requests&quot;},&quot;project&quot;:{&quot;id&quot;:122,&quot;name&quot;:&quot;MyPDNS Reporter&quot;},&quot;project_metadata&quot;:{&quot;project_path&quot;:&quot;mypdns-reporter&quot;,&quot;name&quot;:&quot;MyPDNS Reporter&quot;,&quot;issues_path&quot;:&quot;/infrastructure/mypdns-reporter/-/issues&quot;,&quot;mr_path&quot;:&quot;/infrastructure/mypdns-reporter/-/merge_requests&quot;,&quot;issues_disabled&quot;:false},&quot;scope&quot;:null,&quot;code_search&quot;:true,&quot;ref&quot;:&quot;master&quot;,&quot;for_snippets&quot;:false}" data-search-path="/search" id="js-header-search">
<form action="/search" accept-charset="UTF-8" method="get"><div class="gl-search-box-by-type">
<svg class="s16 gl-search-box-by-type-search-icon gl-icon" data-testid="search-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#search"></use></svg>
<input autocomplete="off" class="form-control gl-form-input gl-search-box-by-type-input" data-qa-selector="search_box" id="search" name="search" placeholder="Search GitLab" type="text">
</div>
<input type="hidden" name="group_id" id="group_id" value="378" autocomplete="off" />
<input type="hidden" name="project_id" id="project_id" value="122" autocomplete="off" />
<input type="hidden" name="scope" id="scope" autocomplete="off" />
<input type="hidden" name="search_code" id="search_code" value="true" autocomplete="off" />
<input type="hidden" name="snippets" id="snippets" value="false" autocomplete="off" />
<input type="hidden" name="repository_ref" id="repository_ref" value="master" autocomplete="off" />
<input type="hidden" name="nav_source" id="nav_source" value="navbar" autocomplete="off" />
<kbd class="gl-absolute gl-right-3 gl-top-0 keyboard-shortcut-helper gl-z-index-1 has-tooltip" data-html="true" data-placement="bottom" title="Use the shortcut key &lt;kbd&gt;/&lt;/kbd&gt; to start a search">
/
</kbd>
</form></div>

</li>
<li class="nav-item d-none d-sm-inline-block d-lg-none">
<a title="Search" aria-label="Search" data-toggle="tooltip" data-placement="bottom" data-container="body" href="/search?project_id=122"><svg class="s16" data-testid="search-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#search"></use></svg>
</a></li>
<li class="nav-item header-help dropdown d-none d-md-block" data-track-action="click_question_mark_link" data-track-experiment="cross_stage_fdm" data-track-label="main_navigation" data-track-property="navigation">
<a class="header-help-dropdown-toggle gl-relative" data-toggle="dropdown" href="/help"><span class="gl-sr-only">
Help
</span>
<svg class="s16" data-testid="question-o-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#question-o"></use></svg>
<span class="notification-dot rounded-circle gl-absolute"></span>
<svg class="s16 caret-down" data-testid="chevron-down-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#chevron-down"></use></svg>
</a><div class="dropdown-menu dropdown-menu-right">
<ul>



<li>
<a href="/help">Help</a>
</li>
<li>
<a href="https://mypdns.atlassian.net/wiki/spaces/HQ/overview">Support</a>
</li>
<li>
<a target="_blank" class="text-nowrap" rel="noopener noreferrer" data-track-action="click_forum" data-track-property="question_menu" href="https://forum.gitlab.com">Community forum</a>

</li>
<li>
<button class="js-shortcuts-modal-trigger" type="button">
Keyboard shortcuts
<kbd aria-hidden="true" class="flat float-right">?</kbd>
</button>
</li>
<li class="divider"></li>
<li>
<a href="https://about.gitlab.com/submit-feedback">Submit feedback</a>
</li>
<li>

</li>

</ul>

</div>
</li>
<li class="nav-item">
<div>
<a class="gl-button btn btn-default btn-sign-in" href="/users/sign_in?redirect_to_referer=yes">Sign in / Register</a>
</div>
</li>

</ul>
</div>
<button class="navbar-toggler d-block d-sm-none gl-border-none!" data-qa-selector="mobile_navbar_button" data-testid="top-nav-responsive-toggle" type="button">
<span class="sr-only">Toggle navigation</span>
<span class="more-icon gl-px-3 gl-font-sm gl-font-weight-bold">
<span class="gl-pr-2">Menu</span>
<svg class="s16" data-testid="hamburger-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#hamburger"></use></svg>
</span>
<svg class="s12 close-icon" data-testid="close-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#close"></use></svg>
</button>
</div>
</div>
</header>

<div class="layout-page hide-when-top-nav-responsive-open page-with-contextual-sidebar">
<aside aria-label="Project navigation" class="nav-sidebar">
<div class="nav-sidebar-inner-scroll">
<ul class="sidebar-top-level-items" data-qa-selector="project_sidebar">
<li data-track-label="scope_menu" data-container="body" data-placement="right" class="context-header has-tooltip" title="MyPDNS Reporter"><a aria-label="MyPDNS Reporter" class="shortcuts-project rspec-project-link gl-link" data-qa-selector="sidebar_menu_link" data-qa-menu-item="Project scope" href="/infrastructure/mypdns-reporter"><span class="avatar-container rect-avatar s32 project_avatar">
<img alt="MyPDNS Reporter" class="avatar avatar-tile s32 lazy" width="32" height="32" data-src="/uploads/-/system/project/avatar/122/icon.png" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
</span>
<span class="sidebar-context-title">
MyPDNS Reporter
</span>
</a></li>
<li data-track-label="project_information_menu" class="home"><a aria-label="Project information" class="shortcuts-project-information has-sub-items gl-link" data-qa-selector="sidebar_menu_link" data-qa-menu-item="Project information" href="/infrastructure/mypdns-reporter/activity"><span class="nav-icon-container">
<svg class="s16" data-testid="project-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#project"></use></svg>
</span>
<span class="nav-item-name">
Project information
</span>
</a><ul class="sidebar-sub-level-items">
<li class="fly-out-top-item"><span class="fly-out-top-item-container">
<strong class="fly-out-top-item-name">
Project information
</strong>
</span>
</li><li class="divider fly-out-top-item"></li>
<li data-track-label="activity" class=""><a aria-label="Activity" class="shortcuts-project-activity gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Activity" href="/infrastructure/mypdns-reporter/activity"><span>
Activity
</span>
</a></li><li data-track-label="labels" class=""><a aria-label="Labels" class="gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Labels" href="/infrastructure/mypdns-reporter/-/labels"><span>
Labels
</span>
</a></li><li data-track-label="members" class=""><a aria-label="Members" id="js-onboarding-members-link" class="gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Members" href="/infrastructure/mypdns-reporter/-/project_members"><span>
Members
</span>
</a></li>
</ul>

</li><li data-track-label="repository_menu" class="active"><a aria-label="Repository" class="shortcuts-tree has-sub-items gl-link" data-qa-selector="sidebar_menu_link" data-qa-menu-item="Repository" href="/infrastructure/mypdns-reporter/-/tree/master"><span class="nav-icon-container">
<svg class="s16" data-testid="doc-text-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#doc-text"></use></svg>
</span>
<span class="nav-item-name" id="js-onboarding-repo-link">
Repository
</span>
</a><ul class="sidebar-sub-level-items">
<li class="fly-out-top-item active"><span class="fly-out-top-item-container">
<strong class="fly-out-top-item-name">
Repository
</strong>
</span>
</li><li class="divider fly-out-top-item"></li>
<li data-track-label="files" class="active"><a aria-label="Files" class="gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Files" href="/infrastructure/mypdns-reporter/-/tree/master"><span>
Files
</span>
</a></li><li data-track-label="commits" class=""><a aria-label="Commits" id="js-onboarding-commits-link" class="gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Commits" href="/infrastructure/mypdns-reporter/-/commits/master"><span>
Commits
</span>
</a></li><li data-track-label="branches" class=""><a aria-label="Branches" id="js-onboarding-branches-link" class="gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Branches" href="/infrastructure/mypdns-reporter/-/branches"><span>
Branches
</span>
</a></li><li data-track-label="tags" class=""><a aria-label="Tags" class="gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Tags" href="/infrastructure/mypdns-reporter/-/tags"><span>
Tags
</span>
</a></li><li data-track-label="contributors" class=""><a aria-label="Contributors" class="gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Contributors" href="/infrastructure/mypdns-reporter/-/graphs/master"><span>
Contributors
</span>
</a></li><li data-track-label="graphs" class=""><a aria-label="Graph" class="gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Graph" href="/infrastructure/mypdns-reporter/-/network/master"><span>
Graph
</span>
</a></li><li data-track-label="compare" class=""><a aria-label="Compare" class="gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Compare" href="/infrastructure/mypdns-reporter/-/compare?from=master&amp;to=master"><span>
Compare
</span>
</a></li>
</ul>

</li><li data-track-label="issues_menu" class=""><a aria-label="Issues" class="shortcuts-issues has-sub-items gl-link" data-qa-selector="sidebar_menu_link" data-qa-menu-item="Issues" href="/infrastructure/mypdns-reporter/-/issues"><span class="nav-icon-container">
<svg class="s16" data-testid="issues-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#issues"></use></svg>
</span>
<span class="nav-item-name" id="js-onboarding-issues-link">
Issues
</span>
<span class="gl-badge badge badge-pill badge-info sm count issue_counter">3
</span></a><ul class="sidebar-sub-level-items">
<li class="fly-out-top-item"><span class="fly-out-top-item-container">
<strong class="fly-out-top-item-name">
Issues
</strong>
<span class="gl-badge badge badge-pill badge-info sm count fly-out-badge issue_counter">3
</span></span>
</li><li class="divider fly-out-top-item"></li>
<li data-track-label="issue_list" class=""><a aria-label="Issues" class="gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="List" href="/infrastructure/mypdns-reporter/-/issues"><span>
List
</span>
</a></li><li data-track-label="boards" class=""><a aria-label="Boards" class="gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Boards" href="/infrastructure/mypdns-reporter/-/boards"><span>
Boards
</span>
</a></li><li data-track-label="service_desk" class=""><a aria-label="Service Desk" class="gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Service Desk" href="/infrastructure/mypdns-reporter/-/issues/service_desk"><span>
Service Desk
</span>
</a></li><li data-track-label="milestones" class=""><a aria-label="Milestones" class="gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Milestones" href="/infrastructure/mypdns-reporter/-/milestones"><span>
Milestones
</span>
</a></li>
</ul>

</li><li data-track-label="merge_requests_menu" class=""><a aria-label="Merge requests" class="shortcuts-merge_requests gl-link" data-qa-selector="sidebar_menu_link" data-qa-menu-item="Merge requests" href="/infrastructure/mypdns-reporter/-/merge_requests"><span class="nav-icon-container">
<svg class="s16" data-testid="git-merge-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#git-merge"></use></svg>
</span>
<span class="nav-item-name" id="js-onboarding-mr-link">
Merge requests
</span>
<span class="gl-badge badge badge-pill badge-info sm count merge_counter js-merge-counter">0
</span></a><ul class="sidebar-sub-level-items is-fly-out-only">
<li class="fly-out-top-item"><span class="fly-out-top-item-container">
<strong class="fly-out-top-item-name">
Merge requests
</strong>
<span class="gl-badge badge badge-pill badge-info sm count fly-out-badge merge_counter js-merge-counter">0
</span></span>
</li></ul>

</li><li data-track-label="deployments_menu" class=""><a aria-label="Deployments" class="shortcuts-deployments has-sub-items gl-link" data-qa-selector="sidebar_menu_link" data-qa-menu-item="Deployments" href="/infrastructure/mypdns-reporter/-/releases"><span class="nav-icon-container">
<svg class="s16" data-testid="deployments-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#deployments"></use></svg>
</span>
<span class="nav-item-name">
Deployments
</span>
</a><ul class="sidebar-sub-level-items">
<li class="fly-out-top-item"><span class="fly-out-top-item-container">
<strong class="fly-out-top-item-name">
Deployments
</strong>
</span>
</li><li class="divider fly-out-top-item"></li>
<li data-track-label="releases" class=""><a aria-label="Releases" class="shortcuts-deployments-releases gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Releases" href="/infrastructure/mypdns-reporter/-/releases"><span>
Releases
</span>
</a></li>
</ul>

</li><li data-track-label="packages_registries_menu" class=""><a aria-label="Packages &amp; Registries" class="has-sub-items gl-link" data-qa-selector="sidebar_menu_link" data-qa-menu-item="Packages &amp; Registries" href="/infrastructure/mypdns-reporter/-/packages"><span class="nav-icon-container">
<svg class="s16" data-testid="package-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#package"></use></svg>
</span>
<span class="nav-item-name">
Packages &amp; Registries
</span>
</a><ul class="sidebar-sub-level-items">
<li class="fly-out-top-item"><span class="fly-out-top-item-container">
<strong class="fly-out-top-item-name">
Packages &amp; Registries
</strong>
</span>
</li><li class="divider fly-out-top-item"></li>
<li data-track-label="packages_registry" class=""><a aria-label="Package Registry" class="shortcuts-container-registry gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Package Registry" href="/infrastructure/mypdns-reporter/-/packages"><span>
Package Registry
</span>
</a></li><li data-track-label="container_registry" class=""><a aria-label="Container Registry" class="gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Container Registry" href="/infrastructure/mypdns-reporter/container_registry"><span>
Container Registry
</span>
</a></li><li data-track-label="infrastructure_registry" class=""><a aria-label="Infrastructure Registry" class="gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="Infrastructure Registry" href="/infrastructure/mypdns-reporter/-/infrastructure_registry"><span>
Infrastructure Registry
</span>
</a></li>
</ul>

</li>
<li class="hidden">
<a aria-label="Activity" class="shortcuts-project-activity gl-link" href="/infrastructure/mypdns-reporter/activity">Activity
</a></li>
<li class="hidden">
<a aria-label="Graph" class="shortcuts-network gl-link" href="/infrastructure/mypdns-reporter/-/network/master">Graph
</a></li>
<li class="hidden">
<a aria-label="Create a new issue" class="shortcuts-new-issue gl-link" href="/infrastructure/mypdns-reporter/-/issues/new">Create a new issue
</a></li>
<li class="hidden">
<a aria-label="Commits" class="shortcuts-commits gl-link" href="/infrastructure/mypdns-reporter/-/commits/master">Commits
</a></li>
<li class="hidden">
<a aria-label="Issue Boards" class="shortcuts-issue-boards gl-link" href="/infrastructure/mypdns-reporter/-/boards">Issue Boards
</a></li>

</ul>
<a class="toggle-sidebar-button js-toggle-sidebar rspec-toggle-sidebar" role="button" title="Toggle sidebar" type="button">
<svg class="s12 icon-chevron-double-lg-left" data-testid="chevron-double-lg-left-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#chevron-double-lg-left"></use></svg>
<span class="collapse-text gl-ml-3">Collapse sidebar</span>
</a>
<button name="button" type="button" class="close-nav-button"><svg class="s16" data-testid="close-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#close"></use></svg>
<span class="collapse-text gl-ml-3">Close sidebar</span>
</button>
</div>
</aside>


<div class="content-wrapper content-wrapper-margin">
<div class="mobile-overlay"></div>

<div class="alert-wrapper gl-force-block-formatting-context">




















<nav aria-label="Breadcrumbs" class="breadcrumbs container-fluid container-limited project-highlight-puc">
<div class="breadcrumbs-container">
<button name="button" type="button" class="toggle-mobile-nav" data-qa-selector="toggle_mobile_nav_button"><span class="sr-only">Open sidebar</span>
<svg class="s18" data-testid="sidebar-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#sidebar"></use></svg>
</button><div class="breadcrumbs-links" data-qa-selector="breadcrumb_links_content" data-testid="breadcrumb-links">
<ul class="list-unstyled breadcrumbs-list js-breadcrumbs-list">
<li><a class="group-path breadcrumb-item-text js-breadcrumb-item-text " href="/infrastructure">Infrastructure</a><svg class="s8 breadcrumbs-list-angle" data-testid="chevron-lg-right-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#chevron-lg-right"></use></svg></li> <li><a href="/infrastructure/mypdns-reporter"><img alt="MyPDNS Reporter" class="avatar-tile lazy" width="15" height="15" data-src="/uploads/-/system/project/avatar/122/icon.png" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" /><span class="breadcrumb-item-text js-breadcrumb-item-text">MyPDNS Reporter</span></a><svg class="s8 breadcrumbs-list-angle" data-testid="chevron-lg-right-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#chevron-lg-right"></use></svg></li>

<li data-qa-selector="breadcrumb_current_link" data-testid="breadcrumb-current-link">
<a href="/infrastructure/mypdns-reporter/-/blob/master/gui/source.sp">Repository</a>
</li>
</ul>
</div>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Infrastructure","item":"https://mypdns.org/infrastructure"},{"@type":"ListItem","position":2,"name":"MyPDNS Reporter","item":"https://mypdns.org/infrastructure/mypdns-reporter"},{"@type":"ListItem","position":3,"name":"Repository","item":"https://mypdns.org/infrastructure/mypdns-reporter/-/blob/master/gui/source.sp"}]}

</script>

</div>
</nav>

</div>
<div class="container-fluid container-limited project-highlight-puc">
<main class="content" id="content-body" itemscope itemtype="http://schema.org/SoftwareSourceCode">
<div class="flash-container flash-container-page sticky" data-qa-selector="flash_container">
</div>


<div class="js-signature-container" data-signatures-path="/infrastructure/mypdns-reporter/-/commits/3687fb5ad6ec6534c0949a798c945a6306fd265c/signatures?limit=1"></div>

<div class="tree-holder" id="tree-holder">
<div class="nav-block">
<div class="tree-ref-container">
<div class="tree-ref-holder">
<form class="project-refs-form" action="/infrastructure/mypdns-reporter/-/refs/switch" accept-charset="UTF-8" method="get"><input type="hidden" name="destination" id="destination" value="blob" autocomplete="off" />
<div class="dropdown">
<button class="dropdown-menu-toggle js-project-refs-dropdown" type="button" data-toggle="dropdown" data-selected="master" data-ref="master" data-refs-url="/infrastructure/mypdns-reporter/refs?sort=updated_desc" data-field-name="ref" data-submit-form-on-click="true" data-visit="true" data-qa-selector="branches_dropdown" data-testid="branches-select"><span class="dropdown-toggle-text ">master</span><svg class="s16 dropdown-menu-toggle-icon gl-top-3" data-testid="chevron-down-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#chevron-down"></use></svg></button>
<div class="dropdown-menu dropdown-menu-selectable git-revision-dropdown dropdown-menu-paging" data-qa-selector="branches_dropdown_content">
<div class="dropdown-page-one">
<div class="dropdown-title gl-display-flex"><span class="gl-ml-auto">Switch branch/tag</span><button class="dropdown-title-button dropdown-menu-close gl-ml-auto" aria-label="Close" type="button"><svg class="s16 dropdown-menu-close-icon" data-testid="close-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#close"></use></svg></button></div>
<div class="dropdown-input"><input type="search" data-qa-selector="dropdown_input_field" class="dropdown-input-field" placeholder="Search branches and tags" autocomplete="off" /><svg class="s16 dropdown-input-search" data-testid="search-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#search"></use></svg><svg class="s16 dropdown-input-clear js-dropdown-input-clear" data-testid="close-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#close"></use></svg></div>
<div class="dropdown-content"></div>
<div class="dropdown-loading"><div class="gl-spinner-container gl-mt-7" role="status"><span class="gl-spinner gl-spinner-dark gl-spinner-md gl-vertical-align-text-bottom!" aria-label="Loading"></span></div></div>
</div>
</div>
</div>
</form>
</div>
<ul class="breadcrumb repo-breadcrumb">
<li class="breadcrumb-item">
<a href="/infrastructure/mypdns-reporter/-/tree/master">mypdns-reporter
</a></li>
<li class="breadcrumb-item">
<a href="/infrastructure/mypdns-reporter/-/tree/master/gui">gui</a>
</li>
<li class="breadcrumb-item">
<a href="/infrastructure/mypdns-reporter/-/blob/master/gui/source.sp"><strong>source.sp</strong>
</a></li>
</ul>
</div>
<div class="tree-controls gl-children-ml-sm-3"><a class="gl-button btn btn-default shortcuts-find-file" rel="nofollow" href="/infrastructure/mypdns-reporter/-/find_file/master">Find file
</a><a class="gl-button btn btn-default js-blob-blame-link" href="/infrastructure/mypdns-reporter/-/blame/master/gui/source.sp">Blame</a><a class="gl-button btn btn-default" href="/infrastructure/mypdns-reporter/-/commits/master/gui/source.sp">History</a><a class="gl-button btn btn-default js-data-file-blob-permalink-url" href="/infrastructure/mypdns-reporter/-/blob/d804bc894e5d2fc953bbf37add58e804cff73560/gui/source.sp">Permalink</a></div>
</div>

<div class="info-well d-none d-sm-block">
<div class="well-segment">
<ul class="blob-commit-info">
<li class="commit flex-row js-toggle-container" id="commit-3687fb5a">
<div class="avatar-cell d-none d-sm-block">
<a href="mailto:support@cloudflare.com"><img alt="CF&#39;s avatar" src="/assets/no_avatar-849f9c04a3a0d0cea2424ae97b27447dc64a7dbfae83c036c45b403392f0e8ba.png" class="avatar s40 d-none d-sm-inline-block" title="CF" /></a>
</div>
<div class="commit-detail flex-list gl-display-flex gl-justify-content-space-between gl-align-items-flex-start gl-flex-grow-1 gl-min-w-0">
<div class="commit-content" data-qa-selector="commit_content">
<a class="commit-row-message item-title js-onboarding-commit-item " href="/infrastructure/mypdns-reporter/-/commit/3687fb5ad6ec6534c0949a798c945a6306fd265c">commit</a>
<span class="commit-row-message d-inline d-sm-none">
&middot;
3687fb5a
</span>
<div class="committer">
<a class="commit-author-link" href="mailto:support@cloudflare.com">CF</a> authored <time class="js-timeago" title="Aug 4, 2022 11:04am" datetime="2022-08-04T09:04:17Z" data-toggle="tooltip" data-placement="bottom" data-container="body">Aug 04, 2022</time> and <a href="/cat"><img alt="Mr Dante&#39;s avatar" src="/uploads/-/system/user/avatar/271/avatar.png?width=18" class="avatar s18 d-none d-sm-inline-block float-none gl-mr-0! gl-vertical-align-text-bottom" title="Mr Dante" /></a> <a class="commit-committer-link js-user-link" data-user-id="271" href="/cat">Mr Dante</a> committed <time class="js-timeago" title="Aug 4, 2022 11:04am" datetime="2022-08-04T09:04:17Z" data-toggle="tooltip" data-placement="bottom" data-container="body">Aug 04, 2022</time>
</div>

</div>
<div class="commit-actions flex-row">

<div class="js-commit-pipeline-status" data-endpoint="/infrastructure/mypdns-reporter/-/commit/3687fb5ad6ec6534c0949a798c945a6306fd265c/pipelines?ref=master"></div>
<div class="commit-sha-group btn-group d-none d-sm-flex">
<div class="label label-monospace monospace">
3687fb5a
</div>
<button class="btn gl-button btn btn-default btn-icon" data-toggle="tooltip" data-placement="bottom" data-container="body" data-title="Copy commit SHA" data-class="gl-button btn btn-default btn-icon" data-clipboard-text="3687fb5ad6ec6534c0949a798c945a6306fd265c" type="button" title="Copy commit SHA" aria-label="Copy commit SHA" aria-live="polite"><svg class="s16 gl-icon" data-testid="copy-to-clipboard-icon"><use href="/assets/icons-cb3e99d32ea6ccc15123fc635733bb435edda525898e27f2026418abad0a3f58.svg#copy-to-clipboard"></use></svg></button>

</div>
</div>
</div>
</li>

</ul>
</div>


</div>
<div class="blob-content-holder" id="blob-content-holder">
<div data-blob-path="gui/source.sp" data-original-branch="master" data-project-path="infrastructure/mypdns-reporter" data-target-branch="master" id="js-view-blob-app">
<div class="gl-spinner-container" role="status"><span class="gl-spinner gl-spinner-dark gl-spinner-md gl-vertical-align-text-bottom!" aria-label="Loading"></span></div>
</div>
</div>

</div>

<script>
//<![CDATA[
  window.gl = window.gl || {};
  window.gl.webIDEPath = '/-/ide/project/infrastructure/mypdns-reporter/edit/master/-/gui/source.sp'


//]]>
</script>

</main>
</div>


</div>
</div>
<div class="top-nav-responsive layout-page content-wrapper-margin">
<div class="cloak-startup">
<div data-view-model="{&quot;primary&quot;:[{&quot;id&quot;:&quot;project&quot;,&quot;title&quot;:&quot;Projects&quot;,&quot;active&quot;:true,&quot;icon&quot;:&quot;project&quot;,&quot;href&quot;:&quot;/explore&quot;,&quot;view&quot;:&quot;&quot;,&quot;css_class&quot;:null,&quot;data&quot;:{&quot;qa_selector&quot;:&quot;menu_item_link&quot;,&quot;qa_title&quot;:&quot;Projects&quot;},&quot;emoji&quot;:null},{&quot;id&quot;:&quot;groups&quot;,&quot;title&quot;:&quot;Groups&quot;,&quot;active&quot;:false,&quot;icon&quot;:&quot;group&quot;,&quot;href&quot;:&quot;/explore/groups&quot;,&quot;view&quot;:&quot;&quot;,&quot;css_class&quot;:null,&quot;data&quot;:{&quot;qa_selector&quot;:&quot;menu_item_link&quot;,&quot;qa_title&quot;:&quot;Groups&quot;},&quot;emoji&quot;:null},{&quot;id&quot;:&quot;snippets&quot;,&quot;title&quot;:&quot;Snippets&quot;,&quot;active&quot;:false,&quot;icon&quot;:&quot;snippet&quot;,&quot;href&quot;:&quot;/explore/snippets&quot;,&quot;view&quot;:&quot;&quot;,&quot;css_class&quot;:null,&quot;data&quot;:{&quot;qa_selector&quot;:&quot;menu_item_link&quot;,&quot;qa_title&quot;:&quot;Snippets&quot;},&quot;emoji&quot;:null}],&quot;secondary&quot;:[],&quot;views&quot;:{&quot;search&quot;:{&quot;id&quot;:&quot;search&quot;,&quot;title&quot;:&quot;Search&quot;,&quot;active&quot;:false,&quot;icon&quot;:&quot;search&quot;,&quot;href&quot;:&quot;/search?project_id=122&quot;,&quot;view&quot;:&quot;&quot;,&quot;css_class&quot;:null,&quot;data&quot;:{&quot;qa_selector&quot;:&quot;menu_item_link&quot;,&quot;qa_title&quot;:&quot;Search&quot;},&quot;emoji&quot;:null}},&quot;shortcuts&quot;:[{&quot;id&quot;:&quot;project-shortcut&quot;,&quot;title&quot;:&quot;Projects&quot;,&quot;active&quot;:false,&quot;icon&quot;:&quot;&quot;,&quot;href&quot;:&quot;/explore&quot;,&quot;view&quot;:&quot;&quot;,&quot;css_class&quot;:&quot;dashboard-shortcuts-projects&quot;,&quot;data&quot;:{&quot;qa_selector&quot;:&quot;menu_item_link&quot;,&quot;qa_title&quot;:&quot;Projects&quot;},&quot;emoji&quot;:null},{&quot;id&quot;:&quot;groups-shortcut&quot;,&quot;title&quot;:&quot;Groups&quot;,&quot;active&quot;:false,&quot;icon&quot;:&quot;&quot;,&quot;href&quot;:&quot;/explore/groups&quot;,&quot;view&quot;:&quot;&quot;,&quot;css_class&quot;:&quot;dashboard-shortcuts-groups&quot;,&quot;data&quot;:{&quot;qa_selector&quot;:&quot;menu_item_link&quot;,&quot;qa_title&quot;:&quot;Groups&quot;},&quot;emoji&quot;:null},{&quot;id&quot;:&quot;snippets-shortcut&quot;,&quot;title&quot;:&quot;Snippets&quot;,&quot;active&quot;:false,&quot;icon&quot;:&quot;&quot;,&quot;href&quot;:&quot;/explore/snippets&quot;,&quot;view&quot;:&quot;&quot;,&quot;css_class&quot;:&quot;dashboard-shortcuts-snippets&quot;,&quot;data&quot;:{&quot;qa_selector&quot;:&quot;menu_item_link&quot;,&quot;qa_title&quot;:&quot;Snippets&quot;},&quot;emoji&quot;:null}],&quot;activeTitle&quot;:&quot;Menu&quot;}" id="js-top-nav-responsive"></div>
</div>
</div>


<div class="footer-message" style="background-color: #303030;color: #d3d7cf"><p>General Copyright <a href="/mypdns/support/-/wikis/License">My Privacy DNS</a> | <a href="/MypDNS/support/-/wikis/Cookies">Cookie policy</a> | <a href="/MypDNS/support/-/wikis/Privacy">Privacy</a> (No Piracy) | <a href="/mypdns/support/-/wikis/Contributor-Covenant-Code-of-Conduct" title="Code of Conduct">COC</a> | <a href="/mypdns/support/-/wikis/contributing/Writing-Guide">Writing Guide</a> | <a href="https://ioc.exchange/@mypdns" rel="nofollow noreferrer noopener" target="_blank">mypdns  ioc.exchange</a> |  <a href="/MypDNS/support/">Support</a> |  <a href="https://framagit.org/dCF/deCloudflare" rel="nofollow noreferrer noopener" target="_blank">crimeflare.eu.org project</a></p></div>
<script>
//<![CDATA[
if ('loading' in HTMLImageElement.prototype) {
  document.querySelectorAll('img.lazy').forEach(img => {
    img.loading = 'lazy';
    let imgUrl = img.dataset.src;
    // Only adding width + height for avatars for now
    if (imgUrl.indexOf('/avatar/') > -1 && imgUrl.indexOf('?') === -1) {
      const targetWidth = img.getAttribute('width') || img.width;
      imgUrl += `?width=${targetWidth}`;
    }
    img.src = imgUrl;
    img.removeAttribute('data-src');
    img.classList.remove('lazy');
    img.classList.add('js-lazy-loaded', 'qa-js-lazy-loaded');
  });
}

//]]>
</script>
<script>
//<![CDATA[
gl = window.gl || {};
gl.experiments = {};


//]]>
</script>

</body>
</html>

