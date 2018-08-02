// pages/information/information.js
const app = getApp();
var timer, userId, cons;
Page({

  data: {
    showModal: false, //判断授权弹窗是否显示
    name: '', //真实姓名
    tel: '', //手机号
    code: '', //验证码
    oldTel: '', //获取验证码时的手机号
    time: '获取验证码',
    click: true, //是否可点击
    schoolName: '' //校区名字
  },
  // 分享
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + userId
    }
  },
  onLoad: function(options) {
    cons = options.cons;
    var schoolName = wx.getStorageSync('schoolName');
    var schoolId = wx.getStorageSync('schoolId');
    userId = wx.getStorageSync('userId');
    console.log(schoolId)
    //如果学校id不存在跳转到引导页
    if (!schoolId) {
      console.log('1111111111');
      var way = '../mycenter/information/information';
      wx.reLaunch({
        url: '../../start/start?way=' + way
      });
    }
    this.setData({
      schoolName: schoolName
    });
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}user/user_info`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        userId: userId
      },
      success: res => {
        console.log(res);
        wx.hideLoading();
        if (res.data.data.phone) {
          this.setData({
            tel: res.data.data.phone
          });
          wx.setStorageSync('userPhone', res.data.data.phone);
        }
      }
    });
    //授权弹窗一开始不显示，等于true时才显示
    wx.getSetting({
      success: (res) => {
        console.log(res)
        console.log("------------------------")
        //授权过以后
        if (res.authSetting['scope.userInfo']) {
          this.setData({
            showModal: false
          });
        } else {
          this.setData({
            showModal: true
          });
        }
      }
    });
  },
  //输入真实姓名
  // bindtapName(e) {
  //   let name = e.detail.value;
  //   this.setData({
  //     name: name
  //   });
  // },
  //输入手机号
  bindtapNumber(e) {
    let tel = e.detail.value;
    this.setData({
      tel: tel
    });
  },
  //输入验证码
  bindtapCode(e) {
    let code = e.detail.value;
    this.setData({
      code: code
    });
  },
  // 获取验证码
  getCode() {
    var timing = 90;
    // 验证手机号码
    var tel = this.data.tel;
    var userPhone = wx.getStorageSync('userPhone');
    console.log(userPhone)
    if (userPhone == tel) {
      wx.showToast({
        title: '请更换手机号',
        image: '../../../image/warning.png',
        duration: 1500
      });
      return;
    }
    if (!tel) {
      wx.showToast({
        title: '请填写手机号',
        image: '../../../image/warning.png',
        duration: 1500
      });
      return;
    }
    var verify = /^1\d{10}$/;
    if (!verify.test(tel)) {
      wx.showToast({
        title: '请输入正确的电话号码',
        image: '../../../image/warning.png',
        duration: 1500
      })
      return;
    }
    wx.showToast({
      title: '验证码正在发送中！',
      icon: 'none',
      duration: 1500
    })
    clearInterval(timer);
    this.setData({
      click: false
    });
    timer = setInterval(() => {
      this.setData({
        time: `重新发送${timing}s`
      });
      if (timing == 1) {
        clearInterval(timer);
        this.setData({
          time: '获取验证码',
          click: true
        });
      }
      timing--;
    }, 1000);
    this.setData({
      oldTel: tel
    });
    wx.request({
      url: app.globalData.api + 'user/get_yzm',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        mobile: tel
      },
      success: res => {
        console.log(res)
      },
      fail: function() {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      }
    })
  },
  //提交信息
  bindButton() {
    var tel = this.data.tel;
    if (!tel) {
      wx.showToast({
        title: '请填写手机号',
        image: '../../../image/warning.png',
        duration: 1500
      });
      return;
    }
    var verify = /^1\d{10}$/;
    if (!verify.test(tel)) {
      wx.showToast({
        title: '请输入正确的电话号码',
        image: '../../../image/warning.png',
        duration: 1500
      })
      return;
    }
    // var oldTel = this.data.oldTel;
    // if (oldTel != tel) {
    //   wx.showToast({
    //     title: '手机号码与验证码不匹配',
    //     image: '../../../image/warning.png',
    //     duration: 1500
    //   })
    //   return;
    // }
    if (!this.data.code) {
      wx.showToast({
        title: '请填写验证码',
        image: '../../../image/warning.png',
        duration: 1500
      });
      return;
    }
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}user/mobile`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        mobile: this.data.tel,
        userId: userId,
        passcode: this.data.code,
        // trueName: this.data.name
      },
      success: res => {
        console.log(res);
        wx.hideLoading();
        if (res.data.status == 1) {
          wx.showToast({
            title: '信息完善成功',
            icon: 'success',
            duration: 1500
          });
          wx.setStorageSync('userPhone', this.data.tel);
          setTimeout(() => {
            if (cons) {
              wx.switchTab({
                url: '../../mycenter/mycenter'
              })
            } else {
              wx.navigateBack({
                delta: 1
              })
            }
          });
        } else {
          wx.showToast({
            title: '验证码填写错误',
            image: '../../../image/warning.png',
            duration: 1500
          });
        }
      },
      fail: function() {
        wx.hideLoading();
        wx.showToast({
          title: '网络异常！',
          image: '../../../image/warning.png',
          duration: 1500
        });
      }
    });

  },
  //点击选择校区
  // bindPickerChange(e) {
  //   this.setData({
  //     index: e.detail.value
  //   })
  // },
  //点击授权拒绝后执行
  onGotUserInfo(e) {
    console.log(e)
    console.log("+++++++++++++++++++++++++++++")
    if (e.detail.errMsg == 'getUserInfo:ok') {
      this.authorizationSuccess();
    }
  },
  //点击授权同意后执行
  authorizationSuccess() {
    this.setData({
      showModal: false
    });
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        console.log(res)
        console.log("=======================")
        var userInfo = res.userInfo;
        userInfo.userId = userId;
        that.uploadInfo(userInfo);
      },
    });
  },
})