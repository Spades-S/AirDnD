<template>
    <div>
        <my-header></my-header>
        <div class="content-container">
            <div class="btn">
                <el-row>
                    <el-button type="primary" icon="el-icon-edit" circle @click="edit"
                               :class="{inactive:!editable}"></el-button>
                    <el-button type="success" icon="el-icon-check" circle @click="check"
                               :class="{notingToSubmit:!toSubmit}" :disabled="!toSubmit"
                    ></el-button>
                </el-row>
            </div>
            <aside>
                <my-div class="price" v-model="info[lang].price" :editable="editable" :key="lang+'price'"></my-div>
                <div class="conduct">
                    <div class="title">{{struct[lang].conduct}}</div>
                    <my-div class="phone" v-model="info[lang].phone" :editable="editable" :key="lang+'title'"></my-div>
                </div>
                <my-div class="intro" v-model="info[lang].intro" :editable="editable" :key="lang+'intro'"></my-div>
            </aside>
            <main>
                <div>{{struct[lang].cover}}</div>
                <img :src="cover.url" alt="" class="cover" v-if="cover.url">
                <el-upload
                        :disabled="!editable"
                        class="cover-upload"
                        :class="{disabled:!editable}"
                        action=""
                        accept="image/*"
                        :autoUpload="false"
                        :show-file-list="false"
                        :on-change="coverChange"
                        list-type="picture">
                    <el-button size="small" type="primary">select</el-button>
                </el-upload>
                <div>{{struct[lang].imgs}}</div>
                <el-carousel class="carousel" height="500px" v-if="imgs.length>0">
                    <el-carousel-item v-for="item in imgs"
                                      :key="item.url" class="c-item">
                        <img :src="item.url" alt="图片" class="img">
                    </el-carousel-item>
                </el-carousel>
                <el-upload
                        :disabled="!editable"
                        ref="imgUpload"
                        class="img-upload"
                        :class="{disabled:!editable}"
                        action=""
                        accept="image/*"
                        :file-list="imgs"
                        :on-change="imgsChange"
                        :on-remove="imgsRemove"
                        :on-exceed="imgsExceed"
                        :autoUpload="false"
                        :limit="6"
                        list-type="picture">
                    <el-button size="small" type="primary">upload</el-button>
                </el-upload>
                <my-div class="name" v-model="info[lang].name" :editable="editable" :key="lang+'name'"></my-div>
                <my-div class="addr" v-model="info[lang].addr" :editable="editable" :key="lang+'addr'"></my-div>
                <div class="rent-info">
                    <my-div class="house item" v-model="info[lang].rentInfo.house" :editable="editable"
                            :key="lang+'house'"></my-div>
                    <my-div class="person item" v-model="info[lang].rentInfo.person" :editable="editable"
                            :key="lang+'person'"></my-div>
                    <my-div class="bed item" v-model="info[lang].rentInfo.bed" :editable="editable"
                            :key="lang+'bed'"></my-div>
                </div>
                <template v-for="item in itemsToShow">
                    <div :class="item">
                        <div class="key">{{struct[lang][item]}}</div>
                        <my-div class="value" v-model="info[lang][item]" :editable="editable"
                                :key="lang+item"></my-div>
                    </div>
                </template>
                <div>{{struct[lang].vedio}}</div>
                <div id="vedio" v-show="vedio.url"></div>
                <el-upload
                        :disabled="!editable"
                        class="vedio-upload"
                        :class="{disabled:!editable}"
                        action=""
                        accept="vedio/*"
                        :autoUpload="false"
                        :on-change="vedioChange"
                        :show-file-list="false"
                        list-type="picture">
                    <el-button size="small" type="primary">select</el-button>
                </el-upload>
            </main>
            <div class="progress-wrapper" v-show="showProgress">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="percentage"
                             class="progress"></el-progress>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    /* eslint-disable import/extensions */
    import Chimee from 'chimee'

    import EditableDiv from './__partial/EditableDiv.vue'
    import Footer from './__partial/Footer.vue'
    import Header from './__partial/Header.vue'

    let chimee = null
    export default {
        name: 'RentDetail',
        components: {
            myDiv: EditableDiv,
            myFooter: Footer,
            myHeader: Header
        },
        data() {
            return {
                editable: false,
                itemsToShow: ['inner', 'transport', 'around', 'facility', 'notes'],
                showProgress: false,
                percentage: 100,
                struct: {
                    zh: {
                        cover: '封面',
                        imgs: '实拍图片',
                        inner: '内部情况',
                        transport: '交通情况',
                        around: '周边情况',
                        facility: '配套设施',
                        notes: '入住须知',
                        vedio: '小视频',
                        conduct: '联系我们'
                    },
                    en: {
                        cover: 'cover',
                        imgs: 'live shot',
                        inner: 'internal situation',
                        transport: 'traffic conditions',
                        around: 'around',
                        facility: 'supporting facility',
                        notes: 'notice',
                        vedio: 'vedio',
                        conduct: 'conduct'
                    },
                    jp: {
                        cover: 'ひょうし',
                        imgs: 'ぴくちゃー',
                        inner: '裏がわ',
                        transport: 'とらふぃっく',
                        around: 'しゅう',
                        facility: 'しせつ',
                        notes: 'ビッキーズ',
                        vedio: 'ヴィデオ',
                        conduct: 'テレフォン'
                    }
                },
                toSubmit: true,
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
        mounted() {
            chimee = new Chimee({
                autoplay: true,
                controls: true,
                wrapper: '#vedio',
                src: ''
            })
        },
        computed: {
            ...mapState({
                lang: state => state.Lang.lang
            })
        },
        methods: {
            changeLang(lang) {
                this.$store.dispatch('langChange', lang)
            },
            edit() {
                this.editable = !this.editable
            },
            check() {
                this.editable = false
                this.toSubmit = false
                const formdata = new FormData()
                if (this.cover.raw) {
                    formdata.append('cover', this.cover.raw)
                }
                if (this.vedio.raw) {
                    formdata.append('vedio', this.vedio.raw)
                }
                formdata.append('info', JSON.stringify(this.info))
                this.imgs.forEach((item, index) => {
                    formdata.append(`img${index}`, item.raw ? item.raw : item.url)
                })
                this.showProgress = true
                const self = this
                this.$api.rent.add(
                    formdata,
                    (e) => {
                        self.percentage = parseInt((e.loaded / e.total) * 100, 10)
                    }
                ).then((res) => {
                    this.$router.push(`/rent/${res.data.id}`)
                }).catch((err) => {
                    if (err.response.status !== 401) {
                        alert('upload failed, please try again')
                        this.toSubmit = true
                        this.showProgress = false
                    }
                })
            },
            imgsRemove(file, fileList) {
                this.imgs = fileList
            },
            imgsChange(file, fileList) {
                this.imgs = fileList
            },
            imgsExceed() {
                alert('at most six pictures')
            },
            coverChange(file) {
                this.cover = file
            },
            vedioChange(file) {
                this.vedio = file
                chimee.load(file.url)
            }
        }
    }
</script>
<style lang="scss" scoped>
    $borderColor: #dbdbdb;

    .content-container {
        margin: 1rem auto;
        height: 100%;
        width: 1120px;
        padding-top: 60px;
        .btn {
            position: fixed;
            top: 85px;
            padding-top: 10px;
            height: 60px;
            width: 100%;
            background: #fff;
            z-index: 1000;
            & .inactive,
            & .notingToSubmit {
                background: grey;
                border-color: grey;
            }
            & .notingToSubmit {
                cursor: not-allowed;
            }

        }
        main {
            width: 800px;
            margin-right: 480px;
            .cover {
                margin-top: 1rem;
                width: 600px;
                height: 400px;
            }
            .cover-upload,
            .vedio-upload {
                &.disabled {
                    .el-button {
                        background: grey;
                        border-color: grey;
                        cursor: not-allowed;
                    }
                }

            }
            .cover-upload {
                margin-top: 1.3rem;
                .el-button {
                    margin-bottom: 1rem;
                }
                border-bottom: 1px solid $borderColor;
                margin-bottom: 1rem;
            }
            .carousel {
                overflow: hidden;
                width: 800px;
                margin-top: 1rem;
                .el-carousel__container {
                    height: 500px;
                }

                .img {
                    width: 100%;
                    height: 500px;
                }
            }
            .img-upload {
                margin-top: 1.3rem;
                &.disabled {
                    .el-button {
                        background: grey;
                        border-color: grey;
                        cursor: not-allowed;
                    }
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
            .rent-info {
                border-bottom: 1px solid $borderColor;
                padding-left: 0.3rem;
                padding-bottom: 1rem;
                font-size: 0.7rem;
                line-height: 1rem;
                .house, .person, .bed {
                    display: inline-block;
                }
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
                    background: #cfd6e18c;
                    color: #8696aa;
                }
            }
            .notes {
                margin-bottom: 1rem;
            }
            #vedio {
                margin-top: 1rem;
            }
            .vedio-upload {
                margin-top: 1rem;
            }
        }

        aside {
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
                overflow: hidden;
                margin: 1rem;
                height: 180px;
                font-size: 0.7rem;
                color: grey;
            }
        }

        .progress-wrapper {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: #252525d4;
            z-index: 10000;
            .progress {
                max-width: 500px;
                margin: auto;
                top: 45%;
            }
        }

    }

    @media (max-width: 575px) {
        .content {
            width: 100%;
            main {
                margin: 0 auto;
                width: 90%;
                .carousel {
                    width: 100%;
                    height: 250px;
                    .img {
                        height: 250px;
                    }
                }
            }
            aside {
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
