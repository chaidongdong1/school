// pages/mycenter/real_name/real_name.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    temp: '', //身份证正面
    untemp: '', //身份证反面
    teacherName: '', //姓名
    teacherNumber: '', //身份证号
  },
  onLoad: function(options) {

  },
  onShow: function() {

  },
  //输入的姓名
  bindName(e) {
    let teacherName = e.detail.value;
    console.log(teacherName);
    this.setData({
      teacherName: teacherName
    });
  },
  //身份证号
  bindNumber(e) {
    let teacherNumber = e.detail.value;
    console.log(teacherNumber);
    this.setData({
      teacherNumber: teacherNumber
    });
  },
  //身份证正面
  updata1: function() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        console.log(res)
        var tempFilePaths = res.tempFilePaths;
        this.setData({
          temp: tempFilePaths[0]
        })
        console.log(tempFilePaths[0])
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function(res) {
            var data = res.data
            console.log(res)
          }
        });
      }
    })
  },
  //身份证反面
  updata2: function() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        console.log(res)
        var tempFilePaths = res.tempFilePaths;
        this.setData({
          untemp: tempFilePaths[0]
        })
        console.log(this.data.untemp);
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function(res) {
            var data = res.data
            console.log(res)
          }
        })
      }
    })
  },
  //提交审核
  bindtapButton() {
    if (!this.data.teacherName) {
      wx.showToast({
        title: '姓名不能为空',
        image: '../../../image/warning.png',
        duration: 1500
      })
    } else if (!this.data.teacherNumber) {
      wx.showToast({
        title: '身份证不能为空',
        image: '../../../image/warning.png',
        duration: 1500
      })
    } else if (!this.data.temp) {
      wx.showToast({
        title: '请拍摄正面',
        image: '../../../image/warning.png',
        duration: 1500
      })
    }else if(!this.data.untemp){
      wx.showToast({
        title: '请拍摄反面',
        image: '../../../image/warning.png',
        duration: 1500
      })
    }else{

    }
  },
  onShareAppMessage: function() {

  },
})