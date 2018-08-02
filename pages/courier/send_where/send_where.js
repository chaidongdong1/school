var app = getApp();
Page({
  data: {
    index: 0,
    building: [],
    schoolName: '',  //所在校区
    tel: '',
    name: '',
    floor: '',
    address: '',
    builde:'',
    showLoading:true
  },
  onLoad: function (options) {
    wx.removeStorageSync('send_info2');
    
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  onShow() {
    var schoolName = wx.getStorageSync('schoolName');
    var schoolId = wx.getStorageSync('schoolId');
    this.setData({
      schoolName: schoolName,
      schoolId: schoolId
    })
    wx.request({
      url: app.globalData.api + 'common/getBuildList',
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        schoolId: schoolId,
      },
      success: res => {
        this.setData({
          showLoading:false
        })
        console.log(res)
        var data = res.data;
        var status = data.status;
        if (status == 1) {
          var building = data.data.child;
          console.log(building)
          building = building.map(item => {
            item = item.catName;
            return item
          })
          building.unshift('请选择主体楼');
          this.setData({
            building: building
          })
          this.default_address();
        } else {
          wx.showToast({
            title: data.msg,
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
  // 选择默认地址后渲染/送到哪地址修改
  default_address(){
    var default_address = wx.getStorageSync('send_info2');
    var send_info = wx.getStorageSync('send_info');
    if (send_info) {
      console.log(this.data.building)
      let indexs = this.data.building.findIndex(item => item == send_info.builde);
      console.log(indexs);
      this.setData({
        name: send_info.name,
        tel: send_info.tel,
        address: send_info.address,
        floor: send_info.floor,
        builde: send_info.builde,
        index: indexs
      })
    }
    if (default_address) {
      console.log(default_address)
      let indexs = this.data.building.findIndex(item => item == default_address.buildName);
      console.log(indexs);
      this.setData({
        name: default_address.userName,
        tel: default_address.userPhone,
        address: default_address.address,
        floor: default_address.floorNum,
        builde: default_address.buildName,
        index: indexs
      })
    }
  },
  // 提交完善信息
  submit() {
    var name = this.data.name;
    console.log(name)
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
    var verify = /^1\d{10}$/;
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