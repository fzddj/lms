<template>
    <div class="wxc-demo">
        <scroller class="scroller">

            <div class="panel">
                <text v-if="currentDate"
                      class="text">当前日期: {{currentDate}}</text>
            </div>

            <calendar ref="wxcPageCalendarPush"
                      :animationType="animationTypePush"
                      :date-range="dateRange"
                      :selected-date="selectedDate"
                      :selected-note="selectedNote"
                      :is-range="isRange"
                      :needDestroy="false"
                      :minibar-cfg="minibarCfg"
                      :desc-list="descList"
                      @wxcPageCalendarBackClicked="wxcPageCalendarBackClicked"
                      @wxcPageCalendarDateSelected="wxcPageCalendarDateSelected">

            </calendar>

        </scroller>
    </div>
</template>

<script>
    import Calendar from "../../components/calendar/calendar.vue";
    const modal = weex.requireModule('modal');
    export default {
        components: {
            Calendar,
        },
        data: () => ({
            animationTypePush:'push', // 默认使用push方式，若使用push模式此参数可以不传
            animationTypeModel:'model',
            currentDate: '',
            selectedDate: ['2018-02-11'],
            isRange: false,
            calendarTitle: '选择日期',
            dateRange: ['2018-05-01', '2018-06-01'],
            selectedNote: [],
            minibarCfg: {
                title: '日期选择'
            },
            descList: [
                { date: '2018-05-23', value: '◉' },
                { date: '2018-05-29', value: '◉' },
                { date: '2018-05-06', value: '◉', emphasize: true }
            ]
        }),
        created () {
            setTimeout(() => {
                this.$refs['wxcPageCalendarPush'].show();
            }, 10);
        },
        methods: {
            wxcPageCalendarDateSelected (e) {
                this.selectedDate = e.date;
                this.currentDate = e.date;
            },
            wxcPageCalendarBackClicked () {
                modal.toast({
                    message: '你按了返回按钮'
                })
            },
            showCalendarPush () {
                this.isRange = false;
                setTimeout(() => {
                    this.$refs['wxcPageCalendarPush'].show();
                }, 1);
            },

        }
    };
</script>

<style scoped>
    .wxc-demo {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #FFFFFF;
    }
    .scroller {
        flex: 1;
    }
    .btn {
        width: 600px;
        height: 80px;
        margin-top: 100px;
        margin-left: 75px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        background-color: rgb(92, 184, 92);
        border-color: rgb(76, 174, 76);
    }
    .text {
        font-size: 32px;
    }
    .yellow {
        background-color: #ffc300;
        border-color: #ffc300;
    }
    .btn-txt {
        font-size: 32px;
        color: #ffffff;
    }
    .btn-margin {
        margin-top: 40px;
    }
    .panel {
        height: 300px;
        align-items: center;
        margin-top: 40px;
    }
</style>