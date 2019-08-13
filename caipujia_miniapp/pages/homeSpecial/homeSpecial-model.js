
import {Base} from '../../utils/base.js';

class HomeSpecial extends Base {
    constructor() {
        super();
    }
    specialInfo(reqDict, callback) {
        var param = {
            url: '/web/shops/shop/',
            data: reqDict,
            sCallback: function (res) {

                console.log('modelHomeSpecial11' + JSON.stringify(res))

                var result = {
                    shufflingAds: [res.data.data.banner],
                    info:res.data.data,
                    goods: res.data.goods,
                    article: res.data.article,
                    base_cates: res.data.base_cates,
                }
                callback && callback(result);
            }
        };
        this.request(param);
    }
};





export {
    HomeSpecial
};