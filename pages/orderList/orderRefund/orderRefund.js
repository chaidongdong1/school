// pages/mycenter/orderRefund/orderRefund.js
const app = getApp();
let shop;
Page({

  data: {
    datas: '', //详情内容
    baseUrl: app.globalData.baseUrl, //图片路径
    text: '', //问题反馈输入的内容
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  onLoad: function(options) {
    console.log(options);
    shop = options.goodsId;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}order/orderInfo`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        remark: 'self',
        orderId: shop
      },
      success: res => {
        wx.hideLoading();
        console.log(res);
        this.setData({
          datas: res.data.data
        });
      }
    });
  },
  //问题描述
  bindText(e) {
    console.log(e);
    this.setData({
      text: e.detail.value
    });
  },
  //提交反馈
  bindButton() {
    if (!this.data.text) {
      wx.showToast({
        title: '请输入退款原因',
        image: '../../../image/warning.png',
        duration: 1500
      })
    } else {
      wx.showLoading({
        title: '加载中',
      });
      wx.request({
        method: 'POST',
        url: `${app.globalData.api}order/refund`,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          orderId: shop,
          userId: app.globalData.userId,
          refundReason: this.data.text
        },
        success: res => {
          wx.hideLoading();
          console.log(res);
          if (res.data.status == 1) {
            wx.showToast({
              title: '退款成功',
              icon: 'success',
              duration: 1500
            });
            setTimeout(() => {
              wx.redirectTo({
                url: `../orderDetails/orderDetails?shop=${shop}`
              })
            }, 500);
          } else {
            wx.showToast({
              title: '退款失败,请联系客服处理',
              icon:'',
              duration: 1500
            });
          }
        }
      });
    }
  },
})