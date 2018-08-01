/*
* @Author: 56513
* @Date:   2018-07-31 17:03:46
* @Last Modified by:   56513
* @Last Modified time: 2018-07-31 17:28:33
*/
const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
	const { bookid,comment,openid,location,phone } = ctx.request.body
	try{
		await mysql('comments').insert({ bookid,comment,openid,location,phone })
		ctx.state.data = {
			msg: 'success'
		}
	}catch(e){
		catx.state = {
			code: -1,
			data: {
				msg :'评论失败,'+ e.sqlMessage
			}
		}
	}
}