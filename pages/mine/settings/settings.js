// pages/mine/settings/settings.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        text:'个人资料',
        url:'editProfile/editProfile'
      },
      {
        text:'账号与安全',
        url:'account/account'
      },
      // {
      //   text:'消息通知',
      //   url:''
      // },
      {
        text:'关于数字政务',
        url:'aboutPlat/aboutPlat'
      },
      {
        text:'使用帮助',
        url:''
      }
    ]
  },
  loginout:function(){
    app.$ajax.$ajax(
      app.$api.loginout,
      'get',
      null,
      res => {
        wx.showToast({
          title: '退出成功',
          icon:"none"
        })
        app.userInfo = {}
        try {
          wx.clearStorageSync()
          wx.switchTab({
            url: '/pages/index/index',
          })
        } catch (error) {
        }
      })
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