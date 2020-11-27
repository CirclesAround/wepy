import request from '../common/services'
/**
 * getToken.
 * 获取登录凭证
 * @param {String} code wx.login返回的登录code
 */
export function getToken (code) {
  return request.post('/mini-api/program/login', { code })
  // return request.post('/mini-api/login/set', { code: 54761 })
}

/**
 * 获取首页
 */
export function getHomeData () {
  return request.get('/mini-api/radio/info/index')
}
