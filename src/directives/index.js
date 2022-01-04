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
  }
}
