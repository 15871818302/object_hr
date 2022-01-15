import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { asyncRoutes } from '@/router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  next()

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    // jsonp cors proxy nginx
    // 有token，并且是登录状态下，就跳转到主页
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          await store.dispatch('user/getUserInfoById')
          // console.log(router)
          // console.log(asyncRoutes)
          console.log(store.state.user.initUserInfo.roles.menus)
          const newArr = asyncRoutes.filter((item) => {
            // console.log(item.children[0].name)
            return store.state.user.initUserInfo.roles.menus.includes(
              item.children[0].name
            )
          })
          // console.log(newArr)
          // 给动态路由匹配规则
          router.addRoutes(newArr)
          router.addRoutes([{ path: '*', redirect: '/404', hidden: true }])
          // 向vuex中存储数据
          store.commit('menu/modifyList', newArr)
          next(to.path)
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
