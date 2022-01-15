import { constantRoutes } from '@/router'

const routerList = () => {
  return {
    routerOfPer: []
  }
}

const state = routerList()

const mutations = {
  modifyList(state, payload) {
    state.routerOfPer = [...constantRoutes, ...payload]
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
