/*
* @Author: 56513
* @Date:   2018-07-29 00:59:42
* @Last Modified by:   56513
* @Last Modified time: 2018-08-01 17:27:25
*/
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
const app = new Vue(App)
app.$mount()

export default {
  config: {
    pages: ['^pages/book/main'],
    'window': {
	  'backgroundTextStyle': 'light',
      'navigationBarBackgroundColor': '#d6d2d2',
      'navigationBarTitleText': '记录图书',
      'navigationBarTextStyle': 'black'
    },
    'tabBar': {
    	selectedColor: '#080808',
    	list: [
    	{
    		pagePath: 'pages/book/main',
    		text: '图书',
    		iconPath: 'static/img/book.png',
    		selectedIconPath: 'static/img/book-active.png'
    	},
    	{
    		pagePath: 'pages/evaluate/main',
    		text: '评论',
    		iconPath: 'static/img/evaluate.png',
    		selectedIconPath: 'static/img/evaluate-active.png'
    	},
    	{
    		pagePath: 'pages/mine/main',
    		text: '我的',
    		iconPath: 'static/img/mine.png',
    		selectedIconPath: 'static/img/mine-active.png'
    	}
    	   ]
    }
  }
}
