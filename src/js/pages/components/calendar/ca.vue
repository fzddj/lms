<template>
    <div>
        <calendar-index ref="wxc-tab-page"
                        :tab-titles="tabTitles"
                        :tab-styles="tabStyles"
                        :tab-page-height="tabPageHeight"
                        :setIndex = "setIndex"
                        @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">

            <list v-for="(v,index) in tabList"
                  :key="index"
                  class="item-container"
                  :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
                <!--<cell class="border-cell"></cell>-->
                <cell class="cell">
                    <wxc-pan-item @wxcPanItemPan="wxcPanItemPan">
                        <div class="content">
                            <div class="calendar-weekday">
                                <text class="flex-item weekday-text"
                                      :key="k"
                                      :aria-label="`周${week}`"
                                      v-for="(week,k) in ['日','一','二','三','四','五','六']">{{week}}</text>
                            </div>

                            <div class="wxc-page-calendar">
                                <list class="calendar-list">
                                    <cell v-for="(month,mindex) in monthsArrayList(index)"
                                          :key="mindex"
                                          :class="[!month.title && 'calendar-row']">
                                        <!--<text>month:{{month}}</text>-->
                                        <text class="month-text"
                                              v-if="month.title">{{month.title}}</text>
                                        <div v-else
                                             v-for="(cell,rowIndex) in month"
                                             :key="`${mindex}-${rowIndex}`"
                                             :ref="cell.ref"
                                             :class="['row-item', cell.cellClass]"
                                             :accessible="true"
                                             :aria-label="`${cell.text?cell.text:''},${cell.note?cell.note:''},${cell.ext?cell.ext:''}`"
                                             @click="onClickDate(cell,index)">
                                            <text :class="['calendar-note', cell.cls]">{{cell.note}}</text>
                                            <text :class="['calendar-day', cell.cls]">{{cell.text}}</text>
                                            <text :class="['calendar-ext', cell.cls]">{{cell.ext}}</text>
                                        </div>
                                    </cell>
                                </list>
                            </div>

                        </div>

                    </wxc-pan-item>

                </cell>

            </list>

        </calendar-index>
    </div>
</template>


<script>
    import Vue from 'vue';
    import calendarIndex from "../../components/calendar/index.vue";
    const dom = weex.requireModule('dom');
    import { WxcPanItem, Utils, BindEnv } from 'weex-ui';
    import * as Format from '../../components/calendar/format';
    const isWeb = Utils.env.isWeb();

    export default {
        name:'ca',
        components: { calendarIndex, WxcPanItem},
        props: {
            descListInfo: {
                type: Array,
                default: () => ([])
            },
            selectedDateInfo: {
                type: Array,
                default: () => ([])
            },
        },
        data: () => ({
            // tabTitles: [
            //     {
            //         title: '2018-03',
            //     },
            //     {
            //         title: '2018-04',
            //     },
            //     {
            //         title: '2018-05',
            //     },
            //     {
            //         title: '2018-06',
            //     },
            //     {
            //         title: '2018-07',
            //     }
            // ],
            tabTitles: [],
            tabStyles: {
                bgColor: '#FFFFFF',
                titleColor: '#666666',
                activeTitleColor: '#3D3D3D',
                activeBgColor: '#FFFFFF',
                isActiveTitleBold: true,
                iconWidth: 0,
                iconHeight: 0,
                width: 160,
                height: 80,
                fontSize: 24,
                hasActiveBottom: true,
                activeBottomColor: '#FFC900',
                activeBottomHeight: 6,
                activeBottomWidth: 120,
                textPaddingLeft: 10,
                textPaddingRight: 10
            },
            tabList: [],
            demoList: [1],
            tabPageHeight: 840,
            setIndex:2,
            animationTypePush:'push', // 默认使用push方式，若使用push模式此参数可以不传
            animationTypeModel:'model',
            currentDate: '',
            selectedDate: [],
            isRange: false,
            calendarTitle: '选择日期',
            // dateRange: ['2018-07-01', '2018-07-31'],
            // dateRangeList: [
            //     ['2018-03-01','2018-03-31'],
            //     ['2018-04-01','2018-04-31'],
            //     ['2018-05-01','2018-05-31'],
            //     ['2018-06-01','2018-06-31'],
            //     ['2018-07-01','2018-07-31']
            // ],
            dateRangeList: [],
            selectedNote: [],
            minibarCfg: {
                title: '日期选择'
            },
            descList: [],
            isShow: true,
            reSelect: false,
            today: Format.getToDay(),
            departDate: '',
            arriveDate: ''
        }),
        created () {
            // 传递数据初始化
            if (this.descListInfo.length > 0) {
                this.descList = this.descListInfo;
            }

            if (this.selectedDateInfo.length > 0) {
                this.selectedDate = this.selectedDateInfo;
            }

            // 月份初始化
            this.getDateInit();

            // this.tabPageHeight = Utils.env.getPageHeight();
            this.tabList = [...Array(this.tabTitles.length).keys()].map(i => []);
            Vue.set(this.tabList, 0, this.demoList);
            this.detectShow();
        },
        methods: {
            wxcTabPageCurrentTabSelected (e) {
                const self = this;
                const index = e.page;
                /* Unloaded tab analog data request */
                if (!Utils.isNonEmptyArray(self.tabList[index])) {
                    setTimeout(() => {
                        Vue.set(self.tabList, index, self.demoList);
                    }, 100);
                }
            },
            wxcPanItemPan (e) {
                if (BindEnv.supportsEBForAndroid()) {
                    this.$refs['wxc-tab-page'].bindExp(e.element);
                }
            },
            monthsArrayList(index) {
                let dateRangeInfo = this.dateRangeList[index];
                const {dateRangeInfo: range, today, departDate, arriveDate, selectedNote, descList } = this;
                const param = { dateRangeInfo, today, departDate, arriveDate, selectedNote, descList };
                return Format.generateDateCellNew(param);
            },
            onClickDate (datConfig,index) {
                const self = this;
                if (datConfig.disabled || datConfig.isEmpty) return;

                if (self.reSelect) {
                    self.departDate = '';
                    self.arriveDate = '';
                    self.reSelect = false;
                }

                // 切换日历背景状态
                this.selectedDate = [datConfig.date];
                this.currentDate = [datConfig.date];
                this.departDate = this.selectedDate[0];
                this.arriveDate = '';

                this.monthsArrayList(index);
                this.dispatchDateChange([datConfig.date]);
            },
            dispatchDateChange (dateArr) {
                const duration = isWeb ? 400 : 600;
                setTimeout(() => {
                    this.hide();
                }, duration);
                this.$emit('wxcPageCalendarDateSelected', {
                    date: dateArr
                });
            },
            hide () {
                this.needDestroy && (this.isShow = false);
                this.reSelect = false;
                this._animate(false);
                this.$emit('wxcPageCalendarHide', {});
            },
            _animate (status, callback = null) {

            },
            detectShow () {
                if (this.isRange && this.selectedDate.length >= 2) {
                    this.departDate = this.selectedDate[0];
                    this.arriveDate = this.selectedDate[1];
                } else if (this.selectedDate.length >= 1) {
                    this.departDate = this.selectedDate[0];
                    this.arriveDate = '';
                }
            },
            getDateInit() {
                let date=new Date;
                //获取年份
                // let year=date.getFullYear();
                //获取月份(0-11,0代表1月)
                // let month3 = date.getMonth()+1;

                let d = new Date;
                d.setMonth(d.getMonth()-2);
                let month1 = d.getFullYear()+"-"+(d.getMonth()>=9?d.getMonth()+1:"0"+(d.getMonth()+1));

                let d1 = new Date;
                d1.setMonth(d1.getMonth()-1);
                let month2 = d1.getFullYear()+"-"+(d1.getMonth()>=9?d1.getMonth()+1:"0"+(d1.getMonth()+1));

                let d2 = new Date;
                d2.setMonth(d2.getMonth());
                let month3 = d2.getFullYear()+"-"+(d2.getMonth()>=9?d2.getMonth()+1:"0"+(d2.getMonth()+1));

                let d3 = new Date;
                d3.setMonth(d3.getMonth()+1);
                let month4 = d3.getFullYear()+"-"+(d3.getMonth()>=9?d3.getMonth()+1:"0"+(d3.getMonth()+1));

                let d4 = new Date;
                d4.setMonth(d4.getMonth()+2);
                let month5 = d4.getFullYear()+"-"+(d4.getMonth()>=9?d4.getMonth()+1:"0"+(d4.getMonth()+1));

                this.tabTitles = [];
                this.tabTitles.push({"title":month1});
                this.tabTitles.push({"title":month2});
                this.tabTitles.push({"title":month3});
                this.tabTitles.push({"title":month4});
                this.tabTitles.push({"title":month5});

                this.dateRangeList = [];
                this.dateRangeList.push([month1+'-'+'01',month1+'-'+'31']);
                this.dateRangeList.push([month2+'-'+'01',month2+'-'+'31']);
                this.dateRangeList.push([month3+'-'+'01',month3+'-'+'31']);
                this.dateRangeList.push([month4+'-'+'01',month4+'-'+'31']);
                this.dateRangeList.push([month5+'-'+'01',month5+'-'+'31']);
            },

        },
        computed: {
            monthsArray (index) {
                let dateRangeInfo = this.dateRangeList[index];
                const { dateRangeInfo: range, today, departDate, arriveDate, selectedNote, descList } = this;
                const param = { range, today, departDate, arriveDate, selectedNote, descList };
                return Format.generateDateCell(param);
            }
        },
    };
</script>

<style scoped>
    .item-container {
        width: 750px;
        background-color: #f2f3f4;
        height: 300px;
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
        height: 300px;
    }

    .content{
        /*width:750px;*/
        /*height:300px;*/
        /*border-bottom-width:1px;*/
        /*align-items: center;*/
        /*justify-content: center;*/
    }

    .flex-item {
        flex: 1;
        text-align: center;
    }

    .weekday-text {
        color: #000000;
        flex: 1;
        font-size: 24px;
        text-align: center;
    }

    .calendar-weekday {
        height: 60px;
        background-color: #ffffff;
        border-bottom-width: 1px;
        border-top-width: 1px;
        border-color: #e2e2e2;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .wxc-page-calendar {
        /*position: fixed;*/
        width: 750px;
        color: #333333;
        background-color: #ffffff;
    }

    .flex-item {
        flex: 1;
        text-align: center;
    }

    .calendar-weekday {
        height: 60px;
        background-color: #ffffff;
        border-bottom-width: 1px;
        border-top-width: 1px;
        border-color: #e2e2e2;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .weekday-text {
        color: #000000;
        flex: 1;
        font-size: 24px;
        text-align: center;
    }

    .calendar-list {
        flex: 1;
    }

    .month-text {
        font-size: 32px;
        height: 0;
        line-height: 60px;
        width: 750px;
        text-align: center;
        align-items: center;
        background-color: #f2f3f4;
    }

    .calendar-row {
        height: 140px;
        flex-direction: row;
        background-color: #ffffff;
        border-bottom-width: 1px;
        border-color: #f2f3f4;
        align-items: center;
        justify-content: space-between;
    }

    .row-item {
        flex: 1;
        height: 140px;
        padding-top: 10px;
        padding-bottom: 10px;
        justify-content: center;
        align-items: center;
    }

    .iphone-x {
        height: 68px;
    }

    .calendar-note {
        height: 36px;
        line-height: 36px;
        font-size: 24px;
        color: #000000;
        text-align: center;
    }

    .calendar-day {
        height: 48px;
        line-height: 48px;
        font-size: 36px;
        color: #000000;
        text-align: center;
    }

    .calendar-ext {
        height: 36px;
        line-height: 36px;
        color: #999999;
        text-align: center;
        font-size: 24px;
        text-overflow: ellipsis;
    }

    .calendar-holiday {
        color: #FF5000;
    }

    .calendar-rest {
        color: #FF5000;
    }

    .item-row-selected {
        color: #ffffff;
        background-color: #FFC900;
        text-align: center;
    }

    .item-text-selected {
        color: #3d3d3d;
        text-align: center;
    }

    .calendar-disabled {
        color: #CCCCCC;
    }

    .cell-disabled {
        background-color: #FBFBFB;
    }

    .calendar-day-include {
        background-color: #FFF7D6;
    }
</style>