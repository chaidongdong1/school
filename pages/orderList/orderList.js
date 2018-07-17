// pages/orderList/orderList.js
let datas = {
  goods: [{
    goodsId: '120', //订单ID
    goodstype: '1', //订单类型
    goodsStats: '0', //订单状态
    goodsname: '超市商品',
    goodsMoney: '320.00',
    goodsShop: [{
      goodsShopname: "可口可乐精品1",
      goodsShopimage: "/image/shopdetails.jpg",
      goodsShopGui: "500ml",
      goodsShopKou: "原味",
      goodsShopNumber: "3",
      goodsShopMoney: "151.00",
      goodsShopId: "261",
      }, {
      goodsShopname: "可口可乐精品1",
      goodsShopimage: "/image/shopdetails.jpg",
      goodsShopGui: "500ml",
      goodsShopKou: "原味",
      goodsShopNumber: "4",
      goodsShopMoney: "152.00",
      goodsShopId: "262",
      }, {
      goodsShopname: "可口可乐精品1",
      goodsShopimage: "/image/shopdetails.jpg",
      goodsShopGui: "500ml",
      goodsShopKou: "原味",
      goodsShopNumber: "5",
      goodsShopMoney: "153.00",
      goodsShopId: "263",
      }]
    }, {
    goodsId: '121', //订单ID
    goodstype: '2', //订单类型
    goodsStats: '1', //订单状态
    goodsname: '送水订单',
    goodsMoney: '5.00',
    goodsShop: [{
      goodsShopname: "无桶桶装水",
      goodsShopimage: "/image/shui.png",
      goodsShopGui: "无桶",
      goodsShopKou: "4层",
      goodsShopNumber: "3",
      goodsShopMoney: "30.00",
      goodsShopId: "160",
      }]
    }, {
    goodsId: '123', //订单ID
    goodstype: '3', //订单类型
    goodsStats: '2', //订单状态
    goodsname: '快递服务',
    goodsMoney: '3.00',
    goodsShop: [{
      goodsShopname: "申通快递 北门100米",
      goodsShopimage: "/image/kuaidi-01.png",
      goodsShopGui: "柴冬冬",
      goodsShopKou: "1511243235",
      goodsShopMa: "56345",
      goodsShopNumber: "5",
      goodsShopMoney: "3.00",
      goodsShopId: "200",
      }]
    }, {
    goodsId: '124', //订单ID
    goodstype: '4', //订单类型
    goodsStats: '2', //订单状态
    goodsname: '山西刀削面',
    goodsMoney: '30.00',
    goodsShop: [{
      goodsShopname: "刀削面",
      goodsShopimage: "/image/index-shop1.jpg",
      goodsShopGui: "大份",
      goodsShopKou: "微辣",
      goodsShopNumber: "1",
      goodsShopMoney: "15.00",
      goodsShopId: "261",
      }, {
      goodsShopname: "刀削面",
      goodsShopimage: "/image/index-shop1.jpg",
      goodsShopGui: "小份",
      goodsShopKou: "中辣",
      goodsShopNumber: "1",
      goodsShopMoney: "15.00",
      goodsShopId: "262",
      }]
    }],
};
Page({

  data: {
    datas: [], //订单内容
    listsIndex: 0, //导航下标
  },
  onLoad: function(options) {
    this.setData({
      lists: datas.lists
    });
    console.log(this.data.listsIndex);
    wx.showLoading({
      title: '加载中',
    });
    let data1 = datas.goods.filter((item) => { return item.goodsStats != 2; });
    console.log(data1);
    this.setData({
      datas: data1
    });
    setTimeout(function() {
      wx.hideLoading();
    }, 500);
    console.log(this.data.datas);
  },
  //订单导航
  bindtapDao(e) {
    console.log(e)
    this.setData({
      listsIndex: e.currentTarget.dataset.index
    });
    console.log(this.data.listsIndex)
    if (this.data.listsIndex == 1) {
      let data2 = datas.goods.filter((item) => { return item.goodsStats == 2; });
      console.log(data2);
      wx.showLoading({
        title: '加载中',
      });
      this.setData({
        datas: data2
      });
      setTimeout(function() {
        wx.hideLoading();
      }, 500);
    } else {
      wx.showLoading({
        title: '加载中',
      });
      let data1 = datas.goods.filter((item) => { return item.goodsStats != 2; });
      console.log(data1);
      this.setData({
        datas: data1
      });
      setTimeout(function() {
        wx.hideLoading();
      }, 500);
    }
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
        url: '../courier/courier'
      });
    } else {
      wx.navigateTo({
        url: '../meal/index/index'
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
  //取消订单
  bindtapQuxiao(e) {
    let goodsId = e.currentTarget.dataset.goodsid;
    console.log(goodsId);
    wx.showModal({
      title: '温馨提示',
      content: '您是否取消该订单',
      success: function(res) {
        if (res.confirm) {
          wx.showToast({
            title: '订单取消成功',
            icon: 'success',
            duration: 1500
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '订单取消失败',
            image: '../../image/warning.png',
            duration: 1500
          });
        }
      }
    });
  },
  //继续付款
  bindtapFukuan(e){
    let goodsId = e.currentTarget.dataset.goodsid;
  },
  //订单退款
  bindtapTuikuan(e){
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
      content: '您是否确认收货',
      success: function(res) {
        if (res.confirm) {
          wx.showToast({
            title: '订单收货成功',
            icon: 'success',
            duration: 1500
          });
        } else if (res.cancel) {
          wx.showToast({
            title: '订单收货失败',
            image: '../../image/warning.png',
            duration: 1500
          });
        }
      }
    });
  },
  //再来一单
  bindtapXiadan(e) {
    console.log(e);
    let shopType = e.currentTarget.dataset.goodstype;
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
        url: '../courier/courier'
      });
    } else {
      wx.navigateTo({
        url: '../meal/index/index'
      });
    }
  },
  //订单评价
  bindtapPingjia(e) {
    let goodsId = e.currentTarget.dataset.goodsid;
    console.log(goodsId);
    wx.navigateTo({
      url: `../evaluate/evaluate?goodsId=${goodsId}`
    });
  },
});