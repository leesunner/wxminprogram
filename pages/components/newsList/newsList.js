// pages/components/newslist/newsList.js
Component({
  options: {
    styleIsolation: 'isolated',//防止样式冲突
  },
  /**
   * 组件的属性列表
   */
  properties: {
    articleList: {
      type: Array,
      value: [],
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
    //去查看新闻详情
    goNewsDetail: function (e) {
      //获取新闻列表的id并传入的详情页面中
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/newsDetail/newsDetail?id=' + id,
      })
    },
  }
})
