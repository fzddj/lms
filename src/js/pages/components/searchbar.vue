<template>
    <div>
        <div :class="['wxc-search-bar','wxc-search-bar-'+theme]"
             :style="barStyle"
             v-if="mod==='default'">
            <input @blur="onBlur"
                   @focus="onFocus"
                   @input="onInput"
                   @return="onSubmit"
                   :autofocus="autofocus"
                   :disabled="disabled"
                   :value="value"
                   ref="search-input"
                   :type="inputType"
                   :placeholder="placeholder"
                   :style="{ width: '540px' }"
                   :class="['search-bar-input','search-bar-input-'+theme]"/>
            <image class="search-bar-icon"
                   :aria-hidden="true"
                   :src="inputIcon"></image>
            <image class="search-bar-close"
                   v-if="showClose"
                   :aria-hidden="true"
                   @click="closeClicked"
                   :src="closeIcon"></image>
            <text :class="['search-bar-button','search-bar-button-'+theme]"
                  :style="buttonStyle"
                  v-if="needShowCancel"
                  @click="cancelClicked">{{cancelLabel}}</text>
        </div>
    </div>
</template>

<style scoped>
    .wxc-search-bar {
        padding-left: 20px;
        padding-right: 20px;
        /*background-color: #ffffff;*/
        background-color: #e5e5e5;
        width: 670px;
        height: 84px;
        flex-direction: row;
    }

    .wxc-search-bar-yellow {
        background-color: #ffc900;
    }

    .search-bar-input {
        position: absolute;
        top: 10px;
        padding-top: 0;
        padding-bottom: 0;
        padding-right: 40px;
        padding-left: 60px;
        font-size: 26px;
        width: 624px;
        height: 64px;
        line-height: 64px;
        /*background-color: #E5E5E5;*/
        background-color: #ffffff;
        border-radius: 6px;
    }

    .search-bar-input-yellow {
        background-color: #fff6d6;
    }

    .search-bar-icon {
        position: absolute;
        width: 30px;
        height: 30px;
        left: 34px;
        top: 28px;
    }

    .search-bar-close {
        position: absolute;
        width: 30px;
        height: 30px;
        right: 130px;
        top: 28px;
    }

    .search-bar-button {
        width: 94px;
        height: 36px;
        font-size: 30px;
        text-align: center;
        /*background-color: #ffffff;*/
        background-color: #E5E5E5;
        margin-top: 16px;
        margin-right: 0;
        color: #48c9bf;
        position: absolute;
        right: 0px;
        top: 9px;
    }

    .search-bar-button-yellow {
        background-color: #FFC900;
    }

    .input-has-dep {
        padding-left: 240px;
        width: 610px;
    }

    .bar-dep {
        width: 170px;
        padding-right: 12px;
        padding-left: 12px;
        height: 42px;
        align-items: center;
        flex-direction: row;
        position: absolute;
        left: 24px;
        top: 22px;
        border-right-style: solid;
        border-right-width: 1px;
        border-right-color: #C7C7C7;
    }

    .bar-dep-yellow {
        border-right-color: #C7C7C7;
    }

    .dep-text {
        flex: 1;
        text-align: center;
        font-size: 26px;
        color: #666666;
        margin-right: 6px;
        lines: 1;
        text-overflow: ellipsis;
    }

    .dep-arrow {
        width: 24px;
        height: 24px;
    }

    .icon-has-dep {
        left: 214px;
    }

    .disabled-input {
        width: 600px;
        height: 64px;
        position: absolute;
        left: 0;
        background-color: transparent;
    }

    .has-dep-disabled {
        width: 550px;
        left: 200px;
    }
</style>

<script>
    export default {
        name: "searchbar",
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            alwaysShowCancel: {
                type: Boolean,
                default: false
            },
            inputType: {
                type: String,
                default: 'text'
            },
            mod: {
                type: String,
                default: 'default'
            },
            autofocus: {
                type: Boolean,
                default: false
            },
            theme: {
                type: String,
                default: 'gray'
            },
            barStyle: {
                type: Object,
                default: () => ({})
            },
            defaultValue: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: '搜索客户'
            },
            cancelLabel: {
                type: String,
                default: '筛选 '
            },
            depName: {
                type: String,
                default: '杭州'
            }
        },
        computed: {
            needShowCancel () {
                return this.alwaysShowCancel || this.showCancel;
            },
            buttonStyle () {
                const { barStyle } = this;
                if (barStyle.backgroundColor) {
                    return {backgroundColor:barStyle.backgroundColor}
                }
                return {}
            }
        },
        data: () => ({
            inputIcon: "https://gw.alicdn.com/tfs/TB1FZB.pwMPMeJjy1XdXXasrXXa-30-30.png",
            closeIcon: "https://gw.alicdn.com/tfs/TB1sZB.pwMPMeJjy1XdXXasrXXa-24-24.png",
            arrowIcon: "https://gw.alicdn.com/tfs/TB1vZB.pwMPMeJjy1XdXXasrXXa-24-24.png",
            showCancel: true,
            showClose: false,
            value: ''

        }),
        created () {
            this.defaultValue && (this.value = this.defaultValue);
            if (this.disabled) {
                this.showCancel = false;
                this.showClose = false;
            }
            this.showCancel = true;
            this.showClose = false;
        },
        methods: {
            onBlur () {
                const self = this;
                setTimeout(() => {
                    self.showCancel = true;
                    self.detectShowClose();
                    self.$emit('wxcSearchbarInputOnBlur', { value: self.value });
                }, 10);
            },
            autoBlur () {
                this.$refs['search-input'].blur();
            },
            onFocus () {
                if (this.isDisabled) {
                    return;
                }
                this.showCancel = true;
                this.detectShowClose();
                this.$emit('wxcSearchbarInputOnFocus', { value: this.value });
            },
            closeClicked () {
                this.value = '';
                // this.showCancel && (this.showCancel = false);
                // this.showClose && (this.showClose = false);
                this.$emit('wxcSearchbarCloseClicked', { value: this.value });
                this.$emit('wxcSearchbarInputOnInput', { value: this.value });
            },
            onInput (e) {
                this.value = e.value;
                this.showCancel = true;
                this.detectShowClose();
                this.$emit('wxcSearchbarInputOnInput', { value: this.value });
            },
            onSubmit (e) {
                this.onBlur();
                this.value = e.value;
                this.showCancel = true;
                this.detectShowClose();
                this.$emit('wxcSearchbarInputReturned', { value: this.value });
            },
            cancelClicked () {
                // this.showCancel && (this.showCancel = false);
                // this.showClose && (this.showClose = false);
                this.$emit('wxcSearchbarCancelClicked', { value: this.value });
            },
            detectShowClose () {
                this.showClose = (this.value.length > 0) && this.showCancel;
            },
            depClicked () {
                this.$emit('wxcSearchbarDepChooseClicked', {});
            },
            inputDisabledClicked () {
                this.$emit('wxcSearchbarInputDisabledClicked', {});
            },
            setValue (value) {
                this.value = value;
            }
        }
    };
</script>