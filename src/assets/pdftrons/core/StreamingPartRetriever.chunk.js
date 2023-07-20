/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[14],{357:function(ha,da,h){h.r(da);var ca=h(3),aa=h(0);h.n(aa);var fa=h(1),ea=h(119);ha=h(35);var z=h(75),x=h(202),e=h(49),f=h(201);h=h(303);var y=window,r=function(){function h(h,n,r){var w=-1===h.indexOf("?")?"?":"&";switch(n){case e.a.NEVER_CACHE:this.url=h+w+"_="+Object(aa.uniqueId)();break;default:this.url=h}this.Af=r;this.request=new XMLHttpRequest;this.request.open("GET",this.url,!0);this.request.setRequestHeader("X-Requested-With",
"XMLHttpRequest");this.request.overrideMimeType?this.request.overrideMimeType("text/plain; charset=x-user-defined"):this.request.setRequestHeader("Accept-Charset","x-user-defined");this.status=f.a.NOT_STARTED}h.prototype.start=function(e,n){var r=this,w=this,x=this.request,y;w.pu=0;e&&Object.keys(e).forEach(function(f){r.request.setRequestHeader(f,e[f])});n&&(this.request.withCredentials=n);this.mA=setInterval(function(){var e=0===window.document.URL.indexOf("file:///");e=200===x.status||e&&0===x.status;
if(x.readyState!==f.b.DONE||e){try{x.responseText}catch(ma){return}w.pu<x.responseText.length&&(y=w.A7())&&w.trigger(h.Events.DATA,[y]);0===x.readyState&&(clearInterval(w.mA),w.trigger(h.Events.DONE))}else clearInterval(w.mA),w.trigger(h.Events.DONE,["Error received return status "+x.status])},1E3);this.request.send(null);this.status=f.a.STARTED};h.prototype.A7=function(){var e=this.request,f=e.responseText;if(0!==f.length)if(this.pu===f.length)clearInterval(this.mA),this.trigger(h.Events.DONE);else return f=
Math.min(this.pu+3E6,f.length),e=y.hO(e,this.pu,!0,f),this.pu=f,e};h.prototype.abort=function(){clearInterval(this.mA);var e=this;this.request.onreadystatechange=function(){Object(fa.h)("StreamingRequest aborted");e.status=f.a.ABORTED;return e.trigger(h.Events.ABORTED)};this.request.abort()};h.prototype.finish=function(){var e=this;this.request.onreadystatechange=function(){e.status=f.a.SUCCESS;return e.trigger(h.Events.DONE)};this.request.abort()};h.Events={DONE:"done",DATA:"data",ABORTED:"aborted"};
return h}();Object(ha.b)(r);var n;(function(e){e[e.LOCAL_HEADER=0]="LOCAL_HEADER";e[e.FILE=1]="FILE";e[e.CENTRAL_DIR=2]="CENTRAL_DIR"})(n||(n={}));var w=function(e){function f(){var f=e.call(this)||this;f.buffer="";f.state=n.LOCAL_HEADER;f.TH=4;f.vk=null;f.Pq=ea.c;f.Il={};return f}Object(ca.c)(f,e);f.prototype.u7=function(e){var h;for(e=this.buffer+e;e.length>=this.Pq;)switch(this.state){case n.LOCAL_HEADER:this.vk=h=this.E7(e.slice(0,this.Pq));if(h.qr!==ea.g)throw Error("Wrong signature in local header: "+
h.qr);e=e.slice(this.Pq);this.state=n.FILE;this.Pq=h.bD+h.oo+h.rt+this.TH;this.trigger(f.Events.HEADER,[h]);break;case n.FILE:this.vk.name=e.slice(0,this.vk.oo);this.Il[this.vk.name]=this.vk;h=this.Pq-this.TH;var r=e.slice(this.vk.oo+this.vk.rt,h);this.trigger(f.Events.FILE,[this.vk.name,r,this.vk.sD]);e=e.slice(h);if(e.slice(0,this.TH)===ea.h)this.state=n.LOCAL_HEADER,this.Pq=ea.c;else return this.state=n.CENTRAL_DIR,!0}this.buffer=e;return!1};f.Events={HEADER:"header",FILE:"file"};return f}(x.a);
Object(ha.b)(w);ha=function(e){function f(f,h,n,x,y){n=e.call(this,f,n,x)||this;n.url=f;n.stream=new r(f,h);n.Hd=new w;n.QQ=window.createPromiseCapability();n.mR={};n.Af=y;return n}Object(ca.c)(f,e);f.prototype.fv=function(e){var f=this;this.request([this.ji,this.sj,this.ii]);this.stream.on(r.Events.DATA,function(h){try{if(f.Hd.u7(h))return f.stream.finish()}catch(ka){throw f.stream.abort(),f.nt(ka),e(ka),ka;}});this.stream.on(r.Events.DONE,function(h){f.c7=!0;f.QQ.resolve();h&&(f.nt(h),e(h))});this.Hd.on(w.Events.HEADER,
Object(aa.bind)(this.lR,this));this.Hd.on(w.Events.FILE,Object(aa.bind)(this.U7,this));return this.stream.start(this.Af,this.withCredentials)};f.prototype.eO=function(e){var f=this;this.QQ.promise.then(function(){e(Object.keys(f.Hd.Il))})};f.prototype.hm=function(){return!0};f.prototype.request=function(e){var f=this;this.c7&&e.forEach(function(e){f.mR[e]||f.Yaa(e)})};f.prototype.lR=function(){};f.prototype.abort=function(){this.stream&&this.stream.abort()};f.prototype.Yaa=function(e){this.trigger(z.a.Events.PART_READY,
[{$a:e,error:"Requested part not found",sh:!1,zf:!1}])};f.prototype.U7=function(e,f,h){this.mR[e]=!0;this.trigger(z.a.Events.PART_READY,[{$a:e,data:f,sh:!1,zf:!1,error:null,Oc:h}])};return f}(z.a);Object(h.a)(ha);Object(h.b)(ha);da["default"]=ha}}]);}).call(this || window)
