// pages/csteps/csteps.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      stepdata:[
        {id:1,date:"09月04日",
          goods: [{ id: 1, marketname: "石楼菜市场", shopname: "猪肉档", goodsname: "脊骨", pic:"../../images/sx_5.png",price:"23.45"},
            { id:2, marketname: "石楼菜市场3423424", shopname: "猪肉档2352352", goodsname: "sfsf脊骨", pic: "../../images/sx_5.png", price: "364" }
          ]
        },
        {
          id: 1, date: "09月07日",
          goods: [{ id: 1, marketname: "石楼菜市场", shopname: "猪肉档", goodsname: "脊骨", pic: "../../images/sx_5.png", price: "23.45" },
          { id: 2, marketname: "石楼菜市场3423424", shopname: "猪肉档2352352", goodsname: "sfsf脊骨", pic: "../../images/sx_5.png", price: "364" }
          ]
        }
      ]
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