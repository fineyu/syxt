// pages/farmRedact/farmRedact.js
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var goods_id;
var id;
var array;
var ns_id;

// 展示农事操作的内容
function getFarmLists(goods_id,that){
  http.postReq("/api/ns-list",{goods_id:goods_id},function(res){
      console.log(res);
      array=res.data;
      var num=array.length;
      if(res.state){
        if(num!= 0){
          that.setData({
            farmersLists:res.data,
            nullnum:0
          })
        }else{
          that.setData({
            nullnum: 1
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
    farmersLists:[],
    nullSrc: '../image/null.png',
    nullnum: 1,
  },
  // 修改
  change:function(e){
    var index=e.currentTarget.dataset.index;
    console.log(array[index]);
    ns_id = array[index].id;
    var action = array[index].action;
    var add_time = array[index].add_time;
    var name = array[index].name;
    wx.navigateTo({
      url: '../addFarmThing/addFarmThing?id=' + ns_id + '&goods_id=' + goods_id+'&action='+action+'&add_time='+add_time+'&name='+name,
    })
  },
  // 删除
  delate:function(){

  },
  // 新增农事
  addNewFarm:function(){
    wx.navigateTo({
      url: '../addFarmThing/addFarmThing?id=' + "undefined" + '&goods_id=' + goods_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    goods_id = options.id;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    getFarmLists(goods_id, that)

  },

  
})