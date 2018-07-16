// pages/address/address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: ''
  },

  onLoad: function(options) {

  },
  onShow() {
    //请求地址接口
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}address/list_address`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        userId:app.globalData.userId
      },
      success: res => {
        wx.hideLoading();

        console.log(res);
        this.setData({
          address: res.data.data
        });
      }
    });
  },
  // 删除地址
  del(e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    wx.showModal({
      title: '提示',
      content: '确认删除该条地址吗？',
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中',
          })
          wx.request({
            method: 'POST',
            url: `${app.globalData.api}address/del_address`,
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              addressId: index
            },
            success: res => {
              console.log(res);
              wx.hideLoading();
              if (res.data.status == 1) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1500
                });
                this.onShow();
              } else {
                wx.showToast({
                  title: '删除失败',
                  imgae: '../../image/warning.png',
                  duration: 1500
                })
              }
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 编辑地址
  write(e) {
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `./addAddress/addAddress?type=${index}`
    })
  },
  // 选择默认地址
  choose(e) {
    // 1、将该条地址设为默认地址
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var addre = this.data.address.filter(item => item.addressId == index)[0];
    console.log(addre);
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}address/add_address`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        userId: app.globalData.userId,
        addressId: index,
        isDefault: 1,
        address: addre.address,
        floorNum: addre.floorNum,
        buildName: addre.buildName,
        schoolName: addre.schoolName,
        userPhone: addre.userPhone,
        userName: addre.userName,
      },
      success: res => {
        console.log(res);
        wx.hideLoading()
        if (res.data.status == 1) {
          wx.showToast({
            title: '默认地址设置成功',
            icon: 'none',
            duration: 1500
          });
          setTimeout(function() {
            wx.navigateBack({
              delta: 1,
            })
          }, 1000)
          // 2、返回上一页
        } else {
          wx.showToast({
            title: '默认地址设置失败',
            icon: 'none',
            duration: 1500
          });
        }
      }
    });
  },
})