<template>
    <wxc-tab-bar :tab-titles="tabTitles"
    :tab-styles="tabStyles"
    title-type="iconFont"
    @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <!-- 第一个页面内容-->
    <div class="item-container" :style="contentStyle"><index></index></div>

    <!-- 第二个页面内容-->
    <div class="item-container" :style="contentStyle"><index></index></div>

    <!-- 第三个页面内容-->
    <div class="item-container" :style="contentStyle"><index></index></div>

    <!-- 第四个页面内容-->
    <div class="item-container" :style="contentStyle"><index></index></div>
    </wxc-tab-bar>

    <!--<tabBar :tab-titles="tabTitles"-->
            <!--:tab-styles="tabStyles"-->
            <!--title-type="iconFont"-->
            <!--@wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">-->
        <!--<div class="item-container" :style="contentStyle">1</div>-->
        <!--<div class="item-container" :style="contentStyle">2</div>-->
        <!--<div class="item-container" :style="contentStyle">3</div>-->
        <!--<div class="item-container" :style="contentStyle">4</div>-->
    <!--</tabBar>-->
</template>

<script>
    import { WxcTabBar, Utils } from 'weex-ui';
    import index from './components/home/index.vue';


    // import index from '../index/index.vue';
    // import customer from '../customer/customer.vue';
    // import statistics from '../statistics/statistics.vue';
    // import my from '../my/my.vue';
    // import tabBar from '../../components/tabBar';
    // import Bus from '../../util/bus';
    // import util from '../../util/util';

    export default {
        name: "home",
        data () {
            return {
                tabTitles: [
                    {
                        title: '首页',
                        titleType: 'iconFont',
                        codePoint: '\ue64f'
                    },
                    {
                        title: '客户',
                        codePoint: '\ue658'
                    },
                    {
                        title: '统计',
                        codePoint: '\ue66e',
                        // badge: 5
                    },
                    {
                        title: '我的',
                        codePoint: '\ue659',
                        // dot: true
                    }
                ],
                tabStyles: {
                    bgColor: '#FFFFFF',
                    titleColor: '#3D3D3D',
                    activeTitleColor: '#009688',
                    activeBgColor: '#FFFFFF',
                    isActiveTitleBold: true,
                    width: 160,
                    height: 120,
                    fontSize: 24,
                    textPaddingLeft: 10,
                    textPaddingRight: 10,
                    iconFontSize: 50,
                    iconFontMarginBottom: 8,
                    iconFontColor: '#3D3D3D',
                    activeIconFontColor: '#009688',
                    iconFontUrl: '//at.alicdn.com/t/font_657474_0ubi4h83gt8uayvi.ttf'
                },
                pageNum:0
            }
        },
        created (){
            // 判断登陆
            this.init();
            // 初始化角色信息
            //this.getCurrent();

            const tabPageHeight = Utils.env.getPageHeight();
            // 如果页面没有导航栏，可以用下面这个计算高度的方法
            // const tabPageHeight = Utils.env.deviceHeight / Utils.env.deviceWidth * 750;
            const { tabStyles } = this;
            this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' };
        },
        components: {
            WxcTabBar,
            index
            // tabBar,
            // Search,
            //
            // popsover,
            // search,
            // "index":index,
            // 'customer':customer,
            // 'statistics':statistics,
            // 'my':my
        },
        methods: {
            init() {
                let token = this.$storage.get("token");
                // console.log("token",token);
                // let userId = this.$storage.get("userId");
                // // console.log("userId",userId);
                // if (token == null || token == undefined || token == "" || token == "undefined"
                //     || userId == null || userId == undefined || userId == "" || userId == "undefined") {
                //     this.$router.open({
                //         name: 'lms.login'
                //     })
                // }
            },
            wxcTabBarCurrentTabSelected (e) {
                const index = e.page;
                //this.pageNum = index + 1;
                //Bus.$emit('changePage',this.pageNum);
            }
        }
    }
</script>

<style scoped>
    .item-container {
        width: 750px;
        background-color: #f2f3f4;
        /*align-items: center;*/
        /*justify-content: center;*/
    }
</style>