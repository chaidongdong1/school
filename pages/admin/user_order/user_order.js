// pages/admin/user_order/user_order.js
let datas = {
  lists: [{
    listsName: "全部",
    listsNumber: "6666",
  }, {
    listsName: "待受理",
    listsNumber: "66",
  }, {
    listsName: "配送中",
    listsNumber: "600",
  }, {
    listsName: "已完成",
    listsNumber: "6000",
  }],
  stats: [{
    statsId: "121",
    statsType: "0",
    statsName: "别离开1",
    statsHead: "../../../image/user_img.png",
    statsStats:"0",   //超市订单
    statsNumber:"3",   //订单数量
    statsDate: "2018-07-10 12:01:30",
  }, {
    statsId: "122",
    statsType: "1",
    statsName: "别离开2",
    statsHead: "../../../image/user_img.png",
    statsStats:"1",   //超市订单
    statsNumber:"1",   //订单数量
    statsDate: "2018-07-10 12:01:30",
  }, {
    statsId: "123",
    statsType: "2",
    statsName: "别离开3",
    statsHead: "../../../image/user_img.png",
    statsStats:"2",   //超市订单
    statsNumber:"1",   //订单数量
    statsDate: "2018-07-10 12:01:30",
  }, {
    statsId: "124",
    statsType: "0",
    statsName: "别离开4",
    statsHead: "../../../image/user_img.png",
    statsStats:"3",   //超市订单
    statsNumber:"3",   //订单数量
    statsDate: "2018-07-09 12:01:30",
  }, {
    statsId: "125",
    statsType: "0",
    statsName: "别离开5",
    statsHead: "../../../image/user_img.png",
    statsStats:"0",   //超市订单
    statsNumber:"1",   //订单数量
    statsDate: "2018-07-09 12:01:30",
  }, {
    statsId: "126",
    statsType: "1",
    statsName: "别离开6",
    statsHead: "../../../image/user_img.png",
    statsStats:"2",   //超市订单
    statsNumber:"2",   //订单数量
    statsDate: "2018-07-08 12:01:30",
  }, {
    statsId: "127",
    statsType: "1",
    statsName: "别离开7",
    statsHead: "../../../image/user_img.png",
    statsStats:"3",   //超市订单
    statsNumber:"4",   //订单数量
    statsDate: "2018-07-08 12:01:30",
  }, {
    statsId: "121",
    statsType: "2",
    statsName: "别离开8",
    statsHead: "../../../image/user_img.png",
    statsStats:"2",   //超市订单
    statsNumber:"3",   //订单数量
    statsDate: "2018-07-08 12:01:30",
  }, {
    statsId: "128",
    statsType: "2",
    statsName: "别离开9",
    statsHead: "../../../image/user_img.png",
    statsStats:"1",   //超市订单
    statsNumber:"3",   //订单数量
    statsDate: "2018-07-09 12:01:30",
  }, {
    statsId: "129",
    statsType: "0",
    statsName: "别离开10",
    statsHead: "../../../image/user_img.png",
    statsStats:"0",   //超市订单
    statsNumber:"3",   //订单数量
    statsDate: "2018-07-10 12:01:30",
  }, {
    statsId: "130",
    statsType: "0",
    statsName: "别离开11",
    statsHead: "../../../image/user_img.png",
    statsStats:"2",   //超市订单
    statsNumber:"3",   //订单数量
    statsDate: "2018-07-09 12:01:30",
  }, {
    statsId: "121",
    statsType: "1",
    statsName: "别离开12",
    statsHead: "../../../image/user_img.png",
    statsStats:"3",   //超市订单
    statsNumber:"3",   //订单数量
    statsDate: "2018-07-09 12:01:30",
  }, {
    statsId: "131",
    statsType: "1",
    statsName: "别离开13",
    statsHead: "../../../image/user_img.png",
    statsStats:"1",   //超市订单
    statsNumber:"3",   //订单数量
    statsDate: "2018-07-10 12:01:30",
  }, {
    statsId: "132",
    statsType: "2",
    statsName: "别离开14",
    statsHead: "../../../image/user_img.png",
    statsStats:"2",   //超市订单
    statsNumber:"3",   //订单数量
    statsDate: "2018-07-09 12:01:30",
  }, {
    statsId: "133",
    statsType: "2",
    statsName: "别离开15",
    statsHead: "../../../image/user_img.png",
    statsStats:"3",   //超市订单
    statsNumber:"3",   //订单数量
    statsDate: "2018-07-08 12:01:30",
  }, ],
};
Page({

  data: {
    choose: 0, //导航下标
    date: '请选择时间', //时间选择器
    lists: [], //导航
    datas: [], //内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //导航列表
    this.setData({
      lists: datas.lists
    });
    //页面内容渲染
    this.setData({
      datas: datas.stats
    });
  },

  onShow: function () {
  
  },

  
  tab_choose: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      choose: index
    });
    this.clear();
  },
  clear() {
    if (this.data.choose == 1) {
      this.setData({
        date: '请选择时间',
        datas: datas.stats.filter(item => item.statsType == 0)
      });
    } else if (this.data.choose == 2) {
      this.setData({
        date: '请选择时间',
        datas: datas.stats.filter(item => item.statsType == 1)
      });
    } else if (this.data.choose == 3) {
      this.setData({
        date: '请选择时间',
        datas: datas.stats.filter(item => item.statsType == 2)
      });
    } else {
      this.setData({
        date: '请选择时间',
        datas: datas.stats
      });
    }
  },
  //时间选择器
  bindDateChange: function(e) {
    this.clear();
    //获取当前日期
    var now = new Date(); //js获取时间
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth() + 1; //得到月份
    var datess = now.getDate(); //得到日期
    if (month * 1 < 10) {
      month = "0" + month;
    }
    if (datess * 1 < 10) {
      datess = "0" + datess;
    }
    var dates = year + "-" + month + "-" + datess;
    this.setData({
      date: dates
    });
    console.log(dates);
    console.log(this.data.date);
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      date: e.detail.value
    });
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      datas: this.data.datas.filter(item => item.statsDate.slice(0,10) == this.data.date)
    });
    setTimeout(function() {
      wx.hideLoading();
    }, 500);
  },
  onShareAppMessage: function () {
  
  }
})