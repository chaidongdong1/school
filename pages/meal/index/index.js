// pages/meal/index/index.js
var app = getApp();
var timer;
Page({
  data: {
    img_url: app.globalData.baseUrl,
    showLoading1: true,
    showLoading2: true,
    showLoading3: true,
    currentTab: 0,
    refundpage: 0,
    lists: [],
    all_orderList0: [],
    all_orderList1: [],
    all_orderList3: [],
    all_orderList4: [],
    orderList0: [],
    orderList1: [],
    orderList3: [],
    orderList4: [],
    isHideLoadMore: [true, true, true, true, true],
    control: [true, true, true, true, true],
    loadingval: ['正在加载', '正在加载', '正在加载', '正在加载', '正在加载'],
    page: [0, 0, 0, 0, 0],
    hot: [],
    imgUrls: [], //轮播图
    schoolName: '' //学校名字
    
  },
  onShow() {
    var schoolName = wx.getStorageSync('schoolName');
    this.setData({
      schoolName: schoolName
    })
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/meal/index/index?scene=' + this.data.userId
    }
  },
  onLoad: function(options) {
    var schoolId = wx.getStorageSync('schoolId');
    //如果学校id不存在跳转到引导页
    if (!schoolId && !options.scene) {
      console.log('1111')
      var way = '../meal/index/index';
      wx.reLaunch({
        url:`../../start/start?way=${way}`
      })
    }
    //如果学校id不存在跳转到引导页
    if (!schoolId && options.scene) {
      console.log('222222')
      wx.reLaunch({
        url: '../start/start?scene=' + options.scene + '&way=../meal/index/index'
      })
    }
    var userId = wx.getStorageSync('userId');
    this.setData({
      schoolId: schoolId,
      userId: userId
    })
    console.log(app.globalData.api)
    var that = this;
    //轮播图
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}common/ads`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        adType: 2,
        schoolId: schoolId
      },
      success: res => {
        console.log(res);
        let imgurl = res.data.data.map(item => item.photo);
        console.log(imgurl);
        this.setData({
          imgUrls: imgurl
        })
      },
      complete(){
        that.setData({
          showLoading1: false
        })
      }
    });
    wx.request({
      url: app.globalData.api + 'shop/shopList',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        schoolId: schoolId
      },
      success(data) {
        var status = data.data.status;
        if (status == 1) {
          var root = data.data.data.root;
          that.loadShopList(root);
        } else {
          wx.showToast({
            title: data.data.msg,
            duration: 2000,
            icon: 'none'
          });
        }

      },
      fail: function() {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      },
      complete() {
        that.setData({
          showLoading2: false
        })
      }
    })
    wx.request({
      url: app.globalData.api + 'shop/shopList',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        schoolId: schoolId,
        recom: 1
      },
      success(data) {
        var status = data.data.status;
        if (status == 1) {
          var root = data.data.data.root;
          if (root.length > 4) {
            var hot = root.splice(0, 4);
          } else {
            var hot = root;
          }
          that.setData({
            hot: hot
          })
          //console.log(hot)
        } else {
          wx.showToast({
            title: data.data.msg,
            duration: 2000,
            icon: 'none'
          });
        }

      },
      fail: function() {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      },
      complete() {
        that.setData({
          showLoading3: false
        })
      }
    })
  },
  go_shop: function(e) {
    var shop_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../shop/shop?shop_id=' + shop_id
    })
  },
  // 上拉加载
  onReachBottom: function() {
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
  loadShopList: function(list) {
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
      all_orderList1: array
    })
    var all_orderList1 = that.data.all_orderList1;
    var new_List1 = all_orderList1.splice(0, 4);




    // 价格排序 从低到高
    var array3 = list.slice(0);
    for (var unfix = array3.length - 1; unfix > 0; unfix--) {
      /*给进度做个记录，比到未确定位置*/
      for (var i = 0; i < unfix; i++) {
        if (array3[i].grade > array3[i + 1].grade) {
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
      all_orderList3: all_orderList3,
      orderList3: new_List3,
      all_orderList4: all_orderList4,
      orderList4: new_List4,
    })
  },
  // 美食美客数据加载
  loade: function() {
    var that = this;
    var currentTab = that.data.currentTab;
    console.log(currentTab)
    var isHideLoadMore = that.data.isHideLoadMore;
    var control = that.data.control;
    var loadingval = that.data.loadingval;
    if (currentTab == 0) {
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
        if (len0 < 4) {
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
  },
  // tab 切换
  swichNav: function(e) {
    var that = this;
    var currentTab = that.data.currentTab;
    var current = e.currentTarget.dataset.current;
    var control = this.data.control[currentTab];
    if (currentTab == 3 && current == 3) {
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