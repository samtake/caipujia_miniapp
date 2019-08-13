// pages/homeShop/homeShop.js

import {
    HomeShop
} from 'homeShop-model.js';
var homeShop = new HomeShop();


import {
    Detail
} from '../detail/detail-model.js';
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
        shopid: '1',

        /**分类默认全部*/
        activeCategoryId: 0,


        /**是否显示购物车*/
        showCart: false,
        /**购物车信息*/
        sum_cart_freights: '',
        total_number: '',
        total_price: '',
        carts: [{
            sectionKey: [{}, {}]
        }, {
            sectionKey: [{}]
        }],

        /**规格弹框*/
        showPick: false,

        /**选中的规格*/ 
        residue_goods_number:'',
        prompts:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {


        console.log('Detail555:' + JSON.stringify(options))


        //首页轮播图点击添转到店铺
        this.setData({
            type: options.type,
            id: options.id,
        })

        //折扣跳转到店铺
        if (options.type == "activity") {
            this.setData({
                type: options.type,
                activityid: options.activityid,
                shopid: options.shopid,
            })

        }

        this._loadData();

    },


    _loadData: function(callback) {
        var that = this;
        that.getShopInfo()
        that.cartAllGoods()
    },


    /**获取店铺信息 */
    getShopInfo: function() {
        var that = this;

        var reqDict = {
            id: that.data.id,
        }



        if (that.data.type == "activity") {
            reqDict = {
                activityid: that.data.activityid,
                id: shopid
            }

        }


        homeShop.getShopInfo(reqDict, (res) => {
            console.log('homeShop1' + JSON.stringify(res))
            that.setData({
                source_url: res.source_url,
                myLocationTown: res.myLocationTown,
                active_page: res.active_page,
                info: res.info,
                categorys: res.categorys
            })

            console.log(JSON.stringify('homeShop2' + that.data.info))
            console.log(JSON.stringify('homeShop3' + that.data.categorys))

            that.shopGoodslist()
        });
    },


    /**获取商品列表 */
    shopGoodslist: function() {
        var that = this;
        var reqDict = {
            shopid: that.data.shopid
        }

        if (that.data.type == "activity") {
            reqDict = {
                activityid: that.data.activityid,
                id: shopid
            }

        }


        homeShop.shopGoodslist(reqDict, (res) => {
            console.log('homeShop4' + JSON.stringify(res))
            that.setData({
                list: res.list,
                pagers: res.pagers,
            })

        });

    },

    /**获取购物车信息 */
    cartAllGoods: function() {
        var that = this;
        var reqDict = {}
        homeShop.cartAllGoods(reqDict, (res) => {
            console.log('homeShop5' + JSON.stringify(res))
            that.setData({
                total_price: res.total_price,
                total_number: res.total_number,
                sum_cart_freights: res.sum_cart_freights,
                goods: res.goods,
            })

        });

    },


    /**分类点击方法*/
    tabClick: function(e) {
        var self = this;
        self.setData({
            activeCategoryId: e.currentTarget.id,
        });
        self.getMarketList();
    },


    /***
     * 星星的收藏操作
     */
    starActionClick: function() {
        // wx.showLoading({
        //     title: '收藏成功',
        // })
        //
        // setTimeout(function(){
        //     wx.hideLoading()
        // },2000)


        wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
        })
    },


    /**
     * 更多操做
     */
    moreActionClick: function() {

        var self = this;

        wx.showActionSheet({
            itemList: ['联系卖家', '投诉商家'],
            success: function(res) {
                console.log(res.tapIndex)
                var index = res.tapIndex


                if (index == 1) {
                    wx.makePhoneCall({
                        phoneNumber: '1340000'
                    })
                }

                if (index == 2) {
                    wx.navigateTo({
                        url: "../complaint/index"
                    })
                }

            },
            fail: function(res) {
                console.log(res.errMsg)
            }
        })

    },




    //分享效果
    onShareAppMessage: function() {
        return {
            title: '店铺',
            path: 'pages/homeShop/homeShop'
        }
    },


    /**规格弹框*/
    addClick: function(event) {
        var that = this
        var homeGoodsId = event.target.dataset.homegoodsid;
        console.log('event:' + JSON.stringify(event))
        //调取商品详情接口

        var reqDict = {
            goodsid: homeGoodsId
        }
        console.log('reqDict:' + JSON.stringify(reqDict))

        detail.detail(reqDict, (res) => {

            console.log('addClickil规格弹框' + JSON.stringify(res))

            that.setData({
                detailShuf_pics: res.shuf_pics,
                detailInfo: res.info,
                detailGoods: res.goods,
                detailGoodsDetail: res.goodsDetail,
                showPick: true,
                shopType: 'addShopCar',
            })


        })

    },
    /**隐藏规格弹框 */
    hidePick: function() {
        var that = this
        that.setData({
            showPick: false,
        })

    },

    /**
     * 选择商品规格
     * @param {Object} e
     */
    labelItemTap: function(e) {
        var that = this;
        console.info('选择商品规格:')


        //取消该分类下的子栏目所有的选中状态
        console.info('childs')

        var propertyIndexSelect = e.currentTarget.dataset.propertyindex
        var propertyChildIndexSelect = e.currentTarget.dataset.propertychildindex

        var childs = that.data.detailGoodsDetail[propertyIndexSelect].childsCurGoods;
        console.info(childs)
        console.log(JSON.stringify(childs))
        for (var i = 0; i < childs.length; i++) {
            that.data.detailGoodsDetail[propertyIndexSelect].childsCurGoods[i].active = false
        }


        // 设置当前选中状态

        that.data.detailGoodsDetail[propertyIndexSelect].childsCurGoods[propertyChildIndexSelect].active = true;
        // 刷新页面
        that.setData({
            detailGoodsDetail: that.data.detailGoodsDetail
        })


        // 获取所有的选中规格尺寸数据,该数据用于网络请求
        var  valueSelect = that.data.detailGoodsDetail[propertyIndexSelect].childsCurGoods[propertyChildIndexSelect].value
        // 规格
        if (propertyIndexSelect == '0'){
            that.setData({
                residue_goods_number: valueSelect
            })
        }
        // 属性
        if (propertyIndexSelect == '1') {
            that.setData({
                prompts: valueSelect
            })
        }

        console.info('选中的规格是:')
        console.info(that.data.residue_goods_number)
        console.info(that.data.prompts)

        



        



        // var needSelectNum = that.data.goodsDetail.properties.length;
        // var curSelectNum = 0;
        // var propertyChildIds = "";
        // var propertyChildNames = "";
        // for (var i = 0; i < that.data.goodsDetail.properties.length; i++) {
        //     childs = that.data.goodsDetail.properties[i].childsCurGoods;
        //     for (var j = 0; j < childs.length; j++) {
        //         if (childs[j].active) {
        //             curSelectNum++;
        //             propertyChildIds = propertyChildIds + that.data.goodsDetail.properties[i].id + ":" + childs[j].id + ",";
        //             propertyChildNames = propertyChildNames + that.data.goodsDetail.properties[i].name + ":" + childs[j].name + "  ";
        //         }
        //     }
        // }


    },


    /**
     * 点击购物车的相应事件
     */
    showCart: function(event) {
        var that = this;
        that.setData({
            showCart: true
        })
    },

    /**
     * 隐藏购物车
     */
    hideCart: function() {
        var self = this;
        console.log('hideCart');
        self.setData({
            showCart: false
        })
    },


})