// pages/panic/panic.js
var app = getApp();
Page({
  data: {
    vou: [],
    showLoading: true
  },
  // 分享
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  onLoad: function(options) {
    var userId = wx.getStorageSync('userId');
    var schoolId = wx.getStorageSync('schoolId');
    console.log(schoolId)
    //如果学校id不存在跳转到引导页
    if (!schoolId) {
      console.log('1111111111')
      var way = '../mycenter/rituall/rituall';
      wx.reLaunch({
        url: '../../start/start?way=' + way
      })
    }
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.request({
      url: app.globalData.api + 'voucher/voucher',
      method: 'post',
      data: { userId: userId },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var vou = res.data.nouses;
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            vou: vou,
          });
          console.log(that.data.vou)
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000,
            icon: 'none'
          });
        }
        //endInitData
      },
      fail: function(e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      },
      complete: function() {
        that.setData({
          showLoading: false
        })
      }
    });
  }
})