// pages/mycenter/approve/approve.js
const app = getApp();
let userId;
Page({

  data: {
    datas: '', //激活后的用户信息
    status: '', //状态
    isTeacher: '', //是否是教师
    isSender: '', //是否是派单员
    reason:'',  //驳回提示信息
  },

  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + userId
    }
  },
  onLoad: function(options) {
    let isSender = wx.getStorageSync('isSender');
    let isTeacher = wx.getStorageSync('isTeacher');
    var schoolId = wx.getStorageSync('schoolId');
    userId = wx.getStorageSync('userId');
    console.log(schoolId)
    //如果学校id不存在跳转到引导页
    if (!schoolId) {
      console.log('1111111111')
      var way = '../mycenter/approve/approve';
      wx.reLaunch({
        url: '../../start/start?way=' + way
      })
    }
    this.setData({
      isTeacher: isTeacher,
      isSender: isSender
    });
    wx.showLoading({
      title: '加载中',
    });
    //用户信息获取
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}user/getAudit`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        userId: userId
      },
      success: res => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        console.log(res);
        if (res.data.data.type == 1 && res.data.data.status == 1) {
          wx.setStorageSync('isSender', '1')
        }
        if (res.data.data.type == 2 && res.data.data.status == 1) {
          wx.setStorageSync('isTeacher', '1')
        }
        this.setData({
          datas: res.data.data,
          status: res.data.status,
          reason:'未通过，'+res.data.data.reason
        });
      }
    });
  },
  //点击进入派单员详情
  bindSender() {
    if (this.data.isSender == -1) {

    } else {
      wx.navigateTo({
        url: '../real_name/real_name'
      })
    }
  },
  //下拉刷新
  onPullDownRefresh(){
    this.onLoad();
  }
})