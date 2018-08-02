// pages/feedback/feedback.js
let check = 0;
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '1', value: '功能异常：功能故障或不可用' },
      { name: '2', value: '产品建议：用的不爽，我有建议' },
      { name: '3', value: '其它问题', checked: 'true' },
    ],
    text: '', //输入的内容
    checkbox: '', //选中的内容位置
  },

  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var schoolId = wx.getStorageSync('schoolId');
    console.log(schoolId)
    //如果学校id不存在跳转到引导页
    if (!schoolId) {
      console.log('1111111111')
      var way = '../mycenter/feedback/feedback';
      wx.reLaunch({
        url: '../../start/start?way=' + way
      })
    }
    if (!this.data.checkbox) {
      check = this.data.items.length;
      this.setData({
        checkbox: check * 1 - 1
      });
    }
    console.log(this.data.checkbox)
  },
  //单选按钮
  checkboxChange: function(e) {
    console.log(e)
    check = e.detail.value;
    this.setData({
      checkbox: check * 1 - 1
    });
    console.log(this.data.checkbox);
  },
  //输入框
  bindText(e) {
    let text = e.detail.value;
    this.setData({
      text: text
    });
  },
  //提交反馈
  bindtapButton() {
    var userId = wx.getStorageSync('userId');
    var content = this.data.text;
    var questionType = this.data.checkbox;
    if (!this.data.text) {
      wx.showToast({
        title: '意见不能为空',
        image: '../../../image/warning.png',
        duration: 1500
      })
    } else {
      wx.showLoading({
        title: '加载中',
      });
      wx.request({
        url: app.globalData.api + 'common/callback',
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          content: content,
          questionType: this.data.checkbox,
          userId: userId
        },
        success: res => {
          wx.hideLoading();
          console.log({
            content: content,
            questionType: this.data.checkbox,
            userId: userId
          })
          console.log(res)
          var status = res.data.status;
          if (status == 1) {
            wx.showToast({
              title: res.data.msg,
              duration: 1500,
              icon: 'success'
            });
            setTimeout(() => {
              wx.switchTab({
                url: '../../mycenter/mycenter'
              })
            }, 500);
          } else {
            wx.showToast({
              title: res.data.msg,
              duration: 1500,
              icon: 'none'
            });
          }
        },
        fail: function() {
          wx.hideLoading();
          wx.showToast({
            title: '网络异常！',
            duration: 2000,
            icon: 'none'
          });
        }
      });
    }
  },
});