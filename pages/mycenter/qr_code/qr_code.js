// pages/user/qr_code.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rqcode: '',
    money: '0.00',
    userimg: '',
    //showLoading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.show();
  },
  // 下拉刷新
  
  onShow: function (options) {
    //this.show();
  },
  show: function () {
    var that = this;
    // 获取用户分享二维码及用户余额
    wx.request({
      url: app.data.ceshiUrl + '/api/user/user_info',
      method: 'post',
      data: {
        id: app.data.userId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res)
        if (res.data.status == 1) {
          var money = res.data.data.money;
          money = parseFloat(money).toFixed(2);
          var rqcode = app.data.hostImg + res.data.data.rqcode;
          that.setData({
            rqcode: rqcode,
            money: money
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      },
      complete(){
        that.setData({
          showLoading:false
        })
      }
    })
    // 获取用户头像
    wx.getUserInfo({
      success: function (res) {
        //console.log(res)
        that.setData({
          userimg: res.userInfo.avatarUrl
        })
      },
      fail() {
        //console.log(555)
      }
    })
  },
  my_team(){
    wx.navigateTo({
      url: '../my_team/my_team',
    })
  },
  // 提现
  money_out: function () {
    var that = this;
    var money = parseFloat(that.data.money);
    if (money <= 0) {
      wx.showToast({
        title: '提现金额不能小于0元',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../withdrawal/withdrawal',
      })

    }
  },
  // 分享
  onShareAppMessage: function () {
    return {
      title: '全安智能',
      path: '/pages/index/index?scene=' + app.data.userId
    }
  }
})