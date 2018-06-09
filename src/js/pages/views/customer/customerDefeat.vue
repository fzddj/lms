<template>
    <div>
        <div class="condition-row">
            <div class="condition-item one" @click="defeatDateClick()">
                <div class="condition-item-text">
                    <text class="condition-item-text-value">战败日期</text>
                </div>
                <div class="condition-item-text-img">
                    <text class="iconfont icon-img up">&#xe76d;</text>
                    <text class="iconfont icon-img down">&#xe771;</text>
                </div>
            </div>

            <!--<div class="condition-item four">-->
                <!--<div class="condition-item-text">-->
                    <!--<text class="condition-item-text-value">筛选</text>-->
                <!--</div>-->
                <!--<div class="condition-item-text-img">-->
                    <!--<text class="iconfont icon-screen-img">&#xe695;</text>-->
                <!--</div>-->
            <!--</div>-->
        </div>

        <div class="count-text">
            <text>共{{infoCount}}个战败客户</text>
        </div>

        <div class="list-item">
            <list class="list" @loadmore="fetch" loadmoreoffset="10" :style="{height:listHeight+'px'}">

                <cell class="cell" v-for="info in infoList">
                    <div class="panel" @click="getInfoDetail(info.customerId)">

                        <text class="panel-text-name">{{info.name}}</text>

                        <text :class="['panel-text-sex','iconfont',(info.sex == 0)?'woman':'man']">{{info.sex == 0?"&#xe8b1;":"&#xe85b;"}}</text>

                        <text class="panel-text-phone">{{info.phone}}</text>

                        <div class="panel-repeat">
                            <div v-if="info.leadRepeat == 1">
                                <wxc-tag type="hollow"
                                         tag-color="#F6B52B"
                                         font-color="#F6B52B"
                                         value="重复留资"></wxc-tag>
                            </div>
                        </div>
                        <div class="panel-division"></div>

                        <div class="panel-info">
                            <text class="panel-info-text">战败日期：{{info.lostTime}}</text>
                            <text class="panel-info-text">战败标签：{{info.lostReason}}</text>
                            <text class="panel-info-text">战败说明：{{info.lostReasonDesc}}</text>
                        </div>

                        <div class="panel-foot">
                            <div class="panel-foot-item">
                                <text class="panel-foot-item-text-icon">
                                    <a :href="getPhone(info.phone)" class="panel-foot-item-phone iconfont">&#xe725;&nbsp;&nbsp;去电</a>
                                </text>
                            </div>
                        </div>

                    </div>
                </cell>
                <cell>
                    <text class="intention-over-text">已经没有了</text>
                    <text class="intention-over-division-left"></text>
                    <text class="intention-over-division-right"></text>
                </cell>

            </list>
        </div>
    </div>
</template>

<script>
    const modal = weex.requireModule('modal');
    import { WxcTag,Utils } from 'weex-ui';

    export default {
        name: "customer-defeat",
        components: {
            WxcTag
        },
        data: () => ({
            infoCount:0,
            infoList:[],
            defeatDateSort:true
        }),
        methods: {
            fetch(event) {
                // modal.toast({ message: 'loadmore', duration: 1 });
                // setTimeout(() => {
                //     const length = this.lists.length;
                //     for (let i = length; i < length + LOADMORE_COUNT; ++i) {
                //         this.lists.push(i + 1)
                //     }
                // }, 800)
            },
            defeatDateClick() {
                if (this.defeatDateSort == true) {
                    this.defeatDateSort = false;
                } else {
                    this.defeatDateSort = true;
                }
                this.getInfoList(this.defeatDateSort);
            },
            getPhone(phone) {
                return "tel://"+phone;
            },
            getInfoDetail(id) {
                this.setItem("customerDefeatInfoId",id);
                this.jump("customerDefeatInfo");
            },
            getInfoList(defeatDateSort = null) {
                let that = this;
                let url = '/api/lms-center/customer/customerList';
                let dealerId = (this.getItem("dealerId") == null || this.getItem("dealerId") == undefined
                    || this.getItem("dealerId") == "undefined")?"123456":this.getItem("dealerId");
                let obj = {
                    "dealerId":dealerId,
                    "status":3,
                    "saleConsultant":this.getItem("userId"),
                    "defeatDateSort":defeatDateSort
                };

                this.POST(url,obj,"json",function(resp){
                    if (resp.status == 200 ) {
                        if (resp.data.data != undefined && resp.data.data != null && resp.data.data.length > 0) {
                            that.infoList = resp.data.data;
                            that.infoCount = resp.data.data.length;
                        }
                    } else {
                        this.showToast('数据获取失败，请稍后再试！');
                        return;
                    }

                });
            }
        },
        created(){
            // 初始化高度
            this.listHeight = Utils.env.getPageHeight() -430;

            this.getInfoList();
        }
    }
</script>

<style scoped>
    .iconfont {
        font-family:iconfont;
    }
    .icon-img {
        height: 35px;
        color: #009688;
    }
    .icon-screen-img{
        top:3px;
        width: 50px;
        right: 45px;
        font-size: 50px;
        color: #009688;
    }
    .condition-row{
        position: absolute;
        width: 750px;
        background-color: #FFFFFF;
        height: 80px;
    }

    .condition-item{
        width: 187.5px;
        position: absolute;
        align-items: center;
        justify-content: center;
        padding-top: 40px;
    }
    .one {
        position: absolute;
        left: 0;
    }
    .two {
        position: absolute;
        left: 187.5px;
    }
    .three {
        width: 220px;
        position: absolute;
        left: 375px;
    }
    .four{
        position: absolute;
        right: 0;
    }

    .condition-item-text {
        position: absolute;
    }
    .condition-item-text-img{
        position: absolute;
        left:160px;
    }
    .condition-item-text-img-three{
        position: absolute;
        left:200px;
    }
    .up {
        top: 8px;
    }
    .down {
        bottom:8px;
    }
    .condition-item-text-value{
        font-size: 28px;
        color: #009688;
    }
    .count-text{
        top:95px;
        left: 15px;
        height: 80px;
    }
    .panel {
        height: 300px;
        /*margin-left: 15px;*/
        /*margin-right: 15px;*/
        flex-direction: column;
        margin-top: 10px;
        margin-bottom: 10px;
        /*justify-content: center;*/
        border-width: 2px;
        border-style: solid;
        border-color: #FFFFFF;
        background-color: #FFFFFF;
    }
    .panel-text-item {
        background-color: #E51C23;
        top:5px;
        left: 24px;
        width: 40px;
        height: 40px;
        position: absolute;
    }
    .panel-text-item-text{
        top:3px;
        left:7px;
        color: #ffffff;
    }

    .panel-text-item-a {
        background-color: #F6B52B;
        top:5px;
        left: 24px;
        width: 40px;
        height: 40px;
        position: absolute;
    }
    .panel-text-item-text-a{
        top:3px;
        left:7px;
        color: #ffffff;
    }

    .panel-text-item-b {
        background-color: #C1C364;
        top:5px;
        left: 24px;
        width: 40px;
        height: 40px;
        position: absolute;
    }
    .panel-text-item-text-b{
        top:3px;
        left:7px;
        color: #ffffff;
    }

    .panel-text-item-c {
        background-color: #51A850;
        top:5px;
        left: 24px;
        width: 40px;
        height: 40px;
        position: absolute;
    }
    .panel-text-item-text-c {
        top:3px;
        left:7px;
        color: #ffffff;
    }

    .panel-text-name {
        top:5px;
        left: 24px;
        font-size: 30px;
        font-weight: 600;
        /*text-align: center;*/
        color: #41B883;
        position: absolute;
    }
    .panel-text-phone{
        top: 10px;
        left: 249px;
        font-size: 28px;
        position: absolute;
    }
    .panel-division{
        top:50px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: #B3B8B7;
    }
    .panel-repeat{
        position: absolute;
        left: 600px;
        top: 15px;
        width: 120px;
    }
    .intention-over-text{
        text-align: center;
        position: absolute;
        width: 750px;
        font-size: 12px;
        color: #B3B8B7;
    }
    .intention-over-division-left{
        top:15px;
        width: 300px;
        border-top-width: 2px;
        border-style: solid;
        border-color: #B3B8B7;
    }
    .intention-over-division-right{
        top:15px;
        width: 300px;
        left: 450px;
        border-top-width: 2px;
        border-style: solid;
        border-color: #B3B8B7;
    }
    .panel-info{
        left: 22px;
        top: 60px;
    }
    .panel-info-text{
        /*width: 700px;*/
        font-size: 29px;
        padding-top: 10px;
        word-wrap:break-word;
    }
    .panel-info-text-b {
        font-size: 29px;
        padding-top: 10px;
        word-wrap:break-word;
        font-weight: 600;
    }
    .panel-foot{
        top:80px;
        border-top-width: 2px;
        border-style: solid;
        border-color: #F7F7F7;
    }
    .panel-foot-item{
        /*width: 200px;*/
        text-align: center;
    }
    .panel-foot-item-text{
        top: 17px;
        width: 200px;
        position: absolute;
        color:#3493EB;
        text-align: center;
        font-size: 29px;
    }
    .panel-foot-item-text-one{
        /*top: 10px;*/
        /*position: absolute;*/
        left: 32px;
        color:#3493EB;
        font-size: 29px;
        /*text-align: center;*/
    }
    .foot-item-one{
        position: absolute;
        left: 22px;
    }
    .foot-item-two{
        position: absolute;
        left: 250px;
        color:#3493EB;
    }
    .foot-item-three{
        position: absolute;
        left: 500px;
        color:#3493EB;
    }
    .panel-foot-item-text-icon{
        left: 25px;
        top: 17px;
        color:#3493EB;
    }
    .panel-foot-item-phone {
        width: 700px;
        text-align: center;
        color:#3493EB;
    }
    .list-item {
        top: 65px;
    }
    .panel-text-sex {
        top:10px;
        left: 150px;
        font-size: 30px;
        font-weight: 600;
        /*text-align: center;*/
        position: absolute;
        width: 40px;
    }
    .woman{
        margin-left: 10px;
        color: #FF4081;
    }
    .man{
        margin-left: 10px;
        color: #0076FF;
    }
</style>