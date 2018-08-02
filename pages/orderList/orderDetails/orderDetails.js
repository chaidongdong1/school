// pages/mycenter/orderDetails/orderDetails.js
const app = getApp();

Page({

  data: {
    datas: '', //详情内容
    baseUrl: app.globalData.baseUrl, //图片路径
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
        remark: 'self',
        orderId: shop
      },
      success: res => {
        console.log({
          remark: 'self',
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
  bindXiang(e) {
    let goodsid = e.currentTarget.dataset.goodsid;
    let ordertype = e.currentTarget.dataset.ordertype;
    console.log(goodsid);
    console.log(ordertype);
    if (ordertype == 0) {
      wx.redirectTo({
        url: '../../courier/courier'
      });
    } else if (ordertype == 1) {
      wx.redirectTo({
        url: `../../catering/shopDetails/shopDetails?goodsid=${goodsid}`
      });
    } else if (ordertype == 2) {
      wx.redirectTo({
        url: '../../water/water'
      });
    } else {
      wx.redirectTo({
        url: `../../meal/shop/shop?shop_id=${goodsid}`
      });
    }
  },
  //取消和删除订单
  bindtapQuxiao(e) {
    let goodsId = e.currentTarget.dataset.goodsid;
    let orderStatus = e.currentTarget.dataset.orderstatus;
    console.log(goodsId);
    wx.showModal({
      title: '温馨提示',
      content: orderStatus == 0 ? '您是否要取消该订单' : '您是否要删除该订单',
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          });
          wx.request({
            method: 'POST',
            url: `${app.globalData.api}order/orderDel`,
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              orderId: goodsId,
              userId: app.globalData.userId
            },
            success: res => {
              console.log(res);
              wx.hideLoading();
              if (res.data.status == 1) {
                wx.showToast({
                  title: orderStatus == 0 ? '订单取消成功' : '订单删除成功',
                  icon: 'success',
                  duration: 1500
                });
                setTimeout(() => {
                  this.setData({
                    datas: [], //订单内容
                    totalPage: '', //总页数
                    currPage: 1, //当前页数
                  });
                  wx.switchTab({
                    url: '../../orderList/orderList'
                  })
                }, 500);
              } else {
                wx.showToast({
                  title: orderStatus == 0 ? '订单取消失败' : '订单删除失败',
                  image: '../../../image/warning.png',
                  duration: 1500
                });
              }
            }
          });
        } else if (res.cancel) {
          console.log("用户点击取消")
        }
      }
    });
  },
  //继续付款
  bindtapFukuan(e) {
    let goodsId = e.currentTarget.dataset.goodsid;
    let fristOrder = wx.getStorageSync('fristOrder');
    let userId = wx.getStorageSync('userId');
    console.log(goodsId)
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}payment/unifiedpay`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        userId: userId,
        orderIds: '[' + goodsId + ']',
        fristOrder: !fristOrder ? '' : '1'
      },
      success: res => {
        console.log(res);
        console.log({
          userId: userId,
          orderIds: '[' + goodsId + ']',
          fristOrder: !fristOrder ? '' : '1'
        });
        if (res.data.status == 1) {}
        wx.requestPayment({
          timeStamp: res.data.data.payData.timeStamp.toString(),
          nonceStr: res.data.data.payData.nonceStr,
          paySign: res.data.data.payData.paySign,
          package: res.data.data.payData.package,
          signType: 'MD5',
          success: res => {
            console.log(res);
            if (res.errMsg == 'requestPayment:ok') {
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 1500
              });
              setTimeout(() => {
                wx.switchTab({
                  url: '../../orderList/orderList'
                })
              }, 500);
            } else {
              wx.showToast({
                title: '网络异常',
                image: '../../image/warning.png',
                duration: 1500
              });
            }
          },
          fail: res => {
            console.log(res)
            if (res.errMsg == 'requestPayment:fail cancel') {
              wx.showToast({
                title: '取消支付',
                image: '../../image/warning.png',
                duration: 1500
              });
            }
          }
        })
      }
    });
  },
  //订单退款
  bindtapTuikuan(e) {
    let goodsId = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: `../orderRefund/orderRefund?goodsId=${goodsId}`
    });
  },
  //确认收货
  bindtapQueren(e) {
    let goodsId = e.currentTarget.dataset.goodsid;
    console.log(goodsId);
    wx.showModal({
      title: '温馨提示',
      content: '您是否确认收货该商品',
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '收货中',
          });
          wx.request({
            method: 'POST',
            url: `${app.globalData.api}order/orderConf`,
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              orderId: goodsId,
              userId: app.globalData.userId
            },
            success: res => {
              console.log(res);
              wx.hideLoading();
              if (res.data.status == 1) {
                wx.showToast({
                  title: '确认收货成功',
                  icon: 'success',
                  duration: 1500
                });
                setTimeout(() => {
                  this.setData({
                    datas: [], //订单内容
                    totalPage: '', //总页数
                    currPage: 1, //当前页数
                  });
                  wx.switchTab({
                    url: '../../orderList/orderList'
                  });
                }, 500);
              } else {
                wx.showToast({
                  title: '确认收货失败',
                  image: '../../../image/warning.png',
                  duration: 1500
                });
              }
            }
          });
        } else if (res.cancel) {
          console.log("用户点击取消")
        }
      }
    });
  },
  //订单评价
  bindtapPingjia(e) {
    let goodsId = e.currentTarget.dataset.goodsid;
    console.log(goodsId);
    console.log(this.data.datas)
    let item = this.data.datas;
    var orderId = item.orderId;
    if (item.goodsList) {
      var len = item.goodsList.length;
      if (len == 1) {
        var goodsIds = item.goodsList[0].goodsId;
        wx.navigateTo({
          url: `../../orderList/evaluate/evaluate?orderId=${orderId}`
        });
      } else {
        wx.navigateTo({
          url: `../../orderList/goodsList/goodsList?orderId=${orderId}`
        });
      }
    } else {
      wx.navigateTo({
        url: `../../orderList/evaluate/evaluate?orderId=${orderId}`
      });
    }
  },
})