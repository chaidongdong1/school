// pages/submitOrder/submitOrder.js
Page({

  data: {
    //遮罩层
    mask: {
      opacity: 0,
      display: 'none'
    },
    //弹窗
    returnDeposit: {
      translateY: 'translateY(-1500px)',
      opacity: 1
    },
    insurance:1,   //保险选择开关
    address:'',
    shop_goods:[],
    water:[],
  },
  onLoad: function (options) {  // type 1 超市； 2 水；  3餐饮 ; 0 购物车
    console.log(options)
    var type = options.type;
    if (type==1){
      var shop_goods = [];
      var shop_buy = wx.getStorageSync('shop_buy');
      shop_goods.push(shop_buy);
      this.setData({
        shop_goods: shop_goods
      })
    }

    if (type == 2) {
      var water = [];
      var water_buy = wx.getStorageSync('water_buy');
      water.push(water_buy);
      this.setData({
        water: water
      })
    }
  },
  onShow: function (options) {
    var default_address = wx.getStorageSync('default_address');
    if (default_address){
      this.setData({
        address : default_address
      })
    }
  },
  choose_address(){
    wx.navigateTo({
      url: '../address/address'
    })
  },
  //选择保险费开关
  switch1Change(e){
    console.log(e)
    let insurance = e.detail.value == true ? 1 : 0;
    console.log(insurance)
    this.setData({
      insurance:insurance
    })
  },
  //弹窗显示
  bindtapMasks() {
    let mask = this.data.mask,
      returnDeposit = this.data.returnDeposit;
    mask.display = 'block';
    this.setData({ mask });
    mask.opacity = 1;
    returnDeposit.translateY = 'translateY(-350rpx)';
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
      returnDeposit.translateY = 'translateY(-1500px)';
      this.setData({ mask, returnDeposit });
    }, 500);
  },
})