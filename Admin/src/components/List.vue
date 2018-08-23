<!-- Created by Spades<spadesge@gmail.com> on 18/05/23-->

<template>
    <div class="outer-wrapper">
        <my-header></my-header>
        <div class="content-container">
            <div class="btn">
                <el-row>
                    <el-button type="success" icon="el-icon-plus" circle @click="add"></el-button>
                </el-row>
            </div>
            <div class="rental">
                <div class="subtitle">
                    <div class="short">{{title[$route.params.type].short}}</div>
                    <div class="big">{{title[$route.params.type].big[lang]}}</div>
                </div>
                <div class="card-list" :key="$route.params.type" v-if="res.length>0">
                    <template v-for="data in res">
                        <router-link :to="'/'+basepath[$route.params.type]+'/'+ data.id" class="card-item-wrapper">
                            <my-card class="card" :data="data" :lang="lang"></my-card>
                        </router-link>
                    </template>
                </div>
            </div>
            <el-pagination class="pagination"
                           background
                           layout="prev, pager, next"
                           :current-page="currentPage"
                           :page-size="6"
                           :total="total"
                           @current-change="pageChange">
            </el-pagination>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import Card from './__partial/Card.vue'
    import Footer from './__partial/Footer.vue'
    import Heaader from './__partial/Header.vue'

    export default {
        name: 'Index',
        components: {
            myCard: Card,
            myFooter: Footer,
            myHeader: Heaader
        },
        data() {
            return {
                currentPage: 0,
                total: 0,
                title: [{
                    short: 'FOR RENT',
                    big: {
                        zh: '民宿短租',
                        en: 'short term rental',
                        jp: '短期レンタル'
                    }
                }, {
                    short: 'FOR SALE',
                    big: {
                        zh: '民宿出售',
                        en: 'homes for sale',
                        jp: '販売のための家'
                    }
                }],
                res: [],
                basepath: ['rent', 'sale']
            }
        },
        computed: {
            ...mapState({
                lang: state => state.Lang.lang
            })
        },
        watch: {
            /* eslint-disable */
            '$route'(to) {
                if (to.path === '/list/0') {
                    this.getTotalNum()
                    this.getResByPage(1)
                } else if (to.path === '/list/1') {
                    this.getTotalNum()
                    this.getResByPage(1)
                }
            }
        },
        created() {
            this.getTotalNum()
            this.getResByPage(1)
        },
        methods: {
            add() {
                if (this.$route.params.type === '1') {
                    this.$router.push('/new/sale')
                } else {
                    this.$router.push('/new/rent')
                }
            },
            changeLang(lang) {
                this.$store.dispatch('langChange', lang)
            },
            getResByPage(page) {
                this.$api.list.getPageContent(this.$route.params.type, page)
                    .then((res) => {
                        this.currentPage = page
                        this.res = res.data
                    })
            },
            getTotalNum() {
                this.$api.list.countTotalNum(this.$route.params.type)
                    .then((res) => {
                        this.total = res.data.num
                    })
            },
            pageChange(page) {
                this.getResByPage(page)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .outer-wrapper {
        height: 100%;
    }

    .content-container {
        width: 900px;
        min-height: calc(100% - 230px);
        margin: 0 auto;
        overflow: hidden;
        .btn {
            position: fixed;
            top: 85px;
            padding-top: 10px;
            height: 60px;
            width: 100%;
            background: #fff;
            z-index: 1000;
        }
        .card-list {
            display: flex;
            flex-wrap: wrap;
        }
        .card-item-wrapper {
            width: 270px;
            height: 265px;
            margin-top: 2.5rem;
            margin-right: 45px;
            text-decoration: none;
            color: #000;
            &:nth-of-type(3n) {
                margin-right: 0;
            }
        }
        .rental {
            margin-top: 3.5rem;
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
        .pagination {
            margin-top: 3rem;
            text-align: center;
        }
    }

    @media (max-width: 575px) {
        header {
            .toHome {
                padding-left: 1rem;
            }
            .lang {
                margin-right: 1rem;
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