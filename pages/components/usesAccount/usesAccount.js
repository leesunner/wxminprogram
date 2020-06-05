// pages/components/usesAccount/usesAccount.js
const app = getApp();
var utils = require('../../../utils/util')
Component({
  options:{
    styleIsolation: 'isolated',//防止样式冲突
  },
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      //确定1登录、2绑定、3注册
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    disabled:true,
    username:'',
    password:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //用户名输入变化
    inputUChange: function (e) {
      this.setData({
        username: e.detail.value
      })
    },
    //密码输入变化
    inputPChange: function (e) {
      this.setData({
        password: e.detail.value
      })
    },
    //提交登录
    formSubmit: function (e) {
      let obj = e.detail.value
      obj.openid = app.globalData.openid
      if (!obj.username) {
        wx.showToast({
          title: '请输入用户名',
        })
        return
      }
      if (!obj.password) {
        wx.showToast({
          title: '请输入密码',
        })
        return
      }
      obj.password =  utils.encrypt(obj.password)
      switch (this.data.type) {
        case 1:
          this.login(obj)
          break;
        case 2:
          this.binding(obj)
          break;
        case 3:
          this.register(obj)
          break;
      }
    },
    //登录用
    login: function (obj) {
      app.$ajax.$ajax(
        app.$api.bindAccount,
        'post',
        obj,
        res => {
          if (res) {
            try {
              wx.setStorageSync('token', res.accessToken)
              app.userInfo = res
              let pL = getCurrentPages()
              //回调返回页面的onLoad
              pL[pL.length - 2].onLoad(pL[pL.length - 2].options)
              wx.navigateBack()
            } catch (e) { }
          }
        })
    },
    //注册用
    register: function (obj) {
      app.$ajax.$ajax(
        app.$api.acountRegister,
        'post',
        obj,
        res => {
          if (res) {
            try {
              wx.setStorageSync('token', res.accessToken)
              app.userInfo = res
              wx.navigateBack()
            } catch (e) { }
          }
        })
    },
    //绑定用
    binding: function (obj) {
      app.$ajax.$ajax(
        app.$api.bindAccount,
        'post',
        obj,
        res => {
          if (res) {
            try {
              wx.setStorageSync('token', res.accessToken)
              app.userInfo = res
              wx.navigateBack()
            } catch (e) { }
          }
        })
    }
  }
})
