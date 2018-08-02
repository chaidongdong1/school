// pages/mycenter/about/about.js
const app = getApp();
Page({

  data: {
    datas: '', //整体内容
  },

  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  onLoad: function(options) {
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}common/sysConfig`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {

      },
      success: res => {
        console.log(res);
        this.setData({
          datas: res.data.data[0]
        });
      }
    });
  },
  //拨打电话
  bindTel() {
    wx.makePhoneCall({
      phoneNumber: this.data.datas.tel.fieldValue
    })
  },
})