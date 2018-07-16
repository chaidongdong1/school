// pages/meal/shop/shop.js
var list = [{
  "name": "热销", "arr": [{ "id": "1", "name": "清炒莴笋丝", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "2", "name": "清炒莴笋丝2", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "3", "name": "清炒莴笋丝3", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "4", "name": "清炒莴笋丝2", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "5", "name": "清炒莴笋丝2", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "6", "name": "清炒莴笋丝2", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" }]
},
{
  "name": "特色菜1", "arr": [{ "id": "25", "name": "清炒莴笋丝", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "36", "name": "清炒莴笋丝2", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "7", "name": "清炒莴笋丝3", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "8", "name": "清炒莴笋丝4", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" }]
},
{
  "name": "特色菜2", "arr": [{ "id": "9", "name": "清炒莴笋丝", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "10", "name": "清炒莴笋丝2", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "11", "name": "清炒莴笋丝7", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "12", "name": "清炒莴笋丝2", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" }]
},
{
  "name": "特色菜3", "arr": [{ "id": "13", "name": "清炒莴笋丝", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "14", "name": "清炒莴笋丝2", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "15", "name": "清炒莴笋丝3", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "16", "name": "清炒莴笋丝9", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" }]
},
{
  "name": "特色菜4", "arr": [{ "id": "17", "name": "清炒莴笋丝", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "18", "name": "清炒莴笋丝2", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "19", "name": "清炒莴笋丝5", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "20", "name": "清炒莴笋丝2", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" }]
},
{
  "name": "特色菜5", "arr": [{ "id": "21", "name": "清炒莴笋丝", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "22", "name": "清炒莴笋丝6", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "23", "name": "清炒莴笋丝3", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" },
  { "id": "24", "name": "清炒莴笋丝2", "price": "32.00", "num": 0, "detail": "配料油、盐，口味清淡", "img": "/image/index-shop1.jpg" }]
}]
Page({
  data: {
    show:0,
    goods_list:'',
    total_price:0,
    num:0,
    shop_id:0,
    shop_name:'山西刀削面'
  },
  onLoad: function (options) {
    console.log(options)
    var shop_id = options.shop_id;
    this.setData({
      shop_id: shop_id
    })
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var width = res.windowWidth;
        var height = res.windowHeight;
        var new_height = height - width/750*431;
        that.setData({
          height: new_height
        })
      }
    }) 
    var dining = wx.getStorageSync('dining');
    var test = true;
    if (dining) {
      var len = dining.length;
      for (var i = 0; i < len; i++) {
        if (dining[i].shop_id == shop_id) {
          var d_item = dining[i].val;
          this.load(d_item);
          test = false;
          len = i;
        }
      }
    }
    if (test){
      this.load(list);
    }
    var dining_shop_cart = wx.getStorageSync("dining_shop_cart");
    
    if (dining_shop_cart) {
      var len = dining_shop_cart.length;
      for (var i = 0; i < len; i++) {
        if (dining_shop_cart[i].shop_id == shop_id) {
          var dining_cart_item = dining_shop_cart[i].val;
          if (dining_cart_item) {
            var len2 = dining_cart_item.length;
            var total_price = 0;
            var num = 0;
            for (var j = 0; j < len2; j++) {
              var num2 = parseInt(dining_cart_item[j].num);
              total_price += parseFloat(dining_cart_item[j].price) * num2;
              num += num2;
            }
            total_price = total_price.toFixed(2);
            this.setData({
              num: num,
              total_price: total_price
            })
          }
          len = i;
        }
      }
    }

    
  },
  // 数据渲染
  load(list){
    this.setData({
      goods_list:list
    })
  },
  // 左侧菜单点击
  active:function(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      show:index
    })
  },
  // 增加商品数量
  add(e){
    var index = e.currentTarget.dataset.index;
    var show = this.data.show;
    var goods_list = this.data.goods_list;
    var goods_info = goods_list[show].arr[index];
    var num = goods_info.num;
    var id = goods_info.id;
    var price = goods_info.price;
    var detail = goods_info.detail;
    var name = goods_info.name;
    var img = goods_info.img;
    num++;
    goods_list[show].arr[index].num = num;
    var shop_id = this.data.shop_id;
    var dining_item = { shop_id: shop_id, val: goods_list};
    var dining = wx.getStorageSync('dining');
    if (dining){
      var test_dining = true;
      var len = dining.length;
      for(var i=0;i<len;i++){
        if (dining[i].shop_id == shop_id){
          dining.splice(i, 1, dining_item);
          test_dining = false;
          len = i;
        }
      }
      if (test_dining){
        dining.push(dining_item);
      }
    }else{
      dining = [];
      dining.push(dining_item);
    }
    wx.setStorageSync('dining', dining);
    this.setData({
      goods_list: goods_list
    })
    this.shopcar(id, name, price, 1, detail, img);
  },
  // 减少商品数量
  sub(e) {
    var index = e.currentTarget.dataset.index;
    var show = this.data.show;
    var goods_list = this.data.goods_list;
    var goods_info = goods_list[show].arr[index];
    var num = goods_info.num;
    var id = goods_info.id;
    var price = goods_info.price;
    var detail = goods_info.detail;
    var name = goods_info.name;
    var img = goods_info.img;
    num--;
    goods_list[show].arr[index].num = num;
    var shop_id = this.data.shop_id;
    var dining_item = { shop_id: shop_id, val: goods_list };
    var dining = wx.getStorageSync('dining');
    if (dining) {
      var len = dining.length;
      for (var i = 0; i < len; i++) {
        if (dining[i].shop_id == shop_id) {
          dining.splice(i, 1, dining_item);
        }
      }
    } else {
      dining = [];
      dining.push(dining_item);
    }
    wx.setStorageSync('dining', dining);
    this.setData({
      goods_list: goods_list
    })
    this.shopcar(id, name, price, -1, detail, img);
  },
  // 计算总价
  shopcar(id2, name, price, num2, detail, img){
    var total_price = this.data.total_price;
    total_price = parseFloat(total_price) + parseFloat(price) * num2;
    total_price = total_price.toFixed(2);
    this.setData({
      total_price: total_price
    })
    var shop_id = this.data.shop_id;
    var dining_shop_cart = wx.getStorageSync('dining_shop_cart');
    var config = 0;
    var item_val = {
      'id': id2,
      'name': name,
      'price': price,
      'num': 1,
      "detail": detail,
      "img": img
    };
    var shop_name = this.data.shop_name;
    if (dining_shop_cart) {
      var len = dining_shop_cart.length;
      if(len>0){
        for (var i = 0; i < len; i++) {
          if (dining_shop_cart[i].shop_id == shop_id) {
            var dining_cart_item = dining_shop_cart[i].val;
            if (dining_cart_item) {
              var len2 = dining_cart_item.length;
              for (var j = 0; j < len2; j++) {
                if (dining_cart_item[j].id == id2) {
                  dining_shop_cart[i].val[j].num = parseInt(dining_cart_item[j].num) + num2;
                  if (dining_shop_cart[i].val[j].num <= 0) {
                    dining_shop_cart[i].val.splice(j, 1);
                    len2--;
                  }
                  config = 1;
                  // console.log(dining_shop_cart)
                }
              }
            }
            if (config == 0) {
              dining_shop_cart[i].val.push(item_val);
              config = 1;
            }
            len = i;
          }
        }
        if (config==0){
          var new_item = { shop_id: shop_id, shop_name: shop_name, val: [] };
          new_item.val.push(item_val);
          dining_shop_cart.push(new_item);
          config = 1;
        }
      }
    }
    if (config == 0) {
      dining_shop_cart = [];
      var new_item = { shop_id: shop_id, shop_name: shop_name, val: [] };
      new_item.val.push(item_val);
      dining_shop_cart.push(new_item)
    }
    

    var num = this.data.num;
    num = num + num2;
    this.setData({
      num:num
    })

    
    wx.setStorageSync("dining_shop_cart", dining_shop_cart);
  },
  // 去结算
  to_pay(){
    var num = this.data.num;
    if(num>0){
      wx.navigateTo({
        url: '../../submitOrder/submitOrder?type=3'
      })
    }
  }
})