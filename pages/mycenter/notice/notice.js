// pages/mycenter/notice/notice.js
const app = getApp();
Page({

  data: {
    datas: [], //列表内容
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  onLoad: function(options) {
    var schoolId = wx.getStorageSync('schoolId');
    console.log(schoolId)
    //如果学校id不存在跳转到引导页
    if (!schoolId) {
      console.log('1111111111')
      var way = '../mycenter/notice/notice';
      wx.reLaunch({
        url: '../../start/start?way=' + way
      })
    }
    //公示公告接口
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}common/article`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        type: 1
      },
      success: res => {
        console.log(res);
        wx.hideLoading()
        this.setData({
          datas: res.data.data
        })
        console.log(this.data.datas)
      }
    });
  },
  //跳转详情页
  bindtapDetails(e) {
    let articleid = e.currentTarget.dataset.articleid;
    console.log(articleid);
    wx.navigateTo({
      url: `../noticeDetails/noticeDetails?articleid=${articleid}`
    });
  },
});