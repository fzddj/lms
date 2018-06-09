<template>
    <div>
        <div class="defeat-detail-item">
            <div>
                <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="战败标签">

                </wxc-cell>
                <text class="label-required">*</text>
            </div>
            <div>
                <div class="tag-item-row">
                    <div class="tag-item-tag" v-for="info in tagList">
                        <div class="tag-item-tag-row" v-for="i in info">
                            <div class="tag-item-tag-row-item" @click="tagClick(i.id,i.value)">
                                <tag type="hollow" v-if="tagCheck(i.value) == false"
                                     tag-color="#888888"
                                     font-color="#888888"
                                     :value="i.value"></tag>

                                <tag v-if="tagCheck(i.value) == true"
                                     tag-color="#FF9800"
                                     font-color="#FFFFFF"
                                     :value="i.value"></tag>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="defeat-detail-item-text">
                    <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="战败原因">

                    </wxc-cell>
                    <div class="defeat-detail-item-textarea">
                        <textarea class="textarea"
                            placeholder="请输入战败原因"
                            value=""
                            maxlength="255"
                            rows="8"
                            @input="inputValue">
                        </textarea>
                    </div>

                </div>
            </div>
        </div>

        <div :style="{'margin-top':listHeight+'px'}">
            <wxc-button :btn-style="btnStyle" @wxcButtonClicked="addDefeat()" text="提交"></wxc-button>
        </div>

        <div class="category-item-fixed">
            <navigation :navigationTitle="title" :rightShow="rightShowStatus"></navigation>
        </div>
    </div>
</template>

<script>
    import Tag from "../../components/tag";

    let modal = weex.requireModule('modal');
    import {WxcSimpleFlow,WxcTabPage,WxcButton,WxcPopup,WxcTag, WxcCell,Utils } from 'weex-ui';
    import Navigation from "../../components/navigation";
    import CategoryLabel from "../../components/categoryLabel";
    import InputRadio from "../../components/input/inputRadio";
    import Picker from "../../components/picker";
    import tabBar from '../../components/tabBar';
    import util from '../../util/util';

    export default {
        name: "customer-defeat-detail",
        components: {
            Tag,
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
                title:'申请战败',
                rightShowStatus:false,
                btnStyle:{
                    'top':'10px',
                    'left':'0px',
                    'right':'0px',
                    'bottom':'20px',
                    'width':'750px',
                    'background-color': '#48c9bf',
                },
                cellStyle:{
                    "padding-bottom": '1px',
                    "padding-top": '1px'
                },
                tagList:[
                ],
                tagChecked:[
                ],
                desc:"",
                tagId:"",
                tagName:""
            }
        },
        methods: {
            tagCheck(id) {
                if (this.tagChecked.indexOf(id) > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            tagClick(id,value) {
                this.tagChecked = [];
                this.tagChecked.push(value);
                this.tagId = id;
                this.tagName = value;

                // if (this.tagChecked.indexOf(id) > -1) {
                //     // 存在
                //     let index = this.tagChecked.indexOf(id);
                //     this.tagChecked.splice(index,1);
                // } else {
                //     // 不存在
                //     this.tagChecked.push(id);
                // }
            },
            inputValue(event) {
                this.desc = event.value;
            },
            init() {
                let that = this;
                let url = "/api/auth/dictionary/subs/lms_lost";

                //获取客户来源从数据字典
                this.GET(url,function(resp) {
                    if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                        && resp.data.data.length > 0) {
                        let list = [];
                        for(let i=0;i<resp.data.data.length;i+=4){
                            list.push(resp.data.data.slice(i,i+4));
                        }
                        that.tagList = list;
                    }
                });
            },
            addDefeat() {
                // 申请战败
                if (this.tagId == "" || this.tagId == null || this.tagId == undefined || this.tagName == null || this.tagName == undefined || this.tagName == "") {
                    this.showToast("请选择战败标签");
                    return;
                }

                let url = "/api/lms-center/customer-detail/"+this.customerId;
                let obj = {
                    "lostStatus":1,
                    "lostTime":new Date(),
                    "lostReasonId":this.tagId,
                    "lostReason":this.tagName,
                    "lostReasonDesc":this.desc,

                };
                let that = this;

                // let url1 = "/api/lms-center/customer/"+this.customerId;
                // let obj1 = {
                //     "status":"3"
                // };
                //
                // that.PATCH(url1,obj1,"json",function(res){
                //     if (res.status == 200) {
                //     }
                // });

                this.PATCH(url,obj,"json",function(resp){
                    if (resp.status == 200){

                        // 存数据至flow
                        let flowUrl = "/api/lms-center/customer-flow";
                        let flowObj = {
                            "customerId":that.customerId,
                            "createdName":that.getItem("userName"),
                            // "name":that.params.name,
                            // "level":that.params.level,
                            "flowType":'申请战败',
                            "createdBy":that.getItem("userId")
                        }
                        that.POST(flowUrl,flowObj,"json",function(flowResp){
                            // console.log(flowResp);
                        })


                        that.$router.go(-1);
                    }
                });
            }
        },
        created () {
            //初始化list div高度
            let height = Utils.env.getPageHeight();
            this.listHeight = height - 100;

            this.customerId = this.getItem("customerDefeatDetailId");

            // 初始化数据
            this.init();
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
    }
    .defeat-detail-item {
        position: absolute;
        top: 110px;
        left: 0;
        right: 0;
    }
    .label-required{
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
    .defeat-detail-item-tag{
        width: 100px;
        position: absolute;
    }
    .defeat-detail-item-text{
        /*top: 110px;*/
        margin-top:30px;
    }

    .tag-item-tag-row{
        /*flex: 1;*/
        /*width:180px;*/
        margin-left: 12px;
        margin-right: 12px;
        margin-top: 10px;
    }
    .tag-item-tag{
        flex-direction: row;
    }
    .tag-item-tag-row-item{
        width:160px;
    }
    .tag-item-row {
        width: 750px;
    }
    .defeat-detail-item-textarea{
        margin-left: 10px;
        margin-right: 10px;
    }
</style>