import store from '../store/index'
import Request from './request'

const request = new Request(wx)
request.use(function(config) {
  if (!config.header) {
    config.header = {}
  }

  let authorization = wx.getStorageSync('authorization')
  // 请求拦截器添加header头认证
  if (!config.header['Jwt-Auth']) {
    config.header['Jwt-Auth'] = authorization.token
  }
  return config
}, function(response) {
  switch (response.data.code) {
    case 500: // token无效
      updateToken()
      break
    case 501: // 填写推荐码
      break
    case 502: // 进入到关注页
      break
    case 503: // 账号被锁定
      break
    case 504: // 账号被删除
      break
    case 599: // 关站维护
      break
    default:
      return response
  }
})

// 处理baseURL
request.use(function (config) {
  if (/^\//.test(config.url)) {
    config.url = __baseURL__ + config.url
  }
  return config
}, null)

function updateToken () {
  let pages = getCurrentPages()
  if (pages.length >= 1) {
    let route = pages[pages.length - 1].route
    let options = pages[pages.length - 1].options
    if (/^pages/.test(route)) {
      route = '/' + route
    }
    store.dispatch('getAuthorization')
      .then(() => {
        if (JSON.stringify(options) !== '{}') { // 页面有参数
          let ginseng = ''
          Object.keys(options).forEach((item, index) => {
            ginseng += `${item}=${Object.values(options)[index]}${index < Object.keys(options).length - 1 ? '&' : ''}`
          })
          wx.reLaunch({
            url: `${route}?${ginseng}`
          })
          return
        }
        wx.reLaunch({url: route})
      })
  }
}

export default request
