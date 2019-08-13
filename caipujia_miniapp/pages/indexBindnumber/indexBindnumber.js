// pages/index-bindnumber/index-bindnumber.js

import {
    IndexBindnumber
} from 'indexBindnumber-model.js';
var indexBindnumber = new IndexBindnumber();


import {
    Config
} from '../../utils/config.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        time: '获取验证码',
        currentTime: null,
        disabled: true,
        counting: false,

        phone: '',
        code: '',
        PW: '',
        PWSure: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },


    //获取验证码
    getVerifyCode: function() {
        var self = this;
        var phone = self.data.phone;
        if (phone == "") {
            wx.showModal({
                title: '提示',
                content: '请输入手机号码',
                showCancel: false
            })
            return
        } else {


            if (!self.data.counting) {
                indexBindnumber.getVerifyCode(phone, (data) => {
                  console.log("indexBindnumber=")
                    if (data.code == 200) {
                        console.log(data)
                        wx.showModal({
                            title: '提示',
                            content: data.data,
                            showCancel: true
                        })

                        //开始倒计时60秒
                        self.countDown(60);

                    }
                })

            }


        }
    },

    //倒计时60秒
    countDown: function(count) {
        var self = this;
        if (count == 0) {
            self.setData({
                time: '获取验证码',
                counting: false
            })
            return;
        }

        self.setData({
            counting: true,
            time: count + 's',
        })

        setTimeout(function() {
            count--;
            self.countDown(count);
        }, 1000);
    },


    /**立即绑定*/
    buttonbind: function() {
        console.log('buttonbind');
        var self = this;
        var phone = self.data.phone;
        var code = self.data.code;
        var PW = self.data.PW;
        var PWSure = self.data.PWSure;

        if (phone == "") {
            wx.showModal({
                title: '提示',
                content: '请输入手机号码',
                showCancel: false
            })
            return
        }


        if (code == "") {
            wx.showModal({
                title: '提示',
                content: '请输入短信验证码',
                showCancel: false
            })
            return
        }




        /**拼凑请求数据*/
        console.log('jjj' + Config.vkey)
        var requestData = {
            vkey: Config.vkey,
            mobile: phone,
            code: code
        }

        console.log('jjj' + JSON.stringify(requestData))

        indexBindnumber.bingNumber(requestData, (res) => {
            console.log('bingNumber:' + JSON.stringify(res));
            if (res.data.code == 200) {

                wx.showModal({
                    title: '',
                    content: '成功',
                    showCancel: false
                });

                console.log('最新得到的token:' + res.data.data.token)
                let tokenValue = res.data.data.token
                wx.setStorage({
                    key: "token",
                    data: tokenValue,
                    success: function () {
                        wx.switchTab({
                            url: '../home/home',
                        });
                    }
                });



            } else {
                wx.showModal({
                    title: '',
                    content: res.data.message,
                    showCancel: false
                });
            }


        })



    },


    /**input绑定*/
    setPhone: function(e) {
        var self = this;
        self.data.phone = e.detail.value;
        console.log('e.detail.value:' + e.detail.value)
        console.log('self.data.phone:' + self.data.phone)
    },

    setCode: function(e) {
        var self = this;
        self.data.code = e.detail.value;
    },

    setPW: function(e) {
        var self = this;
        self.data.PW = e.detail.value;
    },

    setPWSure: function(e) {
        var self = this;
        self.data.PWSure = e.detail.value;
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

    },
})