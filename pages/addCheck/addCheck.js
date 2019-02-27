// pages/addCheck/addCheck.js
//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');
var goods_id;
var id;
var uid;
var result;
var action;

// 新增加工信息
function addCheck(id, uid, goods_id, action, result, add_time) {
  http.postReq("/api/add-jc", { id: id, uid: uid, goods_id: goods_id, action: action, result: result,add_time: add_time }, function (res) {
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
    select:0,
    dateTimeArray: null,
    dateTime: null,
    startYear: 2000,
    endYear: 2050,
    action:'',
  },
  // 选择合格不合格
  chooseUnselected:function(){
    var sale=this.data.select;
    if(sale==0){
      this.setData({
        select:1
      })
    }else{
      this.setData({
        select:0
      })
    }
  },
  chooseSelected: function () {
    var sale = this.data.select;
    if (sale == 0) {
      this.setData({
        select: 1
      })
    } else {
      this.setData({
        select: 0
      })
    }
  },

  // 获取值
  action(e){
    this.setData({
      action:e.detail.value,
    })
  },

  // 确认添加
  add:function(){
    uid=wx.getStorageSync("uid");
    action=this.data.action;
    var time = this.data.dateTime;
    var mout = time[1] + 1;
    var date = time[2] + 1
    var add_time = "20" + time[0] + "-" + mout + "-" + date + "  " + time[3] + ":" + time[4] + ":" + time[5];
    var select = this.data.select;
    if (select=="0"){
      result="不合格"
    }else{
      result = "合格"
    }
    if(action==""){
      wx.showToast({
        title: '您还没有输入检测项目',
        icon: 'none',
        duration: 2000,
      })
      return
    }else{
      addCheck(id, uid, goods_id, action, result, add_time)
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
    action = options.action;
    result = options.result;
   
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
        result: result,
        action: action,
      })
    }
  },

  
})