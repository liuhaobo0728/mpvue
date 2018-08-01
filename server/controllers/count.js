/*
* @Author: 56513
* @Date:   2018-07-30 17:56:46
* @Last Modified by:   56513
* @Last Modified time: 2018-07-30 21:55:32
*/
const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
	const count = await mysql("books")
					.select("id","title","image","count")
					.orderBy("count", "desc")
					.limit(9)
	ctx.state.data = {
		list: count
	}
}