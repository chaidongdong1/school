//app.js
const updateManager = wx.getUpdateManager();
App({
  data: {
    url: '',
    img_url: ''
  },
  onLaunch: function() {
    this.updata();

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


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
              that.globalData.userId = res.data.data.userId;
              console.log(that.globalData.userId);
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
    api: 'https://xqps.honghuseo.cn/api/', //接口地址
    baseUrl: 'https://xqps.honghuseo.cn/data/' //图片路径地址
  }
})