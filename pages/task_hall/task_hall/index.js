// pages/task_hall/task_hall/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onLoad: function (options) {
  
  },
  jump_start: function () {
    wx.redirectTo({
      url: '../task_hall/index'
    })
  },
  jump_center: function () {
    wx.redirectTo({
      url: '../in_task/in_task'
    })
  },
  jump_end: function () {
    wx.redirectTo({
      url: '../task_end/task_end'
    })
  },

  onShow: function () {
  
  }
})