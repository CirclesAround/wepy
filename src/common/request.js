/**
 * Request
 * 封装wx.request接口
 * 可以使用promise方式调用
 */
export default class Request {
  /**
   * constructor.
   *
   * @param {Object} wx 微信提供的wx对象
   */
  constructor (wx) {
    this.wx = wx
    this.before = []
    this.after = []
  }

  /**
   * handleIntercept.
   *
   * @param {Array} handles 处理数据的函数队列
   * @param {Object} data 需要处理的数据源
   */
  static handleIntercept (handler, data) {
    return handler.reduce((old, current) => {
      return current(old)
    }, data)
  }

  /**
   * use.
   *
   * @param {Function} before 请求之前的拦截器
   * @param {Function} after 请求之后的拦截器
   */
  use (before, after) {
    typeof before === 'function' && this.before.push(before)
    typeof after === 'function' && this.after.push(after)
  }

  /**
   * get.
   * @param {String} url 请求地址
   * @param {Object} data 请求携带的参数
   */
  get (url, data, header = {}) {
    return this.request({
      url,
      data,
      method: 'GET',
      header
    })
  }

  /**
   * post.
   *
   * @param {String} url 请求地址
   * @param {Object} data 请求携带的参数
   */
  post (url, data, header = {}) {
    return this.request({
      url,
      data,
      method: 'POST',
      header
    })
  }

  /**
   * request.
   *
   * @param {Object} config wx.request请求配置对象
   */
  request (config) {
    let _config = Request.handleIntercept(this.before, config)
    return new Promise((resolve, reject) => {
      this.wx.request({
        ..._config,
        ...{
          success: res => {
            let response = Request.handleIntercept(this.after, res)
            if (response && response.statusCode === 200) {
              resolve(response.data)
            } else {
              reject(response)
            }
          },
          fail: err => {
            reject(err)
          }
        }
      })
    })
  }
}
