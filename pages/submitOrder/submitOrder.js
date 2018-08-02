// pages/submitOrder/submitOrder.js
var app = getApp();
Page({

  data: {
    //遮罩层
    mask: { 
      opacity: 0,
      display: 'none'
    },
    //弹窗
    returnDeposit: {
      translateY: 'translateY(-1500px)',
      opacity: 1
    },
    vou_show: false, //优惠券弹框显示
    insurance: 1, //保险选择开关
    address: '', //地址
    shop_goods: [], //超市
    water: [], //水
    dining: [], //餐饮
    type: '', //订单类型
    orderIds: [], //订单ID
    shop_cart: [], // 超市 购物车
    water_cart: [], // 水 购物车
    orderRemarks: '备注',
    choose: 0, //选择优惠券
    vou: [], //优惠券
    vid: '', //优惠券id
    choose_vou: '优惠券名称', //优惠券显示
    total: '', //最终总价
    o_price: '', //不使用优惠券总价
    freight: '', //运费
    isTeacher: '', //是否是教师
    fristOrder: '', //是否首单
    basisPrice1:'', //超市餐饮基价
    basisPrice2: '',  //水基价
    basisPrice3: '',  //水加价
    firstCut:0
  },
  // 分享
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  // 显示优惠券弹框
  vouShow() {
    this.setData({
      vou_show: true
    })
  },
  // 隐藏优惠券弹框
  shut() {
    this.setData({
      vou_show: false
    })
  },
  // 写入备注 
  textarea(e) {
    console.log(e)
    this.setData({
      orderRemarks: e.detail.value
    })
  },
  // 可用优惠券
  vous(userId) {
    var that = this;
    wx.request({
      url: app.globalData.api + 'voucher/voucher',
      method: 'post',
      data: { userId: userId },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        var vou = res.data.nouses;
        var status = res.data.status;
        if (status == 1) {
          var orderNum = res.data.orderNum * 1;
          if (orderNum < 1) {
            that.setData({
              fristOrder: 1
            });
            that.firstCut();
          }
          that.setData({
            vou: vou
          });
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000,
            icon: 'none'
          });
        }
        //endInitData
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
  // 选择优惠券
  choose(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      choose: index
    })
    var firstCut = parseFloat(this.data.firstCut);
    var price = parseFloat(this.data.o_price);
    var freight = parseFloat(this.data.freight);
    console.log(price)
    var vou = this.data.vou;
    if (index != 0) {
      var price2 = parseFloat(vou[index - 1].amount);
      if (price2 > freight) {
        price2 = freight;
      }
      console.log(price2)
      var total = price - price2 + freight - firstCut;
      total = total.toFixed(2);
      console.log(total)
      this.setData({
        total: total,
        vid: vou[index - 1].vid,
        choose_vou: vou[index - 1].title
      })
    } else {
      var total2 = price * 1 + this.data.freight * 1 - firstCut;
      total2 = total2.toFixed(2);
      this.setData({
        total: total2,
        vid: 0,
        choose_vou: '不使用优惠券'
      })
    }
    console.log(this.data.total)
  },
  // 首单减免费用
  firstCut() {
    console.log(this.data.freight)
    var freight = parseFloat(this.data.freight);
    console.log(freight)
    var type = this.data.type;
    var basisPrice1 = parseFloat(this.data.basisPrice1); //超市餐饮基价
    var basisPrice2 = parseFloat(this.data.basisPrice2); //水基价
    var basisPrice3 = parseFloat(this.data.basisPrice3);  //水加价
    var shop_goods = wx.getStorageSync('shop_buy');
    var water = wx.getStorageSync('water_buy');
    var total = parseFloat(this.data.total);
    console.log(total)
    var firstCut;
    if (type==0){
      if (shop_goods){
        firstCut = basisPrice1;
      } else {
        firstCut = water[0].freight;
      }
    } else if (type == 1 || type == 3) {
      firstCut = basisPrice1;
    } else if (type == 2) {
      firstCut =  water.freight;
    }
    console.log(firstCut)
    total = total - parseFloat(firstCut);
    total = total.toFixed(2);
    this.setData({
      firstCut: firstCut,
      total: total
    })
  },
  onLoad: function(options) { // type 1 超市； 2 水；  3餐饮 ; 0 购物车
    console.log(options)
    wx.showLoading({
      title: '加载中',
    })
    var isTeacher = wx.getStorageSync('isTeacher');
    var schoolId = wx.getStorageSync('schoolId');
    var userId = wx.getStorageSync('userId');
    var schoolName = wx.getStorageSync('schoolName');
    

    var type = options.type;
    var o_price = options.total;
    this.setData({
      isTeacher: isTeacher,
      schoolId: schoolId,
      userId: userId,
      type: type,
      o_price: o_price,
      schoolName: schoolName
    })
    console.log(options)

    wx.request({
      url: app.globalData.api + 'common/sysConfig',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        adType: '',
      },
      success: res => {
        console.log(res)
        var data = res.data;
        var status = data.status;
        wx.hideLoading();
        if (status == 1) {
          data = data.data;
          this.setData({
            basisPrice1: data[1].goodsBaseMoney.fieldValue,
            basisPrice2: data[1].waterBaseMoney.fieldValue,
            basisPrice3: data[1].type1_water.fieldValue,
          })
          if (type == 1 || type == 3) {
            var basisPrice = parseFloat(data[1].goodsBaseMoney.fieldValue);
            if (isTeacher == 1) {
              basisPrice = 0;
            }
            var total = parseFloat(o_price) + basisPrice;
            basisPrice = basisPrice.toFixed(2);
            total = total.toFixed(2);
            this.setData({
              freight: basisPrice,
              total: total
            })
          }

          if (type == 2) {
            console.log(o_price)
            var water_buy = wx.getStorageSync('water_buy');
            var num = water_buy.num;
            var freight = water_buy.freight * 1 * num;
            if (isTeacher == 1) {
              freight = 0;
            }
            console.log(freight)
            var total = parseFloat(o_price) + freight;
            freight = freight.toFixed(2);
            total = total.toFixed(2);
            console.log(freight)
            console.log(total)
            this.setData({
              freight: freight,
              total: total
            })
          }

          if (type == 0) {
            var water_buy = wx.getStorageSync('water_buy');
            var shop_buy = wx.getStorageSync('shop_buy');
            var len = water_buy.length;
            var total = parseFloat(o_price);
            var freight = 0;
            if (water_buy){
              for (var i = 0; i < len; i++) {
                var w_num = water_buy[i].num;
                var w_freight = water_buy[i].freight * 1 * w_num;
                freight += w_freight;
                console.log(freight);
              }
            }
            
            var basisPrice = parseFloat(data[1].goodsBaseMoney.fieldValue);
            if (shop_buy){
              freight += basisPrice;
              console.log(freight)
            }
            console.log(freight)

            if (isTeacher == 1) {
              freight = 0;
            }
            total = total + freight;
            freight = freight.toFixed(2);
            total = total.toFixed(2);
            console.log(freight)
            this.setData({
              freight: freight,
              total: total
            })
          }

          if (isTeacher != 1) {
            this.vous(userId);
          }
        } else {
          wx.showToast({
            title: data.msg,
            duration: 2000,
            icon: 'none'
          });
        }
      },
      fail: function() {
        wx.hideLoading();
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      }
    })

    if (type == 0) {
      var shop_goods = wx.getStorageSync('shop_buy');

      if (shop_goods) {
        this.setData({
          shop_goods: shop_goods
        })
      }
      var water = wx.getStorageSync('water_buy');
      if (water) {
        this.setData({
          water: water
        })
      }

    }

    if (type == 1) {
      var shop_goods = [];
      var shop_buy = wx.getStorageSync('shop_buy');
      shop_goods.push(shop_buy);
      console.log(shop_goods)
      this.setData({
        shop_goods: shop_goods
      })
    }

    if (type == 2) {
      var water = [];
      var water_buy = wx.getStorageSync('water_buy');
      water.push(water_buy);
      console.log(water_buy)
      this.setData({
        water: water
      })
    }
    if (type == 3) {
      var dining_buy = wx.getStorageSync('dining_buy');
      var dining = dining_buy.val;
      var shopId = dining_buy.shop_id;
      var shopName = dining_buy.shopName;
      this.setData({
        dining: dining,
        shopName: shopName,
        shopId: shopId
      })
    }
  },
  onShow: function(options) {
    var default_address = wx.getStorageSync('default_address');
    if (default_address) {
      this.setData({
        address: default_address
      })
    }
  },
  choose_address() {
    wx.navigateTo({
      url: '../address/address?type=1'
    })
  },
  //选择保险费开关
  switch1Change(e) {
    console.log(e)
    let insurance = e.detail.value == true ? 1 : 0;
    console.log(insurance)
    this.setData({
      insurance: insurance
    })
  },
  //弹窗显示
  bindtapMasks() {
    let mask = this.data.mask,
      returnDeposit = this.data.returnDeposit;
    mask.display = 'block';
    this.setData({ mask });
    mask.opacity = 1;
    returnDeposit.translateY = 'translateY(-350rpx)';
    returnDeposit.opacity = 1;
    this.setData({ mask, returnDeposit });
  },
  //关闭弹窗
  bindtapClose() {
    let mask = this.data.mask,
      returnDeposit = this.data.returnDeposit;
    mask.opacity = 0;
    returnDeposit.opacity = 0;
    this.setData({ mask, returnDeposit });
    setTimeout(() => {
      mask.display = 'none';
      returnDeposit.translateY = 'translateY(-1500px)';
      this.setData({ mask, returnDeposit });
    }, 500);
  },

  // 提交订单
  submitOrders(e) {

    var formId = e.detail.formId;
    var vid = this.data.vid;
    var schoolId = this.data.schoolId;
    var userId = this.data.userId;
    var type = this.data.type;
    var that = this;
    var address = this.data.address;
    if (!address) {
      wx.showToast({
        title: '请添加收货地址',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '提交中',
    })
    console.log(address)
    var orderRemarks = this.data.orderRemarks;
    if (type == 0) {
      var water = this.data.water;
      var shop_goods = this.data.shop_goods;
      console.log(shop_goods)
      var goods = [];
      var len = water.length;
      var len2 = shop_goods.length;
      if (len > 0) {
        for (var i = 0; i < len; i++) {
          var num = water[i].num;
          var goods_item = {
            shopId: water[i].shopId,
            goodsList: [{
              goodsId: water[i].goods_id,
              goodsNum: 1
            }]
          };
          for (var j = 0; j < num; j++) {
            goods.push(goods_item);
          }
        }
      }
      if (len2 > 0) {
        var goods_item2 = {
          shopId: 1,
          goodsList: []
        };
        for (var i = 0; i < len2; i++) {
          goods_item2.goodsList.push({
            goodsId: shop_goods[i].goods_id,
            goodsNum: shop_goods[i].num
          })
        }
        goods.push(goods_item2);
      }
      console.log(goods)
      goods = JSON.stringify(goods);
      wx.request({
        url: app.globalData.api + 'payment/unifiedorder',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          vid: vid,
          formId: formId,
          userId: userId,
          schoolId: schoolId,
          userName: address.userName,
          userPhone: address.userPhone,
          schoolName: that.data.schoolName,
          buildName: address.buildName,
          floorNum: address.floorNum,
          address: address.address,
          goods: goods,
          orderRemarks: orderRemarks
        },
        success(res) {
          console.log(res)
          var status = res.data.status;
          if (status == 1) {
            var orderIds = res.data.data;
            orderIds = JSON.stringify(orderIds);
            that.payment(orderIds);
          } else {
            wx.hideLoading();
            wx.showToast({
              title: res.data.msg,
              duration: 2000,
              icon: 'none'
            });
          }

        },
        fail: function() {
          wx.hideLoading();
          // fail
          wx.showToast({
            title: '网络异常！',
            duration: 2000,
            icon: 'none'
          });
        }
      })
    }
    if (type == 1) {
      var shopId = 1;
      var shop_goods = this.data.shop_goods;
      var goods = [];
      var goods_item = { shopId: 1, goodsList: '' };
      var list = [{
        goodsId: shop_goods[0].goods_id,
        goodsNum: shop_goods[0].num
      }]
      goods_item.goodsList = list;
      console.log(goods_item)
      goods.push(goods_item);
      goods = JSON.stringify(goods);
      console.log(goods)
      wx.request({
        url: app.globalData.api + 'payment/unifiedorder',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          vid: vid,
          formId: formId,
          userId: userId,
          schoolId: schoolId,
          userName: address.userName,
          userPhone: address.userPhone,
          schoolName: that.data.schoolName,
          buildName: address.buildName,
          floorNum: address.floorNum,
          address: address.address,
          goods: goods,
          orderRemarks: orderRemarks
        },
        success(res) {
          console.log(res)
          var status = res.data.status;
          if (status == 1) {
            var orderIds = res.data.data;
            orderIds = JSON.stringify(orderIds);
            that.payment(orderIds);
          } else {
            wx.hideLoading();
            wx.showToast({
              title: res.data.msg,
              duration: 2000,
              icon: 'none'
            });
          }

        },
        fail: function() {
          wx.hideLoading();
          // fail
          wx.showToast({
            title: '网络异常！',
            duration: 2000,
            icon: 'none'
          });
        }
      })
    }
    if (type == 2) {
      var water = this.data.water;
      console.log(water)
      var goods = [];
      var len = water.length;
      for (var i = 0; i < len; i++) {
        var num = water[i].num;
        var goods_item = {
          shopId: water[i].shopId,
          goodsList: [{
            goodsId: water[i].goods_id,
            goodsNum: 1
          }]
        };
        for (var j = 0; j < num; j++) {
          goods.push(goods_item)
        }
      }
      console.log(goods)
      goods = JSON.stringify(goods);
      console.log(goods)
      wx.request({
        url: app.globalData.api + 'payment/unifiedorder',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          formId: formId,
          vid: vid,
          userId: userId,
          schoolId: schoolId,
          userName: address.userName,
          userPhone: address.userPhone,
          schoolName: that.data.schoolName,
          buildName: address.buildName,
          floorNum: address.floorNum,
          address: address.address,
          goods: goods,
          orderRemarks: orderRemarks
        },
        success(res) {
          console.log(res)
          var status = res.data.status;
          if (status == 1) {
            var orderIds = res.data.data;
            orderIds = JSON.stringify(orderIds);
            that.payment(orderIds);
          } else {
            wx.hideLoading();
            wx.showToast({
              title: res.data.msg,
              duration: 2000,
              icon: 'none'
            });
          }

        },
        fail: function() {
          wx.hideLoading();
          // fail
          wx.showToast({
            title: '网络异常！',
            duration: 2000,
            icon: 'none'
          });
        }
      })
    }
    if (type == 3) {
      //goods.push(goods_item);

      var shopId = this.data.shopId;
      var dining = this.data.dining;
      var goods = [];
      var goods_item = {
        shopId: shopId,
        goodsList: ''
      };
      console.log(dining)
      var dining2 = [];
      var len = dining.length;
      for (var i = 0; i < len; i++) {
        dining2.push({
          goodsId: dining[i].id,
          goodsNum: dining[i].num
        })
      }
      goods_item.goodsList = dining2;
      goods.push(goods_item);
      console.log(goods)
      goods = JSON.stringify(goods);
      console.log(goods)
      wx.request({
        url: app.globalData.api + 'payment/unifiedorder',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          formId: formId,
          vid: vid,
          userId: userId,
          schoolId: schoolId,
          userName: address.userName,
          userPhone: address.userPhone,
          schoolName: that.data.schoolName,
          buildName: address.buildName,
          floorNum: address.floorNum,
          address: address.address,
          goods: goods,
          orderRemarks: orderRemarks
        },
        success(res) {
          console.log(res)
          var status = res.data.status;
          if (status == 1) {
            var orderIds = res.data.data;
            orderIds = JSON.stringify(orderIds);
            that.payment(orderIds);
          } else {
            wx.hideLoading();
            wx.showToast({
              title: res.data.msg,
              duration: 2000,
              icon: 'none'
            });
          }

        },
        fail: function() {
          wx.hideLoading();
          // fail
          wx.showToast({
            title: '网络异常！',
            duration: 2000,
            icon: 'none'
          });
        }
      })
    }
  },
  // 支付
  payment(orderIds) {
    var that = this;
    wx.request({
      url: app.globalData.api + 'payment/unifiedpay',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: that.data.userId,
        orderIds: orderIds,
        fristOrder: that.data.fristOrder,
        voucher: that.data.vid
      },
      success(res) {
        wx.hideLoading();
        console.log({
          userId: that.data.userId,
          orderIds: orderIds,
          fristOrder: that.data.fristOrder,
          voucher: that.data.vid
        })
        console.log(res);
        if (res.data.status == 1) {
          var payData = res.data.data.payData;
          console.log(payData)
          wx.requestPayment({
            timeStamp: payData.timeStamp.toString(),
            nonceStr: payData.nonceStr,
            package: payData.package,
            signType: 'MD5',
            paySign: payData.paySign,
            success: function(res) {
              wx.showToast({
                title: "支付成功"
              });
              that.payend();
              setTimeout(function() {
                wx.switchTab({
                  url: '../orderList/orderList'
                })
              }, 2000)
            },
            fail: function(res) {
              console.log(res)
              console.log({
                timeStamp: payData.timeStamp.toString(),
                nonceStr: payData.nonceStr,
                package: payData.package,
                signType: 'MD5',
                paySign: payData.paySign
              })
              wx.showToast({
                title: '支付失败',
                duration: 3000,
                icon: 'none'
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            duration: 2500,
            icon: 'none'
          });
        }
      },
      fail: function(e) {
        wx.hideLoading();
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      }
    })
  },
  // 支付成功执行
  payend() {
    var type = this.data.type;
    if (type == 0) {
      var water_buy = wx.getStorageSync('water_buy');
      var shop_buy = wx.getStorageSync('shop_buy');
      if (water_buy) {
        this.w_payend();
      }
      if (shop_buy) {
        this.s_payend();
      }
    }
    if (type == 3) {
      var dining_buy = wx.getStorageSync('dining_buy');
      if (dining_buy) {
        this.d_payend();
      }
    }
  },
  //购物车 水支付完成
  w_payend() {
    var water_buy = wx.getStorageSync('water_buy');
    var water_cart = wx.getStorageSync('water_cart');
    // console.log(water_buy)
    // console.log(water_cart)
    if (water_buy && water_cart) {
      var buy_len = water_buy.length;
      var cart_len = water_cart.length;
      var index;
      for (var i = 0; i < buy_len; i++) {
        for (var j = 0; j < cart_len; j++) {
          if (water_cart[j].choose == water_buy[i].choose && water_cart[j].choose2 == water_buy[i].choose2 && water_cart[j].goods_id == water_buy[i].goods_id) {
            water_cart.splice(j, 1);
            cart_len--;
          }
        }
      }
    }
    //console.log(water_cart)
    wx.setStorageSync('water_cart', water_cart)
  },
  //购物车 超市支付完成
  s_payend() {
    var shop_buy = wx.getStorageSync('shop_buy');
    var shop_cart = wx.getStorageSync('shop_cart');
    console.log(shop_buy)
    console.log(shop_cart)
    if (shop_buy && shop_cart) {
      var buy_len = shop_buy.length;
      var cart_len = shop_cart.length;
      var index;
      for (var i = 0; i < buy_len; i++) {
        for (var j = 0; j < cart_len; j++) {
          if (shop_cart[j].goods_id == shop_buy[i].goods_id) {
            shop_cart.splice(j, 1);
            cart_len--;
          }
        }
      }
    }
    //console.log(shop_cart) 
    wx.setStorageSync('shop_cart', shop_cart)
  },
  //购物车 超市支付完成
  d_payend() {
    var dining_buy = wx.getStorageSync('dining_buy');
    var dining_shop_cart = wx.getStorageSync('dining_shop_cart');
    console.log(shop_buy)
    console.log(shop_cart)
    if (shop_buy && shop_cart) {
      var len = dining_shop_cart.length;
      for (var i = 0; i < len; i++) {
        if (dining_shop_cart[i].shop_id == dining_buy.shop_id) {
          dining_shop_cart.splice(j, 1);
          len = i;
        }
      }
    }
    //console.log(shop_cart) 
    wx.setStorageSync('dining_shop_cart', dining_shop_cart)
  }
})