Page({

    /**
     * 页面的初始数据
     */
    data: {
        categories: [{ id: '0', name: '商品' }, { id: '1', name: '店铺' }],
        activeCategoryId: 0,
        loadingMoreHidden: true,
      goods: [{ id: '0', pic: '../../images/sx_5.png', name: '猪肉', price: '12.00', shop: '1号土猪', addr: '石楼农贸市场' }, { id: '0', pic: '../../images/sx_5.png', name: '猪肉', price: '12.00', shop: '1号土猪', addr: '石楼农贸市场' }],
      shops: [{ id: '0', pic: '../../images/sx_5.png',goodsnumber:"324", shop: '1号土猪', addr: '石楼农贸市场' }],
    },


    tabClick: function (e) {
        this.setData({
            activeCategoryId: e.currentTarget.id
        });
        this.getGoodsList(this.data.activeCategoryId);
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