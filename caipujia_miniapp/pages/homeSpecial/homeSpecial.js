// pages/homeSpecial/homeSpecial.js


import {
    HomeSpecial
} from 'homeSpecial-model.js';

var homeSpecial = new HomeSpecial();

import {
    Config
} from '../../utils/config.js';


Page({

    /**
     * 页面的初始数据
     */
    data: {
        source_url: Config.imageUrl,
        right:'< 商品'

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            specialId: options.specialId
        })

        this.specialInfo()

    },


    specialInfo: function() {
        var that = this
        var reqDict = {
            id: that.data.specialId
        }

        console.log('HomeSpecial111:' + JSON.stringify(reqDict))

        homeSpecial.specialInfo(reqDict, (res) => {
            that.setData({
                shufflingAds: res.shufflingAds,
                info: res.info,
                goods: res.goods,
                article: res.article,
                base_cates: res.base_cates,
            })

        })

    },


    showPopup() {
        let popupComponent = this.selectComponent('.J_Popup');
        popupComponent && popupComponent.show();
    },
    hidePopup() {
        let popupComponent = this.selectComponent('.J_Popup');
        popupComponent && popupComponent.hide();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})