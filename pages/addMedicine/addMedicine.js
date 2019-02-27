// pages/addMedicine/addMedicine.
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');
var name;
var id;
var uid;
var goods_id;
var ny_name;
var to;
var add_time;



// 新增农药
function addMedicine(name,id,uid,goods_id,ny_name,to,add_time){
  http.postReq("/api/add-yy", { name: name, id: id, uid: uid, goods_id: goods_id, ny_name: ny_name, to: to, add_time: add_time},function(res){
    console.log(res);
    if (res.state) {
      wx.navigateBack({})
      wx.showToast({
        title: '添加成功',
        icon: 'none',
        duration: 2000,
      })
    } else {
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
    name:'',
    ny_name:'',
    to:'',
    dateTimeArray: null,
    dateTime: null,
    startYear: 2000,
    endYear: 2050,
  },

  // 获取值
  name:function(e){
    this.setData({
      name:e.detail.value,
    })
  },
  nyName: function (e) {
    this.setData({
      ny_name: e.detail.value,
    })
  },
  to: function (e) {
    this.setData({
      to: e.detail.value,
    })
  },


  // 确认添加
  add: function () {
    // 操作人
    var name = this.data.name;
    // 时间赋值
    var time = this.data.dateTime;
    var mout = time[1] + 1;
    var date = time[2] + 1
    var add_time = "20" + time[0] + "-" + mout + "-" + date + "  " + time[3] + ":" + time[4] + ":" + time[5];
    // 农事操作
    var to = this.data.to;
    var ny_name = this.data.ny_name;
    uid=wx.getStorageSync("uid")
    if (name == "") {
      wx.showToast({
        title: '您还没有输入负责人',
        icon: 'none',
        duration: 2000,
      })
      return
    } else if (ny_name == "") {
      wx.showToast({
        title: '请您输入农药名称',
        icon: 'none',
        duration: 2000,
      })
      return
    } else if(to == ""){
      wx.showToast({
        title: '请您输入防治对象',
        icon: 'none',
        duration: 2000,
      })
    }else {
      addMedicine(name, id, uid, goods_id, ny_name, to, add_time)
    }
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
    id = options.id;
    // 如果有东西展示内容
    name = options.name;
    ny_name = options.ny_name;
    to = options.to;

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
        ny_name: ny_name,
        to:to,
      })
    }
  },

  
})