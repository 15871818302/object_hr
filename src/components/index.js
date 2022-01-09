// 导入vue
import Vue from 'vue'

// 进行组件的批量注册，需要给组件设置name属性
// 括号里面的三个属性分别是，公共组件目录，是否开启深度查找，文件匹配形式
const requireComponents = require.context('./', true, /.vue$/)
// requireComponents.keys()打印输出为一个数组
requireComponents.keys().forEach((item) => {
  // console.log(requireComponents(item))
  const defaultCom = requireComponents(item).default // 获取的是每一个组件对象
  // 根据vue.component进行组件注册
  Vue.component(defaultCom.name, defaultCom)
})
