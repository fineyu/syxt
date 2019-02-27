// pages/productEntering/productEntering.js
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var id;
var gs_id;
var title;
var img_url;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },


  // 产品信息
  productClick:function(){
    wx.navigateTo({
      url: '../productInfoRedact/productInfoRedact?id='+id+'&gs_id='+gs_id+'&title='+title+'&img_url='+img_url,
    })
  },
  // 农事操作
  farmClick:function(){
    wx.navigateTo({
      url: '../farmRedact/farmRedact?id=' + id,
    })
  },
  // 施肥信息
  shifeiClick:function(){
    wx.navigateTo({
      url: '../shifeiRedact/shifeiRedact?id=' + id,
    })
  },
  // 用药信息
  medicineClick:function(){
    wx.navigateTo({
      url: '../medicineRedact/medicineRedact?id=' + id,
    })
  },
  // 加工信息
  processClick:function(){
    wx.navigateTo({
      url: '../processRedact/processRedact?id=' + id,
    })
  },
  // 包装信息
  packClick:function(){
    wx.navigateTo({
      url: '../packRedact/packRedact?id=' + id,
    })
  },
  // 监测信息
  checkClick:function(){
    wx.navigateTo({
      url: '../checkRedact/checkRedact?id=' + id,
    })
  },
  // 其他信息
  otherClick:function(){
    wx.navigateTo({
      url: '../otherRedact/otherRedact?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    id=options.id;
    gs_id=options.gs_id;
    title=options.title;
    img_url=options.img_url;
    console.log(gs_id+"+"+id);
  },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  
})