<!-- Created by Spades<spadesge@gmail.com> on 18/05/23-->

<template>
    <div class="container">
        <header>
            <div class="content">
                <div class="lang">
                    <span class="item" :class="{active:lang==='zh'}" @click="changeLang('zh')">中文</span>
                    <span>/</span>
                    <span class="item" :class="{active:lang==='en'}" @click="changeLang('en')">English</span>
                    <span>/</span>
                    <span class="item" :class="{active:lang==='jp'}" @click="changeLang('jp')">Japanese</span>
                </div>
                <div class="title">{{struct[lang].name}}</div>
                <div class="slogen">{{struct[lang].slogan}}</div>
                <nav>
                    <router-link to="/list/0" class="nav-item">{{struct[lang].rent}}</router-link>
                    <router-link to="/list/1" class="nav-item">{{struct[lang].sale}}</router-link>
                    <router-link to="guide" class="nav-item">{{struct[lang].guide}}</router-link>
                    <router-link to="about" class="nav-item">{{struct[lang].about}}</router-link>
                </nav>
            </div>
        </header>
        <main>
            <div class="rental">
                <div class="subtitle">
                    <div class="short">FOR RENT</div>
                    <div class="big">{{struct[lang].rent}}</div>
                </div>
                <div class="card-list" v-if="rent.length>0">
                    <template v-for="data in rent">
                        <router-link :to="'/rent/'+ data.id" class="card-item-wrapper">
                            <my-card class="card" :data="data" :lang="lang"></my-card>
                        </router-link>
                    </template>
                </div>
                <router-link class="more" to="/list/0">MORE</router-link>
            </div>
            <div class="sale">
                <div class="subtitle">
                    <div class="short">FOR SALE</div>
                    <div class="big">{{struct[lang].sale}}</div>
                </div>
                <div class="card-list" v-if="sale.length>0">
                    <template v-for="data in sale">
                        <router-link :to="'/sale/'+ data.id" class="card-item-wrapper">
                            <my-card class="card" :data="data" :lang="lang"></my-card>
                        </router-link>
                    </template>
                </div>
                <router-link class="more" to="/list/1">MORE</router-link>
            </div>
        </main>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import Card from './__partial/Card.vue'
    import Footer from './__partial/Footer.vue'

    export default {
        name: 'Index',
        components: {
            myCard: Card,
            myFooter: Footer
        },
        data() {
            return {
                rent: [],
                sale: []
            }
        },
        computed: {
            ...mapState({
                lang: state => state.Lang.lang,
                struct: state => state.struct
            })
        },
        created() {
            this.$api.list.getPageContent(0, 1)
                .then((res) => {
                    this.rent = res.data
                })
            this.$api.list.getPageContent(1, 1)
                .then((res) => {
                    this.sale = res.data
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

    header {
        position: relative;
        width: 100%;
        height: 370px;
        background: url(../assets/images/headerbg.png) center 9%/cover no-repeat;
        .lang {
            position: absolute;
            left: 2rem;
            top: 3rem;
            font-size: 0.7rem;
            color: #a6a6a6;
            .active {
                color: #fff;
            }
            .item {
                cursor: pointer;
                &:hover {
                    color: #fff;
                }
            }

        }
        .content {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.23);
            color: #fff;
            text-align: center;
            .title {
                padding-top: 70px;
                font-size: 1.7rem;
                font-weight: 400;
                letter-spacing: 2px;
            }
            .slogen {
                margin-top: 50px;
            }
            nav {
                font-size: 0;
                margin-top: 4rem;
            }
            .nav-item {
                display: inline-block;
                border-right: 1px solid #dfdfdf;
                height: 2rem;
                width: 8rem;
                line-height: 2rem;
                background: #fff;
                font-size: 0.7rem;
                color: #909090;
                text-decoration: none;
                &:hover {
                    background: #ececec;
                }
                &:last-child {
                    border-right: none;
                }
            }
        }
    }

    main {
        width: 900px;
        margin: 0 auto;
        .card-list {
            display: flex;
            flex-wrap: wrap;
            text-align: left;
        }
        .card-item-wrapper {
            display: inline-block;
            margin-top: 2.5rem;
            margin-right: 45px;
            width: 270px;
            height: 285px;
            text-decoration: none;
            color: #000;
            &:nth-of-type(3n) {
                margin-right: 0;
            }
        }

        .rental, .sale {
            margin-top: 3rem;
            text-align: center;
            .subtitle {
                font-size: 0.8rem;
                font-weight: 400;
                color: #b2b2b2;
                .big {
                    margin-top: 8px;
                    font-size: 1rem;
                    color: #767676;
                }

            }
        }
        .sale {
            margin-top: 5rem;
        }

        .more {
            display: inline-block;
            border: 1px solid #b2b2b2;
            border-radius: 4px;
            margin-top: 1.5rem;
            width: 140px;
            height: 35px;
            font-size: 0.8rem;
            line-height: 35px;
            text-decoration: none;
            color: #b2b2b2;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            &:hover {
                border-color: #8e8e8e;
                color: #8e8e8e;
            }

        }
    }

    @media (max-width: 575px) {
        header {
            .content {
                .title {
                    padding-top: 60px;
                    font-size: 1rem;
                }
                .lang {
                    left: 0;
                    right: 0;
                    top: 7rem;
                    font-size: 0.8rem;
                    color: #4c3434;

                }
                .slogen {
                    display: none;
                }
                .nav-item:nth-of-type(n + 2) {
                    margin-top: 1rem;
                }
            }

        }
        main {
            width: 100%;
            margin: 0 auto;
            .card-item-wrapper {
                width: 85%;
                margin: 2.5rem auto 0;
                &:nth-of-type(3n) {
                    margin-right: auto;
                }
            }
        }

    }


</style>