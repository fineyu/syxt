// pages/code/code.js
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var id;
var url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      id=options.id;
      url=options.url;
      console.log(url)
      var that = this;

      if(id==""){
        that.setData({
          url:url
        })
      }else{
        var src = "http://xdsy.jsdianshi.com/site/code-detail?goods_id=" + id;
        that.setData({
          url: src,
        })
      }
      
  },
 
 
})