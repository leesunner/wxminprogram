// pages/components/titleTip/titleTip.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:'暂无'
    },
    content:{
      type:String,
      value:'查看全部'
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
      this.triggerEvent('onCallb',{},{})
    }
  }
})
