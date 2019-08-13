import {
  Vegetable
} from 'vegetable-model.js';
var vegetable = new Vegetable();


import {
  Corder
} from '../corder/corder-model.js';
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
    showDeleteButton: false,
    showEdit: false, //是否是编辑状态 true是
    caipu: "",
    editfname: "", //修改分类名称的文本值
    editfid: 0, //修改分类的id
    editcpname: "",
    editcpid: 0,
    TimerOut: null,

    //购物车信息
    cartInfo: {},
    cartGoods: {},


  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.userCookbook();
    this.getallcartgoods();
  },


  userCookbook: function() {
    var that = this

    vegetable.userCookbook(null, (res) => {
      // console.info("菜谱分类：");
      // console.log(res.cates);
      that.setData({
        cates: res.cates,
        source_url: res.source_url,
        tagActiveid: res.cates[0].id
      })
      that.initTagclick(res.cates[0].id);
    })
  },

  /**添加菜谱分类  + */
  addTagClickShow: function() {
    let dialogComponent = this.selectComponent('.wxc-dialog1')
    dialogComponent && dialogComponent.show();
  },


  // 隐藏弹层
  addTagClickHide() {
    let dialogComponent = this.selectComponent('.wxc-dialog1')
    dialogComponent && dialogComponent.hide();
  },


  editcpu: function(event) {
    if (this.data.showEdit) {
      this.setData({
        editcpname: event.currentTarget.dataset.name,
        editcpid: event.currentTarget.dataset.id,
        editcateid: event.currentTarget.dataset.cateid
      });
      this.addTagClickShow1();
    }
  },

  /**添加菜谱 + */
  addTagClickShow1: function() {
    let dialogComponent = this.selectComponent('.wxc-dialog2')
    dialogComponent && dialogComponent.show();
  },


  // 隐藏添加菜谱弹层
  addTagClickHide1() {
    let dialogComponent = this.selectComponent('.wxc-dialog2')
    dialogComponent && dialogComponent.hide();
  },




  // 添加菜谱分类 editfname: event.currentTarget.dataset.name,
  // editfid: event.currentTarget.id,
  onConfirm(e) {
    var that = this

    if (that.data.category == undefined) {
      return
    }
    var reqDict = null;
    if (this.data.showEdit) {
      reqDict = {
        id: that.data.editfid,
        name: that.data.category,

      }
    } else {
      reqDict = {
        id: '0',
        name: that.data.category,

      }
    }

    vegetable.operationCategory(reqDict, (res) => {
      that.userCookbook()
    })
    that.addTagClickHide()
  },

  // 隐藏弹层
  onCancel() {
    this.addTagClickHide()
  },

  // 添加菜谱
  onConfirm1(e) {
    var that = this

    if (that.data.caipu == undefined) {
      return
    }

    var reqDict = null;
    if (this.data.showEdit) {

      reqDict = {
        cate_id: that.data.editcateid,
        title: that.data.caipu,
        type_id: that.data.editcpid

      }

    } else {
      reqDict = {
        cate_id: that.data.tagActiveid,
        title: that.data.caipu,

      }

    }

    console.log(reqDict);
    ///web/userCookbook/createCookbook/ cate_id title
    vegetable.createCookbook(reqDict, (res) => {
      console.info("添加菜谱");

      that.cookbooks(that.data.tagActiveid);
    })
    that.addTagClickHide1()
  },

  // 隐藏弹层
  onCance1l() {
    this.addTagClickHide1()
  },

  // 请填写菜谱分类名
  setCategory: function(e) {
    var that = this;
    that.data.category = e.detail.value;
  },

  setcaipu: function(e) {
    var that = this;
    that.data.caipu = e.detail.value;
  },


  /**编辑菜谱      删除，编辑功能 */
  editTagClick: function() {
    var that = this;

    if (that.data.showDeleteButton) {
      that.setData({
        showDeleteButton: false,
        showEdit: false
      })
    } else {
      that.setData({
        showDeleteButton: true,
        showEdit: true
      })
    }

  },



  addGoods: function(event) {
    wx.navigateTo({
      url: '../vegetableAddgoods/vegetableAddgoods?cid=' + event.currentTarget.id,
    })
  },


  addGoodsSearch: function(event) {
    console.log(event);
    wx.navigateTo({
      url: '../vegetableAddgoods/vegetableAddgoods?cid=' + event.currentTarget.dataset.typeid + "&did=" + event.currentTarget.dataset.did + "&gname=" + event.currentTarget.dataset.goodsname,
    })
  },



  // 默认选中第一个
  initTagclick: function(id) {
    this.cookbooks(id);
  },
  // 点击菜谱分类

  tagClick: function(event) {
    if (this.data.showEdit) {
      //name
      this.setData({
        editfname: event.currentTarget.dataset.name,
        editfid: event.currentTarget.id,
      });
      this.addTagClickShow();

    } else {
      this.setData({

        tagActiveid: event.currentTarget.id
      })
      this.cookbooks(event.currentTarget.id);
    }

  },


  // 删除菜谱
  deletecaipu: function(event) {
    var cateid = event.currentTarget.dataset.cateid;
    var did = event.currentTarget.dataset.id;
    var reqDict = {
      cid: cateid
    };
    vegetable.cookbooks(reqDict, (res) => {
      console.info("delete caipu res:")
      console.log(res);
      var clist = res.cookbooks;
      var clen = clist.length;
      var glen = 0;
      for (var item in clist) {
        var goodid = clist[item]["id"];
        if (goodid == did) {
          // var gooodlen = clist[item]["goods"].length;
          if (clist[item]["goods"].length > 0) {
            wx.showToast({
              title: "该菜谱中有商品，不能删除",
              duration: 2000,
              mask: true,
              icon: "none"
            })
          } else {
            vegetable.deleteCookbook({
              ids: did
            }, (res) => {

              this.cookbooks(this.data.tagActiveid);
            })



          }
        }


      }

    });
  },


  // 删除食谱中的商品
  deletegoods: function(event) {
    var typeid = event.currentTarget.dataset.typeid;
    var pid = event.currentTarget.dataset.id;
    var that = this;
    vegetable.deleteGoodPropertyAtCookbook({
      pids: pid,
      type_id: typeid
    }, (res) => {

      if (res.status == 1) {
        wx.showToast({
          title: '成功删除商品',
          icon: "success",
          duration: 1000,
        })
        this.data.TimerOut = setTimeout(function() {
          wx.hideToast();
          that.cookbooks(that.data.tagActiveid);

        }, 1000);
      }
    });
  },

  // 把菜谱中的商品加入到购物车
  addgoodstocart: function(event) {
    var cateid = event.currentTarget.dataset.cateid;
    var id = event.currentTarget.dataset.id;

    //var pid = event.currentTarget.dataset.id;
    var that = this;

    var reqDict = {
      cid: cateid
    };
    vegetable.cookbooks(reqDict, (res) => {
      var allcookbook = res.cookbooks;
      for (var key in allcookbook) {
        if (allcookbook[key]["id"] == id) {
          var allgoods = allcookbook[key]["goods"];
          var allLen = allgoods.length;
          if (allLen > 0) { //有商品
            var carr = new Array();
            for (var item in allgoods) {
              if (allgoods[item]["is_sale_complete"] == 0) { //商品没有下架，售罄
                carr.push(allgoods[item]["property_id"]);
              }
            }
            that.posttocart(carr, carr.length - 1);
          }
        }
      }

    });

  },


  // 加入购物车
  posttocart: function(arr, clen) {
    var that = this;
    if (clen >= 0) {

      var reqDict = {
        pid: arr[clen],
        prompts: ""
      }
      vegetable.addCart(reqDict, (addRes) => {
        if (addRes.status == 1) {
          that.posttocart(arr, clen - 1);
        }
      });
    } else {
      wx.showToast({
        title: '成功加入购物车~',
        icon: "success",
        duration: 2000
      })

      that.getallcartgoods();
    }
  },
  // 获取购物车信息
  getallcartgoods: function() {
    var that = this;

    vegetable.getCartMsg(null, (res) => {
      //console.log(res);
      that.setData({
        cartInfo: res.data.sum_data,
        cartGoods: res.data.goods
      });
    });
  },

  //结算  生成订单
  tomakeOrder: function() {
    corder.createOrder(null, (res) => {
      // console.info("order msg:");
      console.log(res.order_sns);
      wx.navigateTo({
        url: '../corder/corder?unionid=' + res.order_sns,
      })
    })
  },

  toorder: function() {
    wx.navigateTo({
      url: '../corder/corder?unionid=', // + res.order_sns,
    })
  },
  cookbooks: function(rid) {
    var that = this
    var reqDict = {
      cid: rid
    };
    vegetable.cookbooks(reqDict, (res) => {

      that.setData({
        cookbooks: res.cookbooks
      });
    });
  },

  /**删除分类：只响应小红点的点击 */
  deleteTagClick: function(e) {
    var that = this

    var deleteCategoryId = e.currentTarget.dataset.id

    var reqDict = {
      cid: deleteCategoryId
    };
    vegetable.cookbooks(reqDict, (res) => {
      console.log(res);
      var clist = res.cookbooks;
      var clen = clist.length;
      var glen = 0;
      for (var item in clist) {

        var gooodlen = clist[item]["goods"].length;
        console.log("glist=" + gooodlen);
        glen += gooodlen;

      }

      if (glen > 0) {
        wx.showToast({
          title: "该分类菜谱中有商品，不能删除",
          duration: 2000,
          mask: true,
          icon: "none"
        })
        return;
      } else {
        that.deleteCategory(deleteCategoryId)
      }
    });


  },

  deleteCategory: function(deleteCategoryId) {
    var reqDict = {
      id: deleteCategoryId
    }
    vegetable.deleteCategory(reqDict, (res) => {
      console.log(res);
      if (res.status == 1) {
        this.userCookbook();
      }
    })
  },


  saveClick: function() {
    this.addTagClickShow1();
  },

  cancelClick: function() {

  },
  popupTap: function() {
    console.log("hide");
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
    console.log("back");
    this.initTagclick(this.data.tagActiveid);
    this.getallcartgoods();
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