// pages/meal/search/search.js
var app = getApp();
var timer;
Page({
  data: {
    list:[],
    imgUrl: app.globalData.baseUrl,
    show:false,
    loadingval:'正在加载',
    control:'true',
    key: '',
    isHideLoadMore:true
  },
  onLoad: function (options) {

    var schoolId = wx.getStorageSync('schoolId');
    var userId = wx.getStorageSync('userId');
    this.setData({
      schoolId: schoolId,
      userId: userId
    })
  },


  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  onReachBottom: function () {
    var that = this;
    this.setData({
      isHideLoadMore: false
    });
    var control = this.data.control;
    if (control) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        that.setData({
          isHideLoadMore: true,
        })
        that.search();
      }, 2000)
    }
  },
  write: function (e) {
    this.setData({
      key: e.detail.value
    })
  },
  search(){
    var key = this.data.key;
    if (key){
      var that = this;
      wx.request({
        url: app.globalData.api + 'shop/shopList',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          schoolId: that.data.schoolId,
          shopName: key
        },
        success(res){
          console.log(res)
          var status = res.data.status;
          if (status==1){
            var list  = res.data.data.root;
            var currPage = res.data.data.currPage;
            var totalPage = res.data.data.totalPage;
            that.setData({
              list:list,
              show: true
            })
            if (currPage == totalPage) {
              that.setData({
                control: false,
                loadingval: '亲，我们是有底线的',
                isHideLoadMore: false
              })
            }
          }else{
            wx.showToast({
              title: res.data.msg,
              duration: 2000,
              icon: 'none'
            });
          }
        },
        fail: function () {
          wx.showToast({
            title: '网络异常！',
            duration: 2000,
            icon: 'none'
          });
        }
      })
    }
  }
})