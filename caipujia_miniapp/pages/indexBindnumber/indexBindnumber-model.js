
import { Base } from '../../utils/base.js';

class IndexBindnumber extends Base {
    constructor() {
        super();
    }


    /*获取验证码*/
    getVerifyCode(phone,callback) {
        var param = {
            url: '/manages/login/sendVerificatioeCode/',
            data: { mobile: phone},
            sCallback: function (data) {
                console.log('getVerifyCode:' + JSON.stringify(data))
                callback && callback(data);
            }
        };
        this.request(param);
    }

    bingNumber(reqDict, callback) {
        var param = {
            url: '/web/login/loginOne/',
            data: reqDict,
            type: 'POST',
            sCallback: function (data) {
                console.log(JSON.stringify(data))
                callback && callback(data);
            },
            
        };
        this.request(param);
    }



}

export { IndexBindnumber };