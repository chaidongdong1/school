// pages/evaluate/evaluate.js
let listsHong = ['/image/xing-xuan.png', '/image/xing-xuan.png', '/image/xing-xuan.png', '/image/xing-xuan.png', '/image/xing-xuan.png'], //商品打分红
  listsHei = ['/image/xing-wei.png', '/image/xing-wei.png', '/image/xing-wei.png', '/image/xing-wei.png', '/image/xing-wei.png']; //商品打分黑
var app = getApp();
Page({
  data: {
    lists: ['/image/xing-xuan.png', '/image/xing-xuan.png', '/image/xing-xuan.png', '/image/xing-xuan.png', '/image/xing-xuan.png'], //商品打分
    listsIndex: 4, //商品打分下标(代表5星)
    list: ['/image/xing-xuan.png', '/image/xing-xuan.png', '/image/xing-xuan.png', '/image/xing-xuan.png', '/image/xing-xuan.png'], //快递打分
    listIndex: 4, //快递打分下标(代表5星)
    text: '', //商品评价
    temp: [], //评价上传的图片
    datas: '', //详情数据
    baseUrl: app.globalData.baseUrl, //图片路径
    imgs: [], //评价上传后的图片
    shopId: '', //店铺id
  },
  // 分享
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  onLoad: function(options) {
    console.log(options)
    var orderId = options.orderId;
    //orderId = 38;
    this.setData({
      orderId: orderId
    })
    var goodsId = '';
    console.log(goodsId)
    if (options.goodsId) {
      goodsId = options.goodsId;
      this.setData({
        goodsId: goodsId
      })
      console.log(this.data.goodsId)
    }
    console.log(goodsId)
    var schoolId = wx.getStorageSync('schoolId');
    var userId = wx.getStorageSync('userId');
    var schoolName = wx.getStorageSync('schoolName');
    this.setData({
      schoolId: schoolId,
      userId: userId,
      schoolName: schoolName,
      orderId: orderId
    })
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}order/orderInfo`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        remark: 'self',
        orderId: orderId
      },
      success: res => {
        wx.hideLoading();
        console.log({
          remark: 'self',
          orderId: orderId
        })
        console.log(res);
        var data = res.data.data;
        var shopId = data.shopId;
        if (data.goodsList && data.goodsList.length > 0 ) {
          var goodsList = data.goodsList;
          console.log(goodsList)
          if (goodsId) {
            var item = goodsList.find(item => item.id == goodsId);
            goodsList = [];
            goodsList.push(item);
            console.log(goodsList)
            goodsId = goodsList[0].goodsId;
          } else {
            goodsId = goodsList[0].goodsId;
          }
          this.setData({
            goodsList: goodsList
          });
          
        } else {
          goodsId = 0;
        }
        this.setData({
          goodsId: goodsId,
          datas: data,
          shopId: shopId
        });
        console.log(this.data.goodsList)
      }
    });
  },
  //商品打分
  bindtapDafen(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    this.setData({
      listsIndex: index
    });
    console.log(this.data.listsIndex);
    let listZhong = listsHong.slice(0, index + 1);
    let listWei = listsHei.slice(0, (4 - index));
    console.log(listZhong);
    console.log(listWei);
    this.setData({
      lists: listZhong.concat(listWei)
    });
  },
  //快递打分
  bindtapKuai(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    this.setData({
      listIndex: index
    });
    console.log(this.data.listIndex);
    let listZhong = listsHong.slice(0, index + 1);
    let listWei = listsHei.slice(0, (4 - index));
    console.log(listZhong);
    console.log(listWei);
    this.setData({
      list: listZhong.concat(listWei)
    });
  },
  //评价
  bindText(e) {
    console.log(e)
    var text = e.detail.value;
    this.setData({
      text: text
    });
  },
  //添加图片
  bindtapPhost(e) {
    var index = e.currentTarget.dataset.index;
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        console.log(res)
        var tempFilePaths = res.tempFilePaths;
        var temp = this.data.temp;
        console.log(tempFilePaths)
        console.log(temp)
        if (index == -1) {
          temp = temp.concat(tempFilePaths);
        } else {
          temp[index] = tempFilePaths[0];
        }
        this.setData({
          temp: temp
        })

      }
    })
  },
  // 点击提交按钮
  submit() {
    var temp = this.data.temp;
    var text = this.data.text;
    console.log(text)
    console.log(temp)
    var len = temp.length;
    if (!text) {
      wx.showToast({
        title: '请留下您珍贵的评论！',
        icon: 'none',
        duration: 1500
      })
      return
    }
    if (len == 0) {
      this.evalute();
    } else {
      var copy = temp.slice(0);
      for (var i = 0; i < len; i++) {

        var img = copy.shift();
        this.uploadImg(img);
      }
    }

  },
  // 上传图片
  uploadImg(img) {
    wx.showLoading({
      title: '提交评价中',
    })
    console.log(img)
    wx.uploadFile({
      url: `${app.globalData.api}common/uploadGoodsPic`,
      filePath: img,
      name: 'file',
      formData: {
        userId: this.data.userId,
        'folder': 'apprise'
      },
      success: res => {
        console.log(res);
        let ress = JSON.parse(res.data);
        console.log(ress);
        if (ress.status == 1) {
          var imgs = this.data.imgs;
          imgs.push(ress.data.Image);
          this.setData({
            imgs: imgs
          });
          var temp = this.data.temp;
          console.log(temp)
          console.log(imgs)
          var len0 = temp.length;
          var len = imgs.length;
          if (len == len0) {
            this.evalute();
          }
        } else {
          wx.hideLoading();
          wx.showToast({
            title: ress.msg,
            icon: 'none',
            duration: 1500
          });
          console.log("身份证正面上传失败")
        }
      }
    });
  },
  evalute() {
    var imgs = this.data.imgs;
    var appraisesAnnex = JSON.stringify(imgs).replace(/^\[{1}|\]{1}$/g, '').replace(/\"{1}/g, '');
    var text = this.data.text;
    var listsIndex = this.data.listsIndex + 1;
    var listIndex = this.data.listIndex + 1;
    console.log(listsIndex)
    console.log(listIndex)
    wx.request({
      url: app.globalData.api + 'order/appraise',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        schoolId: this.data.schoolId,
        orderId: this.data.orderId,
        userId: this.data.userId,
        goodsScore: listsIndex,
        serviceScore: listIndex,
        goodsId: this.data.goodsId,
        shopId: this.data.shopId,
        appraisesAnnex: appraisesAnnex,
        content: text
      },
      success: res => {
        console.log({
          schoolId: this.data.schoolId,
          orderId: this.data.orderId,
          userId: this.data.userId,
          goodsScore: listsIndex,
          serviceScore: listIndex,
          goodsId: this.data.goodsId,
          shopId: this.data.shopId,
          appraisesAnnex: appraisesAnnex,
          content: text
        })
        console.log(res)
        var data = res.data;
        var status = data.status;
        if (status == 1) {
          wx.hideLoading();
          wx.showToast({
            title: '提交成功',
            duration: 1500
          });
          setTimeout(function() {
            wx.navigateBack({
              delta: 1,
            })
          }, 1500)
        } else {
          wx.showToast({
            title: data.msg,
            duration: 2000,
            icon: 'none'
          });
        }
      },
      fail: function() {
        // fail
        wx.hideLoading();
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      }
    })
  }
});