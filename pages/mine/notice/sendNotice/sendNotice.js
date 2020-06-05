// pages/mine/notice/sendNotice/sendNotice.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  sendInfo:function(e){
    app.showModel('确认发布公告',res=>{
      if(res){
        //获取按钮权限
        app.$ajax.$ajax(
          app.$api.sendNotice,
          'post',
          e.detail.value,
          res => {
            if (res==null) {
              wx.showToast({
                title: '发布成功',
                icon:"none"
              })
              setTimeout(()=>{
                wx.navigateBack()
              },150)
            }
          })
      }else{
        wx.showToast({
          title: '已取消',
          icon:"none"
        })
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