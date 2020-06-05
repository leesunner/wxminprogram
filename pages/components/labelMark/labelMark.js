// pages/components/labelMark/labelMark.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url:{
      type:String,
      value:''
    },
    icon:{
      type:String,
      value:''
    },
    text:{
      type:String,
      value:''
    },
    isShow:{//是否显示箭头
      type:Boolean,
      value:true
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
    goPage:function(){
      if(this.data.url){
        wx.navigateTo({
          url: this.data.url,
        })
      }
    }
  }
})
