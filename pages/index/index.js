//index.js
//获取应用实例
const app = getApp()
// 引入canvas插件
import * as echarts from '../../ec-canvas/echarts';

// 引入http交互
var http = require('../../service/http.js');
var goods;
var gs;
var list;
var arr2=[];
var arr1=[];
let chart = null;
var option = {

  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    data: arr1,
    x: 'center',
    y: 220,
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '40%'],
      data: arr2,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};




// 获取首页企业
function getIndexCompany(that) {
  http.getReq("/api/sy-list", function (res) {
    console.log(res)
    gs = res.data.gs;
    goods = res.data.goods;
    if (res.state) {
      that.setData({
        goods: res.data.goods,
        gs: res.data.gs,
      })
    }
  })
}

// 绘制饼图
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option1 = option;
  chart.setOption(option1);
  return chart;
  console.log(option1)
};

// 绘制柱状图
function initChart2(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option2 = {

    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220, 390, 330, 220]
      }
    ]
  };
  chart.setOption(option2);
  return chart;
};



//获取饼图信息
// function getPie(){
//   var num;
//   http.getReq("/api/percent", function (res) {
//     console.log(res);

//     if (res.state) {
//       list = res.data;
//       for (var i = 0; i < list.length; i++) {
//         if (list[i].num == 0) {
//           list.splice(i, 1)
//           i--;
//         } else {
//           continue
//         }
//       };

//       for (var j = 0; j < list.length; j++) {
//         var li = list[j];
//         arr2.push({ "name": li.addr, "value": li.num });
//         arr1.push(li.addr)
//         app.globalData.array = arr2;
//         app.globalData.legend1 = {
//           x: 'center',
//           y: 'bottom',
//           data: arr1,
//         }

//       };
//       setTimeout(function () {
//         chart.setOption(option);  //赋值后再设置一次option
//       }, 10);

//     }
//   })
  
// }




Page({
  data: {
    indicatorDots: false,
    interval: 5000,
    duration: 2000,
    seeUrl:"../image/see.png",
    adressUrl:'../image/adress.png',
    search:'',
    gs:[],
    goods:[],
    ec: {
      onInit: initChart
    },
    ec2: {
      onInit: initChart2
    }
  },
 
  onLoad: function (options) {
    var that=this;
    // getPie();
    getIndexCompany(that)
    

    var num;
    http.getReq("/api/percent", function (res) {
      console.log(res);

      if (res.state) {
        list = res.data;
        for (var i = 0; i < list.length; i++) {
          if (list[i].num == 0) {
            list.splice(i, 1)
            i--;
          } else {
            continue
          }
        };

        for (var j = 0; j < list.length; j++) {
          var li = list[j];
          arr2.push({ "name": li.addr, "value": li.num });
          arr1.push(li.addr)
          app.globalData.array = arr2;
          app.globalData.legend1 = {
            x: 'center',
            y: 'bottom',
            data: arr1,
          }
            
        };
        setTimeout(function () {
          chart.setOption(option);  //赋值后再设置一次option
        }, 10);
        arr2 = [];
        arr1 = [];
      }
    })

    console.log(option)
  },

  // 点击企业 进入详情
  companyClick:function(e){
    var index=e.currentTarget.dataset.index;
    var id = gs[index].id;
    wx.navigateTo({
      url: '../companyInfo/companyInfo?id='+id,
    })
  },

  // 点击产品 进入详情
  productClick:function(e){
    var index = e.currentTarget.dataset.index;
    var id = goods[index].id;
    wx.navigateTo({
      url: '../productInfo/productInfo?id='+id,
    })
  },

  // 扫一扫功能
  scan:function(){
    wx.scanCode({
      success: (res) => {
        console.log("扫码结果");
       
        var url = res.result
        wx.navigateTo({
          url: '../code/code?=url' + url,
        })
       
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },

  // 搜索框点击
  searchTap:function(){
      wx.navigateTo({
        url: '../search/search',
      })
  },

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (options) {
    var shareObj = {
      title: '欢迎来到溯源系统', // 默认是小程序的名称(可以写slogan等)
      path: '/pages/index/index', // 默认是当前页面，必须是以‘/’开头的完整路径
    }
    return shareObj;
  },

  // 饼图点击
  echartInit(params) {
    // initChart(e.detail.canvas, e.detail.width, e.detail.height);
    console.log(chart.params)
  }
  
 
})
