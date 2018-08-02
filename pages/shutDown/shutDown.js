// pages/shutDown/shutDown.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'9:00-20:00'
  },
  
  onShow: function () {
    var time = wx.getStorageSync('time');
    if(time){
      this.setData({
        time:time
      })
    }
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})