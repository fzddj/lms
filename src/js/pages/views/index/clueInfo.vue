<template>
    <div>
        <div class="condition-row">
            <!--<div class="condition-item one" @click="timeSort()">-->
                <!--<div class="condition-item-text">-->
                    <!--<text class="condition-item-text-value">创建时间</text>-->
                <!--</div>-->
                <!--<div class="condition-item-text-img">-->
                    <!--<text class="iconfont icon-img up">&#xe76d;</text>-->
                    <!--<text class="iconfont icon-img down">&#xe771;</text>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="condition-item two" @click="clueSort()">-->
                <!--<div class="condition-item-text">-->
                    <!--<text class="condition-item-text-value">重复留资</text>-->
                <!--</div>-->
                <!--<div class="condition-item-text-img">-->
                    <!--<text class="iconfont icon-img up">&#xe76d;</text>-->
                    <!--<text class="iconfont icon-img down">&#xe771;</text>-->
                <!--</div>-->
            <!--</div>-->


            <div class="condition-item one" @click="timeSort()">
                <text class="condition-item-text-value">创建时间</text>
                <div class="iconfont-column">
                    <text class="iconfont icon-img up">&#xe76d;</text>
                    <text class="iconfont icon-img down">&#xe771;</text>
                </div>

            </div>
            <div class="condition-item two" @click="clueSort()">
                <text class="condition-item-text-value">重复留资</text>
                <div class="iconfont-column">
                    <text class="iconfont icon-img up">&#xe76d;</text>
                    <text class="iconfont icon-img down">&#xe771;</text>
                </div>
            </div>


            <!--<div class="condition-item three" @click="clueSearch()">-->
                <!--<div class="condition-item-text">-->
                    <!--<text class="condition-item-text-value">筛选</text>-->
                <!--</div>-->
                <!--<div class="condition-item-text-img">-->
                    <!--<text class="iconfont icon-screen-img">&#xe695;</text>-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <div class="clue-count-text">
            <text>共{{clueCount}}条线索</text>
        </div>

        <div class="clue-list-item">
            <list class="list" @loadmore="fetch" loadmoreoffset="10" :style="{height:listHeight+'px'}">
                <cell class="cell" v-for="clueInfo in clueInfoList">
                    <div class="panel" @click="getClueInfoDetail(clueInfo.id)">
                        <text class="panel-text-name">{{clueInfo.name}}</text>
                        <!--<text class="panel-text-sex iconfont">{{clueInfo.sex == 0?"&#xe8af;":"&#xe85b;"}}</text>-->
                        <text :class="['panel-text-sex','iconfont',(clueInfo.sex == 0)?'woman':'man']">{{clueInfo.sex == 0?"&#xe8b1;":"&#xe85b;"}}</text>
                        <text class="panel-text-phone">{{clueInfo.phone}}</text>
                        <div class="panel-repeat">
                            <div v-if="clueInfo.isRepeat == 1">
                                <wxc-tag type="hollow"
                                         tag-color="#F6B52B"
                                         font-color="#F6B52B"
                                         value="重复留资"></wxc-tag>
                            </div>
                        </div>
                        <div class="panel-overdue" v-if="getDayNum(clueInfo.creationDate) > 0">
                            <text class="panel-color-red">逾期{{getDayNum(clueInfo.creationDate)}}天</text>
                        </div>
                        <div class="panel-division"></div>

                        <div class="panel-info">
                            <text class="panel-info-text">创建时间：{{formatDateTimeInfo(clueInfo.creationDate)}}</text>
                            <text class="panel-info-text">来源渠道：{{clueInfo.sourceName}}</text>
                            <text class="panel-info-text">意向车型：{{clueInfo.seriesName}}-{{clueInfo.modelName}}</text>
                        </div>

                        <div class="panel-foot">
                            <div class="panel-foot-item foot-item-one">
                                <text class="panel-foot-item-text-icon iconfont">&#xe725;&nbsp;去电</text>
                            </div>
                            <div class="panel-foot-item foot-item-two" @click="conversion(clueInfo.id)">
                                <text class="panel-foot-item-text">转化</text>
                            </div>
                            <div class="panel-foot-item foot-item-three" @click="defeat(clueInfo.id)">
                                <text class="panel-foot-item-text">战败</text>
                            </div>
                        </div>
                    </div>
                </cell>
                <cell>
                    <text class="clue-over-text">已经没有了</text>
                    <text class="clue-over-division-left"></text>
                    <text class="clue-over-division-right"></text>
                </cell>
            </list>
        </div>
    </div>
</template>

<script>
    const modal = weex.requireModule('modal');
    import { WxcTag,Utils } from 'weex-ui';
    import Bus from '../../util/bus';
    import util from '../../util/util';

    export default {
        components: {
            WxcTag
        },
        name: "clue-info",
        data: () => ({
            listHeight:1000,
            clueCount:0,
            clueInfoList:[
                {
                    "id":1,
                    "name":"haha",
                    "sex":0,
                    "isRepeat":1,
                    "creationDate":"2018-06-06",
                    "sourceName":"test",
                    "seriesName":"test",
                    "modelName":"test",
                    "phone":"130030103013"
                }
            ],
            createSort:false,
            repeatSort:false
        }),
        methods: {
            fetch (event) {
            },
            timeSort() {
                if (this.createSort == true) {
                    this.createSort = false;
                } else {
                    this.createSort = true;
                }
                this.getClueInfo(this.createSort,null);
            },
            clueSort() {
                if (this.repeatSort == true) {
                    this.repeatSort = false;
                } else {
                    this.repeatSort = true;
                }
                this.getClueInfo(null,this.repeatSort);
            },
            clueSearch() {
                modal.toast({ message: '线索筛选按钮', duration: 1 });
            },
            conversion(id) {
                this.setItem('addWillClueId',id);
                this.jump("addWill");
            },
            defeat(id) {
                this.setItem('addDefeatClueId',id);
                this.jump("defeat");
            },
            getClueInfo(createSort = null,repeatSort = null) {
                let that = this;
                let userId = this.getItem("userId");
                let obj = {
                    "userId":userId,
                    "createSort":createSort,
                    "repeatSort":repeatSort
                };
                let url = '/api/lms-center/lead/todayClueList';
                this.POST(url,obj,"json",function(resp) {
                    console.log("返回数据！！！！！！！！！！！！！！！！！！！！！！！！",resp);
                    if (resp.status == 200 ) {
                        if (resp.data.data != undefined && resp.data.data != null && resp.data.data.clueCount != null && resp.data.data.clueCount != undefined) {
                            that.clueCount = resp.data.data.clueCount;
                            that.clueInfoList = resp.data.data.clueInfoList;
                        }
                    } else {
                        that.showToast('数据获取失败，请稍后再试！');
                        return;
                    }
                });
            },
            getPhone(phone) {
                return "tel://"+phone;
            },
            getClueInfoDetail(id) {
                this.setItem('clueInfoDetailId',id);
                this.jump("clueDetail");
            },
            getDayNum(date) {
                return util.timeGapDays(date);
            },
            formatDateTimeInfo(time) {
                return util.formatDateTimeInfo(time);
            }
        },
        created () {
            // 初始化高度
            this.listHeight = Utils.env.getPageHeight() -380;

            // 初始化线索详情信息
            this.getClueInfo();



            // let storage = weex.requireModule('storage');
            // let value = '';
            //
            // storage.setItem("cccc", "aaaaa", event => {
            //
            // });
            //
            // storage.getItem("cccc", event => {
            //     console.log("event--------------------------------",event)
            // });
            //
            //
            // // test
            // this.setItem("haha",2222);
            // let a = this.getItem("haha");
            // console.log("test111111!!!!!!!!!!!!!11",a);
            // this.setItem("hehe",1111);
            // let b = this.getItem("hehe");
            // console.log("test222222!!!!!!!!!!!!!11",b);



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
        top:5px;
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
        flex-direction: row;
    }

    .condition-item{
        /*width: 250px;*/
        /*position: absolute;*/
        align-items: center;
        justify-content: center;
        /*padding-top: 20px;*/
        flex-direction: row;
        /*height: 100px;*/
    }
    .one {
        /*position: absolute;*/
        left: 60px;
    }
    .two {
        /*position: absolute;*/
        left: 400px;
    }
    .three {
        /*position: absolute;*/
        right: 0;
    }

    .condition-item-text {
        position: absolute;
    }
    .condition-item-text-img{
        position: absolute;
        left:210px;
    }
    .iconfont-column{
        flex-direction:column;
        left: 10px;
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
    .clue-count-text{
        top:95px;
        left: 15px;
        height: 80px;
    }

    .clue-list-item{
        top: 65px;
        /*height: 1200px;*/
    }

    .list{
        /*height: 1000px;*/
    }
    .cell {
        background-color: #ffffff;
        height: 300px;
    }
    .panel {
        /*height: 300px;*/
        /*margin-left: 15px;*/
        /*margin-right: 15px;*/
        flex-direction: column;
        margin-bottom: 10px;
        /*justify-content: center;*/
        border-width: 2px;
        border-style: solid;
        border-color: #FFFFFF;
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
    .panel-text-phone{
        top: 10px;
        left: 199px;
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
        left: 400px;
        top: 15px;
        width: 120px;
    }
    .panel-overdue {
        position: absolute;
        left: 600px;
        top: 5px;
        font-size: 20px;
    }
    .panel-color-red {
        color:#E51C23;
    }
    .clue-over-text{
        text-align: center;
        position: absolute;
        width: 750px;
        font-size: 12px;
        color: #B3B8B7;
    }
    .clue-over-division-left{
        top:15px;
        width: 300px;
        border-top-width: 2px;
        border-style: solid;
        border-color: #B3B8B7;
    }
    .clue-over-division-right{
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
        height: 220px;
    }
    .panel-info-text{
        /*width: 700px;*/
        font-size: 29px;
        padding-top: 10px;
        word-wrap:break-word;
    }
    .panel-foot{
        flex-direction:row;
        /*top:80px;*/
        border-top-width: 2px;
        border-style: solid;
        border-color: #F7F7F7;
    }
    .panel-foot-item{
        width: 200px;
        height: 100px;
        text-align: center;
    }
    .panel-foot-item-text{
        top: 17px;
        width: 200px;
        /*position: absolute;*/
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
        /*position: absolute;*/
        height:100px;
        left: 22px;
    }
    .foot-item-two{
        /*position: absolute;*/
        left: 75px;
        color:#3493EB;
    }
    .foot-item-three{
        /*position: absolute;*/
        left: 140px;
        color:#3493EB;
    }
    .panel-foot-item-text-icon{
        /*left: 25px;*/
        /*top: 17px;*/
        color:#3493EB;
    }
</style>
