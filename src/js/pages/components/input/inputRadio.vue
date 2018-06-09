<template>
    <div class="flex_row">
        <div ref="radio" class="flex_row flex_center"
             :style="radioStyle"
             v-for="(item,i) in items"
             @click="changeRadio(i)"
             :key="i">
            <div class="radio_icon flex_center">
                <div class="radio_selected" v-if="checkRadio===i"></div>
            </div>
            <text class="radio_text">{{item.text}}</text>
        </div>
    </div>
</template>

<script>
    export default {
        name: "input-radio",
        props: {
            items: {
                default: [
                ]
            },
            selected: {
                default: 0
            },
            radioStyle: {
                default:{
                    marginRight: "15px"
                }
            },
        },
        data() {
            return {
                currentIndex: 0,
                checkRadio:0
            }
        },
        created () {
            this.checkRadio = this.selected;
        },
        methods: {
            changeRadio(i) {
                if(i===this.checkRadio){
                    return;
                }
                this.checkRadio=i;
                this.$emit("changeRadioCallBack",{
                    value:this.items[i].text,
                    // index:i,
                    id:this.items[i].id,
                })
            }
        },
        watch:{
            selected(){
                this.checkRadio = this.selected;
            }
        }
    }
</script>

<style scoped>
    .flex_row {
        flex-direction: row;
    }
    .radio_icon {
        width: 35px;
        height: 35px;
        border-width: 4px;
        border-style: solid;
        border-color: #948C90;
        border-radius: 35px;
    }
    .radio_selected {
        width: 15px;
        height: 15px;
        border-radius:15px;
        background-color: #948C90;
    }
    .radio_text {
        font-size: 28px;
        color: #948C90;
        margin-left: 7px;
    }
    .flex_center {
        justify-content: center;
        align-items: center;
    }
</style>