(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-394c788c"],{"0418":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header"},[a("el-col",{attrs:{span:8}},[a("div",{staticStyle:{display:"flex"}},[a("img",{staticClass:"pointer",staticStyle:{width:"2rem"},attrs:{src:this.$store.state.user.userImg,alt:""},on:{click:function(e){return t.newWindow()}}}),a("div",{staticStyle:{display:"flex","flex-direction":"column","justify-content":"center","margin-left":".5rem"}},[a("span",[t._v("Hi, "),a("span",{staticClass:"pointer",staticStyle:{"font-weight":"bold"}},[t._v(t._s(this.$store.state.user.userName)+"!")])])])])]),a("el-col",{attrs:{span:8}},[a("div",[a("svg-icon",{staticClass:"pointer",staticStyle:{height:"100%",width:"3rem"},attrs:{id:"svg_logo","icon-class":"CLA_SYSTEM_BLACK"},on:{click:function(e){return t.toHome()}}})],1)]),a("el-col",{attrs:{span:8}},[a("div",[a("el-tooltip",{attrs:{effect:"dark",content:"Login out",placement:"left"}},[a("svg-icon",{staticClass:"pointer",attrs:{id:"svg_loginOut","icon-class":"loginOut"},on:{click:function(e){return t.loginOut()}}})],1)],1)])],1)},i=[],r={name:"Header",computed:{},data:function(){return{}},created:function(){},methods:{toHome:function(){this.$router.push("/home")},loginOut:function(){sessionStorage.clear(),this.$router.push("/")},newWindow:function(){window.open("https://github.com/ouchengle")}}},o=r,s=(a("0454"),a("2877")),l=Object(s["a"])(o,n,i,!1,null,"b41ab18a",null);e["a"]=l.exports},"0454":function(t,e,a){"use strict";var n=a("3414"),i=a.n(n);i.a},"057f":function(t,e,a){var n=a("fc6a"),i=a("241c").f,r={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return i(t)}catch(e){return o.slice()}};t.exports.f=function(t){return o&&"[object Window]"==r.call(t)?s(t):i(n(t))}},"14c3":function(t,e,a){var n=a("c6b6"),i=a("9263");t.exports=function(t,e){var a=t.exec;if("function"===typeof a){var r=a.call(t,e);if("object"!==typeof r)throw TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==n(t))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},3414:function(t,e,a){},"498a":function(t,e,a){"use strict";var n=a("23e7"),i=a("58a8").trim,r=a("c8d2");n({target:"String",proto:!0,forced:r("trim")},{trim:function(){return i(this)}})},5319:function(t,e,a){"use strict";var n=a("d784"),i=a("825a"),r=a("7b0b"),o=a("50c4"),s=a("a691"),l=a("1d80"),c=a("8aa5"),u=a("14c3"),d=Math.max,f=Math.min,p=Math.floor,h=/\$([$&'`]|\d\d?|<[^>]*>)/g,m=/\$([$&'`]|\d\d?)/g,g=function(t){return void 0===t?t:String(t)};n("replace",2,(function(t,e,a,n){var v=n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,y=n.REPLACE_KEEPS_$0,b=v?"$":"$0";return[function(a,n){var i=l(this),r=void 0==a?void 0:a[t];return void 0!==r?r.call(a,i,n):e.call(String(i),a,n)},function(t,n){if(!v&&y||"string"===typeof n&&-1===n.indexOf(b)){var r=a(e,t,this,n);if(r.done)return r.value}var l=i(t),p=String(this),h="function"===typeof n;h||(n=String(n));var m=l.global;if(m){var C=l.unicode;l.lastIndex=0}var w=[];while(1){var A=u(l,p);if(null===A)break;if(w.push(A),!m)break;var E=String(A[0]);""===E&&(l.lastIndex=c(p,o(l.lastIndex),C))}for(var S="",k=0,T=0;T<w.length;T++){A=w[T];for(var _=String(A[0]),O=d(f(s(A.index),p.length),0),N=[],$=1;$<A.length;$++)N.push(g(A[$]));var M=A.groups;if(h){var R=[_].concat(N,O,p);void 0!==M&&R.push(M);var I=String(n.apply(void 0,R))}else I=x(_,p,O,N,M,n);O>=k&&(S+=p.slice(k,O)+I,k=O+_.length)}return S+p.slice(k)}];function x(t,a,n,i,o,s){var l=n+t.length,c=i.length,u=m;return void 0!==o&&(o=r(o),u=h),e.call(s,u,(function(e,r){var s;switch(r.charAt(0)){case"$":return"$";case"&":return t;case"`":return a.slice(0,n);case"'":return a.slice(l);case"<":s=o[r.slice(1,-1)];break;default:var u=+r;if(0===u)return e;if(u>c){var d=p(u/10);return 0===d?e:d<=c?void 0===i[d-1]?r.charAt(1):i[d-1]+r.charAt(1):e}s=i[u-1]}return void 0===s?"":s}))}}))},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,a){var n=a("1d80"),i=a("5899"),r="["+i+"]",o=RegExp("^"+r+r+"*"),s=RegExp(r+r+"*$"),l=function(t){return function(e){var a=String(n(e));return 1&t&&(a=a.replace(o,"")),2&t&&(a=a.replace(s,"")),a}};t.exports={start:l(1),end:l(2),trim:l(3)}},"615a":function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));var n=function(){return window.innerHeight}},6547:function(t,e,a){var n=a("a691"),i=a("1d80"),r=function(t){return function(e,a){var r,o,s=String(i(e)),l=n(a),c=s.length;return l<0||l>=c?t?"":void 0:(r=s.charCodeAt(l),r<55296||r>56319||l+1===c||(o=s.charCodeAt(l+1))<56320||o>57343?t?s.charAt(l):r:t?s.slice(l,l+2):o-56320+(r-55296<<10)+65536)}};t.exports={codeAt:r(!1),charAt:r(!0)}},"746f":function(t,e,a){var n=a("428f"),i=a("5135"),r=a("e538"),o=a("9bf2").f;t.exports=function(t){var e=n.Symbol||(n.Symbol={});i(e,t)||o(e,t,{value:r.f(t)})}},"887e":function(t,e,a){"use strict";var n=a("ab2a"),i=a.n(n);i.a},8996:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{style:t.createCLAClass,attrs:{id:"createCLA"}},[a("v-header"),a("div",{attrs:{id:"section"}},[a("el-col",{attrs:{offset:6,span:12}},[a("div",{staticStyle:{display:"flex","justify-content":"space-between",padding:"1rem 0"}},[a("span",[t._v("Edit your CLA")])]),a("div",t._l(t.claTags,(function(e,n){return a("el-tag",{key:e,staticClass:"pointer",attrs:{closable:"","disable-transitions":!1},on:{click:function(e){return t.chooseCla(n)},close:function(a){return t.handleClose(e,n)}}},[t._v(" "+t._s(e)+" ")])})),1),t.addNewFile?a("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[a("el-col",{staticStyle:{"padding-right":"2rem"},attrs:{span:20}},[a("el-input",{staticStyle:{"margin-bottom":"0.5rem"},attrs:{size:"small",placeholder:"please input file name"},model:{value:t.newClaFileName,callback:function(e){t.newClaFileName=e},expression:"newClaFileName"}})],1),a("el-col",{attrs:{span:4,align:"right"}},[a("el-select",{staticStyle:{width:"8rem"},attrs:{size:"small",value:""},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.languageOptions,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1)],1):a("div",[a("el-button",{staticClass:"pointer",attrs:{size:"mini"},on:{click:function(e){return t.clickAddNewClaFile()}}},[t._v("+ add new file")])],1),a("div",[a("el-input",{staticClass:"textAreaClass",attrs:{rows:"15",readonly:!t.isEdit,type:"textarea"},on:{change:t.claTextChange},model:{value:t.claText,callback:function(e){t.claText=e},expression:"claText"}})],1),a("p",[t._v("Edit your metaData "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"The information you want contributors to fill in when they sign the cla.Title and type are required, otherwise the field will fail to be added",placement:"right"}},[a("svg-icon",{attrs:{"icon-class":"bangzhu"}})],1)],1),a("el-row",{staticStyle:{margin:"0 -10px"}},[a("el-col",{staticClass:"typeCol",attrs:{span:5}},[a("el-radio",{attrs:{label:"individual"},on:{change:t.changeRadio},model:{value:t.metadataType,callback:function(e){t.metadataType=e},expression:"metadataType"}},[t._v("Individual Contributor")])],1),a("el-col",{staticClass:"typeCol",attrs:{span:5}},[a("el-radio",{attrs:{label:"corporation"},on:{change:t.changeRadio},model:{value:t.metadataType,callback:function(e){t.metadataType=e},expression:"metadataType"}},[t._v("Legal Entity Contributor")])],1)],1),a("div",[a("div",t._l(t.metadataArr,(function(e,n){return a("el-row",{staticStyle:{padding:"0.5rem 0"},attrs:{type:"flex",align:"middle",gutter:20}},[a("el-col",{attrs:{span:5}},[a("el-input",{attrs:{size:"medium",readonly:""},model:{value:e.title,callback:function(a){t.$set(e,"title",a)},expression:"item.title"}})],1),a("el-col",{attrs:{span:5}},[a("el-input",{attrs:{size:"medium",readonly:""},model:{value:e.type,callback:function(a){t.$set(e,"type",a)},expression:"item.type"}})],1),a("el-col",{attrs:{span:5}},[a("el-input",{attrs:{size:"medium",readonly:""},model:{value:e.description,callback:function(a){t.$set(e,"description",a)},expression:"item.description"}})],1),a("el-col",{staticStyle:{height:"100%"},attrs:{span:5}},[a("el-checkbox",{attrs:{disabled:""},model:{value:e.required,callback:function(a){t.$set(e,"required",a)},expression:"item.required"}},[t._v("required")])],1)],1)})),1),a("div",t._l(t.customMetadataArr,(function(e,n){return a("el-row",{staticStyle:{padding:"0.5rem 0"},attrs:{type:"flex",align:"middle",gutter:20}},[a("el-col",{attrs:{span:5}},[a("el-input",{attrs:{size:"medium",placeholder:"please input title"},model:{value:e.title,callback:function(a){t.$set(e,"title",a)},expression:"item.title"}})],1),a("el-col",{attrs:{span:5}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"select dataType",size:"medium"},model:{value:e.type,callback:function(a){t.$set(e,"type",a)},expression:"item.type"}},t._l(t.dataTypeOptions,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),a("el-col",{staticStyle:{height:"100%"},attrs:{span:5}},[a("el-input",{attrs:{size:"medium",placeholder:"description"},model:{value:e.description,callback:function(a){t.$set(e,"description",a)},expression:"item.description"}})],1),a("el-col",{staticStyle:{height:"100%"},attrs:{span:5}},[a("el-checkbox",{model:{value:e.required,callback:function(a){t.$set(e,"required",a)},expression:"item.required"}},[t._v("required")])],1),a("el-col",{attrs:{span:4}},[a("el-button",{attrs:{size:"medium"},on:{click:function(e){return t.addRow(n)}}},[t._v("+")]),a("el-button",{attrs:{size:"medium"},on:{click:function(e){return t.myDeleteRow(n)}}},[t._v("-")])],1)],1)})),1)]),a("div",{staticStyle:{"margin-top":"1rem",display:"flex","justify-content":"space-between"}},[a("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],attrs:{size:"medium",disabled:!t.verifyNotNull(),type:"primary"},on:{click:function(e){return t.uploadCla()}}},[t._v("create CLA ")])],1)],1)],1),a("v-footer")],1)},i=[],r=(a("a4d3"),a("e01a"),a("99af"),a("4160"),a("c975"),a("a434"),a("b0c0"),a("ac1f"),a("5319"),a("498a"),a("159b"),a("0418")),o=a("fd2d"),s=a("615a"),l=a("221d"),c={name:"CreateCLA",components:{"v-header":r["a"],"v-footer":o["a"]},data:function(){return{metadataArr:[{title:"Name",type:"name",description:"your name",required:!0},{title:"E-Mail",type:"email",description:"your email",required:!0}],metadataType:"individual",customMetadataArr:[{title:"",type:"",description:"",required:!0}],individualCustomMetadataArr:[{title:"",type:"",description:"",required:!0}],corporationCustomMetadataArr:[{title:"",type:"",description:"",required:!0}],dataTypeOptions:[{label:"name",value:"name"},{label:"corporationName",value:"corporationName"},{label:"date",value:"date"},{label:"telephone",value:"telephone"},{label:"address",value:"address"},{label:"email",value:"email"},{label:"fax",value:"fax"}],access_token:this.$store.state.access_token,refresh_token:this.$store.state.refresh_token,platform_token:this.$store.state.platform_token,isAddNewMetaFile:!1,isEditMeta:!1,metaText:"",currentIndex:"",newMetaFileName:"",newClaFileName:"",addNewFile:!1,isEdit:!1,claTags:[],claOptions:[],metaOptions:[{value:0,text:"{userName:{type:string,require:true},email:{type:string,require:true},}"}],fullscreenLoading:!1,claName:"",value:0,languageOptions:[{value:0,label:"english"},{value:1,label:"chinese"},{value:2,label:"japanese"}],claText:"",metaData:"",createCLAClass:{height:""},platform:this.$store.state.platform,user:{userName:this.$store.state.user.userName,userId:this.$store.state.user.userId}}},methods:{changeRadio:function(){"individual"===this.metadataType?(this.metadataArr=[{title:"Name",type:"name",description:"your name",required:!0},{title:"E-Mail",type:"email",description:"your email",required:!0},{title:"Date",type:"date",description:"the date of today",required:!0}],this.customMetadataArr=this.individualCustomMetadataArr):"corporation"===this.metadataType&&(this.metadataArr=[{title:"Corporation Name",type:"corporationName",description:"your corporation email",required:!0},{title:"Name",type:"name",description:"your name",required:!0},{title:"E-Mail",type:"email",description:"your email",required:!0},{title:"Date",type:"date",description:"the date of today",required:!0}],this.customMetadataArr=this.corporationCustomMetadataArr)},addRow:function(t){this.customMetadataArr.splice(t+1,0,{title:"",type:"",description:"",required:!0})},myDeleteRow:function(t){console.log(t),1===this.customMetadataArr.length?(this.customMetadataArr[0].type="",this.customMetadataArr[0].title="",this.customMetadataArr[0].description=""):this.customMetadataArr.splice(t,1)},clickAddNewClaFile:function(){this.addNewFile=!0,this.claText="",this.isEdit=!0,this.newClaFileName=""},chooseCla:function(t){console.log("chooseCla",t),this.claText=this.claOptions[t].text,this.isEdit=!1,this.currentIndex=t,this.addNewFile=!1,this.newClaFileName=this.claTags[t]},handleClose:function(t,e){var a=this;this.$axios({url:"/api".concat(l["delCla"],"/").concat(this.claOptions[e].id),method:"delete",headers:{Token:this.access_token,"Access-Token":this.platform_token,"Refresh-Token":this.refresh_token,User:"".concat(this.platform,"/").concat(this.user.userName)}}).then((function(n){console.log(n),a.claTags.splice(a.claTags.indexOf(t),1),a.currentIndex===e&&(a.claText="",a.currentIndex=""),a.getCLA()})).catch((function(t){console.log(t),a.$message.closeAll(),a.$message.error("Binding relationship already exists, unable to delete")}))},getCLA:function(){var t=this;console.log("getCLA"),this.$axios({url:"/api"+l["getClaInfo"],headers:{Token:this.access_token,"Access-Token":this.platform_token,"Refresh-Token":this.refresh_token,User:"".concat(this.platform,"/").concat(this.user.userName)}}).then((function(e){console.log(e),e.data.length&&(t.claOptions=[],t.claTags=[],e.data.forEach((function(e,a){t.claTags.push(e.name),t.claOptions.push({value:a,label:e.name,id:e.id,text:e.text,language:e.language})})))})).catch((function(t){console.log(t)}))},claTextChange:function(t){console.log(t)},verifyNotNull:function(){return this.addNewFile?""!==this.newClaFileName.trim()&&""!==this.claText.trim():""!==this.claText.trim()},checkMetadata:function(){for(var t=this.customMetadataArr.concat(this.metadataArr),e=0;e<t.length;e++)for(var a=e+1;a<t.length;a++)if(t[e].title===t[a].title)return!1;return!0},uploadCla:function(){var t=this;if(this.checkMetadata()){var e=[];this.metadataArr.forEach((function(t,a){e.push({id:a+"",title:t.title,type:t.type,description:t.description,required:t.required})}));for(var a=0;a<this.customMetadataArr.length;a++)if(""!==this.customMetadataArr[a].title&&""!==this.customMetadataArr[a].type&&e.push({id:this.metadataArr.length+a+"",title:this.customMetadataArr[a].title,type:this.customMetadataArr[a].type,description:this.customMetadataArr[a].description,required:this.customMetadataArr[a].required}),a===this.customMetadataArr.length-1){this.fullscreenLoading=!0;var n={name:this.newClaFileName,text:this.claText,language:this.languageOptions[this.value].label,submitter:"".concat(this.platform,"/").concat(this.user.userName),apply_to:this.metadataType,fields:e};console.log(n),this.$axios({url:"/api"+l["uploadCla"],method:"post",data:n,headers:{Token:this.access_token,"Access-Token":this.platform_token,"Refresh-Token":this.refresh_token,User:"".concat(this.platform,"/").concat(this.user.userName)}}).then((function(e){console.log(e),t.fullscreenLoading=!1,t.$message.success("succeed"),setTimeout((function(){t.$router.replace("/home")}),2e3)})).catch((function(e){console.log(e),t.fullscreenLoading=!1,t.$message.error("failed")}))}}else this.$message.closeAll(),this.$message.error("The title is repeated")},setClientHeight:function(){var t=this;this.$nextTick((function(){console.log(s["a"]()),console.log(document.getElementById("createCLA").offsetHeight),s["a"]()>document.getElementById("createCLA").offsetHeight?t.createCLAClass.height=s["a"]()+"px":t.createCLAClass.height=document.getElementById("createCLA").offsetHeight}))},copy:function(){console.log(this.claText),this.init()},init:function(){var t=this.claText.replace(/\r\n/g,"<br/>").replace(/\n/g,"<br/>").replace(/\s/g," ");console.log(t),this.metaData=t}},created:function(){this.getCLA()},mounted:function(){this.setClientHeight()}};window.onresize=function(){s["a"]()>document.getElementById("createCLA").offsetHeight&&(document.getElementById("createCLA").style.height=s["a"]()+"px")};var u=c,d=(a("887e"),a("2877")),f=Object(d["a"])(u,n,i,!1,null,null,null);e["default"]=f.exports},"8aa5":function(t,e,a){"use strict";var n=a("6547").charAt;t.exports=function(t,e,a){return e+(a?n(t,e).length:1)}},9263:function(t,e,a){"use strict";var n=a("ad6d"),i=a("9f7f"),r=RegExp.prototype.exec,o=String.prototype.replace,s=r,l=function(){var t=/a/,e=/b*/g;return r.call(t,"a"),r.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),c=i.UNSUPPORTED_Y||i.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],d=l||u||c;d&&(s=function(t){var e,a,i,s,d=this,f=c&&d.sticky,p=n.call(d),h=d.source,m=0,g=t;return f&&(p=p.replace("y",""),-1===p.indexOf("g")&&(p+="g"),g=String(t).slice(d.lastIndex),d.lastIndex>0&&(!d.multiline||d.multiline&&"\n"!==t[d.lastIndex-1])&&(h="(?: "+h+")",g=" "+g,m++),a=new RegExp("^(?:"+h+")",p)),u&&(a=new RegExp("^"+h+"$(?!\\s)",p)),l&&(e=d.lastIndex),i=r.call(f?a:d,g),f?i?(i.input=i.input.slice(m),i[0]=i[0].slice(m),i.index=d.lastIndex,d.lastIndex+=i[0].length):d.lastIndex=0:l&&i&&(d.lastIndex=d.global?i.index+i[0].length:e),u&&i&&i.length>1&&o.call(i[0],a,(function(){for(s=1;s<arguments.length-2;s++)void 0===arguments[s]&&(i[s]=void 0)})),i}),t.exports=s},"9f7f":function(t,e,a){"use strict";var n=a("d039");function i(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=n((function(){var t=i("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=n((function(){var t=i("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a434:function(t,e,a){"use strict";var n=a("23e7"),i=a("23cb"),r=a("a691"),o=a("50c4"),s=a("7b0b"),l=a("65f0"),c=a("8418"),u=a("1dde"),d=a("ae40"),f=u("splice"),p=d("splice",{ACCESSORS:!0,0:0,1:2}),h=Math.max,m=Math.min,g=9007199254740991,v="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!f||!p},{splice:function(t,e){var a,n,u,d,f,p,y=s(this),b=o(y.length),x=i(t,b),C=arguments.length;if(0===C?a=n=0:1===C?(a=0,n=b-x):(a=C-2,n=m(h(r(e),0),b-x)),b+a-n>g)throw TypeError(v);for(u=l(y,n),d=0;d<n;d++)f=x+d,f in y&&c(u,d,y[f]);if(u.length=n,a<n){for(d=x;d<b-n;d++)f=d+n,p=d+a,f in y?y[p]=y[f]:delete y[p];for(d=b;d>b-n+a;d--)delete y[d-1]}else if(a>n)for(d=b-n;d>x;d--)f=d+n-1,p=d+a-1,f in y?y[p]=y[f]:delete y[p];for(d=0;d<a;d++)y[d+x]=arguments[d+2];return y.length=b-n+a,u}})},a4d3:function(t,e,a){"use strict";var n=a("23e7"),i=a("da84"),r=a("d066"),o=a("c430"),s=a("83ab"),l=a("4930"),c=a("fdbf"),u=a("d039"),d=a("5135"),f=a("e8b5"),p=a("861d"),h=a("825a"),m=a("7b0b"),g=a("fc6a"),v=a("c04e"),y=a("5c6c"),b=a("7c73"),x=a("df75"),C=a("241c"),w=a("057f"),A=a("7418"),E=a("06cf"),S=a("9bf2"),k=a("d1e7"),T=a("9112"),_=a("6eeb"),O=a("5692"),N=a("f772"),$=a("d012"),M=a("90e3"),R=a("b622"),I=a("e538"),L=a("746f"),q=a("d44e"),P=a("69f3"),F=a("b727").forEach,j=N("hidden"),U="Symbol",z="prototype",D=R("toPrimitive"),H=P.set,B=P.getterFor(U),K=Object[z],W=i.Symbol,J=r("JSON","stringify"),G=E.f,Y=S.f,X=w.f,Q=k.f,V=O("symbols"),Z=O("op-symbols"),tt=O("string-to-symbol-registry"),et=O("symbol-to-string-registry"),at=O("wks"),nt=i.QObject,it=!nt||!nt[z]||!nt[z].findChild,rt=s&&u((function(){return 7!=b(Y({},"a",{get:function(){return Y(this,"a",{value:7}).a}})).a}))?function(t,e,a){var n=G(K,e);n&&delete K[e],Y(t,e,a),n&&t!==K&&Y(K,e,n)}:Y,ot=function(t,e){var a=V[t]=b(W[z]);return H(a,{type:U,tag:t,description:e}),s||(a.description=e),a},st=c?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof W},lt=function(t,e,a){t===K&&lt(Z,e,a),h(t);var n=v(e,!0);return h(a),d(V,n)?(a.enumerable?(d(t,j)&&t[j][n]&&(t[j][n]=!1),a=b(a,{enumerable:y(0,!1)})):(d(t,j)||Y(t,j,y(1,{})),t[j][n]=!0),rt(t,n,a)):Y(t,n,a)},ct=function(t,e){h(t);var a=g(e),n=x(a).concat(ht(a));return F(n,(function(e){s&&!dt.call(a,e)||lt(t,e,a[e])})),t},ut=function(t,e){return void 0===e?b(t):ct(b(t),e)},dt=function(t){var e=v(t,!0),a=Q.call(this,e);return!(this===K&&d(V,e)&&!d(Z,e))&&(!(a||!d(this,e)||!d(V,e)||d(this,j)&&this[j][e])||a)},ft=function(t,e){var a=g(t),n=v(e,!0);if(a!==K||!d(V,n)||d(Z,n)){var i=G(a,n);return!i||!d(V,n)||d(a,j)&&a[j][n]||(i.enumerable=!0),i}},pt=function(t){var e=X(g(t)),a=[];return F(e,(function(t){d(V,t)||d($,t)||a.push(t)})),a},ht=function(t){var e=t===K,a=X(e?Z:g(t)),n=[];return F(a,(function(t){!d(V,t)||e&&!d(K,t)||n.push(V[t])})),n};if(l||(W=function(){if(this instanceof W)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=M(t),a=function(t){this===K&&a.call(Z,t),d(this,j)&&d(this[j],e)&&(this[j][e]=!1),rt(this,e,y(1,t))};return s&&it&&rt(K,e,{configurable:!0,set:a}),ot(e,t)},_(W[z],"toString",(function(){return B(this).tag})),_(W,"withoutSetter",(function(t){return ot(M(t),t)})),k.f=dt,S.f=lt,E.f=ft,C.f=w.f=pt,A.f=ht,I.f=function(t){return ot(R(t),t)},s&&(Y(W[z],"description",{configurable:!0,get:function(){return B(this).description}}),o||_(K,"propertyIsEnumerable",dt,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!l,sham:!l},{Symbol:W}),F(x(at),(function(t){L(t)})),n({target:U,stat:!0,forced:!l},{for:function(t){var e=String(t);if(d(tt,e))return tt[e];var a=W(e);return tt[e]=a,et[a]=e,a},keyFor:function(t){if(!st(t))throw TypeError(t+" is not a symbol");if(d(et,t))return et[t]},useSetter:function(){it=!0},useSimple:function(){it=!1}}),n({target:"Object",stat:!0,forced:!l,sham:!s},{create:ut,defineProperty:lt,defineProperties:ct,getOwnPropertyDescriptor:ft}),n({target:"Object",stat:!0,forced:!l},{getOwnPropertyNames:pt,getOwnPropertySymbols:ht}),n({target:"Object",stat:!0,forced:u((function(){A.f(1)}))},{getOwnPropertySymbols:function(t){return A.f(m(t))}}),J){var mt=!l||u((function(){var t=W();return"[null]"!=J([t])||"{}"!=J({a:t})||"{}"!=J(Object(t))}));n({target:"JSON",stat:!0,forced:mt},{stringify:function(t,e,a){var n,i=[t],r=1;while(arguments.length>r)i.push(arguments[r++]);if(n=e,(p(e)||void 0!==t)&&!st(t))return f(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!st(e))return e}),i[1]=e,J.apply(null,i)}})}W[z][D]||T(W[z],D,W[z].valueOf),q(W,U),$[j]=!0},ab2a:function(t,e,a){},ac1f:function(t,e,a){"use strict";var n=a("23e7"),i=a("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},ad6d:function(t,e,a){"use strict";var n=a("825a");t.exports=function(){var t=n(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},c8d2:function(t,e,a){var n=a("d039"),i=a("5899"),r="​᠎";t.exports=function(t){return n((function(){return!!i[t]()||r[t]()!=r||i[t].name!==t}))}},c975:function(t,e,a){"use strict";var n=a("23e7"),i=a("4d64").indexOf,r=a("a640"),o=a("ae40"),s=[].indexOf,l=!!s&&1/[1].indexOf(1,-0)<0,c=r("indexOf"),u=o("indexOf",{ACCESSORS:!0,1:0});n({target:"Array",proto:!0,forced:l||!c||!u},{indexOf:function(t){return l?s.apply(this,arguments)||0:i(this,t,arguments.length>1?arguments[1]:void 0)}})},d32f:function(t,e,a){"use strict";var n=a("e35a"),i=a.n(n);i.a},d784:function(t,e,a){"use strict";a("ac1f");var n=a("6eeb"),i=a("d039"),r=a("b622"),o=a("9263"),s=a("9112"),l=r("species"),c=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),d=r("replace"),f=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),p=!i((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var a="ab".split(t);return 2!==a.length||"a"!==a[0]||"b"!==a[1]}));t.exports=function(t,e,a,d){var h=r(t),m=!i((function(){var e={};return e[h]=function(){return 7},7!=""[t](e)})),g=m&&!i((function(){var e=!1,a=/a/;return"split"===t&&(a={},a.constructor={},a.constructor[l]=function(){return a},a.flags="",a[h]=/./[h]),a.exec=function(){return e=!0,null},a[h](""),!e}));if(!m||!g||"replace"===t&&(!c||!u||f)||"split"===t&&!p){var v=/./[h],y=a(h,""[t],(function(t,e,a,n,i){return e.exec===o?m&&!i?{done:!0,value:v.call(e,a,n)}:{done:!0,value:t.call(a,e,n)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:f}),b=y[0],x=y[1];n(String.prototype,t,b),n(RegExp.prototype,h,2==e?function(t,e){return x.call(t,this,e)}:function(t){return x.call(t,this)})}d&&s(RegExp.prototype[h],"sham",!0)}},e01a:function(t,e,a){"use strict";var n=a("23e7"),i=a("83ab"),r=a("da84"),o=a("5135"),s=a("861d"),l=a("9bf2").f,c=a("e893"),u=r.Symbol;if(i&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var d={},f=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof f?new u(t):void 0===t?u():u(t);return""===t&&(d[e]=!0),e};c(f,u);var p=f.prototype=u.prototype;p.constructor=f;var h=p.toString,m="Symbol(test)"==String(u("test")),g=/^Symbol\((.*)\)[^)]+$/;l(p,"description",{configurable:!0,get:function(){var t=s(this)?this.valueOf():this,e=h.call(t);if(o(d,t))return"";var a=m?e.slice(7,-1):e.replace(g,"$1");return""===a?void 0:a}}),n({global:!0,forced:!0},{Symbol:f})}},e35a:function(t,e,a){},e538:function(t,e,a){var n=a("b622");e.f=n},fd2d:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{staticClass:"footer"},[a("el-col",{staticClass:"left",attrs:{span:8}},[a("span",[t._v("© 2020 HUAWEI SE")])]),a("el-col",{staticClass:"center",attrs:{span:8}},[a("span",[t._v("Made with "),a("svg-icon",{attrs:{"icon-class":"heart"}}),t._v(" from the GitHub team at HUAWEI ")],1)]),a("el-col",{staticClass:"right",attrs:{span:8}},[a("div",[a("span",{staticClass:"pointer"},[t._v("Terms of Service & Privacy Policy")]),a("span",{staticClass:"pointer"},[a("svg-icon",{attrs:{id:"github_logo","icon-class":"github"}}),t._v("Open an issue")],1)])])],1)},i=[],r={name:"Footer"},o=r,s=(a("d32f"),a("2877")),l=Object(s["a"])(o,n,i,!1,null,"023530e2",null);e["a"]=l.exports}}]);
//# sourceMappingURL=chunk-394c788c.0726f7d9.js.map