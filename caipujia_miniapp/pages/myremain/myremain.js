// pages/myremain/myremain.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:"1000.00",
    selectIdx:0,
    selectPrice:0,
    czhilist:[
      {id:1,price:"200",yhui:"20.00"},
      { id:2, price: "100", yhui: "10.00" },
      { id:3, price: "80.00", yhui: "5.00" },
      { id:4, price: "50.00", yhui: "2.00" },
      { id:5, price: "30.00", yhui: "1.00" }
    ]
  },

  setMoney:function(event){
    var that=this;
    var cidx = event.currentTarget.dataset.index;
    var cprice=event.currentTarget.dataset.price;
    that.setData({
      selectIdx: cidx,
      selectPrice: cprice,

    });

     
  },
  toremainDetail:function(){
    wx.navigateTo({
      url: '../myremainDetail/myremainDetail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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