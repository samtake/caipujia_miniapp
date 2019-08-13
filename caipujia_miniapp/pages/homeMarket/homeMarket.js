// pages/homeMarket/homeMarket.js


import {
    HomeMarket
} from 'homeMarket-model.js';
var homeMarket = new HomeMarket();


import {
    Config
} from '../../utils/config.js';


Page({

    /**
     * 页面的初始数据
     */
    data: {
        types: [{
            id: '0',
            'name': '销量冠军'
        }, {
            id: '1',
            'name': '评价最佳'
        }, {
            id: '2',
            'name': '综合排位'
        }],
        selectCurrent: 0,
        activeCategoryId: 0,
        source_url: Config.imageUrl,

        /**市场列表参数**/
        cid: 1,
        marketid: 2,
        numPerPage: 20,
        orderby: 0,
        pageNum: 1,

        /**市场列表*/
        curNav: 1,
        curIndex: 0

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getMarketInfo()

    },



    /**店铺排序点击方法*/
    tabClick: function (e) {
        var that = this;
        that.setData({
            activeCategoryId: e.currentTarget.id,
            orderby: e.currentTarget.id
        });
        that.getMarketList();
    },



    /**分类的点击方法*/
    switchRightTab: function (e) {
        var that = this;
        let id = e.target.dataset.id,
            index = parseInt(e.target.dataset.index);
        that.setData({
            curNav: id,
            curIndex: index,
            cid: id
        });
        that.getMarketList();
    },



    /**获取市场详情*/
    getMarketInfo: function() {
        var that = this

        var reqDict = {
            id: 1
        }


        homeMarket.getMarketInfo(reqDict, (res) => {
            that.setData({
                categorys: res.categorys,
                marketInfo: res.marketInfo,
                marketInfoImage: res.marketInfoImage
            })

            that.getMarketList();

        })

    },


    /**
     * 市场列表
     * */
    getMarketList: function () {
        var that = this;
        let orderBy = ['sales', 'score', ''];

        // var reqDict = {
        //     marketid: that.data.marketid,
        //     numPerPage: that.data.numPerPage,
        //     orderby: orderBy[that.data.orderby],
        //     pageNum: that.data.pageNum,
        //     cid: that.data.cid
        // };

        var reqDict = {
            orderby: orderBy[that.data.orderby],
            cid: that.data.cid
        };



        console.log('HomeMarket111' + JSON.stringify(reqDict))


        homeMarket.getMarketList(reqDict, (res) => {
            that.setData({
                list: res.list,
                pagers: res.pagers
            })
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