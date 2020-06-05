// pages/mine/mine.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelList:[
      {
        icon: "/utils/image/1243@2x.png",
        menuName: "我的待办",
        id:1
      },
      {
        icon: "/utils/image/1559@2x.png",
        menuName: "我的已办",
        id:2
      },
      {
        icon: "/utils/image/1244@2x.png",
        menuName: "我的申请",
        id:3
      },
      {
        icon: "/utils/image/cg1862@2x.png",
        menuName: "我的草稿",
        id:4
      }
    ],
    list: [
      {
        pageUrl: "myInfos/myInfos",
        icon: "/utils/image/1212@2x.png",
        menuName: "消息",
      },
      {
        pageUrl: "notice/notice",
        icon: "/utils/image/1212@2x.png",
        menuName: "公告",
      },
      {
        pageUrl: "settings/settings",
        icon: "/utils/image/1407@2x.png",
        menuName: "设置",
      }, {
        pageUrl: "feedback/feedback",
        icon: "/utils/image/1408@2x.png",
        menuName: "反馈",
      },
      {
        pageUrl: "",
        icon: "/utils/image/1410@2x.png",
        menuName: "邀请",
      },
      {
        pageUrl: "settings/aboutPlat/aboutPlat",
        icon: "/utils/image/1409@2x.png",
        menuName: "关于",
      }
    ],
    count: {},
    userInfo:{}
  },
  //去看数据报告
  enterDataReport:function(){
    if(app.userInfo.id){
      wx.navigateTo({
        url:'dataReport/dataReport'
      })
    }else{
      wx.navigateTo({
        url: "/pages/login/login",
      })
    }
  },
  //登录
  login: function () {
    app.navgateToPage("/pages/login/login")
  },
  //注册
  regester: function () {
    wx.navigateTo({
      url: '/pages/regester/regester',
    })
  },
  //跳转
  goPage: function (e) {
    if(app.userInfo.username){
      let type = e.currentTarget.dataset.id
      app.navgateToPage("/pages/workList/workList?type=" + type)
    }else{
      wx.navigateTo({
        url: "/pages/login/login",
      })
    }
  },
  //设置用户信息
  setUserInfo:function(){
    this.setData({
        userInfo:app.userInfo
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
  //获取个人事项数量
  getCount: function () {
    app.$ajax.$ajax(
      app.$api.getWorkCount,
      'get',
      null,
      res => {
        if (res) {
          this.setData({
            count: res
          })
        }
      })
  },
  //去看用户 资料
  goUserPro:function(){
    if(app.userInfo.id){
      wx.navigateTo({
        url: 'settings/editProfile/editProfile',
      })
    }else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    // app.getUserInfos(res => {
    //   if (res) {
    //     app.userInfo = res
    //     this.setUserInfo()
    //   }
    // })
    this.setUserInfo()
    try {
      let v = wx.getStorageSync('token')
      if(v){
        that.getCount()
      }else{
        this.setData({
          count:{}
        })
      }
    } catch (e) {}
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