import { Base } from '../../utils/base.js';


class Mypay extends Base {
  constructor() {
    super();
  }

  getOrderList(reqUrl,reqDict, callback) {
    
    var param = {
      url: reqUrl,//'/web/userOrder/orderList/',
      data: reqDict,
      type:"GET",
      sCallback: function (res) {
        
        callback && callback(res.data.list);
      }
    };
    this.request(param);
  }
  /**余额 */
  getremain(reqDict, callback) {
    var param = {
      url: '/web/financial/balance/?json=1/',
      data: reqDict,
      sCallback: function (res) {
        var result = {
          money: res.data.balance,
          collect: res.data.collects
        }

        callback && callback(result);
      }
    };
    this.request(param);
  }

 
}


export {
  Mypay
};