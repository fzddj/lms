<template>
    <div class="wxc-page-calendar" ref="pageCalendar" :style="calendarExtendStyle">
        <list class="calendar-list">
            <cell v-for="(month,index) in monthsArray"
                  :key="index"
                  :class="[!month.title && 'calendar-row']">
                <!--<text>month:{{month}}</text>-->
                <text class="month-text"
                      v-if="month.title">{{month.title}}</text>
                <div v-else
                     v-for="(cell,rowIndex) in month"
                     :key="`${index}-${rowIndex}`"
                     :ref="cell.ref"
                     :class="['row-item', cell.cellClass]"
                     :accessible="true"
                     :aria-label="`${cell.text?cell.text:''},${cell.note?cell.note:''},${cell.ext?cell.ext:''}`"
                     @click="onClickDate(cell)">
                    <text :class="['calendar-note', cell.cls]">{{cell.note}}</text>
                    <text :class="['calendar-day', cell.cls]">{{cell.text}}</text>
                    <text :class="['calendar-ext', cell.cls]">{{cell.ext}}</text>
                </div>
            </cell>
            <cell class="iphone-x" v-if="isIPhoneX"></cell>
        </list>
    </div>
</template>

<script>
    import * as Format from './format';
    import { WxcMinibar,Utils } from 'weex-ui'
    const isWeb = Utils.env.isWeb();

    const dom = weex.requireModule('dom');


    export default {
        components: { WxcMinibar },
        props: {
            selectedDate: Array,
            animationType: {
                type: String,
                default: 'push'
            },
            dateRange: {
                type: Array,
                required: true,
                default: () => ([])
            },
            minibarCfg: {
                type: Object,
                default: () => ({
                    'title': '选择日期',
                    'background-color': '#FFC900',
                    'text-color': '#3D3D3D'
                })
            },
            showHeader: {
                type: Boolean,
                default: false
            },
            selectedNote: {
                type: Array,
                default: () => ([])
            },
            isRange: {
                type: Boolean,
                default: false
            },
            needDestroy: {
                type: Boolean,
                default: false
            },
            descList: {
                type: Array,
                default: () => ([])
            }
        },
        data: () => ({
            isShow: true,
            reSelect: true,
            today: Format.getToDay(),
            departDate: '',
            arriveDate: ''
        }),
        computed: {
            calendarExtendStyle () {
                return Utils.uiStyle.pageTransitionAnimationStyle(this.animationType)
            },
            monthsArray () {
                const { dateRange: range, today, departDate, arriveDate, selectedNote, descList } = this;
                const param = { range, today, departDate, arriveDate, selectedNote, descList }
                let a = Format.generateDateCell(param);
                console.log(a);
                return a
            }
        },
        created () {
            this.isIPhoneX = Utils.env.isIPhoneX();
            this.showTitle = isWeb || this.showHeader;
            this.detectShow();
        },
        mounted () {
            const { needDestroy } = this;
            const hold = isWeb ? 700 : 100;
            !needDestroy && setTimeout(() => {
                this.isShow = true;
                this.scrollToDate();
            }, hold);
        },
        watch: {
            needDestroy (newVal, preVal) {
                if (!newVal && newVal !== preVal) {
                    setTimeout(() => {
                        this.isShow = true;
                    }, 200)
                }
            }
        },
        methods: {
            minibarLeftButtonClick () {
                setTimeout(() => {
                    this.hide();
                    this.$emit('wxcPageCalendarBackClicked', {});
                }, 100);
            },
            onClickDate (datConfig) {
                console.log('datConfig',datConfig);
                const self = this;
                if (datConfig.disabled || datConfig.isEmpty) return;

                if (self.reSelect) {
                    self.departDate = '';
                    self.arriveDate = '';
                    self.reSelect = false;
                }

                if (self.isRange) {
                    if (self.departDate && Date.parse(self.departDate) <= Date.parse(datConfig.date)) {
                        self.arriveDate = datConfig.date;
                    } else {
                        self.departDate = datConfig.date;
                    }
                    if (self.departDate && self.arriveDate) {
                        self.dispatchDateChange([self.departDate, self.arriveDate]);
                    }
                } else {
                    self.departDate = datConfig.date;
                    self.dispatchDateChange([self.departDate]);
                }
            },
            scrollToDate () {
                setTimeout(() => {
                    if (this.departDate) {
                        const el = this.$refs.departDate[0];
                        el && dom.getComponentRect && dom.getComponentRect(el, (e) => {
                            if (e && e.result) {
                                const { bottom } = e.size;
                                const { env } = weex.config;
                                // 误差
                                const height = env.deviceHeight / env.deviceWidth * 750 - 50;
                                if (bottom > height || bottom === 0) {
                                    dom.scrollToElement(el, { offset: -146, animated: false });
                                }
                            }
                        })
                    }
                }, 10);
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
            detectShow () {
                if (this.isRange && this.selectedDate.length >= 2) {
                    this.departDate = this.selectedDate[0];
                    this.arriveDate = this.selectedDate[1];
                } else if (this.selectedDate.length >= 1) {
                    this.departDate = this.selectedDate[0];
                    this.arriveDate = '';
                }
            },
            _animate (status, callback = null) {
                let ref = this.$refs.pageCalendar
                if(this.animationType==='push') {
                    Utils.animation.pageTransitionAnimation(ref,`translateX(${status ? -750 : 750}px)`,status,callback)
                } else if (this.animationType==='model') {
                    Utils.animation.pageTransitionAnimation(ref,`translateY(${status ? -Utils.env.getScreenHeight() : Utils.env.getScreenHeight()}px)`,status,callback)
                }
            },
            show () {
                const { needDestroy } = this;
                needDestroy && (this.isShow = true);
                this.reSelect = true;
                this.detectShow();
                this._animate(true);
                needDestroy && this.scrollToDate();
            },
            hide () {
                this.needDestroy && (this.isShow = false);
                this.reSelect = false;
                this._animate(false);
                this.$emit('wxcPageCalendarHide', {});
            }
        }
    };
</script>
<style scoped>
    .wxc-page-calendar {
        position: fixed;
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
