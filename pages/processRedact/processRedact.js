// pages/processRedact/processRedact.js
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var lists;
var goods_id;
var id;
var name;
var action;

// 获取加工信息的列表
function getProcessLists(goods_id,that){
  http.postReq("/api/jg-list",{goods_id:goods_id},function(res){
    console.log(res)
    lists = res.data;
    var num = lists.length;
    if (res.state) {
      if (num != 0) {
        that.setData({
          farmersLists: res.data,
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
    farmersLists: [],
    nullSrc: '../image/null.png',
    nullnum: 1,
  },


// 新增加工信息
  addprocess:function(){
    wx.navigateTo({
      url: '../addProcess/addProcess?goods_id=' + goods_id + '&id=' + "undefined",
    })
  },
  // 修改信息
  change:function(e){
    var index = e.currentTarget.dataset.index;
    console.log(lists[index]);
    id = lists[index].id;
    name = lists[index].name;
    action = lists[index].action;

    wx.navigateTo({
      url: '../addProcess/addProcess?id=' + id + '&name=' + name + '&action=' + action + '&goods_id=' + goods_id,
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
    getProcessLists(goods_id, that)
  },

})