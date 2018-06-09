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

            <div class="condition-item two" @click="levelSortClick()">
                <div class="condition-item-text">
                    <text class="condition-item-text-value">意向等级</text>
                </div>
                <div class="condition-item-text-img">
                    <text class="iconfont icon-img up">&#xe76d;</text>
                    <text class="iconfont icon-img down">&#xe771;</text>
                </div>
            </div>

            <div class="condition-item three" @click="createSortClick()">
                <div class="condition-item-text">
                    <text class="condition-item-text-value">创建时间</text>
                </div>
                <div class="condition-item-text-img">
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
        <div class="intention-count-text">
            <text>共{{intentionCount}}个意向客户</text>
        </div>

        <div class="intention-list-item">
            <list class="list" @loadmore="fetch" loadmoreoffset="10" :style="{height:listHeight+'px'}">

                <cell class="cell" v-for="intentionInfo in intentionInfoList">
                    <div class="panel" @click="getIntentionInfoDetail(intentionInfo.customerId)">

                        <div :class="[getIntentionLevel(intentionInfo.level)]">
                            <text :class="[getIntentionLevelText(intentionInfo.level)]">{{intentionInfo.level}}</text>
                        </div>

                        <text class="panel-text-name">{{intentionInfo.name}}</text>

                        <text :class="['panel-text-sex','iconfont',(intentionInfo.sex == 0)?'woman':'man']">{{intentionInfo.sex == 0?"&#xe8b1;":"&#xe85b;"}}</text>

                        <text class="panel-text-phone">{{intentionInfo.phone}}</text>

                        <div class="panel-repeat">
                            <div v-if="intentionInfo.leadRepeat == 1">
                                <wxc-tag type="hollow"
                                         tag-color="#F6B52B"
                                         font-color="#F6B52B"
                                         value="重复留资"></wxc-tag>
                            </div>
                        </div>
                        <div class="panel-division"></div>

                        <div class="panel-info">
                            <text class="panel-info-text">意向车型：{{intentionInfo.seriesName}}-{{intentionInfo.modelName}}</text>
                            <text class="panel-info-text">创建时间：{{formatDateTimeInfo(intentionInfo.creationDate)}}</text>
                            <text class="panel-info-text">来源渠道：{{intentionInfo.sourceName}}</text>
                            <text class="panel-info-text">最近联系：{{intentionInfo.preTime != "" && intentionInfo.preTime != null && intentionInfo.preTime != undefined ?formatDateTimeInfo(intentionInfo.preTime):""}}</text>
                            <text class="panel-info-text">下次联系：{{intentionInfo.nextDate != "" && intentionInfo.nextDate != null && intentionInfo.nextDate != undefined?formatDateTimeInfo(intentionInfo.nextDate):""}}</text>
                            <text class="panel-info-text-b">最近商谈记录：{{intentionInfo.preDesc}}</text>
                        </div>

                        <div class="panel-foot">
                            <div class="panel-foot-item">
                                <text class="panel-foot-item-text-icon">
                                    <a :href="getPhone(intentionInfo.phone)" class="panel-foot-item-phone iconfont">&#xe725;&nbsp;&nbsp;去电</a>
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
    import util from '../../util/util';
    export default {
        name: "intention",
        components: {
            WxcTag
        },
        data: () => ({
            visibleState:true,
            intentionCount:0,
            intentionInfoList:[],
            sort:true,
            levelSort:true,
            createSort:true
        }),
        created () {
            // 初始化高度
            this.listHeight = Utils.env.getPageHeight() -430;
            // 获取意向客户
            this.getIntentionInfoDetailList(null,null,null);
        },
        methods: {
            getPhone(phone) {
                return "tel://"+phone;
            },
            fetch (event) {
                // modal.toast({ message: 'loadmore', duration: 1 });
                // setTimeout(() => {
                //     const length = this.lists.length;
                //     for (let i = length; i < length + LOADMORE_COUNT; ++i) {
                //         this.lists.push(i + 1)
                //     }
                // }, 800)
            },
            sortClick() {
                if (this.sort == true) {
                    this.sort = false;
                } else {
                    this.sort = true;
                }
                this.getIntentionInfoDetailList(this.sort,null,null);
            },
            levelSortClick() {
                if (this.levelSort == true) {
                    this.levelSort = false;
                } else {
                    this.levelSort = true;
                }
                this.getIntentionInfoDetailList(null,this.levelSort,null);
            },
            createSortClick() {
                if (this.createSort == true) {
                    this.createSort = false;
                } else {
                    this.createSort = true;
                }

                this.getIntentionInfoDetailList(null,null,this.createSort);
            },
            getIntentionInfoDetail(id) {
                this.setItem("customerDetailId",id);
                this.jump("customerDetail")
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
            getIntentionInfoDetailList(sort = null,levelSort = null,createSort = null) {
                let that = this;
                let url = '/api/lms-center/customer/customerList';
                let dealerId = (this.getItem("dealerId") == null || this.getItem("dealerId") == undefined
                    || this.getItem("dealerId") == "undefined")?"123456":this.getItem("dealerId");
                let obj = {
                    "dealerId":dealerId,
                    "status":0,
                    "saleConsultant":this.getItem("userId"),
                    "sort":sort,
                    "levelSort":levelSort,
                    "createSort":createSort
                };

                this.POST(url,obj,"json",function(resp){
                    if (resp.status == 200 ) {
                        if (resp.data.data != undefined && resp.data.data != null && resp.data.data.length > 0) {
                            that.intentionInfoList = resp.data.data;
                            that.intentionCount = resp.data.data.length;
                        }
                    } else {
                        this.showToast('数据获取失败，请稍后再试！');
                        return;
                    }

                });
            },
            formatDateTimeInfo(time) {
                return util.formatDateTimeInfo(time);
            }
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
        left: 250px;
    }
    .three {
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
    .intention-count-text{
        top:95px;
        left: 15px;
        height: 80px;
    }

    .intention-list-item{
        top: 65px;
        /*height: 1200px;*/
    }

    .list{
        /*height: 1000px;*/
    }
    .panel {
        height: 450px;
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
    .panel-text-sex {
        top:10px;
        left: 220px;
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
        left: 104px;
        font-size: 30px;
        font-weight: 600;
        /*text-align: center;*/
        color: #41B883;
        position: absolute;
    }
    .panel-text-phone{
        top: 10px;
        left: 279px;
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
</style>