let datas = {
  lists: [{
    listsName: "全部",
    listsNumber: "6666",
  }, {
    listsName: "普通用户",
    listsNumber: "66",
  }, {
    listsName: "教师",
    listsNumber: "600",
  }, {
    listsName: "派单员",
    listsNumber: "6000",
  }],
  stats: [{
    statsId: "121",
    statsType: "0",
    statsName: "别离开1",
    statsHead: "../../../image/user_img.png",
    statsPhone: "1654134413",
    statsDate: "2018-07-09",
  }, {
    statsId: "122",
    statsType: "1",
    statsName: "别离开2",
    statsHead: "../../../image/user_img.png",
    statsPhone: "1654134413",
    statsDate: "2018-07-09",
  }, {
    statsId: "123",
    statsType: "2",
    statsName: "别离开3",
    statsHead: "../../../image/user_img.png",
    statsPhone: "1654134413",
    statsDate: "2018-07-09",
  }, {
    statsId: "124",
    statsType: "0",
    statsName: "别离开4",
    statsHead: "../../../image/user_img.png",
    statsPhone: "1654134413",
    statsDate: "2018-07-10",
  }, {
    statsId: "125",
    statsType: "0",
    statsName: "别离开5",
    statsHead: "../../../image/user_img.png",
    statsPhone: "1654134413",
    statsDate: "2018-07-09",
  }, {
    statsId: "126",
    statsType: "1",
    statsName: "别离开6",
    statsHead: "../../../image/user_img.png",
    statsPhone: "1654134413",
    statsDate: "2018-07-10",
  }, {
    statsId: "127",
    statsType: "1",
    statsName: "别离开7",
    statsHead: "../../../image/user_img.png",
    statsPhone: "1654134413",
    statsDate: "2018-07-09",
  }, {
    statsId: "121",
    statsType: "2",
    statsName: "别离开8",
    statsHead: "../../../image/user_img.png",
    statsPhone: "1654134413",
    statsDate: "2018-07-10",
  }, {
    statsId: "128",
    statsType: "2",
    statsName: "别离开9",
    statsHead: "../../../image/user_img.png",
    statsPhone: "1654134413",
    statsDate: "2018-07-08",
  }, {
    statsId: "129",
    statsType: "0",
    statsName: "别离开10",
    statsHead: "../../../image/user_img.png",
    statsPhone: "1654134413",
    statsDate: "2018-07-10",
  }, {
    statsId: "130",
    statsType: "0",
    statsName: "别离开11",
    statsHead: "../../../image/user_img.png",
    statsPhone: "1654134413",
    statsDate: "2018-07-10",
  }, {
    statsId: "121",
    statsType: "1",
    statsName: "别离开12",
    statsHead: "../../../image/user_img.png",
    statsPhone: "1654134413",
    statsDate: "2018-07-08",
  }, {
    statsId: "131",
    statsType: "1",
    statsName: "别离开13",
    statsHead: "../../../image/user_img.png",
    statsPhone: "1654134413",
    statsDate: "2018-07-10",
  }, {
    statsId: "132",
    statsType: "2",
    statsName: "别离开14",
    statsHead: "../../../image/user_img.png",
    statsPhone: "1654134413",
    statsDate: "2018-07-10",
  }, {
    statsId: "133",
    statsType: "2",
    statsName: "别离开15",
    statsHead: "../../../image/user_img.png",
    statsPhone: "1654134413",
    statsDate: "2018-07-08",
  }, ],
};
Page({

  data: {
    //遮罩层
    mask: {
      opacity: 0,
      display: 'none',
    },
    //弹窗
    returnDeposit: {
      translateY: 'translateY(1500px)',
      opacity: 1
    },
    choose: 0, //导航下标
    date: '请选择时间', //时间选择器
    lists: [], //导航
    datas: [], //内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //导航列表
    this.setData({
      lists: datas.lists
    });
    //页面内容渲染
    this.setData({
      datas: datas.stats
    });
  },

  onShow: function() {

  },

  //点击导航
  tab_choose: function(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      choose: index
    });
    this.clear();
  },
  clear(){
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
      datas: this.data.datas.filter(item => item.statsDate == this.data.date)
    });

    setTimeout(function() {
      wx.hideLoading();
    }, 500);
  },
  //弹窗显示
  bindtapMasks(e) {
    let mask = this.data.mask,
      returnDeposit = this.data.returnDeposit;
    mask.display = 'block';
    this.setData({ mask });
    mask.opacity = 1;
    returnDeposit.translateY = 'translateY(0)';
    returnDeposit.opacity = 1;
    this.setData({ mask, returnDeposit });
  },
  //关闭弹窗
  bindtapClose() {
    let mask = this.data.mask,
      returnDeposit = this.data.returnDeposit;
    mask.opacity = 0;
    returnDeposit.opacity = 0;
    this.setData({ mask, returnDeposit });
    setTimeout(() => {
      mask.display = 'none';
      returnDeposit.translateY = 'translateY(1500px)';
      this.setData({ mask, returnDeposit });
    }, 500);
  },
  onShareAppMessage: function() {

  }
})