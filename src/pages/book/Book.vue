<template>
	<div>
		<TopSwiper :count="count"></TopSwiper>
		<cart :key="item.id" v-for='item of books' :book="item"></cart>
		<p class="text-foot" v-if="more">没有更多数据...</p>
	</div>
</template>

<script>
import {get} from '@/util'
import cart from '@/components/cart'
import TopSwiper from '@/components/TopSwiper'
export default {
	components: {
		cart,
		TopSwiper
	},
	data() {
		return {
			books: [],
			page: 0,
			more: false,
			count: []
		}
	},
	methods: {
		async getList(init) {
			if(init){
				this.page = 0
				this.more = false
			}
			wx.showNavigationBarLoading()
			const books = await get('/weapp/booklist',{page: this.page })
			this.books = books.list
			if(books.list.length < 10 && this.page > 0){
				this.more = true
			}
			if(init) {
				this.books = books.list
				wx.stopPullDownRefresh()
			}else{
				this.books = this.books.concat(books.list)
			}
			wx.hideNavigationBarLoading()
		},
		async getCount() {
			const tops = await get('/weapp/count')
			this.count = tops.list
		}
	},
	onReachBottom() {
		if(this.more){
			return false
		}
		this.page = this.page + 1
		this.getList()
	},
	onPullDownRefresh(){
		this.getList(true)
		this.getCount()
		console.log(this.count)
	},
	mounted() {
		this.getList(true)
		this.getCount()
	}
}
</script>

<style lang="stylus" scoped>
	.text-foot
		text-align: center
		font-size: 40rpx
		padding: 30rpx 0
	
</style>