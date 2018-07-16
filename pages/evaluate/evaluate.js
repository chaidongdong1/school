// pages/evaluate/evaluate.js
let listsHong = ['../../image/xing-xuan.png', '../../image/xing-xuan.png', '../../image/xing-xuan.png', '../../image/xing-xuan.png', '../../image/xing-xuan.png'], //商品打分红
  listsHei = ['../../image/xing-wei.png', '../../image/xing-wei.png', '../../image/xing-wei.png', '../../image/xing-wei.png', '../../image/xing-wei.png']; //商品打分黑
Page({
  data: {
    lists: ['../../image/xing-xuan.png', '../../image/xing-xuan.png', '../../image/xing-xuan.png', '../../image/xing-xuan.png', '../../image/xing-xuan.png'], //商品打分
    listsIndex:4,  //商品打分下标(代表5星)
    list: ['../../image/xing-xuan.png', '../../image/xing-xuan.png', '../../image/xing-xuan.png', '../../image/xing-xuan.png', '../../image/xing-xuan.png'], //快递打分
    listIndex:4,  //快递打分下标(代表5星)
    text:'',   //商品评价
    temp:[],  //评价上传的图片
  },
  onLoad: function(options) {
    
  },
  //商品打分
  bindtapDafen(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    this.setData({
      listsIndex:index
    });
    console.log(this.data.listsIndex);
    let listZhong = listsHong.slice(0,index+1);
    let listWei = listsHei.slice(0,(4-index));
    console.log(listZhong);
    console.log(listWei);
    this.setData({
      lists:listZhong.concat(listWei)
    });
  },
  //快递打分
  bindtapKuai(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    this.setData({
      listIndex:index
    });
    console.log(this.data.listIndex);
    let listZhong = listsHong.slice(0,index+1);
    let listWei = listsHei.slice(0,(4-index));
    console.log(listZhong);
    console.log(listWei);
    this.setData({
      list:listZhong.concat(listWei)
    });
  },
  //评价
  bindText(e){
    let text = e.detail.value;
    this.setData({
      text:text
    });
  },
  //添加图片
  bindtapPhost(){
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        console.log(res)
        var tempFilePaths = res.tempFilePaths;
        this.setData({
          temp: this.data.temp.concat(tempFilePaths)
        })
        console.log(this.data.temp)
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload',
          filePath: tempFilePaths,
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
});