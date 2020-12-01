const path = require('path')
const DefinePlugin = require('@wepy/plugin-define')
const prod = process.env.NODE_ENV === 'production'

const config = {
  dev: {
    files: 'https://mini-sources.xy22.cn/file.json',
    baseURL: 'https://api-abzdev.xy22.cn',
    clockInURL: 'https://daka-abzdev.xy22.cn'
  },
  online: {
    files: 'https://mini-sources.xy22.cn/file.online.json',
    baseURL: 'https://api-abz.xy22.cn',
    clockInURL: 'https://daka-abz.xy22.cn'
  }
}

const env = prod ? 'online' : 'dev'
const { files, baseURL, clockInURL } = config[env]

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  static: ['static'],
  build: {
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod
    },
    babel: {
      sourceMap: true,
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@wepy/babel-plugin-import-regenerator'
      ]
    }
  },
  plugins: [
    DefinePlugin({
      __images__: JSON.stringify(files),
      __baseURL__: JSON.stringify(baseURL),
      __clockInURL__: JSON.stringify(clockInURL)
    })
  ],
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}
