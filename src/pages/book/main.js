/*
* @Author: 56513
* @Date:   2018-07-29 01:13:23
* @Last Modified by:   56513
* @Last Modified time: 2018-07-30 16:58:37
*/
import Vue from 'vue'
import Book from './Book'

const app = new Vue(Book)
app.$mount()

export default {
	config:{
		enablePullDownRefresh: true
	}
}