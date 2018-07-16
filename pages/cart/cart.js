// pages/cart/cart.js

// 备注
// type=0 超市订单 ； type=1 送水订单； 
Page({
  data: {  
    w_check_all: false, 
    g_check_all: false,
    control:0,
    val:"编辑",   
    del:false,
    water_cart:[],
    shop_cart:[],
    show:false,
    order: [{ type: 0, val: [] }, { type: 1, val: [] }],
    total:'0.00',
    g_total:'0.00',
    w_total:'0.00'
  },
  onLoad: function (options) {
 
  },
  // 计算总价
  total(type){
    console.log(type)
    if (type == 1) {  // 超市改变
      var w_total = parseFloat(this.data.w_total);
      var shop_cart = this.data.shop_cart;
      var g_total = 0;
      var len = shop_cart.length;
      if (len>0){
        for(var i=0;i<len;i++){
          if (shop_cart[i].active){
            g_total += parseFloat(shop_cart[i].price) * shop_cart[i].num;
            console.log(g_total)
          }
        }
      }
      console.log(w_total)
      var total = g_total + w_total;
      total = total.toFixed(2);
      console.log(total)
      this.setData({
        total: total,
        g_total: g_total
      })
    } else {  // 水改变
      var g_total = parseFloat(this.data.g_total);
      var water_cart = this.data.water_cart;
      var w_total = 0;
      var len = water_cart.length;
      if (len > 0) {
        for (var i = 0; i < len; i++) {
          if (water_cart[i].active) {
            w_total += parseFloat(water_cart[i].price) * water_cart[i].num;
          }
        }
      }
      var total = g_total + w_total;
      total = total.toFixed(2);
      this.setData({
        total: total,
        w_total: w_total
      })
    }
    

  },
  // 去结算
  buy_cart(){
    // 桶装水
    wx.removeStorageSync('water_buy');
    var w_check_all = this.data.w_check_all;
    var water_cart = this.data.water_cart;
    console.log(water_cart)
    var water_cart2 = water_cart.slice(0);
    var water_cart3 = [];
    var control1 = false;
    if (w_check_all){
      water_cart3 = water_cart2;
      control1 = true;
    }else{
      if (water_cart) {
        var w_len = water_cart.length;
        if (w_len > 0) {
          for (var i = 0; i < w_len; i++) {
            if (water_cart[i].active) {
              water_cart3.concat(water_cart2.splice(i, 1));
              control1 = true;
            }
          }
        }
      }
    }
    if (control1){
      wx.setStorageSync('water_buy', water_cart3);
    }

    // 超市商品
    wx.removeStorageSync('shop_buy');
    var g_check_all = this.data.g_check_all;
    var shop_cart = this.data.shop_cart;
    var shop_cart2 = shop_cart.slice(0);
    var shop_cart3 = [];
    var control2 = false;
    if (w_check_all) {
      shop_cart3 = shop_cart2;
      control2 = true;
    } else {
      if (shop_cart) {
        var w_len = shop_cart.length;
        if (w_len > 0) {
          for (var i = 0; i < w_len; i++) {
            if (shop_cart[i].active) {
              shop_cart3.concat(shop_cart2.splice(i, 1));
              control2 = true;
            }
          }
        }
      }
    }
    if (control1) {
      wx.setStorageSync('water_buy', water_cart3);
    }
    if (control2) {
      wx.setStorageSync('shop_buy', shop_cart3);
    }

    if (control1|| control2) {
      wx.navigateTo({
        url: '../submitOrder/submitOrder?type=0'
      })
    } else {
      wx.showToast({
        title: '您还未选择任何商品',
        icon: 'none'
      })
    }
  },
  // 删除
  del() {
    this.setData({
      total:0,
      g_total: 0,
      w_total: 0
    })
    var control1 = false;
    var control2 = false;
    // 桶装水
    var water_cart = this.data.water_cart;
    var water_cart2 = water_cart.slice(0);
    console.log(water_cart)
    if (water_cart){
      var w_len = water_cart.length;
      if (w_len>0){
        for(var i=0;i<w_len;i++){
          if (water_cart[i].active){
            water_cart2.splice(i,1);
            control1 = true;
          }
        }
      }
      wx.setStorageSync('water_cart', water_cart2);
      this.setData({
        water_cart: water_cart2
      })
    }
    // 超市商品
    var shop_cart = this.data.shop_cart;
    var shop_cart2 = shop_cart.slice(0);
    if (shop_cart) {
      var w_len = shop_cart.length;
      if (w_len > 0) {
        for (var i = 0; i < w_len; i++) {
          if (shop_cart[i].active) {
            shop_cart2.splice(i, 1);
            control2 = true;
          }
        }
      }
      wx.setStorageSync('shop_cart', shop_cart2);
      this.setData({
        shop_cart: shop_cart2
      })
    }
    var len1 = water_cart2.length;
    var len2 = shop_cart2.length;
    if (len1 == 0 && len2==0){
      this.setData({
        show:false
      })
    }

    
    if (control1 || control2){
      wx.showToast({
        title: '删除成功',
        icon:'none'
      })
    }
  },
  //超市商品全选
  g_active_all(e) {
    var shop_cart = this.data.shop_cart;
    var g_check_all = this.data.g_check_all;
    var len = shop_cart.length;
    if (g_check_all){
      for (var i = 0; i < len; i++) {
        shop_cart[i].active = false;
      }
    } else {
      for (var i = 0; i < len; i++) {
        shop_cart[i].active = true;
      }
    }
    this.setData({
      shop_cart: shop_cart,
      g_check_all: !g_check_all
    })
    this.total(1);
  },
  // 超市商品选择
  g_active(e) {
    var index = e.currentTarget.dataset.index;
    var shop_cart = this.data.shop_cart;
    var active = shop_cart[index].active;
    if (active) {
      shop_cart[index].active = false;
    } else {
      shop_cart[index].active = true;
    }
    console.log(shop_cart)
    this.setData({
      shop_cart: shop_cart
    })
    this.total(1);
    this.isChoose2();
  },
  // 超市商品数量增加
  g_add(e) {
    var index = e.currentTarget.dataset.index;
    var shop_cart = this.data.shop_cart;
    shop_cart[index].num += 1;
    wx.setStorageSync('shop_cart', shop_cart);
    this.setData({
      shop_cart: shop_cart
    })
    this.total(1);
  },
  // 超市商品数量减少
  g_sub(e) {
    var index = e.currentTarget.dataset.index;
    var shop_cart = this.data.shop_cart;
    if (shop_cart[index].num > 1) {
      shop_cart[index].num -= 1;
      wx.setStorageSync('shop_cart', shop_cart);
      this.setData({
        shop_cart: shop_cart
      })
      this.total(1);
    } else {
      wx.showToast({
        title: '商品数量不能小于1',
        icon: 'none',
        duration: 1500
      })
    }
  },
  // 超市产品是否全选
  isChoose2() {
    var shop_cart = this.data.shop_cart;
    var len = shop_cart.length;
    var count = 0;
    for (var i = 0; i < len; i++) {
      if (shop_cart[i].active) {
        count++;
      }
    }
    if (count == len) {
      var g_check_all = true;
    } else {
      var g_check_all = false;
    }
    this.setData({
      g_check_all: g_check_all
    })
  },
  //桶装水全选
  w_active_all(e) {
    var water_cart = this.data.water_cart;
    var w_check_all = this.data.w_check_all;
    var len = water_cart.length;
    if (w_check_all) {
      for (var i = 0; i < len; i++) {
        water_cart[i].active = false;
      }
    } else {
      for (var i = 0; i < len; i++) {
        water_cart[i].active = true;
      }
    }
    this.setData({
      water_cart: water_cart,
      w_check_all: !w_check_all
    })
    this.total(2);
  },
  // 桶装水选择
  w_active(e) {
    var index = e.currentTarget.dataset.index;
    var water_cart = this.data.water_cart;
    var active = water_cart[index].active;
    if (active){
      water_cart[index].active = false;
    }else{
      water_cart[index].active = true;
    }
    console.log(water_cart)
    this.setData({
      water_cart: water_cart
    })
    this.isChoose();
    this.total(2);
  },
  // 水是否全选
  isChoose(){
    var water_cart = this.data.water_cart;
    var len = water_cart.length;
    var count = 0;
    for(var i=0;i<len;i++){
      if (water_cart[i].active){
        count++;
      }
    }
    if (count == len){
      var w_check_all = true;
    }else{
      var w_check_all = false;
    }
    this.setData({
      w_check_all: w_check_all
    })
  },
  // 桶装水数量增加
  w_add(e){
    var index = e.currentTarget.dataset.index;
    var water_cart = this.data.water_cart;
    water_cart[index].num += 1;
    wx.setStorageSync('water_cart', water_cart);
    this.setData({
      water_cart: water_cart
    })
    this.total(2);
  },
  // 桶装水数量减少
  w_sub(e) {
    var index = e.currentTarget.dataset.index;
    var water_cart = this.data.water_cart;
    if (water_cart[index].num>1){
      water_cart[index].num -= 1;
      wx.setStorageSync('water_cart', water_cart);
      this.setData({
        water_cart: water_cart
      })
      this.total(2);
    }else{
      wx.showToast({
        title: '商品数量不能小于1',
        icon:'none',
        duration: 1500
      })
    }
  },
  onShow: function () { 
    this.restore();

    
  },
  // 购物车还原
  restore(){
    // 桶装水
    var water_cart = wx.getStorageSync('water_cart');
    var len1 = water_cart.length;
    if (len1 > 0) {
      for (var i = 0; i < len1; i++) {
        water_cart[i].active = false;
      }
      this.setData({
        show: true,
        water_cart: water_cart
      })
    }

    // 超市商品
    var shop_cart = wx.getStorageSync('shop_cart');
    var len2 = shop_cart.length;
    if (len2 > 0) {
      for (var i = 0; i < len2;i++){
        shop_cart[i].active=false;
      }
      this.setData({
        show: true,
        shop_cart: shop_cart
      })
    }
    
  },
  // 立即添加
  go_index: function () {
    wx.navigateTo({
      url: '../catering/catering'
    })
  },
  // 编辑/删除
  amend: function () {
    var control = this.data.control;
    this.restore();
    if (control==0){
      this.setData({
        control:1,
        del:true,
        val: "完成"
      })
    }else{
      this.setData({
        control: 0,
        del: false,
        val: "编辑"
      })
    }
  },
  onShareAppMessage: function () {
  
  }
})