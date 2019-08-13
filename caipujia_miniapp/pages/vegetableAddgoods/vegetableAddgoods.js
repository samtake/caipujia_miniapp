// pages/vegetable-addgoods/index.js
//、vegetableAddgoods - model
import {
  VegetableAddgoods
} from 'vegetableAddgoods-model.js';
var vegetableAddgoods = new VegetableAddgoods();


import {
  Config
} from '../../utils/config.js';



Page({

    /**
     * 页面的初始数据
     */
    data: {
      notgood:false,//沒有商品
      typeid:0,
      g_price:0,
        source_url: Config.imageUrl,
        hideShopPopup: true,
        buyNumber: 0,
        buyNumMin: 1,
        buyNumMax: 0,

        propertyChildIds: "",
        propertyChildNames: "",
        canSubmit: false, //  选中规格尺寸时候是否允许加入购物车
        shopCarInfo: {},
        shopType: "addShopCar",//购物类型，加入购物车或立即购买，默认为加入购物车

 
        goodsList:{},
        //hideToastSuccess:false,//隐藏成功提示
        
      TimerOut:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (e) {
        var self = this;
         
        var cid=e.cid;
      var did = e.did;
        var gname=e.gname;
         
      if (did){
            //獲取參數id，菜譜的id
             self.searchgoods(cid, gname);
              self.setData({
                typeid:cid,
                g_did: did,//要删除的id
                g_gname: gname
              });
            
        }else{
            self.searchgoods(cid,"");
            self.setData({
              typeid: cid,
              
            });
        }
        
        



    },

  getkword:function(event){
    //console.info("kw:");
    //console.log(event.detail.value);
    this.setData({
      sKWord: event.detail.value
    });
  },

  // 搜索按钮
  tosearch: function (event){
    if (this.data.sKWord.length>0){
      this.searchgoods(this.data.typeid,this.data.sKWord);
    }
    
    },
    searchgoods:function(typeid,kword){
      var reqDict={
        type_id: typeid,
        keyword: kword
      };
      vegetableAddgoods.searchGoods(reqDict,(res) => {
        this.setData({
          goodsList: res
        })
        if (res==null|| res==""){
            this.setData({
              notgood: true
            })
        }else{
          this.setData({
            notgood: false
          })
        }
             
      });

        //pub.alhtech.com/web/userCookbook/selectGoodsLi/type_id/14/keyword/0/numPerPage/20/p/1/
    },

    searchClick: function () {
        wx.redirectTo({
          url: '../vegetableSearch/vegetableSearch',
        })
    },



    // 添加菜谱 弹出商品信息
    addCaipu:function(event){
        //getGoodsDetial 
        console.log(event.currentTarget.id);
        this.getGoodsDetial(event.currentTarget.id);
    },
    getGoodsDetial:function(gid){
        //goodsid
      var reqDict = {
        goodsid: gid
      };
      vegetableAddgoods.getGoodsDetial(reqDict,(res)=>{
        console.log(res);
        this.setData({         
          goodsinfo: res,
          g_gid: res.property[0].id,
          g_pid:0,// res.prompts[0].id,
          g_pstr: "",// res.prompts[0].name,
          g_price: res.property[0].price       
        })

        this.setData({
          hideShopPopup: false
        })


      })
    },

  //把商品的规格传入菜谱
  addtoCaipu:function(){
    var reqDict={
      type_id: this.data.typeid,
      pids: this.data.g_gid
      
    }
    vegetableAddgoods.addGoodPropertyAtCookbook(reqDict,(res)=>{
      console.info("res=" + res.status);
        if(res.status==1){

          if (this.data.g_did){
              this.deleteCookbook();
             }else{
                 wx.showToast({
                   icon: "success",
                   title: '成功加入菜谱',
                   duration:2000,
                   
                 })
                  this.closePopupTap();

                  this.data.TimerOut = setTimeout(function () {
                    wx.hideToast();
                    wx.navigateBack({

                    })

                  }, 1000);

             }

             
        }
    });
  },

  // 删除菜谱的的商品
  deleteCookbook:function(){
          var reqDict = {
            type_id: this.data.typeid,
            pids: this.data.g_did

          }
   
          ///web/UserCookbook/deleteGoodPropertyAtCookbook/
    vegetableAddgoods.deleteCookbook(reqDict, (res) => {
            console.info("res=" + res.status);
            if (res.status == 1) {
 
              wx.showToast({
                icon: "success",
                title: '成功加入菜谱',
                duration: 2000,
                 
              })
                this.closePopupTap();

                this.data.TimerOut = setTimeout(function () {
                  wx.hideToast();
                  wx.navigateBack({

                  })

                }, 1000);

              

            }
          });
  },

  //  g_gid: res.property[0].id,
  //g_pid: res.prompts[0].id 
    // 选择规格
    labelItemTap:function(event){
      //console.log(event);
      this.setData({ 
        g_gid: event.currentTarget.id,
        g_price:event.target.dataset.price   
      });
      

    },
  labelItemTap2: function (event) {
   
    var pid = event.currentTarget.id;
    var pstr = event.target.dataset.name;
    if (pid==this.data.g_pid){
      this.setData({
        g_pid:0,
        g_pstr:""
      });
    }else{
      this.setData({
        g_pid: pid,
        g_pstr: pstr

      });
    }
     
  },
    /**
     * 规格选择弹出框
     */
    bindGuiGeTap: function () {
        this.setData({
            hideShopPopup: false
        })
    },
    /**
     * 规格选择弹出框隐藏
     */
    closePopupTap: function () {
        this.setData({
            hideShopPopup: true
        })
    },
    numJianTap: function () {
        if (this.data.buyNumber > this.data.buyNumMin) {
            var currentNum = this.data.buyNumber;
            currentNum--;
            this.setData({
                buyNumber: currentNum
            })
        }
    },
    numJiaTap: function () {
        if (this.data.buyNumber < this.data.buyNumMax) {
            var currentNum = this.data.buyNumber;
            currentNum++;
            this.setData({
                buyNumber: currentNum
            })
        }
    },
    /**
     * 选择商品规格
     * @param {Object} e
     */
    labelItemTap1: function (e) {
        var that = this;
       
        // 取消该分类下的子栏目所有的选中状态
        var childs = that.data.goodsDetail.properties[e.currentTarget.dataset.propertyindex].childsCurGoods;
        for (var i = 0; i < childs.length; i++) {
            that.data.goodsDetail.properties[e.currentTarget.dataset.propertyindex].childsCurGoods[i].active = false;
        }
        // 设置当前选中状态
        that.data.goodsDetail.properties[e.currentTarget.dataset.propertyindex].childsCurGoods[e.currentTarget.dataset.propertychildindex].active = true;
        // 获取所有的选中规格尺寸数据
        var needSelectNum = that.data.goodsDetail.properties.length;
        var curSelectNum = 0;
        var propertyChildIds = "";
        var propertyChildNames = "";
        for (var i = 0; i < that.data.goodsDetail.properties.length; i++) {
            childs = that.data.goodsDetail.properties[i].childsCurGoods;
            for (var j = 0; j < childs.length; j++) {
                if (childs[j].active) {
                    curSelectNum++;
                    propertyChildIds = propertyChildIds + that.data.goodsDetail.properties[i].id + ":" + childs[j].id + ",";
                    propertyChildNames = propertyChildNames + that.data.goodsDetail.properties[i].name + ":" + childs[j].name + "  ";
                }
            }
        }
        var canSubmit = false;
        if (needSelectNum == curSelectNum) {
            canSubmit = true;
        }
        // 计算当前价格
        if (canSubmit) {
            wx.request({
                url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/price',
                data: {
                    goodsId: that.data.goodsDetail.basicInfo.id,
                    propertyChildIds: propertyChildIds
                },
                success: function (res) {
                    that.setData({
                        selectSizePrice: res.data.data.price,
                        totalScoreToPay: res.data.data.score,
                        propertyChildIds: propertyChildIds,
                        propertyChildNames: propertyChildNames,
                        buyNumMax: res.data.data.stores,
                        buyNumber: (res.data.data.stores > 0) ? 1 : 0
                    });
                }
            })
        }


        this.setData({
            goodsDetail: that.data.goodsDetail,
            canSubmit: canSubmit
        })
    },


    // hideChoose:function(){
    //     var self = this;
    //     self.setData({
    //         showChoose: false
    //     })

    // },


    // showChoose: function () {
    //     var self = this;
    //     self.setData({
    //         showChoose: true
    //     })

    // },



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