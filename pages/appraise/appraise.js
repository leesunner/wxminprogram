// pages/appraise/appraise.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starsList:[false,false,false,false,false],
    showDetail:true,
    bid:"",
    stars:0,
    apDetails:{},
    apprText:'',
  },
  //星级评分
  makeAppraise:function(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      stars:index+1
    })
    this.showNum(index)
  },
  //显示评分
  showNum:function(index){
    let arr = this.data.starsList;
    this.setData({
      apprText:index==0?'非常不满意':index==1?'不满意':index==2?'满意':index==3?'一般':'非常满意'
    })
    arr.forEach((item,i)=>{
      if(i<=index){
        this.setData({
          ['starsList['+i+']']:true
        })
      }else{
        this.setData({
          ['starsList['+i+']']:false
        })
      }
    })
  },
  //提交评论
  formSubmit:function(e){
   let obj = e.detail.value
   obj.businessInfoId = this.data.bid
   obj.stars = this.data.stars
   if(obj.stars==0){
    wx.showToast({
      title: '请先打分',
      icon:"none"
    })
    return 
   }
   if(obj.content==""){
    wx.showToast({
      title: '请先评价内容',
      icon:"none"
    })
    return 
   }
   if(!obj.realName){
    wx.showToast({
      title: '请先输入联系人',
      icon:"none"
    })
    return 
   }
   if(!obj.telephone){
    wx.showToast({
      title: '请输入电话',
      icon:"none"
    })
    return 
   }
   if(!app.checkPhone(obj.telephone)){
    wx.showToast({
      title: '请输入正确的手机号',
      icon:"none"
    })
    return 
   }
    app.$ajax.$ajax(
      app.$api.addAppraise,
      'post',
      obj,
      res => {
        if (res==null) {
          let pg = getCurrentPages();
          //成功后刷新申请详情的状态
          pg[pg.length-2].getApplyDetail()
          wx.navigateBack()
        }else{
          wx.showToast({
            title: '评论失败',
            icon:"none"
          })
        }
      })
  },
  //获取评论详情
  getDetail:function(id){
    app.$ajax.$ajax(
      app.$api.getAppraiseDetail+id,
      'get',
      null,
      res => {
        if (res) {
          this.showNum(res.stars-1)
          this.setData({
            apDetails:res
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id =  parseInt(options.id),show = options.status;
    this.setData({
      bid:id
    })
    if(show=='true'){
      this.getDetail(id)
      this.setData({
        showDetail:true
      })
    }else{
      this.setData({
        showDetail:false
      })
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