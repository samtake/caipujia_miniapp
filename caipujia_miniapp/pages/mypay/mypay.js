// pages/mypay/mypay.js

 

import {
  Mypay
} from 'mypay-model.js';
var mypay = new Mypay();

 

//toData
import {
  Config
} from '../../utils/config.js';
//var config = new Config();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    source_url: Config.imageUrl,
      categories: [{ id: '1', name: '待付款' }, { id: '2', name: '待抢单' }, { id: '3', name: '配送中' }, { id: '4', name: '待评价' }, { id: '0', name: '全部' }],
      activeCategoryId: 0,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
          activeCategoryId: options.activeCategoryId,
      });

      wx.setNavigationBarTitle({
          title: options.title,
          success: function (res) {
              console.log('设置成功')
              // success
          }
      });
      this.getOrderList(this.data.activeCategoryId);
  
  },
  getOrderList: function (Cstatus){

    var reqUrl="";
    if (Cstatus == 0 || Cstatus==1){
      reqUrl = '/web/userOrder/orderList/';
      }else{
      reqUrl = "/web/userOrder/list/";

      }

    var that=this;
      var reqDict={
        status: Cstatus,
      }
    mypay.getOrderList(reqUrl,reqDict,(res)=>{
      //formatTime
      if (Cstatus == 1 || Cstatus == 0 ){ 
            for (var key in res){
              console.log(res[key]["create_time"]);
              var orderUid = res[key]["unionid"];
              var allprice = res[key]["order_total_amount"];
              var orders = res[key]["orders"];
              for (var item in orders){
                orders[item]["unionid"] = orderUid;
                orders[item]["order_total_amount"]=allprice;

                var goods = orders[item]["goods"];
                for (var gitem in goods){
                  goods[gitem]["source_url"] = that.data.source_url;
                }
              }
              
            }

      } else if (Cstatus == 2 || Cstatus == 3 || Cstatus == 4){
          for (var key in res) {
            
            var goods = res[key]["goods"];
              for (var gitem in goods) {
                goods[gitem]["source_url"] = that.data.source_url;
              }
            
          }
      }
          that.setData({
            orderList:res,
          });
          
    });


    },

    tabClick: function (e) {
        this.setData({
            activeCategoryId: e.currentTarget.id
        });
      this.getOrderList(this.data.activeCategoryId);
    },


// 点击付款按钮
    topaymoney:function(event){
      //console.log(event);
      var cunionid = event.currentTarget.dataset.unionid;
      var cmtype = event.currentTarget.dataset.modeltype;
      wx.navigateTo({
        url: '../corder/corder?unionid=' + cunionid + "&modeltype=" + cmtype,
      })

      ///web/UserOrder/cmforder/unionid/{$vo.unionid}/modeltype/1/

    },



})