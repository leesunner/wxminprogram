// pages/mine/notice/notice.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    list: [],
    showController: false,
    contentRefresher: false,
    bottomMore: false,
    canGetMore: false,
    searchPage: {
      pageSize: 15,
      pageNum: 1,
      name: '',
    },
    noticeState: false,
  },
  //下拉刷新
  refresherpull: function () {
    this.setData({
      ['searchPage.pageNum']: 1,
      bottomMore: false,
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
  setScrollStatus: function (res) {
    let list = res.list ? res.list : res
    if (list.length < this.data.searchPage.pageSize) {
      this.setData({
        canGetMore: true
      })
    }
    if (this.data.searchPage.pageNum > 1) {
      if (list.length > 0) {
        list = this.data.list.concat(list)
      } else {
        list = this.data.list
      }
    }
    this.setData({
      list: list,
      contentRefresher: false,
      bottomMore: true,
      showController: true
    })
  },
  //去公告发布页
  sendNotice: function () {
    wx.navigateTo({
      url: 'sendNotice/sendNotice',
    })
  },
  //获取公告列表
  getList: function (e = "") {
    if (e != "") {
      this.setData({
        ['searchPage.name']: e.detail.value
      })
    }
    app.$ajax.$ajax(
      app.$api.myReport,
      'get',
      this.data.searchPage,
      res => {
        if (res) {
          this.setScrollStatus(res)
        }
      })
  },
  //去查看公告详情
  goNoticeDetail: function (e) {
    let id = e.currentTarget.dataset.reportid
    wx.navigateTo({
      url: '/pages/mine/notice/noticeDetail/noticeDetail?id=' + id,
    })
  },
  //获取菜单
  getMenuBtnId: function () {
    app.$ajax.$ajax(
      app.$api.menus + '29/children',
      'get',
      null,
      res => {
        if (res) {
          let buttonsId;
          res.forEach(item => {
            if (item.menuName == '公告') {
              buttonsId = item.id;
              return
            }
          })
          //获取按钮权限
          app.$ajax.$ajax(
            `${app.$api.buttons + buttonsId}/buttons`,
            'get',
            null,
            res => {
              if (res.length > 0) {
                this.setData({
                  noticeState: true
                })
              }
            })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
    this.getMenuBtnId()
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