// import { getDepartmentList } from '@/api/departments'

import { getStaffList, deleteRole } from '@/api/setting'
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
  },
  // 修复表单数据删除异常bug函数
  fixPaginationBug(state) {
    // 如果删到最后一条数据了，就要让页码值-1再发送请求
    if (state.roleList === 1 && state.pageParams.page > 1) {
      state.pageParams.page--
      if (state.pageParams.page === 1) {
        state.pageParams.page = 1
      }
    }
  }
}

const actions = {
  getRoleList({ commit, state }) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async(resolve, reject) => {
      try {
        // console.log(resolve)
        const res = await getStaffList(state.pageParams)
        // console.log(res)
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
  },
  async delRole(context, id) {
    const res = await deleteRole(id)
    console.log(res)
    // 修复删除bug的函数调用
    context.commit('fixPaginationBug')
    // 删除成功之后进行页面的重新加载
    if (res.success) {
      context.dispatch('getRoleList')
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
