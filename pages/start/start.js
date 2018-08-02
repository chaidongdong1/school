// pages/start/start.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school: [], //校区列表
    index: 0, //选择校区
    list: [], //详细校区
    first: true, //首次点击
    showLoading1: true,
    showLoading2: true,
    schoolName: '',
    open: false, //是否在营业时间
    way:''  //引导页跳转路径
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  //查看是否在平台营业时间
  see() {
    var open = false;
    var time = wx.getStorageSync('time');
    if (time) {
      var date = new Date();
      var hours = date.getHours().toString();
      var minute = date.getMinutes();
      if (minute < 10) {
        minute = '0' + minute;
      } else {
        minute = minute.toString();
      }

      var str = parseInt(hours + minute);
      var timeStart = time[0].replace(/:/g, '');
      var timeEnd = time[1].replace(/:/g, '');
      timeStart = parseInt(timeStart);
      timeEnd = parseInt(timeEnd);
      console.log(timeStart)
      console.log(timeEnd)
      console.log(str)
      var way = this.data.way;
      var tab = this.data.tab;
      if (str > timeStart && str < timeEnd) {
        open = true;
        this.setData({
          open: open
        })
        wx.getSetting({
          success: res => {
            console.log(res)
            if (res.authSetting['scope.userInfo']) {
              var schoolName = this.data.schoolName;
              if (schoolName) {
                setTimeout(function() {
                  if (way) {
                    if (tab) {
                      wx.switchTab({
                        url: way
                      })
                    } else {
                      wx.navigateTo({
                        url: way,
                      })
                    }
                  } else {
                    wx.switchTab({
                      url: '../index/index',
                    })
                  }
                }, 1000)
              }
            }
          }
        })
      } else {
        wx.reLaunch({
          url: '../shutDown/shutDown'
        })
      }
    }
  },
  onLoad: function(options) {
    var userId = wx.getStorageSync('userId');
    console.log(options);
    if (options.way){
      this.setData({
        way:options.way
      })
    }
    if (options.tab) {
      this.setData({
        tab: options.tab
      })
    }
    if (options.scene) {
      wx.request({
        method: 'POST',
        url: `${app.globalData.api}user/modify_parentid`,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          userId: userId,
          parentId: options.scene
        },
        success: res => {
          console.log(res);
          if (res.data.status == 1) {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon:'none',
              duration: 2000
            })
          }
        }
      });
    }
    var schoolId = wx.getStorageSync('schoolId');
    var schoolName = wx.getStorageSync('schoolName');
    if (schoolId) {
      this.setData({
        schoolName: schoolName,
        first:false
      })
    }
  },
  // 重复选择校区警告
  warning() {
    wx.showToast({
      title: '不能更改已选择校区',
      icon: 'none'
    })
  },
  change: function(e) {
    var val = e.detail.value;
    this.setData({
      index: val
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
    var schoolName = this.data.schoolName;
    var open = this.data.open;
    console.log(open)
    console.log(schoolName)
    if (schoolName) {
      var way = this.data.way;
      var tab = this.data.tab;
      console.log(way,tab);
      if (way) {
        if(tab){
          wx.switchTab({
            url: way
          })
        }else{
          console.log('aaaa')
          wx.redirectTo({
            url: way+'?cons=${true}',
          })
        }
      } else {
        wx.switchTab({
          url: '../index/index',
        })
      }
    } else {
      this.go();
    }
  },

  // 点击进入提示
  go() {
    var index = this.data.index;
    var first = this.data.first;
    if (first) {
      wx.showModal({
        title: '提示',
        content: '校区选择后无法更改，请慎重选择',
        success: res => {
          if (res.confirm) {
            this.gohome();
            wx.showLoading({
              title: '正在绑定校区……',
            })
          } else if (res.cancel) {
            this.setData({
              first: false
            })
          }
        }
      })
    } else {
      wx.showLoading({
        title: '正在绑定校区……',
      })
      this.gohome();
    }
  },
  onShow: function() {
    var timer;
    var userId = wx.getStorageSync('userId');
    if (userId) {
      this.setData({
        userId: userId,
        showLoading2: false
      })
      this.see();
    } else {
      timer = setInterval(() => {
        userId = wx.getStorageSync('userId');
        console.log(userId)
        if (userId) {
          this.setData({
            userId: userId,
            showLoading2: false
          })
          var schoolId = wx.getStorageSync('schoolId');
          var schoolName = wx.getStorageSync('schoolName');
          if (schoolId) {
            this.setData({
              schoolName: schoolName
            })
          }
          this.see();
          clearInterval(timer);
        }
      }, 1000)
    }
    if (!this.data.schoolName) {
      wx.request({
        url: app.globalData.api + 'common/getSchoolList',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {},
        success: res => {
          console.log(res)
          this.setData({
            showLoading1: false
          })
          var status = res.data.status;
          if (status == 1) {
            var list = res.data.data;
            var len = list.length;
            var item = [];
            for (var i = 0; i < len; i++) {
              item.push(list[i].schoolName)
            }
            this.setData({
              school: item,
              list: list
            })
          } else {
            wx.showToast({
              title: res.data.msg,
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
    } else {
      this.setData({
        showLoading1: false
      })
    }
  },
  gohome() {
    var list = this.data.list;
    var index = this.data.index;
    var schoolId = list[index].schoolId;
    var schoolName = list[index].schoolName;
    wx.request({
      url: app.globalData.api + 'user/modifySchool',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: this.data.userId,
        schoolId: schoolId
      },
      success: res => {
        console.log(res)
        var status = res.data.status;
        wx.hideLoading();
        if (status == 1) {
          var way = this.data.way;
          var tab = this.data.tab;
          if (way) {
            if (tab) {
              wx.switchTab({
                url: way
              })
            } else {
              wx.navigateTo({
                url: way,
              })
            }
          }else{
            wx.switchTab({
              url: '../index/index',
            })
          }
          wx.setStorageSync('schoolId', schoolId);
          wx.setStorageSync('schoolName', schoolName);
        } else {
          wx.showToast({
            title: res.data.msg,
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