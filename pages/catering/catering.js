// pages/catering/catering.js
let datas = [{
  "goodsid": "260",
  "goodsname": "精品青豆1",
  "goodsimg": "../../image/catering-01.jpg",
  "shopprice": "1580.00",
  "goodsspec": "精品新品",
  "goodssort": "800",
  "createtime": "2018-07-03 12:00:51",
  }, {
  "goodsid": "261",
  "goodsname": "精品青豆1",
  "goodsimg": "../../image/catering-02.jpg",
  "shopprice": "158.00",
  "goodsspec": "精品新品",
  "goodssort": "800",
  "createtime": "2018-07-03 12:00:51",
    }, {
  "goodsid": "262",
  "goodsname": "精品青豆1",
  "goodsimg": "../../image/catering-01.jpg",
  "shopprice": "1580.00",
  "goodsspec": "精品新品",
  "goodssort": "800",
  "createtime": "2018-07-03 12:00:51",
  }, {
  "goodsid": "260",
  "goodsname": "精品青豆1",
  "goodsimg": "../../image/catering-01.jpg",
  "shopprice": "1580.00",
  "goodsspec": "精品新品",
  "goodssort": "800",
  "createtime": "2018-07-03 12:00:51",
  }, {
  "goodsid": "261",
  "goodsname": "精品青豆1",
  "goodsimg": "../../image/catering-02.jpg",
  "shopprice": "158.00",
  "goodsspec": "精品新品",
  "goodssort": "800",
  "createtime": "2018-07-03 12:00:51",
    }, {
  "goodsid": "262",
  "goodsname": "精品青豆1",
  "goodsimg": "../../image/catering-01.jpg",
  "shopprice": "1580.00",
  "goodsspec": "精品新品",
  "goodssort": "800",
  "createtime": "2018-07-03 12:00:51",
  }, {
  "goodsid": "260",
  "goodsname": "精品青豆2",
  "goodsimg": "../../image/catering-01.jpg",
  "shopprice": "1580.00",
  "goodsspec": "精品新品",
  "goodssort": "800",
  "createtime": "2018-07-03 12:00:51",
  }, {
  "goodsid": "261",
  "goodsname": "精品青豆2",
  "goodsimg": "../../image/catering-02.jpg",
  "shopprice": "158.00",
  "goodsspec": "精品新品",
  "goodssort": "800",
  "createtime": "2018-07-03 12:00:51",
    }, {
  "goodsid": "262",
  "goodsname": "精品青豆2",
  "goodsimg": "../../image/catering-01.jpg",
  "shopprice": "1580.00",
  "goodsspec": "精品新品",
  "goodssort": "800",
  "createtime": "2018-07-03 12:00:51",
  }, {
  "goodsid": "263",
  "goodsname": "精品青豆2",
  "goodsimg": "../../image/catering-02.jpg",
  "shopprice": "158.00",
  "goodsspec": "精品新品",
  "goodssort": "800",
  "createtime": "2018-07-03 12:00:51",
    }, {
  "goodsid": "262",
  "goodsname": "精品青豆2",
  "goodsimg": "../../image/catering-01.jpg",
  "shopprice": "1580.00",
  "goodsspec": "精品新品",
  "goodssort": "800",
  "createtime": "2018-07-03 12:00:51",
  }, {
  "goodsid": "263",
  "goodsname": "精品青豆2",
  "goodsimg": "../../image/catering-02.jpg",
  "shopprice": "158.00",
  "goodsspec": "精品新品",
  "goodssort": "800",
  "createtime": "2018-07-03 12:00:51",
    }];
let lists = [{
  listName: "超市精品1",
  listId: "101",
}, {
  listName: "超市精品2",
  listId: "102",
}, {
  listName: "超市精品3",
  listId: "103",
}, {
  listName: "超市精品4",
  listId: "104",
}, {
  listName: "超市精品5",
  listId: "105",
}];
Page({

  data: {
    datas: [], //商品数组
    lists: [], //商品分类数组
    //遮罩层
    mask: {
      opacity: 0,
      display: 'none'
    },
    num:0,
    //弹窗
    returnDeposit: {
      translateY: 'translateX(1500px)',
      opacity: 1
    },
    imgUrls: ['../../image/banner.jpg', '../../image/banner.jpg'], //轮播图
  },
  onLoad: function(options) {
    //商品分类模拟接口
    this.setData({
      lists: lists
    })
    console.log(this.data.lists)
  },
  onShow(){
    this.getLists();
    var shop_cart = wx.getStorageSync('shop_cart');
    if (shop_cart){
      var len = shop_cart.length;
      console.log(len)
      this.setData({
        num:len
      })
    }
  },
  // 进入购物车
  go_cart() {
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  //商品接口
  getLists() {
    // let datasShop = datas.splice(0, 6);
    // console.log(datasShop);
    //商品模拟接口
    this.setData({
      datas: datas   //this.data.datas.concat(datasShop)
    });
    console.log(this.data.datas);
  },
  //跳转详情
  go_detail: function(e) {
    console.log(e)
    wx.navigateTo({
      url: `./shopDetails/shopDetails?goosid=${e.currentTarget.dataset.goodsid}`
    })
  },
  //弹窗显示
  bindtapMasks() {
    let mask = this.data.mask,
      returnDeposit = this.data.returnDeposit;
    mask.display = 'block';
    this.setData({ mask });
    mask.opacity = 1;
    returnDeposit.translateY = 'translateX(0)';
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
      returnDeposit.translateY = 'translateX(1500px)';
      this.setData({ mask, returnDeposit });
    }, 500);
  },
  //上拉加载
  onReachBottom: function() {
  //   console.log("上拉加载");
  //   wx.showLoading({
  //     title: '加载中',
  //   })
  //   this.getLists();
  //   setTimeout(function() {
  //     wx.hideLoading()
  //   }, 500)
  },
})