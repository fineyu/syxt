//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var id;
var img="";
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



Page({
  /**
   * 页面的初始数据
   */
  data: {
    onesrc: "../image/one.png",
    twosrc: "../image/two.png",
    twoSrc: "../image/two1.png",
    threesrc: "../image/three.png",
    threeSrc: "../image/three1.png",
    company: 0,
    product: 0,
    adress: "../image/adress1.png",
    img_url: "../image/phone.png",
    proName: "../image/cplr.png",
    comName: "../image/name.png",
    linkmanName: "../image/linkname.png",
    linkmanPhone: "../image/linkphone.png",
    farmSrc: "../image/farm.png",
    ShifeiSrc: "../image/shifei.png",
    yongyaoSrc: "../image/yongyao.png",
    jiagongSrc: "../image/jiagong.png",
    packSrc: "../image/pack.png",
    checkSrc: "../image/check.png",
    selectedSrc: "../image/selected.png",
    unselectedSrc: "../image/unselected.png",
    unselected: 0,
    selected: 0,
    array: [],
    writeCompanyName: "",
    writeCompanyStyle: "",
    productDescription: "",
    writeDetails: "",
    writePerson: "",
    writePhone: "",
    city: "巴久乡"
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

  writeCompanyName: function (e) {
    var that = this;
    that.setData({
      writeCompanyName: e.detail.value,
    })
  },
  writeCompanyStyle: function (e) {
    var that = this;
    that.setData({
      writeCompanyStyle: e.detail.value,
    })
  },
  writeDetails: function (e) {
    var that = this;
    that.setData({
      writeDetails: e.detail.value,
    })
  },
  writePerson: function (e) {
    var that = this;
    that.setData({
      writePerson: e.detail.value,
    })
  },
  writePhone: function (e) {
    var that = this;
    that.setData({
      writePhone: e.detail.value,
    })
  },
  productDescription: function (e) {
    var that = this;
    that.setData({
      productDescription: e.detail.value,
    })
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
    var name = this.data.writeCompanyName;
    var type = this.data.writeCompanyStyle;
    var addr = this.data.writeDetails;
    var people = this.data.writePerson;
    var desc = this.data.productDescription;
    var img_url = this.data.img_url;
    var array = this.data.array;
    var index = this.data.index;
    var city = this.data.city;
    var phone = this.data.writePhone;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    // 手机
    if (phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else if (!myreg.test(this.data.writePhone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else if (name == "") {
      wx.showToast({
        title: '您还没有写产品名称',
        icon: 'none',
        duration: 2000,
      })
      return false;

    } else if (type == "") {
      wx.showToast({
        title: '您还没有写产品年产量',
        icon: 'none',
        duration: 2000,
      })
      return false;

    } else if (addr == "") {
      wx.showToast({
        title: '您还没有写详细地址',
        icon: 'none',
        duration: 2000,
      })
      return false;

    } else if (people == "") {
      wx.showToast({
        title: '您还没有写负责人',
        icon: 'none',
        duration: 2000,
      })
      return false;

    } else if (desc == "") {
      wx.showToast({
        title: '您还没有写产品描述',
        icon: 'none',
        duration: 2000,
      })
      return false;

    } else if (img == "") {
      wx.showToast({
        title: '您还没有上传封面',
        icon: 'none',
        duration: 2000,
      })
      return false;

    } else {
      console.log("可以上传了")
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
    console.log(options)
    // if (JSON.stringify(options) === '{}') {
    //   id = "";
    //   return false;
    // } else {
    //   var com = options.companylist;
    //   var list = JSON.parse(com);
    //   id = list.id;
    //   // var arr = Array(list.city);
    //   // console.log()
    //   that.setData({
    //     writeDetails: list.addr,
    //     city: list.city,
    //     productDescription: list.desc,
    //     img_url: list.img_url,
    //     writeCompanyName: list.name,
    //     writePerson: list.people,
    //     writePhone: list.phone,
    //     writeCompanyStyle: list.type,
    //   })
    // }

  },

  onShow: function () {

  },

 
})