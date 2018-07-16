// pages/mycenter/my_team/my_team.js
const app = getApp();
Page({

  data: {
    datas: [], //内容
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}user/myChildLevel`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        userId: app.globalData.userId
      },
      success: res => {
        console.log({
          userId: app.globalData.userId
        });
        wx.hideLoading();
        console.log(res);
        this.setData({
          datas: res.data.data
        });
        console.log(this.data.datas);
      }
    });
  },
})