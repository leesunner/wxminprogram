// pages/components/scrollView/scrollView.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scHeight:{//滚动容器应被减去的高度rpx
      type:Number,
      value:0
    },
    contentRefresher:{//是否下拉刷新，完成设置false
      type:Boolean,
      value:false
    },
    bottomMore:{//是否触底刷新加载更多 完成设置true
      type:Boolean,
      value:false
    },
    canGetMore:{//是否还能继续上拉
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    boxHeight:0,
    colors:'#E42419'
  },
  lifetimes:{
    attached:function(){
      this.setData({
        boxHeight:app.globalData.screenHeight-this.data.scHeight
      })
    }
  },
  observers:{
    'bottomMore':function(v){
      if(v){
        wx.hideNavigationBarLoading()
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //滚动到底部触发
    bindscrolltolower:function(e){
      if(!this.data.canGetMore){
        let that = this
        wx.showNavigationBarLoading(); 
        this.setData({
          bottomMore:false
        })
        this.triggerEvent('scrolltolower')
      }
    },
    //下拉一直触发
    bindrefresherpulling: function(e,instance) {
      var p = Math.min(e.detail.dy / 80, 1)
      var view = instance.selectComponent('.refresh-container')
      // view.setStyle({
      //     opacity: p,
      //     transform: "scale(" + p + ")"
      //   })
    },
    //被下拉刷新时触发
    bindrefresherpull:function(e){
      this.triggerEvent('refresherpull')
    },
  }
})
