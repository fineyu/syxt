// pages/shifeiRedact/shifeiRedact.js
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var goods_id;
var lists;
var id;
var name;
var fl_name;
var num;

function shifeiGet(goods_id,that){
  http.postReq("/api/sf-list",{goods_id:goods_id},function(res){
      console.log(res)
      lists=res.data;
      var num=lists.length;
      if(res.state){
        if (num != 0){
          that.setData({
            shifieLists: res.data,
            nullnum:0,
          })
        }else{
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
    shifieLists: [],
    nullSrc: '../image/null.png',
    nullnum: 1,
  },
  // 新增施肥 无内容
  addShifei:function(){
    wx.navigateTo({
      url: '../addShifei/addShifei?goods_id=' + goods_id+'&id='+"undefined",
    })
  },
  // 修改施肥信息 有内容
  change:function(e){
    var index = e.currentTarget.dataset.index;
    console.log(lists[index]);
    id = lists[index].id;
    console.log(id);
    name = lists[index].name;
    fl_name = lists[index].fl_name;
    num = lists[index].num;

    wx.navigateTo({
      url: '../addShifei/addShifei?id='+id+'&name='+name+'&fl_name='+fl_name+'&num='+num+'&goods_id='+goods_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      goods_id=options.id;
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    shifeiGet(goods_id, that)
  },

})