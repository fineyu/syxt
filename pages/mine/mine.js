// pages/mine/mine.js
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var account;
var pwd;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    header:"../image/xide.png",
    userName:"溯源用户",
    vipSrc:"../image/vip.png",
    enterSrc:"../image/jingru.png",
    register:0,
    success:0,
    writeSrc:"../image/write.png",
    account:"",
    password:"",
  },
  // 点击请登录
  register:function(){
    var num=this.data.register;
    if (num==0){
      this.setData({
        register:1,
      })
    }
  },
  writeAccount: function (e) {
    console.log(e.detail.value);
    this.setData({
      account: e.detail.value,
    })
  },
  writePassword: function (e) {
    console.log(e.detail.value);
    this.setData({
      password: e.detail.value,
    })
  },
  // 输入账号密码登录跳转到产品录入
  enter:function(){
    var that = this;
    var num = that.data.success;
    account = that.data.account;
    pwd = that.data.password;
    if (account == "") {
      wx.showToast({
        title: '您还没输入账号',
        icon: 'none',
        duration: 2000,
      })
    } else if (pwd == "") {
      wx.showToast({
        title: '您还没输入密码',
        icon: 'none',
        duration: 2000,
      })
    }else{
      http.postReq("/api/login", { account: account, pwd: pwd }, function (res) {
       

        if (res.state) {
          wx.setStorageSync("uid", res.data.uid)
          wx.setStorageSync("head_pic", res.data.head_pic)
          wx.setStorageSync("nickname", res.data.nickname)
          wx.showToast({
            title: '恭喜您登录成功',
            duration: 2000,
          })
          if (num == 0) {
            that.setData({
              success: 1,
              header: res.data.head_pic,
              userName: res.data.nickname,
            })
          };
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000,
          })
        }
      })
    }
    
  },

  // 平台介绍
  platformClick:function(){
    wx.navigateTo({
      url: '../platform/platform',
    })
  },
  // 企业录入
  companyEntering:function(){
    wx.navigateTo({
      url: '../companyLists/companyLists',
    })
  },
  // 产品录入
  productEntering:function(){
    wx.navigateTo({
      url: '../procomLists/procomLists',
    })
  },
  
 
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  },
  // 退出登陆
  dropOut:function(){
    var that=this;
     pwd="";
     account="";
      that.setData({
        password:"",
        account:"",
        success:0,
        register:0,
        header:"../image/xide.png",
        userName:"溯源系统"
      })

    console.log(account)
    console.log(pwd)
  }
})