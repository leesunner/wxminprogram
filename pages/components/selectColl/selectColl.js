// pages/components/selectColl/selectColl.js
Component({
  options:{
    styleIsolation: 'isolated',//防止样式冲突
  },
  /**
   * 组件的属性列表
   */
  properties: {
    name:{//显示标题
      type:String,
      value:'',
    },
    time:{//显示时间
      type:String,
      value:'',
    },
    type:{//识别办理类型
      type:Number,
      value:'',
    },
    myStatus:{//状态字段
      type:String,
      value:'',
    },
    workCode:{//工作流接口字符串
      type:String,
      value:'',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    state:0,
    stateName:'',
  },
  lifetimes:{
    attached: function() {
      let str = this.data.myStatus
      if(str!=="undefined&$&undefined"){
        let arr = str.split('&$&')
        this.setData({
          state:arr[1],
          stateName:arr[0]
        })
      }
      // 在组件实例进入页面节点树时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //去工作流页面
    goWorkFlow:function(){
      switch (this.data.type) {
        case 1:case 4:
          //去待办|草稿
          wx.navigateTo({
            url: "/pages/workFlowForm/workFlowForm"+'?taskId='+this.data.workCode,
          })
          break;
        case 2:
           //去已办
           wx.navigateTo({
            url: "/pages/mine/endTasks/endTasks"+'?taskId='+this.data.workCode,
          })
          break;
        case 3:
           //去申请
           wx.navigateTo({
            url: "/pages/mine/applyTasks/applyTasks"+'?processId='+this.data.workCode,
          })
          break;
      }
    }
  }
})
