import Vuex from '@wepy/x'
import {
  getToken
} from '../services/index'
export default new Vuex.Store({
  state: {
    token: '', // 请求携带的凭证
    isGuest: false, // 是否为访客
    version: '', // 小程序版本
    imagesList: null // 图片地址对照表
  },
  getters: {
    /*
     * tips
     * 只有初始化完成之后才可以调用接口
     * 通过watch监听变化去加载页面数据
     */
    isReady (state) {
      return !!(state.token && state.imagesList)
    }
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
