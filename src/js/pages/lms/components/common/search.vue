<template>
    <div>
        <!--<div class="search">-->
            <!--<wxc-searchbar ref="wxc-searchbar"-->
                           <!--:disabled="false"-->
                           <!--@wxcSearchbarCancelClicked="wxcSearchbarCancelClicked"-->
                           <!--@wxcSearchbarInputReturned="wxcSearchbarInputReturned"-->
                           <!--@wxcSearchbarInputOnInput="wxcSearchbarInputOnInput"-->
                           <!--@wxcSearchbarCloseClicked="wxcSearchbarCloseClicked"-->
                           <!--@wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus"-->
                           <!--@wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"></wxc-searchbar>-->
        <!--</div>-->
        <div>
            <!--<text class="iconfont add-text">&#xe602;</text>-->
            <!--<popsover ref="wxc-popover2"-->
                      <!--:buttons="btns"-->
                      <!--:position="popoverPosition"-->
                      <!--:arrowPosition="popoverArrowPosition"-->
                      <!--@wxcPopoverButtonClicked="popoverButtonClicked"></popsover>-->
            <wxc-minibar @wxcMinibarRightButtonClicked="minibarRightButtonClick"
                         right-text="..."></wxc-minibar>
            <wxc-popover ref="wxc-popover"
                         :buttons="btns"
                         :position="popoverPosition"
                         :arrowPosition="popoverArrowPosition"
                         @wxcPopoverButtonClicked="popoverButtonClicked"></wxc-popover>

            <!--<wxc-popover ref="wxc-popover2"-->
                         <!--:buttons="btns"-->
                         <!--:position="popoverPosition"-->
                         <!--:arrowPosition="popoverArrowPosition"-->
                         <!--@wxcPopoverButtonClicked="popoverButtonClicked"></wxc-popover>-->
        </div>
    </div>
</template>

<script>
    import { WxcButton,WxcMinibar,WxcPopover } from 'weex-ui'
    //import searchbar from './searchbar'
    import Popup from "./popup";
    import popsover from "./popsover";
    const modal = weex.requireModule('modal');

    export default {
        name: "search",
        components: {
            popsover,
            Popup,
            //'wxc-searchbar':searchbar,
            WxcMinibar,
            WxcButton,
            WxcPopover
        },
        props:{
            positionListInfo: {
                type: Object,
                default: () => ({
                    x: 0,
                    y: 0
                })
            }
        },
        data: () => ({
            value: '',
            showCancel: true,
            isDisabled: true,
            btns:[
                {
                    text:'新增线索',
                    key:'addClue'
                },
                {
                    text:'新增客户',
                    key:'addCustomer'
                },
                {
                    text:'从通讯录导入',
                    key:'import'
                },
            ],
            popoverPosition:{x:-15,y:75},
            popoverArrowPosition:{pos:'top',x:-15}
        }),
        created () {
            //this.popoverPosition = this.positionListInfo;
        },
        methods: {
            setValue () {
                //this.$refs['wxc-searchbar'].setValue();
            },
            wxcSearchbarInputOnFocus () {
                console.log("11111");
            },
            wxcSearchbarInputOnBlur () {

            },
            wxcSearchbarCloseClicked () {

            },
            wxcSearchbarInputOnInput (e) {
                this.value = e.value;
            },
            wxcSearchbarCancelClicked () {
                console.log('search',this.value);
            },
            wxcSearchbarInputDisabledClicked () {

            },
            wxcSearchbarDepChooseClicked () {

            },
            wxcSearchbarInputReturned() {

            },
            popoverButtonClicked (obj) {
                // if (obj.key == "addClue") {
                //     this.jump("addClue");
                // } else if (obj.key == "addCustomer") {
                //     this.jump("addCustomer");
                // } else if (obj.key == "import") {
                //
                // }
                // modal.toast({ 'message': `key:${obj.key}, index:${obj.index}`, 'duration': 1 });
            },
            minibarRightButtonClick () {
                this.$refs['wxc-popover'].wxcPopoverShow();
            },
            // wxcButtonClicked (ref='wxc-popover2') {
            //
            //     this.$refs[ref].wxcPopoverShow();
            // }

        }
    }
</script>

<style scoped>
    .iconfont {
        font-family:iconfont;
    }
    .wxc-search {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #E5E5E5;
    }
    .search {
        position: absolute;
        width: 750px;
        height: 95px;
        background-color: #E5E5E5;
    }
    .add {
        position: absolute;
        left: 680px;
        width: 60px;
        height: 60px;
        top: 20px;
        background-color: #E5E5E5;
    }
    .add-text {
        font-size: 38px;
        padding-top: 2px;
        padding-bottom: 2px;
        padding-left: 2px;
        padding-right: 2px;
    }
</style>