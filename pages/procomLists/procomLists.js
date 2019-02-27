
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var companyLists;

// 获取企业列表
function getCompanyLists(uid,that) {
  http.postReq("/api/gs-list", { uid: uid }, function (res) {
    companyLists=res.data;
    if(res.state){
      that.setData({
        company_lists: res.data
      })
    }
  })
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    company_lists: []
  },
  // 进入产品列表
  enterProduct:function(e){
    var index=e.currentTarget.dataset.index;
    var id = companyLists[index].id;
    wx.navigateTo({
      url: '../productList/productList?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var uid = wx.getStorageSync("uid")
    getCompanyLists(uid,that)
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})