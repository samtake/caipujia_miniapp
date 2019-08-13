// pages/corder/corder.js

import {
  Corder
} from 'corder-model.js';
var corder = new Corder();


import {
  Config
} from '../../utils/config.js';




Page({

  /**
   * 页面的初始数据
   */
  data: {
    source_url: Config.imageUrl,
    isSetpay: false,
    payType: null,
    payWay: "",


    showtime: false,
    showtimeIndex: 0,
    showtimeText: "",
    showtimeIndex1: 0,
    showtimeText1: "",
    selectTimeId: 0,
    selectTimeText: "",
    //daylist: [{ id: 0, text: "今天" },{ id: 1, text: "明天" },{ id: 2, text: "后天" }]

    multiArray: ['今天', '明天', '后天'],
    timearr: ['尽快送达'],
    value: [0, 0],
    selectTime: "",

    timeCount:null,//时间计时器

    activity_tag:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    console.log(e);
    var unionid = e.unionid;

    if (unionid){
      var reqDict = {
        unionid: unionid,
        modeltype: 1
      }
      this.credateOrder(reqDict);
      this.getOrderTimes();

      this.setData({
        unionid: unionid,
        activity_tag: e.activity_tag,
      });

    }



    wx.getStorage({
      key: 'payType',
      success: function (res) {
        console.log(res.data)
        if (res.data!=""){
          var paymsg = res.data.split("-");
          this.setData({
            isSetpay:true,
            payType: paymsg[0],
            payWay: paymsg[1]
          });
        }
         
      }
    })




     
    //this.getallcartgoods();
  },

  getOrderTimes: function() {
    //orderTime
    var that = this;
    corder.orderTime(null, (res) => {
      var time = new Array();
      for (var key in res) {

        var tlist = res[key];
        var arr1 = new Array();
        arr1.push('尽快送达');
        for (var item in tlist) {
          console.log("item=" + item + ";time=" + tlist[item]["timer"]);
          arr1.push(tlist[item]["timer"]);
          // arr1.push(tlist[item]["timer"]);
        }
        time.push({
          "day": this.data.multiArray[key],
          "time": arr1
        });
      }

      that.setData({
        timelist: time,
        timearr: time[0]["time"],
        selectTime: this.data.multiArray[this.data.value[0]] + this.data.timearr[this.data.value[1]],
      });

    })
  },
  //确认订单 /web/UserOrder/cmforder/
  credateOrder: function (reqDict) {
    var that = this;
    // var reqDict = {
    //   unionid: unid,
    //   modeltype: 1
    // }
    corder.cmforder(reqDict, (res) => {

      var pmsg = res.pays;
      var payinfomsg = new Array();
      for (var key in pmsg) {
        var showtip = false;
        var icon = "../../images/icon/pay_yue.png";
        if (pmsg[key] == "微信支付") {
          icon = "../../images/icon/pay_wx.png";
        } else {
          if (res.user_balance < res.info.baseinfo.total_goods_amount) {
            showtip = true;
          }
        }
        payinfomsg.push({
          id: key,
          text: pmsg[key],
          icon: icon,
          show: showtip
        });

      }

      //orderAddr

      //console.log(res);
      that.setData({
        OderMsg: res,
        address: res.info.baseinfo.address, //地址信息
        count_goods: res.info.baseinfo.count_goods, //商品数
        total_goods_amount: res.info.baseinfo.total_goods_amount,
        order_total_amount: res.info.baseinfo.order_total_amount, //总价
        ordergoods: res.info.data, //商品信息
        payinfo: payinfomsg, // res.pays,//支付方式
        userbalance: res.user_balance, //用户余额  1
        price_differen: res.price_differen, //差价
        predict_delivery_time: res.predict_delivery_time,
        coupons_sum_model: res.coupons_sum_model,
        totla_coupons_amount: res.info.baseinfo.totla_coupons_amount, //红包优惠
        coupons_ids: res.info.baseinfo.coupons_ids,
        delivery_date: res.info.baseinfo.delivery_date + res.predict_delivery_time,
        pay_password: ""
      });


      if (res.info.baseinfo.address == "" || res.info.baseinfo.address==null){
          this.searchUserAddress();
      }

    })
  },
  /**
   * remark=&user_balance=98610.00&pay_type=4&unionid=UNI908590085730336&coupons_ids=&amount=117.01&activity_tag=&coupons_sum_model=0&delivery_date=%20&pay_password=0
   */
  /**form
   * userbalance
   * pay_type---payType
   * unionid  
   * coupons_ids
   * amount---order_total_amount
   * activity_tag   
   * coupons_sum_model
   * delivery_date  selectTime
   *  pay_password
   * remark
   */

  // 提交订单
  orderSubmit: function() {
    var str = "";
    //address: res.info.baseinfo.address, //地址信息
    if (this.data.address == null) {
      str += "请选择收货地址;";
    }
    if (this.data.payType==null) {
      str += "请选择支付方式;";
    }
    if (this.data.selectTime == "") {
      str += "请选择送达时间；";
    }

    if (str != "") {
      wx.showToast({
        title: str,
        icon: "none",
        duration: 2000,
      })
    } else {
      var ordepost = {
        userbalance: this.data.userbalance,
        pay_type: this.data.payType,
        unionid: this.data.unionid,
        coupons_ids: this.data.coupons_ids,
        amount: this.data.order_total_amount,
        activity_tag: this.data.activity_tag,
        coupons_sum_model: this.data.coupons_sum_model,
        delivery_date: this.data.selectTime,
        pay_password: this.data.pay_password,
        remark: ""
      }

      corder.postForm(ordepost, (res) => {
          console.info("提交订单后信息：");
          console.log(res);
          if(res.status==1){
            this.toPay(res.data.url);
            
          }else{
            wx.showToast({
              title: '支付失败',
              icon:'none',
              duration:1000,
            })
            this.data.timeCount = setTimeout(function () {
              // 到待付款
              wx.redirectTo({
                url: '../mypay/mypay?activeCategoryId=0&title=待付款',
              })
            }, 1000);

          }
      });



    }
  },


// 支付
  toPay:function(dataUrl){

    corder.toPay(dataUrl, (payres) => {
      console.log(payres);
      if (payres.status==1){
        wx.showToast({
          title: '支付成功',
          icon:"success",
          duration:2000,
          mask:true,
        })
        this.data.timeCount=setTimeout(function(){
            // 成功支付到待抢单
          wx.redirectTo({
              url: '../mypay/mypay?activeCategoryId=1&title=待抢单',
            })
        },2000);
         
      }else{
        // 支付失败
            wx.showToast({
              title: '支付失败',
              icon: "success",
              duration: 2000,
              mask: true,
            })
            this.data.timeCount = setTimeout(function () {
              // 到待付款
              wx.redirectTo({
                url: '../mypay/mypay?activeCategoryId=0&title=待付款',
              })
            }, 2000);
      }
    })
  },



// 获取默认地址
  searchUserAddress:function(){
    var that=this;
      corder.getAddress(null,(res)=>{
        console.info("地址信息：");
        console.log(res);
        var addresslist=res.list;
        var addrLen = addresslist.length;
        if (addrLen>0){
            if (addrLen==1){
                var reqDict = {
                  unionid: that.data.unionid,
                  addressid: addresslist[0].id,
                  modeltype:0,
                }
              that.credateOrder(reqDict);
            }else{

              addresslist.forEach(function(value,index,arrSelf){
                if (value.is_default==1){
                  var reqDict = {
                    unionid: that.data.unionid,
                    addressid: value.id,
                    modeltype: 0,
                  }
                  that.credateOrder(reqDict);
                 }
              });

            }
        }
      });
  },

  // 获取购物车信息
  getallcartgoods: function() {
    var that = this;

    corder.getCartMsg(null, (res) => {
      //console.log(res);
      that.setData({
        cartInfo: res.data.sum_data,
        cartGoods: res.data.goods
      });
    });
  },

  //更新订单备注
  updataRmark: function(event) {
    // console.log(event.detail.value);
    var value = event.detail.value;
    var oid = event.currentTarget.id;
    var reqDict = {
      order_id: oid,
      remark: value
    }
    corder.updataRmark(reqDict, (res) => {
      console.log(res);
    });

  },

  tabselectAddress: function() {
    //url: '../cmyaddr/cmyaddr?unionid=' + this.data.unionid,
    wx.navigateTo({
      url: '../cmyaddr/cmyaddr?type=select&unionid=' + this.data.unionid,
    })
  },
  setpayway: function(event) {
    console.log(event);
    var that = this;
    var payid = event.currentTarget.id;
    var paytext = event.currentTarget.dataset.text;
    that.setData({
      payType: payid,
      payWay: paytext,
      isSetpay: true,
    });

    wx.setStorage({
      key: "payType",
      data: payid + "-" + paytext,
    });


  },

  setSelectTime: function(event) {
    var that = this;
    var tindex = event.currentTarget.dataset.id;
    var ttext = event.currentTarget.dataset.time;
    that.setData({
      selectTimeId: tindex,
      selectTimeText: ttext,
      showtimeIndex: this.data.showtimeIndex,
      showtimeIndex1: this.data.showtimeIndex, //更新当前时间的类型
      showtimeText1: this.data.showtimeText,
    });
  },

  settimeType: function(event) {
    var cindex = event.currentTarget.dataset.index;
    var ctext = event.currentTarget.dataset.text;
    this.setData({
      showtimeIndex1: this.data.showtimeIndex, //记录更改前的
      showtimeText1: this.data.showtimeText,
      showtimeIndex: cindex,
      showtimeText: ctext,
    });
  },

  time_sure: function() {

    this.setData({
      selectTime: this.data.multiArray[this.data.value[0]] + this.data.timearr[this.data.value[1]],
    });
    this.hideMask();


  },
  // time_cancel:function(){
  //   this.hideMask();
  // },

  showMask: function() {
    let $mask = this.selectComponent('.J_mask')
    /*$mask.show()*/
    $mask.show()
    this.setData({
      showtime: true,
    });
  },
  hideMask: function() {
    let $mask = this.selectComponent('.J_mask')
    /*$mask.hide()*/
    $mask.hide();
    this.setData({
      showtime: false,
    });
  },


  //  支付方式
  showPopup_pay: function() {
    let popupComponent = this.selectComponent('.J_PopupPW');
    popupComponent && popupComponent.show();
  },
  hidePopup_pay: function() {
    let popupComponent = this.selectComponent('.J_PopupPW');
    popupComponent && popupComponent.hide();
  },

  //remark=& user_balance=98610.00& pay_type=4& unionid=UNI908590085730336& coupons_ids=& amount=117.01 & activity_tag=& coupons_sum_model=0 & delivery_date=% 20 & pay_password=0


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var reqDict = {
      unionid: this.data.unionid,
      modeltype: 1
    }
    this.credateOrder(reqDict);
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

  },

  bindChangeColumn: function(e) {
    var value = this.data.value;
    var current_value = e.detail.value;

    if (value[0] != current_value[0]) {
      // 滑动日期
      var ctime = this.data.timelist[current_value[0]].time;

      this.setData({
        value: [current_value[0], 0],
        timearr: ctime
      });

    } else if (value[0] == current_value[0] && value[2] != current_value[1]) {
      //滑动时间
      this.setData({
        value: current_value,

      });
    }


  }

})