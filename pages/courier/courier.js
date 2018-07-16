// pages/courier/courier.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    take_info: '',
    send_info: '',
    choose1: '',
    money:'1.00',
    choose2: 0,
    time:[{
      time:'12:00-14:00',
      id:'1',
      price:'0.00'
    }, {
      time: '18:00-20:00',
      id: '2',
      price: '0.00'
    },{
      time: '立即送达',
      id: '5',
      price: '3.00'
    }],
    weight: [{
      weight: '5kg以内',
      id: '1',
      price: '0.00'
    }, {
      weight: '5kg以外',
      id: '2',
      price: '3.00'
    }],
    textarea:''
  },
  // 选择送达时间
  choose1(e){
    var id = e.currentTarget.dataset.id;
    this.setData({
      choose1: id
    })
  },
  // 预估重量
  choose2(e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      choose2: id
    })
  },
  // 备注信息
  textarea(e){
    var val = e.detail.value;
    this.setData({
      textarea:val
    })
  },
  // 提交
  submit(){
    var choose1 = this.data.choose1; 
    var choose2 = this.data.choose2;
    var take_info = this.data.take_info;
    var send_info = this.data.send_info;
    var textarea = this.data.textarea;
    if (choose1==0){
      wx.showToast({
        title: '请填写取件地址',
        icon:'none'
      })
      return
    }
    if (!take_info) {
      wx.showToast({
        title: '请填写送件地址',
        icon: 'none'
      })
      return
    }
    if (!send_info) {
      wx.showToast({
        title: '请选择送达时间',
        icon: 'none'
      })
      return
    }
    if (choose2 == 0) {
      wx.showToast({
        title: '请预估重量',
        icon: 'none'
      })
      return
    }
    var courier_buy = {
      choose1: choose1,
      choose2: choose2,
      take_info: take_info,
      send_info: send_info,
      textarea: textarea
    }
    wx.navigateTo({
      url: './submit/submit'
    })
    
  },
  onLoad: function (options) {
    // wx.removeStorageSync('take_info');
    // wx.removeStorageSync('send_info');
  }, 
  onShow: function () {
    // 取件信息
    var take_info = wx.getStorageSync('take_info');
    //console.log(take_info)
    if (take_info){
      this.setData({
        take_info: take_info
      })
    }
    // 收件信息
    var send_info = wx.getStorageSync('send_info');
    //console.log(send_info)
    if (send_info) {
      this.setData({
        send_info: send_info
      })
    }
  },
  // 选择取件地址
  take: function () {
    wx.navigateTo({
      url: 'perfect/perfect'
    })
  },
  // 选择收件地址
  send: function () {
    wx.navigateTo({
      url: 'send_where/send_where'
    })
  },
  onShareAppMessage: function () {
  
  }
})