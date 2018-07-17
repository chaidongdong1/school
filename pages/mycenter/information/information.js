// pages/information/information.js
const app = getApp();
Page({

  data: {
    // array: ['请选择校区', '金水区', '龙子湖校区', '华南城校区'],
    // index: 0,
    showModal: false, //判断授权弹窗是否显示
    name: '', //真实姓名
    // number: '', //手机号
    code: '', //验证码
  },
  onLoad: function(options) {
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
    let number = e.detail.value;
    this.setData({
      number: number
    });
  },
  //输入验证码
  bindtapCode(e) {
    let code = e.detail.value;
    this.setData({
      code: code
    });
  },
  //提交信息
  bindButton() {
    if (!this.data.number) {
      wx.showToast({
        title: '请填写手机号',
        image: '../../../image/warning.png',
        duration: 1500
      });
    } else if (!this.data.code) {
      wx.showToast({
        title: '请填写验证码',
        image: '../../../image/warning.png',
        duration: 1500
      });
    } else {
      wx.showLoading({
        title: '加载中',
      });
      wx.request({
        method: 'POST',
        url: `${app.globalData.api}user/mobile`,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          mobile: this.data.number,
          userId: app.globalData.userId,
          passcode: this.data.code,
          // trueName: this.data.name
        },
        success: res => {
          console.log(res);
          if (res.msg == 1) {
            wx.showToast({
              title: '信息完善成功',
              icon: 'success',
              duration: 1500
            });
          } else {
            wx.showToast({
              title: '验证码填写错误',
              image: '../../../image/warning.png',
              duration: 1500
            });
          }
        }
      });
    }
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
    wx.getUserInfo({
      success: function(res) {
        console.log(res)
        console.log("=======================")
        var userInfo = res.userInfo;
        var nickName = userInfo.nickName;
        var avatarUrl = userInfo.avatarUrl;
        var gender = userInfo.gender; //性别 0：未知、1：男、2：女 
        var province = userInfo.province;
        var city = userInfo.city;
        var country = userInfo.country;
        var signature = res.signature;
        var encryptData = res.encryptData;
        //向后台传用户信息
        wx.request({
          method: 'POST',
          url: `${app.globalData.api}user/modify_info`,
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: {
            id: app.globalData.userId,
            nickName: nickName,
            gender: gender,
            avatarUrl: avatarUrl,
            city: city
          },
          success: res => {
            console.log(res);
            console.log({
              userId: app.globalData.userId,
              nickName: nickName,
              gender: gender,
              avatarUrl: avatarUrl,
              city: city
            })
          }
        });
      },
    });
  },
})