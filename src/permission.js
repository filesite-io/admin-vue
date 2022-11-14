import router from './router'
import store from './store'
//import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
//import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist


router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
    //console.log(0)
  // set page title
  //document.title = getPageTitle(to.meta.title)
    //console.log(hasToken);
    //next()
  // determine whether the user has logged in
  const hasToken = getToken()
    
  if (hasToken) {
    //   console.log(1)
    //   console.log(to.path)
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    }else{
        next()
    } 
    // else {
    //   const hasGetUserInfo = store.getters.name
    //   if (hasGetUserInfo) {
    //     next()
    //   } else {
    //     try {
    //       // get user info
    //       await store.dispatch('user/getInfo')

    //       next()
    //     } catch (error) {
    //       // remove token and go to login page to re-login
    //       await store.dispatch('user/resetToken')
    //       Message.error(error || 'Has Error')
    //       next(`/login?redirect=${to.path}`)
    //       NProgress.done()
    //     }
    //   }
    // }
  } else {
    /* has no token*/
      //console.log(to.path)
    if (whiteList.indexOf(to.path) !== -1) {
        //console.log(2)
      // in the free login whitelist, go directly
      next()
    } else {
        //console.log(3)
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()  // 释放钩子
})
