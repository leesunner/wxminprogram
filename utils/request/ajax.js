const app = getApp();
//暂时不使用解构去获取参数列表，暂不使用promise做异步回调
const $ajax = function (url, method, data=null, callback) {
  let v = wx.getStorageSync('token'), heades = {
    'Content-Type': 'application/json'
  };
  if (v) {
    heades['Authorization'] = 'Bearer ' + v
  }
  wx.request({
    url: url,
    data: data === null ? '' : data,
    method: method,
    header: heades,
    success(res) {
      let code = res.data.code
      if (code == 200) {
        callback(res.data.data);
      } else {
        if(code==401){
          wx.showToast({
            title: '登录失效',
            icon:"none"
          })
          wx.navigateTo({
            url: '/pages/login/login',
          })
          app.userInfo = {}
        }
        wx.showToast({
          title: res.data.msg?res.data.msg:'未知错误',
          icon:"none"
        })
        callback(false);
      }
    },
    fail(e) {
      wx.hideLoading()
      callback(false);
    },
    complete() {
      console.log('接口调用完毕!')
    }
  })
}
module.exports = {
  $ajax: $ajax
}