<template>
    <div class="container">
        <my-header></my-header>
        <div class="content" if="res">
            <div class="aside">
                <div class="price">{{info[lang].price}}</div>
                <div class="conduct">
                    <div class="title">联系我们</div>
                    <a class="phone" :href="'tel:'+ info[lang].phone">{{info[lang].phone}}</a>
                </div>
                <div class="intro">{{info[lang].intro}}</div>

            </div>
            <div class="main">
                <el-carousel class="carousel" height="500px" v-if="imgs.length>0">
                    <el-carousel-item v-for="item in imgs"
                                      :key="item.url" class="c-item">
                        <img :src="item.url" alt="图片" class="img">
                    </el-carousel-item>
                </el-carousel>
                <div class="name">{{info[lang].name}}</div>
                <div class="addr">{{info[lang].addr}}</div>
                <div class="info">
                    <span class="house item">{{info[lang].rentInfo.house}}</span>
                    <span class="person item">{{info[lang].rentInfo.person}}</span>
                    <span class="bed item">{{info[lang].rentInfo.bed}}</span>
                </div>
                <div class="inner">
                    <div class="key">{{struct[lang].inner}}</div>
                    <div class="value">{{info[lang].inner}}</div>
                </div>
                <div class="transport">
                    <div class="key">{{struct[lang].transport}}</div>
                    <div class="value">{{info[lang].transport}}</div>
                </div>
                <div class="around">
                    <div class="key">{{struct[lang].around}}</div>
                    <div class="value">{{info[lang].around}}</div>
                </div>
                <div class="facility">
                    <div class="key">{{struct[lang].facility}}</div>
                    <div class="value">{{info[lang].facility}}</div>
                </div>
                <div class="notes">
                    <div class="key">{{struct[lang].notes}}</div>
                    <div class="value">{{info[lang].notes}}</div>
                </div>
                <div id="vedio" v-if="vedio.url"></div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    /* eslint-disable import/extensions */
    import Chimee from 'chimee'

    import Header from './__partial/Header.vue'
    import Footer from './__partial/Footer.vue'

    let chimee = null
    export default {
        name: 'RentDetail',
        components: {
            myHeader: Header,
            myFooter: Footer
        },
        data() {
            return {
                struct: {
                    zh: {
                        inner: '内部情况',
                        transport: '交通情况',
                        around: '周边情况',
                        facility: '配套设施',
                        notes: '入住须知',
                        conduct: '联系我们'
                    },
                    en: {
                        inner: 'internal situation',
                        transport: 'traffic conditions',
                        around: 'around',
                        facility: 'supporting facility',
                        notes: 'notice',
                        conduct: 'conduct'
                    },
                    jp: {
                        inner: '裏がわ',
                        transport: 'とらふぃっく',
                        around: 'しゅう',
                        facility: 'しせつ',
                        notes: 'ビッキーズ',
                        conduct: 'テレフォン'
                    }
                },
                cover: { url: '' },
                imgs: [],
                vedio: { url: '' },
                info: {
                    zh: {
                        addr: '地址',
                        name: '名字',
                        intro: '简介',
                        inner: '',
                        transport: '',
                        around: '',
                        facility: '',
                        notes: '',
                        phone: '电话',
                        price: '价格',
                        rentInfo: {
                            house: '出租形式',
                            person: '宜住人数',
                            bed: '床铺数量'
                        }
                    },
                    en: {
                        addr: 'address',
                        name: 'name',
                        intro: 'introduction',
                        inner: '',
                        transport: '',
                        around: '',
                        facility: '',
                        notes: '',
                        phone: 'phone',
                        price: 'price',
                        rentInfo: {
                            house: 'house',
                            person: 'person',
                            bed: 'bed'
                        }

                    },
                    jp: {
                        addr: 'アド',
                        name: 'にじ',
                        intro: 'プロフ帐',
                        inner: '',
                        transport: '',
                        around: '',
                        facility: '',
                        notes: '',
                        phone: 'テレフォン',
                        price: 'たか',
                        rentInfo: {
                            house: 'レンタルフォーム',
                            person: '人数',
                            bed: 'ベッド'
                        }
                    }
                }
            }
        },
        created() {
            this.$api.rent.fetch(this.$route.params.id)
                .then((res) => {
                    this.cover = res.data.cover
                    this.imgs = res.data.imgs
                    this.vedio = res.data.vedio
                    this.info = res.data.info
                    if (res.data.vedio.url) {
                        chimee = new Chimee({
                            wrapper: '#vedio',
                            controls: true,
                            autoplay: true
                        })
                        chimee.load(res.data.vedio.url)
                    }
                })
        },
        computed: {
            ...mapState({
                lang: state => state.Lang.lang
            })
        }
    }
</script>
<style lang="scss" scoped>
    $borderColor: #dbdbdb;
    .container {
        height: 100%;
    }

    .content {
        margin: 0 auto;
        width: 1120px;
        min-height: calc(100% - 210px);
        padding-top: 85px;
        .main {
            width: 800px;
            margin-right: 480px;
            .carousel {
                overflow: hidden;
                width: 800px;
                .el-carousel__container {
                    height: 500px;
                }

                .img {
                    width: 100%;
                    height: 500px;
                }
            }
            .name {
                border-top: 1px solid $borderColor;
                margin-top: 2rem;
                padding: 1rem 0.3rem 0;
                font-size: 1.2rem;
            }
            .addr {
                margin-top: 0.3rem;
                padding-left: 0.3rem;
                padding-bottom: 1rem;
                font-size: 0.75rem;
                color: #a4a4a4;
            }
            .info {
                border-bottom: 1px solid $borderColor;
                padding-left: 0.3rem;
                padding-bottom: 1rem;
                font-size: 0.7rem;
                line-height: 1rem;
                .house:before,
                .person:before,
                .bed:before {
                    content: '';
                    display: inline-block;
                    margin-right: 0.3rem;
                    width: 1rem;
                    height: 1rem;
                    background: url(../assets/images/house.svg) center/1rem 1rem no-repeat;
                    vertical-align: text-bottom;
                }
                .person:before {
                    background: url(../assets/images/person.svg) center/1rem 1rem no-repeat;
                }
                .bed:before {
                    background: url(../assets/images/bed.svg) center/1rem 1rem no-repeat;
                }
                .item {
                    margin-right: 1.5rem;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }

            .inner,
            .transport,
            .around,
            .facility,
            .notes {
                margin-top: 2rem;
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
            #vedio {
                margin-top: 2rem;
            }
        }

        .aside {
            float: right;
            width: 300px;
            height: 400px;
            border: 1px solid $borderColor;
            .price {
                border-bottom: 1px solid $borderColor;
                margin: 1rem;
                padding-bottom: 0.7rem;
                font-weight: 700;
                color: #9e6767;
                & .unit {
                    font-size: 0.7rem;
                }

            }
            .conduct {
                margin: 1rem;
                padding-left: 0.1rem;
                padding-bottom: 0.7rem;
                border-bottom: 1px solid $borderColor;
                .title {
                    font-size: 0.8rem;
                    color: #9e6767;
                }
                .phone {
                    display: block;
                    margin-top: 0.4rem;
                    font-size: 0.8rem;
                    line-height: 1.5rem;
                    color: #9e6767;
                    text-decoration: none;
                    &:before {
                        content: '';
                        display: inline-block;
                        margin-right: 0.2rem;
                        width: 1.5rem;
                        height: 1.5rem;
                        background: url(../assets/images/phone.svg) center/1.5rem 1.5rem no-repeat;
                        vertical-align: middle;
                    }
                }

            }
            .intro {
                display: -webkit-box;
                overflow: hidden;
                margin: 1rem;
                height: 180px;
                font-size: 0.7rem;
                -ms-text-overflow: ellipsis;
                -webkit-line-clamp: 9; //显示的行数
                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
                color: grey;

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
                padding-left: 0.5rem;
            }
            .lang {
                margin-right: 0.5rem;
            }
        }
        .content {
            width: 100%;
            .main {
                margin: 0 auto;
                width: 90%;
                .carousel {
                    width: 100%;
                    height: 250px !important;
                    .img {
                        height: 250px;
                    }
                }
            }
            .aside {
                position: fixed;
                z-index: 10000;
                padding-top: 0.5rem;
                bottom: 0;
                width: 100%;
                height: 60px;
                border: none;
                background: #c5cad4;
                text-align: center;
                .price, .conduct {
                    margin: 0;
                    display: inline-block;
                    border: none;
                }
                .conduct {
                    margin-left: 1rem;
                    .title {
                        display: none;
                    }
                }
                .intro {
                    display: none;
                }

            }
        }
        footer {
            padding-bottom: 70px;
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
