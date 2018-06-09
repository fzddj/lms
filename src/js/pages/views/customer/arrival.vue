<template>
    <div>
        <div class="customer-detail-from">
            <div class="customer-item-head">
                <div class="customer-item-head-left">
                    <div :class="[getIntentionLevel(params.level)]">
                        <text :class="[getIntentionLevelText(params.level)]">{{params.level}}</text>
                    </div>
                </div>
                <div class="customer-item-head-middle">
                    <div><text>{{params.name}}</text></div>
                    <div>
                        <text>{{params.phone}}</text>
                    </div>
                </div>
            </div>


            <div class="customer-item-info">
                <div class="customer-item-info-one">
                    <text class="customer-item-info-text iconfont">&#xe74f;</text>
                    <text class="customer-item-info-value">{{carSeriesName+"-"+carModelName}}</text>
                </div>
            </div>


            <div class="customer-item-value">
                <div class="title-item item-bottom">
                    <wxc-cell :has-bottom-border="false" :cellStyle="cellStyle" title="沟通内容"></wxc-cell>
                    <text class="title-item-label-required">*</text>
                </div>

                <div>
                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="标签">
                        <div class="choice-item" @click="tagClick()"><text class="choice-item-text">{{tagName}}</text></div>
                    </wxc-cell>
                </div>

                <textarea class="textarea"
                          placeholder="请输入沟通内容"
                          :value="desc"
                          maxlength="255"
                          @input="inputValue">
                </textarea>
            </div>

            <div class="customer-item-img" @click="addImg()">
                <text class="iconfont iconfont-color">&#xe74c;</text>
            </div>

            <div class="customer-item-time-go">
                <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="到店时间">
                    <div class="choice-item" @click="getGoTime()"><text class="choice-item-text">{{goTime}}</text></div>
                </wxc-cell>
                <text class="label-required">*</text>
            </div>

            <div class="customer-item-time-back">
                <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="离店时间">
                    <div class="choice-item" @click="getBackTime()"><text class="choice-item-text">{{backTime}}</text></div>
                </wxc-cell>
                <text class="label-required">*</text>
            </div>



            <div class="customer-item-time-next-go">
                <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="下次到店时间">
                    <div class="choice-item" @click="getNextDate()"><text class="choice-item-text">{{nextDate}}</text></div>
                </wxc-cell>
            </div>

            <div class="customer-item-time-next-back">
                <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="下次去电时间">
                    <div class="choice-item" @click="getNextPhoneDate()"><text class="choice-item-text">{{nextPhoneDate}}</text></div>
                </wxc-cell>
            </div>

            <!--意向-->
            <div class="customer-item-row" v-if="customerStatus == 0">
                <div class="customer-item-row-left" @click="customerBookingCar()">
                    <text class="iconfont  iconfont-color">&#xe6c6;</text>
                    <text>添加订车</text>
                </div>
                <div class="customer-item-row-between" @click="customerDeliveryCar()">
                    <text class="iconfont  iconfont-color">&#xe7c6;</text>
                    <text>添加交车</text>
                </div>
                <div  class="customer-item-row-right" @click="customerDefeatDetail()">
                    <text class="iconfont  iconfont-color">&#xe6c9;</text>
                    <text>申请战败</text>
                </div>
            </div>

            <!--订车-->
            <div class="customer-booking-item-head" v-if="customerStatus == 1">
                <div class="customer-booking-item-head-row" @click="editBooking()">
                    <text class="iconfont  iconfont-color iconfont-color-font customer-booking-item-head-row-iconfont">&#xe6fc;</text>
                    <text class="customer-item-info-value customer-booking-item-head-row-text">{{carSeriesName+"-"+carModelName}}</text>
                    <text class="iconfont  iconfont-color iconfont-color-font customer-booking-item-head-row-iconfont iconfont-right">&#xe717;</text>
                </div>
            </div>
            <div class="customer-booking-item" v-if="customerStatus == 1">
                <div class="customer-booking-item-row" @click="customerDeliveryCar()">
                    <text class="iconfont  iconfont-color">&#xe7c6;</text>
                    <text>添加交车</text>
                </div>
                <div  class="customer-booking-item-row-right" @click="customerDefeatDetail()">
                    <text class="iconfont  iconfont-color">&#xe6c9;</text>
                    <text>申请战败</text>
                </div>
            </div>

            <!--成交-->
            <div class="customer-item-row" v-if="customerStatus == 2">
                <div class="customer-booking-item-row" @click="addCustomerClick()">
                    <text class="iconfont  iconfont-color">&#xe74f;</text>
                    <text>增换购车</text>
                </div>
                <div  class="customer-booking-item-row-right" @click="addCustomerClick()">
                    <text class="iconfont  iconfont-color">&#xe7bf;</text>
                    <text>介绍客户</text>
                </div>
            </div>


        </div>

        <div :style="{'margin-top':listHeight+'px'}">
            <wxc-button :btn-style="btnStyle" @wxcButtonClicked="addArrival()" text="提交"></wxc-button>
        </div>

        <div class="category-item-fixed">
            <navigation :navigationTitle="title" :rightShow="rightShowStatus" @wxcMinibarRightButtonClicked="wxcMinibarRightButtonClicked"></navigation>
        </div>

    </div>
</template>

<script src="../../../node_modules/vue/dist/vue.runtime.js"></script>
<script src="../../../node_modules/weex-vue-render/dist/index.js"></script>
<script src="../../../node_modules/@weex-project/weex-picker/js/build/index.js"></script>

<script>
    let modal = weex.requireModule('modal');
    import {WxcSimpleFlow,WxcTabPage,WxcButton,WxcPopup,WxcTag, WxcCell,Utils } from 'weex-ui';
    import Navigation from "../../components/navigation";
    import CategoryLabel from "../../components/categoryLabel";
    import InputRadio from "../../components/input/inputRadio";
    import Picker from "../../components/picker";
    import tabBar from '../../components/tabBar';
    import util from '../../util/util';
    const wxcPicker = weex.requireModule('picker');

    export default {
        components: {
            Picker,
            InputRadio,
            CategoryLabel,
            Navigation,
            WxcCell,
            WxcButton,
            WxcPopup,
            tabBar,
            WxcTabPage,
            WxcSimpleFlow,
            WxcTag
        },
        name: "arrival",
        data () {
            return {
                title:'添加到店',
                rightShowStatus:false,
                carSeriesName:"",
                carModelName:"",
                tagName:"请选择标签＞",
                cellStyle:{
                    "padding-bottom": '1px',
                    "padding-top": '1px'
                },
                params:{
                    level:"",
                    name:"",
                    phone:""
                },
                btnStyle:{
                    'top':'10px',
                    'left':'0px',
                    'right':'0px',
                    'bottom':'20px',
                    'width':'750px',
                    'background-color': '#48c9bf',
                },
                date1:"2018-05-30",
                customerId:"",
                desc:"",
                goTime:"请选择＞",
                backTime:"请选择＞",
                nextDate:"请选择＞",
                nextPhoneDate:"请选择＞",
                customerStatus:0,
                brandId:"",
                dealerId:""
            }
        },
        methods:{
            wxcMinibarRightButtonClicked() {

            },
            getIntentionLevel(level){
                if (level == "H") {
                    return "panel-text-item";
                } else if (level == "A"){
                    return "panel-text-item-a";
                } else if (level == "B"){
                    return "panel-text-item-b";
                } else if (level == "C"){
                    return "panel-text-item-c";
                }
            },
            getIntentionLevelText(level){
                if (level == "H") {
                    return "panel-text-item-text";
                } else if (level == "A"){
                    return "panel-text-item-text-a";
                } else if (level == "B"){
                    return "panel-text-item-text-b";
                } else if (level == "C"){
                    return "panel-text-item-text-c";
                }
            },
            tagClick() {
                this.setItem("customerTagId",this.customerId);
                this.jump('customerTag');
            },
            inputValue(event) {
                this.desc = event.value;
            },
            addImg() {
                console.log("addImg");
            },
            arrivalInit() {
                let customerId = this.customerId;
                let url = "/api/lms-center/customer/"+this.customerId;
                let that = this;
                this.GET(url,function(resp){
                    if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                        && resp.data.data.id != null && resp.data.data.id != undefined) {

                        let url1 = "/api/lms-center/customer-detail/"+customerId;
                        that.GET(url1,function(res){
                            if (res.status == 200 && res.data.data != null && res.data.data != undefined
                                && res.data.data.id != null && res.data.data.id != undefined) {
                                if (res.data.data.tag != null && res.data.data.tag != undefined && res.data.data.tag != "") {
                                    that.tagName = res.data.data.tag;
                                } else {
                                    that.tagName = "请选择标签＞";
                                }

                                that.desc = res.data.data.preDesc;

                                if (res.data.data.nextDate != null && res.data.data.nextDate != undefined && res.data.data.nextDate != "") {
                                    that.nextPhoneDate = util.formatDateTime(res.data.data.nextDate);
                                }

                                if (res.data.data.reserveTime != null && res.data.data.reserveTime != undefined && res.data.data.reserveTime != "") {
                                    that.nextDate = util.formatDateTime(res.data.data.reserveTime);
                                }
                            }
                        });

                        that.carSeriesId = resp.data.data.seriesId;
                        that.carSeriesName = (resp.data.data.seriesName == null || resp.data.data.seriesName == undefined || resp.data.data.seriesName == "") ?
                            "未选择":resp.data.data.seriesName;
                        that.modelId = resp.data.data.modelId;
                        that.carModelName = (resp.data.data.modelName == null || resp.data.data.modelName == undefined || resp.data.data.modelName == "") ?
                            "未选择":resp.data.data.modelName;

                        that.params.level = resp.data.data.level;
                        that.params.name = resp.data.data.name;
                        that.params.phone = resp.data.data.phone;

                        //status
                        // 状态 0=意向客户 1=订车客户 2=成交客户 3=战败客户
                        that.customerStatus = resp.data.data.status;

                    }
                })
            },
            customerBookingCar() {
                this.setItem("customerBookingCarId",this.customerId);
                this.jump("customerBookingCar");
            },
            customerDeliveryCar() {
                this.setItem("customerDeliveryCarId",this.customerId);
                this.jump("customerDeliveryCar");
            },
            customerDefeatDetail() {
                this.setItem("customerDefeatDetailId",this.customerId);
                this.jump("customerDefeatDetail");
            },
            addArrival() {
                let that = this;
                let customerId = this.customerId;



                if (this.desc == null || this.desc == undefined || this.desc == "") {
                    this.showToast('请输入沟通内容');
                    return
                }

                if (this.goTime == null || this.goTime == undefined || this.goTime == "" || this.goTime == "请选择＞") {
                    this.showToast('请选择到店时间');
                    return
                }

                if (this.backTime == null || this.backTime == undefined || this.backTime == "" || this.backTime == "请选择＞") {
                    this.showToast('请选择离店时间');
                    return
                }

                // 添加flow表
                let flowUrl = "/api/lms-center/customer-flow";
                let flowObj = {
                    "customerId":customerId,
                    // "taskId":taskId,
                    "createdName":this.getItem("userName"),
                    "name":this.params.name,
                    "model":this.carSeriesName+"-"+this.carModelName,
                    "level":this.params.level,
                    "arriveOn":this.goTime,
                    "leaveOn":this.backTime,
                    "label":this.tagName,
                    "flowDescription":this.desc,
                    "createdBy":this.getItem("userId")
                }
                let flowId = "";
                this.POST(flowUrl,flowObj,"json",function(flowResp){

                    if (flowResp.status == 200 && flowResp.data.data != null && flowResp.data.data != undefined && flowResp.data.data.id != ""){
                        flowId = flowResp.data.data.id;

                        if (that.nextPhoneDate != null && that.nextPhoneDate != undefined && that.nextPhoneDate != "" && that.nextPhoneDate != "请选择＞" ) {

                            // 添加task表
                            let taskUrl = "/api/lms-center/customer-task";
                            let taskObj = {
                                "brandId":that.brandId,
                                "dealerId":that.dealerId,
                                "customerId":customerId,
                                "flowId":flowId,
                                "status":"0",
                                "taskDate":that.nextPhoneDate
                            }

                            that.POST(taskUrl,taskObj,"json",function(taskResp) {
                                console.log(taskResp);
                            });

                        }
                    }
                });


                let url = "/api/lms-center/customer-detail/" + customerId;
                let obj = {
                    "preTime":new Date(),
                    "preDesc":this.desc
                };

                if (that.nextPhoneDate != null && that.nextPhoneDate != undefined && that.nextPhoneDate != "" && that.nextPhoneDate != "请选择＞" ) {
                    obj['nextDate'] = that.nextPhoneDate;
                }

                if (that.nextDate != null && that.nextDate != undefined && that.nextDate != "" && that.nextDate != "请选择＞" ) {
                    obj['reserveTime'] = that.nextDate;
                }

                this.PATCH(url,obj,"json",function(resp){
                    if (resp.status == 200){
                        that.$router.go(-1);
                    }
                });
            },
            getGoTime() {
                let that = this;
                setTimeout(
                    function() {
                        let options = {};
                        wxcPicker.pickDate({
                            value: that.goTime,
                        }, event => {
                            if (event.result === 'success') {
                                that.goTime = event.data;
                            }
                        })
                    },
                    100
                )
            },
            getBackTime() {
                let that = this;
                setTimeout(
                    function() {
                        let options = {};
                        wxcPicker.pickDate({
                            value: that.backTime,
                        }, event => {
                            if (event.result === 'success') {
                                that.backTime = event.data;
                            }
                        })
                    },
                    100
                )
            },
            getNextDate() {
                let that = this;
                setTimeout(
                    function() {
                        let options = {};
                        wxcPicker.pickDate({
                            value: that.nextDate,
                        }, event => {
                            if (event.result === 'success') {
                                that.nextDate = event.data;
                            }
                        })
                    },
                    100
                )
            },
            getNextPhoneDate() {
                let that = this;
                setTimeout(
                    function() {
                        let options = {};
                        wxcPicker.pickDate({
                            value: that.nextPhoneDate,
                        }, event => {
                            if (event.result === 'success') {
                                that.nextPhoneDate = event.data;
                            }
                        })
                    },
                    100
                )
            },
            addCustomerClick() {
                this.jump("addCustomer");
            },
            editBooking() {
                this.setItem("editCustomerDefeatDetailId",this.customerId);
                this.jump("editCustomerDefeatDetail");
            }
        },
        created () {
            //初始化list div高度
            let height = Utils.env.getPageHeight();
            this.listHeight = height - 100;

            this.customerId = this.getItem("customerArrivalId");
            this.arrivalInit();

            // 初始化品牌ID
            this.brandId = this.getItem("brandId");
            // 初始化经销商ID
            this.dealerId = (this.getItem("dealerId") == null || this.getItem("dealerId") == undefined
                || this.getItem("dealerId") == "undefined")?"123456":this.getItem("dealerId");
        }
    }
</script>

<style scoped>
    .iconfont {
        font-family:iconfont;
    }
    .category-item-fixed {
        position:fixed;
        flex: 1;
        /*z-index:1;*/
        /*position: absolute;*/
    }

    .w-button {
        position: absolute;
    }
    .button-one {
        left:380px;
    }
    .item-container {
        width: 750px;
        background-color: #ffffff;
    }
    .panel-text-item {
        background-color: #E51C23;
        top:5px;
        left: 24px;
        width: 60px;
        height: 60px;
        position: absolute;
    }
    .panel-text-item-text{
        top:6px;
        left:14px;
        color: #ffffff;
        font-size:42px;
    }

    .panel-text-item-a {
        background-color: #F6B52B;
        top:5px;
        left: 24px;
        width: 60px;
        height: 60px;
        position: absolute;
    }
    .panel-text-item-text-a{
        top:6px;
        left:14px;
        color: #ffffff;
        font-size:42px;
    }

    .panel-text-item-b {
        background-color: #C1C364;
        top:5px;
        left: 24px;
        width: 60px;
        height: 60px;
        position: absolute;
    }
    .panel-text-item-text-b{
        top:6px;
        left:14px;
        color: #ffffff;
        font-size:42px;
    }

    .panel-text-item-c {
        background-color: #51A850;
        top:5px;
        left: 24px;
        width: 60px;
        height: 60px;
        position: absolute;
    }
    .panel-text-item-text-c {
        top:10px;
        left:15px;
        color: #ffffff;
        font-size:42px;
    }
    .customer-item-head{
    }
    .customer-detail-from {
        position: absolute;
        top: 110px;
        left: 0;
        right: 0;
        /*bottom:0;*/
    }
    .customer-item-head-left {
        position: absolute;
        top: 6px;
    }
    .customer-item-head-middle {
        width: 350px;
        position: absolute;
        left: 130px;
    }
    .customer-item-head-right {
        position: absolute;
        left: 420px;
        top:6px;
    }
    .customer-item-head-tag {
        position: absolute;
        top:10px;
    }
    .customer-item-info{
        left: 24px;
        top: 90px;
    }
    .customer-item-info-text {
        margin-top: 5px;
        width: 50px;
        position: absolute;
    }
    .customer-item-info-value {
        left:60px;
        position: absolute;
    }
    .customer-item-info-one {
        top: 0;
    }
    .customer-item-info-two {
        top:30px;
    }
    .customer-item-info-three {
        top:100px;
    }
    .tag-one {

    }
    .tag-two {
        left: 60px;
    }
    .tab-page {
        top:250px;
    }

    .item-bottom {
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #e6e6e6;
    }

    .input {
        height: 68px;
        text-align: right;
        font-size: 28px;
    }

    .label-required{
        left: 0;
        top:25px;
        width: 18px;
        height: 40px;
        line-height: 20px;
        color: rgba(229, 28, 35, 1);
        font-size: 20px;
        text-align: center;
        position: absolute;
    }
    .title-item-label-required{
        left: 0;
        top:15px;
        width: 18px;
        height: 40px;
        line-height: 20px;
        color: rgba(229, 28, 35, 1);
        font-size: 20px;
        text-align: center;
        position: absolute;
    }
    .textarea {
        width: 705px;
        left: 24px;
        right:24px;
        height: 200px;
    }
    .clue-extend-text{
        top: 25px;
        width: 750px;
        height: 100px;
        justify-content: center;
        align-items: center;
    }
    .status-up{

    }
    .status-down{

    }
    .clue-extend-text-item{
        color: #3493EB;
    }
    .choice-item {
        height: 68px;
    }
    .choice-item-text{
        color: #717171;
        font-size: 28px;
        top:17px;
    }

    .category-item-fixed {
        position:fixed;
        flex: 1;
    }
    .category-item-from {
        position: absolute;
        top: 80px;
        left: 0;
        right: 0;
        bottom:0;
    }
    .extend-info {
        top: 100px;
        height: 0;
    }

    .item-bottom {
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #e6e6e6;
    }
    .customer-detail{
        height: 1200px;
    }
    .button-div{
        width: 200px;
        height: 400px;
    }
    .customer-item-value {
        top: 165px;
    }

    .customer-item-img {
        top:150px;
        left:680px;
        right:0;
        height:50px;
        width:50px;
    }
    .customer-item-row{
        top:175px;
        height: 150px;
        background-color: #e6e6e6;
    }
    .customer-item-row-left {
        position: absolute;
        text-align: center;
        align-items: center;
        justify-content: center;
        width: 250px;
        top:30px;
    }
    .customer-item-row-between{
        position: absolute;
        text-align: center;
        align-items: center;
        justify-content: center;
        left:250px;
        width: 250px;
        top:30px;
    }
    .customer-item-row-right {
        position: absolute;
        text-align: center;
        align-items: center;
        justify-content: center;
        left:500px;
        width: 250px;
        top:30px;
    }
    .customer-booking-item-head{
        top:175px;
        height: 70px;
        background-color: #e6e6e6;
    }
    .customer-booking-item-head-row-text{
        top:13px;
        position: absolute;
    }
    .customer-booking-item-head-row-iconfont {
        top:16px;
        position: absolute;
    }
    .customer-booking-item-head-row{
        height: 70px;
    }
    .iconfont-color-font{
        left:24px;
        font-size: 32px;
    }
    .iconfont-right{
        left:690px;
    }
    .customer-booking-item{
        top:185px;
        height: 150px;
        background-color: #e6e6e6;
    }
    .customer-booking-item-row{
        position: absolute;
        text-align: center;
        align-items: center;
        justify-content: center;
        width: 375px;
        top:30px;
    }
    .customer-booking-item-row-right{
        position: absolute;
        text-align: center;
        align-items: center;
        justify-content: center;
        left:375px;
        width: 375px;
        top:30px;
    }
    .text-font-weight {
        font-weight:600;
    }
    .customer-item-time-go {
        top:150px;
    }
    .customer-item-time-back {
        top:155px;
    }
    .title-item{
        height: 60px;
    }
    .customer-item-time-next-go{
        top:175px;
    }
    .customer-item-time-next-back{
        top:175px;
    }
    .iconfont-color {
        color: #0076FF;
    }

</style>