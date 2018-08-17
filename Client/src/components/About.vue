<template>
    <div class="container">
        <my-header></my-header>
        <div class="content">
            <div class="main">
                <div class="name">{{struct[lang].about}}</div>
                <div class="info">
                    <span class="rent item">{{struct[lang].rent}}</span>
                    <span class="sale item">{{struct[lang].sale}}</span>
                </div>
                <div class="about">
                    <div class="key">{{struct[lang].about}}</div>
                    <div class="value">{{info[lang].about}}</div>
                </div>
                <div class="card-list">
                    <template v-for="card in services">
                        <div class="card-wrapper">
                            <my-card :data="card" :lang="lang" :notInService="false"></my-card>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import { mapState } from 'vuex'

    import Card from './__partial/Card.vue'
    import Footer from './__partial/Footer.vue'
    import Header from './__partial/Header.vue'

    export default {
        name: 'RentDetail',
        components: {
            myCard: Card,
            myHeader: Header,
            myFooter: Footer
        },
        data() {
            return {
                services: [],
                info: {
                    zh: {
                        about: ''
                    },
                    en: {
                        about: ''
                    },
                    jp: {
                        about: ''
                    }
                }
            }
        },
        computed: {
            ...mapState({
                lang: state => state.Lang.lang,
                struct: state => state.struct
            })
        },
        created() {
            this.$api.service.fetch('about')
                .then((res) => {
                    this.services = res.data
                })
            this.$api.about.fetch().then((res) => {
                if (res.data.length > 0) {
                    this.info = res.data[0].info
                }
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
        padding-top: 65px;
        width: 90%;
        min-height: calc(100% - 210px);
        max-width: 1120px;
        .main {
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
                .rent:before,
                .sale:before {
                    content: '';
                    display: inline-block;
                    margin-right: 0.3rem;
                    width: 1rem;
                    height: 1rem;
                    background: url(../assets/images/hotel.svg) center/1rem 1rem no-repeat;
                    vertical-align: text-bottom;
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

            .about {
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
</style>
