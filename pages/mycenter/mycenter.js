// pages/mycenter/mycenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    graber:true,
    admin:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  onShow: function () {
  
  },
  // 礼券中心
  go_ritual: function () {
    wx.navigateTo({
      url: './ritual/ritual'
    })
  },
  // 我的礼券
  go_rituall: function () {
    wx.navigateTo({
      url: './rituall/rituall'
    })
  },
  // 查看订单 
  order_list: function () {
    wx.navigateTo({
      url: './orderList/orderList'
    })
  },
  // 地址管理
  address: function () {
    wx.navigateTo({
      url: '../address/address'
    })
  },
  // 身份认证
  information: function () {
    wx.navigateTo({
      url: 'information/information'
    })
  },
  // 身份认证
  approve: function () {
    wx.navigateTo({
      url: 'approve/approve'
    })
  },
  // 问题反馈
  feedback: function () {
    wx.navigateTo({
      url: 'feedback/feedback'
    })
  },
  // 分享二维码
  code: function () {
    wx.navigateTo({
      url: 'qr_code/qr_code'
    })
  },
  // 管理入口
  admin: function () {
    wx.navigateTo({
      url: '../admin/admin'
    })
  },
  // 我的推荐
  recommend: function () {
    wx.navigateTo({
      url: 'recommend/recommend'
    })
  },
  // 任务大厅
  grab: function () {
    wx.navigateTo({
      url: '../task_hall/task_hall/index'
    })
  },
  // 公示公告
  notice: function () {
    wx.navigateTo({
      url: 'notice/notice'
    })
  },
  // 关于我们
  about: function () {
    wx.navigateTo({
      url: 'about/about'
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})