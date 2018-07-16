//index.js
const app = getApp();
Page({
  data: {
    imgUrls: [], //轮播图
    baseUrl: app.globalData.baseUrl, //图片路径
    msgList: [], //公示公告
  },

  onLoad() {
    //轮播图接口
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}common/ads`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        adType: 1
      },
      success: res => {
        console.log(res);
        let imgurl = res.data.data.map(item => item.photo);
        console.log(imgurl);
        this.setData({
          imgUrls: imgurl
        })
      }
    });
    //公示公告接口
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}common/article`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        type: 1
      },
      success: res => {
        wx.hideLoading()
        console.log(res);
        this.setData({
          msgList: res.data.data
        })
        console.log(this.data.msgList)
      }
    });
  },
  onShow() {

  },

  //跳转广告列表页
  bindtapNotice() {
    wx.navigateTo({
      url: '../mycenter/notice/notice'
    })
  },
  //跳转到详情页
  bindtapNoticeDetails(e) {
    console.log(e)
    let articleid = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `../mycenter/noticeDetails/noticeDetails?articleid=${articleid}`
    })
  },
  // 跳转到任务大厅
  task_hall() {
    wx.navigateTo({
      url: '../task_hall/task_hall/index'
    })
  }
})