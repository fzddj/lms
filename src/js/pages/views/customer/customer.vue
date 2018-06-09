<template>
    <div>
        <list>
            <cell>
                <search :positionListInfo="positionListInfo"></search>
                <div class="category">
                    <customer-category></customer-category>
                </div>
            </cell>

        </list>
    </div>
</template>

<script>
    import search from '../../components/search';
    import CustomerCategory from "./customerCategory";
    export default {
        name: "customer",
        components: {
            CustomerCategory,
            search
        },
        props: {
        },
        data: () => ({
            positionListInfo:{x:-1515,y:70},
        })
    }
</script>

<style scoped>
    .category{
        top: 90px;
    }
    .iconfont {
        font-family:iconfont;
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
        margin-top: 2px;
        margin-bottom: 2px;
        margin-left: 2px;
        margin-right: 2px;
    }
</style>