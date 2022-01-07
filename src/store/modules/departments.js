import { getDepartmentList } from '@/api/departments'
// 导入树形数据转换的工具函数
// import { transToTree } from '@/utils/index'
// 导入树形数据转换的第三方包
import arrayToTree from 'array-to-tree'
const list = () => {
  return {
    departmentList: [],
    deptData: {}
  }
}

const state = list()

const mutations = {
  GET_LIST(state, payload) {
    state.departmentList = arrayToTree(payload, {
      parentProperty: 'pid',
      customID: 'id'
    })
  },
  GET_INFO(state, payload) {
    state.deptData = payload
  }
}

const actions = {
  getList({ commit }) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async(resolve, reject) => {
      try {
        const res = await getDepartmentList()
        console.log(res, 999)
        commit('GET_LIST', res.data.depts)
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
