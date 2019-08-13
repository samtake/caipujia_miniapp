import {Base} from '../../utils/base.js';

class Home extends Base {
    constructor() {
        super();
    }

    homeList(callback) {
        var param = {
            url: '/Web?json=1/',
            sCallback: function(res) {
                var stringify = JSON.parse(JSON.stringify(res.data.shuffling))
                var dict = stringify[0]
                
                var result = {
                    source_url: res.data.source_url,
                    myLocationTown: res.data.myLocationTown,
                    /**轮播图*/
                    shufflingAds: dict.ads,
                    /**通知 */
                    noticesAds: res.data.notices,
                    /**倒计时抢购---天天实惠*/
                    activitypic: res.data.activitypic,
                    /**市场*/
                    markets_list: res.data.markets_list,
                    /**特色门店*/
                    shop_list: res.data.shop_list,
                    /**超市*/
                    mall_list: res.data.mall_list,

                }
 
                callback && callback(result);
            }
        };
        this.request(param);
    }

};

export {
    Home
};