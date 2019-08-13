//index.js
//获取应用实例

import {Token} from '../../utils/token.js';
import { Config } from '../../utils/config.js';

const app = getApp()

Page({
    data: {
        motto: '进入菜谱佳',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    


    onLoad: function() {

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                console.log('3333' + JSON.stringify(res.userInfo))
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                lang: "zh_CN",
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },

    
    getUserInfo: function(e) {
        var that = this
        /**点击允许时才会执行*/




        /**只要本地有token就不需要登录
         * 同步执行
        */


        try {
            var value = wx.getStorageSync('token')
            if (value) {
                wx.switchTab({
                    url: '../home/home',
                });

                console.log('tokentokentoken000' + res.data)

                return
            }
        } catch (e) {
        }



        // wx.getStorageSync({
        //     key: 'token',
        //     success: function(res) {
        //         wx.switchTab({
        //             url: '../home/home',
        //         });

        //         console.log('tokentokentoken000'+res.data)
                
        //         return
        //     },
        // })

        console.log('1111' + JSON.stringify(e))
        app.globalData.userInfo = e.detail.userInfo
        console.log('2222' + JSON.stringify(e.detail.userInfo))
        var token = new Token();
        token.getTokenFromServer(e.detail, (res) => {
            if (res.code == 200){
                console.log('200:' + JSON.stringify(res))
                if (res.message == 'mobileInvalid') {/**新用户号码绑定*/
                    console.log('3333')
                    Config.vkey = res.data.vkey
                    wx.redirectTo({
                        url: '../indexBindnumber/indexBindnumber?vkey=' + res.data.vkey,
                    });

                    console.log('200:' + JSON.stringify(res.data.vkey))
                    console.log(Config.vkey)
                    

                }else{
                    console.log('4444')
                    wx.setStorageSync('token', res.data.token);/**保存token*/
                    wx.switchTab({
                        url: '../home/home',
                    });
                }
            }
        })
        that.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },


    getLocalTokenFail:function(){

    }
})