<template>
    <div class="my">
        <div class="my-header">
            <div>
                <div class="my-header-pic">
                    <image style="width:200px;height:200px;border-radius:200px;" src="https://www.baidu.com/img/bd_logo1.png"></image>
                </div>

                <div class="my-header-info">
                    <div>
                        <text>{{name}}</text>
                    </div>
                    <div>
                        <text>{{dealerName}}</text>
                    </div>
                </div>
            </div>
        </div>

        <div class="my-info">
            <div>
                <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="用户账号">
                    <div class="choice-item"><text class="choice-item-text">{{name}}</text></div>
                </wxc-cell>
            </div>

            <div>
                <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="姓名">
                    <div class="choice-item"><text class="choice-item-text">{{name}}</text></div>
                </wxc-cell>
            </div>

            <div>
                <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="手机号码">
                    <div class="choice-item"><text class="choice-item-text">{{phone}}</text></div>
                </wxc-cell>
            </div>

            <div>
                <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="职位">
                    <div class="choice-item"><text class="choice-item-text">{{position}}</text></div>
                </wxc-cell>
            </div>

            <div>
                <wxc-cell :has-top-border="false" :cellStyle="cellStyle" title="修改密码">
                    <div class="choice-item"><text class="choice-item-text">＞</text></div>
                </wxc-cell>
            </div>
        </div>

        <div :style="{'margin-top':listHeight+'px'}">
            <wxc-button :btn-style="btnStyle" @wxcButtonClicked="logout()" text="退出"></wxc-button>
        </div>

        <!--<search :positionListInfo="positionListInfo"></search>-->
    </div>
</template>

<script>
    let modal = weex.requireModule('modal');
    import {WxcButton,WxcCell,Utils } from 'weex-ui';
    import Search from "../../components/search";

    export default {
        components: {
            Search,
            WxcButton,
            WxcCell
        },
        props: {
        },
        name: "my",
        data: () => ({
            positionListInfo:{x:-15,y:70},
            listHeight:"",
            btnStyle:{
                'top':'10px',
                'left':'0px',
                'right':'0px',
                'bottom':'20px',
                'width':'750px',
                'background-color': '#E5010F',
            },
            name:"",
            phone:"",
            dealerName:"",
            position:"",
            cellStyle:{
                "padding-bottom": '5px',
                "padding-top": '5px'
            },
        }),
        methods: {
            logout() {
                this.removeItem("userId");
                this.removeItem("token");
                this.jump("login");
            }
        },
        created () {
            //初始化list div高度
            let height = Utils.env.getPageHeight();
            this.listHeight = height - 300;

            // let currentInfo = this.getItem("current");
            // if (currentInfo != null) {
            //     currentInfo = JSON.parse(currentInfo);
            //     this.phone = currentInfo.phone;
            //     this.name = currentInfo.userName;
            // } else {
            //     this.jump("login");
            // }
        }
    }
</script>

<style scoped>
    .my {
        background-color: #ffffff;
    }
    .my-header{
        position: absolute;
        top: 50px;
        left: 50px;
    }
    .my-header-pic{
        position: absolute;
    }
    .my-header-info{
        position: absolute;
        top:60px;
        left:300px;
        width: 300px;
    }
    .choice-item-text{
        color: #717171;
        font-size: 28px;
        top:17px;
    }
    .choice-item {
        height: 68px;
    }
    .my-info{
        position: absolute;
        top: 300px;
        width: 750px;
    }
</style>