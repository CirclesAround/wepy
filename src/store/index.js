import Vuex from '@wepy/x'
import {
  getToken
} from '../services/index'
export default new Vuex.Store({
  state: {
    token: '', // 请求携带的凭证
    isGuest: false, // 是否为访客
    version: '' // 小程序版本
  },
  getters: {

  },
  mutations: {
    setAuthorization (state, payload) {
      let { token, isGuest, version } = payload
      state.token = token
      state.isGuest = isGuest
      state.version = version
      wx.setStorageSync('authorization', payload)
    }
  },
  actions: {
    getAuthorization ({ commit, dispatch }) {
      wx.login().then(res => {
        getToken(res.code).then(res => {
          if (res.code === 1) {
            let { jwt_auth: token, tourist: isGuest, version } = res.data
            let authorization = wx.getStorageSync('authorization')

            if (version !== authorization.version) {
              wx.clearStorageSync()
            }
            commit('setAuthorization', { token, isGuest, version })
          } else {
            wx.showToast({
              title: '授权失败',
              icon: 'none',
              duration: 1000
            })
          }
        })
      })
    }
  }
})
