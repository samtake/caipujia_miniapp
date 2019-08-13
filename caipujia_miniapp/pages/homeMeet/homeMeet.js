 
import {
  homeMeet
} from 'homeMeet-model.js';
var homeMeets = new homeMeet();



import {
  Config
} from '../../utils/config.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    source_url: Config.imageUrl,
    activeid:0,
    showfix:false,
    bHeight:0,
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.discountClasify();
  },

  discountClasify: function () {
    var that = this
    homeMeets.discountClasify(null, (res) => {
      that.setData({
        cates: res.cates
      })
      that.discountList(0);
      //headbanner
      //创建节点选择器
      var query = wx.createSelectorQuery();
      //选择id
      query.select('#headbanner').boundingClientRect()
      query.exec(function (res) {
        console.log(res[0].height);
        that.setData({
          bHeight: res[0].height,
        });
      })

    })
  },

  discountList: function (tid) {
    var that = this;
    var req={
      ids: tid
    }
    homeMeets.discountList(req, (res) => {
      that.setData({
        list: res.list
      })
    })
  },
  upper:function(e){
    console.log("upper");
  },
  upper_th: function (e) {
    console.log("upper_th");
  },
  scroll: function (e) {
    var that=this;
    var bh = that.data.bHeight;
    var ctop = e.detail.scrollTop;
    console.log(ctop);
    if (ctop>= bh){
      //showfix
      that.setData({
        showfix:true,
      });
    }else {
      that.setData({
        showfix: false,
      });
    }
  },
  /**
   * 参数：
   * shopid、
   * activityid、活动ID
   * type、让详情页面根据type修改样式
   */

  chooseClick: function (event) {
    var activityid = homeMeets.getDataSet(event, 'activityid');
    var shopid = homeMeets.getDataSet(event, 'shopid');
    wx.navigateTo({
      url: '../homeShop/homeShop?shopid=' + shopid + '&activityid=' + activityid + '&type=activity',
    })
  },

  typeClick:function(event){
    console.log(event);
    var id = event.target.id;
     
    this.setData({
      activeid:id,
    });
    this.discountList(id)
  },

  todiscount:function(){
      wx.navigateTo({
        url: '../homeDiscount/homeDiscount',
      })
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