<!-- Created by Spades<spadesge@gmail.com> on 18/05/23-->

<template>
    <div class="container">
        <my-header></my-header>
        <div class="main">
            <div class="rental">
                <div class="subtitle">
                    <div class="short">{{title[$route.params.type].short}}</div>
                    <div class="big">{{title[$route.params.type].big[lang]}}</div>
                </div>
                <div class="card-list">
                    <template v-for="data in res">
                        <router-link :to="'/'+basepath[$route.params.type]+'/'+ data.id" class="card-item-wrapper">
                            <my-card class="card" :data="data"></my-card>
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
    import Header from './__partial/Header.vue'
    import Footer from './__partial/Footer.vue'

    export default {
        name: 'Index',
        components: {
            myCard: Card,
            myFooter: Footer,
            myHeader: Header
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
    .container {
        height: 100%;
    }

    .main {
        width: 900px;
        min-height: 580px;
        min-height: calc(100% - 210px);
        margin: 0 auto;
        padding-top: 65px;
        overflow: hidden;
        .card-list {
            display: flex;
            flex-wrap: wrap;
            text-align: left;
        }
        .card-item-wrapper {
            display: inline-block;
            width: 270px;
            height: 250px;
            margin-top: 2.5rem;
            margin-right: 45px;
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
        .pagination {
            margin-top: 3rem;
            text-align: center;
        }
    }

    @media (max-width: 575px) {
        .main {
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