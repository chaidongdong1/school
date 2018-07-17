// pages/courier/perfect/perfect.js
Page({
  data: {
    //courier: ['请选择','申通快递', '圆通快递', '顺丰快递'],
    courier:'',
    //address: ['请选择','学校东门口', '学校西门口', '学校北门口'],
    address:'',
    tel:'',
    name:'',
    code:''
  },
  onLoad: function (options) {
   
  },
  onReady: function () {
  
  },
  onShow: function () {
  
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
    var verify = /^1[35]\d{9}$/;
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
  // 快递类型选择
  change1: function (e) {
    var courie = e.detail.value;
    this.setData({
      courier: courie
    })
  },
  // 快递位置选择
  change2: function (e) {
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
  },
  onShareAppMessage: function () {
  
  }
})