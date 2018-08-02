import WxParse from '../../../wxParse/wxParse.js';
var app = getApp();
Page({

  data: {
    //遮罩层
    mask: {
      opacity: 0,
      display: 'none',
    },
    //弹窗
    returnDeposit: {
      translateY: 'translateY(-1500px)',
      opacity: 1
    },
    insurance: 0,   //保险选择开关
    address: '',
    textarea:'',  //备注
    courier_buy: '',  //快递参数
    oinsurancePrice: '0.00', //保险总费用
    insurancePrice: '0.00', //保险费用
    total: '0.00',  //除保险外总价
    money: '',   //总价
    vou: [], //优惠券
    vou_show: false,  //优惠券弹框显示
    vid: '',   //优惠券id
    fristOrder: '',  //是否首单
    u_price:'', //优惠券减免金额
    baoxian:'',   //保险介绍
    firstCut:0
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
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
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
      success: function (res) {
        var vou = res.data.nouses;
        var status = res.data.status;
        if (status == 1) {
          var orderNum = res.data.orderNum * 1;
          if (orderNum < 1) {
            that.firstCut();
            that.setData({
              fristOrder: 1
            });
          }
          that.setData({
            vou: vou,
          });
          console.log(that.data.vou)
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000,
            icon: 'none'
          });
        }
        //endInitData
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      },
      complete: function () {
        that.setData({
          showLoading: false
        })
      }
    });
  },
  // 首单减免费用
  firstCut() {
    var total = this.data.total;
    this.setData({
      money: 0,
      firstCut: total
    })
  },
  // 选择优惠券
  choose(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      choose: index
    })
    var insurance = this.data.insurance;
    console.log(insurance)
    var total = parseFloat(this.data.total);
    var insurancePrice = parseFloat(this.data.insurancePrice);
    if(insurance==0){
      insurancePrice = 0;
    }
    var vou = this.data.vou;
    if (index != 0) {
      var price2 = parseFloat(vou[index - 1].amount);
      if (price2 > total) {
        price2 = total;
      }
      var price = insurancePrice + total;
      var money = price - price2 ;
      money = money.toFixed(2);
      //console.log(money)
      this.setData({
        money: money,
        vid: vou[index - 1].vid,
        choose_vou: vou[index - 1].title,
        u_price:price2
      })
    } else {

      var money = insurancePrice + total;
      money = money.toFixed(2);
      this.setData({
        money: money,
        vid: 0,
        choose_vou: '不使用优惠券',
        u_price:0
      })
    }
  },
  onLoad: function (options) {  // type 1 超市； 2 水；  3餐饮 ; 0 购物车
    console.log(options)
    this.setData({
      oinsurancePrice: options.insurance,
      total: options.total,
      money: options.total
    });
    wx.request({
      method: 'POST',
      url:`${app.globalData.api}common/article`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        articleId:19
      },
      success:res=>{
        console.log(res);
        this.setData({
          baoxian:res.data.data[0]
        });
        let article = res.data.data[0].articleContent;
        article = article.replace(/&amp;nbsp;/g, ' ');
        WxParse.wxParse('article', 'html', article, this, 5);
      }
    });
  },
  onShow: function (options) {
    var isTeacher = wx.getStorageSync('isTeacher');
    var schoolId = wx.getStorageSync('schoolId');
    var schoolName = wx.getStorageSync('schoolName');
    var userId = wx.getStorageSync('userId');
    if (isTeacher!=1){
      this.vous(userId);
    }else {
      this.setData({
        money:0
      })
      console.log(this.data.total)
    }
    this.setData({
      schoolId: schoolId,
      userId: userId,
      schoolName: schoolName,
      isTeacher: isTeacher
    })

    var courier_buy = wx.getStorageSync('courier_buy');
    this.setData({
      courier_buy: courier_buy
    })
    var address = courier_buy.send_info;
    var take_info = courier_buy.take_info;
    if (address) {
      this.setData({
        take_info: take_info,
        address: address,
        textarea: courier_buy.textarea
      })
    }
  },
  // 写入备注 
  textarea(e) {
    this.setData({
      textarea: e.detail.value
    })
  },
  choose_address() {
    wx.navigateTo({
      url: '../../address/address?type=1'
    })
  },
  //选择保险费开关
  switchChange(e) {
    console.log(e)
    let insurance = e.detail.value == true ? 1 : 0;
    var oinsurancePrice = this.data.oinsurancePrice; 
    var u_price = this.data.u_price;
    if (!u_price){
      u_price = 0;
    }
    var total = this.data.total;
    console.log(insurance)
    // console.log(total)
    // console.log(oinsurancePrice)
    // console.log(u_price)
    var firstCut = parseFloat(this.data.firstCut);
    if (insurance==1){
      var money = parseFloat(total) + parseFloat(oinsurancePrice) - parseFloat(u_price) - firstCut;
      money = money.toFixed(2);
    }else{
      var money = parseFloat(total) - parseFloat(u_price) - firstCut;
      money = money.toFixed(2);
    }
    this.setData({
      insurancePrice: oinsurancePrice,
      money:money,
      insurance:insurance
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
  submitOrders(e) {
    var formId = e.detail.formId;
    wx.showLoading({
      title: '提交中',
    })
    var schoolName = wx.getStorageSync('schoolName');
    var type = this.data.type;
    var that = this;
    var courier_buy = this.data.courier_buy;
    var address = this.data.address;
    var take_info = courier_buy.take_info;
    var insurance = this.data.insurance;
    console.log(address)
    console.log(courier_buy)
    wx.request({
      url: app.globalData.api + 'payment/unifiedorder',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        formId: formId,
        userId: that.data.userId,
        schoolId: that.data.schoolId,
        userName: address.name,
        userPhone: address.tel,
        schoolName: schoolName,
        buildName: address.builde,
        floorNum: address.floor,
        address: address.address,
        orderRemarks: that.data.textarea,
        deliverAddress: take_info.address,
        deliverName: take_info.courier,
        packageName: take_info.name,
        packagePhone: take_info.tel,
        packageCode: take_info.code,
        sendTime: courier_buy.time.fieldName,
        packageWeight: courier_buy.weight.fieldName,
        isProtect: insurance
      },
      success(res) {
        console.log(res)
        var status = res.data.status;
        if (status == 1) {
          var orderIds = res.data.data;
          orderIds = JSON.stringify(orderIds);
          wx.request({
            url: app.globalData.api + 'payment/unifiedpay',
            method: 'POST',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              userId: that.data.userId,
              orderIds: orderIds,
              fristOrder: that.data.fristOrder
            },
            success(res) {
              wx.hideLoading();
              if (res.data.status == 1) {
                var payData = res.data.data.payData;
                console.log(payData)
                wx.requestPayment({
                  timeStamp: payData.timeStamp.toString(),
                  nonceStr: payData.nonceStr,
                  package: payData.package,
                  signType: 'MD5',
                  paySign: payData.paySign,
                  success: function (res) {
                    wx.showToast({
                      title: "支付成功!"
                    });
                    setTimeout(function () {
                      wx.switchTab({
                        url: '../../orderList/orderList'
                      })
                    }, 2000)
                  },
                  fail: function (res) {
                    console.log(res)
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
            fail: function () {
              wx.hideLoading();
              // fail
              wx.showToast({
                title: '网络异常！',
                duration: 2000,
                icon: 'none'
              });
            }
          })
        } else {
          wx.showToast({
            title: data.data.msg,
            duration: 2000,
            icon: 'none'
          });
        }

      },
      fail: function () {
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
})