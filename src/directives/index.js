// 导入dayjs
import dayjs from 'dayjs'
import store from '@/store'

export default {
  install: function(Vue) {
    // 注册自定义指令
    Vue.directive('errImg', {
      bind: function() {},
      inserted: function(el, obj) {
        el.onerror = function() {
          el.src = obj.value
        }
      }
    })
    // 通过自定义指令来判断按钮是否显示
    // 在原组件中使用v-if也可以实现相同效果
    Vue.directive('allow', {
      inserted: function(el, binding) {
        console.log(el)
        console.log(binding.value)
        console.log(store.state.user.initUserInfo.roles.points)
        const points = store.state.user.initUserInfo.roles.points
        if (!points.includes(binding.value)) {
          el.parentNode.removeChild(el)
        }
      }
    })
    // 进行过滤器的设置
    Vue.filter('format', (val, str = 'YYYY-MM-DD') => {
      // 需要将数值进行返回
      return dayjs(val).format(str)
    })
  }
}
