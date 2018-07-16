// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school:["请选择你的校区","龙子湖校区","北龙湖校区"],
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  change: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  onShow: function () {
  
  },

  
  onShareAppMessage: function () {
  
  }
})