// pages/teacher/teacher.js
const app = getApp();
let formId;
Page({
  data: {
    teacherName: '', //教师姓名
    teacherNumber: '', //教师工号
    datas: '', //用户信息
    status:'',  //状态信息
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
    });
    //获取认证信息接口
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}user/getAudit`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        userId: app.globalData.userId
      },
      success: res => {
        wx.hideLoading();
        console.log(res);
        this.setData({
          status:res.data.status
        });
        if (res.data.status) {
          this.setData({
            datas: res.data.data,
            teacherName: res.data.data.trueName,
            teacherNumber: res.data.data.IdCode,
          });
          console.log(this.data.datas)
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
  formSubmit(e){
    console.log(e);
    formId = e.detail.formId;
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
          type: 2,
          dataId: !this.data.datas.id ? '' : this.data.datas.id,
          formId:formId,
        },
        success: res => {
          console.log({
            userId: app.globalData.userId,
            IdCode: this.data.teacherNumber,
            trueName: this.data.teacherName,
            type: 2,
            dataId: !this.data.datas.id ? '' : this.data.datas.id,
            formId:formId,
          })
          wx.hideLoading();
          console.log(res);
          if (res.data.status == 1) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1500
            });
            setTimeout(function() {
              wx.switchTab({
                url: '../../mycenter/mycenter'
              });
            }, 500);
          } else {
            wx.showToast({
              title: '提交失败',
              image: '../../../image/warning.png',
              duration: 1500
            });
          }
        }
      });
    }
  },
});