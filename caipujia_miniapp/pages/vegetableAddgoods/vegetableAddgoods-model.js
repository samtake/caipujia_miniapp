
import {
  Base
} from '../../utils/base.js';


class VegetableAddgoods extends Base {
  constructor() {
    super();
  }

  /**我的食谱分类 */
  searchGoods(reqDict, callback) {
////pub.alhtech.com/web/userCookbook/selectGoodsLi/type_id/14/keyword/0/numPerPage/20/p/1/
    var param = {
      url: '/web/userCookbook/selectGoodsLi/',
      data: reqDict,
      sCallback: function (res) {
        // var result = {
        //   cates: res.data.cates,
        //   source_url: res.data.source_url
        // }
        callback && callback(res.data.list);
      }
    };
    this.request(param);
  }

  getGoodsDetial(reqDict, callback){
    ///web/goods/shopGoodsDetail
    var param = {
      url: '/web/goods/shopGoodsDetail/',
      data: reqDict,
      sCallback: function (res) {
        
        callback && callback(res.data.info);
      }
    };
    this.request(param);
  }

  addGoodPropertyAtCookbook(reqDict, callback) {
    ///web/goods/shopGoodsDetail
    var param = {
      url: '/web/UserCookbook/addGoodPropertyAtCookbook/',
      data: reqDict,
      sCallback: function (res) {
        
        callback && callback(res.data);
      }
    };
    this.request(param);
  }
  deleteCookbook(reqDict, callback){
    var param = {
      url: '/web/UserCookbook/deleteGoodPropertyAtCookbook/',
      data: reqDict,
      sCallback: function (res) {

        callback && callback(res.data);
      }
    };
    this.request(param);
  }
 


}

export {
  VegetableAddgoods
};


