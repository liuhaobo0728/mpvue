<template>
	<div class="swiper">
		<swiper
			:indicator-dots="true"
			indicator-color='#eee'
			:autoplay='true'
			:interval='6000'
			:duration='1000'
			:circular='true'
		>
			<div :key='index' v-for="(item,index) of imgURLs">
				<swiper-item>
					<img 
					:key="item.id"
					v-for="(img,index1) of item"
					class="swiper-img" 
					:src="img.image" 
					mode="aspectFit" 
					:alt="img.image"
					@click="bookDetail(img)"
					>
				</swiper-item>
			</div>
		</swiper>
	</div>
</template>

<script>
export default {
	props: {
		count: Array
	},
	computed:{
		imgURLs() {
			let res = this.count
			return [res.slice(0,3),res.slice(3,6),res.slice(6)]
		}
	},
	methods:{
		bookDetail(item) {
			wx.navigateTo({
				url: '/pages/detail/main?id=' + item.id
			})
		}
	}
}
</script>

<style scoped>
	.swiper{
		margin-top: 5px;
	}
	.swiper-img{
		width: 33%;
		height: 250rpx;
	}
</style>