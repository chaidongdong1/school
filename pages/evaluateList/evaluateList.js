// pages/evaluateList/evaluateList.js
var app = getApp();
var shopId, goodsId;
let hong = ['/image/xing-xuan.png','/image/xing-xuan.png','/image/xing-xuan.png','/image/xing-xuan.png','/image/xing-xuan.png'],
 hui = ['/image/xing-wei.png','/image/xing-wei.png','/image/xing-wei.png','/image/xing-wei.png','/image/xing-wei.png'];
Page({

  data: {
    list: [], //评价列表
    baseUrl: app.globalData.baseUrl, //图片路径
    totalPage: '',
    currPage: 1
  },
  // 分享
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  onLoad: function(options) {
    console.log(options)
    shopId = options.shopId;
    goodsId = options.goodsId;
    this.getLists();
  },
  getLists() {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}goods/appraiseList`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        shopId: shopId,
        goodsId: goodsId,
        page: this.data.currPage
      },
      success: res => {
        wx.hideLoading();
        console.log(res);
        console.log({
          shopId: shopId,
          goodsId: goodsId,
          page: this.data.currPage
        })
        var data = res.data;
        var status = data.status;
        if (status == 1) {
          var list = data.data.root.map(item => {
            item.appraisesAnnex = item.appraisesAnnex.replace(/&quot;/g, '').split(',');
            return item
          })
          console.log(list)
          this.setData({
            list: this.data.list.concat(list),
            totalPage: res.data.data.totalPage,
            currPage: res.data.data.currPage
          })
        } else {
          wx.showToast({
            title: data.msg,
            duration: 2000,
            icon: 'none'
          });
        }
      },
      fail: function() {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      }
    });
  },
  //上拉加载
  onReachBottom: function() {
    if (this.data.currPage < this.data.totalPage) {
      this.setData({
        currPage: this.data.currPage * 1 + 1
      });
      console.log(this.data.currPage);
      this.getLists();
    } else {
      console.log("已经是最后一页");
    }
  },
})