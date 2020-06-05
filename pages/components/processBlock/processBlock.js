// pages/components/processBlock/processBlock.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
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
    goToAppraise:function(e){
      let s = e.currentTarget.dataset.status
      wx.navigateTo({
        url: '/pages/appraise/appraise?status='+s+'&id='+e.currentTarget.dataset.id
      })
    }
  }
})
