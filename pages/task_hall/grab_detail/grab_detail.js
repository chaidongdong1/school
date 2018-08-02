// pages/grab/grab_detail/grab_detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskId: 0,
    type: 0,
    photo:'',  //发布人头像
    name:'',     //发布人昵称
    createTime: '', //发布时间
    goodsList: [],  //产品列表
    orderNo: '',  //订单编号
    shopAddress: '', //发货地址
    userAddress: '',  //收件地址
    sendTime: '',  //送达时间
    orderType: '',  //订单类型
    orderRemarks:'',   //订单备注
    imgUrl: app.globalData.baseUrl ,
    showLoading:true
  },

  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  onLoad: function (options) {
    console.log(options)
    var schoolId = wx.getStorageSync('schoolId');
    var userId = wx.getStorageSync('userId');
    var taskId = options.taskId;
    var type = options.type;
    this.setData({ 
      type: options.type,
      name: options.name,
      photo: options.photo,
      schoolId: schoolId,
      userId: userId,
      taskId: taskId
    })
    if (type==0){
      userId='';
    }
    wx.request({   //获取任务详情
      url: app.globalData.api + 'task/taskInfo',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        taskId: taskId,
        userId: userId
      },
      success: res => {
        console.log(res)
        var data = res.data;
        var status = data.status;
        this.setData({
          showLoading:false
        })
        if (status == 1) {
          var info = data.data;
          if (info.goodsList){
            var goodsList=info.goodsList;
          }else{
            var goodsList = [];
          }
          this.setData({
            createTime: info.createTime,
            goodsList: goodsList,
            orderNo: info.orderNo,
            shopAddress: info.shopAddress,
            userAddress: info.userAddress,
            sendTime: info.sendTime,
            orderType: info.orderType,
            orderRemarks: info.orderRemarks,
            shopName: info.shopName,
            packageCode: info.packageCode,
            packagePhone: info.packagePhone,
            packageName: info.packageName,
            packageWeight: info.packageWeight,
            packageName: info.packageName,
            userPhone: info.userPhone,
            userName: info.userName
          })
        } else {
          wx.showToast({
            title: data.msg,
            duration: 2000,
            icon: 'none'
          });
        }
      },
      fail: function () {
        this.setData({
          showLoading: false
        })
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      }
    })
  },
  submit(e){
    var taskId = e.currentTarget.dataset.taskid;
    wx.showLoading({
      title: '正在抢单中。。。',
    })
    wx.request({
      url: app.globalData.api + 'task/GO',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: this.data.userId,
        taskId: taskId
      },
      success: res => {
        //console.log(res)
        var data = res.data;
        var status = data.status;
        if (status == 1) {
          wx.hideLoading();
          wx.showToast({
            title: '抢单成功',
            duration: 2000
          });
          setTimeout(() => {
            wx.navigateBack({
              delta:'1'
            })
          }, 1000)

        } else {
          wx.hideLoading();
          wx.showToast({
            title: data.msg,
            duration: 2000,
            icon: 'none'
          });
        }
      },
      fail: function () {
        wx.hideLoading();
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      }
    })
  }
})