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
                    <el-button type="danger" icon="el-icon-delete" circle @click="del"></el-button>
                </el-row>
            </div>
            <aside>
                <my-div class="price" v-model="info[lang].price" :editable="editable" :key="lang+'price'"></my-div>
                <div class="conduct">
                    <div class="title">{{struct[lang].conduct}}</div>
                    <my-div class="phone" v-model="info[lang].phone" :editable="editable" :key="lang+'phone'"></my-div>
                </div>
                <my-div class="intro" v-model="info[lang].intro" :editable="editable" :key="lang+'intro'"></my-div>
            </aside>
            <main>
                <div>{{struct[lang].cover}}</div>
                <img :src="cover.url" alt="" class="cover">
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
                <template v-for="item in itemsToShow">
                    <div :class="item">
                        <div class="key">{{struct[lang][item]}}</div>
                        <my-div class="value" v-model="info[lang][item]" :editable="editable"
                                :key="lang+item"></my-div>
                    </div>
                </template>
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
                itemsToShow: ['attribute', 'transport', 'around', 'estate'],
                showProgress: false,
                percentage: 100,
                editable: false,
                toSubmit: false,
                hasChanged: {
                    imgs: false,
                    info: false
                },
                struct: {
                    zh: {
                        cover: '封面',
                        imgs: '实拍图片',
                        attribute: '基本属性',
                        transport: '交通情况',
                        around: '周边情况',
                        estate: '小区介绍',
                        vedio: '小视频',
                        conduct: '联系我们'
                    },
                    en: {
                        cover: 'cover',
                        imgs: 'live shot',
                        attribute: 'internal situation',
                        transport: 'traffic conditions',
                        around: 'around',
                        estate: 'estate',
                        vedio: 'vedio',
                        conduct: 'conduct'
                    },
                    jp: {
                        cover: 'ひょうし',
                        imgs: 'ぴくちゃー',
                        attribute: '裏がわ',
                        transport: 'とらふぃっく',
                        around: 'しゅう',
                        estate: 'ビオトープ',
                        vedio: 'ヴィデオ',
                        conduct: 'テレフォン'
                    }
                },
                cover: { url: '' },
                imgs: [],
                vedio: { url: '' },
                info: {
                    zh: {
                        addr: '',
                        attribute: '',
                        name: '',
                        intro: '',
                        transport: '',
                        around: '',
                        estate: '',
                        phone: '',
                        price: ''
                    },
                    en: {
                        addr: '',
                        attribute: '',
                        name: '',
                        intro: '',
                        transport: '',
                        around: '',
                        estate: '',
                        phone: '',
                        price: ''
                    },
                    jp: {
                        addr: '',
                        attribute: '',
                        name: '',
                        intro: '',
                        transport: '',
                        around: '',
                        estate: '',
                        phone: '',
                        price: ''
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
                        this.hasChanged.info = true
                    }
                }
            }
        },
        created() {
            this.getItemData()
        },
        mounted() {
            chimee = new Chimee({
                autoplay: true,
                controls: true,
                wrapper: '#vedio',
                src: 'http://v.youku.com/v_show/id_XMzYzNzU4NTY1Ng==.html?spm=a2hww.11359951.m_26657.5~1~3!7~A'
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
            check() {
                this.editable = false
                this.toSubmit = false
                this.updateItemData()
            },
            coverChange(file) {
                this.toSubmit = true
                this.cover = file
            },
            edit() {
                this.editable = !this.editable
            },
            del() {
                if (window.confirm('Delete this item?')) {
                    this.$api.sale.del(this.$route.params.id)
                        .then((res) => {
                            if (res.status === 200) {
                                alert('Delete successfully')
                                this.$router.push('/list/1')
                            }
                        })
                }
            },
            getItemData() {
                this.$api.sale.fetch(this.$route.params.id)
                    .then((res) => {
                        this.cover = res.data.cover
                        this.imgs = res.data.imgs
                        this.vedio = res.data.vedio
                        this.info = res.data.info
                        chimee.load(res.data.vedio.url)
                    })
            },
            imgsRemove(file, fileList) {
                this.hasChanged.imgs = true
                this.toSubmit = true
                this.imgs = fileList
            },
            imgsChange(file, fileList) {
                this.hasChanged.imgs = true
                this.toSubmit = true
                this.imgs = fileList
            },
            imgsExceed() {
                alert('at most six pictures')
            },
            updateItemData() {
                const formdata = new FormData()
                if (this.cover.raw) {
                    formdata.append('cover', this.cover.raw)
                }
                if (this.vedio.raw) {
                    formdata.append('vedio', this.vedio.raw)
                }
                if (this.hasChanged.imgs) {
                    this.imgs.forEach((item, index) => {
                        formdata.append(`img${index}`, item.raw ? item.raw : item.url)
                    })
                }
                if (this.hasChanged.info) {
                    formdata.append('info', JSON.stringify(this.info))
                }
                this.showProgress = true
                const self = this
                this.$api.sale.update(
                    this.$route.params.id, formdata,
                    (e) => {
                        self.percentage = parseInt((e.loaded / e.total) * 100, 10)
                    }
                ).then((res) => {
                    if (res.status === 200) {
                        alert('update successfully')
                        window.location.reload()
                    }
                }).catch((err) => {
                    if (err.response.status !== 401) {
                        this.showProgress = false
                        alert('update failed, please try again')
                    }
                })
            },
            vedioChange(file) {
                this.toSubmit = true
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
                margin: 1rem 0;
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
                .el-button {
                    margin-bottom: 1rem;
                }
                border-bottom: 1px solid $borderColor;
                margin-bottom: 1rem;
            }
            .vedio-upload {
                margin-top: 1rem;
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
                border-bottom: 1px solid $borderColor;
                margin-top: 0.3rem;
                padding-left: 0.3rem;
                padding-bottom: 1rem;
                font-size: 0.75rem;
                color: #a4a4a4;
            }

            .attribute,
            .transport,
            .around,
            .estate {
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
                    font-weight: 700;
                    line-height: 1.5rem;
                    white-space: pre-line;
                    background: #cfd6e18c;
                    color: #8696aa;
                }
            }
            #vedio {
                margin-top: 2rem;
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
