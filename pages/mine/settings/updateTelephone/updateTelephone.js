// pages/mine/settings/updateTelephone/updateTelephone.js
const app = getApp();
var setTime = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telephone: '',
    codeText: '发送验证码',
    loading: false,
    disabled: false,
    verificationCode: '',
    telephoneInput: '',
    changePhone: false,
  },
  //手机号输入变化
  inputTelChange: function (e) {
    this.setData({
      telephoneInput: e.detail.value
    })
  },
  //验证码输入变化
  inputCodeChange: function (e) {
    this.setData({
      verificationCode: e.detail.value
    })
  },
  //下一步提交验证手机号
  nextStep: function () {
    let that = this
    let obj = {
      verificationCode: that.data.verificationCode,
      telephone: that.data.telephone
    }
    app.$ajax.$ajax(
      app.$api.checkTelCode,
      'get',
      obj,
      res => {
        if (res == null) {
          clearTimeout(setTime)
          that.setData({
            changePhone: true,
            codeText: '发送验证码',
            disabled: false,
            verificationCode: ''
          })
        }
      })
  },
  //提交修改手机号
  submitInfo:function(){
    let obj = {
      verificationCode: this.data.verificationCode,
      telephone: this.data.telephone,
      newMobilePhone:this.data.telephoneInput
    }
    app.$ajax.$ajax(
      app.$api.updateTelephone,
      'patch',
      obj,
      res => {
        if (res == null) {
          app.loginOut()
        }
      })
  },
  //发送验证码
  sendCode: function () {
    if (this.data.changePhone ? app.checkPhone(this.data.telephoneInput) : app.checkPhone(this.data.telephone)) {
      let that = this
      this.setData({
        loading: true
      })
      app.$ajax.$ajax(
        app.$api.sendCode + (this.data.changePhone ? this.data.telephoneInput : that.data.telephone),
        'get',
        null,
        res => {
          if (res !== false) {
            that.setData({
              codeText: 60,
              loading: false,
              disabled: true
            })
            that.countDown()
          } else {
            that.setData({
              loading: false,
              disabled: false
            })
          }
        })
    } else {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: "none"
      })
    }
  },
  //倒计时
  //倒计时
  countDown: function () {
    let that = this
    setTime = setTimeout(() => {
      var num = that.data.codeText - 1
      that.setData({
        codeText: num
      })
      if (that.data.codeText === 0) {
        that.setData({
          codeText: '发送验证码',
          disabled: false
        })
      } else {
        that.countDown()
      }
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      telephone: app.userInfo.telephone
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})