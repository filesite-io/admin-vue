(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7739fe40"],{"544c":function(t,e,a){"use strict";a("d0e9")},7209:function(t,e,a){"use strict";a("7ed4")},"7ed4":function(t,e,a){},"9ed6":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login-container"},[t._m(0),a("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,rules:t.loginRules,"auto-complete":"on","label-position":"left"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleLogin(e)}}},[a("div",{staticClass:"title-container"},[a("h3",{staticClass:"title"},[t._v("系统登入")])]),a("el-form-item",{attrs:{prop:"username"}},[a("span",{staticClass:"svg-container"},[a("svg-icon",{attrs:{"icon-class":"user"}})],1),a("el-input",{ref:"username",attrs:{placeholder:"用户名",name:"用户名",type:"text",tabindex:"1","auto-complete":"on"},model:{value:t.loginForm.username,callback:function(e){t.$set(t.loginForm,"username",e)},expression:"loginForm.username"}})],1),a("el-form-item",{attrs:{prop:"password"}},[a("span",{staticClass:"svg-container"},[a("svg-icon",{attrs:{"icon-class":"password"}})],1),a("el-input",{key:t.passwordType,ref:"password",attrs:{type:t.passwordType,placeholder:"密码",name:"密码",tabindex:"2","auto-complete":"on"},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}}),a("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[a("svg-icon",{attrs:{"icon-class":"password"===t.passwordType?"eye":"eye-open"}})],1)],1),a("div",{staticClass:"captcha_k"},[a("el-form-item",{attrs:{prop:"captcha"}},[a("span",{staticClass:"svg-container"},[a("svg-icon",{attrs:{"icon-class":"example"}})],1),a("el-input",{ref:"captcha",attrs:{placeholder:"验证码",name:"用户名",type:"text",tabindex:"3","auto-complete":"on"},model:{value:t.loginForm.captcha,callback:function(e){t.$set(t.loginForm,"captcha",e)},expression:"loginForm.captcha"}})],1),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.captcha_loading,expression:"captcha_loading"}],staticClass:"captcha_main",on:{click:t.getcaptcha}},[t.captcha_loading?t._e():a("img",{staticClass:"captcha_img",attrs:{src:t.captchaimg,alt:"验证码"}})])],1),a("el-button",{staticClass:"bt_login",attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),t.handleLogin(e)}}},[t._v("登入")]),a("el-button",{staticClass:"bt_rest bt_login",on:{click:function(e){return t.resetForm("loginForm")}}},[t._v("重置")])],1)],1)},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"toptitle clearfix"},[s("a",{staticClass:"leftk",attrs:{href:"javascript:;"}},[s("img",{attrs:{src:a("7b07"),alt:"图片"}}),s("em",{staticClass:"erectline"}),s("span",[t._v("后台管理系统")])])])}],o=a("c24f"),r={created:function(){this.getcaptcha()},data:function(){var t=function(t,e,a){e.length<3?a(new Error("请输入正确的用户名")):a()},e=function(t,e,a){e.length<6?a(new Error("请输入正确的密码")):a()},a=function(t,e,a){e.length<5?a(new Error("请输入正确的验证码")):a()};return{loading:!1,captcha_loading:!0,passwordType:"password",redirect:void 0,loginForm:{username:"filesite",password:"88888888",captcha:""},captchaimg:"",loginRules:{username:[{required:!0,trigger:"blur",validator:t}],password:[{required:!0,trigger:"blur",validator:e}],captcha:[{required:!0,trigger:"blur",validator:a}]}}},watch:{$route:{handler:function(t){this.redirect=t.query&&t.query.redirect},immediate:!0}},methods:{getcaptcha:function(){var t=this;this.captcha_loading=!0,Object(o["a"])().then((function(e){var a=e.data;t.captchaimg=a.data,t.captcha_loading=!1}))},showPwd:function(){var t=this;"password"===this.passwordType?this.passwordType="text":this.passwordType="password",this.$nextTick((function(){t.$refs.password.focus()}))},handleLogin:function(){var t=this;this.$refs.loginForm.validate((function(e){if(!e)return console.log("error submit!!"),!1;t.loading=!0;t.$store.dispatch("user/login",t.loginForm).then((function(e){var a=e.data;1==a.code?(t.$router.push({path:t.redirect||"/filemange/index"}),t.$message({showClose:!0,message:a.msg,type:"success"})):0==a.code&&t.$message({showClose:!0,message:a.err,type:"error"}),t.loading=!1})).catch((function(e){Object(o["i"])(t,e),t.loading=!1}))}))},resetForm:function(t){this.$refs[t].resetFields()}}},i=r,c=(a("7209"),a("544c"),a("2877")),l=Object(c["a"])(i,s,n,!1,null,null,null);e["default"]=l.exports},d0e9:function(t,e,a){}}]);