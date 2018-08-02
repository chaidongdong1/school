// pages/mycenter/my_team/my_team.js
const app = getApp();
Page({

  data: {
    datas: [], //内容
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
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
        wx.stopPullDownRefresh();
        console.log(res);
        this.setData({
          datas: res.data.data
        });
        console.log(this.data.datas);
      }
    });
  },
  //下拉刷新
  onPullDownRefresh(){
    this.onLoad();
  },
})