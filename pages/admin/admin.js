// pages/admin/admin.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function(options) {

  },

  onShow: function() {
    let schoolId = wx.getStorageSync('schoolId');
    var userId = wx.getStorageSync('userId');
    var isManager = wx.getStorageSync('isManager');
    //如果学校id不存在跳转到引导页
    if (!schoolId) {
      console.log('1111111111')
      var way = '../admin/admin';
      wx.reLaunch({
        url: '../start/start?way=' + way
      })
    }
    if (isManager != 1) {
      wx.showToast({
        title: '您不是该校区的管理员',
        icon: 'none',
        duration: 2000
      });
      setTimeout(() => {
        wx.switchTab({
          url:'../index/index'
        });
      }, 500);
    }  
  },
  // 分享
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  statistics: function() {
    wx.navigateTo({
      url: './statistics/statistics'
    })
  },
  order: function() {
    wx.navigateTo({
      url: './send_order/send_order'
    })
  },
  // send_man: function() {
  //   this.setData({
  //     show: false
  //   })
  //   wx.navigateTo({
  //     url: './send_man/send_man'
  //   })
  // },
  // teacher: function() {
  //   this.setData({
  //     show: false
  //   })
  //   wx.navigateTo({
  //     url: './teacher/teacher'
  //   })
  // },
  // cut: function() {
  //   this.setData({
  //     show: false
  //   })
  // },
  // user_order: function() {
  //   this.setData({
  //     show: false
  //   })
  //   wx.navigateTo({
  //     url: './user_order/user_order'
  //   })
  // },
  // send_order: function() {
  //   this.setData({
  //     show: false
  //   })
  //   wx.navigateTo({
  //     url: './send_order/send_order'
  //   })
  // }
})