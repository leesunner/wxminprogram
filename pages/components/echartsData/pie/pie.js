import * as echarts from './../../../../utils/ec-canvas/echarts.js';

const app = getApp();
function setOption(chart,data,colors,lengendShow) {
  let legend = null;
  if(lengendShow){
    legend = {
      data: data.map(function (item) {
        return item.name
      }),
      itemWidth: 16.5,
      itemHeight: 10,
      bottom: 0,
    }
  }
  const option = {
    backgroundColor: "#ffffff",
    color: colors,
      legend: legend,
      series: [{
        label: {
          normal: {
            fontSize: 12,
            formatter:'{b}:{c}件 \n{d}%'
          }
        },
        tooltip:{
          formatter:'占比:{d}%'
        },
        type: 'pie',
        hoverAnimation: false, //鼠标移入变大
        center: ['50%', '50%'],
        radius: ['45%', '65%'],
        itemStyle:{
          borderWidth:5,
          borderColor:'#ffffff'
        },
        labelLine: {
          show:false,
          normal: {
            length: 10,
            length2: 3,
          }
        },
        data: data
      }]
  };
  if(!lengendShow){
    //设置内环的大小和位置
    option.series.push({
        type: 'pie',
        hoverAnimation: false, //鼠标移入变大
        center: ['50%', '50%'],
        radius: ['43%', '46%'],
        labelLine: {
          show:false,
        },
        data: [
          {
            value:100,
            itemStyle: {
              normal: {
                  color: '#07B4EF'
              }
            }
          }
        ]
    })
  }
  chart.setOption(option);
}
Component({
    /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:Array,
      value:[]
    },
    colors:{
      type:Array,
      value:["#37A2DA","#FFAA00", "#32C5E9", "#fa7193","#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"]
    },
    lengend:{//用来开启是否显示lengend
      type:Boolean,
      value:true
    }
  },
  observers:{
    'data':function(v){
      if(v.length>0){
        this.initEchart(v)
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false
  },
  lifetimes:{
    detached:function(){
      this.dispose()
    }
  },
   /**
   * 组件的方法列表
   */
  methods: {
    //异步获取canvas画布相关依赖，防止出现不必要的问题
    getComponentObj:function(){
      let that = this
      return new Promise(resolve=>{
        let timer = setInterval(() => {
          that.ecComponent = that.selectComponent('#mychart-dom-pie');
          if(that.ecComponent&&echarts){
            resolve(true)
            clearInterval(timer)
          }
        }, 10);
      })
    },
    // 点击按钮后初始化图表
  initEchart: function (data) {
    // 获取组件
    this.getComponentObj().then(res=>{
      this.ecComponent.init((canvas, width, height, dpr) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        setOption(chart,data,this.data.colors,this.data.lengend);
  
        // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
        this.chart = chart;
  
        this.setData({
          isLoaded: true,
          isDisposed: false
        });
  
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
    })
  },
  //销毁
  dispose: function () {
    if (this.chart) {
      this.chart.dispose();
    }

    this.setData({
      isDisposed: true
    });
  }
  }
});
