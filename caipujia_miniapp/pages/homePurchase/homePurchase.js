
import { HomePurchase } from 'homePurchase-model.js';
var homePurchase = new HomePurchase();


import { Config } from '../../utils/config.js';


let goodsList = [{
    actEndTime: '2018-10-01 10:00:43'
}]

var animation = wx.createAnimation()


Page({

    /**
     * 页面的初始数据
     */
    data: {
        countDownList: [],
        actEndTimeList: [],
        content: '欢迎回来',
        notice:'活动期间满100送10块',
        typeTrue:'true',
        source_url:Config.imageUrl,
        formId:null,

        beauty:'beauty',
        disabled:'disabled'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let endTimeList = [];
        // 将活动的结束时间参数提成一个单独的数组，方便操作
        goodsList.forEach(o => {
            endTimeList.push(o.actEndTime)
        })
        this.setData({
            actEndTimeList: endTimeList
        });
        // 执行倒计时函数
        this.countDown();
        // this.contentLoop();

        this.purchaseClasify();

    },
    /**抢购时间点击 */
    scheduleClick:function(e){
        var that = this;
        console.log('scheduleClick111' + e.currentTarget.id)
        var index = e.currentTarget.id
        var dict = that.data.timers[index]

        var dictCates = JSON.parse(JSON.stringify(dict.cates))
        var catesValue = []
        for (var key in dictCates) {
            catesValue.push({ id: key, name: dictCates[key] })
        }

        console.log('scheduleClick333' + JSON.stringify(catesValue))
        that.setData({
            cates: catesValue,
            shopid: dict.id,
            timer: dict.time
        })

        that.purchaseList()
    },


    /**限时抢购分类*/ 
    purchaseClasify:function(){
        var that = this;
        homePurchase.purchaseClasify(null,(res)=>{
            console.log('purchaseClasify1111' + JSON.stringify(res.cates))
            that.setData({
                timers: res.timers,
                activate_cate_datas: res.activate_cate_datas,
                cates: res.cates
            }) 

            
        })
    },


    /**跳转到详情 */
    cellClick: function (event){
        var id = homePurchase.getDataSet(event, 'id');
        wx.navigateTo({
            url: '../detail/detail?id='+id,
        })
    },

    /**限时抢购商品列表 */
    purchaseList:function(){
        var that = this;
        var reqDict = {
            shopid: that.shopid,
            timer: that.timer,
        }

        homePurchase.purchaseList(reqDict, (res) => {
            console.log('purchaseList1111' + JSON.stringify(res))
            that.setData({
                list:res.list,
            })

            // console.log('purchaseList:222222' + JSON.stringify(res)

        })
    },

    contentLoop: function () {
        var that = this;
        var generateRandomNumber = () => Math.floor(Math.random() * 1900 + 1) // 生成1到1999的随机数
        setInterval(() => {
            that.update('你获得了' + generateRandomNumber() + '个金币')
        }, 1000)

    },
    /**抢购*/ 
    qiangClick:function() {

    },

    /**类型点击 */
    typeClick: function (event){
        var that = this;
        console.log('111'+JSON.stringify(event))
        that.setData({
            formId: event.currentTarget.id
        })

        console.log('222'+that.data.formId)

    },





    /**
     * 传入内容，广播将会以动画播放这条内容
     */
    update: function (content) {
        var self = this;
        // 旧消息向上平移，以低速开始，动画时间300ms
        animation.translateY(-30).step({
            duration: 300,
            timingFunction: 'ease-in'
        })
        // 为了实现下一条新内容向上平移的效果，必须把内容很快平移到下方，并且不能被用户看见
        // 实现方法：动画时间设置为1ms，过渡效果设置为’动画第一帧就跳至结束状态直到结束‘
        animation.opacity(0).translateY(30).step({
            duration: 1,
            timingFunction: 'step-start'
        })
        // 新消息向上平移的同时恢复透明度，以低速结束，动画时间300ms
        animation.opacity(1).translateY(0).step({
            duration: 300,
            timingFunction: 'ease-out'
        })
        self.setData({
            animationData: animation.export()
        })
        // 更新内容的延时必须大于第一步动画时间
        setTimeout(self.setData.bind(self, {
            content: content
        }), 300)
    },



    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    timeFormat(param) { //小于10的格式化函数
        return param < 10 ? '0' + param : param;
    },
    countDown() { //倒计时函数
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime();

        // let startTime = this.data.activate_cate_datas.start_time
        let endTimeList = this.data.actEndTimeList;
        let countDownArr = [];

        // 对结束时间进行处理渲染到页面
        endTimeList.forEach(o => {
            let endTime = new Date(o).getTime();
            let obj = null;
            // 如果活动未结束，对时间进行处理
            if (endTime - newTime > 0) {
                let time = (endTime - newTime) / 1000;
                // 获取天、时、分、秒
                let day = parseInt(time / (60 * 60 * 24));
                let hou = parseInt(time % (60 * 60 * 24) / 3600);
                let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
                let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
                obj = {
                    day: this.timeFormat(day),
                    hou: this.timeFormat(hou),
                    min: this.timeFormat(min),
                    sec: this.timeFormat(sec)
                }
            } else { //活动已结束，全部设置为'00'
                obj = {
                    day: '00',
                    hou: '00',
                    min: '00',
                    sec: '00'
                }
            }
            countDownArr.push(obj);
        })
        // 渲染，然后每隔一秒执行一次倒计时函数
        this.setData({
            countDownList: countDownArr
        })
        setTimeout(this.countDown, 1000);
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})