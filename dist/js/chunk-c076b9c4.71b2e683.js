(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c076b9c4"],{"0182":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-row",[r("el-col",[r("el-row",{staticClass:"marginTop"},[r("el-col",[r("span",[t._v("Please select the organization you want to manage")])])],1),r("el-row",{staticClass:"marginTop"},[r("el-col",[r("el-select",{staticStyle:{width:"15rem"},attrs:{clearable:"",filterable:"",placeholder:"select"},on:{change:t.changeOrg},model:{value:t.orgValue,callback:function(e){t.orgValue=e},expression:"orgValue"}},t._l(t.orgData,(function(t){return r("el-option",{key:t.value,attrs:{value:t.value,label:t.label}})})),1)],1)],1),r("el-row",{staticClass:"marginTop"},[r("el-col",[r("el-button",{staticStyle:{width:"15rem"},attrs:{type:"primary",size:"medium"},on:{click:t.submit}},[t._v("SUBMIT")])],1)],1)],1)],1)},o=[],i=(r("99af"),r("4160"),r("159b"),r("5530")),c=r("2f62"),a={name:"OrgSelect",computed:{orgData:function(){var t=[];return this.$store.state.loginInfo.userInfo.forEach((function(e,r){e.repo_id?t.push({value:r,label:"".concat(e.org_id,"/").concat(e.repo_id)}):t.push({value:r,label:e.org_id})})),t}},data:function(){return{orgValue:""}},methods:Object(i["a"])(Object(i["a"])({},Object(c["b"])(["setLoginInfoAct"])),{},{changeOrg:function(t){console.log(t)},submit:function(){var t=JSON.parse(JSON.stringify(this.$store.state.loginInfo));Object.assign(t,{orgValue:this.orgValue}),console.log(t),this.setLoginInfoAct(t),console.log(t),"admin"===t.userInfo[this.orgValue].role?this.$router.push("/rootManager"):this.$router.push("/signedRepo")}})},u=a,f=(r("7ac3"),r("2877")),s=Object(f["a"])(u,n,o,!1,null,"3c389a44",null);e["default"]=s.exports},"057f":function(t,e,r){var n=r("fc6a"),o=r("241c").f,i={}.toString,c="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return o(t)}catch(e){return c.slice()}};t.exports.f=function(t){return c&&"[object Window]"==i.call(t)?a(t):o(n(t))}},"4de4":function(t,e,r){"use strict";var n=r("23e7"),o=r("b727").filter,i=r("1dde"),c=r("ae40"),a=i("filter"),u=c("filter");n({target:"Array",proto:!0,forced:!a||!u},{filter:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},5530:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b");var n=r("ade3");function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){Object(n["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}},"746f":function(t,e,r){var n=r("428f"),o=r("5135"),i=r("e538"),c=r("9bf2").f;t.exports=function(t){var e=n.Symbol||(n.Symbol={});o(e,t)||c(e,t,{value:i.f(t)})}},"7ac3":function(t,e,r){"use strict";var n=r("b0c7"),o=r.n(n);o.a},a4d3:function(t,e,r){"use strict";var n=r("23e7"),o=r("da84"),i=r("d066"),c=r("c430"),a=r("83ab"),u=r("4930"),f=r("fdbf"),s=r("d039"),l=r("5135"),b=r("e8b5"),g=r("861d"),p=r("825a"),d=r("7b0b"),h=r("fc6a"),y=r("c04e"),v=r("5c6c"),O=r("7c73"),m=r("df75"),w=r("241c"),j=r("057f"),S=r("7418"),P=r("06cf"),k=r("9bf2"),D=r("d1e7"),_=r("9112"),E=r("6eeb"),I=r("5692"),N=r("f772"),V=r("d012"),J=r("90e3"),T=r("b622"),$=r("e538"),x=r("746f"),C=r("d44e"),A=r("69f3"),z=r("b727").forEach,F=N("hidden"),L="Symbol",M="prototype",B=T("toPrimitive"),Q=A.set,R=A.getterFor(L),U=Object[M],W=o.Symbol,q=i("JSON","stringify"),G=P.f,H=k.f,K=j.f,X=D.f,Y=I("symbols"),Z=I("op-symbols"),tt=I("string-to-symbol-registry"),et=I("symbol-to-string-registry"),rt=I("wks"),nt=o.QObject,ot=!nt||!nt[M]||!nt[M].findChild,it=a&&s((function(){return 7!=O(H({},"a",{get:function(){return H(this,"a",{value:7}).a}})).a}))?function(t,e,r){var n=G(U,e);n&&delete U[e],H(t,e,r),n&&t!==U&&H(U,e,n)}:H,ct=function(t,e){var r=Y[t]=O(W[M]);return Q(r,{type:L,tag:t,description:e}),a||(r.description=e),r},at=f?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof W},ut=function(t,e,r){t===U&&ut(Z,e,r),p(t);var n=y(e,!0);return p(r),l(Y,n)?(r.enumerable?(l(t,F)&&t[F][n]&&(t[F][n]=!1),r=O(r,{enumerable:v(0,!1)})):(l(t,F)||H(t,F,v(1,{})),t[F][n]=!0),it(t,n,r)):H(t,n,r)},ft=function(t,e){p(t);var r=h(e),n=m(r).concat(pt(r));return z(n,(function(e){a&&!lt.call(r,e)||ut(t,e,r[e])})),t},st=function(t,e){return void 0===e?O(t):ft(O(t),e)},lt=function(t){var e=y(t,!0),r=X.call(this,e);return!(this===U&&l(Y,e)&&!l(Z,e))&&(!(r||!l(this,e)||!l(Y,e)||l(this,F)&&this[F][e])||r)},bt=function(t,e){var r=h(t),n=y(e,!0);if(r!==U||!l(Y,n)||l(Z,n)){var o=G(r,n);return!o||!l(Y,n)||l(r,F)&&r[F][n]||(o.enumerable=!0),o}},gt=function(t){var e=K(h(t)),r=[];return z(e,(function(t){l(Y,t)||l(V,t)||r.push(t)})),r},pt=function(t){var e=t===U,r=K(e?Z:h(t)),n=[];return z(r,(function(t){!l(Y,t)||e&&!l(U,t)||n.push(Y[t])})),n};if(u||(W=function(){if(this instanceof W)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=J(t),r=function(t){this===U&&r.call(Z,t),l(this,F)&&l(this[F],e)&&(this[F][e]=!1),it(this,e,v(1,t))};return a&&ot&&it(U,e,{configurable:!0,set:r}),ct(e,t)},E(W[M],"toString",(function(){return R(this).tag})),E(W,"withoutSetter",(function(t){return ct(J(t),t)})),D.f=lt,k.f=ut,P.f=bt,w.f=j.f=gt,S.f=pt,$.f=function(t){return ct(T(t),t)},a&&(H(W[M],"description",{configurable:!0,get:function(){return R(this).description}}),c||E(U,"propertyIsEnumerable",lt,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!u,sham:!u},{Symbol:W}),z(m(rt),(function(t){x(t)})),n({target:L,stat:!0,forced:!u},{for:function(t){var e=String(t);if(l(tt,e))return tt[e];var r=W(e);return tt[e]=r,et[r]=e,r},keyFor:function(t){if(!at(t))throw TypeError(t+" is not a symbol");if(l(et,t))return et[t]},useSetter:function(){ot=!0},useSimple:function(){ot=!1}}),n({target:"Object",stat:!0,forced:!u,sham:!a},{create:st,defineProperty:ut,defineProperties:ft,getOwnPropertyDescriptor:bt}),n({target:"Object",stat:!0,forced:!u},{getOwnPropertyNames:gt,getOwnPropertySymbols:pt}),n({target:"Object",stat:!0,forced:s((function(){S.f(1)}))},{getOwnPropertySymbols:function(t){return S.f(d(t))}}),q){var dt=!u||s((function(){var t=W();return"[null]"!=q([t])||"{}"!=q({a:t})||"{}"!=q(Object(t))}));n({target:"JSON",stat:!0,forced:dt},{stringify:function(t,e,r){var n,o=[t],i=1;while(arguments.length>i)o.push(arguments[i++]);if(n=e,(g(e)||void 0!==t)&&!at(t))return b(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!at(e))return e}),o[1]=e,q.apply(null,o)}})}W[M][B]||_(W[M],B,W[M].valueOf),C(W,L),V[F]=!0},ade3:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},b0c7:function(t,e,r){},b64b:function(t,e,r){var n=r("23e7"),o=r("7b0b"),i=r("df75"),c=r("d039"),a=c((function(){i(1)}));n({target:"Object",stat:!0,forced:a},{keys:function(t){return i(o(t))}})},dbb4:function(t,e,r){var n=r("23e7"),o=r("83ab"),i=r("56ef"),c=r("fc6a"),a=r("06cf"),u=r("8418");n({target:"Object",stat:!0,sham:!o},{getOwnPropertyDescriptors:function(t){var e,r,n=c(t),o=a.f,f=i(n),s={},l=0;while(f.length>l)r=o(n,e=f[l++]),void 0!==r&&u(s,e,r);return s}})},e439:function(t,e,r){var n=r("23e7"),o=r("d039"),i=r("fc6a"),c=r("06cf").f,a=r("83ab"),u=o((function(){c(1)})),f=!a||u;n({target:"Object",stat:!0,forced:f,sham:!a},{getOwnPropertyDescriptor:function(t,e){return c(i(t),e)}})},e538:function(t,e,r){var n=r("b622");e.f=n}}]);
//# sourceMappingURL=chunk-c076b9c4.71b2e683.js.map