import { Base } from '../../utils/base.js';


class homeMeet extends Base {
  constructor() {
    super();
  }

  /**折扣分类 */
  discountClasify(reqDict, callback) {
    var param = {
      url: '/web/activity/meets/',
      data: reqDict,
      sCallback: function (res) {
       
        var catesDict = res.data.cates
        var catesValue = [{ id:0,key: '0', name: '全部' }]
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

  /**抢购列表 */
  discountList(reqDict, callback) {
    var param = {
      url: '/web/Activity/meetsList/',
      data: reqDict,
      sCallback: function (res) {
        
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
  homeMeet
};