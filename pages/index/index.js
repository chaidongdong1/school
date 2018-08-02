//index.js
const app = getApp();
Page({
  data: {
    imgUrls: [], //轮播图
    baseUrl: app.globalData.baseUrl, //图片路径
    msgList: [], //公示公告
    schoolName: '', //学校名字
    isSender:'',   //判断是否是派单员
    showLoading:true,  //加载中动画
    logo:'',   //logo图片
  },

  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  onLoad() {
    let schoolId = wx.getStorageSync('schoolId');
    let storeInfo = wx.getStorageSync('storeInfo');
    console.log(storeInfo)
    this.setData({
      logo:storeInfo[0].logo.fieldValue
    });
    console.log(this.data.logo)
    //如果学校id不存在跳转到引导页
    if (!schoolId) {
      var way = '../index/index';
      wx.reLaunch({
        url:`../start/start?tab=${true}&&way=${way}`
      })
    }
    console.log(schoolId)
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}common/ads`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        adType: 1,
        schoolId:schoolId
      },
      success: res => {
        console.log(res);
        let imgurl = res.data.data.map(item => item.photo);
        console.log(imgurl);
        this.setData({
          imgUrls: imgurl,
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
        console.log(res);
        this.setData({
          msgList: res.data.data,
          showLoading:false
        })
        console.log(this.data.msgList)
      }
    });
  },
  onShow() {
    var schoolName = wx.getStorageSync('schoolName');
    var isSender = wx.getStorageSync('isSender');
    this.setData({
      schoolName: schoolName,
      isSender:isSender
    })
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