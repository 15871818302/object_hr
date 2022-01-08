// import { getDepartmentList } from '@/api/departments'

import { getStaffList } from '@/api/setting'
const list = () => {
  return {
    roleList: [],
    pageParams: {
      page: 1,
      pagesize: 2
    },
    total: 0,
    form: {},
    setDialogVisible: false,
    isEdit: false
  }
}

const state = list()

const mutations = {
  // 改变页码
  changePage(state, payload) {
    state.pageParams.page = payload
  },
  // 改变每页显示数量
  changePageSize(state, payload) {
    state.pageParams.pagesize = payload
  },
  // 改变总数
  changeTotal(state, payload) {
    state.total = payload
  },
  // 获取员工列表
  initStaffList(state, payload) {
    state.roleList = payload
  },
  // 更改弹出框的消失和出现
  controlDialog(state, payload) {
    state.setDialogVisible = payload
  },
  // 控制是否为编辑表单
  controlEdit(state, payload) {
    state.isEdit = payload
  },
  // 子组件中接收编辑的数据
  editData(state, payload) {
    state.form = payload
  }
}

const actions = {
  getRoleList({ commit }) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async(resolve, reject) => {
      try {
        // console.log(resolve)
        const res = await getStaffList(this.pageParams)
        console.log(res)
        // 发送成功之后就把数值赋予上面的空数组
        if (res.success) {
          commit('initStaffList', res.data.rows)
          commit('changeTotal', res.data.total)
        }
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
