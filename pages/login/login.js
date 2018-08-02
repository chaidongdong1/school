// pages/login/login.js
var app = getApp();
Page({
  data: {
    indexs: 0,   //登陆、注册的值
    array: ['请选择校区', '华南城校区', '龙子湖校区', '惠济区校区'],  //校区数组
    arrayIndex: 0      //选择校区的下标
  },
  onLoad: function(options) {
    
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  //请选择校区
  bindPickerChange(e) {
    this.setData({
      arrayIndex: e.detail.value
    })
  },
  //滑动事件（登陆、注册）
  bindchangeSwiper(e) {
    console.log(e)
    this.setData({
      indexs: e.detail.current
    })
  },
  //登陆
  bintapLogin() {
    this.setData({
      indexs: 0
    })
    console.log(this.data.indexs)
  },
  //注册
  bintapRegister() {
    this.setData({
      indexs: 1
    })
    console.log(this.data.indexs)
  },
})