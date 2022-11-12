import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
    {
        path: '/',
        component: Layout,
        redirect: '/homepage',
        children: [{
            path: 'homepage',
            name: 'Homepage',
            component: () => import('@/views/homepage/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },
    {
        path: '/filemange',
        component: Layout,
        redirect: '/filemange/index',
        meta: { title: '文件管理', icon: 'el-icon-s-help' },
        children: [
            {
                path: 'index',
                name: 'Filemange',
                component: () => import('@/views/filemange/index'),
                meta: { title: '文件管理', icon: 'dashboard' }
            },
            {
                path: 'subfile',
                name: 'Subfile',
                component: () => import('@/views/subfile/index.vue'),
                meta: { title: '子文件', icon: 'dashboard' }
            }
        ]
    },
    {
        path: '/usermange',
        component: Layout,
        name: 'usermange',
        children: [
            {
                path: 'index',
                name: 'Usermange',
                component: () => import('@/views/usermanage/index'),
                meta: { title: '用户管理', icon: 'form' }
            }
        ]
    },
    {
        path: '/systme',
        component: Layout,
        redirect: '/systme/changepass',
        name: 'systme',
        meta: { title: '系统管理', icon: 'el-icon-s-help' },
        children: [
            {
                path: 'changepass',
                name: 'changepass',
                component: () => import('@/views/systme/changepass'),
                meta: { title: '修改密码', icon: 'table' }
            },
            {
                path: 'userrelated',
                name: 'userrelated',
                component: () => import('@/views/systme/userrelated'),
                meta: { title: '用户相关', icon: 'tree' }
            },
            {
                path: 'switchtheme',
                name: 'Switchtheme',
                component: () => import('@/views/systme/switchtheme'),
                meta: { title: '皮肤更换', icon: 'tree' }
            }
        ]
    },
    
    { path: '*', redirect: '/404', hidden: true }
  // 404 page must be placed at the end !!!
  
]

const createRouter = () => new Router({
   //mode: 'history', // require service supportmode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
