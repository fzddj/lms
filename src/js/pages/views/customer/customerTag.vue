<template>
    <div>
        <div class="tag-item">
            <div class="tag-item-title">
                <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="购车需求">
                </wxc-cell>
            </div>

            <div class="tag-item-row">
                <div class="tag-item-tag" v-for="info in tagOneList">
                    <div class="tag-item-tag-row" v-for="i in info">
                        <div class="tag-item-tag-row-item" @click="tagClick(i.value)">
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

            <div class="tag-item-title">
                <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="关注指标">
                </wxc-cell>
            </div>

            <div class="tag-item-row">
                <div class="tag-item-tag" v-for="info in tagTwoList">
                    <div class="tag-item-tag-row" v-for="i in info">
                        <div class="tag-item-tag-row-item" @click="tagClick(i.value)">
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

            <div class="tag-item-title">
                <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="议价">
                </wxc-cell>
            </div>

            <div class="tag-item-row">
                <div class="tag-item-tag" v-for="info in tagThreeList">
                    <div class="tag-item-tag-row" v-for="i in info">
                        <div class="tag-item-tag-row-item" @click="tagClick(i.value)">
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

        </div>
        <div class="category-item-fixed">
            <navigation :navigationTitle="title" :rightShow="rightShowStatus" @wxcMinibarRightButtonClicked="wxcMinibarRightButtonClicked" rightValue="确定"></navigation>
        </div>
    </div>
</template>

<script>
    import Tag from "../../components/tag";

    let modal = weex.requireModule('modal');
    import {WxcSimpleFlow,WxcTabPage,WxcButton,WxcPopup,WxcTag, WxcCell,Utils } from 'weex-ui';
    import Navigation from "../../components/navigation";
    import CategoryLabel from "../../components/categoryLabel";
    import weexVueRouter from 'weex-vue-router'

    export default {
        name: "customer-tag",
        components: {
            Tag,
            CategoryLabel,
            Navigation,
            WxcCell,
            WxcButton,
            WxcPopup,
            WxcTabPage,
            WxcSimpleFlow,
            WxcTag
        },
        created () {
            this.customerId = this.getItem("customerTagId");
            this.initPurchase();
            this.initQuota();
            this.initBargaining();
            this.initCheck();
        },
        methods:{
            wxcMinibarRightButtonClicked() {
                console.log(this.tagChecked);
                let tag = this.tagChecked.join("|");
                let that = this;
                let url = "/api/lms-center/customer-detail/" + this.customerId;
                let obj = {
                    "tag":tag
                };
                this.PATCH(url,obj,"json",function(resp){
                    // console.log(resp);
                    // that.$router.replace("addRemark");
                    if (resp.status == 200) {
                        that.$router.go(-1);
                    }
                });
            },
            tagCheck(id) {
                if (this.tagChecked.indexOf(id) > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            tagClick(id) {
                if (this.tagChecked.indexOf(id) > -1) {
                    // 存在
                    let index = this.tagChecked.indexOf(id);
                    this.tagChecked.splice(index,1);
                } else {
                    // 不存在
                    this.tagChecked.push(id);
                }
            },
            initPurchase() {
                let that = this;
                let url = "/api/auth/dictionary/subs/purchaseDemand";

                this.GET(url,function(resp) {
                    if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                        && resp.data.data.length > 0) {
                        let list = [];
                        for(let i=0;i<resp.data.data.length;i+=4){
                            list.push(resp.data.data.slice(i,i+4));
                        }
                        that.tagOneList = list;
                    }
                });
            },
            initQuota(){
                let that = this;
                let url = "/api/auth/dictionary/subs/quota";

                this.GET(url,function(resp) {
                    if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                        && resp.data.data.length > 0) {
                        let list = [];
                        for(let i=0;i<resp.data.data.length;i+=4){
                            list.push(resp.data.data.slice(i,i+4));
                        }
                        that.tagTwoList = list;
                    }
                });
            },
            initBargaining(){
                let that = this;
                let url = "/api/auth/dictionary/subs/bargaining";

                this.GET(url,function(resp) {
                    if (resp.status == 200 && resp.data.data != null && resp.data.data != undefined
                        && resp.data.data.length > 0) {
                        let list = [];
                        for(let i=0;i<resp.data.data.length;i+=4){
                            list.push(resp.data.data.slice(i,i+4));
                        }
                        that.tagThreeList = list;
                    }
                });
            },
            initCheck() {
                let that = this;
                let url1 = "/api/lms-center/customer-detail/"+this.customerId;
                that.GET(url1,function(res){

                    if (res.status == 200 && res.data.data != null && res.data.data != undefined
                        && res.data.data.id != null && res.data.data.id != undefined) {
                        if (res.data.data.tag != null && res.data.data.tag != undefined && res.data.data.tag != "") {
                            that.tagChecked = res.data.data.tag.split("|");
                        } else {
                            that.tagChecked = [];
                        }
                    }
                });
            }
        },
        data () {
            return {
                title:"选择商谈标签",
                rightShowStatus:true,
                cellStyle:{
                    "padding-bottom": '5px',
                    "padding-top": '5px'
                },
                tagOneList:[
                ],
                tagTwoList:[
                ],
                tagThreeList:[
                ],
                tagChecked:[
                ],
                customerId:"",
            }
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
    .tag-item{
        top: 100px;
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
        /*top: 15px;*/
        /*left: 24px;*/
        /*right:24px;*/
        /*justify-content:flex-start;*/
    }
    .tag-item-title {
        margin-top: 20px;
    }
</style>