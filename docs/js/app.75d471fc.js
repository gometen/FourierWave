(function(){"use strict";var e={4136:function(e,t,r){var n=r(9242),o=r(3396),i=r(7718),a=r(3140);function u(e,t,r,n,u,c){const s=(0,o.up)("AppHeader"),d=(0,o.up)("router-view");return(0,o.wg)(),(0,o.j4)(i.q,null,{default:(0,o.w5)((()=>[(0,o.Wm)(s),(0,o.Wm)(a.O,null,{default:(0,o.w5)((()=>[(0,o.Wm)(d)])),_:1})])),_:1})}var c=r(8106),s=r(9156),d=r(1556),l=r(8275),f=r(3150),p=r(9657);function v(e,t,r,i,a,u){const v=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("header",null,[(0,o.Wm)(c.L,{color:"primary"},{default:(0,o.w5)((()=>[(0,o.Wm)(s.g,{variant:"text",onClick:t[0]||(t[0]=(0,n.iM)((t=>e.drawer=!e.drawer),["stop"]))}),(0,o.Wm)(d.o,null,{default:(0,o.w5)((()=>[(0,o.Uk)(" Explore Sound Waves! ")])),_:1})])),_:1}),(0,o.Wm)(p.V,{modelValue:e.drawer,"onUpdate:modelValue":t[1]||(t[1]=t=>e.drawer=t)},{default:(0,o.w5)((()=>[(0,o.Wm)(l.i,null,{default:(0,o.w5)((()=>[(0,o.Wm)(v,{to:"/"},{default:(0,o.w5)((()=>[(0,o.Wm)(f.l,{"prepend-icon":"mdi-home-circle",title:"Home",value:"home"})])),_:1}),(0,o.Wm)(v,{to:"/fourierwave"},{default:(0,o.w5)((()=>[(0,o.Wm)(f.l,{"prepend-icon":"mdi-waveform",title:"FourierWave",value:"fourierwave"})])),_:1}),(0,o.Wm)(v,{to:"/about"},{default:(0,o.w5)((()=>[(0,o.Wm)(f.l,{"prepend-icon":"mdi-waves",title:"About",value:"about"})])),_:1})])),_:1})])),_:1},8,["modelValue"])])}var m={data:()=>({drawer:null})},h=r(89);const b=(0,h.Z)(m,[["render",v]]);var w=b,g={name:"App",components:{AppHeader:w},data:()=>({})};const y=(0,h.Z)(g,[["render",u]]);var _=y;async function k(){const e=await r.e(461).then(r.t.bind(r,3657,23));e.load({google:{families:["Roboto:100,300,400,500,700,900&display=swap"]}})}var O=r(2483);const W=(0,o._)("h1",null,"Welcome to HomePage",-1),j=[W];function R(e,t){return(0,o.wg)(),(0,o.iD)("div",null,j)}const C={},E=(0,h.Z)(C,[["render",R]]);var P=E;const S=e=>((0,o.dD)("data-v-02c9c0d8"),e=e(),(0,o.Cn)(),e),D=S((()=>(0,o._)("div",{id:"waveform"},null,-1)));function A(e,t,r,n,i,a){return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("button",{onClick:t[0]||(t[0]=(...e)=>a.start&&a.start(...e))},"Start Display"),(0,o._)("button",{onClick:t[1]||(t[1]=(...e)=>a.stop&&a.stop(...e))},"Stop Display"),(0,o._)("button",{onClick:t[2]||(t[2]=(...e)=>a.record&&a.record(...e))},"Start Recording"),(0,o._)("button",{onClick:t[3]||(t[3]=(...e)=>a.deldata&&a.deldata(...e))},"Delete Recording"),D],64)}r(7658);var T=r(9730),x=r.n(T),H=r(8251),M=r.n(H),B={name:"FourierWave",props:{msg:String,url:{type:String,required:!0}},data(){return{isRecording:!1,mediaRecorder:null,wavesurfer:null,chunks:[]}},mounted(){},methods:{start(){const e={container:"#waveform",waveColor:"Black",interact:!1,barHeight:5,barWidth:2,barRadius:1,plugins:[M().create()]};this.wavesurfer=x().create(e),this.wavesurfer.microphone.on("deviceReady",(function(e){console.log("Device ready!",e)})),this.wavesurfer.microphone.on("deviceError",(function(e){console.warn("Device error: "+e)})),this.wavesurfer.microphone.start()},stop(){this.wavesurfer.destroy()},record:async function(){navigator.mediaDevices.getUserMedia({audio:!0}).then((e=>{this.mediaRecorder=new MediaRecorder(e),this.mediaRecorder.start(),this.chunks=[],this.mediaRecorder.addEventListener("dataavailable",(e=>{this.chunks.push(e.data),console.log("Push Event completed")})),this.mediaRecorder.addEventListener("stop",(()=>{const e=new Blob(this.chunks,{type:"audio/ogg; codecs=opus"});this.createWaveform(e)})),this.isRecording=!0})).catch((e=>{console.error(e)})),setTimeout((()=>{this.stopRecording()}),2e3)},async stopRecording(){this.isRecording=!1,await this.mediaRecorder.stop()},createWaveform(e){const t={container:"#waveform",waveColor:"Blue",progressColor:"purple",cursorColor:"navy",barHeight:5,barWidth:2,barRadius:1,height:200};this.wavesurfer=x().create(t),this.wavesurfer.loadBlob(e),console.log(this.wavesurfer.backend.buffer)},deldata(){}}};const L=(0,h.Z)(B,[["render",A],["__scopeId","data-v-02c9c0d8"]]);var F=L;const N=[{path:"/",name:"home",component:P},{path:"/fourierwave",name:"fourierwave",component:F},{path:"/about",name:"about",component:()=>r.e(443).then(r.bind(r,8320))}],V=(0,O.p7)({history:(0,O.PO)(""),routes:N});var Z=V,q=(r(9773),r(8727)),U=(r(8556),r(2250)),I=r(8600);const Y=(0,q.Rd)({components:U,directives:I,icons:{iconfont:"mdi"}});k(),(0,n.ri)(_).use(Z).use(Y).mount("#app")}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}r.m=e,function(){var e=[];r.O=function(t,n,o,i){if(!n){var a=1/0;for(d=0;d<e.length;d++){n=e[d][0],o=e[d][1],i=e[d][2];for(var u=!0,c=0;c<n.length;c++)(!1&i||a>=i)&&Object.keys(r.O).every((function(e){return r.O[e](n[c])}))?n.splice(c--,1):(u=!1,i<a&&(a=i));if(u){e.splice(d--,1);var s=o();void 0!==s&&(t=s)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[n,o,i]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};r.t=function(n,o){if(1&o&&(n=this(n)),8&o)return n;if("object"===typeof n&&n){if(4&o&&n.__esModule)return n;if(16&o&&"function"===typeof n.then)return n}var i=Object.create(null);r.r(i);var a={};e=e||[null,t({}),t([]),t(t)];for(var u=2&o&&n;"object"==typeof u&&!~e.indexOf(u);u=t(u))Object.getOwnPropertyNames(u).forEach((function(e){a[e]=function(){return n[e]}}));return a["default"]=function(){return n},r.d(i,a),i}}(),function(){r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){r.f={},r.e=function(e){return Promise.all(Object.keys(r.f).reduce((function(t,n){return r.f[n](e,t),t}),[]))}}(),function(){r.u=function(e){return"js/"+{443:"about",461:"webfontloader"}[e]+"."+{443:"bb6d792e",461:"3ca33f85"}[e]+".js"}}(),function(){r.miniCssF=function(e){}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="vuetest1:";r.l=function(n,o,i,a){if(e[n])e[n].push(o);else{var u,c;if(void 0!==i)for(var s=document.getElementsByTagName("script"),d=0;d<s.length;d++){var l=s[d];if(l.getAttribute("src")==n||l.getAttribute("data-webpack")==t+i){u=l;break}}u||(c=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,r.nc&&u.setAttribute("nonce",r.nc),u.setAttribute("data-webpack",t+i),u.src=n),e[n]=[o];var f=function(t,r){u.onerror=u.onload=null,clearTimeout(p);var o=e[n];if(delete e[n],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((function(e){return e(r)})),t)return t(r)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=f.bind(null,u.onerror),u.onload=f.bind(null,u.onload),c&&document.head.appendChild(u)}}}(),function(){r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){r.p=""}(),function(){var e={143:0};r.f.j=function(t,n){var o=r.o(e,t)?e[t]:void 0;if(0!==o)if(o)n.push(o[2]);else{var i=new Promise((function(r,n){o=e[t]=[r,n]}));n.push(o[2]=i);var a=r.p+r.u(t),u=new Error,c=function(n){if(r.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var i=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;u.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",u.name="ChunkLoadError",u.type=i,u.request=a,o[1](u)}};r.l(a,c,"chunk-"+t,t)}},r.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,i,a=n[0],u=n[1],c=n[2],s=0;if(a.some((function(t){return 0!==e[t]}))){for(o in u)r.o(u,o)&&(r.m[o]=u[o]);if(c)var d=c(r)}for(t&&t(n);s<a.length;s++)i=a[s],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(d)},n=self["webpackChunkvuetest1"]=self["webpackChunkvuetest1"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=r.O(void 0,[998],(function(){return r(4136)}));n=r.O(n)})();
//# sourceMappingURL=app.75d471fc.js.map