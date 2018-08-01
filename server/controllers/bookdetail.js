/*
* @Author: 56513
* @Date:   2018-07-30 17:43:53
* @Last Modified by:   56513
* @Last Modified time: 2018-07-31 00:16:52
*/
const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
	const {id} = ctx.request.query
	const detail = await mysql('books')
						.select('books.*','cSessionInfo.user_info')
						.join('cSessionInfo','books.openid','cSessionInfo.open_id')
						.where('id',id)
						.first()
	const info = JSON.parse(detail.user_info)
	ctx.state.data = Object.assign({},detail,{
		tags: detail.tags.split(','),
		summarg :detail.summarg.split('\n'),
		user_info: {
			name: info.nickName,
			image: info.avatarUrl
		}
	})

	
	await mysql("books")
			.where('id',id)
			.increment('count',1)
}