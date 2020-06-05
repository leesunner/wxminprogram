// pages/mine/settings/editProfile/editProfile.js
const app = getApp();
const utils = require('../../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    sexArray: [
      {
        key: 0,
        value: '男'
      }, {
        key: 1,
        value: '女'
      }, {
        key: 2,
        value: '未知'
      },
    ],
    userInfos: {
      avatar: '',
      sex: '',
      birthday: '',
      nickname: '',
      autograph: '',
    },
    selectAreas: false,
    provinceArray: [],
    cityArray: [],
    districtArray: [],
    townArray: [],
    villageArray:[],
    provinceData: {},
    cityData: {},
    districtData: {},
    townData: {},
    villageData:{},
  },
  //昵称输入
  inputNickname: function () {
    this.setData({
      ['userInfos.nickname']: e.detail.value
    })
  },
  //签名输入
  inputAutograph: function () {
    this.setData({
      ['userInfos.autograph']: e.detail.value
    })
  },
  //过滤信息
  showValue: function (arr, index) {
    if (arr[index]) {
      return arr[index].value
    } else {
      return false
    }
  },
  //拷贝对象
  copyObject: function (obj) {
    let newObj = {}
    Object.keys(obj).forEach(n => {
      newObj[n] = obj[n]
    })
    return newObj
  },
  //选择日期
  bindDateChange: function (e) {
    this.setData({
      ['userInfos.birthday']: e.detail.value
    })
  },
  //选择性别
  bindSexChange: function (e) {
    let index = Number(e.detail.value)
    this.setData({
      ['userInfos.sex']: index
    })
  },
  //选择省
  bindprovince: function (e) {
    let index = Number(e.detail.value)
    let obj = this.data.provinceArray[index]
    obj.index = index
    this.setData({
      provinceData: obj,
      selectAreas: true
    })
    this.getCity()
  },
  //选择市
  bindcity: function (e) {
    let index = Number(e.detail.value)
    let obj = this.data.cityArray[index]
    obj.index = index
    this.setData({
      cityData: obj
    })
    this.getDistrict()
  },
  //选择区县
  binddistrict: function (e) {
    let index = Number(e.detail.value)
    let obj = this.data.districtArray[index]
    obj.index = index
    this.setData({
      districtData: obj
    })
    this.getTwon()
  },
  //选择乡镇
  bindTwon: function (e) {
    let index = Number(e.detail.value)
    let obj = this.data.townArray[index]
    obj.index = index
    this.setData({
      townData: obj
    })
    this.getVillage()
  },
  //选择村
  bindVillage:function(e){
    let index = Number(e.detail.value)
    let obj = this.data.villageArray[index]
    obj.index = index
    this.setData({
      villageData: obj
    })
  },
  //获取所有可有的省份
  getProvice: function () {
    app.$ajax.$ajax(
      app.$api.provice,
      'get',
      null,
      res => {
        if (res) {
          this.setData({
            provinceArray: res
          })
        }
      })
  },
  //根据省获取市
  getCity: function () {
    let code = this.data.provinceData.locationCode
    app.$ajax.$ajax(
      app.$api.city + code + '/city',
      'get',
      null,
      res => {
        if (res) {
          this.setData({
            cityArray: res
          })
        }
      })
  },
  //根据市获取区县
  getDistrict: function () {
    let code = this.data.cityData.locationCode
    app.$ajax.$ajax(
      app.$api.district + code + '/district',
      'get',
      null,
      res => {
        if (res) {
          this.setData({
            districtArray: res
          })
        }
      })
  },
  //根据县获取镇
  getTwon: function () {
    let code = this.data.districtData.locationCode
    app.$ajax.$ajax(
      app.$api.twon + code + '/town',
      'get',
      null,
      res => {
        if (res) {
          this.setData({
            townArray: res
          })
        }
      })
  },
  //根据镇获取村
  getVillage:function(){
    let code = this.data.townData.locationCode
    app.$ajax.$ajax(
      app.$api.village + code + '/village',
      'get',
      null,
      res => {
        if (res) {
          this.setData({
            villageArray: res
          })
        }
      })
  },
  //提交
  setUserInfo: function () {
    if(app.wxUserInfo.nickName){
      this.setData({
        ['userInfos.wxUserData']:app.wxUserInfo
      })
    }
    app.$ajax.$ajax(
      app.$api.userDetail,
      'put',
      this.data.userInfos,
      res => {
        wx.hideLoading()
        if (res==null) {
          wx.navigateBack()
        }
      })
  },
  // selectArea:function(){
  //   this.setData({
  //     selectAreas:true
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  //提交数据
  submitForm: function (e) {
    let control = true
    if(this.data.selectAreas){
     if(!this.data.provinceData.locationCode){
       wx.showToast({
         title: '请选择省',
         icon:"none"
       })
       control = false
       return false
     }
     if(!this.data.cityData.locationCode){
      wx.showToast({
        title: '请选择市',
        icon:"none"
      })
      control = false
      return false
    }
    if(!this.data.districtData.locationCode){
      wx.showToast({
        title: '请选择区/县',
        icon:"none"
      })
      control = false
      return false
    }
    if(!this.data.townData.locationCode){
      wx.showToast({
        title: '请选择镇',
        icon:"none"
      })
      control = false
      return false
    }
    if(!this.data.villageData.locationCode){
      wx.showToast({
        title: '请选择村',
        icon:"none"
      })
      control = false
      return false
    }
    control = true
    let arr = ['province','city','district','town','village']
    arr.forEach(item=>{
      this.setData({
        ['userInfos.'+item+'Name']:this.data[item+'Data'].locationName,
        ['userInfos'+item+'Code']:this.data[item+'Data'].locationCode,
      })
    })
    }
    if(control){
      wx.showLoading({
        title: '提交中...',
        icon:"none"
      })
      this.setUserInfo()
    }
  },
  onLoad: function (options) {
    let obj = this.copyObject(app.userInfo)
    obj.birthday = utils.formatTime(app.userInfo.birthday, 2)
    this.setData({
      userInfos: obj
    })
    this.getProvice()
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