// pages/packRedact/packRedact.js
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var lists;
var id;
var goods_id;
var guige;
var num;
var day;
var name;


// 获取加工包装列表
function getPackLists(goods_id,that){
  http.postReq("/api/bz-list", { goods_id: goods_id }, function (res) {
    console.log(res)
    lists = res.data;
    var num = lists.length;
    if (res.state) {
      if (num != 0) {
        that.setData({
          packLists: res.data,
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
    packLists: [],
    nullSrc: '../image/null.png',
    nullnum: 1,
  },

  // 新增包装信息
  addPack:function(){
    wx.navigateTo({
      url: '../addPack/addPack?goods_id=' + goods_id + '&id=' + "undefined",
    })
  },

  change: function (e) {
    var index = e.currentTarget.dataset.index;
    id = lists[index].id;
    guige = lists[index].guige;
    num = lists[index].num;
    day = lists[index].day;
    name = lists[index].name;
    wx.navigateTo({
      url: '../addPack/addPack?id=' + id + '&guige=' + guige + '&num=' + num + '&goods_id=' + goods_id + '&day=' + day +'&name='+name,
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
    var that = this;
    getPackLists(goods_id, that)
  },

  
})