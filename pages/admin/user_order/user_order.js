var app = getApp();
Page({

  data: {
    choose: 0, //导航下标
    date: '请选择时间', //时间选择器
    lists: [], //导航
    datas: [], //内容
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
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
  }
})