// pages/search/search.js
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var recentsearch=[];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recent: 0,
    search: '',
    focus: true,
    hot: "热门搜索",
    recentSearch: [],
    delateSrc: "../image/delate2.png",
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    var that=this;
    var search = wx.getStorageSync("recentsearch");
    if(search != 0){
      this.setData({
        recentSearch: search,
      })
    }
    
  },

  // 点击获取跳转
  onBindBlur:function(e){
 
    var val=e.detail.value;
    var str = val.replace(/(^\s*)|(\s*$)/g, '');
    if (str == '' || str == undefined || str == null) {
      wx.showToast({
        title: '您输入不可为空哦',
        icon:'none',
        duration:2000,
      })
        return false;
    } else {
      this.setData({
        search: e.detail.value
      })
    }
    
    recentsearch.push(str)

    // 数组去重  不重复显示搜索内容
    for (var i = 0; i < recentsearch.length; i++) {
      for (var j = i + 1; j < recentsearch.length; j++) {
        if (recentsearch[i] == recentsearch[j] || recentsearch[j] == " ") {
          recentsearch.splice(j, 1);
        }
      }
    }

    wx.setStorageSync("recentsearch", recentsearch);
      wx.navigateTo({
        url: '../chooseProduct/chooseProduct?key=' + str,
      })
    
  },
  // 清除记录
  delateRecent:function(){
    wx.removeStorageSync('recentsearch');
    var value=wx.getStorageSync("recentsearch");
    
    this.setData({
      recentSearch: value,
    })
    recentsearch=[];
    wx.removeStorageSync('recentsearch');

  },
  // 最近搜索的点击
  recentSearch:function(e){
    var list = wx.getStorageSync('recentsearch');
    var index=e.currentTarget.dataset.index;

    var proname=list[index];
    wx.navigateTo({
      url: '../chooseProduct/chooseProduct?key=' + proname,
    })
  }
})