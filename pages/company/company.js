// pages/company/company.js
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var lists;
var isLoading=false;

// 获取所有企业
function getCompany(that,offset){
  isLoading = true,
  http.postReq("/api/all-gs-list", { limit: 10, offset: offset,city:''},function(res){
    isLoading = false,
    wx.stopPullDownRefresh();
    if (res.state) {
      if (res.data.length != 0) {
        for (var i = 0; i < res.data.length; i++) {
          lists.push(res.data[i]);
        }
        that.setData({
          company: lists
        })
      }
    }
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    adressUrl: '../image/adress.png',
    company: [],
  },

  // 点击企业进入详情页
  companyClick: function (e) {
    var index = e.currentTarget.dataset.index;
    var id=lists[index].id;
    console.log(id)
    wx.navigateTo({
      url: '../companyInfo/companyInfo?id='+id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    lists = [];
    getCompany(that,0)
  },

  onReachBottom: function () {
    var that = this;
    if (!isLoading) {
      // 显示加载图标
      wx.showLoading({
        title: '玩命加载中',
      })
      // 页数+1
      var num = lists.length;
      console.log(num)
      getCompany(that, num)
    }
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    if (!isLoading) {
      lists = [];
      getCompany(that, 0)
    }
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
  }

})