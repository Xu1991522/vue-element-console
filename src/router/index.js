import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/orgManage',
    component: Layout,
    redirect: '/orgManage/shop',
    name: 'orgManage',
    meta: {
      title: '组织管理',
      icon: 'orgManage'
    },
    children: [
      {
        path: 'shop',
        name: 'shop',
        component: () => import('@/views/orgManage/shop/index'),
        meta: { title: '门店管理' }
      },
      {
        path: 'supplier',
        component: () => import('@/views/orgManage/supplier/index'),
        name: 'supplier',
        meta: { title: '供应商管理' },
        hidden: true
      },
      {
        path: 'store',
        component: () => import('@/views/orgManage/store/index'),
        name: 'store',
        meta: { title: '仓库管理' }
      },
      {
        path: 'logistics',
        component: () => import('@/views/orgManage/logistics/index'),
        name: 'logistics',
        meta: { title: '物流管理' }
      }
    ]
  },
  {
    path: '/deviceManage',
    component: Layout,
    redirect: '/deviceManage/electricScales',
    name: 'deviceManage',
    meta: {
      title: '设备管理',
      icon: 'deviceManage'
    },
    children: [
      {
        path: 'electricScales',
        name: 'electricScales',
        component: () => import('@/views/deviceManage/electricScales/index'),
        meta: { title: '电子秤管理' }
      },
      {
        path: 'other',
        component: () => import('@/views/deviceManage/other/index'),
        name: 'other',
        meta: { title: '其他' }
        // hidden: true
      }
    ]
  },
  {
    path: '/goodsManage',
    component: Layout,
    redirect: '/goodsManage/electricScales',
    name: 'goodsManage',
    meta: {
      title: '商品管理',
      icon: 'goodsManage'
    },
    children: [
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/goodsManage/goods/index'),
        meta: { title: '商品' }
        // meta: { title: '商品', icon: 'edit' }
      },
      {
        path: 'category',
        component: () => import('@/views/goodsManage/category/index'),
        name: 'category',
        meta: { title: '商品类别管理' }
        // meta: { title: '商品类别管理', noCache: true }
        // hidden: true
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/systemManage',
    component: Layout,
    redirect: '/systemManage/electricScales',
    name: 'systemManage',
    meta: {
      title: '系统管理',
      icon: 'systemManage',
      roles: ['ADMIN']
      // requiresAuth: true
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/systemManage/user/index'),
        meta: { title: '用户' }
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/systemManage/roles/index'),
        meta: { title: '角色' }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      // roles: ['admin', 'editor'] // you can set roles in root nav
      // roles: ['ADMIN', 'GONG_YING_SHANG', 'CU_XIAO_YUAN'] // you can set roles in root nav
      roles: ['ADMIN']
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['ADMIN'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
