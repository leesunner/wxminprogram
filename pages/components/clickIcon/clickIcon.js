// pages/components/clickIcon/clickIcon.js
const app = getApp()
Component({
  options:{
    styleIsolation: 'isolated',//防止样式冲突
  },
  /**
   * 组件的属性列表
   */
  properties: {
    data_list:{
      type:Array,
      value:[]
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
    goPage:function(e){
      if(app.userInfo.id){
        let obj = e.currentTarget.dataset
        if(obj.url!=undefined){
          //去工作流页面
          wx.navigateTo({
            url: "/pages/workFlowForm/workFlowForm"+'?workCode='+obj.url,
          })
        }else{
          //去对应传过来的页面
          wx.navigateTo({
            url: obj.page,
          })
        }
      }else{
        wx.navigateTo({
          url: "/pages/login/login",
        })
      }
    }
  }
})
