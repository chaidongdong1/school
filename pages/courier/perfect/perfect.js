// pages/courier/perfect/perfect.js
Page({
  data: {
    courier: ['请选择','申通快递', '圆通快递', '顺丰快递'],
    courier_index: 0,
    address: ['请选择','学校东门口', '学校西门口', '学校北门口'],
    address_index: 0,
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
    var courier_index = this.data.courier_index;
    if (courier_index==0){
      wx.showToast({
        title: '请选择快递类型',
        icon:'none'
      })
      return;
    }
    var address_index = this.data.address_index;
    if (address_index == 0) {
      wx.showToast({
        title: '请选择快递位置',
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
    var courier = this.data.courier;
    var address = this.data.address;
    var courier_choose = courier[courier_index];
    var address_choose = address[address_index];
    var take_info={
      courier:courier_choose,
      address: address_choose,
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
    this.setData({
      courier_index: e.detail.value
    })
  },
  // 快递位置选择
  change2: function (e) {
    this.setData({
      address_index: e.detail.value
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