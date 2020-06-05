// pages/mine/dataReport/dataReport.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectTab:0,
    selectTabWorkNum:0,
    // tabel_th_list:['ip','登录时间','在线时长'],
    workFlowNum:{},
    worksFisList:[],
    allWorkNum:{},//总事项项目
    allWorkNumList:[],
    allWorkNumListColors:['#9785F1','#FF9F7F','#FD7B95'],
    allWorkNumListTab2:[],
    topFivelist:[],
    topfivePie:{},
    topFiveColor:['#9785F1','#E0E0E0'],
    list:[],
    timer:'day',//day 当天  month 当月  week 本周  year 当年
    tablist:['当天','当月','当年','本周'],
    WorkNumTab:['事项分布','事项办理分布'],
  },
  chooseTab:function(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      selectTab:index,
      timer:index==0?'day':index==1?'month':index==2?'year':'week'
    })
    this.getReportData();
    this.allWorksNum();
    this.getTopFive();
  },
  chooseWorkNumTab:function(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      selectTabWorkNum:index
    })
  },
  //查询用户登录信息列表
  // getLoginRecords:function(){
  //   app.$ajax.$ajax(
  //     app.$api.userLoginRecord,
  //     'get',
  //     null,
  //     res => {
  //       if(res){
  //         this.setData({
  //           list:res
  //         })
  //       }
  //     })
  // },
  //查询top5事件
  getTopFive:function(){
    app.$ajax.$ajax(
      app.$api.userHotTopFive+this.data.timer,
      'get',
      null,
      res => {
        if(res){
          let list = []
          Object.keys(res).forEach(name=>{
            let obj = {}
            if(name=='processing'){
              obj.name =  '未办结';
              obj.value = res[name]
            }
            if(name=='done'){
              obj.name =  '已办结';
              obj.value = res[name]
            }
            if(obj.name){
              list.unshift(obj)
            }
          })
          this.setData({
            topfivePie:res,
            topFivelist:list
          })
        }
      })
  },
  //将对象处理称pie图需要的数据
  dataToArr:function(res){
    let list = []
    Object.keys(res).forEach(name=>{
      let obj = {}
      if(name=='overdueDone'){
        obj.name =  '逾期已办';
        obj.value = res[name]
      }
      if(name=='overdueNotDone'){
        obj.name =  '逾期未办';
        obj.value = res[name]
      }
      if(name=='done'){
        obj.name =  '已办结';
        obj.value = res[name]
      }
      if(name=='notDone'){
        obj.name =  '未办结';
        obj.value = res[name]
      }
      if(obj.name){
        list.unshift(obj)
      }
    })
    return list
  },
  //查询办事分类（已办，未办，逾期等）数据分析
  getReportData:function(){
    app.$ajax.$ajax(
      app.$api.userWorkFlowNum+this.data.timer,
      'get',
      null,
      res => {
        if(res){
          let list = this.dataToArr(res)
          this.setData({
            workFlowNum:res,
            worksFisList:list
          })
        }
      })
  },
  //总事项项目
  allWorksNum:function(){
    app.$ajax.$ajax(
      app.$api.allWorksNum+this.data.timer,
      'get',
      null,
      res => {
        if(res){
          let list = [],list2=[];
          Object.keys(res).forEach(name=>{
            let obj = {}
            if(name=='dwCount'){
              obj.name =  '党务';
              obj.value = res[name]
              list2.unshift(obj)
            }
            if(name=='swCount'){
              obj.name =  '事务';
              obj.value = res[name]
              list2.unshift(obj)
            }
            if(name=='cwCount'){
              obj.name =  '财务';
              obj.value = res[name]
              list2.unshift(obj)
            }
            if(name=='dwDoneCount'){
              obj.name =  '党务';
              obj.value = res[name]
              list.unshift(obj)
            }
            if(name=='swDoneCount'){
              obj.name =  '事务';
              obj.value = res[name]
              list.unshift(obj)
            }
            if(name=='cwDoneCount'){
              obj.name =  '财务';
              obj.value = res[name]
              list.unshift(obj)
            }
          })
          this.setData({
            allWorkNum:res,
            allWorkNumList:list,
            allWorkNumListTab2:list2
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReportData();
    this.allWorksNum();
    this.getTopFive();
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