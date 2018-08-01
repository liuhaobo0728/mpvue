<template>
	<div class="evaluate">
		<comments-list v-if="userinfo.openId" type="user" :comments="comments"></comments-list>
		<div class="cart" v-if="userinfo.openId">
			<div class="cart-name">我的图书:</div>
			<cart v-for="(item,index) of booklist" :key="item.id" :book="item"></cart>
		</div>
		<div class="cart-else" v-if="!booklist.length">
			还没有添加快去添加吧
		</div>
	</div>
</template>

<script>
import CommentsList from '@/components/CommentsList'
import cart from '@/components/cart'
import {get} from '@/util'
export default {
	components:{
		CommentsList,
		cart
	},
	data() {
		return {
			comments: [],
			userinfo: {},
			booklist: []
		}
	},
	methods:{
		async getComments() {
			const comments = await get('/weapp/commentlist',{openid: this.userinfo.openId})
			this.comments = comments.list
		},
		async getBookList() {
			const booklist = await get('/weapp/booklist',{openid: this.userinfo.openId})
			this.booklist = booklist.list
			console.log(this.booklist)
		},
		init() {
			wx.showNavigationBarLoading()
			this.getComments()
			this.getBookList()
			wx.hideNavigationBarLoading()
		}
	},
	onPullDownRefresh(){
		this.init()
		wx.stopPullDownRefresh()
	},
	onShow() {
		if(!this.userinfo.openId){
			let userinfo = wx.getStorageSync("userinfo")
			if(userinfo) {
				this.userinfo = userinfo
				this.init()
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
	.evaluate
		.cart
			.cart-name
				margin-left: 20rpx;
				font-size: 40rpx
				font-weight: bold
</style>