import {
    Base
} from '../../utils/base.js';


class HomeMarket extends Base {
    constructor() {
        super();
    }



    /**获取市场详情*/
    getMarketInfo(reqDict, callback) {
        var that = this;

        var param = {
            url: '/web/Markets/info/',
            data: reqDict,
            sCallback: function(res) {
                console.log('HomeMarket-model1' + JSON.stringify(res))
                var result = {
                    categorys: res.data.categorys,
                    marketInfo: res.data.data,
                    marketInfoImage: res.data.data.image

                }
                callback && callback(result);
            }
        };
        this.request(param);
    }

    /**
     * 市场列表
     * */
    getMarketList(reqDict, callback) {
        var that = this;

        var param = {
            url: '/web/Markets/shopList/',
            data: reqDict,
            sCallback: function (res) {
                console.log('HomeMarket-model2' + JSON.stringify(res))
                var result = {
                    list: res.data.list,
                    pagers: res.data.pagers,
                }
                callback && callback(result);
            }
        };
        this.request(param);
    }


}

export {
    HomeMarket
};