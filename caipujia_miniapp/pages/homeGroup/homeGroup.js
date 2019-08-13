// pages/homeGroup/homeGroup.js
import {
    HomeGroup
} from 'homeGroup-model.js';
var homeGroup = new HomeGroup();


import {
    Config
} from '../../utils/config.js';


Page({

    /**
     * 页面的初始数据
     */
    data: {
        source_url: Config.imageUrl,
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.groupClasify()
    },

    groupClasify: function () {
        var that = this
        homeGroup.groupClasify(null, (res) => {
            that.setData({
                cates: res.cates
            })
            that.groupList()
        })
    },

    groupList: function () {
        var that = this
        homeGroup.groupList(null, (res) => {
            that.setData({
                list: res.list
            })
        })
    },


    /**
     * 参数：
     * shopid、
     * activityid、活动ID
     * type、让详情页面根据type修改样式
     */

    chooseClick: function (event) {
        // var activityid = homeGroup.getDataSet(event, 'activityid');
        // var shopid = homeGroup.getDataSet(event, 'shopid');
        // wx.navigateTo({
        //     url: '../homeShop/homeShop?shopid=' + shopid + '&activityid=' + activityid + '&type=activity',
        // })
    },



    cellClick: function (event) {

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