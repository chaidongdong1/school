// pages/grab/grab_detail/grab_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
  }
})