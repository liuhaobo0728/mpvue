<template>
	<div class="comments">
		<div class="title" v-if="comments.length">评论:</div>
		<div class="list" :key="comments.id" v-for="item of comments" @click="handleUrlClick(item.bookid)">
			<div class="user">
				<div class="inline">
					<img class="list-img" :src="item.image" mode="aspectFit">
					<span class="name">{{ item.title }}</span>
				</div>
				<div class="right">
					{{ item.location || '未知地点'}}--
					{{ item.phone || '未知型号'}}
				</div>
				<div class="comment">
					{{ item.comment }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		comments: Array,
		type: String
	},
	methods:{
		handleUrlClick(bookid) {
			if(this.type == 'user'){
				wx.navigateTo({
					url: '/pages/detail/main?id=' + bookid
				})
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
	.comments
		margin: 20rpx 20rpx
		.title
			font-size: 40rpx
			font-weight: bold
	.list
		margin-top: 20rpx
		.user
			.inline
				display: inline-block
				vertical-align: middle
				.list-img
					width: 50rpx
					height: 50rpx
					border-radius: 50%	
				.name
					padding-left: 10rpx
			.right
				float: right
				font-weight: 400
			.comment
				margin-top: 15rpx
				text-indent: 2em
			
</style>