// pages/components/usePhone/usePhone.js
const app = getApp();
Component({
  options: {
    styleIsolation: 'isolated',//防止样式冲突
  },
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      //确定1登录、2绑定、3注册、4设置密码
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    codeText: '发送验证码',
    loading: false,
    disabled: false,
    verificationCode: '',
    telephone: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //手机号输入变化
    inputTelChange: function (e) {
      this.setData({
        telephone: e.detail.value
      })
    },
    //验证码输入变化
    inputCodeChange: function (e) {
      this.setData({
        verificationCode: e.detail.value
      })
    },
    //登录用
    login: function (obj) {
      app.$ajax.$ajax(
        app.$api.bindTelphone,
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
        app.$api.phoneRegister,
        'post',
        obj,
        res => {
          if (res !== false) {
            wx.showToast({
              title: '注册成功',
              icon: "none"
            })
            try {
              wx.setStorageSync('token', res.accessToken)
              app.userInfo = res
              //前往下个页面
            } catch (e) { }

          }
        })
    },
    //绑定用
    binding: function (obj) {
      app.$ajax.$ajax(
        app.$api.bindTelphone,
        'post',
        obj,
        res => {
          if (res !== false) {
            wx.showToast({
              title: '绑定成功',
              icon: "none"
            })
            try {
              wx.setStorageSync('token', res.accessToken)
              app.userInfo = res
              wx.wx.navigateBack()
            } catch (e) { }
          }
        })
    },
    //设置密码
    setPassWord: function (obj) {
      let that = this
      app.$ajax.$ajax(
        app.$api.checkTelCode,
        'get',
        obj,
        res => {
          if (res == null) {
            var eventDetail = {
              value: res == null ? true : false,
              telephone:that.data.telephone
            }
            var eventOption = {} // 触发事件的选项
            this.triggerEvent('onResult', eventDetail, eventOption)
          }
        })
    },
    //提交信息
    formSubmit: function (e) {
      let obj = e.detail.value
      obj.openid = app.globalData.openid
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
        case 4:
          this.setPassWord(obj)
          break;
      }
    },
    //发送验证码
    sendCode: function () {
      if (app.checkPhone(this.data.telephone)) {
        let that = this
        this.setData({
          loading: true
        })
        app.$ajax.$ajax(
          app.$api.sendCode + that.data.telephone,
          'get',
          null,
          res => {
            if (res !== false) {
              that.setData({
                codeText: 60,
                loading: false,
                disabled: true
              })
              that.countDown()
            } else {
              that.setData({
                loading: false,
                disabled: false
              })
            }
          })
      } else {
        wx.showToast({
          title: '请输入正确的手机号',
          icon: "none"
        })
      }
    },
    //倒计时
    //倒计时
    countDown: function () {
      let that = this
      setTimeout(() => {
        var num = that.data.codeText - 1
        that.setData({
          codeText: num
        })
        if (that.data.codeText === 0) {
          that.setData({
            codeText: '发送验证码',
            disabled: false
          })
        } else {
          that.countDown()
        }
      }, 1000)
    }
  }
})
