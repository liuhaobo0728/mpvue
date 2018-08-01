# book-record

> A Mpvue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


项目名称： 记录图书微信小程序
项目描述： 	登录页有借助豆瓣API实现扫码添加图书功能。
			      首页展示图书，展示顺序为从后到前，首页顶部根据图书浏览量排行榜实现轮播图。
			      图书详情页可评价图书，微信API获取手机型号，百度地图API根据经纬度获取位置。
			      评论页可查看评论可本微信账号添加的图书。


实现技术： 采用mpvue框架开发前端，css使用stylus，和微信开发的接口等，koa框架开发后端，数据库用mysql

项目目录： 前端文件为src，后端文件为server， 数据库表server/tools/snail.sql。项目采用本地环境搭建如需预览可下载到本地 关联数据库启动。 数据库配置为Server/config.js。

项目展示：![Image text](https://raw.githubusercontent.com/liuhaobo0728/Meituan/master/img/%E9%A6%96%E9%A1%B5.png)

项目收获： 了解了微信小程序的开发步骤，从前端到后端的整体开发流程，对mpvue有了进一步的认识、了解了koa的基本用法。
