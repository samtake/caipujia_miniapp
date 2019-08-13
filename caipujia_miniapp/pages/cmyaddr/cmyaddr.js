// pages/cmyaddr/cmyaddr.js


import {
  Address
} from 'cmyaddr-model.js';
var address = new Address();


import {
  Config
} from '../../utils/config.js';



Page({

  /**
   * 页面的初始数据
   */
  data: {
    Addr:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.geAddrMsg();

    if (options.type){
      this.setData({
        ctype: options.type
      });
      
    }
    if (options.unionid) {
      this.setData({
        unionid: options.unionid
      });
    }
  },

  geAddrMsg: function () {
    
    var that = this
    address.getAddressList(null, (res) => {
     
      that.setData({
        Addr: res.data.list
        
      })

    })

  },
  editAddess: function (event) {
    // console.log(event.currentTarget.dataset.id);
    var Url = "../addAddr/addAddr?id=" + event.currentTarget.dataset.id + "&type=edit";
    console.log(Url);
    wx.navigateTo({
      url: Url
    })
  },
  addAddess:function(){
    wx.navigateTo({
      url: "../addAddr/addAddr?type=add"
    })
  },

  //点击地址
  tabAddr:function(event){
      var addrid=event.currentTarget.id;
      if(this.data.ctype=="select"){

          //订单选择地址
          if(this.data.unionid){
            var reqDict={
              unionid: this.data.unionid,
              addressid: addrid
            }
            address.setOrderAddr(reqDict, (res) => {
                console.info("orderaddr");
                 console.log( res);
              if (res != "" && res!=null){
                    wx.navigateBack({
                      
                    })
                }
            })




          }

        //unionid/"+unionid+"/addressid/" + selectAddressId + "/
      }

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