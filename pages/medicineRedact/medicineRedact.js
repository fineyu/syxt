// pages/medicineRedact/medicineRedact.js
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var lists;
var goods_id;
var id;
var name;
var ny_name;
var to;


// 获取用药信息列表
function getMedicineLists(goods_id,that){
  http.postReq("/api/yy-list",{goods_id:goods_id},function(res){
    console.log(res)
    lists = res.data;
    var num = lists.length;
    if (res.state) {
      if (num != 0) {
        that.setData({
          medicineLists: res.data,
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
    medicineLists: [],
    nullSrc: '../image/null.png',
    nullnum: 1,
  },

// 新增用药
  addMedicine:function(){
    wx.navigateTo({
      url: '../addMedicine/addMedicine?goods_id=' + goods_id + '&id=' + "undefined",
    })
  },

  // 修改施肥信息 有内容
  change: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(lists[index]);
    id = lists[index].id;
    console.log(id);
    name = lists[index].name;
    ny_name = lists[index].ny_name;
    to = lists[index].to;

    wx.navigateTo({
      url: '../addMedicine/addMedicine?id=' + id + '&name=' + name + '&ny_name=' + ny_name + '&to=' + to + '&goods_id=' + goods_id,
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
    getMedicineLists(goods_id, that)
  },
})