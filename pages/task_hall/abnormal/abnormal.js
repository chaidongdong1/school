// pages/task_hall/abnormal/abnormal.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskId: 0,
    type: 0,
    photo: '',  //发布人头像
    name: '',     //发布人昵称
    createTime: '', //发布时间
    goodsList: [],  //产品列表
    orderNo: '',  //订单编号
    shopAddress: '', //发货地址
    userAddress: '',  //收件地址
    sendTime: '',  //送达时间
    orderType: '',  //订单类型
    remark: '',   //异常原因
    imgUrl: app.globalData.baseUrl ,
    schoolId:'' ,  //校区id
    showLoading:true
    },
  // 写入异常原因
  remark(e) {
    console.log(e)
    this.setData({
      remark: e.detail.value
    })
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  onLoad: function (options) {
    var taskId = options.taskId;
    console.log(options)
    var schoolId = wx.getStorageSync('schoolId');
    var userId = wx.getStorageSync('userId');
    this.setData({
      schoolId: schoolId,
      userId: userId,
      taskId: taskId
    })
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
        this.setData({
          showLoading: false
        })
        console.log(res)
        var data = res.data;
        var status = data.status;
        if (status == 1) {
          var info = data.data;
          if (info.goodsList) {
            var goodsList = info.goodsList;
          } else {
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
  onShow: function () {
  
  },
  submit: function () {
    var remark = this.data.remark;
    var taskId = this.data.taskId;
    var schoolId = this.data.schoolId;
    var userId = this.data.userId;
    var that = this;
    wx.request({
      url: app.globalData.api + 'task/problemTask',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: userId,
        schoolId: schoolId,
        remark: remark,
        taskId: taskId
      },
      success(res) {
        console.log(res)
        var status = res.data.status;
        if (status == 1) {
          wx.showToast({
            title: '问题已申报！',
            duration: 2000,
            icon: 'none'
          });
          setTimeout(function(){
            wx.navigateBack({
              delta: 1,
            })
          },1000)
        } else {
          wx.showToast({
            title: res.data.msg,
            duration: 2000,
            icon: 'none'
          });
        }

      },
      fail: function () {
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