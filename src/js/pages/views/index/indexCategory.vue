<template>
    <list>
        <cell>
            <wxc-tab-page ref="wxc-tab-page"
                          :tab-titles="tabTitles"
                          :tab-styles="tabStyles"
                          :tab-page-height="tabPageHeight"
                          @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">

                <div key="0" class="item-container" :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
                    <index-clue></index-clue>
                </div>

                <div key="1" class="item-container" :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
                    <!--<index-phone></index-phone>-->
                </div>

                <div key="2" class="item-container" :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
                    <!--<index-shop></index-shop>-->
                </div>
            </wxc-tab-page>
        </cell>

    </list>

</template>

<script>
    const modal = weex.requireModule('modal');
    import { WxcTabPage, WxcPanItem, Utils, BindEnv } from 'weex-ui';
    import vue from 'vue';
    import IndexClue from "./indexClue";
    import IndexPhone from "./indexPhone";
    import IndexShop from "./indexShop";

    export default {
        name: "index-category",
        components: {
            IndexShop,
            IndexPhone,
            IndexClue, WxcTabPage, WxcPanItem },
        data: () => ({
            tabTitles: [
                {
                    title: '线索',
                },
                {
                    title: '电话任务',
                },
                {
                    title: '到店',
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
                width: 250,
                height: 88,
                fontSize: 28,
                hasActiveBottom: true,
                activeBottomColor: '#FFC900',
                activeBottomHeight: 3,
                activeBottomWidth: 250,
                textPaddingLeft: 10,
                textPaddingRight: 10
            },
            tabList: [],
            demoList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            tabPageHeight: 1334,
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
