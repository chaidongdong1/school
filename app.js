//app.js
const updateManager = wx.getUpdateManager();
App({
  onLaunch: function() {
    this.updata();

    var that = this;
    //登陆获取userId  
    wx.login({
      success: function(res) {
        console.log(res);
        if (res.code) {
          wx.request({
            method: 'POST',
            url: `${that.globalData.api}user/login`,
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              code: res.code
            },
            success: res => {
              console.log(res);
              var userId = res.data.data.userId;
              that.globalData.userId = userId;
              var config = res.data.data.config;
              console.log(config)
              console.log(config[0])
              var userData = res.data.data.userData;
              var logo = config[0].logo.fieldValue;
              wx.setStorageSync('logo', logo);
              var time = [config[0].serverStartTime.fieldValue, config[0].serverEndTime.fieldValue];
              wx.setStorageSync('storeInfo', config);
              wx.setStorageSync('time', time);
              wx.setStorageSync('userId', userId);
              wx.setStorageSync('isManager', userData.isManager);
              wx.setStorageSync('isSender', userData.isSender);
              wx.setStorageSync('isTeacher', userData.isTeacher);
              wx.setStorageSync('userPhone', userData.phone);
              console.log(that.globalData.userId);
              var schoolId = userData.schoolId;
              var schoolName = userData.schoolName;
              wx.setStorageSync('schoolName', schoolName);
              wx.setStorageSync('schoolId', schoolId);
              
            }
          });
        } else {
          console.log("登陆失败" + res.errMsg)
        }
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 版本更新
  updata() {
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function(res) {
      console.log(res)
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })

    updateManager.onUpdateFailed(function() {
      console.log('新的版本下载失败')
    })
  },
  globalData: {
    userId:'',    //用户userId
    userInfo: null, //用户信息
    programName:'易达达',
    api: 'https://xqps.honghuseo.cn/api/', //接口地址
    baseUrl: 'https://xqps.honghuseo.cn/data/', //图片路径地址
    baseUrlData: 'https://xqps.honghuseo.cn/' //图片路径地址
  }, 

  // 比较并 上传用户信息
  uploadInfo(userInfo){
    console.log(userInfo)
    var userInfo2 = wx.getStorageSync('userInfo');  
    var upload = false;
    // 判断
    if (!userInfo2){
      console.log(userInfo2)
      wx.setStorageSync('userInfo', userInfo);
      upload = true;
    } else {
      var userInfoString = JSON.stringify(userInfo);
      var userInfoString2 = JSON.stringify(userInfo2);
      console.log(userInfoString2)
      console.log(userInfoString == userInfoString2)
      if (userInfoString != userInfoString2){
        upload = true;
      }
    }
    console.log(upload)
    //向后台传用户信息
    if (upload){
      wx.request({
        method: 'POST',
        url: `${this.globalData.api}user/modify_info`,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: userInfo,
        success: res => {
          console.log(res);
        }
      });
    }
  }
})