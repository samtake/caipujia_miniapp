import { Base } from '../../utils/base.js';


class Address extends Base {
  constructor() {
    super();
  }

  getAddressList(reqDict, callback) {

    var param = {
      url: '/web/address/list/',
      data: reqDict,
      sCallback: function (res) {

        callback && callback(res);
      }
    };
    this.request(param);
  }


}


export {
  Address
};