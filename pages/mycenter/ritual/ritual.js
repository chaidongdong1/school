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
  getvou(e) {
    var vid = e.currentTarget.dataset.vid;
    wx.request({
      url: app.globalData.api + 'voucher/get_voucher',
      method: 'post',
      data: {
        vid: vid,
        userId: this.data.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        var status = res.data.status;
        if (status == 1) {
          wx.showToast({
            title: '领取成功！',
            duration: 1500
          });
          setTimeout(() => {
            this.onShow();
          },500);
        } else {
          wx.showToast({
            title: res.data.err,
            icon: 'none',
            duration: 1500
          });
        }
        //endInitData
      },
      fail: function(e) {
        wx.showToast({
          title: '网络异常！',
          duration: 1500,
          icon: 'none'
        });
      },
    });
  },
  onLoad: function(options) {

  },
  onShow: function() {
    var schoolId = wx.getStorageSync('schoolId');
    var userId = wx.getStorageSync('userId');
    var schoolName = wx.getStorageSync('schoolName');
    console.log(schoolId)
    //如果学校id不存在跳转到引导页
    if (!schoolId) {
      console.log('1111111111')
      var way = '../mycenter/ritual/ritual';
      wx.reLaunch({
        url: '../../start/start?way=' + way
      })
    }
    this.setData({
      schoolId: schoolId,
      userId: userId,
      schoolName: schoolName
    })
    var that = this;
    wx.request({
      url: app.globalData.api + 'voucher/index',
      method: 'post',
      data: {
        userId: this.data.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res)
        var vou = res.data.vou;
        if (vou && vou.length > 0) {
          that.setData({
            vou: vou
          });
        }
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
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})