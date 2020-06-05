// pages/workList/workList.js

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    type: "",
    url: '',
    showController:false,
    contentRefresher: false,
    bottomMore: false,
    canGetMore: false,
    searchPage: {
      pageSize: 15,
      pageNum: 1,
      name:'',
      businessName:'',
    },
  },
  //下拉刷新
  refresherpull: function () {
    this.setData({
      ['searchPage.pageNum']: 1,
      bottomMore:false,
      canGetMore: false
    })
    this.getListByType()
  },
  //上拉加载 更多
  scrolltolower: function () {
    let num = this.data.searchPage.pageNum + 1
    this.setData({
      ['searchPage.pageNum']: num
    })
    this.getListByType()
  },
  //设置scroll的状态、list数据
  setScrollStatus:function(res){
    let list = res.list?res.list:res
    if(this.data.searchPage.pageNum>1){
      if(list.length>0){
        list = this.data.list.concat(list)
      }else{
        list = this.data.list
      }
    }
    this.setData({
      list: list,
      contentRefresher:false,
      bottomMore:true,
      showController:true
    })
    if(list.length<this.data.searchPage.pageSize){
      this.setData({
        canGetMore:true
      })
    }
  },
  //获取列表数据
  getList: function (url) {
    this.setData({
      url: url
    })
    app.$ajax.$ajax(
      url,
      'get',
      this.data.searchPage,
      res => {
        if(res){
          this.setScrollStatus(res)
        }
      })
  },
  //获取我的待办
  getDeTasks() {
    this.getList(app.$api.gtasks)
  },
  //获取我的已办
  getEndTasks() {
    this.getList(app.$api.endGtasks)
  },
  //获取我的申请
  getApplyTasks() {
    this.getList(app.$api.applyProc)
  },
  //获取草稿列表
  getDraftTasks:function(){
    this.getList(app.$api.draftList)
  },
  //根据type查询对应数据列表
  getListByType:function(e=""){
    if(e!=""){//e是搜索组件传过来的值
      this.setData({
        ['searchPage.name']:e.detail.value,
        ['searchPage.businessName']:e.detail.value
      })
    }
    switch (this.data.type) {
      case 1:
        wx.setNavigationBarTitle({
          title: '我的待办'
        })
        this.getDeTasks()
        break;
      case 2:
        wx.setNavigationBarTitle({
          title: '我的已办'
        })
        this.getEndTasks()
        break;
      case 3:
        wx.setNavigationBarTitle({
          title: '我的申请'
        })
        this.getApplyTasks()
        break;
      case 4:
        wx.setNavigationBarTitle({
          title: '我的草稿'
        })
      this.getDraftTasks()
      break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    "type，1:待办。2：已办。3：申请。4：草稿"
    if (options.type) {
      let type = Number(options.type)
      this.setData({
        type: type
      })
      this.getListByType()
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