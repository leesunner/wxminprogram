// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      longinTpye:1//1用户名登录；2手机登录
  },
  //切换登录方式
  changeWay:function(){
    if(this.data.longinTpye==1){
      this.setData({
        longinTpye:2
      })
    }else{
      this.setData({
        longinTpye:1
      })
    }
  },
  //忘记密码
  goPass:function(){
    wx.navigateTo({
      url: '/pages/mine/settings/updatePassword/updatePassword',
    })
  },
  //去注册页面
  goReg:function(){
    wx.navigateTo({
      url: '/pages/regester/regester',
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