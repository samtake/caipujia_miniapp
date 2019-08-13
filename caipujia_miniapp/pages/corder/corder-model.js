import {
  Base
} from '../../utils/base.js';


class Corder extends Base {
  constructor() {
    super();
  }

  /**我的订单信息 */
  cmforder(reqDict, callback) {

    var param = {
      url: '/web/UserOrder/cmforder/',
      data: reqDict,
      type: "POST",
      sCallback: function(res) {

        callback && callback(res.data);
      }
    };
    this.request(param);
  }


  /**获取送货时间 */
  orderTime(reqDict, callback) {
    var param = {
      url: '/web/UserOrder/deliveryTimes/',
      data: reqDict,
      type: "GET",
      sCallback: function(res) {
        callback && callback(res.data.list);
      }
    };
    this.request(param);
  }


  /**更新留言 */
  updataRmark(reqDict, callback) {
    var param = {
      url: '/web/UserOrder/updateremark/',
      data: reqDict,
      sCallback: function(res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }


  /**提交订单 */
  postForm(reqDict, callback) {
    var param = {
      url: '/web/UserOrder/paycmf/',
      data: reqDict,
      type: "POST",
      sCallback: function(res) {

        callback && callback(res.data);
      }
    };
    this.request(param);
  }


  /** 付款 */
  toPay(reqDict, callback) {
    var param = {
      url: reqDict,
      data: null,
      sCallback: function(res) {

        callback && callback(res.data);
      }
    };
    this.request(param);
  }


  /**获取用户的地址信息 */
  getAddress(reqDict, callback) {
    var param = {
      url: '/web/address/list/',
      data: reqDict,
      type: "get",
      sCallback: function(res) {

        callback && callback(res.data);
      }
    };
    this.request(param);
  }


  /**创建/编辑 */
  operationCategory(reqDict, callback) {
    var param = {
      url: '/web/UserCookbook/operationCategory/',
      data: reqDict,
      type: "POST",
      sCallback: function(res) {

        callback && callback(res.data);
      }
    };
    this.request(param);
  }



  /**创建食谱 */
  createCookbook(reqDict, callback) {
    var param = {
      url: '/web/userCookbook/createCookbook/',
      type: 'POST',
      data: reqDict,
      sCallback: function(res) {
        console.log(res);
        callback && callback(res);
      }
    };
    this.request(param);
  }


  // 加入购物车
  addCart(reqDict, callback) {
    // console.log("加入购物车1");
    var param = {
      url: '/web/cart/addTocart/',
      type: 'POST',
      data: reqDict,
      sCallback: function(res) {

        console.log(res);
        callback && callback(res.data);
      }
    };
    this.request(param);
  }

  getCartMsg(reqDict, callback) {
    var param = {
      url: '/web/cart/cartAllGoods/',
      type: 'GET',
      data: reqDict,
      sCallback: function(res) {

        callback && callback(res.data);
      }
    };
    this.request(param);


  }

  createOrder(reqDict, callback) {
    var param = {
      url: '/web/cart/createOrder/',
      type: 'GET',
      data: reqDict,
      sCallback: function(res) {
        console.log(res);
        callback && callback(res.data);
      }
    };
    this.request(param);
  }




  // 创建订单
  createOrder(reqDict, callback) {
    var param = {
      url: '/web/cart/createOrder/',
      type: 'GET',
      data: reqDict,
      sCallback: function (res) {
        // console.log(res);
        callback && callback(res.data.data);
      }
    };
    this.request(param);
  }

}

export {
  Corder
};