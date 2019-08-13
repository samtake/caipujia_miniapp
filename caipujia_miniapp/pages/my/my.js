// pages/my/my.js
const app = getApp()


import {
  My
} from 'my-model.js';
var my = new My();


import {
  Config
} from '../../utils/config.js';





Page({

    /**
     * 页面的初始数据
     */
    data: {

      // 用户信息
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),


        sum: {
            "remain": "0.00",
            "collect": "0",
            "step": "20",
        },

        money:0.00,
        collect:0,
        track:0,
        orderlist:{},

        menus: [{
                key: '0',
          url: "../mypay/mypay?activeCategoryId=1&title=待付款",
                name: "待付款",
          icon: '../../images/my/waitpay.png'
            },
            {
                key: '0',
              url: "../mypay/mypay?activeCategoryId=2&title=待抢单",
                name: "待抢单",
              icon: '../../images/my/ready_icon.png'
            },
            {
                key: '0',
              url: "../mypay/mypay?activeCategoryId=3&title=配送中",
                name: "配送中",
              icon: '../../images/my/deliverying_icon.png'
            },
            {
                key: '0',
              "url": "../mypay/mypay?activeCategoryId=4&title=待评价",
                "name": "待评价",
              "icon": '../../images/my/comment_icon.png'
            },
            {
                key: '0',
              "url": "../myrefund/myrefund",
                "name": "退款处理",
              "icon": '../../images/my/refund_icon.png'
            },
        ],

        list: [{
            key: '0',
            title: '会员权益',
            desc: '',
            slot: false,
            src: 'https://s10.mogucdn.com/mlcdn/c45406/171226_2kall2je2079dh6ddkgc31d27cce2_38x38.png',
            url: '../mymember/mymember'
        }, {
            key: '1',
            title: '消息通知',
            desc: '',
            slot: true,
            src: 'https://s10.mogucdn.com/mlcdn/c45406/170603_7ida8bdc21j18b91aa2ii3lk38b9i_38x38.png',
                url: '../mynotice/mynotice'
        }, {
            key: '2',
            title: '我的评论',
            desc: '',
            slot: false,
            src: 'https://s10.mogucdn.com/mlcdn/c45406/171011_0acg74g776ig2459c1c6gkge07hch_40x40.png',
                url: '../mycommit/mycommit'
        }, {
            key: '3',
            title: '帮助',
            desc: '',
            slot: false,
            src: 'https://s10.mogucdn.com/mlcdn/c45406/170603_0ea73id6h6926k281cdhia0dg5gdg_38x38.png',
                url: '../myhelp/myhelp'
        }, {
            key: '4',
            title: '设置',
            desc: '',
            slot: false,
            src: 'https://s10.mogucdn.com/mlcdn/c45406/170603_6h37fg4074i3a2l2gb92dbbc15k84_38x38.png',
                url: '../mysetting/mysetting'
        }],

      myaddr:"../cmyaddr/cmyaddr",



    },


// 点击用户头像
  bindViewTap: function () {
    // wx.navigateTo({
    //   url: '../mypay/mypay?activeCategoryId=2&title=配送中'
    // })
  },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
          
             
       this.getuserMsg();

    },

    getUserInfo: function (e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },

// 获取信息

  getuserMsg:function(){
    
    var that = this
    my.getuserMsg(null, (res) => {
      
      var ostates = res.data.new_order_status;
      var olist=new Array();
      for (var key in ostates) {
        //console.log(ostates[key]);
        olist.push(ostates[key]);
      }
      
      
        that.setData({
          money:res.data.info.balance,
          collect: res.data.info.collects,
          track:res.data.info.track,
          userInfo:{
            nickName: res.data.info.nickname,
            avatarUrl: res.data.info.headimgurl
          },
          orderlist: res.data.new_order_status,
          menus: [{
            key: olist[0],
            url: "../mypay/mypay?activeCategoryId=1&title=待付款",
            name: "待付款",
            icon: '../../images/my/waitpay.png'
          },
          {
            key: olist[1],
            url: "../mypay/mypay?activeCategoryId=2&title=待抢单",
            name: "待抢单",
            icon: '../../images/my/ready_icon.png'
          },
          {
            key: olist[2],
            url: "../mypay/mypay?activeCategoryId=3&title=配送中",
            name: "配送中",
            icon: '../../images/my/deliverying_icon.png'
          },
          {
            key: olist[3],
            "url": "../mypay/mypay?activeCategoryId=4&title=待评价",
            "name": "待评价",
            "icon": '../../images/my/comment_icon.png'
          },
          {
            key: olist[3],
            "url": "../myrefund/myrefund",
            "name": "退款处理",
            "icon": '../../images/my/refund_icon.png'
          },
          ],
        })

    })

  },
 
    /**
     * 组件的方法列表
     */
    gotobindnumber: function() {
        wx.navigateTo({
            url: '../../pages/menu/bindnumber/index'
        })
    },
    

    /**
     * 余额
     */
    gotoremain: function() {
        wx.navigateTo({
            url: '../../pages/menu/remain/index'
        })
    },



    /**
     * 收藏
     */
    gotocollect: function() {
        wx.navigateTo({
            url: '../../pages/menu/collect/index'
        })
    },


    /**
     * 足迹
     */
    gotostep: function() {
        wx.navigateTo({
            url: '../../pages/menu/step/index'
        })
    },
    /**
     * 绑定号码
     */
    gotobindnumber: function() {
        wx.navigateTo({
            url: '../../pages/menu/bindnumber/index'
        })
    },
    listClick: function(event) {
        console.info(event)
        var that = this
        var dic = that.data.list[event.currentTarget.dataset.index]
        console.info(event.currentTarget.dataset.index)
        console.info(dic)

        console.info(dic.url)
        wx.navigateTo({
            url: dic.url
        })
    }


})