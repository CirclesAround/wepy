### 测试搭建小程序环境

#### setup

* 安装依赖包`npm install`

#### 开发环境

* 开始开发`npm run dev`

#### 特殊说明

* 开发时如果有新增和修改过图片信息，需要运行`npm run assets`命令上传图片到资源服务器。
* 所有页面的业务逻辑，一定要等程序初始化完成后才可以进行。在页面监听计算属性`isReady`（来自store中）的值，只有为true的时候才调用页面的初始化逻辑。
* 在上线之前需要运行`npm run assets online`这个命令将资源上传到线上服务器。
