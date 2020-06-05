//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    contentRefresher:false,
    bottomMore:false,
    canGetMore:false,
    deleteDailog:false,
    deleteArtc:{},//被选中的要删除对象
    reasonList:[
      {
        text:"看过了",
        choose:false
      },
      {
        text:"没有价值",
        choose:false
      }
    ],
    reportId:'',//公告公示ID
    searchPage:{
      pageNum:1,
      pageSize:15,
      categoryId:''
    },
    showBlank:false,
    categoriesList:[],
    userInfo: {},
    bannerList: [
      // {
      //   imgUrl:'../../utils/image/adfhsjld.png',
      //   contentUrl:'/pages/mine/notice/noticeDetail/noticeDetail'
      // }
    ],
    articleList:[],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  catchtouchmove:function(){
    return false
  },
  //下拉刷新
  refresherpull:function(){
    this.setData({
      showBlank:false,
      ['searchPage.pageNum']:1,
      bottomMore:false,
      canGetMore:false,
    })
    this.getArticeList()
  },
  //上拉加载 更多
  scrolltolower:function(){
    let num = this.data.searchPage.pageNum+1
    this.setData({
      ['searchPage.pageNum']:num
    })
    this.getArticeList()
  },
  //选择删除理由
  deleteRes:function(e){
    let arr = this.data.reasonList,index=e.currentTarget.dataset.index;
    arr.forEach((item,i)=>{
      if(i===index){
        this.setData({
          ['reasonList['+i+'].choose']:!arr[i].choose
        })
      }
      return
    })
  },
  //点击确认删除
  deleteConfirms:function(e){
    if(e.currentTarget.dataset.type==1){
      //提交接口
    }
    this.setData({
      deleteDailog:false
    })
    let arr = this.data.reasonList;
    arr.forEach((item,i)=>{
      this.setData({
        ['reasonList['+i+'].choose']:false
      })
    })
  },
  //点击 要删除的文章触发
  deleteArticle:function(e){
    let data = e.detail.e.currentTarget.dataset
    this.setData({
      deleteArtc:data,
      deleteDailog:true
    })
  },
  //点击轮播触发
  bindViewTap: function (e) {
    let url  = e.currentTarget.dataset.url
    if(url){
      wx.navigateTo({
        url: url,
      })
    }
  },
  bindGoNotice:function (e) {
    let url  = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url+'?id='+this.data.reportId,
    })
  },
  //获取轮播
  getBanner: function () {
    app.$ajax.$ajax(
      app.$api.banner,
      'get',
      null,
      res => {
        let arr = res?res:[]
        this.setData({
          bannerList: this.data.bannerList.concat(res)
        })
      })
  },
  //获取文章列表
  getArticeList(id) {
    if(id){
      this.setData({
        ['searchPage.categoryId']:id
      })
    }
    // wx.showLoading({
    //   title:'加载中...'
    // })
    app.$ajax.$ajax(
      app.$api.article,
      'get',
      this.data.searchPage,
      res => {
        let list = res.list
        if(this.data.searchPage.pageNum>1){
          if(list.length>0){
            list = this.data.articleList.concat(list)
          }else{
            list = this.data.articleList
          }
        }
        this.setData({
          articleList: list,
          showBlank:list.length<1,//控制显示内容那你空白提示
          contentRefresher:false,
          bottomMore:true,
        })
        if(list.length<this.data.searchPage.pageSize){
          this.setData({
            canGetMore:true
          })
        }
        // wx.hideLoading()
      })
  },
  //tab切换
  tabChange:function(e){
    this.setData({
      showBlank:false,
      ['searchPage.pageNum']:1,
      bottomMore:false,
      canGetMore:false,
      articleList:[]
    })
    this.getArticeList(e.detail.currentTarget.dataset.id)
  },
  //点击搜索
  onsearch:function(e){
    wx.navigateTo({
      url: '/pages/searchPage/searchPage',
    })
  },
  //获取栏目
  getCategories:function(){
    app.$ajax.$ajax(
      app.$api.categories,
      'get',
      null,
      res => {
        this.setData({
          categoriesList: res?res:[]
        })
        this.getArticeList(res[0].id?res[0].id:null)
      })
  },
  //首页公告公示id
  // reportNotice:function(){
  //   app.$ajax.$ajax(
  //     app.$api.indexReport,
  //     'get',
  //     null,
  //     res => {
  //       this.setData({
  //         reportId:res
  //       })
  //     })
  // },
  onLoad: function () {
    // this.reportNotice()
    this.getBanner()
    this.getCategories()
    if (app.userInfo.id) {
      this.setData({
        userInfo: app.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
