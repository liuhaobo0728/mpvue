/*
* @Author: 56513
* @Date:   2018-07-29 01:13:23
* @Last Modified by:   56513
* @Last Modified time: 2018-08-01 14:53:29
*/
import Vue from 'vue'
import Mine from './Mine'

const app = new Vue(Mine)
app.$mount()
export default {
	config:{
		'navigationBarTitleText': '个人中心',
	}
}
