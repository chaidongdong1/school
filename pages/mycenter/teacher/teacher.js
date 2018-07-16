// pages/teacher/teacher.js
Page({
  data: {
    teacherName: '', //教师姓名
    teacherNumber: '', //教师工号
  },
  onLoad: function(options) {

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
      
    }
  },
});