// pages/task_hall/task_hall/index.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    count: 0, //可接单数量
    nowTask: 0, //已接单数量
    oldTask: 0, //已完成数量
    list: [], //可接单
    userInfo: '', //用户信息
    schoolName: '', //所在校区
    showLoading1: true,
    showLoading2: true
  },
  // 分享
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  onLoad: function(options) {
    var schoolId = wx.getStorageSync('schoolId');
    var userId = wx.getStorageSync('userId');
    var schoolName = wx.getStorageSync('schoolName');
    var isSender = wx.getStorageSync('isSender');
    //如果学校id不存在跳转到引导页
    if (!schoolId) {
      console.log('1111111111')
      var way = '../task_hall/task_hall/index';
      wx.reLaunch({
        url: '../../start/start?way=' + way
      })
    }
    if (isSender != 1) {
      wx.showToast({
        title: '请先认证派单员',
        icon: 'none',
        duration: 2000
      });
      setTimeout(() => {
        wx.switchTab({
          url: '../../index/index'
        })
      }, 500);
    }    
    this.setData({
      schoolId: schoolId,
      userId: userId,
      schoolName: schoolName
    })
  },
  jump_start: function() {
    wx.redirectTo({
      url: '../task_hall/index'
    })
  },
  jump_center: function() {
    wx.redirectTo({
      url: '../in_task/in_task'
    })
  },
  jump_end: function() {
    wx.redirectTo({
      url: '../task_end/task_end'
    })
  },
  // 获取用户权限
  getUI: function(e) {
    var that = this;
    if (e.detail.userInfo) {
      var userInfo = e.detail.userInfo;
      userInfo.userId = this.data.userId;
      this.setData({
        userInfo: userInfo
      })
      app.uploadInfo(userInfo)
      console.log(userInfo)
    }
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
    this.onShow();
  },
  onShow: function() {
    var that = this;
    that.setData({
      showLoading1: true,
      showLoading2: true
    })
    wx.getUserInfo({
      success(e) {
        console.log(e)
        if (e.userInfo) {
          that.setData({
            userInfo: e.userInfo
          })
        }
      }
    })
    // 任务列表
    var that = this;
    wx.request({
      url: app.globalData.api + 'task/taskList',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        schoolId: this.data.schoolId,
        taskStatus: 0
      },
      success: res => {
        console.log(res)
        this.setData({
          showLoading1: false
        })
        var data = res.data;
        var status = data.status;
        if (status == 1) {
          var list = data.data.list;
          var count = data.data.count;
          if (!count) {
            count = 0;
          }
          var len = list.length;
          for (var i = 0; i < len; i++) {
            var createTime = list[i].createTime;
            createTime = createTime.replace(/^[0-9]{4}-/, '').replace(/:[0-9]{2}$/, '');
            list[i].createTime = createTime;
          }
          if (len == 0 || !list) {
            list = [];
          }
          this.setData({
            count: count,
            list: list
          })
        } else {
          wx.showToast({
            title: data.msg,
            duration: 2000,
            icon: 'none'
          });
        }
      },
      fail: function() {
        this.setData({
          showLoading1: false
        })
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      }
    })
    // 派送员统计信息
    wx.request({
      url: app.globalData.api + 'task/getUserTaskReport',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: this.data.userId,
      },
      success: res => {
        this.setData({
          showLoading2: false
        })
        console.log(res)
        var data = res.data;
        var status = data.status;
        if (status == 1) {
          var nowTask = data.data.nowTask;
          if (!nowTask) {
            nowTask = 0;
          }
          var oldTask = data.data.oldTask;
          if (!oldTask) {
            oldTask = 0;
          }
          wx.setStorageSync('nowTask', nowTask);
          wx.setStorageSync('oldTask', oldTask);
          this.setData({
            nowTask: nowTask,
            oldTask: oldTask
          })
        } else {
          wx.showToast({
            title: data.msg,
            duration: 2000,
            icon: 'none'
          });
        }
      },
      fail: function() {
        this.setData({
          showLoading2: false
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
  // 进入抢单详情页
  goDetail(e) {
    var list = this.data.list;
    var index = e.currentTarget.dataset.index;
    var taskId = list[index].taskId;
    var publishName = list[index].publishName;
    var publishPhoto = list[index].publishPhoto;
    console.log(index)
    wx.navigateTo({
      url: `../grab_detail/grab_detail?type=0&taskId=${taskId}&name=${publishName}&photo=${publishPhoto}`
    })
  },
  // 抢单
  grab(e) {
    wx.showLoading({
      title: '正在抢单中。。。',
    })
    var taskId = e.currentTarget.dataset.taskid;
    console.log(taskId)
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
            this.onShow();
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
      fail: function() {
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