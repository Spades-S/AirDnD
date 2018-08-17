<!-- Created by Spades<spadesge@gmail.com> on 18/05/23-->
<template>
    <div class="container">
        <img class="cover" :src="data.cover.url" alt="正面图片">
        <div class="price" v-if="notInGuide">{{data.info[lang].price}}</div>
        <div class="name" v-if="notInGuide">{{data.info[lang].name}}</div>
        <div class="intro" :class="{inGuide:!notInGuide}">{{data.info[lang].intro}}</div>
    </div>
</template>
<script>
    export default {
        name: 'Card',
        props: {
            data: {
                require: true
            },
            lang: {
                require: true
            },
            notInGuide: {
                default: true
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        height: 100%;
        width: 100%;
        font-size: 0.75rem;
        line-height: 24px;
        text-align: left;
        .cover {
            width: 100%;
            height: 180px;
            border:1px solid rgba(187, 187, 187, 0.55);
        }
        .price {
            padding-left: 0px;
            font-weight: 400;
            color: #789d91;
            vertical-align: top;
        }
        .name {
            display: inline-block;
            overflow: hidden;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: top;
        }
        .intro {
            overflow: hidden;
            width: 100%;
            font-size: 0.7rem;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #949494;
            &.inGuide {
                white-space: normal;
            }
        }
    }
</style>
