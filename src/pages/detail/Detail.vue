<template>
	<div class="detail">
		<book-info :info="info"></book-info>
		<comments-list :comments="comments"></comments-list>
		<div class="comment-text" v-if="showAdd">
		<textarea 
			class="textarea" 
			v-model="comment"
			:maxlength="100"
			placeholder="请输入图书评论"></textarea>

			<div class="location">
				<span>地理位置：</span>
				<switch :check="location" color="#ea5a49" @change="getGeo"></switch>
				<span class="loca-text">{{location}}</span>
			</div>
			<div class="phone">
				<span>手机型号：</span>
				<switch :check="phone" color="#ea5a49" @change="getPhone"></switch>
				<span class="phone-text">{{phone}}</span>
			</div>
		<button class="btn" @click="addComment">评论</button>
		</div>
		<div v-else>已经评论或未登录</div>
		<button open-type="share" class="btn">转发</button>
	</div>
</template>

<script>
import {get,post,showModel} from '@/util'
import BookInfo from '@/components/BookInfo'
import CommentsList from '@/components/CommentsList'
export default {
	components:{
		BookInfo,
		CommentsList
	},
	data() {
		return {
			bookid: '',
			info: {},
			location: "",
			phone: "",
			userinfo: {},
			comment: "",
			comments:[]
		}
	},
	computed: {
		showAdd() {
			if(!this.userinfo.openId){
				return false
			}
			if(this.comments.filter(v => v.openid === this.userinfo.openId).length){
				return false
			}
			return true
		}
	},
	methods:{
		async getDetail() {
			const info = await get('/weapp/bookdetail',{id: this.bookid})
			wx.setNavigationBarTitle({
  				title: info.title
			})
			this.info = info
		},
		//hCnQEKGZlo0vKCbTjE7I2bf8DGCjgrdk
		getGeo(e) {
			const ak = "hCnQEKGZlo0vKCbTjE7I2bf8DGCjgrdk"
			const url = "http://api.map.baidu.com/geocoder/v2/"
			if(e.target.value) {
				wx.getLocation({
					success: geo => {
						wx.request({
							url,
							data:{
								ak,
								location: `${geo.latitude},${geo.longitude}`,
								output: 'json'
							},
							success: res => {
								if(res.data.status === 0){
									this.location = res.data.result.addressComponent.city
								}else{
									this.location = ""
								}
							}

						})
					}
				})
			}else{
				this.location = ""
			}
		},
		getPhone(e) {
			if(e.target.value){
				const phoneInfo = wx.getSystemInfoSync()
				console.log(phoneInfo.model
					)
				this.phone = phoneInfo.model
			}else{
				this.phone = ""
			}
		},
		async addComment() {
			if(!this.comment){
				return
			}
			const data = {
				bookid: this.bookid,
				comment: this.comment,
				phone: this.phone,
				location: this.location,
				openid: this.userinfo.openId
			}
			try{
				await post('/weapp/addcomment',data)
				this.comment = ""
				this.getComments()
			}catch(e){
				showModel("失败",e.msg)	
			}
		},
		async getComments() {
			const comments = await get('/weapp/commentlist',{bookid:this.bookid})
			this.comments = comments.list || []
		}
	},
	mounted() {
		this.bookid = this.$root.$mp.query.id
		this.getDetail()
		this.getComments()
		const userinfo = wx.getStorageSync("userinfo")
		if(userinfo){
			this.userinfo = userinfo
		}
	}
}
</script>

<style lang="stylus" scoped>
	.textarea
		width: 700rpx
		height: 200rpx
		margin: 0 auto
		background: #eee
		padding: 20rpx
		border: 1px solid #959191
		border-radius: 10px
	.btn
		margin-top: 50rpx
		background: #eee
		width: 90%
		font-size:#e74e63
		border-radius:2px
		font-weight: bold
		&:active
			background: #d6d2d2
</style>