const app = getApp();
Page({

  data: {
    choose: 0, //导航下标
    date: '请选择时间', //时间选择器
    lists: [], //导航
    datas: [], //内容
    listSuo: '', //所有订单数量
    mark: ['waiting', 'dealing', 'over', 'unusual'], //向后台传的数据
    totalPage: '', //总页数
    currPage: 1, //当前页数
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  onLoad: function(options) {
    this.getListNum();
    this.getListsDan();
  },
  onShow: function() {

  },
  //获取订单数量和导航名称
  getListNum() {
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}admin/orderNum`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        managerId: app.globalData.userId
      },
      success: res => {
        wx.hideLoading();
        console.log(res);
        this.setData({
          lists: [{
            listsName: "待受理",
            listsNumber: !res.data.data.waiting ? '0' : res.data.data.waiting,
            }, {
            listsName: "配送中",
            listsNumber: !res.data.data.dealing ? '0' : res.data.data.dealing,
            }, {
            listsName: "已完成",
            listsNumber: !res.data.data.over ? '0' : res.data.data.over,
            }, {
            listsName: "异常订单",
            listsNumber: !res.data.data.unusual ? '0' : res.data.data.unusual,
          }],
          listSuo: res.data.data.waiting * 1 + res.data.data.dealing * 1 + res.data.data.over * 1 + res.data.data.unusual * 1,
        });
      }
    });
  },
  //点击已解决
  bindOver(e) {
    console.log(e);
    let taskId = e.currentTarget.dataset.taskid;
    wx.showModal({
      title: '温馨提示',
      content: '您是否已解决该订单？',
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          });
          wx.request({
            method: 'POST',
            url: `${app.globalData.api}admin/dealProblem`,
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              managerId: app.globalData.userId,
              taskId: taskId,
            },
            success: res => {
              wx.hideLoading();
              console.log(res);

              if (res.data.status == 1) {
                wx.showToast({
                  title: '操作成功',
                  icon: 'success',
                  duration: 1500
                });
                setTimeout(() => {
                  this.setData({
                    date: '请选择时间', //时间选择器
                    lists: [], //导航
                    datas: [], //内容
                    listSuo: '', //所有订单数量
                    totalPage: '', //总页数
                    currPage: 1, //当前页数
                  });
                  this.getListNum();
                  this.getListsDan();
                }, 500);
              } else {
                wx.showToast({
                  title: '操作失败',
                  image: '../../../image/warning.png',
                  duration: 1500
                });
              }
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  //重新发单
  bindChong(e) {
    console.log(e);
    let taskId = e.currentTarget.dataset.taskid;
    wx.showModal({
      title: '温馨提示',
      content: '您是否需要对该订单重新发送？',
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          });
          wx.request({
            method: 'POST',
            url: `${app.globalData.api}admin/refreshTask`,
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              managerId: app.globalData.userId,
              taskId: taskId,
            },
            success: res => {
              wx.hideLoading();
              console.log(res);

              if (res.data.status == 1) {
                wx.showToast({
                  title: '操作成功',
                  icon: 'success',
                  duration: 1500
                });
                setTimeout(() => {
                  this.setData({
                    date: '请选择时间', //时间选择器
                    lists: [], //导航
                    datas: [], //内容
                    listSuo: '', //所有订单数量
                    totalPage: '', //总页数
                    currPage: 1, //当前页数
                  });
                  this.getListNum();
                  this.getListsDan();
                }, 500);
              } else {
                wx.showToast({
                  title: '操作失败',
                  image: '../../../image/warning.png',
                  duration: 1500
                });
              }
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  //获取订单列表
  getListsDan() {
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}admin/querySchoolOrders`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        managerId: app.globalData.userId,
        mark: this.data.mark[this.data.choose],
        page: this.data.currPage
      },
      success: res => {
        wx.hideLoading();
        console.log(res);
        let root = res.data.data.root.map(item => {
          item.createTime = item.createTime.slice(0, 16);
          if (item.getTime) {
            item.getTime = item.getTime.slice(0, 16);
          }
          if (item.completeTime) {
            item.completeTime = item.completeTime.slice(0, 16);
          }
          if (item.errorTime) {
            item.errorTime = item.errorTime.slice(0, 16);
          }
          return item;
        });
        console.log(root);
        //页面内容渲染
        this.setData({
          datas: this.data.datas.concat(root),
          totalPage: res.data.data.totalPage,
          currPage: res.data.data.currPage,
        });
      }
    });
  },
  //点击导航
  tab_choose: function(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      choose: index,
      totalPage: '', //总页数
      currPage: 1, //当前页数
      datas: [], //内容
      date: '请选择时间',
    });
    this.getListsDan();
    // this.clear();
  },
  //判断当前在第几个页面
  // clear() {
  //   if (this.data.choose == 1) {
  //     this.setData({
  //       date: '请选择时间',
  //     });
  //   } else if (this.data.choose == 2) {
  //     this.setData({
  //       date: '请选择时间',
  //     });
  //   } else if (this.data.choose == 3) {
  //     this.setData({
  //       date: '请选择时间',
  //     });
  //   } else {
  //     this.setData({
  //       date: '请选择时间',
  //     });
  //   }
  // },
  //时间选择器
  bindDateChange: function(e) {
    // this.clear();
    //获取当前日期
    var now = new Date(); //js获取时间
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth() + 1; //得到月份
    var datess = now.getDate(); //得到日期
    if (month * 1 < 10) {
      month = "0" + month;
    }
    if (datess * 1 < 10) {
      datess = "0" + datess;
    }
    var dates = year + "-" + month + "-" + datess;
    this.setData({
      date: dates
    });
    console.log(dates);
    console.log(this.data.date);
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      choose: this.data.choose,
      date: e.detail.value,
      totalPage: '', //总页数
      currPage: 1, //当前页数
      datas: [], //内容
    });
    wx.showLoading({
      title: '加载中',
    });
    //通过时间筛选接口
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}admin/querySchoolOrders`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        managerId: app.globalData.userId,
        mark: this.data.mark[this.data.choose],
        page: this.data.currPage,
        time: this.data.date,
      },
      success: res => {
        console.log(res);
        console.log({
          managerId: app.globalData.userId,
          mark: this.data.mark[this.data.choose],
          page: this.data.currPage,
          time: this.data.date,
        })
        let root = res.data.data.root.map(item => {
          item.createTime = item.createTime.slice(0, 16);
          if (item.getTime) {
            item.getTime = item.getTime.slice(0, 16);
          }
          if (item.completeTime) {
            item.completeTime = item.completeTime.slice(0, 16);
          }
          if (item.errorTime) {
            item.errorTime = item.errorTime.slice(0, 16);
          }
          return item;
        });
        console.log(root);
        //页面内容渲染
        this.setData({
          datas: this.data.datas.concat(root),
          totalPage: res.data.data.totalPage,
          currPage: res.data.data.currPage,
        });
      }
    });
    setTimeout(function() {
      wx.hideLoading();
    }, 500);
  },
  //跳转详情
  bindXiang(e) {
    console.log(e)
    let orderId = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: `../../admin/admin_orderDetails/admin_orderDetails?shop=${orderId}`
    });
  },
  //上拉加载
  onReachBottom: function() {
    if (this.data.currPage < this.data.totalPage) {
      this.setData({
        currPage: this.data.currPage * 1 + 1
      });
      console.log(this.data.currPage);
      this.getListsDan();
    } else {
      console.log("已经是最后一页");
    }
  },
});