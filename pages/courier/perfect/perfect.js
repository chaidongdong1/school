// pages/courier/perfect/perfect.js
var app = getApp();
Page({
  data: {
    courier:'',
    address:'', 
    tel:'',
    name:'',
    code:'', 
    show:false,
    showLoading:true,
    defaultAddress:[] //默认地址
  },
  onLoad: function (options) {
   
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + this.data.userId
    }
  },
  onShow: function () {
    var schoolId = wx.getStorageSync('schoolId');
    var take_info = wx.getStorageSync('take_info');
    var userId = wx.getStorageSync('userId');
    this.setData({
      schoolId: schoolId,
      userId: userId
    })
    if (take_info){
      this.setData({
        courier: take_info.courier,
        address: take_info.address,
        name: take_info.name,
        tel: take_info.tel,
        code: take_info.code
      })
    }
    wx.request({
      url: app.globalData.api + 'common/getDeliverList',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        schoolId: schoolId
      },
      success: res => {
        console.log(res)
        this.setData({
          showLoading:false
        })
        var status = res.data.status;
        if (status == 1) {
          var address = res.data.data;
          this.setData({
            defaultAddress: address
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            duration: 2000,
            icon: 'none'
          });
        }

      },
      fail: function () {
        this.setData({
          showLoading: false
        })
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
          icon: 'none'
        });
      }
    })
  }, 
  // 提交完善信息
  submit() {
    var courier = this.data.courier;
    if (!courier){
      wx.showToast({
        title: '请输入快递类型',
        icon:'none'
      })
      return;
    }
    var address = this.data.address;
    if (address == 0) {
      wx.showToast({
        title: '请输入快递位置',
        icon: 'none'
      })
      return;
    }
    var name = this.data.name;
    name = name.replace(/^\s+|\s+$/g, "");
    if (!name) {
      wx.showToast({
        title: '请输入包裹收货人姓名',
        icon: 'none'
      })
      return;
    }
    var tel = this.data.tel;
    tel = tel.replace(/^\s+|\s+$/g, "");
    if (!tel) {
      wx.showToast({
        title: '请输入包裹收货人电话',
        icon: 'none'
      })
      return;
    }
    var verify = /^1\d{10}$/;
    if (!verify.test(tel)) {
      wx.showToast({
        title: '请输入正确的电话号码',
        icon: 'none'
      })
      return;
    }
    var code = this.data.code;
    code = code.replace(/^\s+|\s+$/g, "");
    if (!code) {
      wx.showToast({
        title: '请输入取件码',
        icon: 'none'
      })
      return;
    }
    var take_info={
      courier: courier,
      address: address,
      name:name,
      tel:tel,
      code:code
    }
    console.log(take_info)
    wx.setStorageSync('take_info', take_info);
    wx.showToast({
      title: '信息填写完整',
    })
    setTimeout(function(){
      wx.navigateBack({
        delta:1
      })
    },1000)
  },
  // 快递选择
  choose: function (e) {
    var index = e.currentTarget.dataset.index;
    var defaultAddress = this.data.defaultAddress;
    this.setData({
      choose: index,
      courier: defaultAddress[index].deliverName,
      address: defaultAddress[index].deliverAddress,
    })
  },
  // 快递选择结束
  chooseEnd(){
    this.setData({
      show:false
    })
  },
  // 打开快递选择
  show(){
    this.setData({
      show: true
    })
  },
  // 关闭快递选择
  shut() {
    this.setData({
      show: false
    })
  },
  // 获取快递类型
  get_courier(e) {
    var courier = e.detail.value;
    this.setData({
      courier: courier
    })
  },
  // 获取快递位置
  get_address(e) {
    var address = e.detail.value;
    this.setData({
      address: address
    })
  },
  // 获取收货人名字
  get_name(e){
    var name = e.detail.value;
    this.setData({
      name:name
    })
  },
  // 获取收货人电话
  get_tel(e) {
    var tel = e.detail.value;
    this.setData({
      tel: tel
    })
  },
  // 获取取件码
  get_code(e) {
    var code = e.detail.value;
    this.setData({
      code: code
    })
  }
})