// pages/orderList/orderList.js
const app = getApp();
var userId;
Page({

  data: {
    datas: [], //订单内容
    listsIndex: 0, //导航下标
    lists: ['now', 'over'], //点击两个导航向后台传的数据
    totalPage: '', //总页数
    currPage: 1, //当前页数
    total: '', //进行中订单数量
    total1: '', //已完成订单数量
    baseUrl: app.globalData.baseUrl, //图片路径
    showLoading:true,  //加载中动画
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + userId
    }
  },
  onShow: function() {
    var schoolId = wx.getStorageSync('schoolId');
    userId = wx.getStorageSync('userId');
    //如果学校id不存在跳转到引导页
    if (!schoolId) {
      var way = '../orderList/orderList';
      wx.reLaunch({
        url:`../start/start?tab=${true}&&way=${way}`
      })
    }
    //进入页面，让页面回滚到顶部
    this.setData({
      listsIndex: 0
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
    this.getList();
    this.getList1();

  },
  //订单进行中的接口数据
  getList(e) {
    console.log(e);
    //用户订单接口
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}order/orderList`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        userId: userId,
        mark: this.data.lists[this.data.listsIndex],
        page: e == 0 ? this.data.currPage : 1,
      },
      success: res => {
        wx.stopPullDownRefresh();
        this.setData({
          showLoading:false
        });
        console.log({
          userId: userId,
          mark: this.data.lists[this.data.listsIndex],
          page: e == 0 ? this.data.currPage : 1,
        });
        res.data.root.map(item =>{
          item.totalMoney = (item.totalMoney*1 + item.deliverMoney*1).toFixed(2);
          return item;
        });
        console.log(res);
        if (e == 0) {
          console.log("分页数据")
          this.setData({
            datas: this.data.datas.concat(res.data.root),
            totalPage: res.data.totalPage,
            currPage: res.data.currPage,
          });
        } else {
          console.log("初次进入页面的数据")
          this.setData({
            datas: res.data.root,
            totalPage: res.data.totalPage,
            currPage: 1,
          });
        }
        if (this.data.listsIndex == 0) {
          this.setData({
            total: res.data.total
          });
        } else {
          this.setData({
            total1: res.data.total
          });
        }
        console.log(this.data.datas);
      }
    });
  },
  //进行中订单数量接口
  getList1() {
    //用户订单接口
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}order/orderList`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        userId: userId,
        mark: 'over'
      },
      success: res => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        console.log(res);
        this.setData({
          total1: res.data.total,
          showLoading:false
        });
        console.log(this.data.total1);
      }
    });
  },
  //订单导航
  bindtapDao(e) {
    console.log(e)
    this.setData({
      listsIndex: e.currentTarget.dataset.index,
      datas: [], //订单内容
      totalPage: '', //总页数
      currPage: 1, //当前页数
    });
    console.log(this.data.listsIndex);
    this.getList();
  },
  //点击超市商品跳转超市
  bindtapTiao(e) {
    let shopType = e.currentTarget.dataset.shoptype;
    console.log(shopType);
    if (shopType == 1) {
      wx.navigateTo({
        url: '../catering/catering'
      });
    } else if (shopType == 2) {
      wx.navigateTo({
        url: '../water/water'
      });
    } else if (shopType == 3) {
      wx.navigateTo({
        url: '../meal/index/index'
      });
    } else {
      wx.navigateTo({
        url: '../courier/courier'
      });
    }
  },
  //点击商品跳转商品详情页
  bindtapShop(e) {
    let shop = e.currentTarget.dataset.shop;
    console.log(shop);
    wx.navigateTo({
      url: `orderDetails/orderDetails?shop=${shop}`
    });
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
              userId: userId
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
                  this.getList();
                  this.getList1();
                }, 500);
              } else {
                wx.showToast({
                  title: orderStatus == 0 ? '订单取消失败' : '订单删除失败',
                  image: '../../image/warning.png',
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
                this.onShow();
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
      url: `orderRefund/orderRefund?goodsId=${goodsId}`
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
              userId: userId
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
                  this.getList();
                  this.getList1();
                }, 500);
              } else {
                wx.showToast({
                  title: '确认收货失败',
                  image: '../../image/warning.png',
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
    var data = this.data.datas;
    console.log(data)
    let index = e.currentTarget.dataset.index;
    var item = data[index];
    console.log(item);
    var orderId = item.orderId;
    if (item.goodsList) {
      var len = item.goodsList.length;
      if (len == 1) {
        var goodsId = item.goodsList[0].goodsId;
        wx.navigateTo({
          url: `./evaluate/evaluate?orderId=${orderId}`
        });
      } else {
        wx.navigateTo({
          url: `./goodsList/goodsList?orderId=${orderId}`
        });
      }
    } else {
      wx.navigateTo({
        url: `./evaluate/evaluate?orderId=${orderId}`
      });
    }
  },
  //上拉加载
  onReachBottom: function() {
    if (this.data.currPage < this.data.totalPage) {
      this.setData({
        currPage: this.data.currPage * 1 + 1
      });
      console.log(this.data.currPage);
      this.getList(0);
    } else {
      console.log("已经是最后一页");
    }
  },
  //下拉刷新
  onPullDownRefresh() {
    this.onShow();
  },
});