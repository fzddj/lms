<template>
    <div class="drop-down-container" :style="{top:top+'px'}">
        <div class="drop-down-mask" @click="changeStatus(true)"></div>
        <div class="drop-down-list">
            <div v-for="(item,index) in menus" class="drop-down-item border_bottom"
                 @click="selectedMenu(index)">
                <div v-if="selected===index"
                     style="flex-direction: row;justify-content: space-between;">
                    <text style="flex:4;font-size: 32px;" :style="selectedStyle">{{item.name}}</text>
                </div>
                <div v-else @click="selectedMenu(index)">
                    <text style="font-size: 32px;">{{item.name}}</text>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import weexUtils from "../utils/WeexUtils";
    import { WxcOverlay,Utils } from 'weex-ui';

    export default{
        name: "drop-down",
        components: { WxcOverlay },
        props: {
            menus: {
                type: Array,
                default: []
            },
            selected: {
                type: Number,
                default: 0
            }
        },
        data(){
            return {
                top:100,
                selectedStyle: {
                    color: "#4FB57A",
                }
            };
        },
        methods: {
            selectedMenu(index){
                if (this.selected === index) {
                    this.changeStatus(true);
                    return;
                }
                // let menu = this.menus[index];
                this.$emit("changDropMenuSelected", index);
            },
            changeStatus(isShow){
                this.$emit("dropMenuIsShow", isShow);
            }
        },
        created (){
            let height = Utils.env.getPageHeight();
            this.top = height- 190;
        }
    }
</script>

<style scoped>
    .drop-down-container {
        position: fixed;
        right: 0;
        left: 0;
        bottom: 0;
    }
    .drop-down-item {
        padding: 25px;
    }
    .drop-down-list {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        background-color: #ffffff;
    }
    .drop-down-mask {
        /*position: absolute;*/
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .4);
    }
    .border_bottom {
        /*border-bottom-style: solid;*/
        /*border-bottom-width: 1px;*/
        /*border-bottom-color: #e6e6e6;*/
        border-top-style: solid;
        border-top-width: 1px;
        border-top-color: #e6e6e6;
    }
</style>