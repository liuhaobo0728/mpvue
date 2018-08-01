<template>
	<div class="bookcart">
		<a :href="detailUrl">
		<div class="book-img" @click.stop="preview">
			<img :src="book.image" class="img" mode="aspectFit">
		</div>
		<div class="detail">
			<div class="row">
				<div class="evel">
					{{ book.rate }} <rate :value="book.rate"></rate>
				</div>
				<div class="title">
					{{ book.title }}
				</div>
			</div>
			<div class="row">
				<div class="evel">
					{{ book.count }}
				</div>
				<div class="title">
					{{ book.author }}
				</div>
			</div>
			<div class="row">
				<div class="evel">
					{{ book.user_info.nickName }}
				</div>
				<div class="title">
					{{ book.publisher }}
				</div>
			</div>
		</div>
		</a>
	</div>
</template>

<script>
import rate from '@/components/rate'
export default {
	components: {
		rate
	},
	props: {
		book: Object
	},
	computed:{
		detailUrl() {
			return '/pages/detail/main?id=' + this.book.id
		}
	},
	methods:{
		preview() {
			wx.previewImage({
				current: this.book.image,
				urls:[this.book.image]
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
	.bookcart
		width: 700rpx
		margin-top: 20rpx
		overflow: hidden
		font-size: 0
		.book-img
			float: left
			width: 180rpx
			height: 180rpx
			margin: 0 auto
			overflow: hidden
			.img
				max-width: 100%
				max-height: 100%
		.detail
			dispaly: inline-block
			.row
				line-height: 60rpx
				font-size:30rpx
				.evel
					color: #fe0505
					float: right
				.title
					font-weight:bold
					
				
</style>