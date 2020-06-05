// pages/workFlowForm/workFlowForm.js
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
    showDraglog:false,
  },
  //返回是提示是否保存
  inquiryBtn:function(){
    this.setData({
      showDraglog:true
    })
  },
  //取消保存草稿
  cancels:function(){
    this.setData({
      showDraglog:false
    })
    wx.navigateBack()
  },
  //查看大图
  previewImage:function(e){
    let list = e.currentTarget.dataset.urls
    wx.previewImage({
      urls: list.length>0?list.map(i=>{return i.url}):[]
    })
  },
  //图片上传成功回调
  uploadImage:function(e){

  },
  //上传文件
  uploadFile:function(e){
  
  },
   //下载文件
   downLoadFile:function(e){
    console.log(e.currentTarget.dataset)
  },
  //改变下拉设值
  bindChangeValue: function(e) {
    let index = e.currentTarget.dataset.item;
    let atrr =  "formList["+index+"].formDefaultValue"
    this.setData({
      [atrr]:e.detail.value
    })
  },
  //根据流程接口获取taskid
  getFlowInfo:function(str){
    this.setData({
      showControl:true
    })
    wx.showLoading({
      title: '表单加载中...',
    })
    app.$ajax.$ajax(
      app.$api.baseUrl+str,
      'post',
      null,
      res => {
        if(res){
          this.getForm(res.taskId)
        }
      })
  },
  //解析json
  jsonToData:function(v){
    return JSON.parse(v)
  },
  //根据taskid获取表单数据
  getForm:function(id){
    this.setData({
      taskId: id
    })
    app.$ajax.$ajax(
      app.$api.workFormData+id,
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
            try {
              if((item.formType=="imageShow"||item.formType=="fileDownload"||item.formType=="buttons")&&item.formDefaultValue){
                item.formDefaultValue = this.jsonToData(item.formDefaultValue)
              }
              if(item.formType=="combox"&&item.formComboxValue){
                item.formComboxValue = this.jsonToData(item.formComboxValue)
              }
            } catch (error) {
              wx.showToast({
                title: '表单解析异常',
                icon:"none"
              })
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
  catchtouchmove:function(){
    return false
  },
  //根据获得的流程list，复制表单项
  formatForm:function(data){

  },
  //确认提交
  formSubmit:function(e){
    this.setData({
      showDraglog:false
    })
    let obj = e.detail.value,yObj=this.data.formData,isSubmit=false,url;
    Object.keys(obj).forEach(n=>{
      if(!obj[n]&&yObj[n].value){
        wx.showToast({
          title: yObj[n].title+'不能为空',
          icon:"none"
        })
        isSubmit =  true;//控制不让表单提交
        return false;
      }
    })
    if(isSubmit){
      return
    }
    //不是弹框保存草稿时
    let dc = e.detail.target.dataset.drag;
    if(!dc){
      url = e.detail.target.dataset.inface
    }
    wx.showLoading({
      title: '提交中...',
    })
    obj.taskId = this.data.taskId
    app.$ajax.$ajax(
      dc?app.$api.saveDraft:(app.$api.baseUrl+url),
      'post',
      obj,
      res => {
        wx.hideLoading()
        if(res==null){
          wx.showToast({
            title: dc?'保存成功':'提交成功',
            icon:"none"
          })
          setTimeout(()=>{
            wx.navigateBack()
          },250)
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.workCode){
      this.getFlowInfo(options.workCode)
    }else{
      this.getForm(options.taskId)
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