// pages/detail/detail.js


import {
    Detail
} from 'detail-model.js';
var detail = new Detail();


import {
    Config
} from '../../utils/config.js';


Page({

    /**
     * 页面的初始数据
     */
    data: {
        source_url: Config.imageUrl,
        countdown: 10000,


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log('Detail555:'+options)
        this.setData({
            // type: options.type,
            // reqId: options.reqId,
            // reqActivityid: options.reqActivityid,
        })
        this.detail()
    },

    detail: function() {
        var that = this;
        var reqDict = {
            goodsid: '495',
            activity_id: '55'
        }
        detail.detail(reqDict, (res) => {

            that.setData({
                shuf_pics: res.shuf_pics,
                info: res.info,
               // property: res.property,
               // prompts: res.prompts,
                goods: res.goods,
                goodsDetail: res.goodsDetail
            })


            console.log('detail1111' + JSON.stringify(res))

        })

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