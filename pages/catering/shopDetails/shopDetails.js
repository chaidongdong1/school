// pages/shopDetails/shopDetails.js
let datas = {
  "goodsid": "260",
  "goodsname": "可口可乐",
  "goodsimg": "/image/catering-01.jpg",
  "price": "5.00",
  'stock':999,
  "goodsspec": "精品新品",
  "goodssort": "800", //存货量
  "createtime": "2018-07-03 12:00:51",
  "goodsfahuo": "一号公寓三楼超市",
  "goodsping": "300", //评价数量
  "goodsCanshu": {
    goodsCanname: "可口可乐",
    goodsCanNumber: "154100221",
    goodsCanlei: "饮品类",
    goodsCanshou: "商品售后商品售后商品售后商品售后",
  }, 
  // "goodsKouwei": {
  //   goodsKouname: "口味",
  //   goodsKou: [{
  //     goodsKou: "原味",
  //     goodssort: "100",
  //   }, {
  //     goodsKou: "樱桃味",
  //     goodssort: "200",
  //   }, {
  //     goodsKou: "荔枝味",
  //     goodssort: "300",
  //   }]
  // },
  // "goodsGuige": {
  //   goodsGuiname: "规格",
  //   goodsGui: [{
  //     goodsGui: "150ml",
  //     goodsGuiMoney: "99.00",
  //     goodssort: "100",
  //   }, {
  //     goodsGui: "250ml",
  //     goodsGuiMoney: "129.00",
  //     goodssort: "200",
  //   }, {
  //     goodsGui: "400ml",
  //     goodsGuiMoney: "159.00",
  //     goodssort: "300",
  //   }]
  // },
};
let goodsid;
Page({

  data: {
    //遮罩层
    mask: {
      opacity: 0,
      display: 'none',
      goods_id:''
    },
    //弹窗
    returnDeposit: {
      translateY: 'translateY(1500px)',
      opacity: 1
    },
    datas: '', //商品详情
    guiGeNumber:0,     //弹窗里商品规格下标
    KouweiNumber:0,    //弹窗里口味下标
    numbers: 1, //商品数量
    swiperIndexs: 0, //商品详情和规格参数的下标
    imgUrls: ['/image/shopdetails.jpg', '/image/shopdetails.jpg'], //轮播图
  },
  onLoad: function(options) {
    console.log(options);
    goodsid = options.goodsid;
    console.log(goodsid)
    this.setData({
      datas: datas
    })
    console.log(this.data.datas)
  },
  // 进入购物车
  go_cart(){
    wx.switchTab({
      url: '../cart/cart',
    })
  },

  //点击规格
  bindtapGui(e){
    console.log(e);
    let guiGe = e.currentTarget.dataset.index;
    this.setData({
      guiGeNumber:guiGe
    })
    console.log(this.data.datas.goodsGuige.goodsGui)
    console.log()
  },
  //点击口味
  bindtapKou(e){
    console.log(e);
    let Kouwei = e.currentTarget.dataset.index;
    this.setData({
      KouweiNumber:Kouwei
    })
  },
  // 加入购物车
  addcart(){
    var numbers = this.data.numbers;
    var datas = this.data.datas;
    var goodsimg = datas.goodsimg;
    var goodsname = datas.goodsname;
    var price = datas.price;
    console.log(goodsid)
    var cart_item = { goods_id: goodsid, name: goodsname, img: goodsimg, price: price, num: numbers,info:'规格：500ml'};
    var shop_cart = wx.getStorageSync('shop_cart');
    var test = true;
    if (shop_cart){
      var len = shop_cart.length;
      if(len>0){
        for(var i=0;i<len;i++){
          if (goodsid == shop_cart[i].goods_id){
            shop_cart[i].num += numbers;
            test = false;
          }
        }
      }
      if (test){
        shop_cart.push(cart_item);
      }
    }else{
      shop_cart = [];
      shop_cart.push(cart_item);
    }
    wx.setStorageSync('shop_cart', shop_cart);
    wx.showToast({
      title: '加入购物车成功',
    })
  },
  // 立即购买
  buy_now() {
    var numbers = this.data.numbers;
    var datas = this.data.datas;
    var goodsimg = datas.goodsimg;
    var goodsname = datas.goodsname;
    var price = datas.price;
    console.log(goodsid)
    var cart_item = { goods_id: goodsid, name: goodsname, img: goodsimg, price: price, num: numbers, info: '规格：500ml' };
    wx.setStorageSync('shop_buy', cart_item);
    wx.navigateTo({
      url: '../../submitOrder/submitOrder?type=1',
    })
  },
  //点击显示商品详情
  shopDetail() {
    this.setData({
      swiperIndexs: 0,
    })
  },
  //点击显示规格参数
  shopSize() {
    this.setData({
      swiperIndexs: 1,
    })
  },
  //商品数量减少
  bindtapJian() {
    if (this.data.numbers <= 1) {
      wx.showToast({
        title: '数量不能小于1',
        image: '/image/warning.png',
        duration: 1500
      })
    } else {
      let numbersJian = this.data.numbers * 1 - 1;
      this.setData({
        numbers: numbersJian
      })
    }
  },
  //商品数量减少
  bindtapJia() {
    let numbersJia = this.data.numbers * 1 + 1;
    this.setData({
      numbers: numbersJia
    })
  },
  // 确定
  confrim() {
    this.bindtapClose();
    var type = this.data.type;
    if(type==0){
      this.addcart();
    }else{
      this.buy_now();
    }
  },
  //弹窗显示
  bindtapMasks(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      type:index
    })
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
})