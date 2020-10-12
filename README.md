# 财人汇项目开发模板

**安装**

> npm i

**开发模式**

> npm run dev

**切换环境**

> npm config set project_name:env development  (开发)

> npm config set project_name:env test         (测试)

> npm config set project_name:env production   (正式)

`切换API也类似，可把env换成api，客户也同理，env换成client，其他也可以根据需求追加配置项`


**运行环境**

* 自动判断当前运行环境，开发接口配置在api里，正式打包配置在config.json中，开发数据在XXX.conf.js 中

**正式打包**

> npm run build （文件打包到dist目录）

> npm run view  (打包前可以查看打包后的文件占比大小)



