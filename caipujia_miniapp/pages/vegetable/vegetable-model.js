
import {
    Base
} from '../../utils/base.js';


class Vegetable extends Base {
    constructor() {
        super();
    }

    /**我的食谱分类 */
    userCookbook(reqDict, callback) {
        
        var param = {
            url: '/web/UserCookbook/index/',
            data: reqDict,
            sCallback: function (res) {
                var result = {
                    cates: res.data.cates,
                    source_url: res.data.source_url
                }
                callback && callback(result);
            }
        };
        this.request(param);
    }


    /**根据食谱分类ID获得食谱数据 */
    cookbooks(reqDict, callback) {
        var param = {
            url: '/web/UserCookbook/cookbooks/',
            data: reqDict,
            sCallback: function (res) {
                 var result = {
                  cookbooks: res.data.list
                }
              callback && callback(result);
            }
        };
        this.request(param);
    }


    /**将产品规格加入食谱 */
    addGoodPropertyAtCookbook(reqDict, callback) {
        var param = {
            url: '/web/UserCookbook/addGoodPropertyAtCookbook/',
            data: reqDict,
            sCallback: function (res) {
                console.log('modelVegetable333' + JSON.stringify(res))


                var result = {
                }
                callback && callback(result);
            }
        };
        this.request(param);
    }


    /**把产品规格从食谱里删除 */
    deleteGoodPropertyAtCookbook(reqDict, callback) {
        var param = {
            url: '/web/UserCookbook/deleteGoodPropertyAtCookbook/',
            data: reqDict,
            type:"POST",
            sCallback: function (res) {
                
                callback && callback(res.data);
            }
        };
        this.request(param);
    }


    /** 删除食谱 */
    deleteCookbook(reqDict, callback) {
        var param = {
            url: '/web/UserCookbook/deleteCookbook/',
            data: reqDict,
            sCallback: function (res) {
                
                callback && callback(res.data);
            }
        };
        this.request(param);
    }


    /**删除一个食谱分类 */
    deleteCategory(reqDict, callback) {
        var param = {
          url: '/web/UserCookbook/deleteCategory/',
            data: reqDict,
            type:"POST",
            sCallback: function (res) {
                 
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
            type:"POST",
            sCallback: function (res) {
               
              callback && callback(res.data);
            }
        };
        this.request(param);
    }



    /**创建食谱 */
    createCookbook(reqDict, callback) {
        var param = {
          url: '/web/userCookbook/createCookbook/',
          type:'POST',
            data: reqDict,
            sCallback: function (res) {
               console.log(res);
              callback && callback(res);
            }
        };
        this.request(param);
    }


    // 加入购物车
    addCart(reqDict, callback){
     // console.log("加入购物车1");
      var param = {
        url: '/web/cart/addTocart/',
        type:'POST',
        data: reqDict,
        sCallback: function (res) {
          
          console.log(res);
          callback && callback(res.data);
        }
      };
      this.request(param);
    }

// 购物车信息
  getCartMsg(reqDict, callback){
    var param = {
      url: '/web/cart/cartAllGoods/',
      type: 'GET',
      data: reqDict,
      sCallback: function (res) {
       
        callback && callback(res.data);
      }
    };
    this.request(param);


  }


// // 创建订单
//   createOrder(reqDict, callback){
//     var param = {
//       url: '/web/cart/createOrder/',
//       type: 'GET',
//       data: reqDict,
//       sCallback: function (res) {
//        // console.log(res);
//         callback && callback(res.data.data);
//       }
//     };
//     this.request(param);
//   }


}

export {
    Vegetable
};


