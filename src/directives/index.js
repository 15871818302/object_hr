// 导入dayjs
import dayjs from 'dayjs'

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
    // 进行过滤器的设置
    Vue.filter('format', (val, str = 'YYYY-MM-DD') => {
      // 需要将数值进行返回
      return dayjs(val).format(str)
    })
  }
}
