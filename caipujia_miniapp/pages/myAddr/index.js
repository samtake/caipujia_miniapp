// pages/menu/myAddr/index.js


import {
  Address
} from 'index-model.js';
var address = new Address();


import {
  Config
} from '../../utils/config.js';




Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },

  addAddess: function () {
    wx.navigateTo({
      url: "../addAddr/index"
    })
  },
  editAddess:function(event){
   // console.log(event.currentTarget.dataset.id);
    wx.navigateTo({
      url: "../addAddr/index?id="+event.currentTarget.dataset.id+"&"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.geAddrMsg();
  },


  geAddrMsg: function () {

    var that = this
    address.getAddressList(null, (res) => {
      console.log("return="+res);
      that.setData({
        Addr: res.data.list

      })

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})