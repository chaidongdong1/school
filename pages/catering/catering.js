// pages/catering/catering.js
const app = getApp();
let listid = '',
  catId = '',
  recom = '',
  listDian = false;
Page({

  data: {
    datas: [], //商品数组
    lists: [], //商品分类数组
    baseUrl: app.globalData.baseUrl, //图片路径
    currPage: 1, //当前页数
    totalPage: '', //总页数
    //遮罩层
    mask: {
      opacity: 0,
      display: 'none'
    },
    num: 0,
    //弹窗
    returnDeposit: {
      translateY: 'translateX(1500px)',
      opacity: 1
    },
    imgUrls: [], //轮播图
    schoolName: '' //学校名字
  },
  // 分享
  onShareAppMessage() {
    return {
      title: app.globalData.programName,
      path: 'pages/catering/catering?scene='+this.data.userId
    }
  },
  onLoad: function(options) {
    let schoolId = wx.getStorageSync('schoolId');
    var userId = wx.getStorageSync('userId');
    //如果学校id不存在跳转到引导页
    if (!schoolId && !options.scene) {
      console.log('1111111111')
      var way = '../catering/catering';
      wx.reLaunch({
        url: '../start/start?way=' + way
      })
    }
    if (!schoolId && options.scene) {
      console.log('222222222')
      var ways = '../catering/catering';
      wx.reLaunch({
        url: '../start/start?scene=' + options.scene + '&way=' + ways
      })
    }
    console.log(schoolId)
    this.setData({
      datas: [], //商品数组
      currPage: 1, //当前页数
      totalPage: '', //总页数
      userId: userId, //用户id
      schoolId: schoolId //学校id
    });
    listid = ''; //清空分类
    this.getLists();
    console.log("------------------------");
    console.log(listid)
    wx.showLoading({
      title: '加载中',
    })
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
      }
    });
    //商品分类接口
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}shop/shopCatslist`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        shopId: 1
      },
      success: res => {
        wx.hideLoading()
        console.log(res);
        //向数组头部添加全部
        let listName = res.data.data.unshift({ catId: '0', catName: '全部' }, { catId: '-1', catName: '热销推荐' });
        [0].concat(listName);
        console.log(listName)
        this.setData({
          lists: res.data.data
        })
      }
    });
  },
  onShow() {
    var shop_cart = wx.getStorageSync('shop_cart');
    if (shop_cart){
      var len = shop_cart.length;
      this.setData({
        num: len
      })
    }
    var schoolName = wx.getStorageSync('schoolName');
    this.setData({
      schoolName: schoolName
    })
  },
  // 进入购物车
  go_cart() {
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  //热销商品接口（没有点击分类时）
  getLists() {
    if (!listid || listid == -1) {
      console.log("首次进入recom")
      recom = 1;
    } else {
      recom = '';
    }
    if (listid == 0 || listid == -1) {
      console.log("没有点击分类catId")
      catId = '';
    } else {
      catId = listid;
    }
    wx.showLoading({
      title: '加载中',
    })
    //热销商品接口
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}goods/goodsList`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        schoolId: 1,
        proType: 1,
        shopId: 1,
        page: this.data.currPage,
        catId: catId,
        recom: recom
      },
      success: res => {
        console.log({
          page: this.data.currPage,
          catId: catId,
          recom: recom
        })
        console.log(res);
        wx.hideLoading();
        this.setData({
          datas: this.data.datas.concat(res.data.data.root),
          currPage: res.data.data.currPage,
          totalPage: res.data.data.totalPage
        });
        console.log(this.data.datas);
      }
    });
  },
  //点击商品分类跳转
  bindFenlei(e) {
    listDian = true;
    this.bindtapClose(); //关闭弹窗
    console.log(e);
    listid = e.currentTarget.dataset.listid;
    this.setData({
      datas: [], //商品数组
      currPage: 1, //当前页数
      totalPage: '', //总页数
    });
    this.getLists();
  },
  //跳转详情
  go_detail: function(e) {
    console.log(e);
    let goodsid = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: `./shopDetails/shopDetails?goodsid=${goodsid}`
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
    if (this.data.currPage < this.data.totalPage) {
      this.setData({
        currPage: this.data.currPage * 1 + 1
      });
      console.log(this.data.currPage);
      this.getLists();
    } else {
      console.log("已经是最后一页");
    }
  },
})