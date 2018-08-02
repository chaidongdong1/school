// pages/admin/teacher/teacher.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose:0
  },
  onLoad: function (options) {
  
  },

  
  onShow: function () {
  
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  tab_choose: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      choose: index
    })
  }
})