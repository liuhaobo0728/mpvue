<template>
	<div class="bookinfo">
		<div class="thumb">
			<img 
			class="back" 
			:src="info.image"
			mode="aspectFill"
			>
			<img 
			class="img" 
			:src="info.image"
			mode="aspectFit"
			>
		<div class="info">
			<div class="title">
				{{ info.title }}
			</div>
			<div class="anthor">
				{{ info.author }}
			</div>
		</div>
		</div>
		<div class="detail">
			<img 
			class="avatar" 
			:src="userinfo.image" 
			mode="aspectFit">
			{{userinfo.name}}
			<div class="right">
				{{ info.rate}}
				<rate :value="info.rate"></rate>
			</div>
		</div>
		<div class="detail">
			{{ info.publisher }}
			<div class="right">
				{{ info.price}}
			</div>
		</div>
		<div class="tags">
			<div
			class="badge"
			:key="index"
			v-for="(item,index) of info.tags"
			v-if="item.length">{{ item }}
			</div>
			
		</div> 
		<div 
		class="summarg"
		:key="index"
		v-for="(item,index) of info.summarg"
		v-if="item.length">
		<div class="mysum">简介：</div>
		<p class="sum-text">{{ item }}</p></div>
	</div>
</template>

<script>
import rate from '@/components/rate'
export default {
	components: {
		rate,
	},
	props:{
		info: Object
	},
	computed:{
		userinfo() {
			return this.info.user_info || {}
		}
	}
}
</script>

<style lang="stylus" scoped>
	.thumb
		position: relative;
		width: 750rpx;
		height: 350rpx;
		overflow: hidden;
		.back
			filter: blur(25px);
			width: 100%;
		.img
			position: absolute;
			top: 20rpx;
			left: 0;
			width: 100%;
			height: 170rpx;
	.info
		position: absolute;
		left: 0;
		top: 220rpx;
		width: 100%;
		text-align: center;
		color: #080808;
		font-size: 35rpx
		font-weight: bold
		line-height: 50rpx
	.detail
		padding: 15rpx 20rpx;
		line-height: 40rpx
		font-size: 35rpx
		.avatar
			width: 50rpx;
			height: 50rpx;
			border-radius: 50%;
			vertical-align: middle;
		.right
			float: right
			color: red
			vertical-align: center
	.tags
		font-size: 30rpx
		margin: 10rpx 20rpx
		.badge
			display: inline-block;
			padding: 5rpx;
			border-radius: 10px;
			border: 1px solid #7a7777;
	.summarg
		margin: 20rpx 20rpx
		.mysum
			font-size:40rpx
			font-weight: bold
		.sum-text
			text-indent: 2em
			font-size: 30rpx
	
</style>