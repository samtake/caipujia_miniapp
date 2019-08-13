import { Base } from '../../utils/base.js';


class HomePurchase extends Base {
    constructor() {
        super();
    }

    /**抢购分类 */
    purchaseClasify(reqDict,callback) {
        var param = {
            url: '/web/activity/robbuys/',
            data: reqDict,
            sCallback: function (res) {
                console.log('HomePurchase111' + JSON.stringify(res))


                /**进行中的分类*/
                var dictCates

                if (res.data.activate_cate_datas.length>0){
                    dictCates = JSON.parse(JSON.stringify(res.data.activate_cate_datas.cates))
                    var catesValue = []
                    for (var key in dictCates) {
                        catesValue.push({ id: key, name: dictCates[key] })
                    }

                }

                /**时间段数组*/
                var dictTimers = JSON.parse(JSON.stringify(res.data.timers))
                var timersValue = []
                for (var key in dictTimers) {
                    var sub = dictTimers[key] 
                    sub["index"]=key
                    timersValue.push(sub)
                }




                console.log('cates111' + JSON.stringify(timersValue))

                var result = {
                    timers: timersValue,
                    activate_cate_datas: JSON.parse(JSON.stringify(res.data.activate_cate_datas)),
                    cates: catesValue
                }
                console.log('timers222' + JSON.stringify(result.timers))

                callback && callback(result);
            }
        };
        this.request(param);
    }

    /**抢购列表 */
    purchaseList(reqDict,callback) {
        var param = {
            url: '/web/Activity/goods/type/robbuy/',
            data: reqDict,
            sCallback: function (res) {
                console.log('modelpurchaseList' + JSON.stringify(res))
                var result = {
                    list : res.data.list
                }
                callback && callback(result);
            }
        };
        this.request(param);
    }

}

export {
    HomePurchase
};