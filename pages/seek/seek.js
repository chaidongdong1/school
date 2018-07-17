// pages/seek/seek.js
const app = getApp();
Page({

  data: {
    datas: [], //商品数组
    value: '', //用户输入的内容
    baseUrl: app.globalData.baseUrl, //图片路径
    finish: false, //是否输入完成
    currPage: 1, //当前页数
    totalPage: '', //总页数
  },
  onLoad: function(options) {

  },
  //input输入框的内容
  bindText(e) {
    console.log(e);
    this.setData({
      value: e.detail.value,
      datas: [],
      finish: false
    });
  },
  //输入框失去焦点时
  bindJiaodian(e) {
    console.log(e);
    this.setData({
      value: e.detail.value
    });
    this.bindButton();
  },
  //点击搜索按钮
  bindButton() {
    this.setData({
      datas: [], //商品数组
      currPage: 1, //当前页数
      totalPage: '', //总页数
    });
    this.getLists();
  },
  //搜索结果
  getLists() {
    if (!this.data.value) {
      this.setData({
        datas: [],
        finish: true, //是否输入完成
      });
    } else {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        method: 'POST',
        url: `${app.globalData.api}goods/goodsList`,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          schoolId: 1,
          proType: 1,
          shopId: 1,
          name: this.data.value,
          page: this.data.currPage,
        },
        success: res => {
          console.log(res);
          wx.hideLoading();
          this.setData({
            datas: this.data.datas.concat(res.data.data.root),
            currPage: res.data.data.currPage,
            totalPage: res.data.data.totalPage,
            finish: true
          });
        }
      });
    }
  },
  //点击商品跳转到详情
  go_detail(e) {
    console.log(e);
    let goodsid = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: `../catering/shopDetails/shopDetails?goodsid=${goodsid}`
    })
  },
  //上拉加载
  onReachBottom: function() {
    if (this.data.currPage < this.data.totalPage) {
      this.setData({
        currPage: this.data.currPage * 1 + 1
      });
      this.getLists();
      console.log(this.data.currPage);
    } else {
      console.log("已经是最后一页");
    }
  },
})