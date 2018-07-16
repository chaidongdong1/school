// pages/meal/index/index.js
var list = [{
  id:1,
  shopuniquekey: 'xx21255',
  shopName: '店铺名称1',
  shopAddress: '店铺地址1',
  sales: 12,   
  price: 8.00,
  score: 6,
  thumbnail: '/image/index-shop1.jpg',
  shopDesc: '一乐拉面  牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面'
}, {
  id: 2,
  shopuniquekey: 'xx21255',
  shopName: '店铺名称2',
  shopAddress: '店铺地址2',
  sales: 120,   
  price: 9.00,
  score: 10,
  thumbnail: '/image/index-shop1.jpg',
  shopDesc: '一乐拉面  牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面'
  }, {
    id: 3,
  shopuniquekey: 'xx21255',
  shopName: '店铺名称3',
  shopAddress: '店铺地址3',
  sales: 150,   
  price: 7.00,
  score: 15,
  thumbnail: '/image/index-shop1.jpg',
  shopDesc: '一乐拉面  牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面'
}, {
    shopuniquekey: 'xx21255',
    id: 4,
  shopName: '店铺名称4',
  shopAddress: '店铺地址4',
  sales: 60,   
  price: 18.00,
  score: 6,
  thumbnail: '/image/index-shop1.jpg',
  shopDesc: '一乐拉面  牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面'
}, {
  shopuniquekey: 'xx21255',
  shopName: '店铺名称5',
  shopAddress: '店铺地址5',
  sales: 150,   
  price: 10.00,
  score: 3,
  id: 5,
  thumbnail: '/image/index-shop1.jpg',
  shopDesc: '一乐拉面  牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面'
}, {
  shopuniquekey: 'xx21255',
  shopName: '店铺名称6',
  shopAddress: '店铺地址6',
  sales: 10,   
  price: 16.00,
  score: 5,
  id: 6,
  thumbnail: '/image/index-shop1.jpg',
  shopDesc: '一乐拉面  牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面'
}, {
  shopuniquekey: 'xx21255',
  shopName: '店铺名称7',
  shopAddress: '店铺地址7',
  sales: 20,   
  price: 8.00,
  score: 9,
  id: 7,
  thumbnail: '/image/index-shop1.jpg',
  shopDesc: '一乐拉面  牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面 牛肉拉面'
}]
var app = getApp();
var timer;
Page({
  data: {
    showLoading:true,
    currentTab: 0,
    refundpage: 0,
    lists: [],
    all_orderList0: [],
    all_orderList1: [],
    all_orderList2: [],
    all_orderList3: [],
    all_orderList4: [],
    orderList0: [],
    orderList1: [],
    orderList2: [],
    orderList3: [],
    orderList4: [],
    showLoading: true,
    isHideLoadMore: [true, true, true, true, true],
    control: [true, true, true, true, true],
    loadingval: ['正在加载', '正在加载', '正在加载', '正在加载', '正在加载'],
    page: [0, 0, 0, 0, 0]
  },
  onLoad: function (options) {
    this.loadShopList();
  }, 
 go_shop:function (e) {
    var shop_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../shop/shop?shop_id=' + shop_id
    })
  },
  // 上拉加载
 onReachBottom: function () {
   var isHideLoadMore = this.data.isHideLoadMore;
   var currentTab = this.data.currentTab;
   isHideLoadMore[currentTab] = false;
   this.setData({
     isHideLoadMore: isHideLoadMore
   });
   var control = this.data.control[currentTab];
   if (control) {
     if (timer) {
       clearTimeout(timer);
     }
     timer = setTimeout(() => {
       isHideLoadMore = this.data.isHideLoadMore;
       isHideLoadMore[currentTab] = true;
       this.setData({
         isHideLoadMore: isHideLoadMore,
       })
       this.loade();
     }, 2000)
   }
 },
  
  // 请求所有美食美客的店铺  暂时每页四条数据
  loadShopList: function () {
    var that = this;
    // list 原数组
    that.setData({
      all_orderList0: list
    })
    var all_orderList0 = that.data.all_orderList0;
    var new_List0 = all_orderList0.splice(0, 4);
    console.log(new_List0)
    

    // 销量排序
    var array = list;
    /*给每个未确定的位置做循环*/
    for (var unfix = array.length - 1; unfix > 0; unfix--) {
      /*给进度做个记录，比到未确定位置*/
      for (var i = 0; i < unfix; i++) {
        if (array[i].sales < array[i + 1].sales) {
          var temp = array[i];
          array.splice(i, 1, array[i + 1]);
          array.splice(i + 1, 1, temp);
        }
      }
    }
    that.setData({
      all_orderList1:array
    })
    var all_orderList1 = that.data.all_orderList1;
    var new_List1 = all_orderList1.splice(0, 4);

    // 距离排序
    var array2 = list.slice(0);
    for (var unfix = array2.length - 1; unfix > 0; unfix--) {
      /*给进度做个记录，比到未确定位置*/
      for (var i = 0; i < unfix; i++) {
        if (array2[i].score > array2[i + 1].score) {
          var temp = array2[i];
          array2.splice(i, 1, array2[i + 1]);
          array2.splice(i + 1, 1, temp);
        }
      }
    }
    that.setData({
      all_orderList2: array2
    })
    var all_orderList2 = that.data.all_orderList2;
    var new_List2 = all_orderList2.splice(0, 4);
    

    // 价格排序 从低到高
    var array3 = list.slice(0);
    for (var unfix = array3.length - 1; unfix > 0; unfix--) {
      /*给进度做个记录，比到未确定位置*/
      for (var i = 0; i < unfix; i++) {
        if (array3[i].price > array3[i + 1].price) {
          var temp = array3[i];
          array3.splice(i, 1, array3[i + 1]);
          array3.splice(i + 1, 1, temp);
        }
      }
    }
    that.setData({
      all_orderList3: array3,
      all_orderList4: array3.slice(0).reverse()
    })
    var all_orderList3 = that.data.all_orderList3;
    var new_List3 = all_orderList3.splice(0, 4);

    // 价格排序 从高到低
    var all_orderList4 = that.data.all_orderList4;
    var new_List4 = all_orderList4.splice(0, 4);
    that.setData({
      all_orderList0: all_orderList0,
      orderList0: new_List0,
      all_orderList1: all_orderList1,
      orderList1: new_List1,
      all_orderList2: all_orderList2,
      orderList2: new_List2,
      all_orderList3: all_orderList3,
      orderList3: new_List3,
      all_orderList4: all_orderList4,
      orderList4: new_List4,
      showLoading: false
    })
    //that.loade();
    //if(len0)
    // wx.request({
    //   url: app.data.ceshiUrl + '/Api/Order/index',
    //   method: 'post',
    //   data: {},
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     //--init data     
    //     console.log(res)
    //     this.setData({
    //       lists: list
    //     })
    //   },
    //   fail: function () {
    //     // fail
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
  // 美食美客数据加载
  loade:function(){
    var that = this;
    var currentTab = that.data.currentTab;
    console.log(currentTab)
    var isHideLoadMore = that.data.isHideLoadMore;
    var control = that.data.control;
    var loadingval = that.data.loadingval;
    if (currentTab ==0){
      var all_orderList0 = that.data.all_orderList0;
      var new_List0 = all_orderList0.splice(0, 4);
      var len0 = new_List0.length;
      if (len0 == 0) {
        isHideLoadMore[currentTab] = false;
        control[currentTab] = false;
        loadingval[currentTab] = '亲，我们是有底线的';
        that.setData({
          isHideLoadMore: isHideLoadMore,
          control: control,
          loadingval: loadingval
        })
      } else {
        if (len0 <4) {
          isHideLoadMore[currentTab] = false;
          control[currentTab] = false;
          loadingval[currentTab] = '亲，我们是有底线的';
          that.setData({
            isHideLoadMore: isHideLoadMore,
            control: control,
            loadingval: loadingval
          })
        }
        var orderList0 = that.data.orderList0;
        orderList0 = orderList0.concat(new_List0);
        //console.log(new_List0)
        that.setData({
          orderList0: orderList0,
          all_orderList0: all_orderList0
        })
      }
    } else if (currentTab == 1) {
      var all_orderList1 = that.data.all_orderList1;
      var new_List1 = all_orderList1.splice(0, 4);
      var len1 = new_List1.length;
      if (len1 == 0) {
        isHideLoadMore[currentTab] = false;
        control[currentTab] = false;
        loadingval[currentTab] = '亲，我们是有底线的';
        that.setData({
          isHideLoadMore: isHideLoadMore,
          control: control,
          loadingval: loadingval
        })
      } else {
        if (len1 < 4) {
          isHideLoadMore[currentTab] = false;
          control[currentTab] = false;
          loadingval[currentTab] = '亲，我们是有底线的';
          that.setData({
            isHideLoadMore: isHideLoadMore,
            control: control,
            loadingval: loadingval
          })
        }
        var orderList1 = that.data.orderList1;
        orderList1 = orderList1.concat(new_List1);
        console.log(new_List1)
        that.setData({
          orderList1: orderList1,
          all_orderList1: all_orderList1
        })
      }
    } else if (currentTab == 2) {
      var all_orderList2 = that.data.all_orderList2;
      var new_List2 = all_orderList2.splice(0, 4);
      var len2 = new_List2.length;
      if (len2 == 0) {
        isHideLoadMore[currentTab] = false;
        control[currentTab] = false;
        loadingval[currentTab] = '亲，我们是有底线的';
        that.setData({
          isHideLoadMore: isHideLoadMore,
          control: control,
          loadingval: loadingval
        })
      } else {
        if (len2 < 4) {
          isHideLoadMore[currentTab] = false;
          control[currentTab] = false;
          loadingval[currentTab] = '亲，我们是有底线的';
          that.setData({
            isHideLoadMore: isHideLoadMore,
            control: control,
            loadingval: loadingval
          })
        }
        var orderList2 = that.data.orderList2;
        orderList2 = orderList2.concat(new_List2);
        console.log(new_List2)
        that.setData({
          orderList2: orderList2,
          all_orderList2: all_orderList2
        })
      }
    } else if (currentTab == 3) {
      var all_orderList3 = that.data.all_orderList3;
      var new_List3 = all_orderList3.splice(0, 4);
      var len3 = new_List3.length;
      if (len3 == 0) {
        isHideLoadMore[currentTab] = false;
        control[currentTab] = false;
        loadingval[currentTab] = '亲，我们是有底线的';
        that.setData({
          isHideLoadMore: isHideLoadMore,
          control: control,
          loadingval: loadingval
        })
      } else {
        if (len3 < 4) {
          isHideLoadMore[currentTab] = false;
          control[currentTab] = false;
          loadingval[currentTab] = '亲，我们是有底线的';
          that.setData({
            isHideLoadMore: isHideLoadMore,
            control: control,
            loadingval: loadingval
          })
        }
        var orderList3 = that.data.orderList3;
        orderList3 = orderList3.concat(new_List3);
        console.log(new_List3)
        that.setData({
          orderList3: orderList3,
          all_orderList3: all_orderList3
        })
      }
    } else if (currentTab == 4) {
      var all_orderList4 = that.data.all_orderList4;
      var new_List4 = all_orderList4.splice(0, 4);
      var len4 = new_List4.length;
      if (len4 == 0) {
        isHideLoadMore[currentTab] = false;
        control[currentTab] = false;
        loadingval[currentTab] = '亲，我们是有底线的';
        that.setData({
          isHideLoadMore: isHideLoadMore,
          control: control,
          loadingval: loadingval
        })
      } else {
        if (len4 < 4) {
          isHideLoadMore[currentTab] = false;
          control[currentTab] = false;
          loadingval[currentTab] = '亲，我们是有底线的';
          that.setData({
            isHideLoadMore: isHideLoadMore,
            control: control,
            loadingval: loadingval
          })
        }
        var orderList4 = that.data.orderList4;
        orderList4 = orderList4.concat(new_List4);
        console.log(new_List4)
        that.setData({
          orderList4: orderList4,
          all_orderList4: all_orderList4
        })
      }
    }
    that.setData({
      showLoading:false
    })
  },
  // tab 切换
  swichNav: function (e) {
    var that = this;
    var currentTab = that.data.currentTab;
    var current = e.currentTarget.dataset.current;
    var control = this.data.control[currentTab];
    if (currentTab == 3 && current==3){
      that.setData({
        currentTab: 4
      });
    } else if (currentTab == 4 && current == 3) {
      that.setData({
        currentTab: 3
      });
    } else if (currentTab === current) {
      return false;
    } else {
      that.setData({
        currentTab: parseInt(current)
      });
    }
  }
})