(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4686c7e2"],{"057f":function(t,e,n){var r=n("fc6a"),i=n("241c").f,o={}.toString,c="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return i(t)}catch(e){return c.slice()}};t.exports.f=function(t){return c&&"[object Window]"==o.call(t)?a(t):i(r(t))}},1276:function(t,e,n){"use strict";var r=n("d784"),i=n("44e7"),o=n("825a"),c=n("1d80"),a=n("4840"),u=n("8aa5"),s=n("50c4"),l=n("14c3"),f=n("9263"),p=n("d039"),d=[].push,h=Math.min,g=4294967295,b=!p((function(){return!RegExp(g,"y")}));r("split",2,(function(t,e,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var r=String(c(this)),o=void 0===n?g:n>>>0;if(0===o)return[];if(void 0===t)return[r];if(!i(t))return e.call(r,t,o);var a,u,s,l=[],p=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),h=0,b=new RegExp(t.source,p+"g");while(a=f.call(b,r)){if(u=b.lastIndex,u>h&&(l.push(r.slice(h,a.index)),a.length>1&&a.index<r.length&&d.apply(l,a.slice(1)),s=a[0].length,h=u,l.length>=o))break;b.lastIndex===a.index&&b.lastIndex++}return h===r.length?!s&&b.test("")||l.push(""):l.push(r.slice(h)),l.length>o?l.slice(0,o):l}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:e.call(this,t,n)}:e,[function(e,n){var i=c(this),o=void 0==e?void 0:e[t];return void 0!==o?o.call(e,i,n):r.call(String(i),e,n)},function(t,i){var c=n(r,t,this,i,r!==e);if(c.done)return c.value;var f=o(t),p=String(this),d=a(f,RegExp),v=f.unicode,y=(f.ignoreCase?"i":"")+(f.multiline?"m":"")+(f.unicode?"u":"")+(b?"y":"g"),m=new d(b?f:"^(?:"+f.source+")",y),x=void 0===i?g:i>>>0;if(0===x)return[];if(0===p.length)return null===l(m,p)?[p]:[];var w=0,O=0,E=[];while(O<p.length){m.lastIndex=b?O:0;var S,j=l(m,b?p:p.slice(O));if(null===j||(S=h(s(m.lastIndex+(b?0:O)),p.length))===w)O=u(p,O,v);else{if(E.push(p.slice(w,O)),E.length===x)return E;for(var P=1;P<=j.length-1;P++)if(E.push(j[P]),E.length===x)return E;O=w=S}}return E.push(p.slice(w)),E}]}),!b)},"14c3":function(t,e,n){var r=n("c6b6"),i=n("9263");t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var o=n.call(t,e);if("object"!==typeof o)throw TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==r(t))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},"156c":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-row",{staticClass:"signType",staticStyle:{height:"100%"}},[n("el-col",{staticStyle:{height:"100%"}},[n("el-row",{staticStyle:{height:"50%"}}),n("el-row",{staticStyle:{height:"50%"}},[n("el-col",{staticClass:"buttonBox",attrs:{align:"right"}},[n("div",[n("div",[n("button",{staticClass:"button",on:{click:function(e){return t.submit("individual")}}},[t._v(" Individual ")])]),n("div",[n("button",{staticClass:"button",on:{click:function(e){return t.submit("corporation")}}},[t._v(" Corporation ")])]),n("button",{staticClass:"button",on:{click:function(e){return t.submit("employee")}}},[t._v(" Employee ")])])])],1)],1)],1)},i=[],o=(n("99af"),n("ac1f"),n("1276"),n("5530")),c=n("221d"),a=n("2f62"),u={name:"SignType",data:function(){return{platform:"",org:"",repo:""}},methods:Object(o["a"])(Object(o["a"])({},Object(a["b"])(["setTokenAct","setLoginTypeAct","setRepoInfoAct"])),{},{getRepoInfo:function(){var t=window.location.href.split("/sign/")[1].split("/");this.platform=t[0],this.org=t[1],t[2]?this.repo=t[2]:this.repo="",this.setRepoInfoAct({platform:this.platform,org_id:this.org,repo_id:this.repo})},submit:function(t){this.setLoginTypeAct(t),"gitee"===this.platform?"individual"===t||"employee"===t?this.$axios({url:"/api".concat(c["getAuthCodeUrl"],"/").concat(this.platform,"/sign")}).then((function(t){window.location.href=t.data.data.url})).catch((function(t){})):this.$router.push("/sign-cla"):"github"===this.platform&&("individual"===this.$store.state.loginType||"employee"===this.$store.state.loginType?window.location.href="https://github.com/login/oauth/authorize?client_id=d86f4915398dad23bffc&redirect_uri=http://localhost:8080/home&scope=user,user:email":this.$router.push("/signCla"))}}),created:function(){this.getRepoInfo()}},s=u,l=(n("48e3"),n("2877")),f=Object(l["a"])(s,r,i,!1,null,"ada7c564",null);e["default"]=f.exports},"44e7":function(t,e,n){var r=n("861d"),i=n("c6b6"),o=n("b622"),c=o("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[c])?!!e:"RegExp"==i(t))}},"48e3":function(t,e,n){"use strict";var r=n("a696"),i=n.n(r);i.a},"4de4":function(t,e,n){"use strict";var r=n("23e7"),i=n("b727").filter,o=n("1dde"),c=n("ae40"),a=o("filter"),u=c("filter");r({target:"Array",proto:!0,forced:!a||!u},{filter:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},5530:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n("a4d3"),n("4de4"),n("4160"),n("e439"),n("dbb4"),n("b64b"),n("159b");var r=n("ade3");function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){Object(r["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}},6547:function(t,e,n){var r=n("a691"),i=n("1d80"),o=function(t){return function(e,n){var o,c,a=String(i(e)),u=r(n),s=a.length;return u<0||u>=s?t?"":void 0:(o=a.charCodeAt(u),o<55296||o>56319||u+1===s||(c=a.charCodeAt(u+1))<56320||c>57343?t?a.charAt(u):o:t?a.slice(u,u+2):c-56320+(o-55296<<10)+65536)}};t.exports={codeAt:o(!1),charAt:o(!0)}},"746f":function(t,e,n){var r=n("428f"),i=n("5135"),o=n("e538"),c=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});i(e,t)||c(e,t,{value:o.f(t)})}},"8aa5":function(t,e,n){"use strict";var r=n("6547").charAt;t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},9263:function(t,e,n){"use strict";var r=n("ad6d"),i=n("9f7f"),o=RegExp.prototype.exec,c=String.prototype.replace,a=o,u=function(){var t=/a/,e=/b*/g;return o.call(t,"a"),o.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),s=i.UNSUPPORTED_Y||i.BROKEN_CARET,l=void 0!==/()??/.exec("")[1],f=u||l||s;f&&(a=function(t){var e,n,i,a,f=this,p=s&&f.sticky,d=r.call(f),h=f.source,g=0,b=t;return p&&(d=d.replace("y",""),-1===d.indexOf("g")&&(d+="g"),b=String(t).slice(f.lastIndex),f.lastIndex>0&&(!f.multiline||f.multiline&&"\n"!==t[f.lastIndex-1])&&(h="(?: "+h+")",b=" "+b,g++),n=new RegExp("^(?:"+h+")",d)),l&&(n=new RegExp("^"+h+"$(?!\\s)",d)),u&&(e=f.lastIndex),i=o.call(p?n:f,b),p?i?(i.input=i.input.slice(g),i[0]=i[0].slice(g),i.index=f.lastIndex,f.lastIndex+=i[0].length):f.lastIndex=0:u&&i&&(f.lastIndex=f.global?i.index+i[0].length:e),l&&i&&i.length>1&&c.call(i[0],n,(function(){for(a=1;a<arguments.length-2;a++)void 0===arguments[a]&&(i[a]=void 0)})),i}),t.exports=a},"9f7f":function(t,e,n){"use strict";var r=n("d039");function i(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=r((function(){var t=i("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=r((function(){var t=i("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a4d3:function(t,e,n){"use strict";var r=n("23e7"),i=n("da84"),o=n("d066"),c=n("c430"),a=n("83ab"),u=n("4930"),s=n("fdbf"),l=n("d039"),f=n("5135"),p=n("e8b5"),d=n("861d"),h=n("825a"),g=n("7b0b"),b=n("fc6a"),v=n("c04e"),y=n("5c6c"),m=n("7c73"),x=n("df75"),w=n("241c"),O=n("057f"),E=n("7418"),S=n("06cf"),j=n("9bf2"),P=n("d1e7"),R=n("9112"),I=n("6eeb"),A=n("5692"),C=n("f772"),T=n("d012"),_=n("90e3"),k=n("b622"),$=n("e538"),D=n("746f"),N=n("d44e"),U=n("69f3"),B=n("b727").forEach,J=C("hidden"),L="Symbol",F="prototype",K=k("toPrimitive"),Y=U.set,z=U.getterFor(L),G=Object[F],M=i.Symbol,Q=o("JSON","stringify"),W=S.f,X=j.f,q=O.f,H=P.f,V=A("symbols"),Z=A("op-symbols"),tt=A("string-to-symbol-registry"),et=A("symbol-to-string-registry"),nt=A("wks"),rt=i.QObject,it=!rt||!rt[F]||!rt[F].findChild,ot=a&&l((function(){return 7!=m(X({},"a",{get:function(){return X(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=W(G,e);r&&delete G[e],X(t,e,n),r&&t!==G&&X(G,e,r)}:X,ct=function(t,e){var n=V[t]=m(M[F]);return Y(n,{type:L,tag:t,description:e}),a||(n.description=e),n},at=s?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof M},ut=function(t,e,n){t===G&&ut(Z,e,n),h(t);var r=v(e,!0);return h(n),f(V,r)?(n.enumerable?(f(t,J)&&t[J][r]&&(t[J][r]=!1),n=m(n,{enumerable:y(0,!1)})):(f(t,J)||X(t,J,y(1,{})),t[J][r]=!0),ot(t,r,n)):X(t,r,n)},st=function(t,e){h(t);var n=b(e),r=x(n).concat(ht(n));return B(r,(function(e){a&&!ft.call(n,e)||ut(t,e,n[e])})),t},lt=function(t,e){return void 0===e?m(t):st(m(t),e)},ft=function(t){var e=v(t,!0),n=H.call(this,e);return!(this===G&&f(V,e)&&!f(Z,e))&&(!(n||!f(this,e)||!f(V,e)||f(this,J)&&this[J][e])||n)},pt=function(t,e){var n=b(t),r=v(e,!0);if(n!==G||!f(V,r)||f(Z,r)){var i=W(n,r);return!i||!f(V,r)||f(n,J)&&n[J][r]||(i.enumerable=!0),i}},dt=function(t){var e=q(b(t)),n=[];return B(e,(function(t){f(V,t)||f(T,t)||n.push(t)})),n},ht=function(t){var e=t===G,n=q(e?Z:b(t)),r=[];return B(n,(function(t){!f(V,t)||e&&!f(G,t)||r.push(V[t])})),r};if(u||(M=function(){if(this instanceof M)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=_(t),n=function(t){this===G&&n.call(Z,t),f(this,J)&&f(this[J],e)&&(this[J][e]=!1),ot(this,e,y(1,t))};return a&&it&&ot(G,e,{configurable:!0,set:n}),ct(e,t)},I(M[F],"toString",(function(){return z(this).tag})),I(M,"withoutSetter",(function(t){return ct(_(t),t)})),P.f=ft,j.f=ut,S.f=pt,w.f=O.f=dt,E.f=ht,$.f=function(t){return ct(k(t),t)},a&&(X(M[F],"description",{configurable:!0,get:function(){return z(this).description}}),c||I(G,"propertyIsEnumerable",ft,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!u,sham:!u},{Symbol:M}),B(x(nt),(function(t){D(t)})),r({target:L,stat:!0,forced:!u},{for:function(t){var e=String(t);if(f(tt,e))return tt[e];var n=M(e);return tt[e]=n,et[n]=e,n},keyFor:function(t){if(!at(t))throw TypeError(t+" is not a symbol");if(f(et,t))return et[t]},useSetter:function(){it=!0},useSimple:function(){it=!1}}),r({target:"Object",stat:!0,forced:!u,sham:!a},{create:lt,defineProperty:ut,defineProperties:st,getOwnPropertyDescriptor:pt}),r({target:"Object",stat:!0,forced:!u},{getOwnPropertyNames:dt,getOwnPropertySymbols:ht}),r({target:"Object",stat:!0,forced:l((function(){E.f(1)}))},{getOwnPropertySymbols:function(t){return E.f(g(t))}}),Q){var gt=!u||l((function(){var t=M();return"[null]"!=Q([t])||"{}"!=Q({a:t})||"{}"!=Q(Object(t))}));r({target:"JSON",stat:!0,forced:gt},{stringify:function(t,e,n){var r,i=[t],o=1;while(arguments.length>o)i.push(arguments[o++]);if(r=e,(d(e)||void 0!==t)&&!at(t))return p(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!at(e))return e}),i[1]=e,Q.apply(null,i)}})}M[F][K]||R(M[F],K,M[F].valueOf),N(M,L),T[J]=!0},a696:function(t,e,n){},ac1f:function(t,e,n){"use strict";var r=n("23e7"),i=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},ad6d:function(t,e,n){"use strict";var r=n("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},ade3:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return r}))},b64b:function(t,e,n){var r=n("23e7"),i=n("7b0b"),o=n("df75"),c=n("d039"),a=c((function(){o(1)}));r({target:"Object",stat:!0,forced:a},{keys:function(t){return o(i(t))}})},d784:function(t,e,n){"use strict";n("ac1f");var r=n("6eeb"),i=n("d039"),o=n("b622"),c=n("9263"),a=n("9112"),u=o("species"),s=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),l=function(){return"$0"==="a".replace(/./,"$0")}(),f=o("replace"),p=function(){return!!/./[f]&&""===/./[f]("a","$0")}(),d=!i((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));t.exports=function(t,e,n,f){var h=o(t),g=!i((function(){var e={};return e[h]=function(){return 7},7!=""[t](e)})),b=g&&!i((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[u]=function(){return n},n.flags="",n[h]=/./[h]),n.exec=function(){return e=!0,null},n[h](""),!e}));if(!g||!b||"replace"===t&&(!s||!l||p)||"split"===t&&!d){var v=/./[h],y=n(h,""[t],(function(t,e,n,r,i){return e.exec===c?g&&!i?{done:!0,value:v.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}),{REPLACE_KEEPS_$0:l,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:p}),m=y[0],x=y[1];r(String.prototype,t,m),r(RegExp.prototype,h,2==e?function(t,e){return x.call(t,this,e)}:function(t){return x.call(t,this)})}f&&a(RegExp.prototype[h],"sham",!0)}},dbb4:function(t,e,n){var r=n("23e7"),i=n("83ab"),o=n("56ef"),c=n("fc6a"),a=n("06cf"),u=n("8418");r({target:"Object",stat:!0,sham:!i},{getOwnPropertyDescriptors:function(t){var e,n,r=c(t),i=a.f,s=o(r),l={},f=0;while(s.length>f)n=i(r,e=s[f++]),void 0!==n&&u(l,e,n);return l}})},e439:function(t,e,n){var r=n("23e7"),i=n("d039"),o=n("fc6a"),c=n("06cf").f,a=n("83ab"),u=i((function(){c(1)})),s=!a||u;r({target:"Object",stat:!0,forced:s,sham:!a},{getOwnPropertyDescriptor:function(t,e){return c(o(t),e)}})},e538:function(t,e,n){var r=n("b622");e.f=r}}]);
//# sourceMappingURL=chunk-4686c7e2.197574d1.js.map