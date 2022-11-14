<template>
  <div class="login-container">
    <div class="toptitle clearfix">
        <a class="leftk" href="javascript:;">
            <img src="../../common/img/jialuoma.png" alt="图片">
            <em class="erectline"></em>
            <span>后台管理系统</span>
        </a>
    </div>
    <el-form ref="loginForm" @keyup.enter.native="handleLogin" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">系统登入</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="用户名"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="密码"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div class="captcha_k">
            <el-form-item prop="captcha">
                <span class="svg-container">
                    <svg-icon icon-class="example" />
                </span>
                <el-input
                ref="captcha"
                v-model="loginForm.captcha"
                placeholder="验证码"
                name="用户名"
                type="text"
                tabindex="3"
                auto-complete="on"
                />        
            </el-form-item>
            <div class="captcha_main" @click="getcaptcha" v-loading="captcha_loading">
                <img v-if="!captcha_loading" class="captcha_img" :src="captchaimg" alt="验证码"/>
            </div>        
      </div>
      
      <el-button class="bt_login" :loading="loading" type="primary" @click.native.prevent="handleLogin">登入</el-button>
      <el-button class="bt_rest bt_login" @click="resetForm('loginForm')">重置</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->
    </el-form>
  </div>

</template>

<script>
//import { validUsername } from '@/utils/validate'
//import axios from 'axios'
//import { setToken } from '@/utils/auth' // set token from cookie
import {requesterr, captcha, login } from '@/api/user'
export default {
  
  created: function () {
    this.getcaptcha();
  },
  data() {
    
    const validateUsername = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }
    const validateCaptcha = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
        
      loading: false,
      captcha_loading: true, // 验证码加载状态
      passwordType: 'password',
      redirect: undefined,
      loginForm: {
        username: 'filesite',
        password: '88888888',
        captcha: ''
      },
      captchaimg: '',  // 验证码图片
      loginRules: {
        username: [
            { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        captcha: [{ required: true, trigger: 'blur', validator: validateCaptcha }]
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {

    // 验证码接口
    getcaptcha() {
        //let thiss = this;
        this.captcha_loading = true;
        captcha().then(response => {
            let datamain = response.data;
            this.captchaimg = datamain.data;
            this.captcha_loading = false;
            //console.log(response);
        })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        // console.log(valid);
        if (valid) {
            this.loading = true
            let thiss = this;
            this.$store.dispatch('user/login', this.loginForm).then(response => {
                //console.log(response);
                let datamain = response.data;
                if (datamain.code == 1) {
                    //console.log(datamain);
                    
                    this.$router.push({ path: this.redirect || '/filemange/index' })
                    this.$message({showClose: true,message: datamain.msg, type:'success'});
                } else if (datamain.code == 0) {
                    this.$message({showClose: true,message: datamain.err, type:'error'});
                }
                
                this.loading = false
            }).catch((error) => {
                requesterr(this, error);
                this.loading = false;
            })
            // login(this.loginForm).then(response => {
            //     let datamain = response.data;
            //     console.log(1111);
            //     if (datamain.code == 0) {
            //         this.loading = false;
            //         this.$message({
            //             showClose: true,
            //             message: datamain.err,
            //             type: 'error'
            //         });
            //         return false;
            //     }
            //     //console.log(response)
                
            //     this.$router.push({path: '/filemange/index'})
            //     //console.log('6666');
            // }).catch(function (error) {
            //     thiss.$message({
            //         showClose: true,
            //         message: error,
            //         type: 'error'
            //     });
            //     this.loading = false
            // });
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/publics.scss";

$bg:#283443;
$light_gray:#fff;
$cursor: #3c3535;
/* reset element-ui css */
//input::placeholder{color:#5a5252 !important;}
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #000;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss">

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #FFF;
  overflow: hidden;

    .bt_login{width:100%;margin:0 0 16px 0;}
    .bt_rest{margin:0;}
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding:0 32px 0 32px;
    margin: 160px auto 0 auto;
    overflow: hidden;
  }

//   .tips {
//     font-size: 14px;
//     color: #000;
//     margin-bottom: 10px;

//     span {
//       &:first-of-type {
//         margin-right: 16px;
//       }
//     }
//   }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #000;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #000;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #000;
    cursor: pointer;
    user-select: none;
  }
  .captcha_k{display:flex;}
  .captcha_k .captcha_main{width:100px;height:54px;margin: 0 0 0 15px;}
  .captcha_k .captcha_img{border-radius:6px;display:block;max-width:100%;height:100%;cursor:pointer;}
  .captcha_k>.el-form-item{flex:1;}
}
</style>
