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
    choose2:0,
    choose: 0,
    water: '',
    floor: '',
    freight:'0.00',
    numbers: 1, //商品数量
    swiperIndexs: 0, //商品详情和规格参数的下标
    imgUrls: ['../../image/shui.png', '../../image/shui.png'], //轮播图
    buy_type: '',
    list: [],
    list3: [],
    id: '',
    price: '',
    stock: '',
    record: [],
    total:''
  },
  onLoad: function (option) {
    var that = this;
    that.loadProductDetail();
  },
  // 加入购车、立即购买确定
  confirm: function (e) {
    var type = this.data.buy_type;
    var list = this.data.list;
    if (list[0]) {
      var specs = this.data.specs;
    } else {
      var specs = true;
    }
    if (specs) {
      if (type == 1) {
        this.buy_now();
      } else {
        this.addShopCart();
      }
      this.bindtapClose();
    } else {
      wx.showToast({
        title: '请选择规格',
        icon: 'none'
      })
    }
  },
  // 进入购物车
  go_cart(){
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  // 立即购买
  buy_now(){
    var price = this.data.price;
    var freight = this.data.freight;
    var u_price = parseFloat(price) + parseFloat(freight);
    var choose = this.data.choose;
    var choose2 = this.data.choose2;
    var water0 = this.data.water;
    var floor = this.data.floor;
    var numbers = this.data.numbers;
    var water_item = { specs: water0[choose].name, floor: floor[choose2].name, img: '/image/shui.png', price: u_price, num: numbers, name: "桶装水", choose: choose, choose2: choose2 };
    wx.setStorageSync('water_buy', water_item);
    wx.navigateTo({
      url: '../submitOrder/submitOrder?type=2'
    })
  },
  // 加入购物车
  addShopCart(){
    var price = this.data.price;
    var freight = this.data.freight;
    var u_price = parseFloat(price) + parseFloat(freight);
    var choose = this.data.choose;
    var choose2 = this.data.choose2;
    var water0 = this.data.water;
    var floor = this.data.floor;
    var numbers = this.data.numbers; 
    var water_item = { specs: water0[choose].name, floor: floor[choose2].name, img:'/image/shui.png', price: u_price, num: numbers, name: "桶装水", choose: choose, choose2: choose2};

    var water = wx.getStorageSync('water_cart');
    var control = true;
    if (water){
      var len = water.length;
      for(var i=0;i<len;i++){
        if (choose == water[i].choose && choose2 == water[i].choose2){
          water[i].num += numbers;
          control = false;
        }
      }
      if (control){
        water.push(water_item);
        control = false;
      }
    }
    if (control) {
      water = [];
      water.push(water_item);
    }
    wx.setStorageSync('water_cart', water);
    wx.showToast({
      title: '成功加入购物车',
      icon:'none',
      duration:1000
    })
  },
  // 商品详情数据获取
  loadProductDetail: function () {
    var that = this;
    // wx.request({
    //   url: app.data.ceshiUrl + '/Api/Product/index',
    //   method: 'post',
    //   data: {},
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    
        //var status = res.data.status;
    var status=1;
        if (status == 1) {
          var water = [{ name: '有桶水', price: '10.00' }, { name: '无桶水', price: '60.00' }];
          var floor = [{ name: '一楼到三楼', price: '3.00' }, { name: '四楼到六楼', price: '5.00' }];
          var stock = 999;
          var price = water[0].price;
          var freight = floor[0].price;
          var total = parseFloat(price) + parseFloat(freight);
          that.setData({
            water: water,
            stock: stock,
            floor: floor,
            price: price,
            freight: freight,
            total: total
          });
        } else {
          // wx.showToast({
          //   title: res.data.err,
          //   duration: 2000,
          //   icon: 'none'
          // });
        }
    //   },
    //   fail: function (e) {
    //     wx.showToast({
    //       title: '网络异常！',
    //       duration: 2000,
    //       icon: 'none'
    //     });
    //   },
    //   complete: function () {
    //     that.setData({
    //       showLoading: false
    //     })
    //   }
    // });
  },
  // 选择楼层
  choose2(e) {
    var index = e.currentTarget.dataset.index;
    var price = this.data.price;
    var numbers = this.data.numbers; 
    var freight = e.currentTarget.dataset.price;
    var total = parseFloat(freight) + parseFloat(price);
    total = total * numbers.toFixed(2);
    this.setData({
      choose2: index,
      freight: freight,
      total: total
    })
  },
  /* 选择规格事件 */
  choose(e){
    var index = e.currentTarget.dataset.index;
    var price = e.currentTarget.dataset.price;
    var freight = this.data.freight;
    var numbers = this.data.numbers; 
    var total = parseFloat(freight) + parseFloat(price);
    total = total * numbers.toFixed(2);
    this.setData({
      choose: index,
      price: price,
      total: total
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
      let numbersJian = this.data.numbers - 1;
      var freight = this.data.freight; 
      var price = this.data.price;
      var total = parseFloat(freight) + parseFloat(price);
      total = total * numbersJian.toFixed(2);
      this.setData({
        numbers: numbersJian,
        total: total
      })
    }
  },
  //商品数量增加
  bindtapJia() {
    var stock = this.data.stock;
    var numbers = this.data.numbers;
    if (numbers < stock){
      let numbersJia = numbers + 1;
      var freight = this.data.freight;
      var price = this.data.price;
      var total = parseFloat(freight) + parseFloat(price);
      total = total * numbersJia.toFixed(2);
      this.setData({
        numbers: numbersJia,
        total: total
      })
    }
  },
  //弹窗显示
  bindtapMasks(e) {
    var buy_type = e.currentTarget.dataset.type;
    this.setData({
      buy_type: buy_type
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