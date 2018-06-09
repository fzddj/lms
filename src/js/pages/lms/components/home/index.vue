<template>
    <div>
        <list>
            <cell>
                <search :positionListInfo="positionListInfo"></search>
                <div class="category-row">
                    <category title="今日任务" rightTitle="查看更多" @categoryRightTitleClick="categoryRightTitleClick"></category>
                </div>
                <div class="count-item" @appear="onappear"  @disappear="ondisappear">
                    <div class="count-row one">
                        <text class="count-color-text">{{clueCount}}</text>
                        <text class="count-text">线索总计</text>
                    </div>
                    <div class="count-row two">
                        <text class="count-color-text">{{phoneCount}}</text>
                        <text class="count-text">待完成电话</text>
                    </div>
                    <div class="count-row three">
                        <text class="count-color-text">{{chance}}</text>
                        <text class="count-text">电话完成率</text>
                    </div>
                </div>
            </cell>

            <!--<div :class="['category-item-init',this.visibleState == false ? 'category-item-fixed':'',-->
                <!--this.visibleState == true ?'category-item-top':'',-->
                <!--this.visibleState == true ?'category-item':'']" :style="{height:listHeight+'px'}"-->
                 <!--@touchstart="ontouchstart">-->

                <!--&lt;!&ndash;<refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;<text class="indicator-text">Refreshing ...</text>&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;<loading-indicator class="indicator"></loading-indicator>&ndash;&gt;-->
                <!--&lt;!&ndash;</refresh>&ndash;&gt;-->

                <!--&lt;!&ndash;<index-category></index-category>&ndash;&gt;-->
            <!--</div>-->
        </list>
    </div>
</template>

<script>
    //const modal = weex.requireModule('modal');
     import search from '../common/search';
    import category from '../common/category';
    // import indexCategory from './indexCategory';
    import {Utils} from 'weex-ui';

    export default {
        name: "index",
        components: {
            search,
            category
            // indexCategory
        },
        data: () => ({
            clueCount:0,
            phoneCount:0,
            chance:'100%',
            visibleState:true,
            refreshing: false,
            positionListInfo:{x:-2265,y:70},
            listHeight:1000,
        }),
        methods: {
            categoryRightTitleClick() {
                console.log("click","查看更多");
            },
            onappear (event) {
                this.visibleState = true;
                // console.log('可见');
            },
            ondisappear (event) {
                this.visibleState = false;
                // console.log('不可见');
            },
            onrefresh (event) {
                //modal.toast({ message: 'Refreshing', duration: 1 })
                this.refreshing = true
                setTimeout(() => {
                    this.refreshing = false
                }, 2000)
            },
            onpullingdown (event) {

            },
            ontouchstart:function(e) {
                this.visibleState = true;
            },
            clueInit() {
                let that = this;
                let userId = this.$storage.get("userId");
                let obj = {
                    "userId":userId,
                };
                // let url = '/api/lms-center/lead/todayClueInfo';
                // this.POST(url,obj,"json",function(resp) {
                //     if (resp.status == 200 ) {
                //         if (resp.data.data != undefined && resp.data.data != null && resp.data.data.clueCount != null && resp.data.data.clueCount != undefined) {
                //             that.clueCount = resp.data.data.clueCount;
                //             that.phoneCount = resp.data.data.phoneCount;
                //             that.chance = resp.data.data.chance;
                //         }
                //     } else {
                //         that.showToast('数据获取失败，请稍后再试！');
                //         return;
                //     }
                // });
            }
        },
        created () {
            // 页面高度初始化
            this.listHeight = Utils.env.getPageHeight() -300;

            // 初始化数据
            //this.clueInit();
        }
    }
</script>



<style scoped>
    /*.category-row{*/
        /*top: 60px;*/
    /*}*/
    .count-item {
        /*top: 62px;*/
        height: 220px;
        background-color: #FFFFFF;
    }
    .count-row{
        position: absolute;
        width: 250px;
        margin-top: 30px;
        align-items: center;
        justify-content: center;
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
        right: 0;
    }
    .count-color-text {
        font-weight: 600;
        color: #48c9bf;
        font-size: 28px;
    }
    .count-text {
        font-size: 28px;
    }
    .index-hidden{
        height: 0;
    }
    .category-item {
        /*height: 1000px;*/
        /*top: 0;*/
        /*bottom:20px;*/
    }
    .category-item-top {
        /*top: 63px;*/
        bottom:20px;
    }
    .category-item-fixed {
        position:fixed;
    }

</style>
