<template>
    <div class="label">
        <text class="label-text">{{title}}</text>
    </div>
</template>

<script>
    export default {
        name: "category-label",
        props: {
            title: String
        }
    }
</script>

<style scoped>
    .label {
        margin-top: 10px;
        padding-left: 24px;
        width: 750px;
        height: 68px;
        background-color: #FFFFFF;
        justify-content: center;
    }
    .label-text {
        color: #48c9bf;
        font-weight: 600;
        font-size: 30px;
    }

</style>