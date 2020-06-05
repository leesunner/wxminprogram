// pages/components/searchBox/searchBox.js
Component({
  options: {
    styleIsolation: 'isolated',//防止样式冲突
  },
  /**
   * 组件的属性列表
   */
  properties: {
    fontPosition: {//搜索框文字的位置
      type: String,
      value: 'center'
    },
    openStr: {//是否开启搜索历史记录算法
      type: Boolean,
      value: false
    },
    focus: {//是否聚焦弹起键盘
      type: Boolean,
      value: false
    },
    words:{//外部传递的默认值
      type: String,
      value: ''
    }
  },
  //数据监听
  observers:{
    'words':function(v){
      if(v){
        this.setData({
          inputValue:v
        })
        this.searchDataCount()
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    inputValue: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputInfo: function (e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    cancel: function (e) {
      this.setData({
        inputValue: ''
      })
      this.onSearch(e)
    },
    //搜索数据添加删除算法
    searchDataCount: function () {
        let v = wx.getStorageSync('historyList');
        let arr = v ? JSON.parse(v) : [], control = false;
        arr.forEach((item, index) => {
          if (item == this.data.inputValue) {
            //交换位置,当前输入放到第一个，并退出循环
            let vl = arr[0]
            arr[0] = this.data.inputValue
            arr[index] = vl
            control = true
            return false
          }
        })
        if (!control) {
          //限制最多10个搜索历史
          if (arr.length >= 10) {
            arr.pop()
          }
          arr.unshift(this.data.inputValue)
        }
        wx.setStorage({
          data: JSON.stringify(arr),
          key: 'historyList',
        })
        this.triggerEvent('onHistory', {}, {})
    },
    onSearch: function (e) {
      if (this.data.openStr&&this.data.inputValue) {
        this.searchDataCount()
      }
      var eventDetail = {
        value: e.detail.value ? e.detail.value : ''
      } // detail对象，提供给事件监听函数
      var eventOption = {} // 触发事件的选项
      this.triggerEvent('onSearch', eventDetail, eventOption)
    },
  }
})
