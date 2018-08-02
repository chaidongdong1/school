// pages/mycenter/orderDetails/orderDetails.js
const app = getApp();

Page({

  data: {
    datas: '', //详情内容
    baseUrl: app.globalData.baseUrl, //图片路径
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
    let shop = options.shop;
    console.log(shop)
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}order/orderInfo`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        remark: 'manager',
        orderId: shop
      },
      success: res => {
        console.log({
          remark: 'manager',
          orderId: shop
        })
        wx.hideLoading();
        console.log(res);
        this.setData({
          datas: res.data.data
        });
      }
    });
  },
  //跳转订单详情
  // bindXiang(e) {
  //   let goodsid = e.currentTarget.dataset.goodsid;
  //   let ordertype = e.currentTarget.dataset.ordertype;
  //   console.log(goodsid);
  //   console.log(ordertype);
  //   if (ordertype == 0) {
  //     wx.redirectTo({
  //       url: '../../courier/courier'
  //     });
  //   } else if (ordertype == 1) {
  //     wx.redirectTo({
  //       url: `../../catering/shopDetails/shopDetails?goodsid=${goodsid}`
  //     });
  //   } else if (ordertype == 2) {
  //     wx.redirectTo({
  //       url: '../../water/water'
  //     });
  //   } else {
  //     wx.redirectTo({
  //       url: `../../meal/shop/shop?shop_id=${goodsid}`
  //     });
  //   }
  // },
})