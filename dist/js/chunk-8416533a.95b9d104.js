(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8416533a"],{"057f":function(t,e,r){var n=r("fc6a"),a=r("241c").f,i={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return a(t)}catch(e){return o.slice()}};t.exports.f=function(t){return o&&"[object Window]"==i.call(t)?s(t):a(n(t))}},"159b":function(t,e,r){var n=r("da84"),a=r("fdbc"),i=r("17c2"),o=r("9112");for(var s in a){var c=n[s],u=c&&c.prototype;if(u&&u.forEach!==i)try{o(u,"forEach",i)}catch(l){u.forEach=i}}},"17c2":function(t,e,r){"use strict";var n=r("b727").forEach,a=r("a640"),i=r("ae40"),o=a("forEach"),s=i("forEach");t.exports=o&&s?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"2f14":function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));r("e7e5");var n=r("d399");function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function o(t,e,r){return e&&i(t.prototype,e),r&&i(t,r),t}var s=function(){function t(){a(this,t)}return o(t,[{key:"validForm",value:function(t){for(var e in t)if(!t[e].reg.test(t[e].value))return Object(n["a"])({message:t[e].error,forbidClick:!0}),!1;return!0}}]),t}(),c=new s},4160:function(t,e,r){"use strict";var n=r("23e7"),a=r("17c2");n({target:"Array",proto:!0,forced:[].forEach!=a},{forEach:a})},5530:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b");function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}},"583d":function(t,e,r){},"746f":function(t,e,r){var n=r("428f"),a=r("5135"),i=r("e538"),o=r("9bf2").f;t.exports=function(t){var e=n.Symbol||(n.Symbol={});a(e,t)||o(e,t,{value:i.f(t)})}},"7af9":function(t,e,r){t.exports=r.p+"img/coffee.ec5cc60c.png"},a4d3:function(t,e,r){"use strict";var n=r("23e7"),a=r("da84"),i=r("d066"),o=r("c430"),s=r("83ab"),c=r("4930"),u=r("fdbf"),l=r("d039"),f=r("5135"),d=r("e8b5"),g=r("861d"),p=r("825a"),b=r("7b0b"),h=r("fc6a"),m=r("c04e"),v=r("5c6c"),w=r("7c73"),y=r("df75"),O=r("241c"),C=r("057f"),S=r("7418"),k=r("06cf"),_=r("9bf2"),j=r("d1e7"),P=r("9112"),L=r("6eeb"),x=r("5692"),$=r("f772"),E=r("d012"),T=r("90e3"),N=r("b622"),D=r("e538"),M=r("746f"),F=r("d44e"),G=r("69f3"),V=r("b727").forEach,A=$("hidden"),R="Symbol",H="prototype",B=N("toPrimitive"),I=G.set,J=G.getterFor(R),Z=Object[H],z=a.Symbol,U=i("JSON","stringify"),Q=k.f,W=_.f,q=C.f,X=j.f,K=x("symbols"),Y=x("op-symbols"),tt=x("string-to-symbol-registry"),et=x("symbol-to-string-registry"),rt=x("wks"),nt=a.QObject,at=!nt||!nt[H]||!nt[H].findChild,it=s&&l((function(){return 7!=w(W({},"a",{get:function(){return W(this,"a",{value:7}).a}})).a}))?function(t,e,r){var n=Q(Z,e);n&&delete Z[e],W(t,e,r),n&&t!==Z&&W(Z,e,n)}:W,ot=function(t,e){var r=K[t]=w(z[H]);return I(r,{type:R,tag:t,description:e}),s||(r.description=e),r},st=u?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof z},ct=function(t,e,r){t===Z&&ct(Y,e,r),p(t);var n=m(e,!0);return p(r),f(K,n)?(r.enumerable?(f(t,A)&&t[A][n]&&(t[A][n]=!1),r=w(r,{enumerable:v(0,!1)})):(f(t,A)||W(t,A,v(1,{})),t[A][n]=!0),it(t,n,r)):W(t,n,r)},ut=function(t,e){p(t);var r=h(e),n=y(r).concat(pt(r));return V(n,(function(e){s&&!ft.call(r,e)||ct(t,e,r[e])})),t},lt=function(t,e){return void 0===e?w(t):ut(w(t),e)},ft=function(t){var e=m(t,!0),r=X.call(this,e);return!(this===Z&&f(K,e)&&!f(Y,e))&&(!(r||!f(this,e)||!f(K,e)||f(this,A)&&this[A][e])||r)},dt=function(t,e){var r=h(t),n=m(e,!0);if(r!==Z||!f(K,n)||f(Y,n)){var a=Q(r,n);return!a||!f(K,n)||f(r,A)&&r[A][n]||(a.enumerable=!0),a}},gt=function(t){var e=q(h(t)),r=[];return V(e,(function(t){f(K,t)||f(E,t)||r.push(t)})),r},pt=function(t){var e=t===Z,r=q(e?Y:h(t)),n=[];return V(r,(function(t){!f(K,t)||e&&!f(Z,t)||n.push(K[t])})),n};if(c||(z=function(){if(this instanceof z)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=T(t),r=function(t){this===Z&&r.call(Y,t),f(this,A)&&f(this[A],e)&&(this[A][e]=!1),it(this,e,v(1,t))};return s&&at&&it(Z,e,{configurable:!0,set:r}),ot(e,t)},L(z[H],"toString",(function(){return J(this).tag})),L(z,"withoutSetter",(function(t){return ot(T(t),t)})),j.f=ft,_.f=ct,k.f=dt,O.f=C.f=gt,S.f=pt,D.f=function(t){return ot(N(t),t)},s&&(W(z[H],"description",{configurable:!0,get:function(){return J(this).description}}),o||L(Z,"propertyIsEnumerable",ft,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:z}),V(y(rt),(function(t){M(t)})),n({target:R,stat:!0,forced:!c},{for:function(t){var e=String(t);if(f(tt,e))return tt[e];var r=z(e);return tt[e]=r,et[r]=e,r},keyFor:function(t){if(!st(t))throw TypeError(t+" is not a symbol");if(f(et,t))return et[t]},useSetter:function(){at=!0},useSimple:function(){at=!1}}),n({target:"Object",stat:!0,forced:!c,sham:!s},{create:lt,defineProperty:ct,defineProperties:ut,getOwnPropertyDescriptor:dt}),n({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:gt,getOwnPropertySymbols:pt}),n({target:"Object",stat:!0,forced:l((function(){S.f(1)}))},{getOwnPropertySymbols:function(t){return S.f(b(t))}}),U){var bt=!c||l((function(){var t=z();return"[null]"!=U([t])||"{}"!=U({a:t})||"{}"!=U(Object(t))}));n({target:"JSON",stat:!0,forced:bt},{stringify:function(t,e,r){var n,a=[t],i=1;while(arguments.length>i)a.push(arguments[i++]);if(n=e,(g(e)||void 0!==t)&&!st(t))return d(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!st(e))return e}),a[1]=e,U.apply(null,a)}})}z[H][B]||P(z[H],B,z[H].valueOf),F(z,R),E[A]=!0},a55b:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"login"},[r("Nav"),t._m(0),r("div",{staticClass:"login_form"},[r("van-field",{staticClass:"login_user",attrs:{label:"账号",placeholder:"输入手机号"},model:{value:t.logindata.unamenumber,callback:function(e){t.$set(t.logindata,"unamenumber",e)},expression:"logindata.unamenumber"}}),r("van-field",{staticClass:"login_pw",attrs:{label:"密码",type:t.ispassword?"text":"password",placeholder:"输入密码","left-icon":"","right-icon":t.ispassword?"eye-o":"closed-eye"},on:{"click-right-icon":t.togglepw},model:{value:t.logindata.upw,callback:function(e){t.$set(t.logindata,"upw",e)},expression:"logindata.upw"}})],1),r("div",{staticClass:"btn_box"},[r("van-button",{attrs:{round:"",type:"default",block:"",color:" #D15343"},on:{click:t.login}},[t._v("登录")]),r("van-button",{staticClass:"login_btn",attrs:{round:"",type:"default",block:""},on:{click:t.showPopup}},[t._v("注册")])],1),r("div",{staticClass:"showlayer"},[r("van-popup",{attrs:{position:"bottom",closeable:""},model:{value:t.isshow,callback:function(e){t.isshow=e},expression:"isshow"}},[r("div",{staticClass:"register_bg"}),r("p",{staticClass:"register_register"},[t._v("注册")]),r("div",{staticClass:"register"},[r("van-field",{staticClass:"register_user",attrs:{label:"账号",placeholder:"输入手机号"},model:{value:t.registerdata.unamenumber,callback:function(e){t.$set(t.registerdata,"unamenumber",e)},expression:"registerdata.unamenumber"}}),r("van-field",{staticClass:"register_pw",attrs:{label:"密码",type:t.ispassword?"text":"password",placeholder:"输入密码","left-icon":"","right-icon":t.ispassword?"eye-o":"closed-eye"},on:{"click-right-icon":t.togglepw},model:{value:t.registerdata.upw,callback:function(e){t.$set(t.registerdata,"upw",e)},expression:"registerdata.upw"}}),r("van-field",{staticClass:"register_username",attrs:{label:"用户名",placeholder:"输入用户名"},model:{value:t.registerdata.uname,callback:function(e){t.$set(t.registerdata,"uname",e)},expression:"registerdata.uname"}})],1),r("van-button",{staticClass:"register_btn",attrs:{round:"",type:"default",block:""},on:{click:t.leaveRegister}},[t._v("注册")])],1)],1)],1)},a=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"login_interface"},[r("div",{staticClass:"coffee_bg"}),r("p",{staticClass:"login_login"},[t._v("登录")]),r("p",{staticClass:"login_welcome"},[t._v("Gaga Coffee")])])}],i=r("5530"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("van-nav-bar",{scopedSlots:t._u([{key:"left",fn:function(){return[n("div",{staticClass:"title_left"},[n("div",{staticClass:"title_left_icon"},[n("img",{staticClass:"img_auto",attrs:{src:r("7af9")}})]),n("div",{staticClass:"title_left_text"},[n("p",[t._v("Gaga Coffee")])])])]},proxy:!0},{key:"right",fn:function(){return[n("div",{staticClass:"title_right",on:{click:t.toHome}},[t._v("先逛一逛")])]},proxy:!0}])})],1)},s=[],c=(r("583d"),{name:"Nav",methods:{toHome:function(){this.$router.push("/")}}}),u=c,l=r("2877"),f=Object(l["a"])(u,o,s,!1,null,null,null),d=f.exports,g=(r("c25d"),r("2f14")),p=r("2f62"),b={components:{Nav:d},data:function(){return{ispassword:!1,logindata:{unamenumber:"",upw:""},isshow:!1,registerdata:{unamenumber:"",upw:"",uname:""}}},created:function(){this.changeShopbagCount(0),this.changeIsShopbagCount(!1)},methods:Object(i["a"])(Object(i["a"])({},Object(p["b"])(["changeShopbagCount","changeIsShopbagCount"])),{},{togglepw:function(){this.ispassword=!this.ispassword},showPopup:function(){this.isshow=!0},leaveRegister:function(){var t=this,e={phone:{value:this.registerdata.unamenumber,reg:/^1[3-9]\d{9}$/,error:"手机号格式不正确"},pw:{value:this.registerdata.upw,reg:/^[A-Za-z]\w{5,15}$/,error:"密码支持字母数字_组合且首字符必须为字母"},name:{value:this.registerdata.uname,reg:/^[\u4e00-\u9fa5A-Za-z0-9]{1,10}$/,error:"昵称支持汉字字母数字组合"}};g["a"].validForm(e)&&(this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0}),this.axios({method:"POST",url:this.BaseUrl1+"/register",data:{appkey:"U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",nickName:this.registerdata.uname,password:this.registerdata.upw,phone:this.registerdata.unamenumber}}).then((function(e){t.$toast.clear(),100==e.data.code?(t.$toast({message:"注册成功",forbidClick:!0,duration:1e3}),t.isshow=!1):(t.$toast({message:e.data.msg,forbidClick:!0,duration:3e3}),t.registerdata.uname="",t.registerdata.upw="",t.registerdata.unamenumber="")})).catch((function(e){t.$toast.clear(),console.log("err"+e)})))},login:function(){var t=this,e={phone:{value:this.logindata.unamenumber,reg:/^1[3-9]\d{9}$/,error:"手机号格式不正确"},pw:{value:this.logindata.upw,reg:/^[A-Za-z]\w{5,15}$/,error:"密码支持字母数字_组合且首字符必须为字母"}};g["a"].validForm(e)&&(this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0}),this.axios({method:"post",url:this.BaseUrl1+"/login",data:{appkey:this.appkey,password:this.logindata.upw,phone:this.logindata.unamenumber}}).then((function(e){t.$toast.clear(),200===e.data.code?(t.$cookie.set("loginToken",e.data.token,"1d"),t.$router.push("/")):(t.$toast({message:e.data.msg,forbidClick:!0,duration:2e3}),t.logindata.unamenumber="",t.logindata.upw="")})).catch((function(e){t.$toast.clear(),console.log(e)})))}})},h=b,m=Object(l["a"])(h,n,a,!1,null,null,null);e["default"]=m.exports},a640:function(t,e,r){"use strict";var n=r("d039");t.exports=function(t,e){var r=[][t];return!!r&&n((function(){r.call(null,e||function(){throw 1},1)}))}},b64b:function(t,e,r){var n=r("23e7"),a=r("7b0b"),i=r("df75"),o=r("d039"),s=o((function(){i(1)}));n({target:"Object",stat:!0,forced:s},{keys:function(t){return i(a(t))}})},c25d:function(t,e,r){},dbb4:function(t,e,r){var n=r("23e7"),a=r("83ab"),i=r("56ef"),o=r("fc6a"),s=r("06cf"),c=r("8418");n({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(t){var e,r,n=o(t),a=s.f,u=i(n),l={},f=0;while(u.length>f)r=a(n,e=u[f++]),void 0!==r&&c(l,e,r);return l}})},e439:function(t,e,r){var n=r("23e7"),a=r("d039"),i=r("fc6a"),o=r("06cf").f,s=r("83ab"),c=a((function(){o(1)})),u=!s||c;n({target:"Object",stat:!0,forced:u,sham:!s},{getOwnPropertyDescriptor:function(t,e){return o(i(t),e)}})},e538:function(t,e,r){var n=r("b622");e.f=n},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-8416533a.95b9d104.js.map