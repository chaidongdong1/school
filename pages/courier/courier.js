// pages/courier/courier.js
var app = getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: { 
    take_info: '',
    send_info: '',
    choose1: 0, //时间选择
    choose2: 0,  //公斤选择
    time:[], //选择时间
    weight: [],  //选择重量
    textarea:'',
    total: '0.00',  //总价
    basisPrice:'0.00',  //基础价
    weightPrice: '0.00',
    timePrice: '0.00',
    insurance:'0.00' //保险费用
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/courier/courier?scene=' + app.globalData.userId
    }
  },
  // 选择送达时间
  choose1(e){
    var index = e.currentTarget.dataset.index;
    var basisPrice = this.data.basisPrice;
    var weightPrice = this.data.weightPrice;
    var time = this.data.time;
    var timePrice = time[index].fieldValue;
    var total = parseFloat(basisPrice) + parseFloat(weightPrice) + parseFloat(timePrice) ;
    total = total.toFixed(2);
    this.setData({
      choose1: index,
      total: total,
      timePrice: timePrice
    })
  },
  // 预估重量
  choose2(e) {
    var index = e.currentTarget.dataset.index;
    var basisPrice = this.data.basisPrice;
    var timePrice = this.data.timePrice;
    var weight = this.data.weight;
    var weightPrice = weight[index].fieldValue;
    var total = parseFloat(basisPrice) + parseFloat(weightPrice) + parseFloat(timePrice);
    total = total.toFixed(2);
    this.setData({
      choose2: index,
      total: total,
      weightPrice: weightPrice
    })
  },
  // 备注信息
  textarea(e){
    var val = e.detail.value;
    this.setData({
      textarea:val
    })
  },
  // 提交
  submit() {
    var userPhone = wx.getStorageSync('userPhone');
    if (!userPhone) {
      wx.showModal({
        title: '提示',
        content: '请绑定手机号',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '../mycenter/information/information'
            })
          } else if (res.cancel) {

          }
        }
      })

      return
    } else {

      var choose1 = this.data.choose1; 
      var choose2 = this.data.choose2;
      var take_info = this.data.take_info;
      var send_info = this.data.send_info;
      var textarea = this.data.textarea;
      if (!take_info) {
        wx.showToast({
          title: '请填写取件地址',
          icon: 'none'
        })
        return
      }
      if (!send_info) {
        wx.showToast({
          title: '请填写送件地址',
          icon: 'none'
        })
        return
      }
      if (choose1 == 0) {
        wx.showToast({
          title: '请选择送达时间',
          icon: 'none'
        })
        return
      }
      if (choose2 == 0) {
        wx.showToast({
          title: '请预估重量',
          icon: 'none'
        })
        return
      } 
      var total = this.data.total;
      var insurance = this.data.insurance;
      var weight = this.data.weight;
      var time = this.data.time;
      var courier_buy = {
        time: time[choose1],
        weight: weight[choose2], 
        take_info: take_info,
        send_info: send_info,
        textarea: textarea
      }
      wx.setStorageSync('courier_buy', courier_buy);
      wx.navigateTo({
        url: `./submit/submit?insurance=${insurance}&total=${total}`
      })
    }
  },
  onLoad: function (options) {
    var schoolId = wx.getStorageSync('schoolId');
    //如果学校id不存在跳转到引导页
    if (!schoolId && !options.scene) {
      console.log('1111')
      wx.reLaunch({
        url: '../start/start?way=../courier/courier'
      })
    }
    //如果学校id不存在跳转到引导页
    if (!schoolId && options.scene) {
      console.log('222222')
      wx.reLaunch({
        url: '../start/start?scene=' + options.scene + '&way=../courier/courier'
      })
    }
    var schoolName = wx.getStorageSync('schoolName');
    var userId = wx.getStorageSync('userId');
    this.setData({
      schoolId: schoolId,
      userId: userId,
      schoolName: schoolName
    })
    wx.removeStorageSync('take_info');
    wx.removeStorageSync('send_info');
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
        if (status == 1) {
          data = data.data;
          var basisPrice = data[1].deliverBaseMoney.fieldValue;
          var insurance = data[1].protectMoney.fieldValue;

          basisPrice = parseFloat(basisPrice).toFixed(2);
          var time = data[2];
          var weight = data[3];
          this.setData({
            basisPrice: basisPrice,
            total: basisPrice,
            time: time,
            weight: weight,
            insurance: insurance
          })
        } else {
          wx.showToast({
            title: data.msg,
            duration: 2000,
            icon: 'none'
          });
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      }
    })
  }, 
  onShow: function () {
    
    // // 取件信息
    var take_info = wx.getStorageSync('take_info');
    // //console.log(take_info)
    if (take_info){
      this.setData({
        take_info: take_info
      })
    }
    // // 收件信息
    var send_info = wx.getStorageSync('send_info');
    // //console.log(send_info)
    if (send_info) {
      this.setData({
        send_info: send_info
      })
    }

    
  },
  // 选择取件地址
  take: function () {
    wx.navigateTo({
      url: 'perfect/perfect'
    })
  },
  // 选择收件地址
  send: function () {
    wx.navigateTo({
      url: 'send_where/send_where'
    })
  }
})