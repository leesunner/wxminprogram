const app = getApp();
module.exports = {
  //上传文件
  uploadFile: function (callBack) {

  },
  //上传图片
  uploadImage: function (callBack) {
    wx.chooseImage({
      count: 1,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        let token = wx.getStorageSync('token')
        wx.uploadFile({
          url: app.$api.uploadFiles,
          filePath: tempFilePaths[0],
          name: 'image',
          header: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
          },
          formData: {
            'businessFileType': 1
          },
          success(res) {
            const data = res.data
            callBack(data)
          },
          fail(e) {
            callBack(false)
          }
        })
      }
    })
  }
}