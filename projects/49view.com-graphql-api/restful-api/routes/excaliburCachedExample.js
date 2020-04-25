export const testHtml=`
<!DOCTYPE html>
        <html lang="en-GB" class="no-js ">
        <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
                <meta charset="iso-8859-1" />
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <!--[if IE]><![endif]-->
                <meta name="format-detection" content="telephone=no">
                <meta name="referrer" content="origin-when-cross-origin">
<script type="text/javascript">
        window.RIGHTMOVE_JS_ERROR = "";
        window.onerror = function (msg, url, num) {
                window.RIGHTMOVE_JS_ERROR += "Message:" + msg + ', URL:' + url + ', Line:' + num + '\\n';
                return false;
        };
</script>
<script type="text/javascript">(window.NREUM||(NREUM={})).loader_config={xpid:"VwcEUVNaGwECU1BXBgA=",licenseKey:"8ec04da100",applicationID:"2271511"};window.NREUM||(NREUM={}),__nr_require=function(t,n,e){function r(e){if(!n[e]){var o=n[e]={exports:{}};t[e][0].call(o.exports,function(n){var o=t[e][1][n];return r(o||n)},o,o.exports)}return n[e].exports}if("function"==typeof __nr_require)return __nr_require;for(var o=0;o<e.length;o++)r(e[o]);return r}({1:[function(t,n,e){function r(t){try{s.console&&console.log(t)}catch(n){}}var o,i=t("ee"),a=t(21),s={};try{o=localStorage.getItem("__nr_flags").split(","),console&&"function"==typeof console.log&&(s.console=!0,o.indexOf("dev")!==-1&&(s.dev=!0),o.indexOf("nr_dev")!==-1&&(s.nrDev=!0))}catch(c){}s.nrDev&&i.on("internal-error",function(t){r(t.stack)}),s.dev&&i.on("fn-err",function(t,n,e){r(e.stack)}),s.dev&&(r("NR AGENT IN DEVELOPMENT MODE"),r("flags: "+a(s,function(t,n){return t}).join(", ")))},{}],2:[function(t,n,e){function r(t,n,e,r,s){try{p?p-=1:o(s||new UncaughtException(t,n,e),!0)}catch(f){try{i("ierr",[f,c.now(),!0])}catch(d){}}return"function"==typeof u&&u.apply(this,a(arguments))}function UncaughtException(t,n,e){this.message=t||"Uncaught error with no additional information",this.sourceURL=n,this.line=e}function o(t,n){var e=n?null:c.now();i("err",[t,e])}var i=t("handle"),a=t(22),s=t("ee"),c=t("loader"),f=t("gos"),u=window.onerror,d=!1,l="nr@seenError",p=0;c.features.err=!0,t(1),window.onerror=r;try{throw new Error}catch(h){"stack"in h&&(t(9),t(8),"addEventListener"in window&&t(5),c.xhrWrappable&&t(10),d=!0)}s.on("fn-start",function(t,n,e){d&&(p+=1)}),s.on("fn-err",function(t,n,e){d&&!e[l]&&(f(e,l,function(){return!0}),this.thrown=!0,o(e))}),s.on("fn-end",function(){d&&!this.thrown&&p>0&&(p-=1)}),s.on("internal-error",function(t){i("ierr",[t,c.now(),!0])})},{}],3:[function(t,n,e){t("loader").features.ins=!0},{}],4:[function(t,n,e){function r(t){}if(window.performance&&window.performance.timing&&window.performance.getEntriesByType){var o=t("ee"),i=t("handle"),a=t(9),s=t(8),c="learResourceTimings",f="addEventListener",u="resourcetimingbufferfull",d="bstResource",l="resource",p="-start",h="-end",m="fn"+p,w="fn"+h,v="bstTimer",g="pushState",y=t("loader");y.features.stn=!0,t(7),"addEventListener"in window&&t(5);var x=NREUM.o.EV;o.on(m,function(t,n){var e=t[0];e instanceof x&&(this.bstStart=y.now())}),o.on(w,function(t,n){var e=t[0];e instanceof x&&i("bst",[e,n,this.bstStart,y.now()])}),a.on(m,function(t,n,e){this.bstStart=y.now(),this.bstType=e}),a.on(w,function(t,n){i(v,[n,this.bstStart,y.now(),this.bstType])}),s.on(m,function(){this.bstStart=y.now()}),s.on(w,function(t,n){i(v,[n,this.bstStart,y.now(),"requestAnimationFrame"])}),o.on(g+p,function(t){this.time=y.now(),this.startPath=location.pathname+location.hash}),o.on(g+h,function(t){i("bstHist",[location.pathname+location.hash,this.startPath,this.time])}),f in window.performance&&(window.performance["c"+c]?window.performance[f](u,function(t){i(d,[window.performance.getEntriesByType(l)]),window.performance["c"+c]()},!1):window.performance[f]("webkit"+u,function(t){i(d,[window.performance.getEntriesByType(l)]),window.performance["webkitC"+c]()},!1)),document[f]("scroll",r,{passive:!0}),document[f]("keypress",r,!1),document[f]("click",r,!1)}},{}],5:[function(t,n,e){function r(t){for(var n=t;n&&!n.hasOwnProperty(u);)n=Object.getPrototypeOf(n);n&&o(n)}function o(t){s.inPlace(t,[u,d],"-",i)}function i(t,n){return t[1]}var a=t("ee").get("events"),s=t("wrap-function")(a,!0),c=t("gos"),f=XMLHttpRequest,u="addEventListener",d="removeEventListener";n.exports=a,"getPrototypeOf"in Object?(r(document),r(window),r(f.prototype)):f.prototype.hasOwnProperty(u)&&(o(window),o(f.prototype)),a.on(u+"-start",function(t,n){var e=t[1],r=c(e,"nr@wrapped",function(){function t(){if("function"==typeof e.handleEvent)return e.handleEvent.apply(e,arguments)}var n={object:t,"function":e}[typeof e];return n?s(n,"fn-",null,n.name||"anonymous"):e});this.wrapped=t[1]=r}),a.on(d+"-start",function(t){t[1]=this.wrapped||t[1]})},{}],6:[function(t,n,e){function r(t,n,e){var r=t[n];"function"==typeof r&&(t[n]=function(){var t=i(arguments),n={};o.emit(e+"before-start",[t],n);var a;n[m]&&n[m].dt&&(a=n[m].dt);var s=r.apply(this,t);return o.emit(e+"start",[t,a],s),s.then(function(t){return o.emit(e+"end",[null,t],s),t},function(t){throw o.emit(e+"end",[t],s),t})})}var o=t("ee").get("fetch"),i=t(22),a=t(21);n.exports=o;var s=window,c="fetch-",f=c+"body-",u=["arrayBuffer","blob","json","text","formData"],d=s.Request,l=s.Response,p=s.fetch,h="prototype",m="nr@context";d&&l&&p&&(a(u,function(t,n){r(d[h],n,f),r(l[h],n,f)}),r(s,"fetch",c),o.on(c+"end",function(t,n){var e=this;if(n){var r=n.headers.get("content-length");null!==r&&(e.rxSize=r),o.emit(c+"done",[null,n],e)}else o.emit(c+"done",[t],e)}))},{}],7:[function(t,n,e){var r=t("ee").get("history"),o=t("wrap-function")(r);n.exports=r;var i=window.history&&window.history.constructor&&window.history.constructor.prototype,a=window.history;i&&i.pushState&&i.replaceState&&(a=i),o.inPlace(a,["pushState","replaceState"],"-")},{}],8:[function(t,n,e){var r=t("ee").get("raf"),o=t("wrap-function")(r),i="equestAnimationFrame";n.exports=r,o.inPlace(window,["r"+i,"mozR"+i,"webkitR"+i,"msR"+i],"raf-"),r.on("raf-start",function(t){t[0]=o(t[0],"fn-")})},{}],9:[function(t,n,e){function r(t,n,e){t[0]=a(t[0],"fn-",null,e)}function o(t,n,e){this.method=e,this.timerDuration=isNaN(t[1])?0:+t[1],t[0]=a(t[0],"fn-",this,e)}var i=t("ee").get("timer"),a=t("wrap-function")(i),s="setTimeout",c="setInterval",f="clearTimeout",u="-start",d="-";n.exports=i,a.inPlace(window,[s,"setImmediate"],s+d),a.inPlace(window,[c],c+d),a.inPlace(window,[f,"clearImmediate"],f+d),i.on(c+u,r),i.on(s+u,o)},{}],10:[function(t,n,e){function r(t,n){d.inPlace(n,["onreadystatechange"],"fn-",s)}function o(){var t=this,n=u.context(t);t.readyState>3&&!n.resolved&&(n.resolved=!0,u.emit("xhr-resolved",[],t)),d.inPlace(t,g,"fn-",s)}function i(t){y.push(t),h&&(b?b.then(a):w?w(a):(E=-E,O.data=E))}function a(){for(var t=0;t<y.length;t++)r([],y[t]);y.length&&(y=[])}function s(t,n){return n}function c(t,n){for(var e in t)n[e]=t[e];return n}t(5);var f=t("ee"),u=f.get("xhr"),d=t("wrap-function")(u),l=NREUM.o,p=l.XHR,h=l.MO,m=l.PR,w=l.SI,v="readystatechange",g=["onload","onerror","onabort","onloadstart","onloadend","onprogress","ontimeout"],y=[];n.exports=u;var x=window.XMLHttpRequest=function(t){var n=new p(t);try{u.emit("new-xhr",[n],n),n.addEventListener(v,o,!1)}catch(e){try{u.emit("internal-error",[e])}catch(r){}}return n};if(c(p,x),x.prototype=p.prototype,d.inPlace(x.prototype,["open","send"],"-xhr-",s),u.on("send-xhr-start",function(t,n){r(t,n),i(n)}),u.on("open-xhr-start",r),h){var b=m&&m.resolve();if(!w&&!m){var E=1,O=document.createTextNode(E);new h(a).observe(O,{characterData:!0})}}else f.on("fn-end",function(t){t[0]&&t[0].type===v||a()})},{}],11:[function(t,n,e){function r(t){if(!i(t))return null;var n=window.NREUM;if(!n.loader_config)return null;var e=(n.loader_config.accountID||"").toString()||null,r=(n.loader_config.agentID||"").toString()||null,s=(n.loader_config.trustKey||"").toString()||null;if(!e||!r)return null;var c=a.generateCatId(),f=a.generateCatId(),u=Date.now(),d=o(c,f,u,e,r,s);return{header:d,guid:c,traceId:f,timestamp:u}}function o(t,n,e,r,o,i){var a="btoa"in window&&"function"==typeof window.btoa;if(!a)return null;var s={v:[0,1],d:{ty:"Browser",ac:r,ap:o,id:t,tr:n,ti:e}};return i&&r!==i&&(s.d.tk=i),btoa(JSON.stringify(s))}function i(t){var n=!1,e=!1,r={};if("init"in NREUM&&"distributed_tracing"in NREUM.init&&(r=NREUM.init.distributed_tracing,e=!!r.enabled),e)if(t.sameOrigin)n=!0;else if(r.allowed_origins instanceof Array)for(var o=0;o<r.allowed_origins.length;o++){var i=s(r.allowed_origins[o]);if(t.hostname===i.hostname&&t.protocol===i.protocol&&t.port===i.port){n=!0;break}}return e&&n}var a=t(19),s=t(13);n.exports={generateTracePayload:r,shouldGenerateTrace:i}},{}],12:[function(t,n,e){function r(t){var n=this.params,e=this.metrics;if(!this.ended){this.ended=!0;for(var r=0;r<l;r++)t.removeEventListener(d[r],this.listener,!1);n.aborted||(e.duration=a.now()-this.startTime,this.loadCaptureCalled||4!==t.readyState?null==n.status&&(n.status=0):i(this,t),e.cbTime=this.cbTime,u.emit("xhr-done",[t],t),s("xhr",[n,e,this.startTime]))}}function o(t,n){var e=c(n),r=t.params;r.host=e.hostname+":"+e.port,r.pathname=e.pathname,t.parsedOrigin=c(n),t.sameOrigin=t.parsedOrigin.sameOrigin}function i(t,n){t.params.status=n.status;var e=w(n,t.lastSize);if(e&&(t.metrics.rxSize=e),t.sameOrigin){var r=n.getResponseHeader("X-NewRelic-App-Data");r&&(t.params.cat=r.split(", ").pop())}t.loadCaptureCalled=!0}var a=t("loader");if(a.xhrWrappable){var s=t("handle"),c=t(13),f=t(11).generateTracePayload,u=t("ee"),d=["load","error","abort","timeout"],l=d.length,p=t("id"),h=t(17),m=t(16),w=t(14),v=window.XMLHttpRequest;a.features.xhr=!0,t(10),t(6),u.on("new-xhr",function(t){var n=this;n.totalCbs=0,n.called=0,n.cbTime=0,n.end=r,n.ended=!1,n.xhrGuids={},n.lastSize=null,n.loadCaptureCalled=!1,t.addEventListener("load",function(e){i(n,t)},!1),h&&(h>34||h<10)||window.opera||t.addEventListener("progress",function(t){n.lastSize=t.loaded},!1)}),u.on("open-xhr-start",function(t){this.params={method:t[0]},o(this,t[1]),this.metrics={}}),u.on("open-xhr-end",function(t,n){"loader_config"in NREUM&&"xpid"in NREUM.loader_config&&this.sameOrigin&&n.setRequestHeader("X-NewRelic-ID",NREUM.loader_config.xpid);var e=f(this.parsedOrigin);e&&e.header&&(n.setRequestHeader("newrelic",e.header),this.dt=e)}),u.on("send-xhr-start",function(t,n){var e=this.metrics,r=t[0],o=this;if(e&&r){var i=m(r);i&&(e.txSize=i)}this.startTime=a.now(),this.listener=function(t){try{"abort"!==t.type||o.loadCaptureCalled||(o.params.aborted=!0),("load"!==t.type||o.called===o.totalCbs&&(o.onloadCalled||"function"!=typeof n.onload))&&o.end(n)}catch(e){try{u.emit("internal-error",[e])}catch(r){}}};for(var s=0;s<l;s++)n.addEventListener(d[s],this.listener,!1)}),u.on("xhr-cb-time",function(t,n,e){this.cbTime+=t,n?this.onloadCalled=!0:this.called+=1,this.called!==this.totalCbs||!this.onloadCalled&&"function"==typeof e.onload||this.end(e)}),u.on("xhr-load-added",function(t,n){var e=""+p(t)+!!n;this.xhrGuids&&!this.xhrGuids[e]&&(this.xhrGuids[e]=!0,this.totalCbs+=1)}),u.on("xhr-load-removed",function(t,n){var e=""+p(t)+!!n;this.xhrGuids&&this.xhrGuids[e]&&(delete this.xhrGuids[e],this.totalCbs-=1)}),u.on("addEventListener-end",function(t,n){n instanceof v&&"load"===t[0]&&u.emit("xhr-load-added",[t[1],t[2]],n)}),u.on("removeEventListener-end",function(t,n){n instanceof v&&"load"===t[0]&&u.emit("xhr-load-removed",[t[1],t[2]],n)}),u.on("fn-start",function(t,n,e){n instanceof v&&("onload"===e&&(this.onload=!0),("load"===(t[0]&&t[0].type)||this.onload)&&(this.xhrCbStart=a.now()))}),u.on("fn-end",function(t,n){this.xhrCbStart&&u.emit("xhr-cb-time",[a.now()-this.xhrCbStart,this.onload,n],n)}),u.on("fetch-before-start",function(t){var n,e=t[1]||{};"string"==typeof t[0]?n=t[0]:t[0]&&t[0].url&&(n=t[0].url),n&&(this.parsedOrigin=c(n),this.sameOrigin=this.parsedOrigin.sameOrigin);var r=f(this.parsedOrigin);if(r&&r.header){var o=r.header;if("string"==typeof t[0]){var i={};for(var a in e)i[a]=e[a];i.headers=new Headers(e.headers||{}),i.headers.set("newrelic",o),this.dt=r,t.length>1?t[1]=i:t.push(i)}else t[0]&&t[0].headers&&(t[0].headers.append("newrelic",o),this.dt=r)}})}},{}],13:[function(t,n,e){var r={};n.exports=function(t){if(t in r)return r[t];var n=document.createElement("a"),e=window.location,o={};n.href=t,o.port=n.port;var i=n.href.split("://");!o.port&&i[1]&&(o.port=i[1].split("/")[0].split("@").pop().split(":")[1]),o.port&&"0"!==o.port||(o.port="https"===i[0]?"443":"80"),o.hostname=n.hostname||e.hostname,o.pathname=n.pathname,o.protocol=i[0],"/"!==o.pathname.charAt(0)&&(o.pathname="/"+o.pathname);var a=!n.protocol||":"===n.protocol||n.protocol===e.protocol,s=n.hostname===document.domain&&n.port===e.port;return o.sameOrigin=a&&(!n.hostname||s),"/"===o.pathname&&(r[t]=o),o}},{}],14:[function(t,n,e){function r(t,n){var e=t.responseType;return"json"===e&&null!==n?n:"arraybuffer"===e||"blob"===e||"json"===e?o(t.response):"text"===e||"document"===e||""===e||void 0===e?o(t.responseText):void 0}var o=t(16);n.exports=r},{}],15:[function(t,n,e){function r(){}function o(t,n,e){return function(){return i(t,[f.now()].concat(s(arguments)),n?null:this,e),n?void 0:this}}var i=t("handle"),a=t(21),s=t(22),c=t("ee").get("tracer"),f=t("loader"),u=NREUM;"undefined"==typeof window.newrelic&&(newrelic=u);var d=["setPageViewName","setCustomAttribute","setErrorHandler","finished","addToTrace","inlineHit","addRelease"],l="api-",p=l+"ixn-";a(d,function(t,n){u[n]=o(l+n,!0,"api")}),u.addPageAction=o(l+"addPageAction",!0),u.setCurrentRouteName=o(l+"routeName",!0),n.exports=newrelic,u.interaction=function(){return(new r).get()};var h=r.prototype={createTracer:function(t,n){var e={},r=this,o="function"==typeof n;return i(p+"tracer",[f.now(),t,e],r),function(){if(c.emit((o?"":"no-")+"fn-start",[f.now(),r,o],e),o)try{return n.apply(this,arguments)}catch(t){throw c.emit("fn-err",[arguments,this,t],e),t}finally{c.emit("fn-end",[f.now()],e)}}}};a("actionText,setName,setAttribute,save,ignore,onEnd,getContext,end,get".split(","),function(t,n){h[n]=o(p+n)}),newrelic.noticeError=function(t,n){"string"==typeof t&&(t=new Error(t)),i("err",[t,f.now(),!1,n])}},{}],16:[function(t,n,e){n.exports=function(t){if("string"==typeof t&&t.length)return t.length;if("object"==typeof t){if("undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer&&t.byteLength)return t.byteLength;if("undefined"!=typeof Blob&&t instanceof Blob&&t.size)return t.size;if(!("undefined"!=typeof FormData&&t instanceof FormData))try{return JSON.stringify(t).length}catch(n){return}}}},{}],17:[function(t,n,e){var r=0,o=navigator.userAgent.match(/Firefox[\\/\\s](\\d+\\.\\d+)/);o&&(r=+o[1]),n.exports=r},{}],18:[function(t,n,e){function r(t,n){var e=t.getEntries();e.forEach(function(t){"first-paint"===t.name?c("timing",["fp",Math.floor(t.startTime)]):"first-contentful-paint"===t.name&&c("timing",["fcp",Math.floor(t.startTime)])})}function o(t,n){var e=t.getEntries();e.length>0&&c("lcp",[e[e.length-1]])}function i(t){if(t instanceof u&&!l){var n,e=Math.round(t.timeStamp);n=e>1e12?Date.now()-e:f.now()-e,l=!0,c("timing",["fi",e,{type:t.type,fid:n}])}}if(!("init"in NREUM&&"page_view_timing"in NREUM.init&&"enabled"in NREUM.init.page_view_timing&&NREUM.init.page_view_timing.enabled===!1)){var a,s,c=t("handle"),f=t("loader"),u=NREUM.o.EV;if("PerformanceObserver"in window&&"function"==typeof window.PerformanceObserver){a=new PerformanceObserver(r),s=new PerformanceObserver(o);try{a.observe({entryTypes:["paint"]}),s.observe({entryTypes:["largest-contentful-paint"]})}catch(d){}}if("addEventListener"in document){var l=!1,p=["click","keydown","mousedown","pointerdown","touchstart"];p.forEach(function(t){document.addEventListener(t,i,!1)})}}},{}],19:[function(t,n,e){function r(){function t(){return n?15&n[e++]:16*Math.random()|0}var n=null,e=0,r=window.crypto||window.msCrypto;r&&r.getRandomValues&&(n=r.getRandomValues(new Uint8Array(31)));for(var o,i="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",a="",s=0;s<i.length;s++)o=i[s],"x"===o?a+=t().toString(16):"y"===o?(o=3&t()|8,a+=o.toString(16)):a+=o;return a}function o(){function t(){return n?15&n[e++]:16*Math.random()|0}var n=null,e=0,r=window.crypto||window.msCrypto;r&&r.getRandomValues&&Uint8Array&&(n=r.getRandomValues(new Uint8Array(31)));for(var o=[],i=0;i<16;i++)o.push(t().toString(16));return o.join("")}n.exports={generateUuid:r,generateCatId:o}},{}],20:[function(t,n,e){function r(t,n){if(!o)return!1;if(t!==o)return!1;if(!n)return!0;if(!i)return!1;for(var e=i.split("."),r=n.split("."),a=0;a<r.length;a++)if(r[a]!==e[a])return!1;return!0}var o=null,i=null,a=/Version\\/(\\S+)\\s+Safari/;if(navigator.userAgent){var s=navigator.userAgent,c=s.match(a);c&&s.indexOf("Chrome")===-1&&s.indexOf("Chromium")===-1&&(o="Safari",i=c[1])}n.exports={agent:o,version:i,match:r}},{}],21:[function(t,n,e){function r(t,n){var e=[],r="",i=0;for(r in t)o.call(t,r)&&(e[i]=n(r,t[r]),i+=1);return e}var o=Object.prototype.hasOwnProperty;n.exports=r},{}],22:[function(t,n,e){function r(t,n,e){n||(n=0),"undefined"==typeof e&&(e=t?t.length:0);for(var r=-1,o=e-n||0,i=Array(o<0?0:o);++r<o;)i[r]=t[n+r];return i}n.exports=r},{}],23:[function(t,n,e){n.exports={exists:"undefined"!=typeof window.performance&&window.performance.timing&&"undefined"!=typeof window.performance.timing.navigationStart}},{}],ee:[function(t,n,e){function r(){}function o(t){function n(t){return t&&t instanceof r?t:t?c(t,s,i):i()}function e(e,r,o,i){if(!l.aborted||i){t&&t(e,r,o);for(var a=n(o),s=m(e),c=s.length,f=0;f<c;f++)s[f].apply(a,r);var d=u[y[e]];return d&&d.push([x,e,r,a]),a}}function p(t,n){g[t]=m(t).concat(n)}function h(t,n){var e=g[t];if(e)for(var r=0;r<e.length;r++)e[r]===n&&e.splice(r,1)}function m(t){return g[t]||[]}function w(t){return d[t]=d[t]||o(e)}function v(t,n){f(t,function(t,e){n=n||"feature",y[e]=n,n in u||(u[n]=[])})}var g={},y={},x={on:p,addEventListener:p,removeEventListener:h,emit:e,get:w,listeners:m,context:n,buffer:v,abort:a,aborted:!1};return x}function i(){return new r}function a(){(u.api||u.feature)&&(l.aborted=!0,u=l.backlog={})}var s="nr@context",c=t("gos"),f=t(21),u={},d={},l=n.exports=o();l.backlog=u},{}],gos:[function(t,n,e){function r(t,n,e){if(o.call(t,n))return t[n];var r=e();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(t,n,{value:r,writable:!0,enumerable:!1}),r}catch(i){}return t[n]=r,r}var o=Object.prototype.hasOwnProperty;n.exports=r},{}],handle:[function(t,n,e){function r(t,n,e,r){o.buffer([t],r),o.emit(t,n,e)}var o=t("ee").get("handle");n.exports=r,r.ee=o},{}],id:[function(t,n,e){function r(t){var n=typeof t;return!t||"object"!==n&&"function"!==n?-1:t===window?0:a(t,i,function(){return o++})}var o=1,i="nr@id",a=t("gos");n.exports=r},{}],loader:[function(t,n,e){function r(){if(!E++){var t=b.info=NREUM.info,n=p.getElementsByTagName("script")[0];if(setTimeout(u.abort,3e4),!(t&&t.licenseKey&&t.applicationID&&n))return u.abort();f(y,function(n,e){t[n]||(t[n]=e)}),c("mark",["onload",a()+b.offset],null,"api");var e=p.createElement("script");e.src="https://"+t.agent,n.parentNode.insertBefore(e,n)}}function o(){"complete"===p.readyState&&i()}function i(){c("mark",["domContent",a()+b.offset],null,"api")}function a(){return O.exists&&performance.now?Math.round(performance.now()):(s=Math.max((new Date).getTime(),s))-b.offset}var s=(new Date).getTime(),c=t("handle"),f=t(21),u=t("ee"),d=t(20),l=window,p=l.document,h="addEventListener",m="attachEvent",w=l.XMLHttpRequest,v=w&&w.prototype;NREUM.o={ST:setTimeout,SI:l.setImmediate,CT:clearTimeout,XHR:w,REQ:l.Request,EV:l.Event,PR:l.Promise,MO:l.MutationObserver};var g=""+location,y={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",agent:"js-agent.newrelic.com/nr-1167.min.js"},x=w&&v&&v[h]&&!/CriOS/.test(navigator.userAgent),b=n.exports={offset:s,now:a,origin:g,features:{},xhrWrappable:x,userAgent:d};t(15),t(18),p[h]?(p[h]("DOMContentLoaded",i,!1),l[h]("load",r,!1)):(p[m]("onreadystatechange",o),l[m]("onload",r)),c("mark",["firstbyte",s],null,"api");var E=0,O=t(23)},{}],"wrap-function":[function(t,n,e){function r(t){return!(t&&t instanceof Function&&t.apply&&!t[a])}var o=t("ee"),i=t(22),a="nr@original",s=Object.prototype.hasOwnProperty,c=!1;n.exports=function(t,n){function e(t,n,e,o){function nrWrapper(){var r,a,s,c;try{a=this,r=i(arguments),s="function"==typeof e?e(r,a):e||{}}catch(f){l([f,"",[r,a,o],s])}u(n+"start",[r,a,o],s);try{return c=t.apply(a,r)}catch(d){throw u(n+"err",[r,a,d],s),d}finally{u(n+"end",[r,a,c],s)}}return r(t)?t:(n||(n=""),nrWrapper[a]=t,d(t,nrWrapper),nrWrapper)}function f(t,n,o,i){o||(o="");var a,s,c,f="-"===o.charAt(0);for(c=0;c<n.length;c++)s=n[c],a=t[s],r(a)||(t[s]=e(a,f?s+o:o,i,s))}function u(e,r,o){if(!c||n){var i=c;c=!0;try{t.emit(e,r,o,n)}catch(a){l([a,e,r,o])}c=i}}function d(t,n){if(Object.defineProperty&&Object.keys)try{var e=Object.keys(t);return e.forEach(function(e){Object.defineProperty(n,e,{get:function(){return t[e]},set:function(n){return t[e]=n,n}})}),n}catch(r){l([r])}for(var o in t)s.call(t,o)&&(n[o]=t[o]);return n}function l(n){try{t.emit("internal-error",n)}catch(e){}}return t||(t=o),e.inPlace=f,e.flag=a,e}},{}]},{},["loader",2,12,4,3]);</script><!-- Page hiding snippet (recommended)  -->
<style>.async-hide { opacity: 0 !important} </style>
<script>
    (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
    h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
    (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
    })(window,document.documentElement,'async-hide','dataLayer',4000,
    {'GTM-M5C7HFR':true});
</script>

<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-3350334-63', 'auto',
        {
            'legacyHistoryImport': false,
            'cookieName': '_gaRM'
        }
    );
    ga('require', 'GTM-M5C7HFR');
</script><script type="text/javascript">
                        window._gaq = window._gaq || [];
                        window._rmpage = window._rmpage || [];
            window._rmbot = false;
                        window._rmsegment = '';
        </script>

                <script type="text/javascript">
        var RIGHTMOVE_REQUEST = {
                jsTime : (new Date()).getTime(),
                trcid : "bf1a89aa-d503-4517-9217-ca78c9aa4805",
                reqTime : "t=1587418847280557",
                svr : "2702",
                uri : "/property-for-sale/property-67910289.html",
                category : "other",
                mobile: "false"
        };
</script><link rel="stylesheet" type="text/css" href="/ps/css20100/concat/css_fullsite/standard.css" media="all" />
                <script type="text/javascript" src="/ps/js20100/concat/js_fullsite/standard.js"></script>

                <script type="text/javascript">
        RIGHTMOVE.UTIL.loadTime.init(RIGHTMOVE_REQUEST);
        RIGHTMOVE.UTIL.encodedUrl = "/";
    RIGHTMOVE.UTIL.secureFlowPatterns = [".*/payment/.*","/rightmoveplus/property/preview/.*","/admin/property/preview/.*",".*/login.html.*",".*/register.html.*",".*/user/changePassword.html.*",".*/resetPassword.html.*",".*/forgottenPassword.html.*",".*/forgottenPasswordForm.html.*",".*/jobpicker.html.*",".*/unclaimedlead/.*\\\\.html.*",".*/removals/survey/.*\\\\.html.*"];
        RIGHTMOVE.UTIL.secureEncodedUrl = "https://www.rightmove.co.uk/";
</script><script type="text/javascript">
        var _gaq = _gaq || [];
        (function() {
            var src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            RIGHTMOVE.loadJSAsync(src);
        })();
    </script>
<title>2 bedroom flat for sale in Denewood, Worple Road, Wimbledon, SW19</title>
<meta name="description" content="2 bedroom flat for sale in Denewood, Worple Road, Wimbledon - Rightmove."/>
<link rel="canonical" href="https://www.rightmove.co.uk/property-for-sale/property-67910289.html"/>
<!-- APPLE ICONS -->
<link rel="apple-touch-icon" sizes="72x72" href="/ps/images/favicons/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="114x114" href="/ps/images/favicons/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/ps/images/favicons/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/ps/images/favicons/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/ps/images/favicons/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/ps/images/favicons/apple-touch-icon-180x180.png">
<meta name="apple-mobile-web-app-title" content="Rightmove">
<meta name="application-name" content="Rightmove">
<meta name="theme-color" content="#262637">
<!-- ANDROID AND CHROME ICONS -->
<link rel="manifest" href="/ps/images/favicons/manifest.json">
<!-- MICROSOFT ICONS -->
<meta name="msapplication-TileColor" content="#262637">
<meta name="msapplication-TileImage" content="/ps/images/favicons/mstile-144x144.png">
<meta name="msapplication-config" content="/ps/images/favicons/browserconfig.xml">
<!--[if IE]>
<meta name="slice" scheme="IE" content="off"/>
<![endif]-->

<script type="text/javascript">
                (function() {
                        var domain = 'rightmove.co.uk';
                        RIGHTMOVE.UTIL.analytics.initialise(domain, 'UA-3350334-1', 'UA-3350334-30');
                        
                        RIGHTMOVE.UTIL.analytics.setCustomVariable(
                                5,
                                'response_resi_results',
                                'N:83:-1',
                                2
                        );
                
                        RIGHTMOVE.UTIL.analytics.setCustomVariable(
                                8,
                                'mvt',
                                'GoogleTagManagerSwitch.GTM_THIRD_PARTY_TAG_SWITCH:on|CookieBarSwitches.LOAD_COMSCORE:off|CookieBarSwitches.SHOW_INTERNAL_COOKIE_BAR:off|EmailLeadFormLettingLVA:CONTROL|SchoolsLandingPageMVT:CONTROL|FeatureSwitches.SEARCH_WITH_GEO_JSON_POSTCODE:off|CookieBarSwitches.SHOW_FULL_SCREEN_COOKIE_BAR:off|MRMPreferencesMVT:VARIANT_PREF_POPUP_NEW_DESIGN|MRMRegistrationMVT:VARIANT_REG_WITH_DESCRIPTION',
                                2
                        );
                
                        RIGHTMOVE.UTIL.analytics.setCustomVariable(
                                33,
                                'Login Register Modal Test',
                                'T',
                                1
                        );
                
        RIGHTMOVE.UTIL.analytics.trackPageViewWithDefault('buying/propertydetails');
    
                        RIGHTMOVE.UTIL.analytics.trackPageLoadTime();
                }());
    </script>
        <script type="text/javascript">
                var googletag = googletag || {};
                googletag.cmd = googletag.cmd || [];
                googletag.cmd.push(function() {
                        googletag.pubads().setCookieOptions(false ? 0 : 1);
                        
                        googletag.cmd.push(function() {
                                googletag.pubads().setRequestNonPersonalizedAds(1);
                        });
                        
                });
        </script>
        <script type='text/javascript'>
                        RIGHTMOVE.loadJSAsync("//www.googletagservices.com/tag/js/gpt.js");
                </script>
        <script type="text/javascript">
        
                document.domain = "rightmove.co.uk";
        
</script>
<meta property="og:url" content="https://www.rightmove.co.uk/property-for-sale/property-67910289.html"/>
    <meta property="og:title" content="Check out this property for sale on Rightmove!"/>
    <meta property="og:type" content="website"/>
    <meta property="og:image" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_01_0000_max_656x437.jpg"/>
    <meta property="og:image" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_02_0000_max_656x437.jpg"/>
    <meta property="og:image" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_03_0000_max_656x437.jpg"/>
    <meta property="og:image" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_04_0000_max_656x437.jpg"/>
    <meta property="og:image" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_05_0000_max_656x437.jpg"/>
    <meta property="og:image" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_06_0000_max_656x437.jpg"/>
    <meta property="og:image" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_07_0000_max_656x437.jpg"/>
    <meta property="og:image" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_08_0000_max_656x437.jpg"/>
    <meta property="og:image" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_09_0000_max_656x437.jpg"/>
    <meta property="og:image" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_10_0000_max_656x437.jpg"/>
    <meta property="og:image" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_11_0000_max_656x437.jpg"/>
    <meta property="og:image" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_12_0000_max_656x437.jpg"/>
    <meta property="og:locale" content="en_GB"/>
    <meta property="og:site_name" content="Rightmove.co.uk"/>
    <meta property="og:description" content="2 bedroom flat for sale in Denewood, Worple Road, Wimbledon &pound;535,000. Marketed by andrew scott robertson, Wimbledon Hill - Sales "/>
    <meta property="fb:admins" content="rightmove.plc"/>
    <meta property="fb:app_id" content="485764298115191" />
    <meta property="twitter:account_id" content="2911111" />
<meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:image:src" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_01_0000_max_656x437.jpg">
        <meta name="twitter:site" content="@rightmove">
    <meta name="twitter:url" content="https://www.rightmove.co.uk/property-for-sale/property-67910289.html">
    <meta name="twitter:title" content="Check out this property for sale on Rightmove!">
    <meta name="twitter:description" content="2 bedroom flat for sale in Denewood, Worple Road, Wimbledon &pound;535,000. Marketed by andrew scott robertson, Wimbledon Hill - Sales ">
<meta name="apple-itunes-app" content="app-id=323822803, affiliate-data=at=11lqxx&ct=smartbanner, app-argument=rightmove://PROPERTY_DETAILS?propertyId=67910289"/>
        </head>

<!--[if lt IE 7]> <body id="" class="t-right-col property-details print-agent-branded-header coloured odin-top-nav ie-6 lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if IE 7]> <body id="" class="t-right-col property-details print-agent-branded-header coloured odin-top-nav ie-7 lt-ie9 lt-ie8"><![endif]-->
<!--[if IE 8]> <body id="" class="t-right-col property-details print-agent-branded-header coloured odin-top-nav ie-8 lt-ie9"><![endif]-->
<!--[if lt IEMobile 8]> <body id="" class="t-right-col property-details print-agent-branded-header coloured odin-top-nav lt-ieMobile-8"><![endif]-->
<!--[if gt IE 8]><!--> <body id="" class="t-right-col property-details print-agent-branded-header coloured odin-top-nav"><!--<![endif]-->
<script>
                                
                (function(w,p,u,s) {
                        var dataLayer = RIGHTMOVE.ANALYTICS.DataLayer;

                        dataLayer.pushKV('page', {"uri":"/property-for-sale/property-67910289.html","referrer":null,"serverTimestamp":1587418847366,"svr":"2702","channel":"buying","isEmbedded":false,"ismSitePage":false});
                        dataLayer.pushKV('page', { screenHeight: w.innerHeight, screenWidth: w.innerWidth , userTimestamp: new Date().getTime(), application: 'publicsite' });

                        dataLayer.pushKV('user', {"pcid":"200420ODM49V0ONTE44T5MKUST75BAE7","secUserId":null,"emailHash":"","ckse":null,"cksp":null,"userType":"none","userSegment":null});
                        dataLayer.pushKV('user', { ckse : w.navigator.cookieEnabled });

                        dataLayer.pushKV('session', {"mvtOnSession":false,"javaSessionId":null,"deviceType":"desktop","referringURL":null,"mvtInfo":[{"shouldLog":true,"label":"GoogleTagManagerSwitch.GTM_THIRD_PARTY_TAG_SWITCH","state":"on"},{"shouldLog":true,"label":"CookieBarSwitches.LOAD_COMSCORE","state":"off"},{"shouldLog":true,"label":"CookieBarSwitches.SHOW_INTERNAL_COOKIE_BAR","state":"off"},{"shouldLog":true,"label":"EmailLeadFormLettingLVA","state":"CONTROL"},{"shouldLog":true,"label":"SchoolsLandingPageMVT","state":"CONTROL"},{"shouldLog":true,"label":"FeatureSwitches.SEARCH_WITH_GEO_JSON_POSTCODE","state":"off"},{"shouldLog":true,"label":"CookieBarSwitches.SHOW_FULL_SCREEN_COOKIE_BAR","state":"off"},{"shouldLog":true,"label":"MRMPreferencesMVT","state":"VARIANT_PREF_POPUP_NEW_DESIGN"},{"shouldLog":true,"label":"MRMRegistrationMVT","state":"VARIANT_REG_WITH_DESCRIPTION"}],"utm_medium":null,"utm_source":null,"utm_campaign":null,"utm_content":null,"utm_term":null});
                }(window));
        </script>
                <script>
                                
                (function(){
                        RIGHTMOVE.ANALYTICS.GoogleTagManager.initialize(window,document,'script','rmDataLayer','GTM-T4524Q','g2ndo_352oWlGwJG7HHfyw','env-7');
                })();
        </script>
                <noscript>
                <iframe src="//www.googletagmanager.com/ns.html?id=GTM-T4524Q&gtm_auth=g2ndo_352oWlGwJG7HHfyw&gtm_preview=env-7&gtm_cookies_win=x"
                                height="0" width="0" style="display:none;visibility:hidden"></iframe>
        </noscript>
<header class="globalHeader  header-rebranding"
                id="globalHeader">
        <div class="globalNav-wrapper">
                <a href="/">
        <img id="rm-site-logo"
                                 src="/ps/images20100/fullsite/logos/rm-site--logo.svg"
                                 class="globalHeader-logo globalHeader-logo--rebranded" alt="Rightmove property search for flats and houses for sale and for rent">
                </a><nav class="globalNav">
                        <ul class="globalNav-content">
                                <li class="globalNav-item">
                                        <a class="globalNav-link" href="/property-for-sale.html" data-analytics-label="buy">
                                                Buy
                                        </a>
                                        <div class="globalNav-subNav">
                                                <ul class="globalNav-subNav-col">
                                                        <li class="globalNav-subNav-item">
                                                                <a class="globalNav-subNav-link" href="/property-for-sale.html"
                                                                   data-analytics-label="buy-property-for-sale">Property for sale</a>
                                                        </li>
                                                        <li class="globalNav-subNav-item">
                                                                <a class="globalNav-subNav-link" href="/new-homes-for-sale.html"
                                                                   data-analytics-label="buy-new-homes-for-sale">New homes for sale</a>
                                                        </li>
                                                </ul>
                                                <ul class="globalNav-subNav-col">
                                                                <li class="globalNav-subNav-item">
                                                                        <a class="globalNav-subNav-link" href="/property-valuation.html"
                                                                           data-analytics-label="buy-property-valuation">Property valuation</a>
                                                                </li>
                                                                <li class="globalNav-subNav-item">
                                                                        <a class="globalNav-subNav-link" href="/property-investment.html"
                                                                           data-analytics-label="buy-investors">Investors</a>
                                                                </li>
                                                                <li class="globalNav-subNav-item">
                                                                        <a class="globalNav-subNav-link" href="/mortgages/"
                                                                           data-analytics-label="buy-mortgages">Mortgages</a>
                                                                </li>
                                                        </ul>
                                                </div>
                                </li>

                                <li class="globalNav-item">
                                        <a class="globalNav-link" href="/property-to-rent.html" data-analytics-label="rent">
                                                Rent
                                        </a>
                                        <div class="globalNav-subNav">
                                                <ul class="globalNav-subNav-col">
                                                        <li class="globalNav-subNav-item">
                                                                <a class="globalNav-subNav-link" href="/property-to-rent"
                                                                   data-analytics-label="rent-property-to-rent">Property to rent</a>
                                                        </li>
                                                        <li class="globalNav-subNav-item">
                                                                <a class="globalNav-subNav-link" href="/student-accommodation.html"
                                                                   data-analytics-label="rent-student-property-to-rent">Student property to rent</a>
                                                        </li>
                                                </ul>
                                        </div>
                                </li>

                                <li class="globalNav-item globalNav-item-findAgents">
                                        <a class="globalNav-link" href="/estate-agents.html" data-analytics-label="find-agent">
                                                Find&nbsp;Agent
                                        </a>
                                        <div class="globalNav-subNav">
                        <ul class="globalNav-subNav-col">
                                    <li class="globalNav-subNav-item">
                                        <a class="globalNav-subNav-link" href="/estate-agents.html"
                                           data-analytics-label="find-agent-find-estate-agents">Find estate agents</a>
                                    </li>
                                    <li class="globalNav-subNav-item">
                                        <a class="globalNav-subNav-link" href="/property-valuation.html"
                                           data-analytics-label="find-agent-property-valuation">Property valuation</a>
                                    </li>
                                </ul>
                            </div>
                                </li>

                                <li class="globalNav-item">
                                        <a class="globalNav-link" href="/house-prices.html" data-analytics-label="house-prices">
                                                House&nbsp;Prices
                                        </a>
                                        <div class="globalNav-subNav">
                                                <ul class="globalNav-subNav-col">
                                                        <li class="globalNav-subNav-item">
                                                                <a class="globalNav-subNav-link" href="/house-prices.html"
                                                                   data-analytics-label="house-prices-sold-house-prices">Sold house prices</a>
                                                        </li>
                                                        <li class="globalNav-subNav-item">
                                                                <a class="globalNav-subNav-link" href="/property-valuation.html"
                                                                   data-analytics-label="house-prices-property-valuation">Property valuation</a>
                                                        </li>
                                                </ul>
                                                <ul class="globalNav-subNav-col">
                                                        <li class="globalNav-subNav-item">
                                                                <a class="globalNav-subNav-link" href="/house-prices-in-my-area.html"
                                                                   data-analytics-label="house-prices-market-trends">Market trends</a>
                                                        </li>
                                                        <li class="globalNav-subNav-item">
                                                                <a class="globalNav-subNav-link" href="/house-value.html"
                                                                   data-analytics-label="house-prices-price-comparison-report">Price comparison
                                                                        report</a>
                                                        </li>
                                                </ul>
                                        </div>
                                </li>

                                <li class="globalNav-item globalNav-item-commercial">
                                        <a class="globalNav-link" href="/commercial-property-to-let.html" data-analytics-label="commercial">
                                                Commercial
                                        </a>
                                        <div class="globalNav-subNav">
                                                <ul class="globalNav-subNav-col">
                                                        <li class="globalNav-subNav-item">
                                                                <a class="globalNav-subNav-link" href="/commercial-property-to-let.html"
                                                                   data-analytics-label="commercial-commercial-property-to-let">Commercial property to 
                                                                   rent</a>
                                                        </li>
                                                        <li class="globalNav-subNav-item">
                                                                <a class="globalNav-subNav-link" href="/commercial-property-for-sale.html"
                                                                   data-analytics-label="commercial-commercial-property-for-sale">Commercial property
                                                                        for sale</a>
                                                        </li>
                                                </ul>
                                        </div>
                                </li>

                                <li class="globalNav-item globalNav-item-inspire">
                                        <a class="globalNav-link" href="/stories-and-advice" data-analytics-label="inspire">
                                                Inspire
                                        </a>
                                        <div class="globalNav-subNav">
                                                <ul class="reverseBorder globalNav-subNav-col">
                                                        <li class="globalNav-subNav-item">
                                                                <a class="globalNav-subNav-link" href="/moving-stories"
                                                                   data-analytics-label="inspire-moving-stories">Moving stories</a>
                                                        </li>
                                                        <li class="globalNav-subNav-item">
                                                                <a class="globalNav-subNav-link" href="/news"
                                                                   data-analytics-label="inspire-property-blog">Property blog</a>
                                                        </li>
                                                </ul>
                                                <ul class="reverseBorder globalNav-subNav-col">
                                                        <li class="globalNav-subNav-item">
                                                                <a class="globalNav-subNav-link" href="/advice"
                                                                   data-analytics-label="inspire-property-advice">Property advice</a>
                                                        </li>
                                                        <li class="globalNav-subNav-item">
                                                                <a class="globalNav-subNav-link" href="/news/house-price-index"
                                                                   data-analytics-label="inspire-housing-trends">Housing trends</a>
                                                        </li>
                                                </ul>
                                        </div>
                                </li>

                                <li class="globalNav-item globalNav-item-overseas">
                                        <a class="globalNav-link" href="/overseas-property.html" data-analytics-label="overseas">
                                                Overseas
                                        </a>
                                        <div class="globalNav-subNav">
                                                                <ul class="reverseBorder globalNav-subNav-col">
                                                                        <li class="globalNav-subNav-item">
                                                                                <a class="globalNav-subNav-link" href="/overseas-property.html"
                                                                                   data-analytics-label="overseas-overseas-properties-for-sale">Overseas
                                                                                        properties for sale</a>
                                                                        </li>
                                                                        <li class="globalNav-subNav-item">
                                                                                <a class="globalNav-subNav-link" href="/overseas-property/hot-properties.html"
                                                                                   data-analytics-label="overseas-hot-properties">Hot properties</a>
                                                                        </li>
                                                                        <li class="globalNav-subNav-item">
                                                                                <a class="globalNav-subNav-link" href="/overseas-property/in-Spain.html"
                                                                                   data-analytics-label="overseas-spain">Spain</a>
                                                                        </li>
                                                                </ul>
                                                                <ul class="reverseBorder globalNav-subNav-col">
                                                                        <li class="globalNav-subNav-item">
                                                                                <a class="globalNav-subNav-link" href="/overseas-property/in-France.html"
                                                                                   data-analytics-label="overseas-france">France</a>
                                                                        </li>
                                                                        <li class="globalNav-subNav-item">
                                                                                <a class="globalNav-subNav-link"
                                                                                   href="/overseas-property/help-and-advice/research.html"
                                                                                   data-analytics-label="overseas-help-and-advice">Help and advice</a>
                                                                        </li>
                                                                        <li class="globalNav-subNav-item">
                                                                                <a class="globalNav-subNav-link" href="/overseas-property/advertise.html"
                                                                                   data-analytics-label="overseas-sell-overseas-property">Sell overseas
                                                                                        property</a>
                                                                        </li>
                                                                </ul>
                                                        </div>
                                                </li>

                                <li class="globalNav-item globalNav-item-signin">
                                        <a id="sign-in" class="globalNav-link globalNav-link--loggedOut"
                                           href="/login.html?from=%2Fproperty-for-sale%2Fproperty-67910289.html&amp;hideFromParameterOnRegisterURI=true"
                                           rel="nofollow">
                                                <span class="globalNav-signin">Sign In</span>
                                                <img src="/ps/images/header/signedout.png" class="icon-signedOut" alt="signed out icon">
                                                <img src="/ps/images/header/signedin.png" class="icon-signedIn" alt="signed in icon">
                                        </a>
                                        <a id="my-rightmove" class="globalNav-link globalNav-link--loggedIn"
                                           href="/myrightmove.html" rel="nofollow">
                                                <span class="globalNav-signin">My Rightmove</span>
                                                <img src="/ps/images/header/signedout.png" class="icon-signedOut" alt="signed out icon">
                                                <img src="/ps/images/header/signedin.png" class="icon-signedIn" alt="signed in icon">
                                        </a>
                                </li>

                        </ul>
                </nav>

                <div class="globalHeader-burger">

                </div>
                <div class="globalHeader-signin">
                        <img src="/ps/images/header/signedout.png" class="icon-signedOut" alt="signed out icon">
                        <img src="/ps/images/header/signedin.png" class="icon-signedIn" alt="signed in icon">
                </div>

        </div>
        <div class="globalNav-background"></div>
        <div class="globalHeader-background"></div>
</header>

<div class="site-wrapper" id="sitewrapper">
        <!--[if IE 6]>
<div class="clearfix dontPrint" id="ie6msg" style="background-color:#FF6666;height:24px;padding-top:0.5em;text-align:center;">
    Rightmove.co.uk no longer supports Internet Explorer 6. &nbsp; Please update to the latest <a href="http://www.microsoft.com/windows/internet-explorer/" target="_blank"><b>Internet Explorer</b></a>, <a href="http://www.mozilla.com/firefox/" target="_blank"><b>Firefox</b></a> or <a href="http://www.google.co.uk/chrome/" target="_blank"><b>Chrome</b></a>.
</div>
<![endif]-->

<!--[if IE 7]>
<div class="clearfix dontPrint" id="ie7msg" style="background-color:#FF6666;height:24px;padding-top:0.5em;text-align:center;">
        Rightmove.co.uk no longer supports Internet Explorer 7. &nbsp; Please update to the latest <a href="http://www.microsoft.com/windows/internet-explorer/" target="_blank"><b>Internet Explorer</b></a>, <a href="http://www.mozilla.com/firefox/" target="_blank"><b>Firefox</b></a> or <a href="http://www.google.co.uk/chrome/" target="_blank"><b>Chrome</b></a>.
</div>
<script type="text/javascript">if(document.documentMode){document.getElementById('ie7msg').style.display='none';document.getElementById('ie7msg').style.visibility='hidden';}</script>
<![endif]--><div class="clearfix main" role="main">
                <!-- For more information see: https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingCustomVariables -->

<script type="text/javascript">
        _gaq.push(['_setCustomVar', 9, 'Video Type', 'No Video', 3]);
    </script>
<div class="page-header"></div>
        <div  class="row print-only two-col bdr-b">
    <div class="cell ">
        <div class="module ">
        <img class="left agent-details-agent-logo" src="https://media.rightmove.co.uk/136k/135593/branch_rmchoice_logo_135593_0000_t.jpeg" alt="andrew scott robertson, Wimbledon Hill - Sales ">
        <div class="overflow-hidden">
            <strong>andrew scott robertson, Wimbledon Hill - Sales </strong>
            <address>50 Wimbledon Hill Road,
London,

SW19 7PA</address>
            <p><strong><a href="tel:020 8012 0379" class="branch-telephone-number">
        <strong>020 8012 0379</strong>
</a></strong> local call rate</p>
        </div>
    </div></div><div class="cell align-right">
        <div class="module ">
        <img src="/ps/images20100/fullsite/logos/rm-site--logo.png" alt="Rightmove.co.uk">
        <p>www.rightmove.co.uk/property/67910289</p>
    </div></div></div><div id="primaryContent" class="primary-content property-details" itemscope itemtype="http://schema.org/Residence">
        <div  class="row one-col property-header">
    <div class="cell ">
        <div class="module ">
        <div class="property-header-bedroom-and-price ">
                        <div class="left">
                                <h1 class="fs-22" itemprop="name">2 bedroom flat for sale</h1>
                                <address class="pad-0 fs-16 grid-25" itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
                                        <meta itemprop="streetAddress" content="Denewood, Worple Road, Wimbledon" />
                                        <meta itemprop="addressCountry" content="GB" />
                                                Denewood, Worple Road, Wimbledon</address>
                        </div>
                        <p id="propertyHeaderPrice" class="property-header-price ">
                                <small class="property-header-qualifier">Guide Price</small>
                                <strong>
                                        &pound;535,000<br/>
                                        </strong>

                                </p>
                        </div>
        </div></div></div><div  class="row one-col">
    <div class="cell ">
        <div class="module ">
        <div class="gallery no-js-hidden">
    <div class="gallery-main">
        <a class="gallery-nav gallery-nav-prev js-gallery-prev" href="#" title="Previous image" aria-label="Previous image">
            <span class="visuallyhidden">Prev</span>
        </a>
        <a class="gallery-nav gallery-nav-next js-gallery-next" href="#" title="Next image" aria-label="Next image">
            <span class="visuallyhidden">Next</span>
        </a>
        <div class="gallery-main-img-wrap">
                        <span class="gallery-main-img" href="#">
                                <img class="js-gallery-main" src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_01_0000_max_656x437.jpg"
                                         alt="denewood_2.jpg" itemprop="image"/>
                                <div class="ribbon-wrapper">
    </div></span>
                </div>
        <div class="gallery-main-controls">
                        <p class="gallery-main-nav">
                                <a class="gallery-main-prev js-gallery-prev" href="#" title="Previous image" aria-label="Previous image">
                                        <span class="visuallyhidden">Prev</span>
                                </a>
                                <span class="gallery-main-status"><span class="js-gallery-index">1</span> of 12</span>
                                <a class="gallery-main-next js-gallery-next" href="#" title="Next image" aria-label="Next image">
                                        <span class="visuallyhidden">Next</span>
                                </a>
                        </p>

                        <p class="gallery-main-slideshow left">
                                        <a class="icon-before icon-slideshow js-gallery-slideshow mar-lr" href="#">Start slideshow</a>
                                </p>
                        <div class="gallery-main-actions">
                                <p class="gallery-main-caption right pad-lr js-gallery-caption">denewood_2.jpg</p>
                                <p class="gallery-main-enlarge right">
                                                <a id="link-enlarge" class="icon-before icon-enlarge-white js-gallery-enlarge js-fullscreen-fixed" href="https://www.rightmove.co.uk/property-for-sale/fullscreen/image-gallery.html?propertyId=67910289&photoIndex=0">Enlarge</a></p>
                                </div>
        </div>
    </div>
    <div class="gallery-thumbs">
        <a class="gallery-nav gallery-nav-prev js-thumbnail-prev" href="#" tabindex="-1">
            <span>Prev</span>
        </a>
        <div class="gallery-thumbs-carousel">
            <ul class="gallery-thumbs-list js-thumbnail-main" style="width: 1584px;">
                <li class="js-gallery-thumbnail selected" itemprop="photo" itemscope itemtype="http://schema.org/ImageObject">
                        <meta itemprop="contentUrl" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_01_0000_max_656x437.jpg" />
                        <a id="thumbnail-0" rel="nofollow" href="#"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_01_0000_max_135x100.jpg" alt="denewood_2.jpg"/></a></li>
                <li class="js-gallery-thumbnail " itemprop="photo" itemscope itemtype="http://schema.org/ImageObject">
                        <meta itemprop="contentUrl" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_02_0000_max_656x437.jpg" />
                        <a id="thumbnail-1" rel="nofollow" href="#"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_02_0000_max_135x100.jpg" alt="denewood_12.jpg"/></a></li>
                <li class="js-gallery-thumbnail " itemprop="photo" itemscope itemtype="http://schema.org/ImageObject">
                        <meta itemprop="contentUrl" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_03_0000_max_656x437.jpg" />
                        <a id="thumbnail-2" rel="nofollow" href="#"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_03_0000_max_135x100.jpg" alt="denewood_7.jpg"/></a></li>
                <li class="js-gallery-thumbnail " itemprop="photo" itemscope itemtype="http://schema.org/ImageObject">
                        <meta itemprop="contentUrl" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_04_0000_max_656x437.jpg" />
                        <a id="thumbnail-3" rel="nofollow" href="#"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_04_0000_max_135x100.jpg" alt="denewood_11.jpg"/></a></li>
                <li class="js-gallery-thumbnail " itemprop="photo" itemscope itemtype="http://schema.org/ImageObject">
                        <meta itemprop="contentUrl" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_05_0000_max_656x437.jpg" />
                        <a id="thumbnail-4" rel="nofollow" href="#"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_05_0000_max_135x100.jpg" alt="denewood_10.jpg"/></a></li>
                <li class="js-gallery-thumbnail " itemprop="photo" itemscope itemtype="http://schema.org/ImageObject">
                        <meta itemprop="contentUrl" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_06_0000_max_656x437.jpg" />
                        <a id="thumbnail-5" rel="nofollow" href="#"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_06_0000_max_135x100.jpg" alt="denewood_8.jpg"/></a></li>
                <li class="js-gallery-thumbnail " itemprop="photo" itemscope itemtype="http://schema.org/ImageObject">
                        <meta itemprop="contentUrl" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_07_0000_max_656x437.jpg" />
                        <a id="thumbnail-6" rel="nofollow" href="#"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_07_0000_max_135x100.jpg" alt="denewood_9.jpg"/></a></li>
                <li class="js-gallery-thumbnail " itemprop="photo" itemscope itemtype="http://schema.org/ImageObject">
                        <meta itemprop="contentUrl" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_08_0000_max_656x437.jpg" />
                        <a id="thumbnail-7" rel="nofollow" href="#"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_08_0000_max_135x100.jpg" alt="denewood_6.jpg"/></a></li>
                <li class="js-gallery-thumbnail " itemprop="photo" itemscope itemtype="http://schema.org/ImageObject">
                        <meta itemprop="contentUrl" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_09_0000_max_656x437.jpg" />
                        <a id="thumbnail-8" rel="nofollow" href="#"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_09_0000_max_135x100.jpg" alt="denewood_13.jpg"/></a></li>
                <li class="js-gallery-thumbnail " itemprop="photo" itemscope itemtype="http://schema.org/ImageObject">
                        <meta itemprop="contentUrl" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_10_0000_max_656x437.jpg" />
                        <a id="thumbnail-9" rel="nofollow" href="#"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_10_0000_max_135x100.jpg" alt="denewood_4.jpg"/></a></li>
                <li class="js-gallery-thumbnail " itemprop="photo" itemscope itemtype="http://schema.org/ImageObject">
                        <meta itemprop="contentUrl" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_11_0000_max_656x437.jpg" />
                        <a id="thumbnail-10" rel="nofollow" href="#"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_11_0000_max_135x100.jpg" alt="denewood_3.jpg"/></a></li>
                <li class="js-gallery-thumbnail " itemprop="photo" itemscope itemtype="http://schema.org/ImageObject">
                        <meta itemprop="contentUrl" content="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_12_0000_max_656x437.jpg" />
                        <a id="thumbnail-11" rel="nofollow" href="#"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_12_0000_max_135x100.jpg" alt="denewood_1.jpg"/></a></li>
                </ul>
        </div>
        <a class="gallery-nav gallery-nav-next js-thumbnail-next" href="#" tabindex="-1">
            <span>Next</span>
        </a>
    </div>
</div>

<noscript>
    <div class="gallery gallery-grid">
    <ul>
        <li>
                <a target="_blank" rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/fullscreen/image-gallery.html?propertyId=67910289&photoIndex=0"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_01_0000_max_656x437.jpg" alt="denewood_2.jpg"></a></li>
        <li>
                <a target="_blank" rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/fullscreen/image-gallery.html?propertyId=67910289&photoIndex=1"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_02_0000_max_656x437.jpg" alt="denewood_12.jpg"></a></li>
        <li>
                <a target="_blank" rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/fullscreen/image-gallery.html?propertyId=67910289&photoIndex=2"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_03_0000_max_656x437.jpg" alt="denewood_7.jpg"></a></li>
        <li>
                <a target="_blank" rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/fullscreen/image-gallery.html?propertyId=67910289&photoIndex=3"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_04_0000_max_656x437.jpg" alt="denewood_11.jpg"></a></li>
        <li>
                <a target="_blank" rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/fullscreen/image-gallery.html?propertyId=67910289&photoIndex=4"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_05_0000_max_656x437.jpg" alt="denewood_10.jpg"></a></li>
        <li>
                <a target="_blank" rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/fullscreen/image-gallery.html?propertyId=67910289&photoIndex=5"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_06_0000_max_656x437.jpg" alt="denewood_8.jpg"></a></li>
        <li>
                <a target="_blank" rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/fullscreen/image-gallery.html?propertyId=67910289&photoIndex=6"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_07_0000_max_656x437.jpg" alt="denewood_9.jpg"></a></li>
        <li>
                <a target="_blank" rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/fullscreen/image-gallery.html?propertyId=67910289&photoIndex=7"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_08_0000_max_656x437.jpg" alt="denewood_6.jpg"></a></li>
        <li>
                <a target="_blank" rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/fullscreen/image-gallery.html?propertyId=67910289&photoIndex=8"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_09_0000_max_656x437.jpg" alt="denewood_13.jpg"></a></li>
        <li>
                <a target="_blank" rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/fullscreen/image-gallery.html?propertyId=67910289&photoIndex=9"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_10_0000_max_656x437.jpg" alt="denewood_4.jpg"></a></li>
        <li>
                <a target="_blank" rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/fullscreen/image-gallery.html?propertyId=67910289&photoIndex=10"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_11_0000_max_656x437.jpg" alt="denewood_3.jpg"></a></li>
        <li>
                <a target="_blank" rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/fullscreen/image-gallery.html?propertyId=67910289&photoIndex=11"><img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_12_0000_max_656x437.jpg" alt="denewood_1.jpg"></a></li>
        </ul>
</div></noscript><div id="requestdetails" class="request-property-details cta-request-details clearfix hl-1 pad-16 align-center print-hidden">
    <a id="property-detail-button-middle" class="right btn btn-primary" title="Request Details" rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/contactBranch.html?propertyId=67910289&backToPropertyURL=/property-for-sale/property-67910289.html&fromButtonId=property-detail-button-middle">Request Details</a><h3 class="left">Do you like this property?</h3>
        <p class="right" >
    
            Call:
        <a href="tel:020 8012 0379" class="fs-19" title="Call 020 8012 0379" aria-label="Call 020 8012 0379">
        <strong>020 8012 0379</strong>
    </a>
</p></div>
</div></div></div><div  class="row one-col">
    <div class="cell ">
        <div class="module ">
        <div id="detailsTabs" class="tabbed-content ">
    <ul class="clearfix tabbed-content-nav print-hidden ">
    <li class="tabbed-content-nav-item active" id="descriptionTab">
    <a href="#description">
                                        Description
                                </a>
</li><script>
                                
                (function(w,s,t,n,d,p) {
                        RIGHTMOVE.ANALYTICS.DataLayer.trackEvent(s,t,n,d,p);
                }(window,'#descriptionTab a','click','propertyDetails',{gaEventData:{"action":"opened property details tab", "label":"Description", "module":"property details tabs"}}, false));
        </script>
                <li class="tabbed-content-nav-item " id="floorplansTab">
    <a href="#floorplan">Floorplan</a>
</li><script>
                                
                (function(w,s,t,n,d,p) {
                        RIGHTMOVE.ANALYTICS.DataLayer.trackEvent(s,t,n,d,p);
                }(window,'#floorplansTab a','click','propertyDetails',{gaEventData:{"action":"opened property details tab", "label":"Floorplan", "module":"property details tabs"}}, false));
        </script>
                <li class="tabbed-content-nav-item " id="locationTab">
    <a href="#location">Map & Street View</a>
</li><script>
                                
                (function(w,s,t,n,d,p) {
                        RIGHTMOVE.ANALYTICS.DataLayer.trackEvent(s,t,n,d,p);
                }(window,'#locationTab a','click','propertyDetails',{gaEventData:{"action":"opened property details tab", "label":"Map & Street View", "module":"property details tabs"}}, false));
        </script>
                <li class="tabbed-content-nav-item " id="schoolsTab">
    <a href="#schools">SchoolChecker</a>
</li><script>
                                
                (function(w,s,t,n,d,p) {
                        RIGHTMOVE.ANALYTICS.DataLayer.trackEvent(s,t,n,d,p);
                }(window,'#schoolsTab a','click','propertyDetails',{gaEventData:{"action":"opened property details tab", "label":"SchoolChecker", "module":"property details tabs"}}, false));
        </script>
                <li class="tabbed-content-nav-item " id="historyMarketTab">
    <a href="#historyMarket">Market Info</a>
</li><script>
                                
                (function(w,s,t,n,d,p) {
                        RIGHTMOVE.ANALYTICS.DataLayer.trackEvent(s,t,n,d,p);
                }(window,'#historyMarketTab a','click','propertyDetails',{gaEventData:{"action":"opened property details tab", "label":"Market Info", "module":"property details tabs"}}, false));
        </script>
                </ul><div class="clearfix tabs">
                                <div id="description" class="tabbed-content-tab clearfix active">
        <h2 class="tabbed-content-tab-heading">Property Description</h2>
        <div class="tabbed-content-tab-content description">
    <div class="left overflow-hidden agent-content">
    <div class="sect key-features">
    <h3>Key features</h3>
        <ul class="list-two-col list-style-square">
            <li>Superb second floor apartment</li>
            <li>Two bedrooms with wardrobes</li>
            <li>Good size living/dining room</li>
            <li>Fitted kitchen</li>
            <li>Shower room/WC</li>
            <li>Well presented</li>
            <li>Generous room sizes</li>
            <li>Private garage</li>
            <li>Popular development</li>
            <li>Close to Wimbledon Town and station</li>
            </ul>
    </div><div class="sect ">
    <h3>Full description</h3>
        <p itemprop="description">
        A superb two bedroom apartment with generous and flexible accommodation, within easy reach of Wimbledon Town centre and station. Situated on the second floor of a popular development on the south side of Worple Road, this well presented  apartment features generous room sizes and ample storage which makes this a particularly practical property in so many ways. A wonderful 25ft reception includes a lounge area and dining room, with a separate fitted kitchen, shower room/WC, entrance hall and storage cupboards, with built-in wardrobes to both bedrooms. Outside is a small southerly facing communal lawned garden area to the rear and a private garage in a block.<br /><br /><b>Reception Room</b> - 4.55m x 4.24m (14&#39;11 x 13&#39;11) - <br /><br /><b>Dining Room</b> - 3.66m x 2.97m (12&#39; x 9&#39;9) - <br /><br /><b>Kitchen</b> - 3.25m x 2.46m (10&#39;8 x 8&#39;1) - <br /><br /><b>Bedroom</b> - 4.11m x 2.34m (13&#39;6 x 7&#39;8) - <br /><br /><b>Bedroom</b> - 4.17m x 2.95m (13&#39;8 x 9&#39;8) - <br /><br /></p>
    <div class="sect ">
    <br/>
        </div></div><div class="sect more-info">
    <h3>More information from this agent</h3>
        <p class="print-only">To view this media, please visit the on-line version of this page at www.rightmove.co.uk/property-for-sale/property-67910289.html?premiumA=true</p><ul class="list-style-square print-hidden">
            <li>
                    <a id="brochure-0" class="icon-after icon-new-window" target="_blank" onclick=";return !RIGHTMOVE.UTIL.openAttributeWindowWithName(this.href, '', 'width=680,height=620,left=100,top=60,directories=no,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,titlebar=no,status=yes')" rel="nofollow" href="https://www.rightmove.co.uk/propertyMedia/redirect.html?propertyId=67910289&contentId=1798974489&index=0">Brochure</a></li>
                                <li>
                    <a id="brochure-1" class="icon-after icon-new-window" target="_blank" onclick=";return !RIGHTMOVE.UTIL.openAttributeWindowWithName(this.href, '', 'width=680,height=620,left=100,top=60,directories=no,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,titlebar=no,status=yes')" rel="nofollow" href="https://www.rightmove.co.uk/propertyMedia/redirect.html?propertyId=67910289&contentId=1798974486&index=1">Denewood, Worple Road, Wimbledon</a></li>
                                </ul>
    </div><div class="sect more-info">
    <h3>Energy Performance Certificate (EPC) graphs</h3>
        <ul class="list-style-square">
            <li>
                    <a class="js-ga-hipepc" target="_blank" onclick=";return !RIGHTMOVE.UTIL.openAttributeWindowWithName(this.href, '', 'width=600,height=450,left=100,top=95,directories=no,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,titlebar=no,status=yes')" rel="nofollow" href="https://www.rightmove.co.uk/propertyMedia/redirect.html?propertyId=67910289&contentId=1781970654&index=0"><span class="print-hidden">View EE Rating for this property</span>
                        <span class="print-only">See full size version online</span>
                        <img src="https://media.rightmove.co.uk/dir/hips/epcgraphs/136k/135593/67910289/135593_29425410_EPCGRAPH_01_0000_max_135x100.png" alt="View EE Rating for this property"/></a></li>
            <li>
                    <a class="js-ga-hipepc" target="_blank" onclick=";return !RIGHTMOVE.UTIL.openAttributeWindowWithName(this.href, '', 'width=600,height=450,left=100,top=95,directories=no,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,titlebar=no,status=yes')" rel="nofollow" href="https://www.rightmove.co.uk/propertyMedia/redirect.html?propertyId=67910289&contentId=1781970663&index=1"><span class="print-hidden">View EI Rating for this property</span>
                        <span class="print-only">See full size version online</span>
                        <img src="https://media.rightmove.co.uk/dir/hips/epcgraphs/136k/135593/67910289/135593_29425410_EPCGRAPH_02_0000_max_135x100.png" alt="View EI Rating for this property"/></a></li>
            </ul>
    </div></div>
<div class="right desc-widgets">
        <div class="listing-history bdr-2 box-1 pad-8">
        <h4>Listing History</h4>

        <div class="fs-12">
            <div class="pad-b-8">
                    <div id="firstListedDate"><strong>Added on Rightmove:</strong></div>
                    <div id="firstListedDateValue">27 January 2020</div>
                </div>
            </div>
    </div>
<div class="bdr-2 box-1">
        <div class="pos-rel">
    <a class="block js-tab-trigger js-ga-minimap" href="#location">
                <img src="//media.rightmove.co.uk/map/_generate?latitude=51.418083&longitude=-0.214006&zoomLevel=14&width=190&height=222&signature=Mt0EsowJ0l3yZfefJjsyBPE-2zg=" width="190px" height="222px" alt="Get map and local information"/>
            </a>
        <img src="/ps/images20100/maps/icons/rmpin.png"
         alt="Location on map"
         class="icon-house-pin-centered">
</div></div>
    <p class="bdr-2 box-1 pad-8 print-hidden">
        <a class="icon-before icon-enlarge-blue js-tab-trigger js-ga-minimap-text" href="#location">Enlarge this map</a>
    </p>
<div class="clearfix nearest-stations">
        <div class="bdr-2 box-1 pad-8">
            <h4>Nearest stations</h4>
            <ul class="stations-list">
                <li>
                        <i class="icon icon-tram-station"></i>
                        <span>Dundonald Road</span>
                        <small>(0.3 mi)</small>
                    </li>
                <li>
                        <i class="icon icon-national-train-station"></i>
                        <i class="icon icon-london-underground"></i>
                        <i class="icon icon-tram-station"></i>
                        <span>Wimbledon</span>
                        <small>(0.4 mi)</small>
                    </li>
                <li>
                        <i class="icon icon-national-train-station"></i>
                        <span>Wimbledon Chase</span>
                        <small>(0.6 mi)</small>
                    </li>
                </ul>
                        <small class="disclaimer">Distances are straight line measurements from centre of postcode</small>
        </div>
        <p class="bdr-2 box-1 pad-8 no-js-hidden print-hidden">
                <a class="icon-before icon-tubemap js-fullscreen-percentage" href="https://www.rightmove.co.uk/tube-map.html">View Tube and Rail map</a></p>
        </div>
<div class="clearfix school-checker">
    <div class="bdr-2 box-1 pad-8">
        <h4>Nearest schools</h4>
        <a class="js-description-school-checker icon-after icon-arrow-right" href="#schools">Use the school checker</a>
    </div>
</div>

<div class="bdr-2 box-1 pad-8 print-hidden">
     <h5>Broadband</h5>
        <span class="broadband-cmt">
                <span class="check-broadband-speed" tabindex="0" role="button">Show average broadband speed at this postcode</span>
                <span class="top-broadband-speed">
                        <span class="title"><b>Average broadband speed within this postcode</b></span>
                        <span class="loader-wrapper">
                                <span class="loader"></span>
                                <span class="loader-text">Finding the fastest speed...</span>
                        </span>
                        <span class="results-wrapper">
                                <span class="top-provider">
                                        <b></b>
                                        <span></span>
                                </span>
                                <span class="compare-providers">
                                        <a class="see-all-offers" target="_blank" href="#">Compare broadband deals</a><img src="/ps/images20100/propertydetails/compare-providers.png"
                                                 srcset="/ps/images20100/propertydetails/compare-providers@2x.png 2x,
                                         /ps/images20100/propertydetails/compare-providers@3x 3x">
                                </span>
                        </span>
                        <img src="/ps/images20100/propertydetails/powered-by-ctm.png"
                                 srcset="/ps/images20100/propertydetails/powered-by-ctm@2x.png 2x,
                                 /ps/images20100/propertydetails/powered-by-ctm@3x 3x">
                </span>
        </span>
</div>

<div class="bdr-2 box-1 pad-8 print-hidden">
                <h5>Mortgages</h5>
                <a class="mortgage-link" href="https://www.nationwide.co.uk/products/mortgages/our-mortgages/mortgage-calculators/mortgage-quick-quote?cmpid=Display_25_5_1" target="_blank">
                        Check mortgage affordability
                </a>
                <span class="mortgage-link-meta">Powered by Nationwide</span>
                <span class="mortgage-link-tooltip">
                        <span class="mortgage-link-tooltip-icon" tabindex="0" aria-label="Powered by Nationwide" aria-describedby="mortgage-link-tooltip-message" role="button">?</span>
                        <span id="mortgage-link-tooltip-message" class="mortgage-link-tooltip-message" role="tooltip">It's up to you if you choose Nationwide or a different lender to suit your mortgage needs and circumstances.</span>
                </span>
        </div>

        <script>
                                
                (function(w,s,t,n,d,p) {
                        RIGHTMOVE.ANALYTICS.DataLayer.trackEvent(s,t,n,d,p);
                }(window,'.mortgage-link','click','navigation',{gaEventData:{"action":"navigated to", "label":"check mortgage affordability", "menu":"mortgages", "module":"right description widget", "destinationUrl": "https://www.nationwide.co.uk/products/mortgages/our-mortgages/mortgage-calculators/mortgage-quick-quote?cmpid=Display_25_5_1"}}, false));
        </script>
                </div>
<div class="sect clearfix clear-both hl-2 pad-16">
    <div class="agent-details">
                <p><strong>To view this property or request more details, contact:</strong></p>
                <p class="left agent-details-agent-logo">
                        <a href="https://www.rightmove.co.uk/estate-agents/agent/andrew-scott-robertson/Wimbledon-Hill---Sales-135593.html"><img src="https://media.rightmove.co.uk/136k/135593/branch_rmchoice_logo_135593_0000_t.jpeg" alt="andrew scott robertson, Wimbledon Hill - Sales  logo"/></a></p>
        <div class="agent-details-display">

            <p class="pad-0">
                <a title="Contact andrew scott robertson, Wimbledon Hill - Sales " rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/contactBranch.html?propertyId=67910289&backToPropertyURL=%2Fproperty-for-sale%2Fproperty-67910289.html&fromButtonId=contactagent-footer"><strong>andrew scott robertson, Wimbledon Hill - Sales </strong></a></p>
            <address class="pad-0">50 Wimbledon Hill Road,
London,
SW19 7PA</address>
            <p>
                                        <a href="tel:020 8012 0379" class="branch-telephone-number">
        <strong>020 8012 0379</strong>
</a><a id="link-local-rate" href="#local-rate-message">
                                                <small>Local call rate</small>
                    </a>
                </p>
                <div class="hide">
                    <div id="local-rate-message">
    <h4>How much will it cost me to call the number displayed on the site?</h4>
    <p>Standard geographic charges from landlines and mobiles apply and calls may be included in your telecom provider's call package.</p>
</div></div>

            </div>
    </div>
</div></div></div><div id="floorplan" class="tabbed-content-tab clearfix ">
        <h2 class="tabbed-content-tab-heading">Floorplans</h2>
        <div class="tabbed-content-tab-content ">
    <div id="floorplanTabs" class="sect floorplancontent">
                        <a id="fullscreen-floorplan" class="right icon-before icon-enlarge-blue no-js-hidden print-hidden" href="https://www.rightmove.co.uk/property-for-sale/fullscreen/view-floorplan.html?propertyId=67910289&index=0">View in fullscreen</a><div id="floorplan0" class="align-left">Floorplan Port.jpg</div>
                        <div class="zoomarea" id="interactivefloorplan-1781970678" style="max-width: 592px; max-height: 600px; min-width: 592px; min-height: 600px; margin: 0 auto;">
                        <div id="floorplancontrols" class="no-js-hidden print-hidden">
    <div id="navigationwheel">
        <a href="#" id="arrowup" title="Pan up" class="arrows">Pan up</a>
        <a href="#" id="arrowright" title="Pan right" class="arrows">Pan right</a>
        <a href="#" id="arrowdown" title="Pan down" class="arrows">Pan down</a>
        <a href="#" id="arrowleft" title="Pan left" class="arrows">Pan left</a>
    </div>
    <div id="zoom">
        <a href="#" id="plus"  title="zoom in"  class="zoombuttons"><span>+</span></a>
        <div id="handlecontainer" title="Drag handle to zoom " class="twozooms">
            <div id="handle" class="zoom1"><span>-</span></div>
            <div id="strip">
                <span class="points" id="one"></span>
                <span class="points" id="two"></span>
                </div>
       </div>
       <a id="minus"  title="zoom out"  class="zoombuttons" href="#"><span>&ndash;</span></a>
    </div>
    <a id="reset" title="reset floorplan" href="#">reset</a>
</div><div class="zoomableimagewrapper" style="width:592px;
                                                                 height:800px;
                                                                 left:-0.0px;
                                                                 top:-100.0px;">
                                <img draggable="false" src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_FLP_01_0000_max_600x600.jpg" alt="Floorplan Port.jpg"
                       style="left:78.0px;
                              top:100.0px">
                        </div>
                </div>
                <noscript>
                        <img src="https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_FLP_01_0000_max_600x600.jpg" alt="Floorplan Port.jpg"/>
                </noscript>
                </div>
        <hr />

<div class="sect clearfix clear-both hl-2 pad-16">
    <div class="agent-details">
                <p><strong>To view this property or request more details, contact:</strong></p>
                <p class="left agent-details-agent-logo">
                        <a href="https://www.rightmove.co.uk/estate-agents/agent/andrew-scott-robertson/Wimbledon-Hill---Sales-135593.html"><img src="https://media.rightmove.co.uk/136k/135593/branch_rmchoice_logo_135593_0000_t.jpeg" alt="andrew scott robertson, Wimbledon Hill - Sales  logo"/></a></p>
        <div class="agent-details-display">

            <p class="pad-0">
                <a title="Contact andrew scott robertson, Wimbledon Hill - Sales " rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/contactBranch.html?propertyId=67910289&backToPropertyURL=%2Fproperty-for-sale%2Fproperty-67910289.html&fromButtonId=contactagent-footer"><strong>andrew scott robertson, Wimbledon Hill - Sales </strong></a></p>
            <address class="pad-0">50 Wimbledon Hill Road,
London,
SW19 7PA</address>
            <p>
                                        <a href="tel:020 8012 0379" class="branch-telephone-number">
        <strong>020 8012 0379</strong>
</a><a id="link-local-rate" href="#local-rate-message">
                                                <small>Local call rate</small>
                    </a>
                </p>
                <div class="hide">
                    <div id="local-rate-message">
    <h4>How much will it cost me to call the number displayed on the site?</h4>
    <p>Standard geographic charges from landlines and mobiles apply and calls may be included in your telecom provider's call package.</p>
</div></div>

            </div>
    </div>
</div></div></div><div id="location" class="tabbed-content-tab clearfix ">
        <h2 class="tabbed-content-tab-heading">Map & Street View</h2>
        <div class="tabbed-content-tab-content ">
    <div class="sect print-avoid-break-inside">
    <p class="locationTabControls clearfix">
                <span class="buttonGroup" data-bind="visible: showStreetViewOption() == true">
                        <button type="button" id="mapToggle" class="buttonGroup-button" data-bind="css: {'buttonGroup-button--active': showStreetView() == false}, click: toggleStreetView(false)">MAP VIEW</button>
                        <button type="button" id="streetViewToggle" class="buttonGroup-button" data-bind="css: {'buttonGroup-button--active': showStreetView() == true}, click: toggleStreetView(true)">STREET VIEW</button>
                </span>
        </p>

        <div class="locationTabMap">
                <div style="height: 480px;"
                         data-bind="component: {
                                name: 'map',
                                params: {
                                        mapLocation: mapLocation,
                                        streetViewPointOfView: streetViewPointOfView,
                                        streetViewPanorama: streetViewPanorama,
                                        streetViewUnavailable: streetViewUnavailable,
                                        markerIcon: '/ps/images/fullsite/icons/rmpin-noshadow.png',
                                        showStreetView: showStreetView,
                                        nearbyTubeLine: nearbyTubeLine,
                                        distanceFromPanoramaOrigin: distanceFromPanoramaOrigin,
                                        streetViewUnavailable: streetViewUnavailable,
                                        resetStreetView: resetStreetView,
                                        mapTypeId: mapTypeId
                                }
                         }">
                </div>

                <div class="locationTabMap-schoolCheckerBtn">
                                <a class="icon-after icon-arrow-right" data-bind="click: gotoSchoolsTab" href="#schools">School Checker</a>
                        </div>
                <div data-bind="visible: showStreetView() == true">
                        <div class="locationTabMap-error" data-bind="css: {'locationTabMap-error--active' : streetViewUnavailable()}">
                                <div class="locationTabMap-errorContent">
                                        <h3 class="locationTabMap-errorTitle">Street View is unavailable in this location</h3>
                                </div>
                        </div>
                </div>
        </div>
        <small data-bind="visible: showStreetView() == false">
                Note:
                <span data-bind="visible: mapLocation().exact == false">The pin shows the centre of the property's postcode, and does not pinpoint the exact address</span>
                <span data-bind="visible: mapLocation().exact == true">The pin shows the exact address of the property</span>
        </small>
        <small data-bind="visible: showStreetView() == true">
                <span data-bind="visible: streetViewUnavailable() == true">
                        Street View is unavailable in this location
                </span>
                <span data-bind="visible: distanceFromPanoramaOrigin() <= 30 && streetViewUnavailable() == false">
                        <span data-bind="visible: streetViewPanorama() == true">You're in the centre of the property's postcode.</span>
                        Start exploring the local area from here.
                </span>
                <span data-bind="visible: distanceFromPanoramaOrigin() > 30 && streetViewUnavailable() == false">
                        <a href="#" data-bind="click: resetStreetView">Take me back to the start</a>
                </span>
        </small>
</div><div class="sect ">
    <div class="clearfix nearest-stations">
        <div class="">
            <h4>Nearest stations</h4>
            <ul class="stations-list">
                <li>
                        <i class="icon icon-tram-station"></i>
                        <span>Dundonald Road</span>
                        <small>(0.3 mi)</small>
                    </li>
                <li>
                        <i class="icon icon-national-train-station"></i>
                        <i class="icon icon-london-underground"></i>
                        <i class="icon icon-tram-station"></i>
                        <span>Wimbledon</span>
                        <small>(0.4 mi)</small>
                    </li>
                <li>
                        <i class="icon icon-national-train-station"></i>
                        <span>Wimbledon Chase</span>
                        <small>(0.6 mi)</small>
                    </li>
                </ul>
                        <small class="disclaimer">Distances are straight line measurements from centre of postcode</small>
        </div>
        <p class=" no-js-hidden print-hidden">
                <a class="icon-before icon-tubemap js-fullscreen-percentage" href="https://www.rightmove.co.uk/tube-map.html">View Tube and Rail map</a></p>
        </div>
</div><div class="sect ">
    <div class="sect clearfix clear-both hl-2 pad-16">
    <div class="agent-details">
                <p><strong>To view this property or request more details, contact:</strong></p>
                <p class="left agent-details-agent-logo">
                        <a href="https://www.rightmove.co.uk/estate-agents/agent/andrew-scott-robertson/Wimbledon-Hill---Sales-135593.html"><img src="https://media.rightmove.co.uk/136k/135593/branch_rmchoice_logo_135593_0000_t.jpeg" alt="andrew scott robertson, Wimbledon Hill - Sales  logo"/></a></p>
        <div class="agent-details-display">

            <p class="pad-0">
                <a title="Contact andrew scott robertson, Wimbledon Hill - Sales " rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/contactBranch.html?propertyId=67910289&backToPropertyURL=%2Fproperty-for-sale%2Fproperty-67910289.html&fromButtonId=contactagent-footer"><strong>andrew scott robertson, Wimbledon Hill - Sales </strong></a></p>
            <address class="pad-0">50 Wimbledon Hill Road,
London,
SW19 7PA</address>
            <p>
                                        <a href="tel:020 8012 0379" class="branch-telephone-number">
        <strong>020 8012 0379</strong>
</a><a id="link-local-rate" href="#local-rate-message">
                                                <small>Local call rate</small>
                    </a>
                </p>
                <div class="hide">
                    <div id="local-rate-message">
    <h4>How much will it cost me to call the number displayed on the site?</h4>
    <p>Standard geographic charges from landlines and mobiles apply and calls may be included in your telecom provider's call package.</p>
</div></div>

            </div>
    </div>
</div></div></div></div><div id="schools" class="tabbed-content-tab clearfix print-hidden no-js-hidden">
        <h2 class="tabbed-content-tab-heading">Schools</h2>
        <div class="tabbed-content-tab-content ">
    <div id="schools">

        <div class="schoolsLevelToggle">
                        <a class="schoolsLevelToggle-button js-primary-age-group-btn" data-bind="click: updateEducationLevel('primary'), css: { 'schoolsLevelToggle-button--selected' : isEducationLevelSelected('primary') }">Primary</a><!--
                        --><a class="schoolsLevelToggle-button js-secondary-age-group-btn" data-bind="click: updateEducationLevel('secondary'), css: { 'schoolsLevelToggle-button--selected' : isEducationLevelSelected('secondary') }">Secondary</a>
                </div>
        <div id="schools-map" class="schoolMap">
                <div id="schools-map-canvas" class="school-list-map map-canvas height-100 width-100"></div>
                <div id="greyoutmap" class="schoolsMapCover schoolsMapCover--disabled" data-bind="css: { 'schoolsMapCover--disabled': shouldShowTable }">
                        <div id='mainmessage' class='schoolMapMessage'>
                                <h3 class='schoolMapMessage-title' data-bind="text: noDataMessage">
                                        There are no nearby secondary schools found.
                                </h3>
                        </div>
                </div>
                <div class="schoolPreloader">
                        <div class="schoolPreloader-spinner"></div>
                        <span class="schoolPreloader-label">Loading</span>
                </div>
                <div class="schoolMap-admission" data-bind="css: {'schoolMap-admission--active': selectedSchool().schoolMapAdmissionMessage}">
                        <span class="schoolMap-admissionLabel" data-bind="text: selectedSchool().schoolMapAdmissionMessage"></span>
                </div>
                <div class="schoolMap-recenterBtn" data-bind="click: recenterMapToProperty">
                        <i class="schoolMap-recenterBtnIcon icon-schools-map-house"></i>
                </div>
        </div>

        <div data-bind="visible: shouldShowTable, with: selectedSchool">

                <div class="schoolInformationPanel">
                        <p class="schoolInformationPanel-marker">
                                <i class="icon-schools-large-map-icon"></i>
                                <span data-bind="text: rowNum"></span>
                        </p>
                        <div class="schoolInformationPanel-header">
                                <span class="schoolInformationPanel-headerTitle" data-bind="text: name "></span>
                        </div>
                        <div class="schoolInformationPanel-meta clearfix">
                                <span class="schoolInformationPanel-metaDistance" data-bind="text: schoolDistance"></span>
                                <span class="schoolInformationPanel-metaType" data-bind="text: schoolType"></span>
                                <!-- ko if: $parent.selectedSchool().hasExternalLink -->
                                <span class="schoolInformationPanel-externalLink">
                                        <a data-bind="attr: { href: externalLink }" target="_blank">Visit their website</a>
                                </span>
                                <!-- /ko -->
                        </div>
                </div>
                <div class="schoolInformationDetails">
                        <div class="schoolInformationDetails-overview clearfix">
                                <div class="schoolInformationDetails-overviewGroup schoolInformationDetails-overviewGroup--active">
                                        <div class="schoolInformationDetails-overviewIcon schoolInformationDetails-overviewIcon--ofsted icon-schools-ofsted-grade">
                                                <span class="schoolInformationDetails-overviewIconLabel" data-bind="text: ratingValue"></span>
                                        </div>
                                        <div>
                                                <span class="schoolInformationDetails-overviewHeading" data-bind="text: ratingBody"></span>
                                                <span class="schoolInformationDetails-overviewHeading">REPORT:</span>
                                                <span class="schoolInformationDetails-overviewHeading" data-bind="text: ratingLabel"></span>
                                        </div>
                                        <!-- ko if: $parent.selectedSchool().hasInspectionReport -->
                                        <span class="schoolInformationDetails-inspectionReportLink">
                                                   <a data-bind="attr: { href: inspectionReportUrl }" target="_blank">See details</a>
                                        </span>
                                        <!-- /ko -->
                                </div>
                        </div>
                        <div class="schoolInformationDetails-spec clearfix">
                                <div class="schoolInformationDetails-specArrow"></div>
                                <div class="schoolInformationDetails-specGroup schoolInformationDetails-specGroup--left">
                                        <div class="schoolInformationDetails-specItem schoolInformationDetails-specItem--brdBtm">
                                                <span class="schoolInformationDetails-specItemTitle">AGE:</span>
                                                <span class="schoolInformationDetails-specItemValue" data-bind="text: ageRange"></span>
                                        </div>
                                        <div class="schoolInformationDetails-specItem">
                                                <span class="schoolInformationDetails-specItemTitle">PUPILS:</span>
                                                <span class="schoolInformationDetails-specItemValue" data-bind="text: pupilCount"></span>
                                        </div>
                                </div>
                                <div class="schoolInformationDetails-specGroup">
                                        <div class="schoolInformationDetails-specItem schoolInformationDetails-specItem--brdBtm">
                                                <span class="schoolInformationDetails-specItemTitle">GENDER:</span>
                                                <span class="schoolInformationDetails-specItemValue" data-bind="text: gender"></span>
                                        </div>
                                        <div class="schoolInformationDetails-specItem">
                                                <span class="schoolInformationDetails-specItemTitle">RELIGION:</span>
                                                <span class="schoolInformationDetails-specItemValue" data-bind="text: religion"></span>
                                        </div>
                                </div>
                        </div>
                </div>
        </div>

        <div class="schoolsTableHeading" data-bind="visible: shouldShowTable">
                <h3 class="schoolsTableHeading-title">Nearby Schools:</h3>
        </div>

        <table class="schoolsTable" data-bind="visible: shouldShowTable, css: {'schoolsTable--hideRating': isScotland}">
                <colgroup>
                        <col class="schoolsTable-colIndex"/>
                        <col class="schoolsTable-colName"/>
                        <col class="schoolsTable-colRating"/>
                        <col class="schoolsTable-colCatchment"/>
                </colgroup>
                <tbody data-bind="foreach: schoolsList">
                        <tr class="schoolsTable-row" data-bind="click: $parent.schoolsListItemClicked.bind($data, $index()), css: {'schoolsTable-row--selected' : $parent.selectedSchool().rowNum == $index() + 1, 'schoolsTable-row--odd' : ($index() % 2 == 0) }, visible:  $parent.isRowVisible($index())">
                    <td class="schoolsTable-cell schoolsTable-cellIndex">
                                        <span class="schoolsTable-index" data-bind="text: $index() + 1"></span>
                    </td>
                    <td class="schoolsTable-cell schoolsTable-cellName">
                                        <div class="schoolsTable-name" data-bind="text: name, attr: { title: urn }"></div>
                                        <span class="schoolsTable-distance" data-bind="text: schoolDistance"></span>
                                        <span class="schoolsTable-schoolType" data-bind="text: schoolType"></span>
                                </td>
                    <td class="schoolsTable-cell schoolsTable-cellRating">
                        <span class="schoolsTable-rating" data-bind="text: ratingBodyWithColon"></span>
                        <span class="schoolsTable-rating" data-bind="text: ratingLabel"></span>
                    </td>
                                <td class="schoolsTable-cell schoolsTable-cellSubType">
                                        <span class="schoolsTable-overview" data-bind="text: subType"></span>
                                </td>
                        </tr>
                </tbody>
        </table>

        <div class="schoolsTableLoadMore" data-bind="visible: isShowMoreVisible()">
                <a href="#" class="schoolsTableLoadMore-button" data-bind="click: showMoreSchools">Show more <i class="schoolsTableLoadMore-buttonArrow"></i></a>
        </div>

        <div class="disclaimer">
        <p>
        Due to the frequency with which Inspection bodies, such as Ofsted, provide us with updates, there could be a delay of up to 8 weeks between a rating being updated and it being displayed on Rightmove. This data is provided for informational purposes only and Rightmove plc does not accept any liability for decisions based on this data. The data is sourced from Experian and contains public sector information licensed under the Open Government Licence v3.0. Experian does not accept responsibility for any inference or conclusion derived from the data by third parties.
    </p>
</div>
<schools-alert params="{
                title: 'What does oversubscribed mean?',
                body: 'This means the school was not able to give a place to everyone who applied on time. In other words, at least one pupil was refused a place. This refusal will have been determined by prioritising applicants using the schools admission criteria.',
                isVisible: showOverSubscriptionAlert
        }"></schools-alert>

        <schools-alert params="{
                title: 'What does not oversubscribed mean?',
                body: 'This means that everyone who applied on time was given a place at the school.',
                isVisible: showUnderSubscriptionAlert
        }"></schools-alert>

        <schools-alert params="{
                title: 'What does the admission area mean?',
                body: 'These are the approximate areas that you would have needed to live in to have been successful in your application to the school in that year. (The areas shown do not include places given to children with special needs, or who have siblings already attending the school). These areas are calculated using data obtained from local authorities and individual schools. These areas can, and do, change significantly from year to year with shifts in local demographics and the popularity of a school. Therefore, living inside the Successful Applicant Area does not guarantee that you will get a place at the school in future years.',
                isVisible: showWithinSAA
        }"></schools-alert>

        <schools-alert params="{
                title: 'What does the admission area mean?',
                body: 'Councils in Scotland generally allocate school places according to whether you live within a specific geographical area. The area for this specific school is displayed on the map. In almost all cases, schools are able to offer places to all applicants from within that set area. Most addresses in Scotland will fall within the admission area of two schools: a denominational and a non-denominational school.',
                isVisible: showWithinSAAForScotland
        }"></schools-alert>
</div>
</div></div><div id="historyMarket" class="tabbed-content-tab clearfix print-hidden">
        <h2 class="tabbed-content-tab-heading">Market Info</h2>
        <div class="tabbed-content-tab-content ">
    <noscript>
    <p>You must have <strong>JavaScript enabled</strong> to view Market Info.</p>
</noscript>

<script type="text/x-handlebars-template" id="soldHistory">
        
    {{#if saleHistoryItems}}
    <h3> This property's sale history</h3>

    <table class="similar-nearby-sold-history-table">
        <thead class="bdr-b">
            <th>
                Year Sold
            </th>
            <th>
                Sold Price
            </th>
            {{#if hasMoreThanOneSaleHistoryItem}}
                <th class="align-center">
                    Price Difference
                </th>
            {{/if}}
        </thead>
        <tbody>
        {{#saleHistoryItems}}
            <tr class="bdr-b similar-nearby-sold-history-row-height">
                <td>
                    {{dateSold}}
                </td>
                <td>
                    {{price}}
                </td>
                {{#if ../hasMoreThanOneSaleHistoryItem}}
                                        {{#if isPriceIncrease}}
                                        <td class="similar-nearby-sold-history-price-difference align-center">
                                                {{priceDifference}}
                                        </td>
                                        {{else}}
                                        <td class="similar-nearby-sold-history-price-difference-negative similar-nearby-sold-history-price-difference align-center">
                                                {{priceDifference}}
                                        </td>
                                        {{/if}}
                {{/if}}
            </tr>
        {{/saleHistoryItems}}
        </tbody>
    </table>

    <div id="similar-nearby-sold-history-acknowledgment"> {{disclaimer}}</div>
    {{/if}}
</script><div id="similarNearbySection"></div>

<script type="text/x-handlebars-template" id="similarnearby">
        <div id="soldHistoryBody"></div>
        <h3>Similar nearby properties</h3>
        <div  class="row one-col">
    <div class="cell ">
        <div class="module ">
        <div id="similarNearbyTabs" class="tabbed-content ">
    <ul class="clearfix tabbed-content-nav print-hidden ">
    <li class="tabbed-content-nav-item active" id="">
    <a href="#forsale">
                                                For sale
                                        </a>
</li><li class="tabbed-content-nav-item " id="underofferTab">
    <a href="#underoffer">
                                                Under offer
                                        </a>
</li><li class="tabbed-content-nav-item " id="soldTab">
    <a href="#sold">
                                                Sold
                                        </a>
</li></ul><div class="clearfix tabs">
                                        <div id="forsale" class="tabbed-content-tab clearfix active">
        <h2 class="tabbed-content-tab-heading">{{nearbyForSaleTabTitle}}</h2>
        <div class="tabbed-content-tab-content forsale">
    <div id="nearbyForSaleTabBody">
                                                </div>
                                        </div></div><div id="underoffer" class="tabbed-content-tab clearfix print-hidden">
        <h2 class="tabbed-content-tab-heading">{{nearbyUnderOfferTabTitle}}</h2>
        <div class="tabbed-content-tab-content ">
    <div id="nearbyUnderOfferTabBody"></div>
                                        </div></div><div id="sold" class="tabbed-content-tab clearfix print-hidden">
        <h2 class="tabbed-content-tab-heading">{{nearbySoldTabTitle}}</h2>
        <div class="tabbed-content-tab-content ">
    <div id="nearbySoldTabBody"></div>
                                        </div></div></div>
                        </div></div></div></div></script><script type="text/x-handlebars-template" id="nearbyPropertiesTemplateId">
        
    {{#if views}}
        <div class="similarNearbyTitle">{{resultSummaryMessage}}</div>
        <ul>
            {{#views}}
            <li>
                <div class="similar-nearby-property">
        <div class="overflow-hidden  inline-block">
                

{{#if dateSold}}
        <div class="similar-nearby-summary-info">
    <div class="pad-b-8">Sold for:</div>
    <div class="price-similar-nearby">{{price}}
        <p class="date-sold pad-l-8">{{dateSold}}</p>
    </div>
    <div class="pad-b similar-nearby-address">{{address}}</div>
    <div class="pad-b similar-nearby-distance" id="distance-{{propertyId}}">{{distance}}</div>
</div>


{{^}}
        <div class="similar-nearby-summary-info">
    <div class="price-similar-nearby">{{price}}
        <small class="property-status">{{priceQualifier}}</small>
    </div>
    <div class="pad-b similar-nearby-address">{{address}}</div>
    <div class="pad-b similar-nearby-distance" id="distance-{{propertyId}}">{{distance}}</div>
    </div>


{{/if}}
</div>
        <div class="similar-nearby-carousel right inline-block">
                <div class="similar-nearby-image-wrapper">
        {{#if showCarousel}}
                <div class="cycle-slideshow temp-image-holder"
         data-cycle-slides="> div"
         data-cycle-allow-wrap="false"
         data-cycle-swipe="true"
         data-cycle-manual-fx="scrollHorz"
         data-cycle-timeout="0"
         data-cycle-prev="#prev-image-{{propertyId}}"
         data-cycle-next="#next-image-{{propertyId}}"
         data-cycle-caption="#image-caption-{{propertyId}}"
         data-cycle-caption-template="\\{{slideNum}} of \\{{slideCount}}">
        {{#each imagesURLs.imageURLs}}
        <div class="width-100"><img class="similar-nearby-property-image js-fit-this-image" src="{{this}}"/></div>
        {{/each}}
        {{#if ../../../showLink}}
        <div class="width-100 height-100">
                <div class="block-centered block-height">
                        <div class="centered">
                                <p class="link-text-padding-bottom"> To see more images for this property</p>
                                <a id="similar-nearby-property-link-{{propertyId}}" class="carousel-property-link"
                                   href="{{propertyUrl}}" rel="nofollow" target="_blank">View Full Property Listing</a>
                        </div>
                </div>
        </div>
        {{/if}}
</div>
        {{^}}
                <div class="temp-image-holder">
        <img class="similar-nearby-property-image js-fit-this-image" src="{{imagesURLs.imageURLs.[0]}}">
</div>

        {{/if}}
</div>{{#if showCarousel}}
        <div class="align-center mar-t-8 similar-nearby-property-navigation">
                <a href=# id="prev-image-{{propertyId}}" class="similar-nearby-property-left-arrow">
                        <span class="visuallyhidden">Previous</span>
                </a>
                <span id="image-caption-{{propertyId}}"></span>
                <a href=# id="next-image-{{propertyId}}" class="similar-nearby-property-right-arrow">
                        <span class="visuallyhidden">Next</span>
                </a>
        </div>
{{/if}}
</div>
</div>
</li>
            {{/views}}
        </ul>
    {{else}}
         {{#if resultSummaryMessage}}
             <strong class="similarNearbyTitle">{{resultSummaryMessage}}</strong>
         {{else}}
            <strong>There was an error loading your results. Please refresh the page to try again.</strong>
         {{/if}}
    {{/if}}
</script><script type="text/x-handlebars-template" id="soldPricesDisclaimerTemplate">
        <p class="disclaimer">
        Contains Ordnance Survey data &copy; Crown copyright and database right 2011
</p>
                {{#if showBothDisclaimers}}
                        <p class="disclaimer">
                                Source acknowledgement: House price data for England and Wales transactions, produced by Land Registry. House price data for Scotland transactions, produced by Registers of Scotland.
                                <br>Please note for scottish properties the dates shown relate to the property's registered date not sold date.
                        </p>
                        <p class="lastUpdateText disclaimer">
                                {{disclaimer}}
                        </p>
                        <p class="disclaimer">
        Contains HM Land Registry data &copy; Crown copyright and database right . This data is licensed under the Open Government Licence v3.0.
</p>
<p class="disclaimer">
        &copy; Crown copyright. Material is reproduced with the permission of the Keeper of the Registers of Scotland and contains data compiled by Registers of Scotland. For further information, please contact
        <a href="mailto:data@ros.gov.uk">data@ros.gov.uk</a>.
</p>
<p class="disclaimer">
                                If you have found an error with the data relating to a transaction in England or Wales, please contact Her Majesty's Land Registry (HMLR). If you have found an error with the data relating to a transaction in Scotland, please contact the Registers of Scotland.
                        </p>
                {{/if}}
                {{#if landRegistry}}
                        <p class="disclaimer">
        Source acknowledgement: House price data produced by Land Registry
</p><p class="lastUpdateText disclaimer">
                                {{disclaimer}}
                        </p>
                        <p class="disclaimer">
        Contains HM Land Registry data &copy; Crown copyright and database right . This data is licensed under the Open Government Licence v3.0.
</p>
<p class="disclaimer">
        <span>If you have found an error with the data please contact</span>
        <a href="https://help.landregistry.gov.uk/app/contactus_changesales" target="_blank">Her Majesty's Land Registry (HMLR)</a>
</p>
<p class="disclaimer">
        Permitted Use: Viewers of this Information are granted permission to access this Crown copyright material and to download it onto electronic, magnetic, optical or similar storage media provided that such activities are for private research, study or in-house use only. Any other use of the material requires the formal written permission of Land Registry which can be requested from us, and is subject to an additional licence and associated charge.
</p>

                {{/if}}
                {{#if registerOfScotland}}
                        <p class="disclaimer">
        &copy; Crown copyright. Material is reproduced with the permission of the Keeper of the Registers of Scotland and contains data compiled by Registers of Scotland. For further information, please contact
        <a href="mailto:data@ros.gov.uk">data@ros.gov.uk</a>.
</p>
<p class="lastUpdatedText disclaimer">
                                {{disclaimer}}
                        </p>
                        <p class="disclaimer">Please note the dates shown relate to the property's registered date not sold date.</p>
                        <p class="disclaimer">
        <strong>Disclaimer</strong> - Rightmove.co.uk provides this Registers of Scotland data "as is". The burden for fitness of the data relies completely with the user and is provided for informational purposes only. No warranty, express or implied, is given relating to the accuracy of content of the Registers of Scotland data and Rightmove plc does not accept any liability for error or omission.
</p>
<p class="disclaimer">
        <strong>How can I use the information?</strong> The Registers of Scotland allows the reproduction of the data which it provides to Rightmove.co.uk free of charge in any format or medium only for research, private study or for internal circulation within an organisation. This is subject to it being reproduced accurately and not used in a misleading context. The material must be acknowledged as Crown Copyright. You are not allowed to use this information for commercial purposes, nor must you copy, distribute, sell or publish the data in any way.
</p>
<p class="disclaimer">
        For any other use of this material, please apply to the Registers of Scotland for a licence. You can do this online at
        <a href="http://www.ros.gov.uk" target="_blank">www.ros.gov.uk,</a> by email at <a href="mailto:data@ros.gov.uk">data@ros.gov.uk</a>
        or by writing to Business Development, Registers of Scotland, Meadowbank House, 153 London Road, Edinburgh EH8 7AU.
</p>

                {{/if}}
</script></div></div></div>
                </div></div></div></div><div  class="row one-col">
    <div class="cell ">
        <div class="module ">
        <iframe id="houseMortgageCalculator" width="654" height="400" src="https://mortgages.rightmove.co.uk/mortgages/pages/calculator-repayment-new/index.html?branchId=135593&propertyId=67910289&price=535000&pdText=&priceQualifier=Guide%20Price%20~&shouldShowPrice=true&development=false&propertyType=flat_apartment" style="overflow:hidden;border:1px solid #DEDEDE;border-radius: 2px;" title="House mortgage calculator"></iframe>
<div id="disclaimer" class="sect disclaimer">
    <div id="soldPricesDisclaimer" class="fs-11 mar-b-8"></div>
    <div id="agentDisclaimer" class="fs-11 mar-b-8">
        <span>
            <p>
                        <span>
                            <strong>Disclaimer</strong>
    <span>-</span></span>
                        <span>
                            Property reference 29425410.
    The information displayed about this property comprises a property advertisement.
    Rightmove.co.uk makes no warranty as to the accuracy or completeness of the advertisement or any linked or
    associated information, and Rightmove has no control over the content.  This property advertisement does not constitute property particulars.
    The information is provided and maintained by
    <strong>andrew scott robertson, Wimbledon Hill - Sales </strong>.</span>
                        <span>
                            Please contact the selling agent or developer directly to obtain any information which may be available
                            under the terms of The Energy Performance of Buildings (Certificates and Inspections) (England and Wales)
                            Regulations 2007 or the Home Report if in relation to a residential property in Scotland.
                        </span>
                    </p>
                <p>
                <span>* Average speeds are based on the download speeds of at least 50% of customers at peak time (8pm to 10pm) from packages available on comparethemarket.com. Speed can be affected by a range of technical and environmental factors. The speed you receive where you live may be lower than that listed above. You can check the estimated speed to your property prior to purchasing. Fibre/cable services at your postcode are subject to availability. You can confirm availability on the provider's website. Providers may increase charges. You should have the right to exit your contract without penalty if this happens. The information is provided and maintained by <b>Decision Technologies Limited</b>.</span>
            </p>
        </span>
    </div>
    <div>
        </div>
    <div>
        <span>
            <div id="open-streetmap-disclaimer">
        <p class="fs-11">
                Map data �<a href="http://www.openstreetmap.org/copyright" rel="nofollow" target="_blank" title="Open Street Map">OpenStreetMap</a> contributors.
        </p>
</div></span>
    </div>
</div></div></div></div></div><div id="secondaryContent" class="secondary-content ">
        <div  class="row one-col print-hidden">
    <div class="cell ">
        <div class="module ">
        <ul class="back-prev-next clearfix list-reset hl-1 pad-lr">
        <li class="similar left">
        <a id="showSimilarPropertiesLink" class="icon-after icon-arrow-right" title="See more properties like this one" rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/find.html?locationIdentifier=POSTCODE%5E836665&minPrice=475000&maxPrice=600000&minBedrooms=2&radius=0.5">See more properties like this one</a></li>
</ul>

</div></div></div><div  class="row one-col print-hidden">
    <div class="cell ">
        <div class="module ">
        <div class="hl-1 pad-16">
                                <div id="secondaryAgentDetails" class="agent-details clearfix bdr-b">
        <h3>This property is marketed by:</h3>
<a class="agent-details-agent-logo" title="andrew scott robertson, Wimbledon Hill - Sales  contact details and property" href="https://www.rightmove.co.uk/estate-agents/agent/andrew-scott-robertson/Wimbledon-Hill---Sales-135593.html"><img src="https://media.rightmove.co.uk/136k/135593/branch_logo_135593_0000.jpeg" alt="andrew scott robertson, Wimbledon Hill - Sales  logo" class="secondary" /></a><div class="agent-details-display">
  <div class="overflow-hidden">
    <p class="pad-0">
      <a id="aboutBranchLink" href="https://www.rightmove.co.uk/estate-agents/agent/andrew-scott-robertson/Wimbledon-Hill---Sales-135593.html"><strong>andrew scott robertson, Wimbledon Hill - Sales </strong></a></p>
    <address class="pad-0">50 Wimbledon Hill Road,
London,
SW19 7PA</address>
  </div>
  <p class="pad-0 overflow-hidden">

    <a rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/find/andrew-scott-robertson/Wimbledon-Hill---Sales.html?locationIdentifier=BRANCH%5E135593&includeSSTC=true&_includeSSTC=on">View properties from this agent</a></p>
</div></div><div id="requestdetails" class="request-property-details align-center bdr-b">
    <a id="property-detail-button-rhs" class=" btn btn-primary" title="Request Details" rel="nofollow" href="https://www.rightmove.co.uk/property-for-sale/contactBranch.html?propertyId=67910289&backToPropertyURL=/property-for-sale/property-67910289.html&fromButtonId=property-detail-button-rhs">Request Details</a><p class="" >
    
            or call:
        <a href="tel:020 8012 0379" class="fs-19" title="Call 020 8012 0379" aria-label="Call 020 8012 0379">
        <strong>020 8012 0379</strong>
    </a>
</p></div>
<ul class="property-actions bold clearBoth">
                                                <li class="property-actions-save bdr-b">
        <a class="icon-before icon-star unsaved button secondary registersource-save-property " title="Save Denewood, Worple Road, Wimbledon to shortlist" href="https://www.rightmove.co.uk/addtoshortlist.html?property_id=67910289&from=%2Fproperty-for-sale%2Fproperty-67910289.html">Save property</a></li>

<li class="bdr-b">
        <a href="#" class="icon-before icon-notes js-property-note-add">Add notes</a>
        <div id="js-property-note-wrapper">
                <hr>
                <p>Please <a id="noteslogin" class="register-source-add-notes" rel="nofollow" href="/login.html?from=%2Fproperty-for-sale%2Fproperty-67910289.html%3Fsource%3DaddPropertyNote">sign in</a> or <a id="notesRegister" class="register-source-add-notes js-property-note-register" rel="nofollow" href="/register.html?from=%2Fproperty-for-sale%2Fproperty-67910289.html%3Fsource%3DaddPropertyNote">create an account</a> to add notes</p>
                </div>
</li>

<li class="bdr-b">
        <a id="print" class="js-print-link icon-before icon-print" title="Print page" target="_blank" onclick=";return !RIGHTMOVE.UTIL.openAttributeWindowWithName(this.href, '', 'width=710,height=450,left=100,top=95,directories=no,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,titlebar=no,status=yes')" rel="nofollow" href="https://www.rightmove.co.uk/property-details/print.html?propertyId=67910289&isCustomerPreview=">Print</a></li><li class="pad-b-8">
        <a id="sendToFriend" class="icon-before icon-send" title="Email property details to a friend" rel="nofollow" href="https://www.rightmove.co.uk/sendPropertyToFriend/sendPropertyToFriend.html?from=%2Fproperty-for-sale%2Fproperty-67910289.html&propertyIds=67910289">Send to Friend</a></li>

</ul>
                                </div>
                </div></div></div><div  class="row one-col print-hidden">
    <div class="cell ">
        <div class="module bdr-b">
        <div class="pad-l">
    <h3>Share this property</h3>
    <a id="facebook" class="fb-share" title="Share this with Facebook" target="_blank" onclick=";return !RIGHTMOVE.UTIL.openAttributeWindowWithName(this.href, '', 'width=600,height=450,left=100,top=95,directories=no,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,titlebar=no,status=yes')" href="http://facebook.com/share.php?u=https%3A%2F%2Fwww.rightmove.co.uk%2Fproperty-for-sale%2Fproperty-67910289.html%3Futm_source%3Dfacebook%26utm_medium%3Dsharing%26utm_campaign%3Dproperty-details%26utm_content%3Dbuying"><i class="icon icon-facebook-share">Share on Facebook</i></a><a id="twitter" class="twitter-share" title="Share this with Twitter" target="_blank" onclick=";return !RIGHTMOVE.UTIL.openAttributeWindowWithName(this.href, '', 'width=600,height=450,left=100,top=95,directories=no,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,titlebar=no,status=yes')" href="http://twitter.com/share?text=Check out this 2 bedroom flat for sale on Rightmove &url=https%3A%2F%2Fwww.rightmove.co.uk%2Fproperty-for-sale%2Fproperty-67910289.html%3Futm_source%3Dtwitter%26utm_medium%3Dsharing%26utm_campaign%3Dproperty-details%26utm_content%3Dbuying"><i class="icon icon-twitter-share">Share on Twitter</i></a><a id="pinterest" href="#"><i class="icon icon-pinterest-share">Share on Pinterest</i>
    </a>

</div>
<hr>


</div></div></div><div  class="row one-col print-hidden">
    <div class="cell ">
        <div class="module bdr-b">
        <div id="bannerrhs" class="mpu-slot">
                        <div class="mpu-medium-rectangle inline-block">
                                <div id="propertyDetailsMPU"></div>
                        </div>
                </div>
                <hr>
                </div></div></div><div  class="row one-col print-hidden">
    <div class="cell ">
        <div class="module bdr-b">
        <div class="pad-l hr-border">
                                <h3>Properties sold nearby</h3>
                                <ul class="prices-list">
                                        <li class="icon-before icon-house-pin-tiny">
                                                        <span class="block">11 Oct 2018</span>
                                                        <span class="prices-list-address"> Flat 4, Denewood, 62 Worple Road, SW19</span>
                                                        <strong class="right" id="soldNearBySectionPrice"> &pound;464,000</strong>
                                                </li>
                                        <li class="icon-before icon-house-pin-tiny">
                                                        <span class="block">04 Jul 2017</span>
                                                        <span class="prices-list-address"> Flat 8, Denewood, 62 Worple Road, SW19</span>
                                                        <strong class="right" id="soldNearBySectionPrice"> &pound;475,000</strong>
                                                </li>
                                        <li class="icon-before icon-house-pin-tiny">
                                                        <span class="block">17 Jul 2015</span>
                                                        <span class="prices-list-address"> Flat 3, Trafalgar House, Worple Road, SW19</span>
                                                        <strong class="right" id="soldNearBySectionPrice"> &pound;575,000</strong>
                                                </li>
                                        </ul>
                <a id="soldPriceGoTo" class="icon-after icon-arrow-right" rel="nofollow" href="https://www.rightmove.co.uk/house-prices/SW19-4HB.html?backListLink=%2Fproperty-for-sale%2Ffind.html%3FlocationIdentifier%3DPOSTCODE%255E836665%26minPrice%3D475000%26maxPrice%3D600000%26minBedrooms%3D2%26radius%3D0.5">View more</a></div>
                        <hr>
                </div></div></div><div  class="row row one-col print-hidden">
    <div class="cell ">
        <div class="module bdr-b">
        <div id="securityCentre" class="pad-l content touchsearch-searchcontrol touchsearch-searchcontrol-hascontent touchsearch-search-secondarycontent clearfix">
    <h3 class="touchsearch-searchcontrol-heading">Staying secure when looking for property</h3>
    <p class="touchsearch-searchcontrol-content">Ensure you're up to date with our latest advice on how to avoid fraud or scams when looking for property online.</p>
    <a id="security-advice-link" class="icon-after icon-arrow-right touchsearch-link touchsearch-searchcontrol-content" href="https://www.rightmove.co.uk/advice/safety-and-security/">Visit our security centre to find out more</a></div>
</div></div></div><div  class="row one-col print-hidden">
    <div class="cell ">
        <div class="module bdr-b">
        <div id="propertydetailsbreadcrumbs" class="pad-lr">
    <h3>Surrounding Areas</h3>
    <ul class="list-bdr-b">
        <li>
                <a class="icon-before icon-arrow-right" href="https://www.rightmove.co.uk/property/Wimbledon.html">Wimbledon</a></li>
        <li>
                <a class="icon-before icon-arrow-right" href="https://www.rightmove.co.uk/property/Merton.html">Merton</a></li>
        <li>
                <a class="icon-before icon-arrow-right" href="https://www.rightmove.co.uk/property/London.html">London</a></li>
        <li>
                <a class="icon-before icon-arrow-right" href="https://www.rightmove.co.uk/property/South-West-London.html">South West London</a></li>
        </ul>
</div>
</div></div></div><div  class="row one-col print-hidden">
    <div class="cell ">
        <div class="module bdr-b">
        <div class="pad-l " id="report-error">
    <h3>Spotted an error?</h3>
    <p>In order for us to help our agents maintain accurate and up-to-date information please inform the agent
            if you have noticed an error with this property. If you are the vendor, please contact your agent directly.</p>
    <a id="get-in-touch" class="icon-after icon-arrow-right" target="_blank" onclick=";return !RIGHTMOVE.UTIL.openAttributeWindowWithName(this.href, '', 'width=650,height=450,left=100,top=95,directories=no,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,titlebar=no,status=yes')" href="https://www.rightmove.co.uk/property-report/reportPropertyErrorForm.html?propertyId=67910289">Get in touch</a></div><hr>
                        </div></div></div></div><script type="text/javascript" src="https://www.google.com/jsapi"></script>

<script>
                                
                (function(k,v){
                        RIGHTMOVE.ANALYTICS.DataLayer.pushKV(k,v);
                }('property',{"location":{"postcode":"SW19 4HB","country":"GB","latitude":51.41801157906057,"longitude":-0.21413317704546467},"propertyId":67910289,"viewType":"Current","imageCount":12,"floorplanCount":1,"videoProvider":"No Video","propertyInfo":{"propertyType":"Flats / Apartments","propertySubType":"Flat","price":535000.0,"beds":2,"added":"20200127","soldSTC":false,"retirement":false,"preOwned":"Resale","ownership":"Non-shared ownership","auctionOnly":false,"letAgreed":false,"lettingType":null,"furnishedType":null,"minSizeFt":null,"maxSizeFt":null,"minSizeAc":null,"maxSizeAc":null,"businessForSale":false,"priceQualifier":"Guide Price","currency":"GBP","selectedPrice":null,"selectedCurrency":null}}));
        </script>
                <script>
                                
                (function(k,v){
                        RIGHTMOVE.ANALYTICS.DataLayer.pushKV(k,v);
                }('branch',{"branchId":135593,"companyName":"AR & QS Holdings Limited","brandName":"andrew scott robertson","branchName":"Wimbledon Hill - Sales ","companyType":"IEA","agentType":"ea_sales","displayAddress":"50 Wimbledon Hill Road, London, SW19 7PA","branchPostcode":null,"pageType":"Standard"}));
        </script>
                <script>
                                
                (function(k,v){
                        RIGHTMOVE.ANALYTICS.DataLayer.pushKV(k,v);
                }('page.customUri','www.rightmove.co.uk/property-for-sale/property/'));
        </script>
                </div>
        <div id="sitefooter" class="site-footer print-hidden" role="contentinfo">
                <div class="globalFooter" id="globalFooter" role="contentinfo" data-test="global-footer">
        <ul class="globalFooter-menu">
                <li class="globalFooter-menuGroup">
                        <input class="globalFooter-menuGroupHeader-checkbox" id="globalFooter-menuGroupHeader-rightmove" type="checkbox" checked />
                        <h4 class="globalFooter-menuGroupHeader">
                                <label for="globalFooter-menuGroupHeader-rightmove">Rightmove</label>
                                <div class="no-svg-chevron-line globalFooter-chevron">
                                        <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 10.293l5.146-5.147a.5.5 0 0 1 .708.708l-5.5 5.5a.5.5 0 0 1-.708 0l-5.5-5.5a.5.5 0 1 1 .708-.708L8 10.293z"/></svg>
                                </div>
                        </h4>
                        <ul class="globalFooter-subMenu">
                                <li class="globalFooter-subMenuItem"><a title="Search for sale" href="https://www.rightmove.co.uk/property-for-sale.html" class="globalFooter-subMenuLink">Search for sale</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Search for rent" href="https://www.rightmove.co.uk/property-to-rent.html" class="globalFooter-subMenuLink">Search for rent</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Search sold prices" href="https://www.rightmove.co.uk/house-prices.html" class="globalFooter-subMenuLink">Search sold prices</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Sign in / Create account" href="/register.html" class="globalFooter-subMenuLink">Sign in / Create account</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Blog" href="https://www.rightmove.co.uk/news" class="globalFooter-subMenuLink">Blog</a></li>
                        </ul>
                </li>
                <li class="globalFooter-menuGroup">
                        <input class="globalFooter-menuGroupHeader-checkbox" id="globalFooter-menuGroupHeader-resources" type="checkbox" />
                        <h4 class="globalFooter-menuGroupHeader">
                                <label for="globalFooter-menuGroupHeader-resources">Resources</label>
                                <div class="no-svg-chevron-line globalFooter-chevron">
                                        <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 10.293l5.146-5.147a.5.5 0 0 1 .708.708l-5.5 5.5a.5.5 0 0 1-.708 0l-5.5-5.5a.5.5 0 1 1 .708-.708L8 10.293z"/></svg>
                                </div>
                        </h4>
                        <ul class="globalFooter-subMenu">
                                <li class="globalFooter-subMenuItem"><a title="Where can I live?" target="_blank" href="https://where.rightmove.co.uk" class="globalFooter-subMenuLink">Where can I live?</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Schools" href="https://www.rightmove.co.uk/schools.html" class="globalFooter-subMenuLink">Schools</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Students" href="https://www.rightmove.co.uk/student-accommodation.html" class="globalFooter-subMenuLink">Students</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Removals" href="https://www.rightmove.co.uk/removals.html" class="globalFooter-subMenuLink">Removals</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Property guides" href="https://www.rightmove.co.uk/advice/" class="globalFooter-subMenuLink">Property guides</a></li>
                                <li class="globalFooter-subMenuItem"><a title="House price index" href="https://www.rightmove.co.uk/news/house-price-index/" class="globalFooter-subMenuLink">House price index</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Help to buy" href="https://www.rightmove.co.uk/advice/buyer/ways-to-buy/" class="globalFooter-subMenuLink">Help to buy</a></li>
                                <li class="globalFooter-subMenuItem globalFooter-subMenuItem--secondary"><a title="Buy to let investors" href="https://www.rightmove.co.uk/advice/landlord/investor-newsletter/" class="globalFooter-subMenuLink">Buy to let investors</a></li>
                        </ul>
                </li>
                <li class="globalFooter-menuGroup">
                        <input class="globalFooter-menuGroupHeader-checkbox" id="globalFooter-menuGroupHeader-quicklinks" type="checkbox" />
                        <h4 class="globalFooter-menuGroupHeader">
                                <label for="globalFooter-menuGroupHeader-quicklinks">Quick links</label>
                                <div class="no-svg-chevron-line globalFooter-chevron">
                                        <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 10.293l5.146-5.147a.5.5 0 0 1 .708.708l-5.5 5.5a.5.5 0 0 1-.708 0l-5.5-5.5a.5.5 0 1 1 .708-.708L8 10.293z"/></svg>
                                </div>
                        </h4>
                        <ul class="globalFooter-subMenu">
                                <li class="globalFooter-subMenuItem"><a title="Cheap flats to rent" href="https://www.rightmove.co.uk/cheap-flats-to-rent.html" class="globalFooter-subMenuLink">Cheap flats to rent</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Property investment" href="https://www.rightmove.co.uk/advice/landlord/investor-newsletter/" class="globalFooter-subMenuLink">Property investment</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Cheap houses for sale" href="https://www.rightmove.co.uk/cheap-houses-for-sale.html" class="globalFooter-subMenuLink">Cheap houses for sale</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Overseas" href="https://www.rightmove.co.uk/overseas-property.html" class="globalFooter-subMenuLink">Overseas</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Find an agent" href="https://www.rightmove.co.uk/estate-agents.html" class="globalFooter-subMenuLink">Find an agent</a></li>
                                <li class="globalFooter-subMenuItem globalFooter-subMenuItem--secondary"><a title="Commercial Property to Let" href="https://www.rightmove.co.uk/commercial-property-to-let.html" class="globalFooter-subMenuLink">Commercial Property to Let</a></li>
                                <li class="globalFooter-subMenuItem globalFooter-subMenuItem--secondary"><a title="Commercial Property for Sale" href="https://www.rightmove.co.uk/commercial-property-for-sale.html" class="globalFooter-subMenuLink">Commercial Property for Sale</a></li>
                        </ul>
                </li>
                <li class="globalFooter-menuGroup">
                        <input class="globalFooter-menuGroupHeader-checkbox" id="globalFooter-menuGroupHeader-plc" type="checkbox" />
                        <h4 class="globalFooter-menuGroupHeader">
                                <label for="globalFooter-menuGroupHeader-plc">Rightmove PLC</label>
                                <div class="no-svg-chevron-line globalFooter-chevron">
                                        <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 10.293l5.146-5.147a.5.5 0 0 1 .708.708l-5.5 5.5a.5.5 0 0 1-.708 0l-5.5-5.5a.5.5 0 1 1 .708-.708L8 10.293z"/></svg>
                                </div>
                        </h4>
                        <ul class="globalFooter-subMenu">
                                <li class="globalFooter-subMenuItem"><a title="About" href="https://plc.rightmove.co.uk/about-us/company-overview.aspx" class="globalFooter-subMenuLink">About</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Press Centre" href="https://www.rightmove.co.uk/press-centre/" class="globalFooter-subMenuLink">Press Centre</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Investor relations" href="https://plc.rightmove.co.uk/investors" class="globalFooter-subMenuLink">Investor relations</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Contact us" href="https://www.rightmove.co.uk/rightmoveplc/rightmove-contacts.html" class="globalFooter-subMenuLink">Contact us</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Careers" href="https://plc.rightmove.co.uk/careers" class="globalFooter-subMenuLink">Careers</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Mobile apps" href="https://www.rightmove.co.uk/mobile-platforms.html" class="globalFooter-subMenuLink">Mobile apps</a></li>
                        </ul>
                </li>
                <li class="globalFooter-menuGroup">
                        <input class="globalFooter-menuGroupHeader-checkbox" id="globalFooter-menuGroupHeader-regions" type="checkbox" />
                        <h4 class="globalFooter-menuGroupHeader">
                                <label for="globalFooter-menuGroupHeader-regions">Locations</label>
                                <div class="no-svg-chevron-line globalFooter-chevron">
                                        <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 10.293l5.146-5.147a.5.5 0 0 1 .708.708l-5.5 5.5a.5.5 0 0 1-.708 0l-5.5-5.5a.5.5 0 1 1 .708-.708L8 10.293z"/></svg>
                                </div>
                        </h4>
                        <ul class="globalFooter-subMenu">
                                <li class="globalFooter-subMenuItem"><a title="England" href="https://www.rightmove.co.uk/property/England.html" class="globalFooter-subMenuLink">England</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Scotland" href="https://www.rightmove.co.uk/property/Scotland.html" class="globalFooter-subMenuLink">Scotland</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Northern Ireland" href="https://www.rightmove.co.uk/property/Northern-Ireland.html" class="globalFooter-subMenuLink">Northern Ireland</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Wales" href="https://www.rightmove.co.uk/property/Wales.html" class="globalFooter-subMenuLink">Wales</a></li>
                                <li class="globalFooter-subMenuItem"><a title="London" href="https://www.rightmove.co.uk/property/London.html" class="globalFooter-subMenuLink">London</a></li>
                                <li class="globalFooter-subMenuItem"><a title="London stations" href="https://www.rightmove.co.uk/tube-map.html" class="globalFooter-subMenuLink">London stations</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Spain" href="https://www.rightmove.co.uk/overseas-property/in-Spain.html" class="globalFooter-subMenuLink">Spain</a></li>
                                <li class="globalFooter-subMenuItem"><a title="France" href="https://www.rightmove.co.uk/overseas-property/in-France.html" class="globalFooter-subMenuLink">France</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Portugal" href="https://www.rightmove.co.uk/overseas-property/in-Portugal.html" class="globalFooter-subMenuLink">Portugal</a></li>
                                <li class="globalFooter-subMenuItem"><a title="All Countries" href="https://www.rightmove.co.uk/overseas-property.html" class="globalFooter-subMenuLink">All Countries</a></li>
                                <li class="globalFooter-subMenuItem globalFooter-subMenuItem--secondary"><a title="Major towns and cities" href="https://www.rightmove.co.uk/major-cities.html" class="globalFooter-subMenuLink">Major towns and cities</a></li>
                        </ul>
                </li>
                <li class="globalFooter-menuGroup">
                        <input class="globalFooter-menuGroupHeader-checkbox" id="globalFooter-menuGroupHeader-professionals" type="checkbox" />
                        <h4 class="globalFooter-menuGroupHeader">
                                <label for="globalFooter-menuGroupHeader-professionals">Professional</label>
                                <div class="no-svg-chevron-line globalFooter-chevron">
                                        <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 10.293l5.146-5.147a.5.5 0 0 1 .708.708l-5.5 5.5a.5.5 0 0 1-.708 0l-5.5-5.5a.5.5 0 1 1 .708-.708L8 10.293z"/></svg>
                                </div>
                        </h4>
                        <ul class="globalFooter-subMenu">
                                <li id="fs-customer-link-menu-item" class="globalFooter-subMenuItem-black">
                                        <a id="customerportalfooterlink" title="Rightmove Plus" href="https://rmplusportal.rightmove.co.uk" class="globalFooter-subMenuLink globalFooter-customer-portal">Rightmove Plus</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Data Services" href="https://www.rightmove.co.uk/data.html" class="globalFooter-subMenuLink">Data Services</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Agents and Developers" href="https://www.rightmove.co.uk/for-agents.html" class="globalFooter-subMenuLink">Agents and Developers</a></li>
                                <li class="globalFooter-subMenuItem"><a title="Overseas Agents and Developers" href="https://www.rightmove.co.uk/overseas-property/advertise.html" class="globalFooter-subMenuLink">Overseas Agents and Developers</a></li>
                        </ul>
                </li>
        </ul>

        <div class="globalFooter-menuFooter">
                <div class="globalFooter-legal">
                        <span class="globalFooter-legalTitle">This site:</span>
                        <a href="https://www.rightmove.co.uk/site-map.html" class="globalFooter-legalLink">Site map</a><a href="https://www.rightmove.co.uk/this-site/help.html" class="globalFooter-legalLink globalFooter-legalLink--secondary">Help</a><a target="_blank" href="https://www.rightmove.co.uk/this-site/cookies.html" class="globalFooter-legalLink optanon-show-settings-button optanon-toggle-display">Cookies</a><a href="https://www.rightmove.co.uk/this-site/safety-and-security.html" class="globalFooter-legalLink globalFooter-legalLink--secondary">Safety and security</a><a href="https://www.rightmove.co.uk/this-site/terms-of-use.html" class="globalFooter-legalLink">Terms of Use</a><a href="https://www.rightmove.co.uk/this-site/privacy-policy.html" class="globalFooter-legalLink">Privacy Policy</a></div>

                <div class="globalFooter-cities">
                        <span class="globalFooter-citiesHeader">Major cities and towns in the UK:</span>
                        <div class="select-wrapper globalFooter-citiesSelectWrapper">
                                <select class="select globalFooter-citiesSelect" title="Major cities and towns in the UK" onchange="window.location.href = this.value">
                                        <option value="" selected="selected">Select (A-Z)</option>
                                        <optgroup label="United Kingdom:">
                                                <option value="/uk-property-search-a-be.html">A-Be</option>
                                                <option value="/uk-property-search-bl-bu.html">Bl-Bu</option>
                                                <option value="/uk-property-search-ca-ce.html">Ca-Ce</option>
                                                <option value="/uk-property-search-ch-con.html">Ch-Con</option>
                                                <option value="/uk-property-search-cor-cu.html">Cor-Cu</option>
                                                <option value="/uk-property-search-d.html">D</option>
                                                <option value="/uk-property-search-ea.html">Ea</option>
                                                <option value="/uk-property-search-ed-f.html">Ed-F</option>
                                                <option value="/uk-property-search-g.html">G</option>
                                                <option value="/uk-property-search-h.html">H</option>
                                                <option value="/uk-property-search-i-k.html">I-K</option>
                                                <option value="/uk-property-search-l.html">L</option>
                                                <option value="/uk-property-search-m-ne.html">M-Ne</option>
                                                <option value="/uk-property-search-no.html">No</option>
                                                <option value="/uk-property-search-o-r.html">O-R</option>
                                                <option value="/uk-property-search-sc-so.html">Sc-So</option>
                                                <option value="/uk-property-search-st-sw.html">St-Sw</option>
                                                <option value="/uk-property-search-t-v.html">T-V</option>
                                                <option value="/uk-property-search-wa-we.html">Wa-We</option>
                                                <option value="/uk-property-search-wi-wr.html">Wi-Wr</option>
                                                <option value="/uk-property-search-y.html">Y</option>
                                                <option value="/major-cities.html">Major cities in the UK</option>
                                        </optgroup>
                                        <optgroup label="London:">
                                                <option value="/property/London.html">London Property</option>
                                                <option value="/property-for-sale/London.html">London Property for Sale</option>
                                                <option value="/property-to-rent/London.html">London Property to Rent</option>
                                                <option value="/london-property-search-ba.html">Ba</option>
                                                <option value="/london-property-search-be-br.html">Be-Br</option>
                                                <option value="/london-property-search-c.html">C</option>
                                                <option value="/london-property-search-e-g.html">E-G</option>
                                                <option value="/london-property-search-ha.html">Ha</option>
                                                <option value="/london-property-search-hi-ho.html">Hi-Ho</option>
                                                <option value="/london-property-search-i-k.html">I-K</option>
                                                <option value="/london-property-search-l-m.html">L-M</option>
                                                <option value="/london-property-search-n-r.html">N-R</option>
                                                <option value="/london-property-search-s-t.html">S-T</option>
                                                <option value="/london-property-search-w.html">W</option>
                                                <option value="/london-popular-regions.html">Popular regions in London</option>
                                        </optgroup>
                                        <optgroup label="Houses:">
                                                <option value="/property-for-sale/B11.html">Houses for sale in B11</option>
                                                <option value="/property-for-sale/B9.html">Houses for sale in B9</option>
                                                <option value="/property-for-sale/Hu8.html">Houses for sale in HU8</option>
                                                <option value="/property-for-sale/Bl1.html">Houses for sale in BL1</option>
                                                <option value="/property-for-sale/Hu7.html">Houses for sale in HU7</option>
                                                <option value="/property-for-sale/Sa4.html">Houses for sale in SA4</option>
                                                <option value="/property-for-sale/Sa9.html">Houses for sale in SA9</option>
                                                <option value="/property-for-sale/S4.html">Houses for sale in S4</option>
                                                <option value="/property-for-sale/Sa5.html">Houses for sale in SA5</option>
                                                <option value="/property-for-sale/Ls9.html">Houses for sale in LS9</option>
                                                <option value="/property-to-rent/Bd3.html">Houses to rent in BD3</option>
                                                <option value="/property-to-rent/Le5.html">Houses to rent in LE5</option>
                                                <option value="/property-to-rent/Bd5.html">Houses to rent in BD5</option>
                                                <option value="/property-to-rent/Bd8.html">Houses to rent in BD8</option>
                                                <option value="/property-to-rent/Le4.html">Houses to rent in LE4</option>
                                                <option value="/property-to-rent/S20.html">Houses to rent in S20</option>
                                                <option value="/property-to-rent/Ls14.html">Houses to rent in LS14</option>
                                                <option value="/property-to-rent/St6.html">Houses to rent in ST6</option>
                                                <option value="/property-to-rent/Hu8.html">Houses to rent in HU8</option>
                                                <option value="/property-to-rent/Hu6.html">Houses to rent in HU6</option>
                                        </optgroup>
                                        <optgroup label="Offices:">
                                                <option value="/commercial-property-to-let/Birmingham/offices.html">Offices to Rent in Birmingham</option>
                                                <option value="/commercial-property-to-let/Bristol/offices.html">Offices to Rent in Bristol</option>
                                                <option value="/commercial-property-to-let/Glasgow/offices.html">Offices to Rent in Glasgow</option>
                                                <option value="/commercial-property-to-let/Leeds/offices.html">Offices to Rent in Leeds</option>
                                                <option value="/commercial-property-to-let/Leicester/offices.html">Offices to Rent in Leicester</option>
                                                <option value="/commercial-property-to-let/London/offices.html">Offices to Rent in London</option>
                                                <option value="/commercial-property-to-let/Manchester/offices.html">Offices to Rent in Manchester</option>
                                                <option value="/commercial-property-to-let/Newcastle-Upon-Tyne/offices.html">Offices to Rent in Newcastle Upon Tyne</option>
                                                <option value="/commercial-property-to-let/Nottingham/offices.html">Offices to Rent in Nottingham</option>
                                                <option value="/commercial-property-to-let/Soho/offices.html">Offices to Rent in Soho</option>
                                                <option value="/commercial-property-to-let/Birmingham/serviced-offices.html">Serviced Offices to Rent in Birmingham</option>
                                                <option value="/commercial-property-to-let/Bristol/serviced-offices.html">Serviced Offices to Rent in Bristol</option>
                                                <option value="/commercial-property-to-let/Glasgow/serviced-offices.html">Serviced Offices to Rent in Glasgow</option>
                                                <option value="/commercial-property-to-let/Leeds/serviced-offices.html">Serviced Offices to Rent in Leeds</option>
                                                <option value="/commercial-property-to-let/Leicester/serviced-offices.html">Serviced Offices to Rent in Leicester</option>
                                                <option value="/commercial-property-to-let/London/serviced-offices.html">Serviced Offices to Rent in London</option>
                                                <option value="/commercial-property-to-let/Manchester/serviced-offices.html">Serviced Offices to Rent in Manchester</option>
                                                <option value="/commercial-property-to-let/Newcastle-Upon-Tyne/serviced-offices.html">Serviced Offices to Rent in Newcastle Upon Tyne</option>
                                                <option value="/commercial-property-to-let/Nottingham/serviced-offices.html">Serviced Offices to Rent in Nottingham</option>
                                                <option value="/commercial-property-to-let/Soho/serviced-offices.html">Serviced Offices to Rent in Soho</option>
                                        </optgroup>
                                </select>
                                <div class="no-svg-chevron select-chevron">
                                        <svg viewBox="0 0 7.6 4.1" id="core-icon--chevron"><path d="M4 4L7.5.5c.2-.2.1-.5-.2-.5h-7C0 0-.1.3.1.5L3.6 4c.1.1.3.1.4 0z"></path></svg>
                                </div>
                        </div>
                </div>
        </div>
</div>

<style>

        .globalFooter *, :after, :before {
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
        }

        @media print {
                .globalFooter { display: none !important; }
        }

        .globalFooter button, select {
                text-transform: none;
        }
        .globalFooter button, optgroup, select {
                color: inherit;
                font: inherit;
                margin: 0;
        }
        .globalFooter optgroup {
                font-weight: bold;
        }
        .globalFooter h1, h2, h3, h4, h5, h6 {
                margin: 0;
                font-size: 15px;
                font-weight: 400;
        }

        .globalFooter {
                line-height: initial;
                position: relative;
                width: 100%;
                padding: 0 15px;
                background-color: #EAEAEA;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
        }
        .globalFooter::after {
                content: " ";
                display: table;
                clear: both; }

        .globalFooter-menu {
                max-width: 1400px;
                margin: 0 auto;
                padding: 0;
                padding-top: 15px; }
        .globalFooter-menu::after {
                content: " ";
                display: table;
                clear: both; }
        @media (min-width: 48em) {
                .globalFooter-menu {
                        padding-top: 30px; } }

        .globalFooter-subMenuLink.globalFooter-customer-portal {
                line-height: 20px;
        }

        .globalFooter-menuFooter {
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;

                -webkit-flex-direction: column-reverse;
                flex-direction: column-reverse;

                -webkit-justify-content: space-between;
                justify-content: space-between;

                max-width: 1400px;
                margin: 0 auto;
                border-top: 1px solid #DFDFE1;
                padding: 15px 0;
                font-size: 13px;
        }
        @media (min-width: 75em) {
                .globalFooter-menuFooter {
                        padding: 30px 15px;

                        -webkit-flex-direction: row-reverse;
                        flex-direction: row-reverse;

                        align-items: center;
                        -webkit-align-items: center;
                }
        }

        .globalFooter-chevron {
                pointer-events: none;
                position: absolute;
                top: 10px;
                right: 0;
                width: 15px;
                height: 15px;
                color: #53535F;
                stroke: transparent; }
        .globalFooter-menuGroup--expanded .globalFooter-chevron {
                -webkit-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                transform: rotate(180deg); }
        @media (min-width: 48em) {
                .globalFooter-chevron {
                        display: none; } }

        .globalFooter-menuGroup {
                border-top: 1px solid #DFDFE1;
                list-style: none; }
        .globalFooter-menuGroup:nth-child(1) {
                border-top: none; }
        @media (min-width: 48em) {
                .globalFooter-menuGroup {
                        float: left;
                        margin-bottom: 30px;
                        border-top: none;
                        cursor: default; } }
        @media (min-width: 48em) and (max-width: 74.99em) {
                .globalFooter-menuGroup {
                        width: 33.33333%; }
                .globalFooter-menuGroup:nth-child(1n) {
                        border-right: 1px solid #DFDFE1;
                        padding-left: 15px;
                        padding-right: 15px; }
                .globalFooter-menuGroup:nth-child(3n) {
                        border-right: none; }
                .globalFooter-menuGroup:nth-child(4n) {
                        clear: left; } }
        @media (min-width: 75em) {
                .globalFooter-menuGroup {
                        width: 16.66667%; }
                .globalFooter-menuGroup:nth-child(n-1) {
                        border-right: 1px solid #DFDFE1;
                        padding-left: 15px;
                        padding-right: 15px; }
                .globalFooter-menuGroup:nth-child(6) {
                        border-right: none; } }

        .globalFooter-menuGroupHeader {
                position: relative;
                padding: 7.5px 0;
                font-size: 15px;
                font-family: Effra-Medium, Arial, Geneva, sans-serif;
                -webkit-font-smoothing: antialiased;
                font-weight: normal;
                color: #53535F;
                cursor: pointer; }

        .globalFooter-menuGroupHeader-checkbox:focus + h4 > label {
                outline: 5px auto -webkit-focus-ring-color;
        }

        .globalFooter-subMenu {
                max-height: 0;
                padding: 0;
                overflow: hidden; }
        .globalFooter-menuGroup--expanded .globalFooter-subMenu {
                max-height: 500px; }
        @media (min-width: 48em) {
                .globalFooter-subMenu {
                        max-height: none; } }

        .globalFooter-subMenuItem {
                border-top: 1px solid #DFDFE1; }
        @media (min-width: 48em) {
                .globalFooter-subMenuItem {
                        border-top: none; } }

        .globalFooter-subMenuItem--secondary {
                display: inline-block; }
        @media (min-width: 48em) {
                .globalFooter-subMenuItem--secondary {
                        display: none; } }

        .globalFooter-subMenuLink {
                display: block;
                margin: 4.5px 0;
                font-size: 15px;
                text-decoration: none;
                color: #66636E;
        }
        @media (min-width: 48em) {
                .globalFooter-subMenuLink {
                        padding: 2px 0;
                }
        }

        .globalFooter-subMenuItem-black {
                font-size: 15px;
                color: #262637; }
        .globalFooter-subMenuItem-black .globalFooter-subMenuLink {
                width: 136px;
                height: 30px;
                border-radius: 2px;
                background-color: #262637;
                font-size: 13px;
                color: #ffffff;
                line-height: 27px;
                text-align: center;
                margin: 8px 0;
                line-height: 30px;
                padding: 0; }

        .globalFooter-cities {
                display: none; }
        @media (min-width: 48em) {
                .globalFooter-cities {
                        display: block; } }
        @media (min-width: 75em) {
                .globalFooter-cities {
                        float: left; } }

        .globalFooter-citiesHeader {
                padding-right: 15px; }

        .globalFooter-citiesSelectWrapper {
                line-height: initial;
                display: inline-block;
                position: relative;
                border: 1px solid #DFDFE1;
                padding: 3px 10px;
                background: #F5F5F5; }
        .globalFooter-citiesSelectWrapper .select-chevron {
                right: 10px;
                width: 12px; }

        .globalFooter-citiesSelect {
                line-height: initial;
                color: #262637;
                font-size: 13px; }

        .globalFooter-legal {
                width: 100%;
                line-height: 30px;
                text-align: center;
        }
        @media (min-width: 48em) {
                .globalFooter-legal {
                        padding: 15px 0;
                        text-align: left;
                }
        }
        @media (min-width: 75em) {
                .globalFooter-legal {
                        float: right;
                        width: auto;
                        padding: 0;
                        text-align: right;
                }
        }

        .globalFooter-legalTitle {
                display: none;
                font-weight: 400; }
        @media (min-width: 48em) {
                .globalFooter-legalTitle {
                        display: inline-block; } }

        .globalFooter-legalLink {
                padding: 0 7.5px;
                text-decoration: none;
                color: #707070; }
        @media (min-width: 48em) {
                .globalFooter-legalLink {
                        margin-left: 15px;
                        border-left: 1px solid #DFDFE1;
                        padding: 0 0 0 15px; } }

        .globalFooter-legalLink--secondary {
                display: none; }
        @media (min-width: 48em) {
                .globalFooter-legalLink--secondary {
                        display: inline-block; } }

        .select {
                -webkit-appearance: none;
                -moz-appearance: none;
                -ms-appearance: none;
                appearance: none;
                border-radius: 0;
                border: none;
                background: transparent;
                cursor: pointer; }
        .select::-ms-expand {
                display: none; }

        .globalFooter-citiesSelectWrapper .select-chevron {
                right: 10px;
                width: 12px;
        }
        svg:not(:root) {
                overflow: hidden;
        }
        .select-chevron {
                width: 9px;
                height: 9px;
                margin-left: 2px;
                pointer-events: none;
                fill: #797885;
                stroke: transparent;
                -webkit-transition-property: fill, -webkit-transform;
                transition-property: fill, -webkit-transform;
                transition-property: transform, fill;
                transition-property: transform, fill, -webkit-transform;
                -webkit-transition-duration: 0.2s;
                transition-duration: 0.2s;
                -webkit-transition-timing-function: ease-in-out;
                transition-timing-function: ease-in-out;
                display: inline-block;
        }

        .globalFooter-menuGroupHeader > label {
                width: 100%;
                display: inline-block;
                font-weight: 400;
                cursor: pointer; }
        .globalFooter-menuGroupHeader-checkbox {
                position: absolute;
                opacity: 0;
                z-index: -1; }
        .globalFooter-menuGroup {
                position: relative; }
        .globalFooter-menuGroupHeader-checkbox:checked ~ .globalFooter-subMenu {
                max-height: 500px; }
        .globalFooter-menuGroupHeader-checkbox:checked ~ .globalFooter-menuGroupHeader .globalFooter-chevron {
                -webkit-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                transform: rotate(180deg); }

</style>

</div>
</div>

<script type="text/javascript">
    jQuery(document).ready(function() {
        RIGHTMOVE.UTIL.clientPersister.init();
    });
</script><script type="text/javascript">
        RIGHTMOVE.USER.accountLightbox.attach({element : ".lightboxSignIn", channel : "buying", loginForm : "#lightboxLogin", registerForm : "#lightboxRegistration", showRegisterOnLoad : false});
        RIGHTMOVE.USER.accountLightbox.attach({element : ".lightboxCreateAccount", channel : "buying", loginForm : "#lightboxLogin", registerForm : "#lightboxRegistration", showRegisterOnLoad : true });
</script>


<script type="text/javascript" src="/ps/js20100/concat/js_fullsite/propertyDetails.js"></script>
<script type="text/javascript">
        (function($) { 
        RIGHTMOVE.UTIL.analytics.trackEventOnClick('#link-enlarge', "buying-property-details","features","photos-fullscreen", "")
})(jQuery);
(function($) { 
    var thumbnailCarousel = RIGHTMOVE.PROPERTYDETAILS.thumbnailCarousel;
    thumbnailCarousel.init({
        totalImages : 12,
        maxThumbnailsToDisplay : 5,
        nextThumbnailPageSelector : '.js-thumbnail-next',
        prevThumbnailPageSelector : '.js-thumbnail-prev',
        imageElementWidth : 132,
        divToMove: '.js-thumbnail-main',
        thumbnailImageContainer : '.js-gallery-thumbnail img',
        failureThumbnailImageSrc: '/ps/images/fullsite/common/no_download_thumbnail.gif'
    });

    var imageGallery = RIGHTMOVE.PROPERTYDETAILS.imageGallery;
    imageGallery.init({
        images : [{"index":0,"caption":"denewood_2.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_01_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_01_0000_max_656x437.jpg"},{"index":1,"caption":"denewood_12.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_02_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_02_0000_max_656x437.jpg"},{"index":2,"caption":"denewood_7.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_03_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_03_0000_max_656x437.jpg"},{"index":3,"caption":"denewood_11.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_04_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_04_0000_max_656x437.jpg"},{"index":4,"caption":"denewood_10.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_05_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_05_0000_max_656x437.jpg"},{"index":5,"caption":"denewood_8.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_06_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_06_0000_max_656x437.jpg"},{"index":6,"caption":"denewood_9.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_07_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_07_0000_max_656x437.jpg"},{"index":7,"caption":"denewood_6.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_08_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_08_0000_max_656x437.jpg"},{"index":8,"caption":"denewood_13.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_09_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_09_0000_max_656x437.jpg"},{"index":9,"caption":"denewood_4.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_10_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_10_0000_max_656x437.jpg"},{"index":10,"caption":"denewood_3.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_11_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_11_0000_max_656x437.jpg"},{"index":11,"caption":"denewood_1.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_12_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_12_0000_max_656x437.jpg"}],
        mainImageContainer : '.js-gallery-main',
        nextImageSelector : '.js-gallery-next',
        prevImageSelector : '.js-gallery-prev',
        currentSelectedImageIndex : 0,
        slideshowToggle : '.js-gallery-slideshow',
        selectedThumbnailClass : 'selected',
        thumbnailCarousel : thumbnailCarousel,
        slideshowIntervalMillis : 2000,
        imageThumbnailSelector: '.js-gallery-thumbnail',
        captionContainer: '.js-gallery-caption',
        imageIndex: '.js-gallery-index',
        fullscreenLink: '.js-gallery-enlarge',
        loadingMainImageSrc: '/ps/images/fullsite/common/loading.gif',
        failureMainImageSrc: '/ps/images/fullsite/common/no_download.gif'
    });
})(jQuery);
(function($) { $(function() {
                                        $('#brochure-0').click(function(){
                                                RIGHTMOVE.UTIL.analytics.trackEvent("buying-property-details","features","brochure");
                                        });
                                })})(jQuery);
(function($) { $(function() {
                                        $('#brochure-1').click(function(){
                                                RIGHTMOVE.UTIL.analytics.trackEvent("buying-property-details","features","brochure-custom");
                                        });
                                })})(jQuery);
(function($) { 
        $(".js-ga-hipepc").click(function(){
                RIGHTMOVE.UTIL.analytics.trackEvent("buying-property-details","features","hipepc");
        });
})(jQuery);
(function($) { $(function() {
        $('.js-ga-minimap').click(function(event){
                event.preventDefault();
                RIGHTMOVE.UTIL.analytics.trackEvent("buying-property-details", "features", "minimap");
        });
        $('.js-ga-minimap-text').click(function(event){
                event.preventDefault();
                RIGHTMOVE.UTIL.analytics.trackEvent("buying-property-details", "features", "minimap-text");
        });
})})(jQuery);
(function($) { $(function() {
    $('.js-description-school-checker').click(function(event){
        event.preventDefault();

        RIGHTMOVE.UTIL.analytics.trackEvent("buying-property-details", "features", "school-checker-full-description");

        $('html, body').animate({
            scrollTop: $("#detailsTabs").offset().top - 120
        }, 0);

        $('#schoolsTab').click();
    });
})})(jQuery);
(function($) { $(function() {
        RIGHTMOVE.UTIL.analytics.trackEventOnClick('.check-broadband-speed', 'compare-the-market-broadband', 'check-broadband-speed', 'ctm-broadband-check');
        RIGHTMOVE.UTIL.analytics.trackEventOnClick('.see-all-offers', 'compare-the-market-broadband', 'check-providers', 'clicked-through-to-compare-the-market');
})})(jQuery);
(function($) { $(function() {
                $("#link-local-rate").fancybox();
             })})(jQuery);
(function($) { $(function() {
                        new RIGHTMOVE.PROPERTYDETAILS.FloorplanViewer(
                                {
                                        zoomLevels: 2,
                                        zoomUrls: ["https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_FLP_01_0000_max_600x600.jpg","https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_FLP_01_0000_max_900x900.jpg"],
                                        zoomWidths: [436,655],
                                        zoomHeights: [600,900],
                                        draggableImageWrapperWidths :  [592,918],
                                        draggableImageWrapperHeights :  [800,1400],
                                        mainContainerSelector: '#interactivefloorplan-1781970678',
                                containerWidth: 592,
                                containerHeight: 600,
                                minimumVisibleWidth: 492,
                                minimumVisibleHeight: 500
                                }
                        );

            if (false) {
                $('#zoom').hide();
                $('#floorplancontrols').height(95);
            }
                })})(jQuery);
(function($) { $(function() {
                $("#link-local-rate").fancybox();
             })})(jQuery);
(function($) { $(function() {
        $("#fullscreen-floorplan").click(function(){
        var newWindowParam = 'directories=no,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,titlebar=no,status=yes';
        var showTubeLinesParam = $("#transitControl").length > 0 ? "&showTubeLines=" + $("#transitCheckbox", "#transitControl").is(":checked") : "";
        var href = this.href+"&width="+screen.availWidth+"&height="+screen.availHeight+showTubeLinesParam;
        return !RIGHTMOVE.UTIL.openAttributeWindowWithName(href, 'fullscreenmedia', newWindowParam);
        });
})})(jQuery);
(function($) { $(function() {
                $("#link-local-rate").fancybox();
             })})(jQuery);
(function($) { 
        RIGHTMOVE.UTIL.analytics.queueTrackEventOnClick('#sPodMImage', "buying-property-details","market-info","link-to-full-listing");
})(jQuery);
(function($) { $(function() {
    (function () {
        RIGHTMOVE.ANALYTICS.DataLayer.push({
            'event': 'mvt',
            'gaEventData': {
                'action': 'mortgage calculator design',
                'label':
                'new'
            }
        });
    })();
})})(jQuery);
(function($) { $(function() {
        RIGHTMOVE.UTIL.analytics.setCurrentGAChannel("buying");

    var marketInfoController;
        var schoolsMapController;
        var nearBySchools;

    
        var options = {
            channel : "buying",
            propertyId: 67910289,
            propertiesTemplate: "nearbyPropertiesTemplateId",
            tabsTemplate: "similarnearby",
            soldHistoryTemplate: "soldHistory",
            container : "similarNearbySection",
            tabsContainer: "similarNearbyTabs",
            forSaleContainer : "nearbyForSaleTabBody",
            underOfferContainer : "nearbyUnderOfferTabBody",
            soldContainer : "nearbySoldTabBody",
            soldHistoryContainer : "soldHistoryBody",
                        soldPricesDisclaimerTemplate : "soldPricesDisclaimerTemplate",
                        soldPricesDisclaimerContainer : "soldPricesDisclaimer",
                        showMarketInformationSurvey: "false"
        };

        marketInfoController = new RIGHTMOVE.HOUSEPRICES.MarketInformationController(options);
    

        var gaTrackingChannel = "buying" + '-property-details';

        

                var schoolMapOptions = {"zoom":14,"latitudeLongitude":{"lat":51.418083,"lon":-0.214006},"exactLocation":true}
                schoolMapOptions.gaTrackingChannel = gaTrackingChannel;

                var AGE_GROUP_TYPE = {
                        PRIMARY: {
                                id: 'primary',
                                name: 'Primary'
                        },
                        SECONDARY: {
                                id: 'secondary',
                                name: 'Secondary'
                        }
                };

        var nearBySchoolsOptions = {
                        propertyId: 67910289,
                        propertyPostcode: "SW19 4HB",
                        gaTrackingChannel : gaTrackingChannel,
                        schoolsMapController: new RIGHTMOVE.SCHOOLS.SchoolsMap(schoolMapOptions),
                        attachKnockoutToDomElement: document.getElementById("schools"),
                        schoolsService: new RIGHTMOVE.SCHOOLS.SchoolsService(),
                        ageGroupType: AGE_GROUP_TYPE,
                        ageGroupChoices: [AGE_GROUP_TYPE.PRIMARY, AGE_GROUP_TYPE.SECONDARY],
                        googleMapMarkerWithLabelUrl: "/ps/js20100/concat/js_fullsite/googleMapMarkerWithLabel.js",
                        mapMarkerEmptyImgUrl: "/ps/images20100/fullsite/icons/schools/google-map-empty-marker.png",
            propertyLatLng: schoolMapOptions.latitudeLongitude
                };
                nearBySchools = new RIGHTMOVE.SCHOOLS.NearBySchools(nearBySchoolsOptions);
        

        var mapOptions = {"attachToElement":".js-map-canvas","latitude":51.418083,"longitude":-0.214006,"zoom":15,"showPin":true,"tileUri":"/ajax/maps/school-summaries.html","schoolDetailsUri":"/ajax/maps/school-details.html?channel=buying-property-details","showSchools":true,"schoolListContainerSelector":".js-schools-list","schoolMapReducedWidth":"71.8%","mapTypeId":"roadmap","showTubeLinesOption":true};
        mapOptions.gaTrackingChannel = gaTrackingChannel;

    var options = {
        propertyDetailsMapJsUrl : "/ps/js20100/concat/js_main_v1/propertyDetailsMap.js",
                propertyDetailsMapV2JsUrl : "/ps/js20100/concat/js_main_v1/propertyDetailsMapV2.js",
        mapOptions : mapOptions,
        streetViewOptions : {"attachToElement":".js-streetview","streetViewPointOfView":{"heading":0.0,"pitch":10.0,"zoom":1,"position":{"latitude":51.418081,"longitude":-0.214006}},"latitude":51.41801157906057,"longitude":-0.21413317704546467,"showOnInit":true,"motionTracking":false},
        marketInfoController : marketInfoController,
        channel : gaTrackingChannel,
        tabsContainer : "similarNearbyTabs",
                nearBySchools: nearBySchools,
                knockoutJsUrl: "/ps/js20100/concat/js_main_v1/knockout-3.3.0.js",
                locationTabContentsModel: {"mapLocation":{"latitude":51.418083,"longitude":-0.214006,"zoom":15,"exact":true},"streetViewPointOfView":{"heading":0.0,"pitch":10.0,"zoom":1,"position":{"latitude":51.418081,"longitude":-0.214006}},"nearbyTubeLine":true,"showStreetViewOption":true,"defaultStreetView":false},
                broadbandCtmUrl: "https://partnerships-broadband.comparethemarket.com/v1/broadband/rightmove/SW194HB?apikey=741c2289b0dc132d4705ea812dc5c6396465fd8c8de746cb1f1d52110487c1d3"
    };

    var propertyDetailsTabs = new RIGHTMOVE.PROPERTYDETAILS.PropertyDetailsTabs(options);

        RIGHTMOVE.FULLSITE.UI.fullscreenOverlay.init({
                selector: ".js-fullscreen-percentage"
        },{
                type : "iframe",
                iframe: {
                        scrolling: "no",
                        preload: true
                },
                autoSize: false,
                width: "95%",
                height: "95%",
                padding: "0"
        });
        RIGHTMOVE.FULLSITE.UI.fullscreenOverlay.init({
                selector: ".js-fullscreen-fixed",
                dark: true
        },{
                type : "iframe",
                iframe: {
                        scrolling : "no",
                        preload   : true
                },
                autoSize: false,
                width: "950",
                height: "600"
        });
})})(jQuery);
(function($) { 
        new RIGHTMOVE.UTIL.PageHistory().trackPage("property-details-alias", false);
        new RIGHTMOVE.UI.BackLink().showBackLinks();
})(jQuery);
(function($) { 
        RIGHTMOVE.UTIL.analytics.trackEventOnClick('#showSimilarPropertiesLink', "buying-property-details","features","see-similar-properties", "")
})(jQuery);
(function($) { $(function() {
                                RIGHTMOVE.UTIL.analytics.trackEventOnClick('.property-actions-save', 'buying-property-details', 'Saving', 'Save-property');
                        })})(jQuery);
(function($) { $(function() {
                        $(".property-actions-save a").click(function (event) {
                                var href = $(this).attr('href');
                                event.preventDefault();
                                RIGHTMOVE.ANALYTICS.DataLayer.push({ "event": "savePropertyLogin" });
                                setTimeout(function() { window.location = href; }, 0);
                        });
                })})(jQuery);
(function($) { $(function() {
        if (true) {
                $("#js-property-note-wrapper").hide();
        }
        $(".js-property-note-add").click(function (event) {
                if (!$("#js-property-note-wrapper").is(':visible')) {
                        RIGHTMOVE.ANALYTICS.DataLayer.push({ "event": "addNotesOpen" });
                }
                $("#js-property-note-wrapper").slideToggle();
                event.preventDefault();
        });

    $("#noteslogin").click(function (event) {
        RIGHTMOVE.ANALYTICS.DataLayer.push({ "event": "addNotesLogin" });
    });

        $("#notesRegister").click(function (event) {
                RIGHTMOVE.ANALYTICS.DataLayer.push({ "event": "addNotesRegister" });
        });

})})(jQuery);
(function($) { 
        RIGHTMOVE.USER.accountLightbox.persistRegisterAction(".js-property-note-register", "add-notes");
})(jQuery);
(function($) { 
        RIGHTMOVE.UTIL.analytics.trackEventOnClick('#sendToFriend', "buying-property-details","send-to-a-friend","send-to-a-friend-form", "true")
})(jQuery);
(function($) { 
    //map the object to a default img
    $("#pinterest").click(function(){

        RIGHTMOVE.UTIL.analytics.trackEvent("buying-property-details","sharing","pinterest-open");

        var imgArray = $.map([{"index":0,"caption":"denewood_2.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_01_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_01_0000_max_656x437.jpg","isVideo":false},{"index":1,"caption":"denewood_12.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_02_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_02_0000_max_656x437.jpg","isVideo":false},{"index":2,"caption":"denewood_7.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_03_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_03_0000_max_656x437.jpg","isVideo":false},{"index":3,"caption":"denewood_11.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_04_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_04_0000_max_656x437.jpg","isVideo":false},{"index":4,"caption":"denewood_10.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_05_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_05_0000_max_656x437.jpg","isVideo":false},{"index":5,"caption":"denewood_8.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_06_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_06_0000_max_656x437.jpg","isVideo":false},{"index":6,"caption":"denewood_9.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_07_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_07_0000_max_656x437.jpg","isVideo":false},{"index":7,"caption":"denewood_6.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_08_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_08_0000_max_656x437.jpg","isVideo":false},{"index":8,"caption":"denewood_13.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_09_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_09_0000_max_656x437.jpg","isVideo":false},{"index":9,"caption":"denewood_4.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_10_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_10_0000_max_656x437.jpg","isVideo":false},{"index":10,"caption":"denewood_3.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_11_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_11_0000_max_656x437.jpg","isVideo":false},{"index":11,"caption":"denewood_1.jpg","thumbnailUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_12_0000_max_135x100.jpg","masterUrl":"https://media.rightmove.co.uk/dir/136k/135593/67910289/135593_29425410_IMG_12_0000_max_656x437.jpg","isVideo":false}], function(object){
            var options = {
                src: object.masterUrl,
                alt: object.caption
            }
            return options;
        });

        RIGHTMOVE.UTIL.pinterest.addPinMarklet({
            images : imgArray,
            onPin : function(){
                RIGHTMOVE.UTIL.analytics.trackEvent("buying-property-details","sharing","pinterest-shared");
            }
        });
        return false;
    });
})(jQuery);
(function($) { 
        RIGHTMOVE.UTIL.analytics.trackEventOnClick('#soldPriceGoTo', "buying-property-details","ads","sold-price-view-more", "")
})(jQuery);
(function($) { 
        RIGHTMOVE.UTIL.analytics.trackEventOnClick('#security-advice-link', "buying-property-details","features","security-advice-rhs", "")
})(jQuery);
(function($) { 
        new RIGHTMOVE.UTIL.PageHistory().trackPage("property-details", false);
        new RIGHTMOVE.UI.BackLink().showBackLinks();
})(jQuery);
(function($) { $(function() {
        RIGHTMOVE.UTIL.analytics.trackEventOnClick("#rmplusfooterlink", "homepage", "rightmoveplus", "footerlink");
})})(jQuery);
</script>
<script type="text/javascript">
                window.onload = function() {
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.trackOnClick('#link-enlarge', {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false"}, 'photos-fullscreen', '', '');
                        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

        RIGHTMOVE.PROPERTYDETAILS.imageGallery.setupInitialImagePreload();

},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.UI.tooltipPopup.init(".mortgage-link-tooltip-icon", ".mortgage-link-tooltip-message");
        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

        $('#facebook').click(function(event){
                event.preventDefault();
                RIGHTMOVE.UTIL.analytics.trackEvent("buying-property-details","sharing","facebook");
        RIGHTMOVE.SOCIALMEDIA.LogSocialMedia("67910289", "true", "135593","facebook");
        });

        $('#twitter').click(function(event){
                event.preventDefault();
                RIGHTMOVE.UTIL.analytics.trackEvent("buying-property-details","sharing","twitter");
        RIGHTMOVE.SOCIALMEDIA.LogSocialMedia("67910289", "true", "135593","twitter");
        });

    $('#pinterest').click(function(event){
        event.preventDefault();
        RIGHTMOVE.SOCIALMEDIA.LogSocialMedia("67910289", "true", "135593","pinterest");
    });

},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                        initializeAdSlot = function() {
                                RIGHTMOVE.ADS.dfp.initializeAdSlotWithNetworkName(
                                5029762,
                                'Rightmove_Public_Site/Property-Details/firstMPU',
                                'propertyDetailsMPU',
                                300,
                                250
                                );
                        };
                

        var userMetadataService = RIGHTMOVE.CONSUMERDATA.UserMetadataService;
        userMetadataService.initialise('https://rightmoveanalytics.co.uk/users/',
                                                                        1000);
        userMetadataService.getUserTypeAndSetDFPTargeting({"CT":["property-for-sale"],"B":["Band8"],"RESALEPRICE":["535000"],"UTo_UKZ":["England"],"UTo_TVR":["ITV-London"],"UTo_A":["SW"],"UTo_D":["SW19"],"UTo_C":["GB"],"PT":["flat_apartment"],"PST":["flat"],"TT":["Buy"],"BD":["2"],"SO":["false"],"R":["false"],"IM":["not_in_market"],"PV":["false"],"MH":["false"],"PTS":["false"],"PTR":["false"],"BIM":["not_in_market"],"IIM":["not_in_market"],"S":["N"]}, initializeAdSlot);

},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.trackOnClick('#mapAndSchoolsTab a', {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false","channel":"buying","propertyId":"67910289","branchId":"135593","videoType":"none"}, 'map-tab', '', '');
                        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.trackOnClick('#floorplansTab a', {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false","channel":"buying","propertyId":"67910289","branchId":"135593","videoType":"none"}, 'floorplan-tab', '', '');
                        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.trackOnClick('#streetViewTab a', {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false","channel":"buying","propertyId":"67910289","branchId":"135593","videoType":"none"}, 'street-view', '', '');
                        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.trackOnClick('#locationTab a', {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false","channel":"buying","propertyId":"67910289","branchId":"135593","videoType":"none"}, 'location-tab', '', '');
                        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.trackOnClick('#mapToggle', {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false","channel":"buying","propertyId":"67910289","branchId":"135593","videoType":"none"}, 'map-tab', '', '');
                        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.trackOnClick('#streetViewToggle', {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false","channel":"buying","propertyId":"67910289","branchId":"135593","videoType":"none"}, 'street-view', '', '');
                        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.trackOnClick('#virtualToursTab a', {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false","channel":"buying","propertyId":"67910289","branchId":"135593","videoType":"none"}, 'virtualtour-tab', '', '');
                        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.trackOnClick('#videoToursTab a', {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false","channel":"buying","propertyId":"67910289","branchId":"135593","videoType":"none"}, 'videotour-tab', '', '');
                        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.trackOnClick('#schoolsTab a', {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false","channel":"buying","propertyId":"67910289","branchId":"135593","videoType":"none"}, 'schools-tab', '', '');
                        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.trackOnClick('#historyMarketTab a', {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false","channel":"buying","propertyId":"67910289","branchId":"135593","videoType":"none"}, 'market-info-tab', '', '');
                        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.trackOnClick('#print', {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false","channel":"buying","propertyId":"67910289","branchId":"135593","videoType":"none"}, 'print-link', '', '');
                        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.trackOnClick('#facebook', {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false","channel":"buying","propertyId":"67910289","branchId":"135593","videoType":"none"}, 'facebook', '', '');
                        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.trackOnClick('#twitter', {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false","channel":"buying","propertyId":"67910289","branchId":"135593","videoType":"none"}, 'twitter', '', '');
                        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.trackOnClick('#pinterest', {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false","channel":"buying","propertyId":"67910289","branchId":"135593","videoType":"none"}, 'pinterest-open', '', '');
                        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.trackOnClick('.linked-tours', {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false","channel":"buying","propertyId":"67910289","branchId":"135593","videoType":"none"}, 'linked-tours', '', '');
                        
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {
var data = new RIGHTMOVE.ANALYTICS.UserAnalyticsData(
                        {
                                controllerName : "BuyingPropertyDetailsController",
                                secUserId : "",
                                isMobilePage : false,
                                mvtValues : [{"shouldLog":true,"label":"GoogleTagManagerSwitch.GTM_THIRD_PARTY_TAG_SWITCH","state":"on"},{"shouldLog":true,"label":"CookieBarSwitches.LOAD_COMSCORE","state":"off"},{"shouldLog":true,"label":"CookieBarSwitches.SHOW_INTERNAL_COOKIE_BAR","state":"off"},{"shouldLog":true,"label":"EmailLeadFormLettingLVA","state":"CONTROL"},{"shouldLog":true,"label":"SchoolsLandingPageMVT","state":"CONTROL"},{"shouldLog":true,"label":"FeatureSwitches.SEARCH_WITH_GEO_JSON_POSTCODE","state":"off"},{"shouldLog":true,"label":"CookieBarSwitches.SHOW_FULL_SCREEN_COOKIE_BAR","state":"off"},{"shouldLog":true,"label":"MRMPreferencesMVT","state":"VARIANT_PREF_POPUP_NEW_DESIGN"},{"shouldLog":true,"label":"MRMRegistrationMVT","state":"VARIANT_REG_WITH_DESCRIPTION"}],
                                mvtOnSession : "",
                                isAppEmbeddedPage : "false",
                                referrerControllerName : "",
                                deviceType : "desktop",
                                serverTime : 1587418847367,
                                svr : "2702",
                                userType : "none"
                        }
                );

                RIGHTMOVE.setAnalyticsData(data);
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {

                RIGHTMOVE.ANALYTICS.PageViewTracker.track(false, {"lon":"-0.21413317704546467","pst":"8","so":"false","aer":"2","bed":"2","nph":"12","aed":"2020-02-21-17-28-47","pds":"14","re":"false","au":"false","pd":"true","pcdid":"836665","prc":"535000","pt":"2","st":"1","pcd1":"SW19","pcd2":"4HB","pq":"2","lat":"51.41801157906057","fp":"false","channel":"buying","propertyId":"67910289","branchId":"135593","videoType":"none"}, 'property-details', 'buying/propertydetails', '');
            
},100)
})(jQuery);;
                        (function($) 
{ setTimeout(
function() {
var userMetadataService = RIGHTMOVE.CONSUMERDATA.UserMetadataService;
    userMetadataService.initialise('https://rightmoveanalytics.co.uk/users/',
                                    1000);
    userMetadataService.requestUserTypeAndWriteToSessionStorage();
},100)
})(jQuery);;
                        
                        }
        </script>

<script type="text/javascript">window.NREUM||(NREUM={});NREUM.info={"applicationID":"2271511,2711051","applicationTime":90,"atts":"SRIRElxDRBQBAwZCVkBvB18ITBQJCAkGQhEIEhFeDVYJEQpHHk0=","beacon":"bam.nr-data.net","queueTime":0,"licenseKey":"8ec04da100","transactionName":"ZVUGZBRZCBUFBhdZXFwfNlUXTQMVECQXREFbUhFEAxcgEwgJMFlHVx8mRR9RCAE0FwxAVkBEHXQDTAcPCBYgX11GQgtcCl0U","agent":"","errorBeacon":"bam.nr-data.net"}</script><script>
                                
                (function(w) {
                        RIGHTMOVE.ANALYTICS.DataLayer.trackPageView();
                }(window));
        </script>
                <script type="text/javascript">
        $( document ).ready(function() {
        var queue = new RIGHTMOVE.UTIL.GoogleAnalyticsQueue();
        queue.sendEventsFromTrackingQueue();
        });
</script><script>
        document.cookie = 'shortPropertyFormPreviouslyCompleted=; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
</script>

</body>
</html>
`;
