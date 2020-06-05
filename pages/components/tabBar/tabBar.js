// pages/components/tabBar/tabBar.js
const app = getApp();
Component({
  options: {
    styleIsolation: 'isolated',//防止样式冲突
  },
  /**
   * 组件的属性列表
   */
  properties: {
    list: {//tab数据源
      type: Array,
      value: []
    },
    width: {//tab所在容器的宽度(宽度小于屏幕宽度时输入)
      type: Number,
      value: 0
    },
    tabSelect:{//监听外部输入
      type: Number,
      value: 0
    }
  },
  observers:{
    'list':function(v){
      if(v.length>0){
        this.setBoxAttr()
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    showFlex: true,
    tababarwidth: 0,
    animationData: {},
    scrollNum: 0,
    screenWidth:app.globalData.screenWidth,
  },
  lifetimes: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //设置容器属性
    setBoxAttr:function(){
      let iw = this.data.list.length * 126;
      if (this.data.list.length>5) {
        this.setData({
          showFlex: false,
          tababarwidth: iw + 'rpx'
        })
      } else {
        this.setData({
          showFlex: true
        })
      }
    },
    //选择切换tab
    selectTab: function (e) {
      let index = e.currentTarget.dataset.index;
      this.setData({
        tabSelect: index
      })
      if (!this.data.showFlex) {
        if(index>=4){
          this.setData({
            scrollNum: e.currentTarget.offsetLeft
          })
        }else{
          this.setData({
            scrollNum: 0
          })
        }
      }
      this.triggerEvent('tabChange',e,{})
    },
    bindscroll:function(e){
      
    }
  }
})
