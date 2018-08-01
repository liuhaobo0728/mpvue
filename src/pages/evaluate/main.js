/*
* @Author: 56513
* @Date:   2018-07-29 01:13:23
* @Last Modified by:   56513
* @Last Modified time: 2018-08-01 14:32:55
*/
import Vue from 'vue'
import Evaluate from './Evaluate'

const app = new Vue(Evaluate)
app.$mount()

export default {
		config:{
			enablePullDownRefresh: true
	}
}
