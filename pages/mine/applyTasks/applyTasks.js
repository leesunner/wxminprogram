// pages/mine/applyTasks/applyTasks.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    processId:'',
    list:[],
    contentRefresher: false,
    bottomMore: true,
    canGetMore: true
  },
  //下拉刷新
  refresherpull: function () {
    this.getApplyDetail()
  },
  //上拉加载 更多
  scrolltolower: function () {
    this.getApplyDetail()
  },
  //设置scroll的状态、list数据
  setScrollStatus:function(res){
    let list = res.list?res.list:res
    this.setData({
      list: list,
      contentRefresher:false,
      bottomMore:true
    })
    if(list.length<1){
      this.setData({
        canGetMore:false
      })
    }
  },
  //获取我的申请详情
  getApplyDetail:function(){
    wx.showLoading({
      title: '加载中...',
      icon:"none"
    })
    app.$ajax.$ajax(
      app.$api.applyProc+'/'+this.data.processId,
      'get',
      null,
      res => {
        if(res){
          this.setScrollStatus(res)
        }
        wx.hideLoading()
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      processId:options.processId
    })
    this.getApplyDetail()
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