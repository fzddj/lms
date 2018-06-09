<template>
    <div class="wrapper">
        <div class="login" :style="{top:top+'px'}">
            <div class="input-wrapper">
                <input class="input" type="text" placeholder="请输入用户名" autofocus="true" value=""
                       @input="userNameChange"/>
                <text class="bar-ic iconfont input-img">&#xe659;</text>
            </div>
            <div class="input-wrapper">
                <input class="input" type="password" placeholder="请输入密码" value="" @input="passwordChange"/>
                <text class="bar-ic iconfont input-img">&#xe652;</text>
            </div>
            <!--<div class="input-wrapper">-->
            <!--<input class="input" type="text" placeholder="请选择品牌" :value="checkBrandName" @click="brandClick" disabled="true"/>-->
            <!--&lt;!&ndash;<drop-down v-if="brandStatus"&ndash;&gt;-->
            <!--&lt;!&ndash;:menus="brandList"&ndash;&gt;-->
            <!--&lt;!&ndash;:selected="brandSelected"&ndash;&gt;-->
            <!--&lt;!&ndash;@changDropMenuSelected="changDropMenuSelected"&ndash;&gt;-->
            <!--&lt;!&ndash;@dropMenuIsShow="dropMenuIsShow">&ndash;&gt;-->
            <!--&lt;!&ndash;</drop-down>&ndash;&gt;-->
            <!--<text class="bar-ic iconfont input-img">&#xe996;</text>-->
            <!--</div>-->

            <!--<div class="input-wrapper">-->
            <!--<switch @change="onchange" :checked="checked" ></switch>-->
            <!--<text class="input-text">记住密码</text>-->
            <!--</div>-->
            <div class="input-wrapper">
                <!--<div class="input-login" @click="login()">-->
                <!---->
                <!--<text class="input-login-text">登录</text>-->
                <!--</div>-->
                <wxc-button :btn-style="btnStyle" :disabled="btnStatus" @wxcButtonClicked="login">登录</wxc-button>
            </div>
        </div>
        <wxc-dialog :content="content"
                    :show="show"
                    :single="true"
                    @wxcDialogCancelBtnClicked="wxcDialogCancelBtnClicked"
                    @wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked"
                    @wxcDialogNoPromptClicked="wxcDialogNoPromptClicked">
        </wxc-dialog>

        <wxc-popup popup-color="#ffffff"
                   :show="isBottomShow"
                   @wxcPopupOverlayClicked="popupOverlayBottomClick"
                   pos="bottom"
                   height="200">
            <div class="demo-content">
                <div v-for="(item,index) in brandList" class="drop-down-item border_bottom"
                     @click="selectedMenu(index)">
                    <div v-if="brandSelected===index"
                         style="flex-direction: row;justify-content: space-between;">
                        <text style="flex:4;font-size: 32px;" :style="selectedStyle">{{item.name}}</text>
                    </div>
                    <div v-else @click="selectedMenu(index)">
                        <text style="font-size: 32px;">{{item.name}}</text>
                    </div>
                </div>
            </div>
        </wxc-popup>
    </div>
</template>

<script>
    //import DropDown from "../../components/dropDown";

    let modal = weex.requireModule('modal');
    import {WxcDialog, WxcPopup, WxcButton, Utils} from 'weex-ui';

    export default {
        name: 'login',
        components: {
            WxcButton,
            WxcDialog,
            WxcPopup
        },
        data() {
            return {
                top: 0,
                userName: '',
                userPassword: '',
                checked: true,
                show: false,
                content: '',
                brandStatus: false,
                brandSelected: 0,
                brandList: [],
                checkBrandName: '',
                checkBrnadId: '',
                isBottomShow: false,
                selectedStyle: {
                    color: "#4FB57A",
                },
                btnStyle: {
                    'width': '550px',
                    'background-color': '#48c9bf',
                },
                btnStatus: true,
            }
        },
        methods: {
            login() {
                let that = this;
                if (this.userName == null || this.userName === undefined || this.userName.length < 1) {
                    this.showToast('请输入用户名');
                    return
                }
                if (this.userPassword == null || this.userPassword === undefined || this.userPassword.length < 1) {
                    this.showToast('请输入密码');
                    return
                }

                // if (this.checkBrandName == null || this.checkBrandName == undefined || this.checkBrandName.length < 1) {
                //     this.showToast('请选择品牌');
                //     return
                // }

                let userPassword = encodeURIComponent(this.userPassword)
                let obj = {};
                obj['grant_type'] = 'password';
                obj['username'] = this.userName;
                obj['password'] = userPassword;

                // let url = 'http://uat.dealer.jetour.com.cn/accessToken';
                let url = '/accessToken?username=' + this.userName + '&password=' + userPassword + '&grant_type=password';

                this.$fetch({
                    method: 'POST',    // 大写
                    url: 'http://172.16.0.220' + url,
                    //name: 'lms.accessToken', //当前是在apis中配置的别名，你也可以直接绝对路径请求 如：url:http://xx.xx.com/xxx/xxx
                    data: obj
                }).then(res => {
                    // 成功回调
                    that.$storage.set("token", res.token);
                    // account
                    that.$storage.set("account", res.account);
                    // corpCode
                    that.$storage.set("corpCode", res.corpCode);
                    // nickName
                    that.$storage.set("nickName", res.nickName);
                    // userId
                    that.$storage.set("userId", res.userId);
                    // userName
                    that.$storage.set("userName", res.userName);
                    // checkBrandName
                    that.$storage.set("brandName", that.checkBrandName);
                    // checkBrnadId
                    that.$storage.set("brandId", that.checkBrnadId);

                    this.$router.open({
                        name: 'lms.home'
                    })
                    // this.$notice.alert({
                    //     title: 'Success!',
                    //     message: res.status,
                    //     okTitle: '确认',
                    //     callback() {
                    //         // 点击确认按钮的回调
                    //     }
                    // })
                    // console.log(res)
                }, error => {
                    // 错误回调
                    this.$notice.alert({
                        title: 'Error',
                        message: 'error',
                        okTitle: '确认',
                        callback() {
                            // 点击确认按钮的回调
                        }
                    })
                    console.log(error)
                })


                return;

                this.POST(url, obj, "", function (res) {

                    this.$notice.alert({
                        title: '这是一个弹窗',
                        message: res.status,
                        okTitle: '确认',
                        callback() {
                            // 点击确认按钮的回调
                        }
                    })
                    return;
                    console.log("login", res);
                    if (res.status == 200) {
                        // 请求成功
                        if (res.data.code == 0) {

                            // let currentInfo = that.getCurrent();
                            // console.log('currentInfo',currentInfo);

                            // 登陆成功
                            // token
                            that.setItem("token", res.data.token);
                            // account
                            that.setItem("account", res.data.account);
                            // corpCode
                            that.setItem("corpCode", res.data.corpCode);
                            // nickName
                            that.setItem("nickName", res.data.nickName);
                            // userId
                            that.setItem("userId", res.data.userId);
                            // userName
                            that.setItem("userName", res.data.userName);
                            // checkBrandName
                            that.setItem("brandName", that.checkBrandName);
                            // checkBrnadId
                            that.setItem("brandId", that.checkBrnadId);

                            // 路由跳转
                            // 销售顾问跳转
                            that.jump('home');
                            // 销售经理跳转
                            // that.jump("managerHome");
                            // 总部跳转

                        } else {
                            // 登陆失败
                            that.openDialog(res.data.msg);
                        }
                    } else {
                        // 请求失败
                        that.openDialog("网络错误");
                    }
                });
            },
            userNameChange(event) {
                this.userName = event.value;
                // 根据用户名获取品牌信息
                // this.getBrandList(this.userName);
                // 检查按钮状态
                this.checkBtnStatus();
            },
            passwordChange(event) {
                this.userPassword = event.value
                // 检查按钮状态
                this.checkBtnStatus();
            },
            onchange() {
                this.checked = event.value
            },
            showToast(msg) {
                modal.toast({
                    message: msg,
                    duration: 0.3
                })
            },
            openDialog(content) {
                this.show = true;
                this.content = content;
            },
            wxcDialogCancelBtnClicked() {
                //此处必须设置，组件为无状态组件，自己管理
                this.show = false;
            },
            wxcDialogConfirmBtnClicked() {
                //此处必须设置，组件为无状态组件，自己管理
                this.show = false;
            },
            wxcDialogNoPromptClicked(e) {
                //此处必须设置，组件为无状态组件，自己管理
                this.isChecked = e.isChecked;
            },
            brandClick() {
                if (this.userName != undefined && this.userName != null && this.userName != "") {
                    if (this.brandList.length > 0) {
                        // this.brandStatus = true;
                        this.isBottomShow = true;
                    } else {
                        this.showToast('未获取到品牌信息，请检查用户名');
                        return;
                    }
                } else {
                    this.showToast('请输入用户名');
                    return;
                }
            },
            dropMenuIsShow(isShow) {
                this.brandStatus = false;
                // console.log("isShow",isShow);
            },
            getBrandList(userName) {
                let that = this;
                if (userName != null && userName != undefined && userName != "") {
                    let url = '/api/dealer-center-saas/dealer-org/getBrandByUserName/' + userName;
                    this.GET(url, function (res) {
                        // console.log("getBrandList",res);
                        if (res.status == 200) {
                            // 请求成功
                            if (res.data.code == 200 && res.data.data.brandList.length > 0) {
                                that.brandList = res.data.data.brandList;
                            } else {
                                that.brandList = [];
                            }
                        } else {
                            // 请求失败
                            that.openDialog("网络错误");
                            that.brandList = [];
                        }
                    });
                }
            },
            popupOverlayBottomClick() {
                this.isBottomShow = false;
            },
            selectedMenu(index) {
                this.brandSelected = index;
                this.isBottomShow = false;
                let brandInfo = this.brandList[index];
                if (brandInfo != null && brandInfo != undefined && brandInfo != "") {
                    this.checkBrandName = brandInfo.name;
                    this.checkBrnadId = brandInfo.id;
                } else {
                    this.checkBrandName = "";
                    this.checkBrnadId = "";
                }
                // 检查按钮状态
                this.checkBtnStatus();
            },
            checkBtnStatus() {
                if (this.userName != "" && this.userName != null && this.userName != undefined
                    && this.userPassword != "" && this.userPassword != null && this.userPassword != undefined) {
                    // && this.checkBrandName != "" && this.checkBrandName != null && this.checkBrandName != undefined
                    this.btnStatus = false;
                } else {
                    this.btnStatus = true;
                }

                // console.log("btnStatus",this.btnStatus);
            }
        },
        created() {
            // 初始化页面高度
            let height = Utils.env.getPageHeight();
            this.top = height / 2 - 220;

            // 初始化品牌列表
            if (this.userName != undefined && this.userName != null && this.userName != "") {
                this.getBrandList(this.userName);
            }

        },
    }
</script>

<style scoped>
    .iconfont {
        font-family: iconfont;
    }

    .login {
        /*top:450px;*/
    }

    .wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .input-wrapper {
        width: 550px;
        margin-left: 100px;
        margin-right: 100px;
        margin-bottom: 30px;
    }

    .input {
        font-size: 30px;
        height: 80px;
        width: 550px;
        padding-left: 90px;
        padding-top: 15px;
        padding-bottom: 15px;
        border-width: 1px;
        border-color: #48c9bf;
        border-radius: 10px;
        outline: none;
    }

    .input-img {
        position: absolute;
        top: 25px;
        left: 25px;
        width: 60px;
        height: 60px;
    }

    .input-login {
        height: 80px;
        width: 550px;
        background-color: #48c9bf;
        border-radius: 10px;
        margin-top: 40px;
    }

    .input-login-text {
        height: 80px;
        width: 550px;
        text-align: center;
        line-height: 80px;
        color: #FFFFFF;
        font-size: 35px;
    }

    .input-forget {
        position: absolute;
        left: 30px;
        font-size: 30px;
    }

    .input-register {
        position: absolute;
        right: 30px;
        font-size: 30px;
    }

    .input-box {
        font-size: 30px;
        top: 10px;
        height: 30px;
        width: 30px;
    }

    .input-text {
        position: absolute;
        left: 120px;
        top: 5px;
    }

    .border_bottom {
        border-top-style: solid;
        border-top-width: 1px;
        border-top-color: #e6e6e6;
    }

    .drop-down-item {
        padding: 25px;
    }
</style>
