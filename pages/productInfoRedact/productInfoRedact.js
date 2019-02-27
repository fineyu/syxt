//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var id;
var gs_id;
var img = "";
var title;
var img_url;
// 选择地址
function chooseTowns(that) {
  http.getReq("/api/addr", function (res) {
    if (res.state) {
      that.setData({
        array: res.data
      })
    }
  })
}

// 提交产品录入

function productRedact(name,uid,id,gs_id,img_url){
  http.postReq("/api/add-goods",{name:name,uid:uid,id:id,gs_id:gs_id,img_url:img_url},function(res){
      if(res.state){
        console.log(res)
        wx.navigateBack({})
      }
  })  
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    img_url: "../image/phone.png",
    linkmanName: "../image/linkname.png",
    array: [],
    name:"",
  },
  // 企业录入地址联动
  bindPickerChange: function (e) {
    var index = e.detail.value;
    var array = this.data.array;
    var city1 = array[index];
    this.setData({
      city: city1,
    })
  },

  // 企业录入选择企业图片
  chooseCompanyCovers: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;

        // 上传图片
        wx.uploadFile({
          url: 'http://xdsy.jsdianshi.com/api/upload-img', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'img_url',
          success(res) {
            var data = JSON.parse(res.data)
            img = JSON.parse(res.data).data,
              that.setData({
                img_url: JSON.parse(res.data).data,
              })

          }
        })

      }
    })
  },

  writeProduct: function (e) {
    var that = this;
    that.setData({
      name: e.detail.value,
    })
    console.log(e.detail.value)
  },


  submit: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      focus: false,
    })
  },
  // 提交企业录入
  submitCompany: function () {
    var uid = wx.getStorageSync("uid");
    var name = this.data.name;
    // var img_url = this.data.img_url;
    // 手机
    if (name == "") {
      wx.showToast({
        title: '请您输入产品名称',
        icon: 'none',
        duration: 2000
      })
      return false;
    }  else if (img == "") {
      wx.showToast({
        title: '您还没有上传封面',
        icon: 'none',
        duration: 2000,
      })
      return false;

    } else {
      console.log("可以上传了")
      productRedact(name, uid, id, gs_id, img)
    }
  },
  /**
   * 
   * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this;
    // 获取乡镇
    chooseTowns(that);
    // 获取修改企业录入得内容
    id=options.id;
    gs_id = options.gs_id;
    title=options.title;
    img_url = options.img_url;
    
  },

  onShow: function () {
    var that=this;
    if (id == "undefined") {
      id = "";
      return false;
    }else{
      that.setData({
        name:title,
        img_url: img_url,
      })
    }
  },


})