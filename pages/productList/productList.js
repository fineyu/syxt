//获取应用实例
const app = getApp()
// 引入http交互
var http = require('../../service/http.js');
var productLists;
var gs_id;


// 获取产品列表
function getProductList(gs_id,that){
  http.postReq("/api/goods-list",{gs_id:gs_id},function(res){
    console.log(res)
    productLists=res.data;
    var num = productLists.length;
    console.log(productLists)
    if(res.state){
      if (num != 0){
        that.setData({
          product_lists: res.data,
          nullnum: 0,
        })
        return false
      }else{
        that.setData({
          nullnum: 1
        })
      }
    }
  })
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_lists: [],
    nullSrc:'../image/null.png',
    nullnum:1,
  },
  // 新增产品  无内容
  addNewProduct:function(){
    wx.navigateTo({
      url: '../productEntering/productEntering?gs_id='+gs_id,
    })
  },
  // 修改产品   有内容
  changeProductInfo:function(e){
    var index=e.currentTarget.dataset.index;
    var id=productLists[index].id;
    var product = productLists[index];
    var title = productLists[index].title;
    var img_url = productLists[index].img_url;
    wx.navigateTo({
      url: '../productEntering/productEntering?id=' + id + '&gs_id=' + gs_id+'&title='+title+'&img_url='+img_url,
    })
  },
  // 删除该产品
  delateProductInfo:function(e){
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '温馨提示',
      content: '您确认删除吗？',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '请您等待后台审核',
            icon: 'none',
            duration: 2000,
          })        
        } else if (res.cancel) {
        }
       
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    gs_id=options.id;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    getProductList(gs_id, that);

  },

  
})