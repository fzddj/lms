<template>
    <div>
        <div class="index-shop-category">
            <ca :selectedDateInfo="selectedDate"
                :descListInfo="descList"
                @wxcPageCalendarDateSelected="wxcPageCalendarDateSelected"></ca>
        </div>
        <div class="index-shop-list">
            <text>到店</text>
        </div>

    </div>
</template>

<script>
    import ca from '../../components/calendar/ca';

    export default {
        name: "index-shop",
        components: {
            ca
        },
        data: () => ({
            selectedDate:[],
            currentDate:[]
        }),
        created () {
            this.selectedDate = ["2018-05-12"];
            this.descList = [
                { date: '2018-05-23', value: '◉' },
                { date: '2018-05-29', value: '◉' },
                { date: '2018-05-06', value: '◉', emphasize: true }
            ];
        },
        methods: {
            wxcPageCalendarDateSelected (e) {
                this.selectedDate = e.date;
                this.currentDate = e.date;
                console.log('date',e.date);
            },
        }
    }
</script>

<style scoped>

</style>
