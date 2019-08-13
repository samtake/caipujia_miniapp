import { Base } from '../../utils/base.js';


class HomeGroup extends Base {
    constructor() {
        super();
    }

    /**拼团分类 */
    groupClasify(reqDict, callback) {
        var param = {
            url: '/web/Activity/improvise/',
            data: reqDict,
            sCallback: function (res) {
                console.log('HomeDiscount111' + JSON.stringify(res))

                var catesDict = res.data.cates
                var catesValue = [{ key: '0', name: '全部' }]
                /**遍历字典 */
                for (var key in catesDict) {
                    var subDict = catesDict[key]
                    subDict["key"] = key
                    subDict["name"] = subDict["category_name"]
                    catesValue.push(subDict)
                }


                var result = {
                    cates: catesValue
                }

                callback && callback(result);
            }
        };
        this.request(param);
    }

    /**拼团列表 */
    groupList(reqDict, callback) {
        var param = {
            url: '/web/Activity/improviseList/',
            data: reqDict,
            sCallback: function (res) {
                console.log('modeldiscountList222' + JSON.stringify(res))
                var result = {
                    list: res.data.list
                }
                callback && callback(result);
            }
        };
        this.request(param);
    }
}


export {
    HomeGroup
};