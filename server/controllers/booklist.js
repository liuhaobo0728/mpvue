/*
* @Author: 56513
* @Date:   2018-07-30 15:09:12
* @Last Modified by:   56513
* @Last Modified time: 2018-08-01 14:45:15
*/

const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
	const {page,openid} = ctx.request.query
	const size = 6
	const mysqlSelect = mysql('books')
					.select('books.*','cSessionInfo.user_info')
					.join('cSessionInfo','books.openid','cSessionInfo.open_id')
					.orderBy('books.id','desc')
	let books
	if(openid){
		books = await mysqlSelect.where('books.openid',openid)
	}else{
		books = await mysqlSelect.limit(size).offset(Number(page) * size)
	}
	ctx.state.data = {
		list: books.map(v => {
			const info = JSON.parse(v.user_info)
			return Object.assign({},v,{
				user_info:{
					nickName: info.nickName
				}
			})
		})
	}

}