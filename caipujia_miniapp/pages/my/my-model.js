import { Base } from '../../utils/base.js';


class My extends Base {
  constructor() {
    super();
  }

  getuserMsg(reqDict, callback) {
    ///web/user/index/?json=1
    //console.log("sfsfsdfdsf");
    var param = {
      url: '/web/user/index/',
      data: reqDict,
      sCallback: function (res) {
         // console.info("userinfo1=");
       // console.log(res);
       
        callback && callback(res);
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

 

  /**足迹 */
  gettrack(reqDict, callback) {
    var param = {
      url: '/web/collect/collect/',
      data: reqDict,
      sCallback: function (res) {
        console.log('track' + JSON.stringify(res))
        // var result = {
        //   list: res.data.list
        // }
        // callback && callback(result);
      }
    };
    this.request(param);
  }


}


export {
  My
};