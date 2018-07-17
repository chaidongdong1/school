// pages/teacher/teacher.js
const app = getApp();
Page({
  data: {
    teacherName: '', //教师姓名
    teacherNumber: '', //教师工号
  },
  onLoad: function(options) {
    //获取认证信息接口
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}user/getAudit`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        userId: app.globalData.userId
      },
      success: res => {
        console.log(res);
        if (res.data.status != '') {
          this.setData({
            datas: res.data.data,
            teacherName: res.data.data.trueName,
            teacherNumber: res.data.data.IdCode,
          });
        }
      }
    });
  },
  //输入的姓名
  bindName(e) {
    let teacherName = e.detail.value;
    console.log(teacherName);
    this.setData({
      teacherName: teacherName
    });
  },
  //教师工号
  bindNumber(e) {
    let teacherNumber = e.detail.value;
    console.log(teacherNumber);
    this.setData({
      teacherNumber: teacherNumber
    });
  },
  //提交审核
  bindtapButton() {
    if (!this.data.teacherName) {
      wx.showToast({
        title: '姓名不能为空',
        image: '../../../image/warning.png',
        duration: 1500
      })
    } else if (!this.data.teacherNumber) {
      wx.showToast({
        title: '工号不能为空',
        image: '../../../image/warning.png',
        duration: 1500
      })
    } else {
      wx.showLoading({
        title: '加载中',
      });
      wx.request({
        method: 'POST',
        url: `${app.globalData.api}user/certification`,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          userId: app.globalData.userId,
          IdCode: this.data.teacherNumber,
          trueName: this.data.teacherName,
          type: 2
        },
        success: res => {
          wx.hideLoading();
          console.log(res);

        }
      });
    }
  },
});