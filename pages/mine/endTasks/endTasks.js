// pages/mine/endTasks/endTasks.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskId:'',
    formData:{},//表单提交数据
    formList:[],
    showControl:true,
  },
  getDetail:function(){
    wx.showLoading({
      title: '加载中...',
      icon:"none"
    })
    app.$ajax.$ajax(
      app.$api.endGtasksDetail+this.data.taskId,
      'get',
      null,
      res => {
        if(res){
          let obj = {}
          res.forEach(item=>{
            //设置formData为了表单提交时做必填验证
            if(obj[item.formType]!='buttons'||obj[item.formType].indexOf('label')<0){
              obj[item.formId] = {
                title:item.formTitle,
                value:item.formNotNull
              }
            }
            //将后台必要的数据转对象
            if((item.formType=="imageShow"||item.formType=="fileDownload"||item.formType=="buttons")&&item.formDefaultValue){
              item.formDefaultValue = this.jsonToData(item.formDefaultValue)
            }
            if(item.formType=="combox"&&item.formComboxValue){
              item.formComboxValue = this.jsonToData(item.formComboxValue)
            }
          })
          this.setData({
            showControl:false,
            formData:obj,
            formList:res
          })
        }
        wx.hideLoading()
      })
  },
  //解析json
  jsonToData:function(v){
    return JSON.parse(v)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      taskId:options.taskId
    })
    this.getDetail()
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