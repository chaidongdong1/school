
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose: 0
  },
  onLoad: function (options) {

  },


  onShow: function () {

  },

  tab_choose: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      choose: index
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})