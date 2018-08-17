<!--Created by Spades<spadesge@gmail.com> on 18/07/13-->
<template>
    <div class="header">
        <router-link to="/" class="toHome">{{struct[lang].name}}</router-link>
        <span class="nav">
            <router-link to="/list/0" class="item">{{struct[lang].rent}}</router-link>
            <router-link to="/list/1" class="item">{{struct[lang].sale}}</router-link>
            <router-link to="/guide" class="item">{{struct[lang].guide}}</router-link>
            <router-link to="/about" class="item">{{struct[lang].about}}</router-link>
        </span>
        <div class="lang">
            <span class="item" :class="{active:lang==='zh'}" @click="changeLang('zh')">中文</span>
            <span>/</span>
            <span class="item" :class="{active:lang==='en'}" @click="changeLang('en')">English</span>
            <span>/</span>
            <span class="item" :class="{active:lang==='jp'}" @click="changeLang('jp')">Japanese</span>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'

    export default {
        name: 'Header',
        computed: {
            ...mapState({
                lang: state => state.Lang.lang,
                struct: state => state.struct
            })
        },
        methods: {
            changeLang(lang) {
                this.$store.dispatch('langChange', lang)
            }
        }
    }

</script>
<style lang="scss" scoped>
    .header {
        position: fixed;
        top: 0;
        z-index: 9000;
        height: 65px;
        width: 100%;
        line-height: 65px;
        background: #dbdcdc;
        .toHome {
            margin-left: 1rem;
            color: #707070;
            text-decoration: none;
        }
        .lang {
            float: right;
            margin-right: 3rem;
            font-size: 0.7rem;
            color: #707070;
            .active {
                color: #000;
                font-weight: 700;
            }
            .item {
                cursor: pointer;
                &:hover {
                    color: #000;
                }
            }
        }
        .nav {
            margin-left: 1rem;
            .item {
                margin-left: 1rem;
                font-size: 0.8rem;
                color: #777777;
                text-decoration: none;
                &:hover {
                    color: #000;
                }
            }
        }
    }

    @media (max-width: 1000px) {
        .nav {
            display: none;
        }
    }

    @media (max-width: 575px) {
        .header {
            min-width: 360px;
            .toHome {
                margin-left: 0.5rem;
            }
            .lang {
                margin-right: 0.5rem;
            }
            .nav {
                display: none;
            }
        }
    }


</style>