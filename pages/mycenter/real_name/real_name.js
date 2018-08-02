// pages/mycenter/real_name/real_name.js
const app = getApp();
let formId;
Page({

  data: {
    temp: '', //身份证正面
    untemp: '', //身份证反面
    teacherName: '', //姓名
    teacherNumber: '', //身份证号
    datas: '', //用户信息
    status: '', //状态信息
    baseUrl: app.globalData.baseUrl, //图片路径
    tempShang: '', //身份证正面路径
    untempShang: '', //身份证反面路径
    images: 0, //判断身份证正面图片的显示(0显示默认图片   1显示本地上传的图片  2显示服后台给的图片)
    unimages: 0, //判断身份证反面图片的显示(0显示默认图片   1显示本地上传的图片  2显示服后台给的图片)
  },
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.programName,
      path: 'pages/start/start?scene=' + app.globalData.userId
    }
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    });
    //获取认证信息接口
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}user/getAudit`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        userId: app.globalData.userId
      },
      success: res => {
        wx.hideLoading();
        console.log(res);
        this.setData({
          status: res.data.status
        });
        console.log(this.data.status);
        if (res.data.status) {
          this.setData({
            datas: res.data.data,
            teacherName: res.data.data.trueName,
            teacherNumber: res.data.data.IdCode,
            temp: res.data.data.data1,
            untemp: res.data.data.data2,
            tempShang: res.data.data.data1, //身份证正面路径
            untempShang: res.data.data.data2, //身份证反面路径
            images: 2,
            unimages: 2,
          });
          console.log("有数据时即为修改信息时")
          console.log(this.data.datas);
        } else {
          this.setData({
            images: 0,
            unimages: 0,
          });
          console.log("没有数据时即为添加信息时")
        }
      }
    });
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
        console.log(res);
        let tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        this.setData({
          temp: tempFilePaths[0],
          images: 1,
        });
        console.log(this.data.temp);
      }
    });
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
          untemp: tempFilePaths[0],
          unimages: 1,
        })
        console.log(this.data.untemp);
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
    } else if (!this.data.untemp) {
      wx.showToast({
        title: '请拍摄反面',
        image: '../../../image/warning.png',
        duration: 1500
      })
    } else {
      wx.showLoading({
        title: '图片上传中',
      })
      //上传身份证正面
      if (this.data.images != 1) {
        this.unGetList();
      } else {
        wx.uploadFile({
          url: `${app.globalData.api}common/uploadGoodsPic`,
          filePath: this.data.temp,
          name: 'file',
          formData: {
            userId: app.globalData.userId,
            folder: 'ID'
          },
          success: res => {
            console.log({
              userId: app.globalData.userId,
              folder: 'ID'
            });
            console.log(res);
            let ress = JSON.parse(res.data);
            console.log(ress);
            if (ress.status == 1) {
              this.setData({
                tempShang: ress.data.Image
              });
              console.log(this.data.tempShang);
              this.unGetList();
            } else {
              wx.hideLoading();
              wx.showToast({
                title: '身份证正面上传失败,请重新上传',
                icon: 'none',
                duration: 1500
              });
              console.log("身份证正面上传失败")
            }
          }
        });
      }
    }
  },
  //上传身份证反面
  unGetList() {
    if (this.data.unimages != 1) {
      this.tiJiao();
    } else {
      wx.uploadFile({
        url: `${app.globalData.api}common/uploadGoodsPic`,
        filePath: this.data.untemp,
        name: 'file',
        formData: {
          userId: app.globalData.userId,
          folder: 'ID'
        },
        success: res => {
          wx.hideLoading();
          console.log({
            userId: app.globalData.userId,
            folder: 'ID'
          });
          console.log(res);
          let ress = JSON.parse(res.data);
          console.log(ress);
          if (ress.status == 1) {
            this.setData({
              untempShang: ress.data.Image
            });
            console.log(this.data.untempShang);
            this.tiJiao();
          } else {
            wx.showToast({
              title: '身份证反面上传失败,请重新上传',
              icon: 'none',
              duration: 1500
            });
            console.log("身份证反面上传失败")
          }
        }
      });
    }
  },
  formSubmit(e){
    console.log(e);
    formId = e.detail.formId;
  },
  //修改或添加认证信息接口
  tiJiao() {
    let datasId = !this.data.datas.id ? 0 : this.data.datas.id;
    console.log(datasId);
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      method: 'POST',
      url: `${app.globalData.api}user/certification`,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        dataId: datasId,
        userId: app.globalData.userId,
        IdCode: this.data.teacherNumber,
        trueName: this.data.teacherName,
        type: 1,
        data1: this.data.tempShang,
        data2: this.data.untempShang,
        formId:formId,
      },
      success: res => {
        wx.hideLoading();
        console.log(res);
        console.log({
          dataId: this.data.datas.id,
          userId: app.globalData.userId,
          IdCode: this.data.teacherNumber,
          trueName: this.data.teacherName,
          type: 1,
          data1: this.data.tempShang,
          data2: this.data.untempShang,
          formId:formId,
        });
        if (res.data.status == 1) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1500
          });
          setTimeout(function() {
            wx.switchTab({
              url: '../../mycenter/mycenter'
            });
          }, 500);
        } else {
          wx.showToast({
            title: '提交失败',
            image: '../../../image/warning.png',
            duration: 1500
          });
        }
      }
    });
  }
})