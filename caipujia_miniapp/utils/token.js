/**加密*/
var fun_base64 = require('./base64.js')
var fun_aes = require('./aes.js')
var key = fun_aes.CryptoJS.enc.Utf8.parse("oSc!GU*3fj8m/tDCyvsbEhwI91M]1F=="); //十六位十六进制数作为秘钥
var iv = fun_aes.CryptoJS.enc.Utf8.parse('w2wJCnctEG09dQ=='); //十六位十六进制数作为秘钥偏移量





// 引用使用es6的module引入和定义
// 全局变量以g_开头
// 私有函数以_开头

import {Config} from 'config.js';

class Token {
    constructor() {
        this.jscodeyUrl = Config.restUrl + '/web/weixin/jscode2session/';
        this.verifyUrl = Config.restUrl + 'token/verify';
        this.tokenUrl = Config.restUrl + '/web/login/bind/logintype/weixinapp/showtype/microapp/';
    }


    /** 
     * 1、向后台发起请求,获取openid
     * 参数：code
     */
    getOpenidByCode(code) {
        var requestData = {
            jscode: code,
            showtype: Config.showtype
        };

        wx.request({
            url: this.jscodeyUrl,
            data: requestData,
            header: {
                "Content-Type": "application/x-www-form-urlencoded" // 默认值
            },
            success: function (res) {
                if (res.data.status == 200) { /**请求成功，得到session_key、openid并保存*/
                    console.log('getOpenidByCode:' + JSON.stringify(res))
                    Config.openid = res.data.data.openid
                  Config.unionid = res.data.data.unionid
                    console.log('Config.openid:' + Config.openid)
                } else {
                    console.error(res.data.msg);
                    wx.showToast({
                        title: '登陆失败，需要再次登陆，请关闭小程序后重新打开',
                        icon: 'none',
                        duration: 5000
                    });
                }


                // callBack && callBack(res.data);
            }
        });
    }



    /** 
     * 2、微信登录，请求后台获取token
     * 参数：openid
     */
    getTokenFromServer(res, callBack) {
        console.log('getTokenFromServer:' + JSON.stringify(res))
        var that = this;


        //openid 加密
        var str_aes_encode = that.Encrypt(Config.openid);
        var obj_base64 = new fun_base64.Base64();
        var str_base64_encode = obj_base64.encode(str_aes_encode);
      console.log('str_base64_encode:' + str_base64_encode)

      //unionid 加密
      var union_aes_encode = that.Encrypt(Config.unionid);
      var union_base64_encode = obj_base64.encode(union_aes_encode);
      console.log('union_base64_encode:' + union_base64_encode)

        console.log('res:'+JSON.stringify(res))

        var requestData = {
            showtype: Config.showtype,
            openid: str_base64_encode,
          unionid: union_base64_encode,
            nickname: res.userInfo.nickName,
            province: res.userInfo.province,
            city: res.userInfo.city,
            headimgurl: res.userInfo.avatarUrl,
            sex: res.userInfo.gender,
            encryptedData: res.encryptedData,
            iv: res.iv
        };


        wx.request({
            url: that.tokenUrl,
            method: 'POST',
            header: {
                "Content-Type": "application/x-www-form-urlencoded" // 默认值
            },
            data: requestData,
            success: function(res) {
                console.log('gettoken:'+JSON.stringify(res.data))

                callBack && callBack(res.data);
            }
        })
    }




    /**加密*/
    Encrypt(word) {
        var srcs = fun_aes.CryptoJS.enc.Utf8.parse(word);
        var encrypted = fun_aes.CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: fun_aes.CryptoJS.mode.CBC,
            padding: fun_aes.CryptoJS.pad.Pkcs7
        });
        var hexStr = encrypted.ciphertext.toString().toUpperCase();
        console.log('hexStr->' + hexStr);
        var oldHexStr = fun_aes.CryptoJS.enc.Hex.parse(hexStr);
        // 将密文转为Base64的字符串
        var base64Str = fun_aes.CryptoJS.enc.Base64.stringify(oldHexStr);
        console.log('base64Str->' + base64Str);
        //这里根据需求返回 base64Str 或 hexStr(解密时有小小差别)
        return base64Str;
    }

    Decrypt(word) {
        var encryptedHexStr = fun_aes.CryptoJS.enc.Hex.parse(word);
        var srcs = fun_aes.CryptoJS.enc.Base64.stringify(encryptedHexStr);
        var decrypt = fun_aes.CryptoJS.AES.decrypt(srcs, key, {
            iv: iv,
            mode: fun_aes.CryptoJS.mode.CBC,
            padding: fun_aes.CryptoJS.pad.Pkcs7
        });
        var decryptedStr = decrypt.toString(fun_aes.CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }


}

export {
    Token
};