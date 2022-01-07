// import { getDepartmentList } from '@/api/departments'
const list = () => {
  return {
    roleList: [],
    pageParams: {
      page: 1,
      pagesize: 2
    },
    total: 0,
    form: {}
  }
}

const state = list()

const mutations = {
  changePage(state, payload) {
    state.pageParams.page = payload
  },
  changePageSize(state, payload) {
    state.pageParams.pagesize = payload
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
