// pages/mycenter/mycenter.js
var app = getApp();
let userId;
Page({

  data: {
    isManager: 0, //是否是管理员
    isSender: 0, //是否是派单员
    isTeacher: 0, //是否是教师
    schoolId: '', //学校id
    userId: '', //用户id
    userPhone: '', //用户手机号
    schoolName: '', //学校名字
    userInfo: '' //用户信息
  },

  onLoad: function(options) {

  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + userId
    }
  },
  // 获取用户权限
  getUI: function(e) {
    var that = this;
    if (e.detail.userInfo) {
      var userInfo = e.detail.userInfo;
      userInfo.userId = this.data.userId;
      this.setData({
        userInfo: userInfo
      })
      app.uploadInfo(userInfo)
      console.log(userInfo)
    }
  },
  onShow: function() {
    wx.showLoading({
      title: '加载中',
    })
    var schoolId = wx.getStorageSync('schoolId');
    userId = wx.getStorageSync('userId');
    var schoolName = wx.getStorageSync('schoolName');
    this.setData({
      schoolId: schoolId,
      userId: userId,
      schoolName: schoolName,
    });
    //如果学校id不存在跳转到引导页
    if (!schoolId) {
      var way = '../mycenter/mycenter';
      wx.reLaunch({
        url:`../start/start?tab=${true}&&way=${way}`
      })
    }
    var userPhone = wx.getStorageSync('userPhone');
    var isManager = wx.getStorageSync('isManager');
    var isSender = wx.getStorageSync('isSender');
    var isTeacher = wx.getStorageSync('isTeacher');
    this.setData({
      isManager: isManager,
      isSender: isSender,
      isTeacher: isTeacher,
      userPhone: userPhone
    });
    wx.stopPullDownRefresh();
    wx.hideLoading();
    var that = this;
    wx.getUserInfo({
      success(e) {
        console.log(e)
        if (e.userInfo) {
          that.setData({
            userInfo: e.userInfo
          })
        }
      }
    })
  },
  // 礼券中心
  go_ritual: function() {
    wx.navigateTo({
      url: './ritual/ritual'
    })
  },
  // 我的礼券
  go_rituall: function() {
    wx.navigateTo({
      url: './rituall/rituall'
    })
  },
  // 查看订单 
  order_list: function() {
    wx.navigateTo({
      url: './orderList/orderList'
    })
  },
  // 地址管理
  address: function() {
    wx.navigateTo({
      url: '../address/address'
    })
  },
  // 完善信息
  information: function() {
    wx.navigateTo({
      url: 'information/information'
    })
  },
  // 身份认证
  approve: function() {
    var userPhone = this.data.userPhone;
    if (userPhone) {
      wx.navigateTo({
        url: 'approve/approve'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '亲，请先绑定手机号',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: 'information/information'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },
  // 问题反馈
  feedback: function() {
    wx.navigateTo({
      url: 'feedback/feedback'
    })
  },
  // 分享二维码
  code: function() {
    wx.navigateTo({
      url: 'qr_code/qr_code'
    })
  },
  // 管理入口
  admin: function() {
    wx.navigateTo({
      url: '../admin/admin'
    })
  },
  // 我的推荐
  recommend: function() {
    wx.navigateTo({
      url: 'recommend/recommend'
    })
  },
  // 任务大厅
  grab: function() {
    wx.navigateTo({
      url: '../task_hall/task_hall/index'
    })
  },
  // 公示公告
  notice: function() {
    wx.navigateTo({
      url: 'notice/notice'
    })
  },
  // 关于我们
  about: function() {
    wx.navigateTo({
      url: 'about/about'
    })
  },
  //下拉刷新
  onPullDownRefresh() {
    this.onShow();
  }
})