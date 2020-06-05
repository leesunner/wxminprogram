// pages/components/navBar/navBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    backgroundColor:{
      type:String,
      value:'#E42419'
    },
    navTitle:{
      type:String,
      value:'百问政务'
    },
    showBack:{//是否显示返回键
      type:Boolean,
      value:true
    },
    customNavBack:{//自定义返回键的跳转方式(默认使用放回上一页)
      type:Boolean,
      value:false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeight:0,
    navTop:0,
    navConHg:0,
  },
  lifetimes:{
    attached:function(){
      this.setData({
        navHeight:app.globalData.navHeight+3,
        navTop:app.globalData.navTop,
        navConHg:app.globalData.navContentHeight
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    navBackTo:function(){
      if(!this.data.customNavBack){
        wxx:wx.navigateBack()
      }else{
        this.triggerEvent('navCustom',{},{})
      }
    }
  }
})
