import { Base } from '../../utils/base.js';

class HomeShop extends Base {
    constructor() {
        super();
    }



    /**
     * 店铺信息
     * */
    getShopInfo(reqDict,callback) {
        var param = {
            url: '/web/Shops/info/',
            type:'GET',
            data: reqDict,
            sCallback: function (res) {

                console.log('HomeShopmodel222' + JSON.stringify(res))

                //分类
                var categorysValue = res.data.base_cates
                categorysValue.unshift({ id: '0', shopid: '0', category_name:'全部'})


                
                var result = {
                    source_url: res.data.source_url,
                    myLocationTown: res.data.myLocationTown,
                    active_page: res.data.active_page,
                    info: res.data.data,
                    categorys: categorysValue
                }


                callback && callback(result);

                console.log('HomeShopmodel111' + JSON.stringify(result))
            }
        };
        this.request(param);
    }



    /**店铺商品列表 */
    shopGoodslist(reqDict, callback) {
        var that = this;

        

        var param = {
            url: '/Web/Goods/shopGoodslist/',
            data: reqDict,
            sCallback: function (res) {
                console.log('HomeShopmodel222' + JSON.stringify(res))
                var result = {
                    list: res.data.list,
                    pagers: res.data.pagers,
                }
                callback && callback(result);
            }
        };
        this.request(param);
    }

    /**购物车信息 */
    cartAllGoods(reqDict, callback) {
        var that = this;
        var param = {
            url: '/web/cart/cartAllGoods/',
            data: reqDict,
            sCallback: function (res) {
                console.log('HomeShopmodel333' + JSON.stringify(res))
                var sumData = res.data.data.sum_data
                var result = {
                    total_price: sumData.total_price,
                    total_number: sumData.total_number,
                    sum_cart_freights: sumData.sum_cart_freights,
                    goods: res.data.data.goods,
                }
                callback && callback(result);
            },
            eCallback: function (res) {
                if(res.data.code==1002){
                    console.log('未登录')
                }
                callback && callback(res);
            }
        };
        this.request(param);
    }

}

export { HomeShop};