// pages/addShifei/addShifei.js
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');
var goods_id;
var id;
var num;
var name;
var fl_name;
// 新增施肥接口
function shifeiSubmit(goods_id, id, name, fl_name, num,add_time,uid){
  http.postReq("/api/add-sf", { goods_id: goods_id, id: id, name: name, fl_name: fl_name,num:num,add_time:add_time,uid:uid},function(res){
      console.log(res)
      if(res.state){
        wx.navigateBack({})
        wx.showToast({
          title: '添加成功',
          icon: 'none',
          duration: 2000,
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000,
        })
      }
  })
}



Page({
  /**
   * 页面的初始数据
   */
  data: {
    dateTimeArray: null,
    dateTime: null,
    startYear: 2000,
    endYear: 2050,
    name:"",
    fl_name:"",
    num:"",
  },


  add: function () {
    var name=this.data.name;
    var fl_name=this.data.fl_name;
    var num=this.data.num;
    var uid=wx.getStorageSync("uid");
    var time = this.data.dateTime;
    var mout = time[1] + 1;
    var date = time[2] + 1
    var add_time = "20" + time[0] + "-" + mout + "-" + date + " " + time[3] + ":" + time[4] + ":" + time[5];
    console.log(add_time)
    if(name==""){
      wx.showToast({
        title: '您还没有输入负责人',
        icon:'none',
        duration:2000,
      })
      return false;
    }else if(fl_name==""){
      wx.showToast({
        title: '您还没有输入肥料名称',
        icon: 'none',
        duration: 2000,
      })
      return false;
    }else if(num==""){
      wx.showToast({
        title: '您还没有输入操作规范',
        icon: 'none',
        duration: 2000,
      })
      return false;
    }else{
      console.log("可以添加了")
      shifeiSubmit(goods_id, id, name, fl_name, num, add_time, uid)
    }
   
  },

  // 获取内容
  name:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  flName:function(e){
    this.setData({
      fl_name: e.detail.value
    })
  },
  num:function(e){
    this.setData({
      num: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
    });

    console.log(options)
    goods_id = options.goods_id;
    id=options.id;
    // 有内容就展示出来
    name=options.name;
    fl_name=options.fl_name;
    num=options.num;

  },

  // 点击修改时间
  changeDateTime(e) {
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },


  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;

    // 判断id是否为空 不为空则需要展示出来
    if (id == "undefined") {
      id = ""
      return false;
    } else {

      wx.showToast({
        title: '请记得重新选择日期',
        icon: 'none',
        duration: 3000,
      })

      that.setData({
        name: name,
        num: num,
        fl_name:fl_name,
      })
    }
  },
 

})