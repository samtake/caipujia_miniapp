// pages/home/home.js

/**http://pub.caipujia.com/Web?json=1*/


import {Home} from 'home-model.js';
var home = new Home();

var animation = wx.createAnimation();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loadingHidden: false,
        more:'更多',
        // notice: '蘑菇街平台将在1月22日0点－9点进行系统升级，升级期间将暂停服务，敬请谅解。'

        // 倒计时
        hmiao:9,
        countTimer:null,
      // countdown: 100,
      // numStyle: 'width: 48rpx; font-size: 28rpx; color: #ffffff; background: #000; text-align: center; border-radius: 8rpx; padding: 5rpx 0;',
      // symbolStyle: 'font-size: 28rpx; color: #000; padding: 0 12rpx;',


      icons: [
        'yes', 'check', 'help', 'no', 'warning',
        'add', 'close', 'star', 'star-active', 'more',
        'right', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down',
        'minus', 'cart', 'home', 'search', 'search-square',
        'camera', 'scan', 'corcer-l', 'corcer-r', 'alipay',
        'yen', 'mogujie', 'group', 'pintuan', 'share',
        'notice', 'shop', 'delete', 'comment', 'edit',
        'feedback', 'location', 'address', 'after-sales', 'footprint',
        'weixin', 'top', 'purse', 'unreceived', 'truck',
        'rate', 'coupon', 'message', 'clear'
      ]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this._loadData()
        //this.contentLoop()
    },

    _loadData: function(callback) {
        var that = this;
        home.homeList((data) => {

            
            that.setData({
                source_url: data.source_url,
                myLocationTown: data.myLocationTown,


                shufflingAds: data.shufflingAds,
           
                noticesAds: data.noticesAds,
                activitypic: data.activitypic,
                markets_list: data.markets_list,
                shop_list: data.shop_list,
                mall_list: data.mall_list,
                loadingHidden: true,
 
              todayListArr: [{ id: '10', icon: data.activitypic.improvise, name: '拼团优惠', name1: "Groud Sale", url: 'homeGroup' }, { id: '11', icon: data.activitypic.meet, name: '满减折扣', name1: "Sale Offer", url: 'homeMeet'}],
            });
 
         
          that.countTimer=setInterval(function(){
            
            that.countDown()
          },100)
            


            

        })

    },




    /**倒计时 */
    timeFormat(param) { //小于10的格式化函数
        return param < 10 ? '0' + param : param;
    },
    countDown() { //倒计时函数
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime();
      let endTimeList = this.data.activitypic.time;// "2018-09-25 12:34:21";//
        let endTime = new Date(endTimeList).getTime();

        var hmiao=this.data.hmiao;
       
        let obj = null;
        // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
            let time = (endTime - newTime) / 1000;
            // 获取天、时、分、秒
            let day = parseInt(time / (60 * 60 * 24));
            let hou = parseInt(time % (60 * 60 * 24) / 3600);
            let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
            let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
            obj = {
                day: this.timeFormat(day),
                hou: this.timeFormat(hou),
                min: this.timeFormat(min),
                sec: this.timeFormat(sec)
            }
          hmiao--;
          if (hmiao<0){
            hmiao=9;
          }
        } else { //活动已结束，全部设置为'00'
          hmiao=0;
            obj = {
                day: '00',
                hou: '00',
                min: '00',
                sec: '00'
            }
          this.setData({
            countDown: obj,
            hmiao: hmiao,
          })
          clearInterval(this.data.countTimer);
        }
 
        this.setData({
            countDown: obj,
            hmiao: hmiao,
        })
        // setTimeout(this.countDown, 1000);
    },

    /**更多*/
    moreClick:function(){
        var that = this
        let content = that.data.more == '收起' ? '更多' : '收起'
        that.setData({
            more: content
        })
    },


    /**抢购 */
    purchaseTap: function() {
        wx.navigateTo({
            url: '../homePurchase/homePurchase',
        });
    },

    /**轮训点击 */
    bannerClick: function (event){
        var id = home.getDataSet(event, 'id');
        wx.navigateTo({
            url: '../homeShop/homeShop?id=' + id,
        });
    },

    onClose() {
        wx.showToast({ title: 'closed' });
    },

    /*下拉刷新页面*/
    onPullDownRefresh: function() {
        this._loadData(() => {
            wx.stopPullDownRefresh()
        });
    },

    //分享效果
    onShareAppMessage: function() {
        return {
            title: '菜谱佳',
            path: 'pages/home/home'
        }
    }
})


