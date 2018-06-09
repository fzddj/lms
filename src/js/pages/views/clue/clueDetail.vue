<template>
    <div class="clue-info-from">

        <list class="category-item-from" :style="{height:listHeight+'px'}">
            <cell>
                <div>
                    <div class="item-bottom">
                        <category-label :title="labelTile1"></category-label>
                    </div>

                    <div>
                        <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="姓名">
                            <!--<input class="input"-->
                            <!--placeholder="请输入姓名"-->
                            <!--:value="params.name"-->
                            <!--maxlength="50"-->
                            <!--@input="inputName"/>-->
                            <div class="choice-item"><text class="choice-item-text">{{params.name}}</text></div>
                        </wxc-cell>
                        <text class="label-required">*</text>
                    </div>
                    <div>
                        <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="手机号码">
                            <!--<input class="input"-->
                            <!--type="tel"-->
                            <!--placeholder="请输入手机号"-->
                            <!--:value="params.phone"-->
                            <!--maxlength="11"-->
                            <!--@input="inputPhone"/>-->
                            <div class="choice-item"><text class="choice-item-text">{{params.phone}}</text></div>
                        </wxc-cell>
                        <text class="label-required">*</text>
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
                            <!--@changeRadioCallBack="changeRadioCallBack"-->
                            <!--&gt;</input-radio>-->
                            <div class="choice-item"><text class="choice-item-text">{{params.sex == 0 ? "女":"男"}}</text></div>
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
                        <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="购买方式">
                            <!--<div class="choice-item" @click="purchaseMethodClick()"><text class="choice-item-text">{{purchaseMethod}}</text></div>-->
                            <div class="choice-item"><text class="choice-item-text">{{purchaseMethod}}</text></div>
                        </wxc-cell>
                    </div>
                    <div>
                        <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="计划购车时间">
                            <!--<div class="choice-item" @click="purchaseTimeClick()"><text class="choice-item-text">{{purchaseTime}}</text></div>-->
                            <div class="choice-item"><text class="choice-item-text">{{purchaseTime}}</text></div>
                        </wxc-cell>
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

                    <div class="item-bottom bottom-div">
                        <div class="title-item">
                            <wxc-cell :has-bottom-border="false" :cellStyle="cellStyle" title="备注">
                                <!--<div class="choice-item"><text class="choice-item-text">{{params.description}}</text></div>-->
                            </wxc-cell>
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
            <!--<div>-->
                <!--&lt;!&ndash;跟进记录&ndash;&gt;-->
                <!--&lt;!&ndash;重复留资记录&ndash;&gt;-->
                <!--<wxc-tab-page :tab-titles="tabTitles"-->
                        <!--:tab-styles="tabStyles"-->
                        <!--title-type="iconFont"-->
                        <!--tabPageHeight="750"-->
                        <!--@wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">-->
                    <!--&lt;!&ndash; 第一个页面内容&ndash;&gt;-->
                    <!--<div class="item-container">-->
                        <!--<wxc-simple-flow :list="testData1"></wxc-simple-flow>-->
                    <!--</div>-->

                    <!--&lt;!&ndash; 第二个页面内容&ndash;&gt;-->
                    <!--<div class="item-container">-->
                        <!--<wxc-simple-flow :list="testData2"></wxc-simple-flow>-->
                    <!--</div>-->
                <!--</wxc-tab-page>-->
            <!--</div>-->

        </list>



        <div :style="{'margin-top':listHeight+'px'}">
            <div class="w-button button-one">
                <wxc-button :btn-style="btnStyle" @wxcButtonClicked="will()" text="转化"></wxc-button>
            </div>
            <div class="w-button button-two">
                <wxc-button :btn-style="btnStyle" @wxcButtonClicked="defeat()" text="战败"></wxc-button>
            </div>
        </div>


        <div class="show-item" style="margin-top:85px;">
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
            <navigation :navigationTitle="title" :rightShow="rightShowStatus" @wxcMinibarRightButtonClicked="wxcMinibarRightButtonClicked"></navigation>
        </div>
    </div>

</template>

<script>
    let modal = weex.requireModule('modal');
    import {WxcSimpleFlow,WxcTabPage,WxcButton,WxcPopup, WxcCell,Utils } from 'weex-ui';
    import Navigation from "../../components/navigation";
    import CategoryLabel from "../../components/categoryLabel";
    import InputRadio from "../../components/input/inputRadio";
    import Picker from "../../components/picker";
    import tabBar from '../../components/tabBar';
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
            WxcSimpleFlow
        },
        name: "clue-detail",
        data () {
            return {
                listHeight:"0",
                title:'线索详情',
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
                sexInfo:[
                    {text:"男",id:1},
                    {text:"女",id:0}
                ],
                sexSelected:0,
                btnStyle:{
                    'top':'10px',
                    'left':'0px',
                    'right':'0px',
                    'bottom':'20px',
                    'width':'370px',
                    'background-color': '#48c9bf',
                },
                selectedStyle: {
                    color: "#4FB57A",
                },
                extendStatus:true,
                sourceName:"请选择＞",
                isCustomerSourceShow:false,
                selectCustomerData:{
                },
                activitiesName:'请选择＞',
                isActivitiesSourceShow:false,
                selectActivitiesData:{
                },
                areaInfo:"未选择-未选择",
                isAreaSourceShow:false,
                selectAreaData:{
                },
                cityName:"未选择",
                proviceName:"未选择",
                cityId:"",
                proviceId:"",
                carSeriesName:"未选择",
                carModelName:"未选择",
                carSeriesId:"",
                carModelId:"",
                isCarModelSourceShow:false,
                selectCarModelData:{

                },
                purchaseMethod:"请选择＞",
                isPurchaseMethodSourceShow:false,
                selectPurchaseMethodData:{},

                purchaseTime:"请选择＞",
                isPurchaseTimeSourceShow:false,
                selectPurchaseTimeData:{},
                // brand_id	所属品牌
                // dealer_id	经销商Id
                // name	客户名称
                // phone	phone
                // source_code	客户来源Code
                // source_name	客户来源名称
                // alternate_phone	备用电话
                // wechat	微信账号
                // sex	性别
                // job	工作
                // province_id	省份Id
                // provice	省份名称
                // city_id	城市Id
                // city	城市名称
                // area_id	区域Id
                // description	说明
                // series_id	车系Id
                // series_name	车型名称
                // model_id	车型Id
                // model_name	车型名称
                // purchase_type	购买方式
                // purchase_type_desc	购买方式描述
                // purchase_time	拟购时间
                // purchase_time_desc	购买时间描述
                // quote	报价信息
                // promotions	促销内容
                // status	状态
                // leadpre_id	线索预制id
                // lead_from	线索来源方式

                params:{
                    'brandId':'',
                    'dealerId':'',
                    'name':'',
                    'phone':'',
                    'sourceId':'',
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
                    'description':'',
                    'seriesId':'',
                    'seriesName':'',
                    'modelId':'',
                    'modelName':'',
                    'purchaseType':'',
                    'purchaseTypeDesc':'',
                    'purchaseTime':'',
                    'purchaseTimeDesc':'',
                    'quote':'',
                    'promotions':'',
                    'status':'',
                    'leadpreId':'',
                    'leadFrom':''
                },
                tabTitles: [
                    {
                        title: '跟进记录'
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
                    width: 375,
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
                clueId:"",
                rightShowStatus:false,
                creationDate:'',
                createdBy:'',
            }
        },
        methods: {
            showToast (msg) {
                modal.toast({
                    message: msg,
                    duration: 0.3
                })
            },
            changeRadioCallBack(data) {
                this.params.sex = data.id;
            },
            addClue() {
                let that = this;
                if (this.params.name == null || this.params.name == undefined || this.params.name.length < 1) {
                    this.showToast('请输入姓名');
                    return
                }
                if (this.params.phone == null || this.params.phone == undefined || this.params.phone.length < 1) {
                    this.showToast('请输入手机号码');
                    return
                }

                if (this.sourceName == null || this.sourceName == undefined || this.sourceName.length < 1) {
                    this.showToast('请选择客户来源');
                    return
                }

                //正则校验手机号
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
                if (!reg.test(this.params.phone)){
                    this.showToast('请输入正确的手机号码');
                    return
                }

                let obj = this.params;
                let url = '/api/lms-center/lead';
                this.POST(url,obj,"json",function(resp) {
                    if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                        && resp.data.data.id != null && resp.data.data.id != undefined) {
                        console.log("addClue",resp.data.data);
                        that.jump("home");
                    } else {
                        this.showToast('数据添加失败，请稍后再试！');
                        return
                    }
                });
            },
            checkExtendStatus() {
                if (this.extendStatus === true) {
                    this.extendStatus = false;
                } else {
                    this.extendStatus = true;
                }
            },
            inputName(event) {
                this.params.name = event.value;
            },
            inputPhone(event) {
                this.params.phone = event.value;
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
            inputActivity(event) {
                this.params.activity = event.value;
            },
            customeCheck(selects) {
                console.log("selects",selects)
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
            wxcTabBarCurrentTabSelected(e) {
                const index = e.page;
                console.log(index);
            },
            getClueDetailInfo(id) {
                let that = this;
                let url = "/api/lms-center/lead/"+id;
                this.GET(url,function(resp){
                    console.log(resp);
                    if (resp.status == 200) {
                        if (resp.data.data != null && resp.data.data != undefined && resp.data.data.id != null) {
                            //数据初始化  todo 此处待添加 未添加字段
                            that.params.brandId = resp.data.data.brandId;
                            that.params.dealerId = resp.data.data.dealerId;
                            that.params.hignChannelId = resp.data.data.hignChannelId;
                            that.params.createdBy = that.getItem("userId");

                            that.params.name = resp.data.data.name;
                            that.params.phone = resp.data.data.phone;
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
                            that.sexSelectedChange(resp.data.data.sex);
                            // if (that.params.sex == 0) {
                            //     that.sexSelected = 1;
                            // } else {
                            //     that.sexSelected = 0;
                            // }
                            //
                            // console.log(that.sexSelected);

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
                            that.purchaseTime = resp.data.data.purchaseTimeDesc;

                            // 报价信息
                            that.params.quote = resp.data.data.quote;

                            // 促销信息
                            that.params.promotions = resp.data.data.promotions;

                            // 备注
                            that.params.description = resp.data.data.description;

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
                    }
                });
            },
            sexSelectedChange(sex) {
                if (sex == 0) {
                    this.sexSelected = 1;
                } else {
                    this.sexSelected = 0;
                }
            },
            will(){
                this.setItem('addWillClueId',this.clueId);
                this.jump("addWill");
            },
            defeat() {
                this.setItem('addDefeatClueId',this.clueId);
                this.jump("defeat");
            },
            wxcMinibarRightButtonClicked(){
                console.log("edit");
                // todo 编辑线索
                // let that = this;
                // let obj = this.params;
                // let url = "/api/lms-center/lead/"+this.clueId;
                // this.PATCH(url, obj, "json", function(resp){
                //     if (resp.status == 200) {
                //         that.jump("home");
                //     }
                // });
            }
        },
        created () {
            let detailId = this.getItem("clueInfoDetailId");
            this.clueId = detailId;

            this.getClueDetailInfo(detailId);

            //初始化list div高度
            let height = Utils.env.getPageHeight();
            this.listHeight = height - 100;

            if (detailId == null && detailId == undefined && detailId == "") {
                // 初始化品牌ID
                this.params.brandId = this.getItem("brandId");
                // 初始化经销商ID
                this.params.dealerId = (this.getItem("dealerId") == null || this.getItem("dealerId") == undefined
                    || this.getItem("dealerId") == "undefined")?"123456":this.getItem("dealerId");
                // 初始化性别
                this.params.sex = 1;
                // 初始化渠道大类 hign_channel_id
                // this.params.hignChannelId = "1";
                this.params.createdBy = this.getItem("userId");
            }

        },
        mounted() {

        }
    }
</script>

<style scoped>
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
    .iconfont {
        font-family:iconfont;
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
        overflow:hidden;
    }

    .clue-info-from {

    }

    .show-item {
        top: 15px;
    }

    .title-item{
        top:10px;
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
    .bottom-div{
        margin-bottom: 90px;
    }
</style>