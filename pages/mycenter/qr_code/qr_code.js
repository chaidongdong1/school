// pages/user/qr_code.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: '0.00',
    userimg: '',
    userId:'',  //用户id
    rqcode: '',   //用户二维码
    baseUrl: app.globalData.baseUrlData, //图片路径
    showLoading:true,
    datas:''
  },
 

  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.show();
  },
  show: function () {
    var that = this;
    var userId = wx.getStorageSync('userId');
    var schoolId = wx.getStorageSync('schoolId');
    userId = wx.getStorageSync('userId');
    console.log(schoolId)
    //如果学校id不存在跳转到引导页
    if (!schoolId) {
      console.log('1111111111')
      var way = '../mycenter/qr_code/qr_code';
      wx.reLaunch({
        url: '../../start/start?way=' + way
      })
    }
    // 获取用户分享二维码及用户余额
    wx.request({
      url: app.globalData.api + 'user/user_info',
      method: 'post',
      data: {
        userId: userId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          showLoading: false
        })
        if (res.data.status == 1) {
          that.setData({
            rqcode: res.data.data.rqcode,
            datas:res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      },
      fail(){
        that.setData({
          showLoading:false
        })
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
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
  }
})