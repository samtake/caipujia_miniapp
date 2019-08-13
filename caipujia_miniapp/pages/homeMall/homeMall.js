// pages/homeMall/homeMall.js

import {
    HomeMall
} from 'homeMall-model.js';
var homeMall = new HomeMall();

var animation = wx.createAnimation();

import {
    Config
} from '../../utils/config.js';


Page({

    /**
     * 页面的初始数据
     */
    data: {
        source_url: Config.imageUrl,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            mallId: options.mallId
        })

        this.mallInfo()
        
    },

    mallInfo: function() {
        var that = this
        var reqDict = {
            id: that.data.mallId
        }

        console.log('HomeMall111:' + JSON.stringify(reqDict))

        homeMall.mallInfo(reqDict, (res) => {
            that.setData({
                shufflingAds: res.shufflingAds,
                info: res.data,
                categories: res.categories,
                notices: res.notices,
                activitypic: res.activitypic,
                cateGoods: res.cateGoods,
                goods: res.goods,
                noticesAds: res.noticesAds,
            })


            that.contentLoop()
            that.countDown()

        })

    },


    /** 跑马灯 */
    contentLoop() {
        var that = this;
        var index = 0
        setInterval(() => {
            that.update(that.data.noticesAds[index])
            if (index == that.data.noticesAds.length) {
                index = 0
            } else {
                index++
            }
        }, 1000)

    },

    update(content) {
        var that = this;

        var dict1 = content.ads[0]
        var dict2 = content.ads[1]

        var dict3 = {
            id: content.id,
            icon: content.icon,

            ad_text1: dict1.ad_text,
            ad_text2: dict2.ad_text,
        }


        var that = this;
        animation.translateY(-30).step({
            duration: 300,
            timingFunction: 'ease-in'
        })
        animation.opacity(0).translateY(30).step({
            duration: 1,
            timingFunction: 'step-start'
        })
        animation.opacity(1).translateY(0).step({
            duration: 300,
            timingFunction: 'ease-out'
        })
        that.setData({
            animationData: animation.export()
        })
        setTimeout(that.setData.bind(that, {
            loopContent: dict3
        }), 400)
    },



    /**倒计时 */
    timeFormat(param) { //小于10的格式化函数
        return param < 10 ? '0' + param : param;
    },

    countDown() { //倒计时函数
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime();
        let endTimeList = this.data.activitypic.time;

        console.log('endTimeList' + endTimeList)


        let endTime = new Date('endTimeList').getTime();
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
        } else { //活动已结束，全部设置为'00'
            obj = {
                day: '00',
                hou: '00',
                min: '00',
                sec: '00'
            }
        }


        this.setData({
            countDown: obj
        })
        // setTimeout(this.countDown, 1000);
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