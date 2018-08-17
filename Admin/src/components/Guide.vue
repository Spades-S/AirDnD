<template>
    <div>
        <my-header></my-header>
        <div class="container" :class="{hasEditBox: isEBActive}">
            <div class="btn">
                <el-row>
                    <el-button type="primary" icon="el-icon-edit" circle @click="edit"
                               :class="{inactive:!editable}" @edit="edit"></el-button>
                    <el-button type="success" icon="el-icon-check" circle @click="check"
                               :class="{nothingToSubmit:!toSubmit}" :disabled="!toSubmit"></el-button>
                </el-row>
            </div>
            <div class="name">{{struct[lang].name}}</div>
            <div class="info">
                <template v-for="(section,index) in sections">
                    <span :class="section + ' item'" v-if="index<6">{{struct[lang][section]}}</span>
                </template>
                <span class="others item">{{struct[lang].others}}</span>
            </div>
            <template v-for="(section,index) in sections">
                <div :class="section">
                    <div class="key">{{struct[lang][section]}}</div>
                    <my-div class="value" :editable="editable" v-model="info[lang][section]" :key="lang+ section"></my-div>
                    <div class="card-list">
                        <template v-for="card in services[section]">
                            <div class="card-wrapper" @click="showEB(card)">
                                <my-card :data="card" :lang="lang" :notInGuide="false"></my-card>
                            </div>
                        </template>
                    </div>
                    <el-button size="small" type="primary" class="btn-add" :class="{inactive:!editable}"
                               @click="addServiceItem(index)" :disabled="!editable">Add Item
                    </el-button>
                </div>
            </template>
            <div class="editBox" v-if="isEBActive">
                <myGuideItemEB :data="EBdata" v-on:closeEB="closeEB" :isNewItem="isNewServiceItem"></myGuideItemEB>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import axios from 'axios'
    import { mapState } from 'vuex'

    import Card from './__partial/Card.vue'
    import EditableDiv from './__partial/EditableDiv.vue'
    import Footer from './__partial/Footer.vue'
    import GuideItemEditBox from './__partial/ServiceItemEditBox.vue'
    import Header from './__partial/Header.vue'

    import { axiosBaseURL } from '../../config'

    axios.defaults.baseURL = axiosBaseURL

    export default {
        name: 'RentDetail',
        components: {
            myCard: Card,
            myDiv: EditableDiv,
            myFooter: Footer,
            myGuideItemEB: GuideItemEditBox,
            myHeader: Header
        },
        data() {
            return {
                sections: ['hotel', 'driver', 'kimono', 'ticket', 'restaurant', 'performance', 'photos', 'medical', 'estate', 'investment'],
                editable: false,
                isEBActive: false,
                EBdata: {},
                isNewServiceItem: false,
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
                        name: '地接服务',
                        hotel: '酒店预订',
                        kimono: '和服',
                        driver: '司机 | 导游',
                        ticket: '门票预订',
                        restaurant: '餐厅',
                        performance: '表演',
                        medical: '其他',
                        estate: '其他',
                        investment: '其他',
                        photos: '其他',
                        others: '其他'
                    },
                    en: {
                        name: 'Grounding service',
                        hotel: 'Hotel reservation',
                        kimono: 'Kimono',
                        driver: 'Driver | guide',
                        ticket: 'Ticket booking',
                        restaurant: 'restaurant',
                        performance: 'Others',
                        medical: 'Others',
                        estate: 'Others',
                        investment: 'Others',
                        photos: 'Others',
                        others: 'others'
                    },
                    jp: {
                        name: '接地サービス',
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
        watch: {
            info: {
                deep: true,
                handler() {
                    if (this.editable) {
                        this.toSubmit = true
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
            closeEB(hasToReload) {
                this.isEBActive = false
                if (hasToReload) {
                    window.location.reload()
                }
            },
            changeLang(lang) {
                this.$store.dispatch('langChange', lang)
            },
            edit() {
                this.editable = !this.editable
            },
            check() {
                this.editable = false
                const formdata = new FormData()
                formdata.append('info', JSON.stringify(this.info))
                axios.put('/guide', formdata)
                    .then((res) => {
                        if (res.status === 200) {
                            alert('update successfully')
                            this.toSubmit = false
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            this.$router.push('/login')
                        } else {
                            alert('update failed')
                        }
                    })
            },
            getData() {
                axios.get('/guide')
                    .then((res) => {
                        if (!((res.data instanceof Array) && res.data.length === 0)) {
                            this.info = res.data[0].info
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            this.$router.push('/login')
                        }
                    })
                axios.get('/services/guide')
                    .then((res) => {
                        this.services = res.data
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            this.$router.push('/login')
                        }
                    })
            },
            showEB(data) {
                this.isEBActive = true
                this.isNewServiceItem = false
                this.EBdata = data
            },
            addServiceItem(type) {
                this.isEBActive = true
                this.isNewServiceItem = true
                this.EBdata = {
                    type,
                    cover: { url: '' },
                    info: {
                        zh: {
                            intro: ''
                        },
                        en: {
                            intro: ''
                        },
                        jp: {
                            intro: ''
                        }
                    }
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    $borderColor: #dbdbdb;
    .container {
        position: relative;
        margin: 0px auto 1rem auto;
        min-height: calc(100% - 375px);
        max-width: 1120px;
        &.hasEditBox {
            height: 200px;
            overflow: hidden;
        }
        .btn {
            position: fixed;
            top: 85px;
            padding-top: 10px;
            height: 60px;
            width: 100%;
            background: #fff;
            z-index: 1000;
            .inactive,
            .nothingToSubmit {
                background: grey;
                border-color: grey;
            }
            .nothingToSubmit {
                cursor: not-allowed;
            }
        }
        .btn-add {
            margin-top: 1rem;
            &.inactive {
                background: grey;
                border-color: grey;
                cursor: not-allowed;
            }
        }
        .name {
            padding: 4rem 0.3rem 0;
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
                font-weight: 500;
                line-height: 1.5rem;
                white-space: pre-line;
                background: #cfd6e18c;
                color: #8696aa;
            }
        }
        .card-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin-top: 1rem;
            .card-wrapper {
                flex: 0 0 300px;
                margin-right: 2rem;
                width: 300px;
                cursor: pointer;
            }
        }
        .editBox {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: #252525f0;
            z-index: 10000;
        }
    }

</style>
