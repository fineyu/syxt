//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var companyLists;

// 获取企业列表
function getCompanyLists(uid, that) {
  http.postReq("/api/gs-list", { uid: uid }, function (res) {
    console.log(res)
    companyLists = res.data;
    if (res.state) {
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
    company_lists:[]
  },
  // 修改信息
  changeCompanyInfo:function(e){
    var index=e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../companyEntering/companyEntering?companylist=' + JSON.stringify(companyLists[index]) ,
    })
  },
  // 新增企业
  addNewCompany:function(e){
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../companyEntering/companyEntering',
    })
  },
// 删除企业
  delateCompanyInfo:function(e){
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '温馨提示',
      content: '您确认删除吗？',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '请您等待后台审核',
            icon: 'none',
            duration: 2000,
          })
        } else if (res.cancel) {
        }
      }
    })
   
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    
  },

 
  onShow: function () {
    var that=this;
    var uid = wx.getStorageSync("uid")
    getCompanyLists(uid, that) 
  },

})