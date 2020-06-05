// pages/mine/myInfos/myInfos.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    contentRefresher: false,
    bottomMore: false,
    canGetMore: false,
    showBlank:false,
    searchPage: {
      pageSize: 15,
      pageNum: 1,
      name:'',
    },
  },

  getList: function (e="") {
    if(e!=""){
      this.setData({
        ['searchPage.name']:e.detail.value
      })
    }  
    app.$ajax.$ajax(
      app.$api.notice+'/my',
      'get',
      this.data.searchPage,
      res => {
        if(res){
          this.setScrollStatus(res)
        }
      })
  },
   //下拉刷新
   refresherpull: function () {
    this.setData({
      ['searchPage.pageNum']: 1,
      bottomMore:false,
      canGetMore: false
    })
    this.getList()
  },
  //上拉加载 更多
  scrolltolower: function () {
    let num = this.data.searchPage.pageNum + 1
    this.setData({
      ['searchPage.pageNum']: num
    })
    this.getList()
  },
   //设置scroll的状态、list数据
   setScrollStatus:function(res){
    let list = res.list?res.list:res
    if(list.length<this.data.searchPage.pageSize){
      this.setData({
        canGetMore:true
      })
    }
    if(this.data.searchPage.pageNum>1){
      if(list.length>0){
        list = this.data.list.concat(list)
      }else{
        list = this.data.list
      }
    }
    this.setData({
      list: list,
      showBlank:true,
      contentRefresher:false,
      bottomMore:true,
      showController:true
    })
  },
  //查看详情
  goNoticeDetail:function(e){
    wx.navigateTo({
      url: 'myInfosDetail/myInfosDetail?id='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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