<template>
    <div>

        <div :style="{'margin-top':listHeight+'px'}">
            <div class="w-button button-one">
                <wxc-button :btn-style="btnStyle" @wxcButtonClicked="addRemark()" text="添加备注"></wxc-button>
            </div>
            <div class="w-button button-two">
                <wxc-button :btn-style="btnStyle" @wxcButtonClicked="goShop()" text="添加到店"></wxc-button>
            </div>
        </div>

        <div class="customer-detail-from">
            <div class="customer-item-head">
                <div class="customer-item-head-left">
                    <div :class="[getIntentionLevel(params.level)]">
                        <text :class="[getIntentionLevelText(params.level)]">{{params.level}}</text>
                    </div>
                </div>
                <div class="customer-item-head-middle">
                    <div><text>{{params.name}}</text></div>
                    <div class="customer-tag-from">
                        <div class="customer-item-head-tag" v-for="tag in tagList">
                            <wxc-tag type="hollow"
                                     tag-color="#F6B52B"
                                     font-color="#F6B52B"
                                     :value="tag"></wxc-tag>
                        </div>
                    </div>
                </div>
                <div class="customer-item-head-right">
                    <div><text>{{creationDate}}</text></div>
                </div>
            </div>

            <div class="customer-item-info">
                <div class="customer-item-info-one">
                    <text class="customer-item-info-text iconfont">&#xe6f2;</text>
                    <text class="customer-item-info-value">{{params.phone}}</text>
                </div>
                <div class="customer-item-info-two">
                    <text class="customer-item-info-text iconfont">&#xe74f;</text>
                    <text class="customer-item-info-value">{{carSeriesName+"-"+carModelName}}</text>
                </div>
                <div class="customer-item-info-three">
                    <text class="customer-item-info-text iconfont">&#xe9e1;</text>
                    <text class="customer-item-info-value">{{sourceName}}</text>
                </div>
            </div>

            <div class="tab-page">
                <!--跟进记录-->
                <!--重复留资记录-->
                <wxc-tab-page :tab-titles="tabTitles"
                              :tab-styles="tabStyles"
                              title-type="iconFont"
                              tabPageHeight="870"
                              @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
                    <!-- 第一个页面内容-->
                    <div class="item-container">
                        <wxc-simple-flow :list="testData1"></wxc-simple-flow>
                    </div>

                    <!-- 第二个页面内容  客户详情-->
                    <div class="item-container">
                        <list class="customer-detail">
                            <div>
                                <div class="item-bottom">
                                    <category-label :title="labelTile1"></category-label>
                                </div>

                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="客户来源">
                                        <!--<div class="choice-item" @click="sourceClick()"><text class="choice-item-text">{{sourceName}}</text></div>-->
                                        <div class="choice-item"><text class="choice-item-text">{{sourceName}}</text></div>
                                    </wxc-cell>
                                    <text class="label-required">*</text>
                                </div>
                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="营销活动">
                                        <!--<input class="input"-->
                                               <!--placeholder="请输入营销活动"-->
                                               <!--:value="params.activity"-->
                                               <!--maxlength="64"-->
                                               <!--@input="inputActivity"/>-->
                                        <div class="choice-item"><text class="choice-item-text">{{params.activity}}</text></div>
                                    </wxc-cell>
                                </div>

                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="地区">
                                        <!--<div class="choice-item" @click="areaClick()"><text class="choice-item-text">{{proviceName+"-"+cityName}}</text></div>-->
                                        <div class="choice-item"><text class="choice-item-text">{{proviceName+"-"+cityName}}</text></div>
                                    </wxc-cell>
                                </div>

                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="详细地址">
                                        <!--<input class="input"-->
                                               <!--placeholder="请输入详细地址"-->
                                               <!--:value="params.address"-->
                                               <!--maxlength="50"-->
                                               <!--@input="inputAddress"/>-->
                                        <div class="choice-item"><text class="choice-item-text">{{params.address}}</text></div>
                                    </wxc-cell>
                                </div>
                            </div>

                            <div :class="[extendStatus == true?'extend-info':'']">
                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="创建时间">
                                        <div class="choice-item"><text class="choice-item-text">{{creationDate}}</text></div>
                                    </wxc-cell>
                                </div>

                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="创建人">
                                        <div class="choice-item"><text class="choice-item-text">{{createdBy}}</text></div>
                                    </wxc-cell>
                                </div>

                            </div>

                            <div :class="[extendStatus == true?'extend-info':'']">
                                <div class="item-bottom">
                                    <category-label :title="labelTile2"></category-label>
                                </div>

                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="备用电话">
                                        <!--<input class="input"-->
                                               <!--placeholder="请输入备用电话"-->
                                               <!--:value="params.alternatePhone"-->
                                               <!--maxlength="20"-->
                                               <!--@input="inputSparePhone"/>-->
                                        <div class="choice-item"><text class="choice-item-text">{{params.alternatePhone}}</text></div>
                                    </wxc-cell>
                                </div>

                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="微信账号">
                                        <!--<input class="input"-->
                                               <!--placeholder="请输入微信账号"-->
                                               <!--:value="params.wechat"-->
                                               <!--maxlength="50"-->
                                               <!--@input="inputWechat"/>-->
                                        <div class="choice-item"><text class="choice-item-text">{{params.wechat}}</text></div>
                                    </wxc-cell>
                                </div>

                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="性别">
                                        <!--<input-radio-->
                                                <!--:items="sexInfo"-->
                                                <!--:selected="sexSelected"-->
                                                <!--:radioStyle="radioStyle"-->
                                                <!--@changeRadioCallBack="changeSexRadioCallBack"-->
                                        <!--&gt;</input-radio>-->
                                        <div class="choice-item"><text class="choice-item-text">{{params.sex == 0 ? "女":"男"}}</text></div>
                                    </wxc-cell>
                                </div>

                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="生日">
                                        <!--<div class="choice-item" @click="getBirthday()"><text class="choice-item-text">{{birthday}}</text></div>-->
                                        <div class="choice-item"><text class="choice-item-text">{{birthday}}</text></div>
                                    </wxc-cell>
                                </div>

                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="职业">
                                        <!--<input class="input"-->
                                               <!--placeholder="请输入职业"-->
                                               <!--:value="params.job"-->
                                               <!--maxlength="50"-->
                                               <!--@input="inputJob"/>-->
                                        <div class="choice-item"><text class="choice-item-text">{{params.job}}</text></div>
                                    </wxc-cell>
                                </div>

                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="家庭成员">
                                        <!--<input class="input"-->
                                               <!--placeholder=""-->
                                               <!--value=""-->
                                               <!--maxlength="2"-->
                                               <!--@input="inputFamilyCount"/>-->
                                        <div class="choice-item"><text class="choice-item-text">{{familyMember}}人</text></div>
                                        <!--<text class="input-item-text">人</text>-->
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
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="意向车型">
                                        <!--<div class="choice-item" @click="carModelClick()"><text class="choice-item-text">{{carSeriesName+"-"+carModelName}}</text></div>-->
                                        <div class="choice-item"><text class="choice-item-text">{{carSeriesName+"-"+carModelName}}</text></div>
                                    </wxc-cell>
                                </div>
                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="备选车型">
                                        <!--<div class="choice-item" @click="optionCarModelClick()"><text class="choice-item-text">{{optionCarSeriesName+"-"+optionCarModelName}}</text></div>-->
                                        <div class="choice-item"><text class="choice-item-text">{{optionCarSeriesName+"-"+optionCarModelName}}</text></div>
                                    </wxc-cell>
                                </div>
                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="对比车型">
                                        <!--<div class="choice-item" @click="contrastCarModelClick()"><text class="choice-item-text">{{contrastCarSeriesName+"-"+contrastCarModelName}}</text></div>-->
                                        <div class="choice-item"><text class="choice-item-text">{{contrastCarSeriesName+"-"+contrastCarModelName}}</text></div>
                                    </wxc-cell>
                                </div>
                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="购买方式">
                                        <!--<div class="choice-item" @click="purchaseMethodClick()"><text class="choice-item-text">{{purchaseMethod}}</text></div>-->
                                        <div class="choice-item"><text class="choice-item-text">{{purchaseMethod}}</text></div>
                                    </wxc-cell>
                                </div>


                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="计划购车时间">
                                        <!--<div class="choice-item" @click="purchaseTimeClick()"><text class="choice-item-text">{{purchaseTime}}</text></div>-->
                                        <!--<div class="choice-item" v-on:click.prevent="purchaseTimeClick()"><text class="choice-item-text">{{purchaseTime}}</text></div>-->
                                        <div class="choice-item"><text class="choice-item-text">{{purchaseTime}}</text></div>
                                    </wxc-cell>
                                </div>

                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="是否置换">
                                        <!--<input-radio-->
                                                <!--:items="substitutionInfo"-->
                                                <!--:selected="substitutionSelected"-->
                                                <!--:radioStyle="radioStyle"-->
                                                <!--@changeRadioCallBack="changeRadioCallBack"-->
                                        <!--&gt;</input-radio>-->
                                        <div class="choice-item"><text class="choice-item-text">{{params.isDisplace == 0 ? "不置换":"置换"}}</text></div>
                                    </wxc-cell>
                                </div>

                                <div :class="[substitutionStatus == false?'substitution-info':'']">
                                    <div>
                                        <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="置换车型">
                                            <!--<input class="input"-->
                                                   <!--placeholder="请输入置换车型"-->
                                                   <!--:value="params.displaceCar"-->
                                                   <!--maxlength="50"-->
                                                   <!--@input="inputSubstitutionCarModel"/>-->
                                            <div class="choice-item"><text class="choice-item-text">{{params.displaceCar}}</text></div>
                                        </wxc-cell>
                                    </div>

                                    <div>
                                        <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="购车日期">
                                            <!--<div class="choice-item" @click="pickDate()"><text class="choice-item-text">{{buyDate}}</text></div>-->
                                            <div class="choice-item"><text class="choice-item-text">{{buyDate}}</text></div>
                                        </wxc-cell>
                                    </div>

                                    <div>
                                        <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="行驶里程">
                                            <!--<input class="input"-->
                                                   <!--placeholder="请输入里程"-->
                                                   <!--:value="params.displaceMileage"-->
                                                   <!--maxlength="19"-->
                                                   <!--@input="inputMileage"/>-->
                                            <!--<text class="input-item-text">KM(公里)</text>-->
                                            <div class="choice-item"><text class="choice-item-text">{{params.displaceMileage}}KM(公里)</text></div>
                                        </wxc-cell>
                                    </div>
                                </div>

                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="报价信息">
                                        <!--<input class="input"-->
                                               <!--placeholder="请输入报价信息"-->
                                               <!--:value="params.quote"-->
                                               <!--maxlength="36"-->
                                               <!--@input="inputQuote"/>-->
                                        <div class="choice-item"><text class="choice-item-text">{{params.quote}}</text></div>
                                    </wxc-cell>
                                </div>

                                <div>
                                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="促销信息">
                                        <!--<input class="input"-->
                                               <!--placeholder="请输入促销信息"-->
                                               <!--:value="params.promotions"-->
                                               <!--maxlength="36"-->
                                               <!--@input="inputPromotions"/>-->
                                        <div class="choice-item"><text class="choice-item-text">{{params.promotions}}</text></div>
                                    </wxc-cell>
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

                            <div class="button-div">

                            </div>
                        </list>
                    </div>

                    <!-- 第三个页面内容-->
                    <div class="item-container">
                        <wxc-simple-flow :list="testData2"></wxc-simple-flow>
                    </div>
                </wxc-tab-page>
            </div>
        </div>


        <div class="category-item-fixed">
            <navigation :navigationTitle="title" :rightShow="rightShowStatus" @wxcMinibarRightButtonClicked="wxcMinibarRightButtonClicked"></navigation>
        </div>



        <div class="show-item" style="margin-top:100px;">
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
    import Bus from '../../util/bus';

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
        name: "customer-detail",
        data () {
            return {
                listHeight:"0",
                title:'意向客户详情',
                rightShowStatus:true,
                customerId:"",
                btnStyle:{
                    'top':'10px',
                    'left':'0px',
                    'right':'0px',
                    'bottom':'20px',
                    'width':'370px',
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
                    'status':'',
                    'lead_from':'',
                    'highChannelId':'',
                    'level':'',
                },
                creationDate:'',
                createdBy:'',
                familyMember:"",
                tagList:[],
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
                this.familyCount = event.value;
            },
            inputAddress(event) {
                this.params.address = event.value;
            },
            inputActivity(event) {
                this.params.activity = event.value;
            },
            changeSexRadioCallBack(data) {
                this.params.sex = data.id;
            },
            wxcMinibarRightButtonClicked() {
                this.setItem("editCustomerDetailId",this.customerId);
                this.jump("editCustomerDetail");
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

                        //

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
                        if (resp.data.data.birthday != null && resp.data.data.birthday != "" && resp.data.data.birthday != undefined) {
                            that.params.birthday = util.formatDateTime(resp.data.data.birthday);
                            that.birthday = that.params.birthday;
                        } else {
                            that.birthday = "";
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


                        //expand
                        // 备用
                        // let spareModel = {};
                        // spareModel['id'] = this.optionCarSeriesId+"|"+this.optionCarModelId;
                        // spareModel['name'] = this.optionCarSeriesName+"-"+this.optionCarModelName;
                        // expand['spareModel'] = spareModel;
                        //
                        // // 对比
                        // let contrastiveModel = {};
                        // contrastiveModel['id'] = this.contrastCarSeriesId+"|"+this.contrastCarModelId;
                        // contrastiveModel['name'] = this.contrastCarSeriesName+"-"+this.contrastCarModelName;
                        // expand['contrastiveModel'] = contrastiveModel;

                        //{"spareModel": {"id": "2dcdb3e7-26a8-49d8-92bb-8ad2ae4ac727|8083be36-cdea-4661-8e9a-8c6ebc0e9c4d", "name": "x80-x80-1"}, "familyMember": "20", "contrastiveModel": {"id": "4bc51ae7-f02e-4c34-bb0d-5a2b61d5df98|2269674b-da87-41c8-b3ef-d7756438f598", "name": "X70-X70 畅行版-MT"}}
                        if (resp.data.data.expand != null && resp.data.data.expand != undefined && resp.data.data.expand !=  "") {
                            if (resp.data.data.expand['familyMember'] != null && resp.data.data.expand['familyMember'] != undefined && resp.data.data.expand['familyMember'] != "") {
                                that.familyMember = resp.data.data.expand['familyMember'];
                            }

                            if (resp.data.data.expand['spareModel'] != null && resp.data.data.expand['spareModel'] != undefined && resp.data.data.expand['spareModel'] != "") {
                                // if (resp.data.data.expand['spareModel']['id'] != null && resp.data.data.expand['spareModel']['id'] != undefined && resp.data.data.expand['spareModel']['id'] != "") {
                                //
                                // }
                                if (resp.data.data.expand['spareModel']['name'] != null && resp.data.data.expand['spareModel']['name'] != undefined && resp.data.data.expand['spareModel']['name'] != "") {
                                    // that.optionCarSeriesName+"-"+that.optionCarModelName;
                                    let spareModelInfo = resp.data.data.expand['spareModel']['name'].split("-");
                                    that.optionCarSeriesName = spareModelInfo[0];
                                    that.optionCarModelName = spareModelInfo[1];
                                }
                            }

                            if (resp.data.data.expand['contrastiveModel'] != null && resp.data.data.expand['contrastiveModel'] != undefined && resp.data.data.expand['contrastiveModel'] != "") {
                                // if (resp.data.data.expand['contrastiveModel']['id'] != null && resp.data.data.expand['contrastiveModel']['id'] != undefined && resp.data.data.expand['contrastiveModel']['id'] != "") {
                                //
                                // }
                                if (resp.data.data.expand['contrastiveModel']['name'] != null && resp.data.data.expand['contrastiveModel']['name'] != undefined && resp.data.data.expand['contrastiveModel']['name'] != "") {
                                    let contrastiveModel = resp.data.data.expand['contrastiveModel']['name'].split("-");
                                    that.contrastCarSeriesName = contrastiveModel[0];
                                    that.contrastCarModelName = contrastiveModel[1];
                                }
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

                let url2 = "/api/lms-center/customer-detail/"+this.customerId;
                that.GET(url2,function(re){

                    if (re.status == 200 && re.data.data != null && re.data.data != undefined
                        && re.data.data.id != null && re.data.data.id != undefined) {
                        if (re.data.data.tag != null && re.data.data.tag != undefined && re.data.data.tag != "") {
                            that.tagList = re.data.data.tag.split("|");
                        } else {
                            that.tagList = [];
                        }
                    }
                });

                //testData1
                let url3 = "/api/lms-center/customer-flow/getInfoByCustomerId/"+this.customerId;
                this.GET(url3,function(response){
                    let testData1 = [];
                    if (response.status == 200 && response.data.data != null && response.data.data != undefined) {
                        if (response.data.data.length > 0) {
                            for (let i = 0;i<response.data.data.length;i++ ) {
                                let info = {};
                                let da = response.data.data[i];
                                info['title'] = da['creationDate'] +"    操作人:"+da['createdName'];
                                info['desc'] = da['flowType'] == null || da['flowType'] == undefined || da['flowType'] == ""?"":da['flowType'];
                                info['date'] = da['flowDescription'] == null || da['flowDescription'] == undefined || da['flowDescription'] == ""?"":da['flowDescription'];
                                testData1.push(info);
                            }

                            that.testData1 = testData1;
                        }
                    }
                });

            },
            customeCheck(selects) {
                if (selects['select1'] != null && selects['select1']['id'] != null
                    && selects['select1']['id'] != undefined) {
                    this.sourceCode = selects['select1']['id'];
                    this.sourceName = selects['select1']['value'];
                    this.params.sourceId = selects['select1']['id'];
                    this.params.sourceName = selects['select1']['value'];
                    this.isCustomerSourceShow = false;
                }
            },
            sourceClick() {
                let that = this;
                let url = "/api/auth/dictionary/subs/customerFrom";

                //获取客户来源从数据字典
                this.GET(url,function(resp) {
                    if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                        && resp.data.data.length > 0) {
                        that.selectCustomerData = {};
                        that.selectCustomerData['pData1'] = resp.data.data;
                        that.selectCustomerData['columns'] = 1;
                        that.selectCustomerData['link'] = false;
                        that.isCustomerSourceShow = true;
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
            let customerId = this.getItem("customerDetailId");
            this.customerId = customerId;

            //初始化list div高度
            let height = Utils.env.getPageHeight();
            this.listHeight = height - 99;

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
        width: 150px;
        position: absolute;
        left: 130px;
    }
    .customer-item-head-right {
        position: absolute;
        left: 420px;
        top:6px;
    }
    .customer-tag-from{
        flex-direction: row;
    }
    .customer-item-head-tag {
        /*position: absolute;*/
        flex: 1;
        top:10px;
        width: 100px;
        padding-left: 10px;
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
    .customer-detail{
        height: 1200px;
    }
    .button-div{
        width: 200px;
        height: 400px;
    }

    .substitution-info {
        height: 0;
        overflow:hidden;
    }
</style>