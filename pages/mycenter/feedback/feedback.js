// pages/feedback/feedback.js
let check = 0;
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
    checkbox: '', //选中的内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (!this.data.checkbox) {
      check = this.data.items.length;
      console.log(check)
      let checkbox = this.data.items[check - 1].value;
      this.setData({
        checkbox: checkbox
      });
    }
    console.log(this.data.checkbox)
  },
  //单选按钮
  checkboxChange: function(e) {
    check = e.detail.value;
    let checkbox = this.data.items[check - 1].value;
    this.setData({
      checkbox: checkbox
    });
    console.log(checkbox);
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
    console.log(this.data.text);
    console.log(this.data.checkbox);
    if (!this.data.text) {
      wx.showToast({
        title: '意见不能为空',
        image: '../../../image/warning.png',
        duration: 1500
      })
    }else {
      
    }
  },
})