<template>
    <div>
        <list class="customer-detail-from" :style="{height:listHeight+'px'}">
           <cell>
               <div>
                   <div class="item-bottom">
                       <category-label :title="labelTile1"></category-label>
                   </div>
                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="姓名">
                           <input class="input"
                                  placeholder="请输入姓名"
                                  :value="params.name"
                                  maxlength="50"
                                  @input="inputName"/>
                       </wxc-cell>
                       <text class="label-required">*</text>
                   </div>
                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="手机号码">
                           <input class="input"
                                  type="tel"
                                  placeholder="请输入手机号"
                                  :value="params.phone"
                                  maxlength="11"
                                  @input="inputPhone"/>
                       </wxc-cell>
                       <text class="label-required">*</text>
                   </div>
                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="客户来源">
                           <div class="choice-item" @click="sourceClick()"><text class="choice-item-text">{{sourceName}}</text></div>
                       </wxc-cell>
                       <text class="label-required">*</text>
                   </div>
                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="营销活动">
                           <input class="input"
                                  placeholder="请输入营销活动"
                                  :value="params.activity"
                                  maxlength="64"
                                  @input="inputActivity"/>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="地区">
                           <div class="choice-item" @click="areaClick()"><text class="choice-item-text">{{proviceName+"-"+cityName}}</text></div>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="详细地址">
                           <input class="input"
                                  placeholder="请输入详细地址"
                                  :value="params.address"
                                  maxlength="255"
                                  @input="inputAddress"/>
                       </wxc-cell>
                   </div>
               </div>

               <div :class="[extendStatus == true?'extend-info':'']">
                   <div class="item-bottom">
                       <category-label :title="labelTile2"></category-label>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="备用电话">
                           <input class="input"
                                  placeholder="请输入备用电话"
                                  :value="params.alternatePhone"
                                  maxlength="20"
                                  @input="inputSparePhone"/>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="微信账号">
                           <input class="input"
                                  placeholder="请输入微信账号"
                                  :value="params.wechat"
                                  maxlength="50"
                                  @input="inputWechat"/>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="性别">
                           <input-radio
                                   :items="sexInfo"
                                   :selected="sexSelected"
                                   :radioStyle="radioStyle"
                                   @changeRadioCallBack="changeSexRadioCallBack"
                           ></input-radio>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="生日">
                           <div class="choice-item" @click="getBirthday()"><text class="choice-item-text">{{birthday}}</text></div>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="职业">
                           <input class="input"
                                  placeholder="请输入职业"
                                  :value="params.job"
                                  maxlength="50"
                                  @input="inputJob"/>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="家庭成员">
                           <input class="input"
                                  placeholder=""
                                  :value="familyMember"
                                  maxlength="3"
                                  @input="inputFamilyCount"/>
                           <text class="input-item-text">人</text>
                       </wxc-cell>
                   </div>
               </div>

               <div class="clue-extend-text status-up" v-if="this.extendStatus === true" @click="checkExtendStatus()">
                   <text class="iconfont clue-extend-text-item">扩展信息&#xe65e;</text>
               </div>

               <div class="clue-extend-text status-down" v-if="this.extendStatus === false" @click="checkExtendStatus()">
                   <text class="iconfont clue-extend-text-item">扩展信息&#xe65d;</text>
               </div>

               <div>
                   <div class="item-bottom">
                       <category-label :title="labelTile3"></category-label>
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
                                  :value="params.color"
                                  maxlength="20"
                                  @input="inputColor"/>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="订车时间">
                           <div class="choice-item" @click="getOrderCarTime()"><text class="choice-item-text">{{orderCarTime}}</text></div>
                       </wxc-cell>
                       <text class="label-required">*</text>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="计划交车时间">
                           <div class="choice-item" @click="getPlanDate()"><text class="choice-item-text">{{planDate}}</text></div>
                       </wxc-cell>
                       <text class="label-required">*</text>
                   </div>


                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="订金金额">
                           <input class="input"
                                  placeholder="请输入订金金额"
                                  :value="params.deposit"
                                  maxlength="6"
                                  type="number"
                                  @input="inputDeposit"/>
                           <text class="input-item-text">元</text>
                       </wxc-cell>
                       <text class="label-required">*</text>
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
                                  :value="params.loanTime"
                                  type="number"
                                  maxlength="4"
                                  @input="inputLoanTime"/>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="成交价格">
                           <input class="input"
                                  placeholder="请输入金额"
                                  :value="params.dealPrice"
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
                                  :value="params.offerPrice"
                                  type="number"
                                  maxlength="10"
                                  @input="inputOfferPrice"/>
                           <text class="input-item-text">元</text>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="赠送">
                           <input class="input"
                                  placeholder="请输入赠品"
                                  :value="params.gift"
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
                                  :value="params.decoration"
                                  maxlength="100"
                                  @input="inputDecoration"/>
                       </wxc-cell>
                   </div>

                   <div>
                       <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="是否置换">
                           <input-radio
                                   :items="substitutionInfo"
                                   :selected="substitutionSelected"
                                   :radioStyle="radioStyle"
                                   @changeRadioCallBack="changeRadioCallBack"
                           ></input-radio>
                       </wxc-cell>
                   </div>

                   <div :class="[substitutionStatus == false?'substitution-info':'']">
                       <div>
                           <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="置换车型">
                               <input class="input"
                                      placeholder="请输入置换车型"
                                      :value="params.displaceCar"
                                      maxlength="50"
                                      @input="inputSubstitutionCarModel"/>
                           </wxc-cell>
                       </div>

                       <div>
                           <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="购车日期">
                               <div class="choice-item" @click="pickDate()"><text class="choice-item-text">{{buyDate}}</text></div>
                           </wxc-cell>
                       </div>

                       <div>
                           <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="行驶里程">
                               <input class="input"
                                      placeholder="请输入里程"
                                      :value="params.displaceMileage"
                                      maxlength="19"
                                      @input="inputMileage"/>
                               <text class="input-item-text">KM(公里)</text>
                           </wxc-cell>
                       </div>
                   </div>

                   <div class="item-bottom" style="margin-bottom: 90px">
                       <div class="title-item">
                           <wxc-cell :has-bottom-border="false" :cellStyle="cellStyle" title="备注"></wxc-cell>
                       </div>
                       <textarea class="textarea"
                                 placeholder="请输入备注"
                                 :value="params.description"
                                 maxlength="255"
                                 @input="inputDescription">
                                    </textarea>
                   </div>
               </div>
           </cell>
        </list>


        <div :style="{'margin-top':listHeight+'px'}">
            <wxc-button :btn-style="btnStyle" @wxcButtonClicked="editCustomer()">提交</wxc-button>
        </div>

        <div class="show-item" >
            <div v-if="isCustomerSourceShow">
                <picker
                        :show="isCustomerSourceShow"
                        :selectData="selectCustomerData"
                        @confirm="customeCheck"
                        @cancel="customeCancel"
                ></picker>
            </div>

            <div v-if="isActivitiesSourceShow">
                <picker
                        :show="isActivitiesSourceShow"
                        :selectData="selectActivitiesData"
                        @confirm="activitiesCheck"
                        @cancel="activitiesCancel"
                ></picker>
            </div>

            <div v-if="isAreaSourceShow">
                <picker
                        :show="isAreaSourceShow"
                        :selectData="selectAreaData"
                        @confirm="areaCheck"
                        @cancel="areaCancel"
                ></picker>
            </div>

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

            <div v-if="isPurchaseTimeSourceShow">
                <picker
                        :show="isPurchaseTimeSourceShow"
                        :selectData="selectPurchaseTimeData"
                        @confirm="purchaseTimeCheck"
                        @cancel="purchaseTimeCancel"
                ></picker>
            </div>
        </div>


        <div class="category-item-fixed">
            <navigation :navigationTitle="title"></navigation>
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
    const wxcPicker = weex.requireModule('picker');
    import util from '../../util/util';

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
        name: "edit-customer-defeat-detail",
        data () {
            return {
                listHeight:"0",
                title:'订车客户详情',
                rightShowStatus:true,
                customerId:"",
                btnStyle:{
                    'top':'10px',
                    'left':'0px',
                    'right':'0px',
                    'bottom':'20px',
                    'width':'750px',
                    'background-color': '#48c9bf',
                },
                tabTitles: [
                    {
                        title: '跟进记录'
                    },
                    {
                        title: '客户详情',
                    },
                    {
                        title: '重复留资记录'
                    }
                ],
                tabStyles: {
                    bgColor: '#F7F7F7',
                    titleColor: '#888888',
                    activeTitleColor: '#48c9bf',
                    activeBgColor: '#F7F7F7',
                    isActiveTitleBold: true,
                    iconWidth: 0,
                    iconHeight: 0,
                    width: 250,
                    height: 88,
                    fontSize: 28,
                    hasActiveBottom: true,
                    activeBottomColor: '#FFC900',
                    activeBottomHeight: 3,
                    activeBottomWidth: 250,
                    textPaddingLeft: 10,
                    textPaddingRight: 10
                },
                contentStyle:'',
                testData1: [
                    // {
                    //     'date': '2017-05-24 21:10:29',
                    //     'desc': '',
                    //     'title': '方案已确认'
                    // },
                    // {
                    //     'date': '2017-05-24 19:54:28',
                    //     'desc': '',
                    //     'title': '方案已更新'
                    // },
                    // {
                    //     'date': '2017-05-24 19:50:21',
                    //     'desc': '您以确定了方案',
                    //     'title': '方案已上传'
                    // },
                    // {
                    //     'date': '2017-05-24 19:49:03',
                    //     'desc': '商家会在2个工作小时内电话或旺旺联系您',
                    //     'title': '商家已接单',
                    //     'highlight': true,
                    // }
                ],
                testData2: [
                    // {
                    //     'date': '2017-05-24 21:10:29',
                    //     'desc': '',
                    //     'title': '方案已确认'
                    // },
                    // {
                    //     'date': '2017-05-24 19:54:28',
                    //     'desc': '',
                    //     'title': '方案已更新'
                    // },
                    // {
                    //     'date': '2017-05-24 19:50:21',
                    //     'desc': '您以确定了方案',
                    //     'title': '方案已上传'
                    // },
                    // {
                    //     'date': '2017-05-24 19:49:03',
                    //     'desc': '商家会在2个工作小时内电话或旺旺联系您',
                    //     'title': '商家已接单',
                    //     'highlight': true,
                    // }
                ],
                intentionInfo:{
                    "level":"H"
                },
                labelTile1:'基本信息',
                labelTile2:'客户详细信息',
                labelTile3:'购车信息',
                cellStyle:{
                    "padding-bottom": '1px',
                    "padding-top": '1px'
                },
                radioStyle:{
                    marginRight: '15px',
                    height: '68px'
                },
                sourceName:"请选择＞",
                isCustomerSourceShow:false,
                selectCustomerData:{
                },
                activitiesName:'请选择＞',
                isActivitiesSourceShow:false,
                selectActivitiesData:{
                },
                intentionLevel:'请选择＞',
                isIntentionLevelShow:false,
                selectIntentionLevelData:{
                },
                intentionId:"",
                intentionValue:"",
                substitutionInfo:[
                    {text:"是",id:1},
                    {text:"否",id:0}
                ],
                substitutionSelected:1,
                substitutionStatus:false,
                areaInfo:"未选择-未选择",
                isAreaSourceShow:false,
                selectAreaData:{
                },
                cityName:"未选择",
                proviceName:"未选择",
                cityId:"",
                proviceId:"",
                extendStatus:true,
                sexInfo:[
                    {text:"男",id:1},
                    {text:"女",id:0}
                ],
                sexSelected:0,
                carSeriesName:"未选择",
                carModelName:"未选择",
                carSeriesId:"",
                carModelId:"",
                isCarModelSourceShow:false,
                selectCarModelData:{

                },
                optionCarSeriesName:"未选择",
                optionCarModelName:"未选择",
                optionCarSeriesId:"",
                optionCarModelId:"",
                isOptionCarModelSourceShow:false,
                selectOptionCarModelData:{

                },
                contrastCarSeriesName:"未选择",
                contrastCarModelName:"未选择",
                contrastCarSeriesId:"",
                contrastCarModelId:"",
                isContrastCarModelSourceShow:false,
                selectContrastCarModelData:{

                },
                purchaseMethod:"请选择＞",
                isPurchaseMethodSourceShow:false,
                selectPurchaseMethodData:{},
                purchaseTime:"请选择＞",
                isPurchaseTimeSourceShow:false,
                selectPurchaseTimeData:{},
                buyDate:"请选择购车时间＞",
                carPurchaseTime:"",
                birthday:"请选择＞",
                params: {
                    'brandId': '',
                    'dealerId': '',
                    'name':'',
                    'phone':'',
                    'age':'',
                    'birthday':'',
                    'sourceCode':'',
                    'sourceName':'',
                    'alternatePhone':'',
                    'wechat':'',
                    'sex':'',
                    'job':'',
                    'provinceId':'',
                    'provice':'',
                    'cityId':'',
                    'city':'',
                    'areaId':'',
                    'address':'',
                    'description':'',
                    'seriesId':'',
                    'seriesName':'',
                    'modelId':'',
                    'modelName':'',
                    'comparisonCar':'',
                    'purchaseType':'',
                    'purchaseTypeDesc':'',
                    'purchaseTime':'',
                    'purchaseTimeDesc':'',
                    'quote':'',
                    'promotions':'',
                    'activity':'',
                    'isDisplace':'',
                    'displaceCar':'',
                    'displaceDate':'',
                    'displaceMileage':'',
                    'lead_from':'',
                    'highChannelId':'',
                    'level':'',
                    'customerId':"",
                    'status':"",
                    'owner':"",
                    'ownerType':"",
                    'ownerPhone':"",
                    'seriesId':"",
                    'modelId':"",
                    'color':"",
                    'orderCarTime':"",
                    'deliveryCarTime':"",
                    'deposit':"",
                    'purchaseType':"",
                    'loanTime':"",
                    'dealPrice':"",
                    'offerPrice':"",
                    'gift':"",
                    'isInsured':"",
                    'engineCode':"",
                    'vinCode':"",
                    'plateNumber':"",
                    'isDecoration':"",
                    'decoration':"",
                    'saleConsultant':"",
                    'createdBy':"",
                    'expand':{},
                },
                creationDate:'',
                createdBy:'',
                planDate:"请选择＞",
                orderCarTime:"请选择＞",
                loanShow:false,
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
                familyMember:"",
            }
        },
        methods:{
            inputSubstitutionCarModel(event) {
                this.params.displaceCar = event.value;
            },
            inputMileage(event) {
                this.params.displaceMileage = event.value;
            },
            inputSparePhone(event) {
                this.params.alternatePhone = event.value;
            },
            inputWechat(event) {
                this.params.wechat = event.value;
            },
            inputJob(event) {
                this.params.job = event.value;
            },
            inputQuote(event) {
                this.params.quote = event.value;
            },
            inputPromotions(event) {
                this.params.promotions = event.value;
            },
            inputDescription(event){
                this.params.description = event.value;
            },
            inputFamilyCount(event) {
                this.familyMember = event.value;
            },
            inputAddress(event) {
                this.params.address = event.value;
            },
            inputActivity(event) {
                this.params.activity = event.value;
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
            changeInsureRadioCallBack(data) {
                this.params.isInsured = data.id;
            },
            changeRefitRadioCallBack(data) {
                this.params.isDecoration = data.id;
            },
            changeSexRadioCallBack(data) {
                this.params.sex = data.id;
            },
            wxcMinibarRightButtonClicked() {
                this.setItem("editCustomerBookingDetailId",this.customerId);
                this.jump("editCustomerBookingDetail");
                //
                // let that = this;
                // let url = "/api/lms-center/customer/"+this.customerId;
                // let obj = this.params;
                // this.PATCH(url,obj,"json",function(resp){
                //     if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined) {
                //         that.jump("home");
                //     }
                // });
            },
            goShop() {
                this.setItem("customerArrivalId",this.customerId);
                this.jump("arrival");
            },
            addRemark(){
                this.setItem("customerRemarkId",this.customerId);
                this.jump("addRemark");
            },
            wxcTabBarCurrentTabSelected(e) {
                const index = e.page;
                console.log(index);
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
            pickDate() {
                let that = this;
                setTimeout(
                    function() {
                        let options = {};
                        wxcPicker.pickDate({
                            value: that.carPurchaseTime,
                        }, event => {
                            if (event.result === 'success') {
                                that.carPurchaseTime = event.data;
                            }
                        })
                    },
                    100
                )
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
            getOrderCarTime(){
                let that = this;
                setTimeout(
                    function() {
                        let options = {};
                        wxcPicker.pickDate({
                            value: that.orderCarTime,
                        }, event => {
                            if (event.result === 'success') {
                                that.orderCarTime = event.data;
                                that.params.orderCarTime = event.data;
                            }
                        })
                    },
                    100
                )
            },
            checkExtendStatus() {
                if (this.extendStatus === true) {
                    this.extendStatus = false;
                } else {
                    this.extendStatus = true;
                }
            },
            changeSexRadioCallBack(data) {
                this.params.sex = data.id;
            },
            customerDetailInit() {
                let url = "/api/lms-center/customer/"+this.customerId;
                let that = this;
                this.GET(url,function(resp){
                    // console.log(resp);
                    if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                        && resp.data.data.id != null && resp.data.data.id != undefined) {

                        that.params.brandId = resp.data.data.brandId;
                        that.params.dealerId = resp.data.data.dealerId;
                        that.params.highChannelId = resp.data.data.highChannelId;

                        // 客户来源
                        that.params.sourceId = resp.data.data.sourceId;
                        that.params.sourceName = resp.data.data.sourceName;
                        if (that.params.sourceName == undefined || that.params.sourceName == null || that.params.sourceName == "") {
                            that.sourceName = "请选择＞";
                        } else {
                            that.sourceName = resp.data.data.sourceName;
                        }

                        // 营销活动
                        that.params.activity = resp.data.data.activity;

                        // 地区
                        that.proviceId = resp.data.data.proviceId;
                        that.cityId = resp.data.data.cityId;
                        that.proviceName = (resp.data.data.provice == "" || resp.data.data.provice == undefined || resp.data.data.provice == null) ?
                            "未选择":resp.data.data.provice;
                        that.cityName = (resp.data.data.city == undefined || resp.data.data.city == null || resp.data.data.city == "")?
                            "未选择":resp.data.data.city;

                        that.params.city = resp.data.data.city;
                        that.params.cityId = resp.data.data.cityId;
                        that.params.provinceId = resp.data.data.provinceId;
                        that.params.provice = resp.data.data.provice;

                        // 备用电话
                        that.params.alternatePhone = resp.data.data.alternatePhone;

                        // 微信账号
                        that.params.wechat = resp.data.data.wechat;

                        // 性别
                        that.params.sex = resp.data.data.sex;
                        if (that.params.sex == 0) {
                            that.sexSelected = 1;
                        } else {
                            that.sexSelected = 0;
                        }

                        // 职业
                        that.params.job = resp.data.data.job;

                        // 意向车型
                        that.carSeriesId = resp.data.data.seriesId;
                        that.carSeriesName = (resp.data.data.seriesName == null || resp.data.data.seriesName == undefined || resp.data.data.seriesName == "") ?
                            "未选择":resp.data.data.seriesName;
                        that.modelId = resp.data.data.modelId;
                        that.carModelName = (resp.data.data.modelName == null || resp.data.data.modelName == undefined || resp.data.data.modelName == "") ?
                            "未选择":resp.data.data.modelName;
                        that.params.modelId = resp.data.data.modelId;
                        that.params.modelName = resp.data.data.modelName;
                        that.params.seriesId = resp.data.data.seriesId;
                        that.params.seriesName = resp.data.data.seriesName;

                        // 购买方式
                        that.purchaseType = resp.data.data.purchaseType;
                        that.purchaseMethod = (resp.data.data.purchaseTypeDesc == "" || resp.data.data.purchaseTypeDesc == undefined || resp.data.data.purchaseTypeDesc == null)
                            ?"请选择＞":resp.data.data.purchaseTypeDesc;
                        that.params.purchaseType = resp.data.data.purchaseType;
                        that.params.purchaseTypeDesc = resp.data.data.purchaseTypeDesc;

                        // 计划购车时间
                        that.params.purchaseTime = resp.data.data.purchaseTime;
                        that.params.purchaseTimeDesc = resp.data.data.purchaseTimeDesc;

                        if (that.params.purchaseTimeDesc != null && that.params.purchaseTimeDesc != undefined && that.params.purchaseTimeDesc != "") {
                            that.purchaseTime = resp.data.data.purchaseTimeDesc;
                        } else {
                            that.purchaseTime = "请选择＞";
                        }

                        // 报价信息
                        that.params.quote = resp.data.data.quote;

                        // 促销信息
                        that.params.promotions = resp.data.data.promotions;

                        // 备注
                        that.params.description = resp.data.data.description;

                        // 详细地址
                        that.params.address = resp.data.data.address;

                        // 生日
                        that.params.birthday = util.formatDateTime(resp.data.data.birthday);
                        if (that.params.birthday != null && that.params.birthday != "" && that.params.birthday != undefined) {
                            that.birthday = that.params.birthday;
                        } else {
                            that.birthday = "请选择＞";
                        }

                        //isDisplace  置换
                        if (resp.data.data.isDisplace == 1) {
                            // 置换
                            that.substitutionSelected = 0;
                            that.substitutionStatus = true;
                            that.params.displaceCar = resp.data.data.displaceCar;

                            that.buyDate = util.formatDateTime(resp.data.data.displaceDate);
                            that.params.displaceDate = util.formatDateTime(resp.data.data.displaceDate);

                            that.params.displaceMileage = resp.data.data.displaceMileage;
                        } else {
                            // 非置换
                            that.substitutionSelected = 1;
                            that.substitutionStatus = false;
                        }

                        if (resp.data.data.expand != null && resp.data.data.expand != undefined && resp.data.data.expand !=  "") {
                            that.expand = resp.data.data.expand;
                            if (resp.data.data.expand['familyMember'] != null && resp.data.data.expand['familyMember'] != undefined && resp.data.data.expand['familyMember'] != "") {
                                that.familyMember = resp.data.data.expand['familyMember'];
                            }
                        }

                        that.params.level = resp.data.data.level;
                        that.params.name = resp.data.data.name;
                        that.params.phone = resp.data.data.phone;

                        // that.creationDate = resp.data.data.creationDate;
                        // that.createdBy = resp.data.data.createdBy;

                        that.creationDate = util.formatDateTimeInfo(resp.data.data.creationDate);

                        if (resp.data.data.createdBy != null && resp.data.data.createdBy != undefined && resp.data.data.createdBy != "") {
                            let url1 = "/api/auth/sys-user/"+resp.data.data.createdBy;
                            that.GET(url1,function(res) {
                                if (res.status == 200) {
                                    if (res.data.data != null && res.data.data != undefined && res.data.data.id != null) {
                                        that.createdBy = res.data.data.userName;
                                    }
                                }
                            });

                        }
                    }
                });


                let url1 = "/api/lms-center/customer-car/getInfoByCustomerId/"+this.customerId;
                this.GET(url1,function(res) {
                    if (res.status == 200 && res.data.data != null && res.data.data != undefined
                        && res.data.data.id != null && res.data.data.id != undefined) {

                        // 颜色
                        that.params.color = res.data.data.color;

                        // 订车时间
                        that.orderCarTime = res.data.data.orderCarTime;
                        that.params.orderCarTime = res.data.data.orderCarTime;

                        // 交车时间
                        that.planDate = res.data.data.deliveryCarTime;
                        that.params.deliveryCarTime = res.data.data.deliveryCarTime;

                        that.params.deposit = res.data.data.deposit;

                        that.params.loanTime = res.data.data.loanTime;

                        that.params.dealPrice = res.data.data.dealPrice;

                        that.params.offerPrice = res.data.data.offerPrice;

                        that.params.gift = res.data.data.gift;

                        that.params.decoration = res.data.data.decoration;

                    }
                })

            },
            editCustomer() {
                this.params.customerId = this.customerId;
                // 订车客户
                this.params.status = 0;
                this.params.owner = this.params.name;
                this.params.ownerPhone = this.params.phone;


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

                if (this.params.deposit == null || this.params.deposit == undefined || this.params.deposit == "" ) {
                    this.showToast('请输入订金金额');
                    return
                }

                if (this.params.deposit <= 0) {
                    this.showToast('请输入正确的订金金额');
                    return
                }

                if (this.params.loanTime <= 0){
                    this.showToast('请输入正确的贷款时间');
                    return
                }

                if (this.params.dealPrice <= 0) {
                    this.showToast('请输入正确的成交价格');
                    return
                }

                if (this.params.offerPrice <= 0) {
                    this.showToast('请输入正确的优惠价格');
                    return
                }


                let that = this;
                let carUrl = "/api/lms-center/customer-car/updateByCustomerId/"+this.customerId;
                let carObj = this.params;

                this.PATCH(carUrl,carObj,"json",function(res){
                    if (res.status == 200 && res.data.data != null && res.data.data != undefined) {
                        // that.jump("home");
                    }
                });

                // 订车客户
                this.params.status = 1;

                if (this.familyMember != "" ) {
                    this.params.expand.familyMember = this.familyMember;
                }

                let url = "/api/lms-center/customer/"+this.customerId;
                let obj = this.params;
                that.PATCH(url,obj,"json",function(resp){
                    if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined) {
                        that.jump("home");
                    }
                });
            },
            customeCheck(selects) {
                // console.log("selects",selects)
                // if (selects['select1'] != null && selects['select1']['id'] != null
                //     && selects['select1']['id'] != undefined) {
                //     this.sourceCode = selects['select1']['id'];
                //     this.sourceName = selects['select1']['value'];
                //     this.params.sourceId = selects['select1']['id'];
                //     this.params.sourceName = selects['select1']['value'];
                //     this.isCustomerSourceShow = false;
                // }
                if (selects['select1'] != null && selects['select1']['id'] != null
                    && selects['select1']['id'] != undefined) {
                    // this.sourceCode = selects['select1']['id'];
                    // this.sourceName = selects['select1']['value'];
                    // this.params.sourceId = selects['select1']['id'];
                    // this.params.sourceName = selects['select1']['value'];
                    this.params.highChannelId = selects['select1']['name'];
                    this.params.lowChannelId = selects['select2']['name'];
                    this.params.sourceId = selects['select1']['name']+"|"+selects['select2']['name'];
                    this.params.sourceName = selects['select1']['text']+"-"+selects['select2']['text'];
                    this.sourceName = selects['select1']['text']+"-"+selects['select2']['text'];
                    this.isCustomerSourceShow = false;
                }
            },
            sourceClick() {
                // let that = this;
                // let url = "/api/auth/dictionary/subs/customerFrom";
                //
                // //获取客户来源从数据字典
                // this.GET(url,function(resp) {
                //     if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                //         && resp.data.data.length > 0) {
                //         that.selectCustomerData = {};
                //         that.selectCustomerData['pData1'] = resp.data.data;
                //         that.selectCustomerData['columns'] = 1;
                //         that.selectCustomerData['link'] = false;
                //         that.isCustomerSourceShow = true;
                //     }
                // });

                let that = this;
                let url = "/api/auth/dictionary/subs/customerFrom";

                //获取客户来源从数据字典
                this.GET(url,function(resp) {
                    let pData1 = [];
                    let pData2 = {};
                    if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                        && resp.data.data.length > 0) {
                        that.selectCustomerData = {};
                        that.selectCustomerData['pData1'] = resp.data.data;

                        if (resp.data.data.length > 0) {
                            for (let i = 0;i<resp.data.data.length;i++) {
                                let url1 = "/api/auth/dictionary/subs/" + resp.data.data[i]['key'];
                                let name = resp.data.data[i]['value'];
                                let id = resp.data.data[i]['id'];
                                let obj = {
                                    "id":resp.data.data[i]['id'],
                                    "name":resp.data.data[i]['key'],
                                    "text":name,
                                    "value":id,
                                };

                                pData1.push(obj);

                                that.GET(url1,function(res){
                                    if (res.status == 200 && res.data.data != null && res.data.data != undefined
                                        && res.data.data.length > 0 ) {
                                        let list = [];
                                        for (let j = 0;j<res.data.data.length;j++) {

                                            let childrenObj = {
                                                "id":res.data.data[j]['id'],
                                                "name":res.data.data[j]['key'],
                                                "text":res.data.data[j]['value'],
                                                "value":res.data.data[j]['value'],
                                            };

                                            list.push(childrenObj);
                                        }
                                        if (list.length > 0) {
                                            pData2[id] = list;
                                        }
                                    }
                                })
                            }
                            setTimeout(function(){
                                that.selectCustomerData = {};
                                that.selectCustomerData['pData1'] = pData1;
                                that.selectCustomerData['pData2'] = pData2;
                                that.selectCustomerData['columns'] = 2;
                                that.selectCustomerData['link'] = true;
                                console.log(that.selectCustomerData);
                                that.isCustomerSourceShow = true;
                            },200)

                        }
                    }
                });
            },
            customeCancel() {
                this.isCustomerSourceShow = false;
            },
            activitiesClick() {
                let that = this;
                let url = "/api/auth/dictionary/subs/activity";

                //获取客户来源从数据字典
                this.GET(url,function(resp) {
                    if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                        && resp.data.data.length > 0) {
                        that.selectActivitiesData = {};
                        that.selectActivitiesData['pData1'] = resp.data.data;
                        that.selectActivitiesData['columns'] = 1;
                        that.selectActivitiesData['link'] = false;
                        that.isActivitiesSourceShow = true;
                    }
                });
            },
            activitiesCheck(selects) {
                // todo 营销活动未存入数据库
                if (selects['select1'] != null && selects['select1']['id'] != null
                    && selects['select1']['id'] != undefined) {
                    this.activitiesCode = selects['select1']['id'];
                    this.activitiesName = selects['select1']['value'];
                    this.isActivitiesSourceShow = false;
                }
            },
            activitiesCancel() {
                this.isActivitiesSourceShow = false;
            },
            intentionLevelClick() {
                let that = this;
                let url = "/api/auth/dictionary/subs/intention";

                //获取客户来源从数据字典
                this.GET(url,function(resp) {
                    if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                        && resp.data.data.length > 0) {
                        that.selectIntentionLevelData = {};
                        that.selectIntentionLevelData['pData1'] = resp.data.data;
                        that.selectIntentionLevelData['columns'] = 1;
                        that.selectIntentionLevelData['link'] = false;
                        that.isIntentionLevelShow = true;
                    }
                });
            },
            intentionLevelCheck(selects) {
                // console.log(selects);
                if (selects['select1'] != null && selects['select1']['id'] != null
                    && selects['select1']['id'] != undefined) {
                    this.intentionId = selects['select1']['id'];
                    this.intentionValue = selects['select1']['key'];
                    this.intentionLevel = selects['select1']['key'];
                    this.params.level = selects['select1']['key'];
                    this.isIntentionLevelShow = false;
                }
            },
            intentionLevelCancel() {
                this.isIntentionLevelShow = false;
            },
            changeRadioCallBack(data) {
                if (data.id == 0) {
                    this.substitutionStatus = false;
                } else {
                    this.substitutionStatus = true;
                }
                // console.log(data);
                this.params.isDisplace = data.id;
            },

            areaClick() {
                let selectAreaData = {};
                let that = this;
                let url = "/api/basicdata/api/region/getTree";
                this.GET(url,function(resp) {
                    if (resp.status == 200 && resp['data'] != null && resp['data'].length > 0) {
                        let data = resp['data'][0]['children'];
                        let pData1 = [];
                        let pData2 = {};
                        // console.log("area",data);
                        if (data != null && data != undefined && data.length > 0) {
                            for (let i=0;i<data.length;i++) {
                                let id = data[i]['id'];
                                let name = data[i]['name'];
                                let text = data[i]['name'];
                                let obj = {
                                    "id":id,
                                    "name":name,
                                    "text":name,
                                    "value":text,
                                };

                                let childrenInfo = data[i]['children'];
                                if (childrenInfo.length > 0) {
                                    let list = [];
                                    for (let j=0;j<childrenInfo.length;j++ ) {
                                        let childrenObj = {
                                            "id":childrenInfo[j]['id'],
                                            "name":childrenInfo[j]['name'],
                                            "text":childrenInfo[j]['name'],
                                            "value":childrenInfo[j]['name'],
                                        };

                                        list.push(childrenObj);
                                    }
                                    if (list.length > 0) {
                                        pData2[name] = list;
                                    }
                                }

                                pData1.push(obj);
                            }

                            selectAreaData['columns'] = 2;
                            selectAreaData['link'] = true;
                            selectAreaData['pData1'] = pData1;
                            selectAreaData['pData2'] = pData2;
                            that.selectAreaData = selectAreaData;
                            console.log("selectAreaData",selectAreaData);
                            that.isAreaSourceShow = true;
                        }
                    }
                });
            },
            areaCheck(selects) {
                if (selects['select1'] != null && selects['select1']['id'] != null
                    && selects['select1']['id'] != undefined && selects['select2'] != null
                    && selects['select2']['id'] != null
                    && selects['select2']['id'] != undefined) {

                    this.proviceId = selects['select1']['id'];
                    this.proviceName = selects['select1']['value'];
                    this.cityId = selects['select2']['id'];
                    this.cityName = selects['select2']['value'];

                    this.params.city = selects['select2']['value'];
                    this.params.cityId = selects['select2']['id'];
                    this.params.provinceId = selects['select1']['id'];
                    this.params.provice = selects['select1']['value'];
                    this.isAreaSourceShow = false;
                }
            },
            areaCancel() {
                this.isAreaSourceShow = false;
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
                }
            },
            purchaseMethodCancel() {
                this.isPurchaseMethodSourceShow = false;
            },
            purchaseTimeClick() {
                let that = this;
                let url = "/api/auth/dictionary/subs/purchaseTime";

                //获取客户来源从数据字典
                this.GET(url,function(resp) {
                    if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                        && resp.data.data.length > 0) {
                        that.selectPurchaseTimeData = {};
                        that.selectPurchaseTimeData['pData1'] = resp.data.data;
                        that.selectPurchaseTimeData['columns'] = 1;
                        that.selectPurchaseTimeData['link'] = false;
                        that.isPurchaseTimeSourceShow = true;
                    }
                });
            },
            purchaseTimeCheck(selects) {
                if (selects['select1'] != null && selects['select1']['id'] != null
                    && selects['select1']['id'] != undefined) {
                    this.purchaseTime = selects['select1']['value'];
                    this.params.purchaseTime = selects['select1']['id'];
                    this.params.purchaseTimeDesc = selects['select1']['value'];
                    this.isPurchaseTimeSourceShow = false;
                }
            },
            purchaseTimeCancel() {
                this.isPurchaseTimeSourceShow = false;
            },
            pickDate() {
                let that = this;
                setTimeout(
                    function() {
                        let options = {};
                        wxcPicker.pickDate({
                            value: that.carPurchaseTime,
                        }, event => {
                            if (event.result === 'success') {
                                that.carPurchaseTime = event.data;
                                that.buyDate = event.data;
                                that.params.displaceDate = event.data;
                            }
                        })
                    },
                    100
                )
            },
            getBirthday() {
                let that = this;
                setTimeout(
                    function() {
                        let options = {};
                        wxcPicker.pickDate({
                            value: that.birthday,
                        }, event => {
                            if (event.result === 'success') {
                                that.birthday = event.data
                                that.params.birthday = event.data
                            }
                        })
                    },
                    100
                )
            },
            optionCarModelClick() {
                this.selectOptionCarModelData = {};
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
                                that.selectOptionCarModelData = modelData;
                                // return;
                                that.isOptionCarModelSourceShow = true;
                            },200);
                        }

                    });
                }
            },
            optionCarModelCheck(selects) {
                if (selects['select1'] != null && selects['select1']['id'] != null
                    && selects['select1']['id'] != undefined && selects['select2'] != null
                    && selects['select2']['id'] != null
                    && selects['select2']['id'] != undefined) {

                    this.optionCarSeriesId = selects['select1']['id'];
                    this.optionCarSeriesName = selects['select1']['name'];
                    this.optionCarModelId = selects['select2']['id'];
                    this.optionCarModelName = selects['select2']['name'];

                    // this.params.modelId = selects['select2']['id'];
                    // this.params.modelName = selects['select2']['name'];
                    // this.params.seriesId = selects['select1']['id'];
                    // this.params.seriesName = selects['select1']['name'];
                }

                this.isOptionCarModelSourceShow = false;
            },
            optionCarModelCancel() {
                this.isOptionCarModelSourceShow = false;
            },
            contrastCarModelClick() {
                this.selectContrastCarModelData = {};
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
                                that.selectContrastCarModelData = modelData;
                                // return;
                                that.isContrastCarModelSourceShow = true;
                            },200);
                        }

                    });
                }
            },
            contrastCarModelCheck(selects) {
                if (selects['select1'] != null && selects['select1']['id'] != null
                    && selects['select1']['id'] != undefined && selects['select2'] != null
                    && selects['select2']['id'] != null
                    && selects['select2']['id'] != undefined) {

                    this.contrastCarSeriesId = selects['select1']['id'];
                    this.contrastCarSeriesName = selects['select1']['name'];
                    this.contrastCarModelId = selects['select2']['id'];
                    this.contrastCarModelName = selects['select2']['name'];

                    this.params.comparisonCar = this.contrastCarSeriesName+"-"+this.contrastCarModelName;

                    // this.params.modelId = selects['select2']['id'];
                    // this.params.modelName = selects['select2']['name'];
                    // this.params.seriesId = selects['select1']['id'];
                    // this.params.seriesName = selects['select1']['name'];
                }

                this.isContrastCarModelSourceShow = false;
            },
            contrastCarModelCancel() {
                this.isContrastCarModelSourceShow = false;
            },
        },
        created(){
            let customerId = this.getItem("customerBookingDetailId");
            this.customerId = customerId;

            //初始化list div高度
            let height = Utils.env.getPageHeight();
            this.listHeight = height - 100;

            this.customerDetailInit();
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
        /*align-items: center;*/
        /*justify-content: center;*/
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
        top: 80px;
        /*left: 0;*/
        /*right: 0;*/
        /*bottom:0;*/
    }
    .customer-item-head-left {
        position: absolute;
        top: 6px;
    }
    .customer-item-head-middle {
        width: 150px;
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
        top:50px;
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
        /*z-index:1;*/
        /*position: absolute;*/
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

    .title-item{
        /*top:10px;*/
    }
    /*.customer-detail{*/
    /*height: 1200px;*/
    /*}*/
    .button-div{
        width: 200px;
        height: 400px;
    }
    .substitution-info {
        height: 0;
        overflow:hidden;
    }
    .show-item {
        top:15px;
    }
</style>