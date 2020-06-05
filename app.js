//app.js
import $ajax from './utils/request/ajax';
import api from './utils/request/api';
App({
  onLaunch: function () {
    this.getSysInfo()

    // 登录
    wx.login({
      success: res => {
        $ajax.$ajax(
          api.getOpenid,
          'get',
          { code: res.code },
          res => {
            if (res) {
              this.globalData.openid = res? res.openid : null
              this.getUserInfos(res => {
                if (res) {
                  wx.setStorageSync('token', res.accessToken)
                  this.userInfo = res
                }
              })
            }
          })
      }
    })
    this.getWxUserInfo()
  },
  //获取胶囊数据给导航自定义导航栏用
  getButtonBounding:function(res){
    let b ;
    try {
      b = wx.getMenuButtonBoundingClientRect()?wx.getMenuButtonBoundingClientRect():null;
      if (b === null) {
        throw '获取胶囊失败error';
      }
    //取值为0的情况
      if (!b.width) {
        throw 'getMenuButtonBoundingClientRect error';
      }
    } catch (error) {
      let gap = ''; //胶囊按钮上下间距 使导航内容居中
      let width = 96; //胶囊的宽度，android大部分96，ios为88
      if (res.platform === 'android') {
        gap = 8;
        width = 96;
      } else if (res.platform === 'devtools') {
        if (ios) {
          gap = 5.5; //开发工具中ios手机
        } else {
          gap = 7.5; //开发工具中android和其他手机
        }
      } else {
        gap = 4;
        width = 88;
      }
      if (!res.statusBarHeight) {
        //开启wifi的情况下修复statusBarHeight值获取不到
        res.statusBarHeight = res.screenHeight - res.windowHeight - 20;
      }
      b = {
        //获取不到胶囊信息就自定义重置一个
        bottom: res.statusBarHeight + gap + 32,
        height: 32,
        left: res.windowWidth - width - 10,
        right: res.windowWidth - 10,
        top: res.statusBarHeight + gap,
        width: width
      };
    }
    //计算导航的高度
    let h = res.statusBarHeight + b.height +(b.top-res.statusBarHeight )*2;
    this.globalData.navTop = b.top;//胶囊距离顶部的高度
    this.globalData.navHeight = h;//计算的nav的容器最小高度
    this.globalData.navContentHeight = b.height;//nav里面的内容容器高度
  },
  //获取设备信息
  getSysInfo: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenWidth = res.screenWidth*2;
        this.globalData.screenHeight = res.screenHeight*2;
        this.getButtonBounding(res)
        console.log(res)
      },
      fail:function(){
        wx.showToast({
          title: '获取设备信息失败',
          icon: "none"
        })
      }
    })
  },
  globalData: {},
  userInfo: {},//储存服务器用户信息
  wxUserInfo: {},//储存微信用户信息
  //全局清缓存清理数据并跳转登录
  loginOut: function () {
    wx.clearStorage()
    this.userInfo = {}
    wx.redirectTo({
      url: '/pages/login/login',
    })
  },
  navgateToPage: function (url) {
    wx.navigateTo({
      url: url
    })
  },
  //公共弹框
  showModel: function (info, callback) {
    wx.showModal({
      title: '提示',
      content: arguments.length > 1 ? info : '确认提交',
      success(res) {
        if (res.confirm) {
          arguments.length > 1 ? callback(true) : info(true)
        } else if (res.cancel) {
          arguments.length > 1 ? callback(false) : info(false)
        }
      }
    })
  },
  //通过openid获取用户信息
  getUserInfos: function (callback) {
    if (this.globalData.openid) {
      $ajax.$ajax(
        api.getUserInfo,
        'get',
        {
          openid: this.globalData.openid
        },
        res => {
          callback(res)
        })
    } else {
      callback(false)
    }
  },
  //获取微信用户信息
  getWxUserInfo:function(){
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: resu => {
              // 可以将 res 发送给后台解码出 unionId
              this.wxUserInfo = resu.userInfo
            }
          })
        }
      }
    })
  },
  /**
 * 验证手机号
 */
  checkPhone: function (value) {
    const test = /^1[3|4|5|7|8|9]\d{9}$/g
    return test.test(value)
  },
  /**
   * 验证邮箱
   */
  checkEmail: function (value) {
    const test = /^\w+@[A-Za-z\d]+\.([A-Za-z]{2,})$/g
    return test.test(value)
  },
  //
  $ajax: $ajax,
  $api: api
})