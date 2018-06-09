<template>
    <div>
        <list class="category-item-from" :style="{height:listHeight+'px'}">
            <cell>
                <scroller class="scroller">
                    <wxc-radio :list="list" @wxcRadioListChecked="wxcRadioListChecked"></wxc-radio>
                </scroller>
            </cell>
        </list>

        <!--<div :style="{'margin-top':listHeight+'px'}">-->
            <wxc-button :btn-style="btnStyle" @wxcButtonClicked="defeat()">提交</wxc-button>
        <!--</div>-->

        <div class="category-item-fixed">
            <navigation :navigationTitle="title"></navigation>
        </div>
    </div>
</template>

<script>
    let modal = weex.requireModule('modal');
    import { WxcButton,WxcPopup, WxcCell, WxcRadio,Utils } from 'weex-ui';
    import Navigation from "../../components/navigation";
    import util from "../../util/util";

    export default {
        components: {
            Navigation,
            WxcButton,
            WxcRadio
        },
        created () {
            this.clueId = this.getItem('addDefeatClueId');

            // 初始化list div高度
            let height = Utils.env.getPageHeight();
            this.listHeight = height - 100;

            // 战败数据初始化
            this.getDefeatInfo();

        },
        name: "defeat",
        data () {
            return {
                title:'战败',
                btnStyle:{
                    'top':'10px',
                    'left':'0px',
                    'right':'0px',
                    'bottom':'20px',
                    'width':'750px',
                    'background-color': '#48c9bf',
                },
                listHeight:1000,
                list: [],
                clueId:"",
                checkId:"",
                checkName:""
            }
        },
        methods: {
            defeat() {
                // let time = util.getNowFormatDate();
                // console.log("time",time);
                // return;
                let that = this;
                if (this.checkId == "" || this.checkName == "") {
                    this.showToast('请选择战败原因');
                    return
                }
                let obj = {
                    // lostTime:"'"+util.getNowFormatDate()+"'",
                    lostTime:new Date(),
                    lostReasonId:this.checkId,
                    lostReason:this.checkName,
                    status:"3"
                };
                let url = "/api/lms-center/lead-detail/"+this.clueId;
                this.PATCH(url, obj, "json", function(resp){
                    // console.log(resp);
                    if (resp.status == 200) {
                        that.jump("home");
                    }
                });
            },
            wxcRadioListChecked (e) {
                console.log(e);
                this.checkId = e.value;
                this.checkName = e.title;
            },
            getDefeatInfo() {
                let that = this;
                let url = "/api/auth/dictionary/subs/lms_lost";

                //获取客户来源从数据字典
                this.GET(url,function(resp) {
                    if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                        && resp.data.data.length > 0) {
                        that.list = [];
                        for (let i=0;i<resp.data.data.length;i++) {
                            let obj = {};
                            obj['title'] = resp.data.data[i]["value"];
                            obj['value'] = resp.data.data[i]["id"];
                            that.list.push(obj);
                        }
                    }
                });
            },
            showToast (msg) {
                modal.toast({
                    message: msg,
                    duration: 0.3
                })
            },
        }
    }
</script>

<style scoped>
    .category-item-fixed {
        position:fixed;
        flex: 1;
        /*z-index:1;*/
        /*position: absolute;*/
    }
    .scroller {
        top:90px;
    }
</style>