// pages/mycenter/orderDetails/orderDetails.js
const app = getApp();
let orderId;
Page({

  data: {
    goodsList: '', //商品详情内容
    baseUrl: app.globalData.baseUrl, //图片路径
    orderId: '' //订单id
  },
  // 分享
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  onLoad: function(options) {
    console.log(options);
    orderId = options.orderId;
    //orderId = 38;
    var schoolId = wx.getStorageSync('schoolId');
    var userId = wx.getStorageSync('userId');
    var schoolName = wx.getStorageSync('schoolName');
    this.setData({
      schoolId: schoolId,
      userId: userId,
      schoolName: schoolName,
      orderId: orderId
    })

  },
  onShow() {
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}order/orderInfo`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        remark: 'self',
        orderId: orderId
      },
      success: res => {
        console.log({
          remark: 'self',
          orderId: orderId
        })
        wx.hideLoading();
        console.log(res);
        this.setData({
          goodsList: res.data.data.goodsList
        });
      }
    });
  },
  // 评价
  evalute(e) {
    var goodsList = this.data.goodsList;
    let index = e.currentTarget.dataset.index;
    var orderId = this.data.orderId;
    var goodsId = goodsList[index].id;
    console.log(goodsId)
    wx.navigateTo({
      url: `../../orderList/evaluate/evaluate?orderId=${orderId}&goodsId=${goodsId}`
    });

  }
})