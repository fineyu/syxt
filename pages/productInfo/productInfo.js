// pages/productInfo/productInfo.js
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var QRCode = require('../../utils/weapp-qrcode.js');

var qrcode;
var id;
var title;
var phone;



// 获取产品的详细信息
function getProductInfo(that,id){
  http.postReq("/api/goods-detail",{id:id},function(res){
      console.log(res)
      var imgs = res.data.detail_img;
      phone=res.data.code;
      var lists;
      if (imgs != null){
        lists = imgs.split(",");
        that.setData({
          otherImages: lists,
        })
      }

      if(res.state){
        title=res.data.title;
        
        that.setData({
          title:res.data.title,
          store_url: res.data.store_url,
          addr:res.data.addr,
          img_url:res.data.img_url,
          packInfo:res.data.bz,
          processInfo:res.data.jg,
          checkInfo:res.data.jc,
          farmers:res.data.ns,
          shifeiInfo:res.data.sf,
          medicineInfo:res.data.yy,
          introduction:res.data.desc,
          details: res.data.desc,
        })
      }
  })
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    details:"",
    img_url: "",
    topUrl: "../image/chanpin2.png",
    store_url:"",
    addr:"",
    farm:0,
    shifei:0,
    medicine:0,
    process:0,
    pack:0,
    check:0,
    other:0,
    farmers:[],
    shifeiInfo:[],
    medicineInfo:[],
    processInfo:[],
    packInfo:[],
    checkInfo:[],
    introduction:"",
    otherImages:[],
    contactSrc:"../image/lianxi.png",
    fenxiangSrc:"../image/fenxiang.png",
    text:"",
    maskFlag:true,
    image:"",
  },

  // 点击查看农事
  farmClick:function(){
    var farm=this.data.farm;
    if(farm==0){
      this.setData({
        farm:1,
      })
    }else{
      this.setData({
        farm: 0,
      })
    }
  },

  // 点击查看施肥
  shifeiClick:function(){
    var shifei = this.data.shifei;
    if (shifei == 0) {
      this.setData({
        shifei: 1,
      })
    } else {
      this.setData({
        shifei: 0,
      })
    }
  },

  // 点击查看用药
  medicineClick:function(){
    var medicine = this.data.medicine;
    if (medicine == 0) {
      this.setData({
        medicine: 1,
      })
    } else {
      this.setData({
        medicine: 0,
      })
    }
  },

  // 点击查看加工信息
  processClick:function(){
    var process = this.data.process;
    if (process == 0) {
      this.setData({
        process: 1,
      })
    } else {
      this.setData({
        process: 0,
      })
    }
  },

  // 点击查看包装信息
  packClick:function(){
    var pack = this.data.pack;
    if (pack == 0) {
      this.setData({
        pack: 1,
      })
    } else {
      this.setData({
        pack: 0,
      })
    }
  },

  // 点击查看检测内容
  checkClick:function(){
    var check = this.data.check;
    if (check == 0) {
      this.setData({
        check: 1,
      })
    } else {
      this.setData({
        check: 0,
      })
    }
  },

  // 点击查看详情
  otherClick:function(){
    var other = this.data.other;
    if (other == 0) {
      this.setData({
        other: 1,
      })
    } else {
      this.setData({
        other: 0,
      })
    }
  },

  // 按钮转发
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      // 产品名字
      title: title,
      path: 'pages/productInfo/productInfo?id='+id,
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


  // 联系商家
  phone:function(){
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  /*,*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id=options.id;
    var that=this;
    getProductInfo(that, id);

    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: "http://xdsy.jsdianshi.com/site/code-detail?goods_id=" + id,
      image: '',
      width: 150,
      height: 150,
      colorDark: "#f2c81f",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });

  },

  // 长按保存
  save: function (e) {
    var that=this;
    wx.showActionSheet({
      itemList: ['保存图片',"识别二维码"],
      success: function (res) {

        if (res.tapIndex == 0) {
          qrcode.exportImage(function (path) {

            var list=[];
            list.push(path)
            wx.previewImage({
              current:path, // 当前显示图片的http链接   
              urls: list // 需要预览的图片http链接列表   
            })
            wx.getImageInfo({
              src: path,
              success(res){
                console.log(res)
              }
            })
          
          })
        }else if (res.tapIndex == 1) {
                   
          wx.navigateTo({
            url: '../code/code?id='+id,
          })
        
        }
      }
    })

    
  },

  code:function(){
    // 传入字符串生成qrcode
    // 生成二维码
    var maskFlag = this.data.maskFlag;
    if (maskFlag==true){
      this.setData({
        maskFlag: false,
      })
      
    }else{
      this.setData({
        maskFlag: true,
      })
    }
    
  },
  maskHide:function(){
    this.setData({
      maskFlag: true,
    })
  }
})