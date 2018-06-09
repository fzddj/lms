<template>
    <wxc-tab-page ref="wxc-tab-page"
                  :tab-titles="tabTitles"
                  :tab-styles="tabStyles"
                  :tab-page-height="tabPageHeight"
                  @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
        <div key="0" class="item-container" :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
            <Intention></Intention>
        </div>

        <div key="1" class="item-container" :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
            <Booking></Booking>
        </div>

        <div key="2" class="item-container" :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
            <deal></deal>
        </div>

        <div key="3" class="item-container" :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
            <customer-defeat></customer-defeat>
        </div>

        <div key="4" class="item-container" :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
            <retain></retain>
        </div>
    </wxc-tab-page>


</template>

<script>
    import { WxcTabPage, WxcPanItem, Utils, BindEnv } from 'weex-ui';
    import vue from 'vue';
    import Intention from "./intention";
    import Booking from "./booking";
    import Deal from "./deal";
    import CustomerDefeat from "./customerDefeat";
    import Retain from "./retain";

    export default {
        name: "customer-category",
        components: {
            Retain,
            CustomerDefeat,
            Deal,
            Intention,
            Booking,
            WxcTabPage,
            WxcPanItem
        },
        data: () => ({
            tabTitles: [
                {
                    title: '意向',
                },
                {
                    title: '订车',
                },
                {
                    title: '成交',
                },
                {
                    title: '战败',
                },
                {
                    title: '保有',
                }
            ],
            tabStyles: {
                bgColor: '#48c9bf',
                titleColor: '#FFFFFF',
                activeTitleColor: '#FFFFFF',
                activeBgColor: '#48c9bf',
                isActiveTitleBold: true,
                iconWidth: 0,
                iconHeight: 0,
                width: 150,
                height: 90,
                fontSize: 28,
                hasActiveBottom: true,
                activeBottomColor: '#FFC900',
                activeBottomHeight: 5,
                activeBottomWidth: 150,
                textPaddingLeft: 10,
                textPaddingRight: 10
            },
            tabList: [],
            demoList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            tabPageHeight: 1334
        }),
        created () {
            this.tabPageHeight = Utils.env.getPageHeight();
            this.tabList = [...Array(this.tabTitles.length).keys()].map(i => []);
            vue.set(this.tabList, 0, this.demoList);
        },
        methods: {
            wxcTabPageCurrentTabSelected (e) {
                const self = this;
                const index = e.page;
                /* Unloaded tab analog data request */
                if (!Utils.isNonEmptyArray(self.tabList[index])) {
                    setTimeout(() => {
                        vue.set(self.tabList, index, self.demoList);
                    }, 100);
                }
            },
            wxcPanItemPan (e) {
                if (BindEnv.supportsEBForAndroid()) {
                    this.$refs['wxc-tab-page'].bindExp(e.element);
                }
            }
        }
    }
</script>

<style scoped>
    .item-container {
        width: 750px;
        background-color: #f2f3f4;
    }

    .border-cell {
        background-color: #f2f3f4;
        width: 750px;
        height: 24px;
        align-items: center;
        justify-content: center;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: #e0e0e0;
    }

    .cell {
        background-color: #ffffff;
    }

    .content{
        width:750px;
        height:300px;
        border-bottom-width:1px;
        align-items: center;
        justify-content: center;
    }
</style>