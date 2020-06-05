// pages/mine/settings/updatePassword/updatePassword.js
var utils = require('../../../../utils/util')
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBox:true,
    password:'',
    restPassword:''
  },
   //用户名输入变化
   inputUChange: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  //密码输入变化
  inputPChange: function (e) {
    this.setData({
      restPassword: e.detail.value
    })
  },
  //提交信息
  formSubmit: function (e) {
    let obj = e.detail.value
    obj.telephone = this.data.telephone
    if (!obj.password) {
      wx.showToast({
        title: '请输入密码',
        icon:'none'
      })
      return
    }
    if (!obj.restPassword) {
      wx.showToast({
        title: '请再次输入密码',
        icon:'none'
      })
      return
    }
    if (obj.restPassword!=obj.password) {
      wx.showToast({
        title: '两次输入密码不一致',
        icon:'none'
      })
      return
    }
    obj.restPassword = utils.encrypt(obj.restPassword)
    obj.password = utils.encrypt(obj.password)
    app.$ajax.$ajax(
      app.$api.confirmPass,
      'put',
      obj,
      res => {
        if(res==null){
          wx.showToast({
            title: '操作成功',
            icon:'none'
          })
          app.loginOut()
        }
      })
  },
  //手机发送验证码后回调状态
  onResult:function(e){
    if(e.detail.value){
      this.setData({
        showBox:false,
        telephone:e.detail.telephone
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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