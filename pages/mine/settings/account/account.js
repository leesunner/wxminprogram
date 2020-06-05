// pages/mine/settings/account/account.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telphone:'',
    list:[
      {
        text:'手机号',
        url:'/pages/mine/settings/updateTelephone/updateTelephone'
      },
      {
        text:'修改密码',
        url:'/pages/mine/settings/updatePassword/updatePassword'
      },
      // {
      //   text:'注销账号',
      //   url:''
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tel = app.userInfo.telephone
    if(tel){
      let str = tel.toString();
      this.setData({
        telphone:str.substr(0,3)+'****'+str.substr(7,4)
      }) 
    } 
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