// pages/panic/panic.js
var app = getApp();
Page({
  data:{
    vou:[],
    showLoading:true
  },
   like:function(e){
    console.log(e.currentTarget.dataset.title)
    wx.navigateTo({
      url: '../index/detail?title='+e.currentTarget.dataset.title,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  // 分享
  onShareAppMessage: function () {
    // return {
    //   title: '软件开发企业',
    //   path: '/pages/index/index?scene=' + app.data.userId,
    // }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    // wx.request({
    //   url: app.data.ceshiUrl + '/Api/User/voucher',
    //   method:'post',
    //   data: {uid:app.data.userId},
    //   header: {
    //     'Content-Type':  'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {  
    //     var vou = res.data.nouses;
    //     var status = res.data.status;
    //     if(status==1){
    //       that.setData({
    //         vou:vou,
    //       });
    //     }else{
    //       wx.showToast({
    //         title: res.data.err,
    //         duration: 2000,
    //         icon: 'none'
    //       });
    //     }
    //     //endInitData
    //   },
    //   fail:function(e){
    //     wx.showToast({
    //       title: '网络异常！',
    //       duration: 2000,
    //       icon: 'none'
    //     });
    //   },
    //   complete: function () {
    //     that.setData({
    //       showLoading: false
    //     })
    //   }
    // });
  }
})