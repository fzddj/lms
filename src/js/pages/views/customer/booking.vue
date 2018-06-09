<template>
    <div>
        <div class="condition-row">

            <div class="condition-item one" @click="sortClick()">
                <div class="condition-item-text">
                    <text class="condition-item-text-value">默认排序</text>
                </div>
                <div class="condition-item-text-img">
                    <text class="iconfont icon-img up">&#xe76d;</text>
                    <text class="iconfont icon-img down">&#xe771;</text>
                </div>
            </div>

            <div class="condition-item two" @click="bookingSortClick()">
                <div class="condition-item-text">
                    <text class="condition-item-text-value">订车日期</text>
                </div>
                <div class="condition-item-text-img">
                    <text class="iconfont icon-img up">&#xe76d;</text>
                    <text class="iconfont icon-img down">&#xe771;</text>
                </div>
            </div>

            <div class="condition-item three" @click="getCarSortClick()">
                <div class="condition-item-text">
                    <text class="condition-item-text-value">预计交车时间</text>
                </div>
                <div class="condition-item-text-img-three">
                    <text class="iconfont icon-img up">&#xe76d;</text>
                    <text class="iconfont icon-img down">&#xe771;</text>
                </div>
            </div>

            <!--<div class="condition-item four">-->
                <!--&lt;!&ndash;@click="sort()"&ndash;&gt;-->
                <!--<div class="condition-item-text">-->
                    <!--<text class="condition-item-text-value">筛选</text>-->
                <!--</div>-->
                <!--<div class="condition-item-text-img">-->
                    <!--<text class="iconfont icon-screen-img">&#xe695;</text>-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <div class="booking-count-text">
            <text>共{{bookingCount}}个订车客户</text>
        </div>

        <div class="booking-list-item">
            <list class="list" @loadmore="fetch" loadmoreoffset="10" :style="{height:listHeight+'px'}">

                <cell class="cell" v-for="bookingInfo in bookingInfoList">
                    <div class="panel" @click="getBookingInfoDetail(bookingInfo.customerId)">

                        <text class="panel-text-name">{{bookingInfo.name}}</text>

                        <text :class="['panel-text-sex','iconfont',(bookingInfo.sex == 0)?'woman':'man']">{{bookingInfo.sex == 0?"&#xe8b1;":"&#xe85b;"}}</text>

                        <text class="panel-text-phone">{{bookingInfo.phone}}</text>

                        <div class="panel-repeat">
                            <div v-if="bookingInfo.leadRepeat == 1">
                                <wxc-tag type="hollow"
                                         tag-color="#F6B52B"
                                         font-color="#F6B52B"
                                         value="重复留资"></wxc-tag>
                            </div>
                        </div>
                        <div class="panel-division"></div>

                        <div class="panel-info">
                            <text class="panel-info-text">预定车型：{{bookingInfo.seriesName}}-{{bookingInfo.modelName}}</text>
                            <text class="panel-info-text">定金金额：{{bookingInfo.deposit}}</text>
                            <text class="panel-info-text">订车日期：{{bookingInfo.orderCarTime}}</text>
                            <text class="panel-info-text">预计交车：{{bookingInfo.deliveryCarTime}}</text>
                        </div>

                        <div class="panel-foot">
                            <div class="panel-foot-item">
                                <text class="panel-foot-item-text-icon">
                                    <a :href="getPhone(bookingInfo.phone)" class="panel-foot-item-phone iconfont">&#xe725;&nbsp;&nbsp;去电</a>
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
        name: "booking",
        components: {
            WxcTag
        },
        data: () => ({
            bookingCount:0,
            bookingInfoList:[],
            bookingSort:true,
            sort:true,
            getCarSort:true,
        }),
        methods: {
            fetch (event) {
                // modal.toast({ message: 'loadmore', duration: 1 });
                // setTimeout(() => {
                //     const length = this.lists.length;
                //     for (let i = length; i < length + LOADMORE_COUNT; ++i) {
                //         this.lists.push(i + 1)
                //     }
                // }, 800)
            },
            getBookingInfoDetailList(sort = null,bookingSort = null,getCarSort = null) {
                let that = this;
                let url = '/api/lms-center/customer-car/customerCarList';
                let dealerId = (this.getItem("dealerId") == null || this.getItem("dealerId") == undefined
                    || this.getItem("dealerId") == "undefined")?"123456":this.getItem("dealerId");
                let obj = {
                    "dealerId":dealerId,
                    "status":0,
                    "saleConsultant":this.getItem("userId"),
                    "createSort":sort,
                    "bookingSort":bookingSort,
                    "getCarSort":getCarSort
                };

                this.POST(url,obj,"json",function(resp){
                    if (resp.status == 200 ) {
                        if (resp.data.data != undefined && resp.data.data != null && resp.data.data.length > 0) {
                            that.bookingInfoList = resp.data.data;
                            that.bookingCount = resp.data.data.length;
                        }
                    } else {
                        this.showToast('数据获取失败，请稍后再试！');
                        return;
                    }

                });
            },
            bookingSortClick() {
                if (this.bookingSort == true) {
                    this.bookingSort = false;
                } else {
                    this.bookingSort = true;
                }
                this.getBookingInfoDetailList(null,this.bookingSort,null);
            },
            sortClick() {
                if (this.sort == true) {
                    this.sort = false;
                } else {
                    this.sort = true;
                }
                this.getBookingInfoDetailList(this.sort,null,null);
            },
            getCarSortClick(){
                if (this.getCarSort == true) {
                    this.getCarSort = false;
                } else {
                    this.getCarSort = true;
                }
                this.getBookingInfoDetailList(null,null,this.getCarSort);
            },
            getPhone(phone) {
                return "tel://"+phone;
            },
            getBookingInfoDetail(id) {
                this.setItem("customerBookingDetailId",id);
                this.jump("customerBookingDetail")
            }
        },
        created () {
            // 初始化高度
            this.listHeight = Utils.env.getPageHeight() -430;
            // 获取意向客户
            this.getBookingInfoDetailList(null,null,null);
        },
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
        left: 250px;
    }
    .three {
        width: 220px;
        position: absolute;
        left: 500px;
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
    .booking-count-text{
        top:95px;
        left: 15px;
        height: 80px;
    }
    .panel {
        height: 350px;
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
    .booking-list-item {
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