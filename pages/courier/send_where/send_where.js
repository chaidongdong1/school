
Page({
  data: {
    index: 0,
    building: ['请选择主体楼', '一号楼', '二号楼', '三号楼', '四号楼'],
    index: 0,
    campus: '龙子湖校区',
    tel: '',
    name: '',
    floor: '',
    address: '',
    builde:''
  },
  onLoad: function (options) {
     //wx.removeStorageSync('default_address');
  },
  onShow(){

    var default_address = wx.getStorageSync('default_address');
    if (default_address){
      this.setData({
        name: default_address.name,
        tel: default_address.tel,
        address: default_address.address,
        floor: default_address.floor,
        builde: default_address.builde
      })
    }
  },
  // 提交完善信息
  submit() {
    
    
    var name = this.data.name;
    name = name.replace(/^\s+|\s+$/g, "");
    if (!name) {
      wx.showToast({
        title: '请输入收货人姓名',
        icon: 'none'
      })
      return;
    }
    var tel = this.data.tel;
    tel = tel.replace(/^\s+|\s+$/g, "");
    if (!tel) {
      wx.showToast({
        title: '请输入收货人电话',
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
    var builde = this.data.builde;
    if (!builde){
      var index = this.data.index;
      if (index == 0) {
        wx.showToast({
          title: '请选择主体楼',
          icon: 'none'
        })
        return;
      }
    }
    var floor = this.data.floor;
    floor = floor.replace(/^\s+/g, "");
    if (!floor) {
      wx.showToast({
        title: '请输入所在楼层',
        icon: 'none'
      })
      return;
    }

    var address = this.data.address;
    address = address.replace(/^\s+|\s+$/g, "");
    if (!address) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      return;
    }
    var builde = this.data.builde;
    if (!builde){
      var building = this.data.building;
      builde = building[index];
    }
    var send_info = {
      name: name,
      tel: tel,
      builde: builde,
      floor: floor,
      address: address,
    }
    console.log(send_info)
    wx.setStorageSync('send_info', send_info);
    wx.showToast({
      title: '信息填写完整',
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  },
  // 获取收货人名字
  get_name(e) {
    var name = e.detail.value;
    this.setData({
      name: name
    })
  },
  // 获取收货人电话
  get_tel(e) {
    var tel = e.detail.value;
    this.setData({
      tel: tel
    })
  },
  // 获取楼层
  get_floor(e) {
    var floor = e.detail.value;
    this.setData({
      floor: floor
    })
  },
  // 详细地址
  get_address(e) {
    var address = e.detail.value;
    this.setData({
      address: address
    })
  },
  //选择主体楼
  change(e) {
    this.setData({
      index: e.detail.value
    })
  }
})