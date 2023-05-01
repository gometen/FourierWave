(function(){"use strict";var e={6158:function(e,t,r){var n=r(9242),o=r(3396),i=r(7718),a=r(4615);function u(e,t,r,n,u,c){const s=(0,o.up)("FourierWave");return(0,o.wg)(),(0,o.j4)(i.q,null,{default:(0,o.w5)((()=>[(0,o.Wm)(a.O,null,{default:(0,o.w5)((()=>[(0,o.Wm)(s)])),_:1})])),_:1})}const c=e=>((0,o.dD)("data-v-61c994f4"),e=e(),(0,o.Cn)(),e),s=c((()=>(0,o._)("div",{id:"waveform"},null,-1)));function f(e,t,r,n,i,a){return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("button",{onClick:t[0]||(t[0]=(...e)=>a.start&&a.start(...e))},"Start Display"),(0,o._)("button",{onClick:t[1]||(t[1]=(...e)=>a.stop&&a.stop(...e))},"Stop Display"),(0,o._)("button",{onClick:t[2]||(t[2]=(...e)=>a.record&&a.record(...e))},"Start Recording"),(0,o._)("button",{onClick:t[3]||(t[3]=(...e)=>a.deldata&&a.deldata(...e))},"Delete Recording"),s],64)}r(7658);var d=r(9730),l=r.n(d),v=r(8251),p=r.n(v),h={name:"FourierWave",props:{msg:String,url:{type:String,required:!0}},data(){return{isRecording:!1,mediaRecorder:null,wavesurfer:null,chunks:[]}},mounted(){},methods:{start(){const e={container:"#waveform",waveColor:"Black",interact:!1,barHeight:5,barWidth:4,barRadius:2,plugins:[p().create()]};this.wavesurfer=l().create(e),this.wavesurfer.microphone.on("deviceReady",(function(e){console.log("Device ready!",e)})),this.wavesurfer.microphone.on("deviceError",(function(e){console.warn("Device error: "+e)})),this.wavesurfer.microphone.start()},stop(){this.wavesurfer.destroy()},record:async function(){navigator.mediaDevices.getUserMedia({audio:!0}).then((e=>{this.mediaRecorder=new MediaRecorder(e),this.mediaRecorder.start(),this.chunks=[],this.mediaRecorder.addEventListener("dataavailable",(e=>{this.chunks.push(e.data),console.log("Push Event completed")})),this.mediaRecorder.addEventListener("stop",(()=>{const e=new Blob(this.chunks,{type:"audio/ogg; codecs=opus"});this.createWaveform(e)})),this.isRecording=!0})).catch((e=>{console.error(e)})),setTimeout((()=>{this.stopRecording()}),2e3)},async stopRecording(){this.isRecording=!1,await this.mediaRecorder.stop()},createWaveform(e){const t={container:"#waveform",waveColor:"Blue",progressColor:"purple",cursorColor:"navy",barHeight:5,barWidth:4,barRadius:2,height:200};this.wavesurfer=l().create(t),this.wavesurfer.loadBlob(e),console.log(this.wavesurfer.backend.buffer)},deldata(){}}},b=r(89);const g=(0,b.Z)(h,[["render",f],["__scopeId","data-v-61c994f4"]]);var m=g,w={name:"App",components:{FourierWave:m},data:()=>({})};const y=(0,b.Z)(w,[["render",u]]);var O=y,k=(r(9773),r(2642)),j=(0,k.Rd)();async function R(){const e=await r.e(461).then(r.t.bind(r,3657,23));e.load({google:{families:["Roboto:100,300,400,500,700,900&display=swap"]}})}R(),(0,n.ri)(O).use(j).mount("#app")}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}r.m=e,function(){var e=[];r.O=function(t,n,o,i){if(!n){var a=1/0;for(f=0;f<e.length;f++){n=e[f][0],o=e[f][1],i=e[f][2];for(var u=!0,c=0;c<n.length;c++)(!1&i||a>=i)&&Object.keys(r.O).every((function(e){return r.O[e](n[c])}))?n.splice(c--,1):(u=!1,i<a&&(a=i));if(u){e.splice(f--,1);var s=o();void 0!==s&&(t=s)}}return t}i=i||0;for(var f=e.length;f>0&&e[f-1][2]>i;f--)e[f]=e[f-1];e[f]=[n,o,i]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};r.t=function(n,o){if(1&o&&(n=this(n)),8&o)return n;if("object"===typeof n&&n){if(4&o&&n.__esModule)return n;if(16&o&&"function"===typeof n.then)return n}var i=Object.create(null);r.r(i);var a={};e=e||[null,t({}),t([]),t(t)];for(var u=2&o&&n;"object"==typeof u&&!~e.indexOf(u);u=t(u))Object.getOwnPropertyNames(u).forEach((function(e){a[e]=function(){return n[e]}}));return a["default"]=function(){return n},r.d(i,a),i}}(),function(){r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){r.f={},r.e=function(e){return Promise.all(Object.keys(r.f).reduce((function(t,n){return r.f[n](e,t),t}),[]))}}(),function(){r.u=function(e){return"js/webfontloader.3ca33f85.js"}}(),function(){r.miniCssF=function(e){}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="vuetest1:";r.l=function(n,o,i,a){if(e[n])e[n].push(o);else{var u,c;if(void 0!==i)for(var s=document.getElementsByTagName("script"),f=0;f<s.length;f++){var d=s[f];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+i){u=d;break}}u||(c=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,r.nc&&u.setAttribute("nonce",r.nc),u.setAttribute("data-webpack",t+i),u.src=n),e[n]=[o];var l=function(t,r){u.onerror=u.onload=null,clearTimeout(v);var o=e[n];if(delete e[n],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((function(e){return e(r)})),t)return t(r)},v=setTimeout(l.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=l.bind(null,u.onerror),u.onload=l.bind(null,u.onload),c&&document.head.appendChild(u)}}}(),function(){r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){r.p=""}(),function(){var e={143:0};r.f.j=function(t,n){var o=r.o(e,t)?e[t]:void 0;if(0!==o)if(o)n.push(o[2]);else{var i=new Promise((function(r,n){o=e[t]=[r,n]}));n.push(o[2]=i);var a=r.p+r.u(t),u=new Error,c=function(n){if(r.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var i=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;u.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",u.name="ChunkLoadError",u.type=i,u.request=a,o[1](u)}};r.l(a,c,"chunk-"+t,t)}},r.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,i,a=n[0],u=n[1],c=n[2],s=0;if(a.some((function(t){return 0!==e[t]}))){for(o in u)r.o(u,o)&&(r.m[o]=u[o]);if(c)var f=c(r)}for(t&&t(n);s<a.length;s++)i=a[s],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(f)},n=self["webpackChunkvuetest1"]=self["webpackChunkvuetest1"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=r.O(void 0,[998],(function(){return r(6158)}));n=r.O(n)})();
//# sourceMappingURL=app.5c7c50b2.js.map