// pages/checkRedact/checkRedact.js
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var lists;
var id;
var uid;
var result;
var action;
var add_time;
var goods_id;

// 获取加工包装列表
function getCheckLists(goods_id, that) {
  http.postReq("/api/jc-list", { goods_id: goods_id }, function (res) {
    console.log(res)
    lists = res.data;
    var num = lists.length;
    if (res.state) {
      if (num != 0) {
        that.setData({
          checkList: res.data,
          nullnum: 0,
        })
      } else {
        that.setData({
          nullnum: 1,
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
    checkList:[],
    nullSrc: '../image/null.png',
    nullnum: 1,
  },
  // 新增检测 没内容
  addCheck:function(){
    wx.navigateTo({
      url: '../addCheck/addCheck?goods_id=' + goods_id + '&id=' + "undefined",
    })
  },
  // 修改检测 有内容
  change:function(e){
    var index = e.currentTarget.dataset.index;
    id = lists[index].id;
    result = lists[index].result;
    action = lists[index].action;
    wx.navigateTo({
      url: '../addCheck/addCheck?id=' + id + '&result=' + result + '&action=' + action + '&goods_id=' + goods_id ,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    goods_id = options.id;
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    getCheckLists(goods_id, that)
  },

})