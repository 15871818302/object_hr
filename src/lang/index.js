import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ElementLocale from 'element-ui/lib/locale'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhcostom from './zh'
import encostom from './en'

Vue.use(VueI18n)
const i18n = new VueI18n({
  // 指定语言类型 zh表示中文  en表示英文
  locale: 'en',
  // 将elementUI语言包加入到插件语言数据里
  messages: {
    // 英文环境下的语言数据
    en: {
      ...enLocale,
      ...encostom
    },
    // 中文环境下的语言数据
    zh: {
      ...zhLocale,
      ...zhcostom
    }
  }
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
