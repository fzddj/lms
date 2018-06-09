<template>
    <div class="category">
        <div class="text-img-div"></div>
        <text class="category-text">{{title}}</text>
        <text v-if="rightShowStatus" class="iconfont category-right-text" @click="rightTitleClick">{{rightTitle}}&#xe65f;</text>
    </div>
</template>

<script>
    export default {
        name: "category",
        props: {
            title: String,
            rightTitle:String,
            rightShow:{
                type:Boolean,
                default: true
            }
        },
        data: () => ({
            rightShowStatus:true
        }),
        created(){
            this.rightShowStatus = this.rightShow;
        },
        methods: {
            rightTitleClick() {
                this.$emit('categoryRightTitleClick');
            }
        }
    }
</script>

<style scoped>
    .iconfont {
        font-family:iconfont;
    }
    .category {
        margin-top: 28px;
        padding-left: 24px;
        width: 750px;
        height: 88px;
        background-color: #ffffff;
        justify-content: center;
    }
    .category-text {
        position: absolute;
        left:30px;
        color: #000000;
        font-weight: 600;
        font-size: 28px;
    }
    .text-img-div {
        left: 15px;
        width: 5px;
        height: 50px;
        background-color: #48c9bf;
        position: absolute;
    }
    .category-right-text {
        position: absolute;
        font-size: 28px;
        color: #E5E5E5;
        right: 20px;
    }
</style>