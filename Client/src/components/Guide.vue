<template>
    <div class="container">
        <my-header></my-header>
        <div class="content">
            <main>
                <div class="name">{{struct[lang].guide}}</div>
                <div class="info">
                    <template v-for="(section, index) in sections">
                        <span :class="section+' item'" v-if="index<6">{{struct[lang][section]}}</span>
                    </template>
                    <span class="others item">{{struct[lang].others}}</span>
                </div>

                <template v-for="(section,index) in sections">
                    <div :class="section">
                        <div class="key">{{struct[lang][section]}}</div>
                        <div class="value">{{info[lang][section]}}</div>
                        <div class="card-list">
                            <template v-for="card in services[section]">
                                <div class="card-wrapper">
                                    <my-card :data="card" :lang="lang" :notInService="false"></my-card>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
            </main>
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
        name: 'RentDetail',
        components: {
            myCard: Card,
            myFooter: Footer,
            myHeader: Header
        },
        data() {
            return {
                sections: ['hotel', 'driver', 'kimono', 'ticket', 'restaurant', 'performance', 'photos', 'medical', 'estate', 'investment'],
                editable: false,
                toSubmit: false,
                services: {
                    hotel: [],
                    driver: [],
                    kimono: [],
                    ticket: [],
                    restaurant: [],
                    performance: [],
                    photos: [],
                    medical: [],
                    estate: [],
                    investment: []
                },
                struct: {
                    zh: {
                        hotel: '酒店预订',
                        kimono: '服饰',
                        driver: '司机 | 导游',
                        ticket: '门票预订',
                        restaurant: '餐厅',
                        performance: '其他',
                        medical: '其他',
                        estate: '其他',
                        investment: '其他',
                        photos: '其他',
                        others: '其他'
                    },
                    en: {
                        hotel: 'Hotel reservation',
                        kimono: 'Kimono',
                        driver: 'Driver | guide',
                        ticket: 'Ticket booking',
                        restaurant: 'restaurant',
                        performance: 'others',
                        medical: 'others',
                        estate: 'others',
                        investment: 'otherss',
                        photos: 'others',
                        others: 'others'
                    },
                    jp: {
                        hotel: 'ホテル予約',
                        kimono: 'きりもの',
                        driver: 'ドライバ | ガイド',
                        ticket: 'チケット予約',
                        restaurant: 'ミシュランレストラン',
                        performance: 'その他',
                        medical: 'その他',
                        estate: 'その他',
                        investment: 'その他',
                        photos: 'その他',
                        others: 'その他'
                    }
                },
                info: {
                    zh: {
                        hotel: '',
                        kimono: '',
                        driver: '',
                        ticket: '',
                        restaurant: '',
                        performance: '',
                        medical: '',
                        estate: '',
                        investment: '',
                        photos: ''
                    },
                    en: {
                        hotel: '',
                        kimono: '',
                        driver: '',
                        ticket: '',
                        restaurant: '',
                        performance: '',
                        medical: '',
                        estate: '',
                        investment: '',
                        photos: ''
                    },
                    jp: {
                        hotel: '',
                        kimono: '',
                        driver: '',
                        ticket: '',
                        restaurant: '',
                        performance: '',
                        medical: '',
                        estate: '',
                        investment: '',
                        photos: ''
                    }
                }
            }
        },
        computed: {
            ...mapState({
                lang: state => state.Lang.lang
            })
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                this.$api.guide.fetch()
                    .then((res) => {
                        if (!((Array.isArray(res.data)) && res.data.length === 0)) {
                            this.info = res.data[0].info
                        }
                    })
                this.$api.service.fetch('guide')
                    .then((res) => {
                        this.services = res.data
                    })
            }
        }
    }
</script>
<style lang="scss" scoped>
    $borderColor: #dbdbdb;
    .container {
        height: 100%;
    }

    .content {
        margin: 1rem auto;
        padding-top: 65px;
        min-height: calc(100% - 375px);
        width: 90%;
        max-width: 1120px;
        main {
            .name {
                border-top: 1px solid $borderColor;
                margin-top: 2rem;
                padding: 1rem 0.3rem 0;
                font-size: 1.2rem;
            }
            .info {
                margin-top: 0.3rem;
                border-bottom: 1px solid $borderColor;
                padding-left: 0.3rem;
                padding-bottom: 1rem;
                font-size: 0.7rem;
                line-height: 1rem;
                .hotel:before,
                .kimono:before,
                .ticket:before,
                .driver:before,
                .restaurant:before,
                .performance:before,
                .others:before {
                    content: '';
                    display: inline-block;
                    margin-right: 0.3rem;
                    width: 1rem;
                    height: 1rem;
                    background: url(../assets/images/hotel.svg) center/1rem 1rem no-repeat;
                    vertical-align: text-bottom;
                }
                .kimono:before {
                    background: url(../assets/images/cloth.svg) center/1rem 1rem no-repeat;
                }
                .ticket:before {
                    background: url(../assets/images/ticket.svg) center/1rem 1rem no-repeat;
                }
                .driver:before {
                    background: url(../assets/images/driver.svg) center/1rem 1rem no-repeat;
                }
                .restaurant:before {
                    background: url(../assets/images/restaurant.svg) center/1rem 1rem no-repeat;
                }
                .performance:before {
                    background: url(../assets/images/performance.svg) center/1rem 1rem no-repeat;
                }
                .others:before {
                    background: url(../assets/images/others.svg) center/1rem 1rem no-repeat;
                }
                .item {
                    display: inline-block;
                    margin-top: 1rem;
                    margin-right: 1.5rem;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }

            .hotel,
            .kimono,
            .driver,
            .ticket,
            .restaurant,
            .performance,
            .medical,
            .estate,
            .investment,
            .photos,
            .others {
                margin-top: 3rem;
                .key {
                    padding-left: 0.5rem;
                    font-size: 0.9rem;
                    line-height: 2rem;
                    background: #75839a;
                    color: #fff;
                }
                .value {
                    padding: 0.9rem;
                    font-size: 0.75rem;
                    line-height: 1.5rem;
                    white-space: pre-line;
                    background: rgba(207, 214, 225, 0.5490196078431373);
                    color: #8696aa;
                }
            }
            .card-list {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                margin-top: 1rem;
                .card-wrapper {
                    display: inline-block;
                    flex: 0 0 300px;
                    margin-right: 2rem;
                    margin-top: 0.5rem;
                    width: 300px;
                }
            }
        }

    }

    @media (max-width: 575px) {

        .content main .card-list {
            width: 100%;
            .card-wrapper {
                flex: 1 1 auto;
                margin-right: 0;
            }
        }
    }

</style>
<style lang="scss">
    @media (max-width: 575px) {
        .el-carousel__container {
            height: 250px !important;
        }
    }

    .el-carousel__arrow,
    .el-carousel__arrow:hover {
        background: #5275af;
    }
</style>
