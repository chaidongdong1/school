// pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false
  },
  onLoad: function (options) {
  
  },

  onShow: function () {
  
  },
  send_man: function () {
    this.setData({
      show: false
    })
    wx.navigateTo({
      url: './send_man/send_man'
    })
  },
  teacher: function () {
    this.setData({
      show: false
    })
    wx.navigateTo({
      url: './teacher/teacher'
    })
  },
  cut: function () {
    this.setData({
      show: false
    })
  },
  statistics: function () {
    this.setData({
      show: false
    })
    wx.navigateTo({
      url: './statistics/statistics'
    })
  },
  order: function () {
    this.setData({
      show:true
    })
  },
  user_order: function () {
    this.setData({
      show: false
    })
    wx.navigateTo({
      url: './user_order/user_order'
    })
  },
  send_order: function () {
    this.setData({
      show: false
    })
    wx.navigateTo({
      url: './send_order/send_order'
    })
  },
  onShareAppMessage: function () {
  
  }
})