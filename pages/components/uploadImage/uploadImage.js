// pages/components/uploadImage/uploadImage.js
const uploadFile = require('../../../utils/uploadFile/index')
Component({
  options:{
    styleIsolation: 'isolated',//防止样式冲突
  },
  /**
   * 组件的属性列表
   */
  properties: {
    text:{
      type:String,
      value:'图片上传'
    },
    showIcon:{
      type:Boolean,
      value:true
    },
    url:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
//上传图片
uploadImages:function(){
  uploadFile.uploadImage(res=>{
    if(res){
      
      var eventDetail = {} // detail对象，提供给事件监听函数
      var eventOption = {} // 触发事件的选项
      this.triggerEvent('onSucees', eventDetail, eventOption)
    }
  })
}
  }
})
