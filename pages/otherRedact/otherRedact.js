// pages/otherRedact/otherRedact.js
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var id;
var uid;
var img_url;
var desc;
var imgStr = '';
var imgCounts = 0;
var lists = [];
var imgList;
var details;

// 添加修改详情信息
function detailsInfo(uid,id,desc,img_url){
  http.postReq("/api/edit-goods",{uid:uid,id:id,desc:desc,img_url:img_url},function(res){
      console.log(res)
      if(res.state){
        wx.navigateBack({})
      }
  })
}

// 获取详情信息
function  getDetailsInfo(that,id){
  http.postReq("/api/detail", {id: id}, function (res) {
    console.log(res)
    details = res.data.desc;
    if (res.state) {
      if (res.data.detail_img!=null){
        var imgs = res.data.detail_img;
        imgList = imgs.split(",");
        that.setData({
          details: details,
          uploadImages: imgList,
        })
      }
     
    }
  })
}


// 图片评价上传
function uploadingPicture(img) {
  wx.showLoading({
    title: '正在上传...',
  })
  wx.uploadFile({
    url: 'http://xdsy.jsdianshi.com/api/upload-img',
    filePath: img,
    content: '',
    name: 'img_url',
    formData: {
      "uid": ""
    },
    success: function (res) {
      var dataRes = res.data;
      wx.hideLoading();
      imgStr += JSON.parse(dataRes).data + ",";
    }
  })
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    uploadImages:[],
    up:0,
    details:'',

  },
  // 上传图片
  phone:function(){
    var that=this;
      wx.chooseImage({
          count: 6,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success (res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths;
            var tempFiles = res.tempFiles;
            lists.push(tempFilePaths.toString())
          
            that.setData({
              uploadImages: lists,
            })
            imgCounts++;
            // 判断图片已经上传6张了就消失默认的图片
            var uploadImages = that.data.uploadImages;
            if (imgCounts==6){
              that.setData({
                up:1,
              })
            }else{
              that.setData({
                up: 0,
              })
            }
            // 循环上传
            for (let i = 0; i < uploadImages.length; i++) {
              uploadingPicture(uploadImages[i])
            }
          } 
      })
  },

  writeDetails:function(e){
    this.setData({
      details:e.detail.value,
    })
  },

  // 确认添加
  addOther:function(){
    var details = this.data.details;
    var uploadImages = this.data.uploadImages;
    if (details==""){
      wx.showToast({
        title: '您还没有输入详细信息',
        icon:'none',
        duration:2000,
      })
    } else if (uploadImages.length==0){
      wx.showToast({
        title: '您还没有上传图片',
        icon: 'none',
        duration: 2000,
      })
    }else{
      console.log("成功了")
      console.log(imgStr)
      detailsInfo(uid, id, details, imgStr)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    uid=wx.getStorageSync("uid");
    id=options.id;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    getDetailsInfo(that, id)
  },

})