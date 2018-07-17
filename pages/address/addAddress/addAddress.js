const app = getApp();
Page({

  data: {
    // index: 0,
    building: ['请选择主体楼', '一号楼', '二号楼', '三号楼', '四号楼'], //主体楼
    index: 0, //选择的是第几个（主体楼）
    campus: '龙子湖校区', //选择的校区
    tel: '', //输入的手机号
    name: '', //输入的名字
    floor: '', //输入的楼层
    address: '', //输入的详细地址
    checked: false, //是否选择为默认地址
    builde: '', //   选择的主体楼
    type: '', //是否为修改地址
  },
  onLoad: function(options) {
    console.log(options);
    let type = options.type;
    //修改地址
    if (type) {
      this.setData({
        type: type
      });
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        method: 'POST',
        url: `${app.globalData.api}address/list_address`,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          userId: app.globalData.userId
        },
        success: res => {
          wx.hideLoading();
          console.log(res);
          let datas = res.data.data.filter(item => item.addressId == type)[0];
          let check = datas.isDefault == 1 ? true : false;
          let indexs = this.data.building.findIndex(item => item == datas.buildName);
          console.log(indexs);
          this.setData({
            tel: datas.userPhone,
            name: datas.userName,
            campus: datas.schoolName,
            floor: datas.floorNum,
            address: datas.address,
            checked: check,
            builde: datas.buildName,
            index: indexs
          });
          console.log({
            tel: datas.userPhone,
            name: datas.userName,
            campus: datas.schoolName,
            floor: datas.floorNum,
            address: datas.address,
            checked: check,
            builde: datas.buildName,
            index: indexs
          })
        }
      });
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

    var builde = this.data.builde;
    if (!builde) {
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
    if (!builde) {
      var building = this.data.building;
      builde = building[index];
    }
    var checked = this.data.checked == false ? '0' : '1';
    wx.showLoading({
      title: '加载中',
    })
    //添加地址向后台传输数据
    if (!this.data.type) {
      wx.request({
        method: 'POST',
        url: `${app.globalData.api}address/add_address`,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          userId: app.globalData.userId,
          isDefault: checked,
          address: address, //详细地址
          floorNum: floor, //楼层
          buildName: builde, //主体楼
          schoolName: this.data.campus,
          userPhone: tel,
          userName: name,
        },
        success: res => {
          wx.hideLoading();
          console.log(res);
          console.log({
            userId: app.globalData.userId,
            isDefault: checked,
            address: address, //详细地址
            floorNum: floor, //楼层
            buildName: builde, //主体楼
            schoolName: this.data.campus,
            userPhone: tel,
            userName: name,
          });
          if (res.data.status == 1) {
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1500
            });
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 1000);
          } else {
            wx.showToast({
              title: '添加失败',
              image: '../../../image/warning.png',
              duration: 1500
            });
          }

        }
      });
    } else {
      if (this.data.index == 0) {
        wx.showToast({
          title: '请选择主体楼',
          icon: 'none'
        })
        return;
      }
      //修改地址
      wx.request({
        method: 'POST',
        url: `${app.globalData.api}address/add_address`,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          userId: app.globalData.userId,
          addressId: this.data.type,
          isDefault: checked,
          address: address, //详细地址
          floorNum: floor, //楼层
          buildName: this.data.building[this.data.index], //主体楼
          schoolName: this.data.campus,
          userPhone: tel,
          userName: name,
        },
        success: res => {
          wx.hideLoading();
          console.log(res);
          console.log({
            userId: app.globalData.userId,
            addressId: this.data.type,
            isDefault: checked,
            address: address, //详细地址
            floorNum: floor, //楼层
            buildName: this.data.building[this.data.index], //主体楼
            schoolName: this.data.campus,
            userPhone: tel,
            userName: name,
          });
          if (res.data.status == 1) {
            wx.showToast({
              title: '地址修改成功',
              icon: 'success',
              duration: 1500
            });
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 1000);
          } else {
            wx.showToast({
              title: '地址修改失败',
              image: '../../../image/warning.png',
              duration: 1500
            });
          }

        }
      });
    }

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
  // 是否为默认地址
  switchchange(e) {
    console.log(e)
    this.setData({
      checked: e.detail.value
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