<template>
	<div class="yearProgress">
    <!-- 小程序进度条组件 -->
		<progress :percent='percent' activeColor='#ca3737' show-info active></progress>
		<p class="year-text">{{year}}年已经过去了{{days}}天~~你干了什么？</p>
	</div>
</template>

<script>
export default{
  methods: {
    //判断闰年
    isLeapYear () {
      const year = new Date().getFullYear()
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    getDayOfYear () {
      return this.isLeapYear() ? 366 : 365
    }
  },
  computed: {
    //当前年
    year () {
      return new Date().getFullYear()
    },
    //今年的第多少天
    days () {
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)

      let offset = new Date().getTime() - start.getTime()
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    },
    //计算百分比
    percent () {
      return (this.days / this.getDayOfYear() * 100).toFixed(1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .yearProgress
    width: 80%
    margin: 20rpx auto
    .year-text
      text-align: center
      font-size: 26rpx
      font-weight: bold
      color: #25663a
      padding-top: 30rpx

</style>