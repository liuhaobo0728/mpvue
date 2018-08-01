/*
* @Author: 56513
* @Date:   2018-07-30 12:28:08
* @Last Modified by:   56513
* @Last Modified time: 2018-08-01 15:34:08
*/
//获取豆瓣信息

const https = require('https')
const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
	const { isbn,openid } = ctx.request.body
	if(isbn && openid) {
		const findRes = await mysql('books').select().where('isbn',isbn)
		if(findRes.length){
			ctx.state = {
				code: -1,
				data: {
					msg: '图书已存在'
				}
			}
			return
		}

		let url = 'https://api.douban.com/v2/book/isbn/' + isbn
		const bookinfo = await getJSON(url)
		const rate = bookinfo.rating.average
		const {title,image,alt,publisher,summarg,price} = bookinfo
		const tags = bookinfo.tags.map(v => {
			return `${v.title} ${v.count}`
		}).join(',')
		const author = bookinfo.author.join(',')
		try{
		await mysql('books').insert({
			isbn,openid,rate,title,image,alt,publisher,summarg,price,tags,author
		})
		ctx.state.data = {
			title,
			msg: 'success'
		}
		}catch(e){
			ctx.state = {
				code: -1,
				data: {
					msg: '新增失败:' + e.sqlMessage
				}
			}
		}
		console.log({
			rate,title,image,alt,publisher,summarg,price,tags,author
		})
	}
} 

function getJSON(url) {
	return new Promise((resolve,reject) => {
		https.get(url,res => {
			let urlData = ''
			res.on('data',data => {
				urlData += data
			})
			res.on('end',data => {
				const bookinfo = JSON.parse(urlData)
				if(bookinfo.title) {
					resolve(bookinfo)
				}
				reject(bookinfo)
			})
		})
	})
}
//入库