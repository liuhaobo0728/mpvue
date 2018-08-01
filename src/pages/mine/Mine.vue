<template>
	<div class="container"> 
		<div class="userinfo"> 
			<img class="userinfo-avatar" :src="userinfo.avatarUrl"> 
			<p class="userinfo-nickname">{{userinfo.nickName}}</p> 
		</div>
		<year-progress></year-progress>
		<button v-if="userinfo.openId"  class='btn' @click="scanBook">添加图书</button>
		<button v-else open-type="getUserInfo" lang="zh_CN"  class='btn' @getuserinfo="login">点击登录</button>
	</div>

</template>

<script>
import qcloud from 'wafer2-client-sdk'
import {showSuccess,post,showModel} from '@/util'
import config from '@/config'
import yearProgress from '@/components/yearProgress'
export default {
  components: {
    yearProgress
  },
  data () {
    return {
      userinfo: {
        avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
        nickName: ''
      }
    }
  },
  methods: {
    async addBook(isbn) {
      const res = await post('/weapp/addbook',{
        isbn,
        openid: this.userinfo.openId
      })
      showModel('添加成功',`${res.title}-添加成功`)
      if(res.code === 0 && res.data.title){
        showSuccess('添加成功',`${res.data.title}-添加成功`)
      }
    },
    scanBook () {
      wx.scanCode({
        success: (res) => {
          if(res.result) {
            this.addBook(res.result)
          }
        }
      })
    },
    getWxLogin: function ({encryptedData, iv, userinfo}) {
      const _this = this
      wx.login({
        success: function (loginResult) {
          console.log('loginResult', loginResult)
          var loginParams = {
            code: loginResult.code,
            encryptedData: encryptedData,
            iv: iv
          }
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.login({
            loginParams,
            success () {
              qcloud.request({
                url: config.userUrl,
                login: true,
                success (userRes) {
                  showSuccess('登录成功')
                  wx.setStorageSync('userinfo', userRes.data.data)
                  console.log(userRes.data.data)
                  _this.userinfo = userRes.data.data
                }
              })
            },
            fail (error) {
              showModel("登录失败",error)
            }
          })
        },
        fail: function (loginError) {
         showModel("登录失败",LoginError)
        }
      })
    },
    login (e) {
      const _this = this
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.checkSession({
              success: function () {
                showSuccess('登陆成功')
              },
              fail: function () {
                qcloud.clearSession()
                var options = {
                  encryptedDate: e.mp.detail.encryptedData,
                  iv: e.mp.detail.iv,
                  userinfo: e.mp.detail.userInfo
                }
                _this.getWxLogin(options)
              }
            })
					 } else {
            console.log(111)
          }
        }
      })
    }
  },
  onShow () { 
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }

}
</script>

<style lang="stylus" scoped>
  .userinfo
    padding-top: 100rpx
    text-align: center
    .userinfo-avatar
      width:200rpx
      height:200rpx
      border-radius: 50%
    .userinfo-nickname
      padding: 20rpx 0
      font-size: 60rpx
  .btn
    margin-top: 100rpx
    background: #eee
    width: 90%
    font-size: #e74e63
    border-radius: 2px
    font-weight: bold
    &:active
      background: #d6d2d2

</style>