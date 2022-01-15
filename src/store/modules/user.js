import { login, getInfo, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userId: '',
    userInfoById: {},
    initUserInfo: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    // 存储到本地cookie
    setToken(token)
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  GET_USERID: (state, payload) => {
    state.userId = payload
  },
  GET_USERINFO: (state, payload) => {
    state.userInfoById = payload
  },
  GET_INFO: (state, payload) => {
    state.initUserInfo = payload
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then((response) => {
          // console.log(response)
          const { data } = response
          commit('SET_TOKEN', data)
          // setToken(data.token)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response
          // console.log(data)

          if (!data) {
            return reject('Verification failed, please Login again.')
          }

          const { username } = data

          commit('SET_NAME', username)
          commit('GET_USERID', data.userId)
          commit('GET_INFO', data)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve().catch((error) => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  // 根据id获取用户信息
  getUserInfoById({ commit, state }) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async(resolve, reject) => {
      try {
        const { data: res } = await getUserInfo(state.userId)
        commit('GET_USERINFO', res)
        commit('SET_AVATAR', res.staffPhoto)
        // console.log(res)
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
