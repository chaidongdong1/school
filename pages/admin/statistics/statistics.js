const app = getApp();
let userIds;
Page({

  data: {
    //遮罩层
    mask: {
      opacity: 0,
      display: 'none',
    },
    //弹窗
    returnDeposit: {
      translateY: 'translateY(1500px)',
      opacity: 1
    },
    choose: 0, //导航下标
    // date: '请选择时间', //时间选择器
    lists: [], //导航
    datas: [], //内容
    totalPage: '', //总页数
    currPage: 1, //当前页数
    marks: ['', 'common', 'teacher', 'sender'], //统计信息接口向后台传的信息
    paiXinxi: '', //调接口显示的派单员信息
    tanXinxi: '', //弹窗显示的页面传过来的派单员信息
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    //统计信息数量
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}admin/userNum`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        managerId: app.globalData.userId
      },
      success: res => {
        wx.hideLoading();
        console.log(res);
        let listCommon = res.data.data.common; //普通用户
        let listSender = res.data.data.sender; //派单员
        let listTeacher = res.data.data.teacher; //教师
        let listSuo = listCommon * 1 + listSender * 1 + listTeacher * 1;
        //导航列表
        this.setData({
          lists: [{ listsName: "全部", listsNumber: listSuo },
            { listsName: "普通用户", listsNumber: listCommon },
            { listsName: "教师", listsNumber: listTeacher },
            { listsName: "派单员", listsNumber: listSender }]
        });
      }
    });
  },
  //统计信息渲染
  getList1() {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}admin/querySchoolUser`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        managerId: app.globalData.userId,
        mark: this.data.marks[this.data.choose],
        page: this.data.currPage
      },
      success: res => {
        wx.hideLoading();
        console.log(res);
        this.setData({
          datas: this.data.datas.concat(res.data.data.root),
          totalPage: res.data.data.totalPage,
          currPage: res.data.data.currPage
        });
      }
    });
  },
  onShow: function() {
    this.getList1();
  },

  //点击导航
  tab_choose: function(e) {
    this.setData({
      datas: [], //内容
      totalPage: '', //总页数
      currPage: 1, //当前页数
    });
    var index = e.currentTarget.dataset.index;
    this.setData({
      choose: index
    });
    this.getList1();
    // this.clear();
  },
  // clear() {
  //   if (this.data.choose == 1) {
  //     this.setData({
  //       date: '请选择时间',
  //       datas: datas.stats.filter(item => item.statsType == 0)
  //     });
  //   } else if (this.data.choose == 2) {
  //     this.setData({
  //       date: '请选择时间',
  //       datas: datas.stats.filter(item => item.statsType == 1)
  //     });
  //   } else if (this.data.choose == 3) {
  //     this.setData({
  //       date: '请选择时间',
  //       datas: datas.stats.filter(item => item.statsType == 2)
  //     });
  //   } else {
  //     this.setData({
  //       date: '请选择时间',
  //       datas: datas.stats
  //     });
  //   }
  // },
  //时间选择器
  // bindDateChange: function(e) {
  //   this.clear();
  //   //获取当前日期
  //   var now = new Date(); //js获取时间
  //   var year = now.getFullYear(); //得到年份
  //   var month = now.getMonth() + 1; //得到月份
  //   var datess = now.getDate(); //得到日期
  //   if (month * 1 < 10) {
  //     month = "0" + month;
  //   }
  //   if (datess * 1 < 10) {
  //     datess = "0" + datess;
  //   }
  //   var dates = year + "-" + month + "-" + datess;
  //   this.setData({
  //     date: dates
  //   });
  //   console.log(dates);
  //   console.log(this.data.date);
  //   console.log('picker发送选择改变，携带值为', e.detail.value);
  //   this.setData({
  //     date: e.detail.value
  //   });
  //   wx.showLoading({
  //     title: '加载中',
  //   });
  //   this.setData({
  //     datas: this.data.datas.filter(item => item.statsDate == this.data.date)
  //   });

  //   setTimeout(function() {
  //     wx.hideLoading();
  //   }, 500);
  // },
  //封禁和解封派单员
  bindFeng(e) {
    console.log(e);
    let fengUserId = e.currentTarget.dataset;
    wx.showModal({
      title: '温馨提示',
      content: fengUserId.issender == 1 ? '您是否要封禁该用户' : '您是否要解封该用户',
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          })
          //封禁和解封接口
          wx.request({
            method: 'POST',
            url: `${app.globalData.api}admin/changeSenderStatus`,
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              managerId: app.globalData.userId,
              userId: fengUserId.userid,
              status: fengUserId.issender == 1 ? '-1' : '1',
            },
            success: res => {
              wx.hideLoading()
              console.log(res);
              console.log({
                managerId: app.globalData.userId,
                userId: fengUserId.userid,
                status: fengUserId.issender == 1 ? '-1' : '1',
              });
              if (res.data.status == 1) {
                wx.showToast({
                  title: fengUserId.issender == 1 ? '封禁成功' : '解封成功',
                  icon: 'success',
                  duration: 1500
                });
                this.setData({
                  datas: [], //内容
                  totalPage: '', //总页数
                  currPage: 1, //当前页数
                });
                setTimeout(() => {
                  this.getList1();
                }, 500);
                this.bindtapClose();
                console.log("刷新页面")
              } else {
                wx.showToast({
                  title: fengUserId.issender == 1 ? '封禁失败' : '解封失败',
                  image: '../../../image/warning.png',
                  duration: 1500
                })
              }
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  //弹窗里显示获取派单员信息接口
  getListPai() {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}user/getAudit`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        userId: userIds
      },
      success: res => {
        wx.hideLoading();
        console.log(res);
        this.setData({
          paiXinxi: res.data.data
        });
      }
    });
  },
  //弹窗显示
  bindtapMasks(e) {
    console.log(e);
    this.setData({
      tanXinxi: e.currentTarget.dataset
    });
    console.log(this.data.tanXinxi);
    userIds = e.currentTarget.dataset.userid;
    this.getListPai();
    let mask = this.data.mask,
      returnDeposit = this.data.returnDeposit;
    mask.display = 'block';
    this.setData({ mask });
    mask.opacity = 1;
    returnDeposit.translateY = 'translateY(0)';
    returnDeposit.opacity = 1;
    this.setData({ mask, returnDeposit });
  },
  //关闭弹窗
  bindtapClose() {
    let mask = this.data.mask,
      returnDeposit = this.data.returnDeposit;
    mask.opacity = 0;
    returnDeposit.opacity = 0;
    this.setData({ mask, returnDeposit });
    setTimeout(() => {
      mask.display = 'none';
      returnDeposit.translateY = 'translateY(1500px)';
      this.setData({ mask, returnDeposit });
    }, 500);
  },
  //上拉加载
  onReachBottom: function() {
    if (this.data.currPage < this.data.totalPage) {
      this.setData({
        currPage: this.data.currPage * 1 + 1
      });
      console.log(this.data.currPage);
      this.getList1();
    } else {
      console.log("已经是最后一页");
    }
  },
})