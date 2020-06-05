// pages/searchPage/searchPage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotList: [],
    historyList: [],
    tabType: 1,
    allList: {},//
    contentList: [],
    usersList: [],
    tabList: [
      {
        name: '综合',
        id: 1
      },
      {
        name: '内容',
        id: 2
      },
      {
        name: '用户',
        id: 3
      }
    ],
    searchWord: '',
    showBlank:false,
    contentRefresher: false,
    bottomMore: false,
    canGetMore: false,
    searchPage: {
      pageNum: 1,
      pageSize: 15,
      keywords: ""
    },
  },
  //下拉刷新
  refresherpull: function () {
    this.setData({
      ['searchPage.pageNum']: 1,
      bottomMore:false,
      canGetMore: false
    })
    this.getSwitchData(this.data.tabType)
  },
  //上拉加载 更多
  scrolltolower: function () {
    let num = this.data.searchPage.pageNum + 1
    this.setData({
      ['searchPage.pageNum']: num
    })
    this.getSwitchData(this.data.tabType)
  },
  //点击查看全部用户
  onCallbackUser: function () {
    this, setData({
      tabType: 3
    })
  },
  //点击查看 全部内容
  onCallbackContent: function () {
    this, setData({
      tabType: 2
    })
  },
  //获取搜索热词
  getHotWords: function () {
    app.$ajax.$ajax(
      app.$api.hotWords,
      'get',
      null,
      res => {
        this.setData({
          hotList: res
        })
      })
  },
  //获取tab组件并设值
  getTabComponent:function(val){
    let tab = this.selectComponent('#tabBarObj')
    tab.setData({
      tabSelect:val
    })
  },
  //点击热词或历史词搜索
  getWordSearch: function (e) {
    // this.getTabComponent(0)
    let t =  e.currentTarget.dataset.word
    this.setData({
      searchWord: t,
      showBlank:false,
      ['searchPage.keywords']:t,
      usersList:[],
      allList: {},
      contentList: [],
      bottomMore:false,
      canGetMore: false
    })
    // this.getSwitchData(this.data.tabType)
    this.allSearch()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotWords()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //处理接口返回后，scroll的状态
  setScrollStatus: function (res, type) {
    let list = res.list ? res.list : res
    switch (type) {
      case 1:
        if (this.data.searchPage.pageNum == 1) {
          this.setData({
            showBlank:true,
            allList: list,
            contentRefresher: false,
            bottomMore: true,
            canGetMore: true
          })
        }
        break;
      case 2:
        if (this.data.searchPage.pageNum > 1) {
          if (list.length > 0) {
            list = this.data.contentList.concat(list)
          } else {
            list = this.data.contentList
          }
        }
        this.setVarStatus('contentList', list)
        break;
      case 3:
        if (this.data.searchPage.pageNum > 1) {
          if (list.length > 0) {
            list = this.data.usersList.concat(list)
          } else {
            list = this.data.usersList
          }
        }
        this.setVarStatus('usersList', list)
        break;
    }
    if(list.length<this.data.searchPage.pageSize){
      this.setData({
        canGetMore:true
      })
    }
  },
  //公共设置变量函数
  setVarStatus: function (arr, list) {
    this.setData({
      showBlank:true,
      [arr]: list,
      contentRefresher: false,
      bottomMore: true,
      canGetMore: true
    })
  },
  //综合搜索
  allSearch: function () {
    app.$ajax.$ajax(
      app.$api.allSearch,
      'get',
      this.data.searchPage,
      res => {
        this.setScrollStatus(res, 1)
      })
  },
  //点击查看全部用户
  getUserList:function(){
    this.getTabComponent(2)
    this.setData({
      tabType: 3,
      ['searchPage.pageNum']:1,
      canGetMore:false,
      bottomMore: false
    })
    this.usersSearch()
  },
  //点击查看全部内容
  getContentList:function(){
    this.getTabComponent(1)
    this.setData({
      tabType: 2,
      ['searchPage.pageNum']:1,
      bottomMore: false,
      canGetMore:false
    })
    this.contentSearch()
  },
  //内容搜索
  contentSearch: function () {
    app.$ajax.$ajax(
      app.$api.contentSearch,
      'get',
      this.data.searchPage,
      res => {
        this.setScrollStatus(res, 2)
      })
  },
  //users搜索
  usersSearch: function () {
    app.$ajax.$ajax(
      app.$api.usersSearch,
      'get',
      this.data.searchPage,
      res => {
        this.setScrollStatus(res, 3)
      })
  },
  //tab切换回调
  tabChange: function (e) {
    let index = e.detail.currentTarget.dataset.index
    this.setData({
      tabType: index + 1,
      ['searchPage.pageNum']:1,
      showBlank:false,
      canGetMore:false,
      bottomMore:false
    })
    this.getSwitchData(index + 1)
  },
  //获取数据
  getSwitchData: function (i) {
    this.setData({
      ['searchPage.keywords']: this.data.searchWord
    })
    switch (i) {
      case 1:
        this.allSearch();
        break;
      case 2:
        this.contentSearch();
        break;
      case 3:
        this.usersSearch();
        break;
    }
  },
  //获取输入框的字符
  confirmSearch: function (e) {
    this.setData({
      showBlank:false,
      searchWord: e.detail.value,
      ['searchPage.keywords']:e.detail.value,
      ['searchPage.pageNum']:1,
      canGetMore:false,
      bottomMore:false
    })
    if(e.detail.value==''){
      //清空搜索框的时候调用
      this.setData({
        tabType:1,
        usersList:[],
        allList: {},
        contentList: []
      })
    }else{
      this.getSwitchData(this.data.tabType)
    }
  },
  //获取搜索历史记录
  onHistory: function () {
    let str = wx.getStorageSync('historyList')
    if (str) {
      let arr = JSON.parse(str)
      this.setData({
        historyList: arr
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onHistory()
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