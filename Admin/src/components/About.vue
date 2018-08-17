<template>
    <div>
        <my-header></my-header>
        <div class="container" :class="{hasEditBox: isEBActive}">
            <div class="btn">
                <el-row>
                    <el-button type="primary" icon="el-icon-edit" circle @click="edit"
                               :class="{inactive:!editable}"></el-button>
                    <el-button type="success" icon="el-icon-check" circle @click="check"
                               :class="{nothingToSubmit:!toSubmit}" :disabled="!toSubmit"></el-button>
                </el-row>
            </div>
            <div class="name">{{struct[lang].name}}</div>
            <div class="info">
                <span class="rent item">{{struct[lang].rent}}</span>
                <span class="sale item">{{struct[lang].sale}}</span>
            </div>
            <div class="about">
                <div class="key">{{struct[lang].name}}</div>
                <my-div class="value" :editable="editable" v-model="info[lang].about"></my-div>
            </div>
            <div class="card-list">
                <template v-for="card in services">
                    <div class="card-wrapper" @click="showEB(card)">
                        <my-card :data="card" :lang="lang" :notInGuide="false"></my-card>
                    </div>
                </template>
            </div>
            <el-button size="small" type="primary" class="btn-add" :class="{inactive:!editable}"
                       @click="addServiceItem(10)" :disabled="!editable">Add Item
            </el-button>

            <div class="editBox" v-if="isEBActive">
                <myAboutItemEB :data="EBdata" v-on:closeEB="closeEB" :isNewItem="isNewServiceItem"></myAboutItemEB>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import axios from 'axios'

    import Card from './__partial/Card.vue'
    import EditableDiv from './__partial/EditableDiv.vue'
    import Footer from './__partial/Footer.vue'
    import Header from './__partial/Header.vue'

    import { axiosBaseURL } from '../../config'

    import AboutItemEB from './__partial/ServiceItemEditBox.vue'

    axios.defaults.baseURL = axiosBaseURL


    export default {
        name: 'RentDetail',
        components: {
            myAboutItemEB: AboutItemEB,
            myCard: Card,
            myDiv: EditableDiv,
            myFooter: Footer,
            myHeader: Header
        },
        data() {
            return {
                editable: false,
                isEBActive: false,
                EBdata: {},
                isNewServiceItem: false,
                services: [],
                toSubmit: false,
                struct: {
                    zh: {
                        name: '关于我们',
                        rent: '民宿短租',
                        sale: '民宿出售'
                    },
                    en: {
                        name: 'About us',
                        rent: 'short term rental',
                        sale: 'homes for Sale'
                    },
                    jp: {
                        name: '私たちについて',
                        rent: '短期レンタル',
                        sale: '販売のための家'
                    }
                },
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
        watch: {
            info: {
                deep: true,
                handler() {
                    console.log()
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
            this.getAbout()
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
                axios.put('/about', formdata)
                    .then((res) => {
                        if (res.status === 200) {
                            this.toSubmit = false
                            alert('Update successfully')
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            this.$router.push('/login')
                        } else {
                            alert('Update failed, please try again')
                        }
                    })
            },
            getAbout() {
                axios.get('/about')
                    .then((res) => {
                        if (res.data.length > 0) {
                            this.info = res.data[0].info
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            this.$router.push('/login')
                        }
                    })

                axios.get('/services/about')
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
        height: 100%;
        margin: 0 auto 1rem auto;
        min-height: calc(100% - 375px);
        width: 90%;
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
