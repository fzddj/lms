<template>
    <div class="navigation-item">
        <wxc-minibar background-color="#48c9bf"
                     @wxcMinibarLeftButtonClicked="minibarLeftButtonClick">
            <text class="iconfont" slot="left"
                   style="height: 32px;width: 88px;color: #FFFFFF;">&#xe660;</text>

            <text style="font-size: 40px;color: #FFFFFF"  slot="middle" >{{title}}</text>

            <text slot="right" v-if="rightShowStatus"
                  style="height: 48px;width: 88px;font-size: 32px;color: #FFFFFF;top: 8px;" @click="minibarRightButtonClick">{{rightText}}</text>
        </wxc-minibar>
    </div>
</template>

<script>
    import { WxcMinibar } from 'weex-ui';
    const modal = weex.requireModule('modal');

    export default {
        name: "navigation",
        components: { WxcMinibar },
        props: {
            navigationTitle:{
                type:String,
                default:"标题"
            },
            rightShow:{
                type: Boolean,
                default: false
            },
            rightValue:{
                type:String,
                default:"编辑"
            }
        },
        methods: {
            minibarLeftButtonClick () {
            },
            minibarRightButtonClick() {
                this.$emit('wxcMinibarRightButtonClicked', {});
            }
        },
        data: () => ({
            title:'',
            rightShowStatus:false,
            rightText:"编辑"
        }),
        created () {
            this.rightShowStatus = this.rightShow;
            if (this.navigationTitle != "") {
                this.title = this.navigationTitle;
            }
            this.rightText = this.rightValue;
        }
    };
</script>

<style scoped>
    .iconfont {
        font-family:iconfont;
    }
    .navigation-item{

    }
</style>