(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-43fa8965"],{"081b":function(e,t,r){"use strict";var n=r("82cd"),o=r.n(n);o.a},5635:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-row",[r("el-col",{attrs:{offset:7,span:10}},[e._l(e.emails,(function(t,n){return r("el-row",{staticClass:"emailRow",attrs:{gutter:"20"}},[r("el-col",{attrs:{span:16}},[r("el-input",{attrs:{placeholder:"please input email",clearable:"",size:"medium"},model:{value:t.email,callback:function(r){e.$set(t,"email",r)},expression:"item.email"}})],1),r("el-col",{attrs:{span:8,align:"right"}},[r("el-button",{attrs:{size:"medium"},on:{click:function(t){return e.addRow(n)}}},[e._v("+")]),r("el-button",{attrs:{size:"medium"},on:{click:function(t){return e.myDeleteRow(n)}}},[e._v("-")])],1)],1)})),r("el-row",{attrs:{align:"middle"}},[r("el-col",{attrs:{align:"center"}},[r("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(t){return e.createUser()}}},[e._v("Submit")])],1)],1)],2)],1)},o=[],i=(r("4160"),r("a434"),r("a9e3"),r("159b"),r("221d")),s={name:"CreateUser",computed:{orgValue:function(){return console.log(this.$store.state.loginInfo.orgValue),this.$store.state.loginInfo.orgValue},userInfo:function(){return console.log(this.$store.state.loginInfo.userInfo),this.$store.state.loginInfo.userInfo}},data:function(){return{cla_org_id:this.$store.state.loginInfo.userInfo[0].cla_org_id,emails:[{email:""}],limit:5}},methods:{addRow:function(e){Number(this.$store.state.userLimit)+this.emails.length===this.limit?(this.$message.closeAll(),this.$message.error("Create up to ".concat(this.limit," users"))):this.emails.splice(e+1,0,{email:""})},myDeleteRow:function(e){console.log(e),1===this.emails.length?this.emails[0].email="":this.emails.splice(e,1)},createUser:function(){var e=this,t=[];this.emails.forEach((function(e){t.push(e.email)}));var r={cla_org_id:this.cla_org_id,emails:t};this.$axios({url:"/api"+i["b"],method:"post",data:r,headers:{token:this.userInfo[this.orgValue].token}}).then((function(t){console.log(t),e.$message.closeAll(),e.$message.success("success"),location.reload()})).catch((function(t){console.log(t),e.$message.closeAll(),e.$message.error(t.response.data)}))}},created:function(){}},a=s,l=(r("081b"),r("2877")),c=Object(l["a"])(a,n,o,!1,null,"ba962274",null);t["default"]=c.exports},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,r){var n=r("1d80"),o=r("5899"),i="["+o+"]",s=RegExp("^"+i+i+"*"),a=RegExp(i+i+"*$"),l=function(e){return function(t){var r=String(n(t));return 1&e&&(r=r.replace(s,"")),2&e&&(r=r.replace(a,"")),r}};e.exports={start:l(1),end:l(2),trim:l(3)}},7156:function(e,t,r){var n=r("861d"),o=r("d2bb");e.exports=function(e,t,r){var i,s;return o&&"function"==typeof(i=t.constructor)&&i!==r&&n(s=i.prototype)&&s!==r.prototype&&o(e,s),e}},"82cd":function(e,t,r){},a434:function(e,t,r){"use strict";var n=r("23e7"),o=r("23cb"),i=r("a691"),s=r("50c4"),a=r("7b0b"),l=r("65f0"),c=r("8418"),u=r("1dde"),f=r("ae40"),m=u("splice"),h=f("splice",{ACCESSORS:!0,0:0,1:2}),d=Math.max,p=Math.min,g=9007199254740991,I="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!m||!h},{splice:function(e,t){var r,n,u,f,m,h,b=a(this),_=s(b.length),v=o(e,_),N=arguments.length;if(0===N?r=n=0:1===N?(r=0,n=_-v):(r=N-2,n=p(d(i(t),0),_-v)),_+r-n>g)throw TypeError(I);for(u=l(b,n),f=0;f<n;f++)m=v+f,m in b&&c(u,f,b[m]);if(u.length=n,r<n){for(f=v;f<_-n;f++)m=f+n,h=f+r,m in b?b[h]=b[m]:delete b[h];for(f=_;f>_-n+r;f--)delete b[f-1]}else if(r>n)for(f=_-n;f>v;f--)m=f+n-1,h=f+r-1,m in b?b[h]=b[m]:delete b[h];for(f=0;f<r;f++)b[f+v]=arguments[f+2];return b.length=_-n+r,u}})},a9e3:function(e,t,r){"use strict";var n=r("83ab"),o=r("da84"),i=r("94ca"),s=r("6eeb"),a=r("5135"),l=r("c6b6"),c=r("7156"),u=r("c04e"),f=r("d039"),m=r("7c73"),h=r("241c").f,d=r("06cf").f,p=r("9bf2").f,g=r("58a8").trim,I="Number",b=o[I],_=b.prototype,v=l(m(_))==I,N=function(e){var t,r,n,o,i,s,a,l,c=u(e,!1);if("string"==typeof c&&c.length>2)if(c=g(c),t=c.charCodeAt(0),43===t||45===t){if(r=c.charCodeAt(2),88===r||120===r)return NaN}else if(48===t){switch(c.charCodeAt(1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+c}for(i=c.slice(2),s=i.length,a=0;a<s;a++)if(l=i.charCodeAt(a),l<48||l>o)return NaN;return parseInt(i,n)}return+c};if(i(I,!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var w,E=function(e){var t=arguments.length<1?0:e,r=this;return r instanceof E&&(v?f((function(){_.valueOf.call(r)})):l(r)!=I)?c(new b(N(t)),r,E):N(t)},A=n?h(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),$=0;A.length>$;$++)a(b,w=A[$])&&!a(E,w)&&p(E,w,d(b,w));E.prototype=_,_.constructor=E,s(o,I,E)}}}]);
//# sourceMappingURL=chunk-43fa8965.92a1d469.js.map