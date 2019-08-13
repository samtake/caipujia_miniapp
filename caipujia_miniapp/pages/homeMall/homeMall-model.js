import {
    Base
} from '../../utils/base.js';

class HomeMall extends Base {
    constructor() {
        super();
    }
    mallInfo(reqDict, callback) {
        var param = {
            url: '/web/supermarket/info/',
            data:reqDict,
            sCallback: function(res) {
                
                console.log('modelHomeMall11' + JSON.stringify(res))

                //分类，拆分为8个元素一组
                var oneCatesAry = res.data.oneCates
                var categoriesValue = []
                var dict1 = { pro: oneCatesAry.slice(0,8)}
                var dict2 = { pro: oneCatesAry.slice(8) }
                categoriesValue.push(dict1)
                categoriesValue.push(dict2)
                console.log('modelHomeMall22' + JSON.stringify(dict1))
                console.log('modelHomeMall33' + JSON.stringify(dict2))



                var result = {
                    shufflingAds: [res.data.data.image],
                    info:res.data.data,
                    categories: categoriesValue,
                    notices: res.data.notices,
                    activitypic: res.data.activitypic,
                    cateGoods: res.data.cateGoods,
                    goods: res.data.cateGoods.goods,
                    noticesAds: res.data.notices,
                }
                callback && callback(result);
            }
        };
        this.request(param);
    }
}



export {
    HomeMall
};