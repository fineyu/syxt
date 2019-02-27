// pages/logs/logs.js
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var id;
var titleName;
var phone;
var goods;
// 获取企业详情
function getCompanyInfo(that,id){
  http.postReq("/api/gs-detail",{id:id},function(res){
      console.log(res)
      titleName=res.data.name;
      phone=res.data.phone;
      goods = res.data.goods;
      var list = res.data.goods;
      if(res.state){
        if (list.length != 0){
          that.setData({
            nullNum: 1,
          })
        }
        that.setData({
          name:res.data.name,
          img_url:res.data.img_url,
          addr:res.data.addr,
          city:res.data.city,
          desc:res.data.desc,
          type:res.data.type,
          products:res.data.goods,
        })
      }
  })
}


Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    img_url:"",
    topUrl:"../image/diqiu.png",
    shareUrl:"../image/share.png",
    timeUrl:"../image/time.png",
    adresseUrl:"../image/adress2.png",
    bookUrl:"../image/book.png",
    pull:"../image/down.png",
    up:"../image/top.png",
    more:0,
    seeUrl: "../image/see.png",
    products: [],
    addr:"",
    city:"",
    desc:"",
    type:"",
    nullSrc:"../image/null.png",
    nullNum:0,
  },
  // 点击了解更多展开
  moreGet:function(){
    var num=this.data.more;
    if(num==0){
      this.setData({
        more: 1,
      })
    }else{
      this.setData({
        more: 0,
      })
    }
  },
  // 联系负责人
  contactPerson:function(){
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  // 点击产品进入详情
  productClick:function(e){
    var index = e.currentTarget.dataset.index;
    var id = goods[index].id;
    wx.navigateTo({
      url: '../productInfo/productInfo?id='+id,
    })
  },
  // 按钮转发
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      // 产品名字
      title: titleName,
      path: 'pages/companyInfo/companyInfo',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    id=options.id;
    getCompanyInfo(that,id)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
 
})