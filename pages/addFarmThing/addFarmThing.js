// pages/addFarmThing/addFarmThing.js
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');
var goods_id;
var id;
var action;
var add_time;
var name;

// 新增农事接口
function farmGet(name, id, goods_id,add_time,action){
  http.postReq("/api/add-ns", { name: name, id: id, goods_id: goods_id,add_time:add_time,action:action},function(res){
    console.log(res);
    if(res.state){
      wx.navigateBack({})
      wx.showToast({
        title: '添加成功',
        icon:'none',
        duration:2000,
      })
    }else{
      wx.showToast({
        title: res.msg,
        icon:'none',
        duration:2000,
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
    people:"",
    farmThing:"",
  },
  // input赋值
  people:function(e){
    this.setData({
      people: e.detail.value
    })
  },
  farmThing:function(e){
    this.setData({
      farmThing: e.detail.value
    })
  },
  // 确认添加
  add: function () {
    // 操作人
    var name=this.data.people;
    // 时间赋值
    var time = this.data.dateTime;
    var mout = time[1] + 1;
    var date = time[2] + 1
    var add_time = "20" + time[0] + "-" + mout + "-" + date+"  "+time[3]+":"+time[4]+":"+time[5];
    // 农事操作
    var action = this.data.farmThing;
    // 判断为空则提示
    if(name==""){
      wx.showToast({
        title: '您还没有输入负责人',
        icon:'none',
        duration:2000,
      })
      return
    }else if(action==""){
      wx.showToast({
        title: '请您输入农事操作',
        icon: 'none',
        duration: 2000,
      })
      return
    }else{
      farmGet(name, id, goods_id, add_time, action)
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

    goods_id=options.goods_id;
    id=options.id;
    // 如果有东西展示内容
    action=options.action;
    add_time = options.add_time;
    name=options.name;
    
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
    var that=this;

    // 判断id是否为空 不为空则需要展示出来
    if (id == "undefined") {
      id = ""
      return false;
    } else {

      wx.showToast({
        title: '请记得重新选择日期',
        icon:'none',
        duration:3000,
      })

      that.setData({
        people:name,
        farmThing:action,
      })
    }
  },

  
})