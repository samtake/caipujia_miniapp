import { Base } from '../../utils/base.js';


class EditAddr extends Base {
  constructor() {
    super();
  }

  getAddrMsg(reqDict, callback) {

    var param = {
      url: '/web/address/editAddress/',
      data: reqDict,
      sCallback: function (res) {

        callback && callback(res.data.info);
      }
    };
    this.request(param);
  }


}


export {
  EditAddr
};