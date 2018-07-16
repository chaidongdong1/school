// pages/panic/panic.js
var app = getApp();
Page({
  data:{
    vou:[],
    showLoading:true
  },
  // 分享
  onShareAppMessage: function () {
    return {
      title: '软件开发企业',
      path: '/pages/index/index?scene=' + app.data.userId,
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
   getvou:function(e){
    var vid = e.currentTarget.dataset.vid;
    var uid = app.data.userId;
    wx.request({
      url: app.data.ceshiUrl + '/Api/Voucher/get_voucher',
      method:'post',
      data: {vid:vid,uid:uid},
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {  
        var status = res.data.status;
        if(status==1){
          wx.showToast({
            title: '领取成功！',
            duration: 2000
          });
        }else{
          wx.showToast({
            title: res.data.err,
            icon:'none',
            duration: 2000
          });
        }
        //endInitData
      },
      fail:function(e){
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      },
    });
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // var that = this;
    // wx.request({
    //   url: app.data.ceshiUrl + '/Api/Voucher/index',
    //   method:'post',
    //   data: {},
    //   header: {
    //     'Content-Type':  'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {  
    //     var vou = res.data.vou;
    //     that.setData({
    //       vou:vou
    //     });
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
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})