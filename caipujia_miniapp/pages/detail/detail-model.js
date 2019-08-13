import {
    Base
} from '../../utils/base.js';


class Detail extends Base {
    constructor() {
        super();
    }

    /**商品详情 */
    detail(reqDict, callback) {
        var param = {
            url: '/web/goods/shopGoodsDetail/',
            data: reqDict,
            sCallback: function(res) {
                console.log('modelDetail111' + JSON.stringify(res))

                /**轮播图 */
                var dict_shuf_pics = JSON.parse(JSON.stringify(res.data.info.shuf_pics))
                var shuf_pics_value = []

                for (var key in dict_shuf_pics) {
                    var sub = dict_shuf_pics[key]
                    sub["index"] = key
                    shuf_pics_value.push(sub)
                }

                console.log('modelDetail222' + JSON.stringify(res.data.info.property))

                /**规格*/  
                var aryProperty = res.data.info.property
                var propertyValue = []
 

                for (var i = 0, len = aryProperty.length; i < len; i++) {
                    console.log(aryProperty[i])

                    var sub = aryProperty[i]
                    sub["reqId"] = sub["id"]/**用于网络请求用*/
                    sub["id"] = i  /**用于试图切换*/
                    sub["active"] = false  /**是否被选中*/

                    sub["name"] = sub["value"] + sub["unit"]
                    propertyValue.push(sub)
                }
 

                //属性
                var aryPrompts = res.data.info.prompts
                var promptsValue = []
                for (var i = 0, len = aryPrompts.length; i < len; i++) {
                    console.log(aryPrompts[i])

                    var sub = aryPrompts[i]
                    sub["reqId"] = sub["id"]/**用于网络请求用*/
                    sub["id"] = i  /**用于试图切换*/
                    sub["active"] = false  /**是否被选中*/
                    sub["value"] = sub["name"]

                    promptsValue.push(sub)
                }
 

                var goodsDetailValue = [
                    { index: '0', name: '规格', childsCurGoods: propertyValue},
                    { index: '1', name: '属性', childsCurGoods: promptsValue }
                ]


                var result = {
                    info:res.data.info,
                    shuf_pics: shuf_pics_value,
                  //  property: res.data.info.property,
                  //  prompts: res.data.info.prompts,
                    goods: res.data.goods,
                   
                    goodsDetail: goodsDetailValue
                }
                callback && callback(result);
            }
        };
        this.request(param);
    }

}

export {
    Detail
};