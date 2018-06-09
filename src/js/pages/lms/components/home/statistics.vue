<template>
    <div class="statistics-form">
        <list :style="{height:listHeight+'px'}">
            <div class="statistics-row-height">
                <div class="statistics-row-item-header">
                    <div class="statistics-row-item-header-text">
                        <text class="iconfont statistics-row-item-header-text-img">&#xe782;</text>
                    </div>
                    <div class="statistics-row-item-header-text-info">
                        <text class="font-weight">{{clueCount}}</text>
                        <text class="font-weight">当前线索量</text>
                    </div>

                </div>

                <div class="statistics-row-item-header row-right">
                    <div class="statistics-row-item-header-text">
                        <text class="iconfont statistics-row-item-header-text-img">&#xe782;</text>
                    </div>
                    <div class="statistics-row-item-header-text-info">
                        <text class="font-weight">{{customerCount}}</text>
                        <text class="font-weight">意向客户数</text>
                    </div>

                </div>
            </div>


            <div class="statistics-row">
                <div class="category-row">
                    <category title="本月销售概况" :rightShow="rightShow"></category>
                </div>
                <div class="statistics-row-circle">
                    <div class="statistics-row-item">
                        <div class="statistics-row-item-circle background-color">
                            <text class="statistics-row-item-circle-text">{{monthClueCount}}</text>
                        </div>
                        <div class="statistics-row-item-text-info">
                            <text class="statistics-row-item-text">新建线索</text>
                        </div>
                    </div>

                    <div class="statistics-row-item">
                        <div class="statistics-row-item-circle background-color">
                            <text class="statistics-row-item-circle-text">{{monthClueCount}}</text>
                        </div>
                        <div class="statistics-row-item-text-info">
                            <text class="statistics-row-item-text">新建意向客户</text>
                        </div>
                    </div>

                    <div class="statistics-row-item">
                        <div class="statistics-row-item-circle background-color">
                            <text class="statistics-row-item-circle-text">{{monthClueCount}}</text>
                        </div>
                        <div class="statistics-row-item-text-info">
                            <text class="statistics-row-item-text">新建订车</text>
                        </div>
                    </div>

                    <div class="statistics-row-item">
                        <div class="statistics-row-item-circle background-color">
                            <text class="statistics-row-item-circle-text">{{monthClueCount}}</text>
                        </div>
                        <div class="statistics-row-item-text-info">
                            <text class="statistics-row-item-text">新增交车</text>
                        </div>
                    </div>
                </div>

                <div class="statistics-row-circle">
                    <div class="statistics-row-item">
                        <div class="statistics-row-item-circle background-color-other">
                            <text class="statistics-row-item-circle-text">{{monthClueCount}}</text>
                        </div>
                        <div class="statistics-row-item-text-info">
                            <text class="statistics-row-item-text">到店</text>
                        </div>
                    </div>

                    <div class="statistics-row-item">
                        <div class="statistics-row-item-circle background-color-other">
                            <text class="statistics-row-item-circle-text">{{monthClueCount}}</text>
                        </div>
                        <div class="statistics-row-item-text-info">
                            <text class="statistics-row-item-text">试驾</text>
                        </div>
                    </div>

                    <div class="statistics-row-item">
                        <div class="statistics-row-item-circle background-color">
                            <text class="statistics-row-item-circle-text">{{monthClueCount}}</text>
                        </div>
                        <div class="statistics-row-item-text-info">
                            <text class="statistics-row-item-text">电话完成率</text>
                        </div>
                    </div>

                    <div class="statistics-row-item">
                        <div class="statistics-row-item-circle background-color">
                            <text class="statistics-row-item-circle-text">{{monthClueCount}}</text>
                        </div>
                        <div class="statistics-row-item-text-info">
                            <text class="statistics-row-item-text">成交率</text>
                        </div>
                    </div>

                </div>
            </div>

            <div class="statistics-row">
                <div class="category-row">
                    <category title="本日概况" :rightShow="rightShow"></category>
                </div>


                <div class="statistics-row-circle">
                    <div class="statistics-row-item">
                        <div class="statistics-row-item-circle background-color">
                            <text class="statistics-row-item-circle-text">{{monthClueCount}}</text>
                        </div>
                        <div class="statistics-row-item-text-info">
                            <text class="statistics-row-item-text">新建线索</text>
                        </div>
                    </div>

                    <div class="statistics-row-item">
                        <div class="statistics-row-item-circle background-color">
                            <text class="statistics-row-item-circle-text">{{monthClueCount}}</text>
                        </div>
                        <div class="statistics-row-item-text-info">
                            <text class="statistics-row-item-text">新建意向客户</text>
                        </div>
                    </div>

                    <div class="statistics-row-item">
                        <div class="statistics-row-item-circle background-color-other">
                            <text class="statistics-row-item-circle-text">{{monthClueCount}}</text>
                        </div>
                        <div class="statistics-row-item-text-info">
                            <text class="statistics-row-item-text">商谈数</text>
                        </div>
                    </div>

                    <div class="statistics-row-item">
                        <div class="statistics-row-item-circle background-color">
                            <text class="statistics-row-item-circle-text">{{monthClueCount}}</text>
                        </div>
                        <div class="statistics-row-item-text-info">
                            <text class="statistics-row-item-text">电话完成率</text>
                        </div>
                    </div>
                </div>

                <div class="statistics-row-circle">
                    <div class="statistics-row-item">
                        <div class="statistics-row-item-circle background-color-other">
                            <text class="statistics-row-item-circle-text">{{monthClueCount}}</text>
                        </div>
                        <div class="statistics-row-item-text-info">
                            <text class="statistics-row-item-text">到店</text>
                        </div>
                    </div>

                    <div class="statistics-row-item">
                        <div class="statistics-row-item-circle background-color-other">
                            <text class="statistics-row-item-circle-text">{{monthClueCount}}</text>
                        </div>
                        <div class="statistics-row-item-text-info">
                            <text class="statistics-row-item-text">试驾</text>
                        </div>
                    </div>

                </div>
            </div>

            <div class="statistics-row">
                <div class="category-row">
                    <category title="通知" :rightShow="rightShow"></category>
                </div>

                <div class="statistics-row-notice">
                    <div class="statistics-row-notice-left">
                        <div class="statistics-row-notice-info">
                            <text class="iconfont statistics-row-item-header-text-img statistics-img-top">&#xe7ef;</text>
                        </div>
                        <div class="statistics-row-notice-info-text">
                            <text>待办</text>
                        </div>
                    </div>

                    <div class="statistics-row-notice-right">
                        <div class="statistics-row-notice-info">
                            <text class="iconfont statistics-row-item-header-text-img statistics-img-top">&#xe76f;</text>
                        </div>
                        <div class="statistics-row-notice-info-text">
                            <text>消息中心</text>
                        </div>
                    </div>
                </div>
            </div>


        </list>
    </div>
</template>

<script>
    let modal = weex.requireModule('modal');
    import {Utils } from 'weex-ui';
    import Search from "../../components/search";
    import category from '../../components/category';

    export default {
        components: {
            Search,
            category
        },
        name: "statistics",
        props: {
        },
        data: () => ({
            positionListInfo:{x:-765,y:70},
            rightShow:false,
            clueCount:0,
            customerCount:0,
            monthClueCount:0,
        }),
        created () {
            //初始化list div高度
            let height = Utils.env.getPageHeight();
            this.listHeight = height - 120;
        }
    }
</script>

<style scoped>
    .iconfont {
        font-family:iconfont;
    }
    .statistics-form{
        background-color: #ffffff;

    }
    .statistics-row-height{
        top: 20px;
        height: 110px;
    }
    .statistics-row-item-header{
        width:300px;
        position: absolute;
    }

    .row-right{
        left: 325px;
    }

    .statistics-row-circle{
        flex-direction: row;
    }

    .statistics-row-item-header-text{
        position: absolute;
        top: 20px;
    }

    .statistics-row-item-header-text-img{
        left: 24px;
        font-size: 70px;
    }
    .statistics-img-top {
        left: 40px;
        top: 30px;
    }
    .statistics-row-item-header-text-info{
        position: absolute;
        top: 20px;
        left: 120px;
    }
    .font-weight {
        font-weight: 600;
    }
    .statistics-row-item-circle{
        width:150px;
        height:150px;
        border-radius:150px;
    }
    .statistics-row-item-circle-text{
        top:60px;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #ffffff;
    }
    .statistics-row-item{
        padding-left: 17px;
        padding-right:17px;
        padding-top:17px;
        padding-bottom:17px;
    }
    .statistics-row-item-text-info{
        width:150px;
    }
    .statistics-row-item-text{
        top:10px;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 25px;
    }
    .background-color{
        background-color: #7A8C65;
    }
    .background-color-other {
        background-color: #E1B26D;
    }
    .statistics-row-notice{
        height: 200px;
    }
    .statistics-row-notice-left{
        position: absolute;
        width: 375px;
    }
    .statistics-row-notice-right{
        position: absolute;
        width: 375px;
        left: 375px;
    }
    .statistics-row-notice-info{
        left:110px;
        height: 150px;
        width: 150px;
        border-top-style: solid;
        border-top-width: 1px;
        border-top-color: #e6e6e6;
        border-left-style: solid;
        border-left-width: 1px;
        border-left-color: #e6e6e6;
        border-right-style: solid;
        border-right-width: 1px;
        border-right-color: #e6e6e6;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-bottom-color: #e6e6e6;
    }
    .statistics-row-notice-info-text{
        left:110px;
        width: 150px;
        font-size: 25px;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
</style>