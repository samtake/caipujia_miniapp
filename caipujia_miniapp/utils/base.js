/**
 * Created by jimmy-jiang on 2016/11/21.
 */
import { Token } from 'token.js';
import { Config } from 'config.js';

class Base {
    constructor() {
        "use strict";
        this.baseRestUrl = Config.restUrl;
        this.onPay = Config.onPay;
    }

    //http 请求类, 当noRefech为true时，不做未授权重试机制
    request(params, noRefetch) {
        var that = this,
            url = this.baseRestUrl + params.url + 'showtype/'+ Config.showtype + '/';
        if (!params.type) {
            params.type = 'get';
        }
        /*不需要再次组装地址*/
        if (params.setUpUrl == false) {
            url = params.url;
        }

        var tokenValue = wx.getStorageSync('token')
        console.info('tokenValue')
        console.info(tokenValue)

        wx.request({
            url: url,
            data: params.data,
            method: params.type,
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                'token': tokenValue
            },
            
            success: function (res) {

                // 判断以2（2xx)开头的状态码为正确
                // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
                // var code = res.data.code.toString();
                // var startChar = code.charAt(0);
                // if (code == '200') {

                var code = res.data.code
                if (code == 200) {
                    params.sCallback && params.sCallback(res);
                } else {
                    if (code == 401) {
                        if (!noRefetch) {
                            that._refetch(params);
                        }
                    }
                    that._processError(res);
                    params.eCallback && params.eCallback(res);
                }
            },
            fail: function (err) {
                //wx.hideNavigationBarLoading();
                that._processError(err);
                // params.eCallback && params.eCallback(err);
            }
        });
    }

    _processError(err) {
        console.log(err);
    }

    _refetch(param) {
        var token = new Token();
        token.getTokenFromServer((token) => {
            this.request(param, true);
        });
    }

    /*获得元素上的绑定的值*/
    getDataSet(event, key) {
        return event.currentTarget.dataset[key];
    };

};

export { Base };