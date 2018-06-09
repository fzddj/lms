<template>
    <div>
        <list class="customer-detail-from" :style="{height:listHeight-100 +'px'}">
           <cell>

               <div class="customer-item-head">
                   <div class="customer-item-head-left">
                       <div :class="[getIntentionLevel(level)]">
                           <text :class="[getIntentionLevelText(level)]">{{level}}</text>
                       </div>
                   </div>
                   <div class="customer-item-head-middle">
                       <div><text>{{params.owner}}</text></div>
                       <div>
                           <text>{{params.ownerPhone}}</text>
                       </div>
                   </div>
               </div>

               <div class="customer-item-row">
                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="车主姓名">
                           <input class="input"
                                  placeholder="车主姓名"
                                  :value="params.owner"
                                  maxlength="50"
                                  @input="inputName"/>
                       </wxc-cell>
                       <text class="label-required">*</text>
                   </div>
                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="车主电话">
                           <input class="input"
                                  type="tel"
                                  placeholder="请输入手机号"
                                  :value="params.ownerPhone"
                                  maxlength="11"
                                  @input="inputPhone"/>
                       </wxc-cell>
                       <text class="label-required">*</text>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="车型">
                           <div class="choice-item" @click="carModelClick()"><text class="choice-item-text">{{carSeriesName+"-"+carModelName}}</text></div>
                       </wxc-cell>
                       <text class="label-required">*</text>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="颜色">
                           <input class="input"
                                  placeholder="请输入颜色"
                                  value=""
                                  maxlength="20"
                                  @input="inputColor"/>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="计划交车时间">
                           <div class="choice-item" @click="getPlanDate()"><text class="choice-item-text">{{planDate}}</text></div>
                       </wxc-cell>
                       <text class="label-required">*</text>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="车架号">
                           <input class="input"
                                  placeholder="请输入车架号"
                                  value=""
                                  maxlength="20"
                                  @input="inputVinCode"/>
                           <text class="label-required">*</text>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="发动机号">
                           <input class="input"
                                  placeholder="请输入发动机号"
                                  value=""
                                  maxlength="32"
                                  @input="inputEngineCode"/>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="车牌号">
                           <input class="input"
                                  placeholder="请输入车牌号"
                                  value=""
                                  maxlength="20"
                                  @input="inputPlateNumber"/>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="订金金额">
                           <input class="input"
                                  placeholder="请输入订金金额"
                                  value=""
                                  maxlength="6"
                                  @input="inputDeposit"/>
                           <text class="input-item-text">元</text>
                       </wxc-cell>
                   </div>


                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="成交价格">
                           <input class="input"
                                  placeholder="请输入金额"
                                  value=""
                                  type="number"
                                  maxlength="10"
                                  @input="inputDealPrice"/>
                           <text class="input-item-text">元</text>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="优惠价格">
                           <input class="input"
                                  placeholder="请输入金额"
                                  value=""
                                  type="number"
                                  maxlength="10"
                                  @input="inputOfferPrice"/>
                           <text class="input-item-text">元</text>
                       </wxc-cell>
                   </div>


                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="购买方式">
                           <div class="choice-item" @click="purchaseMethodClick()"><text class="choice-item-text">{{purchaseMethod}}</text></div>
                       </wxc-cell>
                   </div>

                   <div v-if="loanShow">
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="贷款期限">
                           <input class="input"
                                  placeholder="请输入贷款期限"
                                  value=""
                                  type="number"
                                  maxlength="4"
                                  @input="inputLoanTime"/>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="赠送">
                           <input class="input"
                                  placeholder="请输入赠品"
                                  value=""
                                  maxlength="100"
                                  @input="inputGift"/>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="本店投保">
                           <input-radio
                                   :items="insureInfo"
                                   :selected="insureSelected"
                                   :radioStyle="radioStyle"
                                   @changeRadioCallBack="changeInsureRadioCallBack"
                           ></input-radio>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="保险到期日">
                           <div class="choice-item" @click="getInsuredDate()"><text class="choice-item-text">{{insuredDate}}</text></div>
                       </wxc-cell>
                       <text class="label-required">*</text>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="是否加装">
                           <input-radio
                                   :items="refitInfo"
                                   :selected="refitSelected"
                                   :radioStyle="radioStyle"
                                   @changeRadioCallBack="changeRefitRadioCallBack"
                           ></input-radio>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="精品装饰">
                           <input class="input"
                                  placeholder="请输入精品装饰"
                                  value=""
                                  maxlength="100"
                                  @input="inputDecoration"/>
                       </wxc-cell>
                   </div>

               </div>

           </cell>
        </list>


        <div :style="{'margin-top':listHeight+'px'}">
            <wxc-button :btn-style="btnStyle" @wxcButtonClicked="addDelivery()" text="提交"></wxc-button>
        </div>

        <div class="show-item">
            <div v-if="isCarModelSourceShow">
                <picker
                        :show="isCarModelSourceShow"
                        :selectData="selectCarModelData"
                        @confirm="carModelCheck"
                        @cancel="carModelCancel"
                ></picker>
            </div>

            <div v-if="isPurchaseMethodSourceShow">
                <picker
                        :show="isPurchaseMethodSourceShow"
                        :selectData="selectPurchaseMethodData"
                        @confirm="purchaseMethodCheck"
                        @cancel="purchaseMethodCancel"
                ></picker>
            </div>
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
    import Bus from '../../util/bus';

    export default {
        name: "customer-delivery-car",
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
        data () {
            return {
                title:'添加交车',
                rightShowStatus:false,
                carSeriesName:"未选择",
                carModelName:"未选择",
                carSeriesId:"",
                carModelId:"",
                isCarModelSourceShow:false,
                selectCarModelData:{

                },
                cellStyle:{
                    "padding-bottom": '1px',
                    "padding-top": '1px'
                },
                loanShow:false,
                planDate:"请选择＞",
                // id
                // brand_id
                // dealer_id
                // customer_id
                // status
                // owner
                // owner_type
                // owner_phone
                // series_id
                // model_id
                // model_name
                // color
                // order_car_time
                // delivery_car_time
                // deposit
                // purchase_type
                // loan_time
                // deal_price
                // offer_price
                // gift
                // is_insured
                // insured_date
                // engine_code
                // vin_code
                // plate_number
                // is_decoration
                // decoration
                // enabled_flag
                // created_by
                // creation_date
                // updated_by
                // updation_date
                // deal_consultant
                level:"",
                params:{
                    brandId:"",
                    dealerId:"",
                    customerId:"",
                    status:"",
                    owner:"",
                    ownerType:"",
                    ownerPhone:"",
                    seriesId:"",
                    modelId:"",
                    modelName:"",
                    color:"",
                    orderCarTime:"",
                    deliveryCarTime:"",
                    deposit:"",
                    purchaseType:"",
                    loanTime:"",
                    dealPrice:"",
                    offerPrice:"",
                    gift:"",
                    isInsured:"",
                    insuredDate:"",
                    engineCode:"",
                    vinCode:"",
                    plateNumber:"",
                    isDecoration:"",
                    decoration:"",
                    enabledFlag:"",
                    saleConsultant:"",
                },
                btnStyle:{
                    'top':'10px',
                    'left':'0px',
                    'right':'0px',
                    'bottom':'20px',
                    'width':'750px',
                    'background-color': '#48c9bf',
                },
                customerId:"",
                planDate:"请选择＞",
                purchaseMethod:"请选择＞",
                isPurchaseMethodSourceShow:false,
                selectPurchaseMethodData:{},

                radioStyle:{
                    marginRight: '15px',
                    height: '68px'
                },
                insureInfo:[
                    {text:"是",id:1},
                    {text:"否",id:0}
                ],
                insureSelected:1,
                refitInfo:[
                    {text:"是",id:1},
                    {text:"否",id:0}
                ],
                refitSelected:1,
                insuredDate:"请选择＞",
            }
        },
        methods: {
            inputName(event) {
                this.params.owner = event.value;
            },
            inputPhone(event) {
                this.params.ownerPhone = event.value;
            },
            inputColor(event) {
                this.params.color = event.value;
            },
            inputDeposit(event) {
                this.params.deposit = event.value;
            },
            inputLoanTime(event) {
                this.params.loanTime = event.value;
            },
            inputDealPrice(event) {
                this.params.dealPrice = event.value;
            },
            inputOfferPrice(event) {
                this.params.offerPrice = event.value;
            },
            inputGift(event) {
                this.params.gift = event.value;
            },
            inputDecoration(event) {
                this.params.decoration = event.value;
            },
            inputVinCode(event) {
                this.params.vinCode = event.value;
            },
            inputEngineCode(event) {
                this.params.engineCode = event.value;
            },
            inputPlateNumber(event) {
                this.params.plateNumber = event.value;
            },
            wxcMinibarRightButtonClicked() {
                console.log("编辑");
            },
            init() {
                let customerId = this.customerId;
                let url = "/api/lms-center/customer/"+this.customerId;
                let that = this;
                this.GET(url,function(resp){
                    console.log(resp);
                    if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                        && resp.data.data.id != null && resp.data.data.id != undefined) {

                        that.carSeriesId = resp.data.data.seriesId;
                        that.carSeriesName = (resp.data.data.seriesName == null || resp.data.data.seriesName == undefined || resp.data.data.seriesName == "") ?
                            "未选择":resp.data.data.seriesName;
                        that.modelId = resp.data.data.modelId;
                        that.carModelName = (resp.data.data.modelName == null || resp.data.data.modelName == undefined || resp.data.data.modelName == "") ?
                            "未选择":resp.data.data.modelName;

                        that.params.seriesId = resp.data.data.seriesId;
                        that.params.seriesName = resp.data.data.seriesName;
                        that.params.modelId = resp.data.data.modelId;
                        that.params.modelName = resp.data.data.modelName;

                        that.level = resp.data.data.level;
                        that.params.owner = resp.data.data.name;
                        that.params.ownerPhone = resp.data.data.phone;
                    }
                })
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
            carModelClick() {
                this.selectCarModelData = {};
                let that = this;
                let brandId = this.getItem("brandId");
                if (brandId != null && brandId != undefined && brandId != "") {
                    let url = "/api/basicdata/api/carseries/findCarSeriesByBrandId/"+brandId;

                    this.GET(url,function(resp) {
                        console.log(resp);
                        if (resp.status == 200 && resp['data'] != null && resp['data'].length > 0) {

                            let pData1 = new Array();
                            let pData2 = new Object();

                            // 车系信息组装车型信息
                            for (let i =0;i<resp['data'].length;i++ ) {
                                let obj = {};
                                if (resp['data'][i]['status'] == "启用") {
                                    let id = resp['data'][i]['id'];
                                    let text = "拼接" + resp['data'][i]['name'];
                                    obj['id'] = id;
                                    obj['value'] = text;
                                    obj['name'] = resp['data'][i]['name'];
                                    obj['text'] = resp['data'][i]['name'];

                                    if (id != null && id != undefined && id != "") {
                                        let url1 = '/api/basicdata/api/carmodel/findCarModelBySeriesId/'+id;
                                        that.GET(url1,function(response) {
                                            let list = [];
                                            if (response.status == 200 && response['data'] != null && response['data'].length > 0) {
                                                for (let j = 0; j<response['data'].length; j++ ) {
                                                    let info = {};
                                                    info['id'] = response['data'][j]['id'];
                                                    info['value'] = response['data'][j]['name'];
                                                    info['text'] = response['data'][j]['name'];
                                                    info['name'] = response['data'][j]['name'];
                                                    list.push(info);
                                                }
                                            }
                                            pData2[text] = list;
                                        });
                                    }
                                    pData1.push(obj);
                                }
                            }

                            setTimeout(function(){
                                let modelData = {};
                                modelData['columns'] = 2;
                                modelData['link'] = true;
                                modelData['pData1'] = pData1;
                                modelData['pData2'] = pData2;
                                that.selectCarModelData = modelData;
                                // return;
                                that.isCarModelSourceShow = true;
                            },200);
                        }

                    });
                }
            },
            getPlanDate(){
                let that = this;
                setTimeout(
                    function() {
                        let options = {};
                        wxcPicker.pickDate({
                            value: that.planDate,
                        }, event => {
                            if (event.result === 'success') {
                                that.planDate = event.data;
                                that.params.deliveryCarTime = event.data;
                            }
                        })
                    },
                    100
                )
            },
            carModelCheck(selects) {
                if (selects['select1'] != null && selects['select1']['id'] != null
                    && selects['select1']['id'] != undefined && selects['select2'] != null
                    && selects['select2']['id'] != null
                    && selects['select2']['id'] != undefined) {

                    this.carSeriesId = selects['select1']['id'];
                    this.carSeriesName = selects['select1']['name'];
                    this.carModelId = selects['select2']['id'];
                    this.carModelName = selects['select2']['name'];

                    this.params.modelId = selects['select2']['id'];
                    this.params.modelName = selects['select2']['name'];
                    this.params.seriesId = selects['select1']['id'];
                    this.params.seriesName = selects['select1']['name'];
                }

                this.isCarModelSourceShow = false;
            },
            carModelCancel() {
                this.isCarModelSourceShow = false;
            },
            purchaseMethodClick() {
                let that = this;
                let url = "/api/auth/dictionary/subs/purchaseMethod";

                //获取客户来源从数据字典
                this.GET(url,function(resp) {
                    if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                        && resp.data.data.length > 0) {
                        that.selectPurchaseMethodData = {};
                        that.selectPurchaseMethodData['pData1'] = resp.data.data;
                        that.selectPurchaseMethodData['columns'] = 1;
                        that.selectPurchaseMethodData['link'] = false;
                        that.isPurchaseMethodSourceShow = true;
                    }
                });
            },
            purchaseMethodCheck(selects) {
                if (selects['select1'] != null && selects['select1']['id'] != null
                    && selects['select1']['id'] != undefined) {
                    this.purchaseType = selects['select1']['id'];
                    this.purchaseMethod = selects['select1']['value'];
                    this.params.purchaseType = selects['select1']['id'];
                    this.params.purchaseTypeDesc = selects['select1']['value'];
                    this.isPurchaseMethodSourceShow = false;

                    if (this.purchaseMethod == "贷款") {
                        this.loanShow = true;
                    } else {
                        this.loanShow = false;
                    }
                }
            },
            purchaseMethodCancel() {
                this.isPurchaseMethodSourceShow = false;
            },
            getInsuredDate(){
                let that = this;
                setTimeout(
                    function() {
                        let options = {};
                        wxcPicker.pickDate({
                            value: that.insuredDate,
                        }, event => {
                            if (event.result === 'success') {
                                that.insuredDate = event.data;
                                that.params.insuredDate = event.data;
                            }
                        })
                    },
                    100
                )
            },
            changeInsureRadioCallBack(data) {
                this.params.isInsured = data.id;
            },
            changeRefitRadioCallBack(data) {
                this.params.isDecoration = data.id;
            },
            addDelivery() {
                let that = this;

                if (this.params.owner == null || this.params.owner == undefined || this.params.owner == "") {
                    this.showToast('请填写车主姓名');
                    return
                }

                if (this.params.ownerPhone == null || this.params.ownerPhone == undefined || this.params.ownerPhone == "") {
                    this.showToast('请填写车主电话');
                    return
                }

                if (this.params.deliveryCarTime == null || this.params.deliveryCarTime == undefined || this.params.deliveryCarTime == "" ||
                    this.params.deliveryCarTime == "请选择＞") {
                    this.showToast('请选择交车时间');
                    return
                }

                if (this.params.modelId == null || this.params.modelId == undefined || this.params.modelId  == "" || this.params.seriesId == null
                    || this.params.seriesId == undefined || this.params.seriesId == "") {
                    this.showToast('请选择车型');
                    return
                }

                if (this.params.vinCode == null || this.params.vinCode == undefined || this.params.vinCode == "") {
                    this.showToast('请填写车架号');
                    return
                }

                //insured_date
                if (this.params.insuredDate == null || this.params.insuredDate == undefined || this.params.insuredDate == "") {
                    this.showToast('请选择保险到期日');
                    return
                }

                //正则校验手机号
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
                if (!reg.test(this.params.ownerPhone)){
                    this.showToast('请输入正确的手机号码');
                    return
                }

                // 初始化品牌ID
                this.params.brandId = this.getItem("brandId");
                // 初始化经销商ID
                this.params.dealerId = this.getItem("dealerId") == null || this.getItem("dealerId") == undefined || this.getItem("dealerId") == "undefined" ? "123456" : this.getItem("dealerId");

                this.params.customerId = this.customerId;

                this.params.status = 1;

                this.params.orderCarTime = util.getNowFormatDate();

                this.params.saleConsultant = this.getItem("userId");
                this.params.createdBy = this.getItem("userId");

                let checkUrl = "/api/lms-center/customer-car/getInfoByCustomerId/"+this.customerId;
                this.GET(checkUrl,function(res){
                    if (res.status == 200 && res.data.data != null && res.data.data != undefined
                        && res.data.data.id != null && res.data.data.id != undefined) {
                        let url = "/api/lms-center/customer-car/"+res.data.data.id;
                        let obj = that.params;
                        that.PATCH(url,obj,"json",function(resp){
                            if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                                && resp.data.data.id != null && resp.data.data.id != undefined) {

                                // 修改原状态为交车
                                let url1 = "/api/lms-center/customer/"+that.customerId;
                                let obj1 = {
                                    status:"2"
                                };
                                that.PATCH(url1,obj1,"json",function(res){
                                    if (resp.status == 200){

                                        // 存数据至flow
                                        let flowUrl = "/api/lms-center/customer-flow";
                                        let flowObj = {
                                            "customerId":that.customerId,
                                            "createdName":that.getItem("userName"),
                                            "name":that.params.name,
                                            "model":that.carSeriesName+"-"+that.carModelName,
                                            "level":that.params.level,
                                            "flowType":'添加交车',
                                            "createdBy":that.getItem("userId")
                                        }
                                        that.POST(flowUrl,flowObj,"json",function(flowResp){
                                            // console.log(flowResp);
                                        })


                                        that.jump("home");
                                        setTimeout(function(){
                                            Bus.$emit('tabBarChangePage',1);
                                        },200);
                                    }
                                });
                            }
                        });
                    } else {
                        let url = "/api/lms-center/customer-car";
                        let obj = that.params;
                        that.POST(url,obj,"json",function(resp){
                            if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                                && resp.data.data.id != null && resp.data.data.id != undefined) {

                                // 修改原状态为交车
                                let url1 = "/api/lms-center/customer/"+that.customerId;
                                let obj1 = {
                                    status:"2"
                                };
                                that.PATCH(url1,obj1,"json",function(res){
                                    if (resp.status == 200){

                                        // 存数据至flow
                                        let flowUrl = "/api/lms-center/customer-flow";
                                        let flowObj = {
                                            "customerId":that.customerId,
                                            "createdName":that.getItem("userName"),
                                            "name":that.params.name,
                                            "model":that.carSeriesName+"-"+that.carModelName,
                                            "level":that.params.level,
                                            "flowType":'添加交车',
                                            "createdBy":that.getItem("userId")
                                        }
                                        that.POST(flowUrl,flowObj,"json",function(flowResp){
                                            // console.log(flowResp);
                                        })


                                        that.jump("home");
                                        setTimeout(function(){
                                            Bus.$emit('tabBarChangePage',1);
                                        },200);
                                    }
                                });
                            }
                        });
                    }
                })



            }
        },
        created () {
            //初始化list div高度
            let height = Utils.env.getPageHeight();
            this.listHeight = height - 100;

            // this.customerId = this.getItem("customerRemarkId");
            this.customerId = this.getItem("customerDeliveryCarId");

            // 初始化数据
            this.init();

            this.params.isInsured = 0;
            this.params.isDecoration = 0;
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
        top: 100px;
        left: 0;
        right: 0;
        bottom:0;
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
        top:30px;
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
        top: 160px;
    }

    .customer-item-img {
        top:150px;
        left:680px;
        right:0;
        height:50px;
        width:50px;
    }
    .customer-item-row{
        top:90px;
    }
    .customer-item-row-left {
        position: absolute;
        text-align: center;
        align-items: center;
        justify-content: center;
        width: 375px;
        top:30px;
    }
    .customer-item-row-right {
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
    .title-item{
        height: 60px;
    }
    .iconfont-color{
        color: #0076FF;
    }
    .show-item {
        top: 15px;
    }

    .title-item{
        top:10px;
    }
</style>