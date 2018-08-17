<!-- Created by Spades<spadesge@gmail.com> on 18/06/25-->

<template>
    <div class="container">
        <div class="btn">
            <el-row>
                <el-button type="success" icon="el-icon-check" circle
                           @click="check" :class="{inactive:!hasToUpdate.cover&&!hasToUpdate.info}"
                           :disabled="!hasToUpdate.cover&&!hasToUpdate.info"
                ></el-button>
                <el-button type="primary" icon="el-icon-close" circle
                           @click="close"
                ></el-button>
                <el-button type="danger" icon="el-icon-delete" circle
                           v-if="!isNewItem" @click="del"></el-button>
            </el-row>
        </div>
        <div class="title">Image</div>
        <img :src="cover.url" alt="" class="cover" v-if="cover.url">
        <el-upload
                action=""
                accept="image/*"
                :autoUpload="false"
                :show-file-list="false"
                :on-change="coverChange"
                list-type="picture">
            <el-button size="small" type="primary">select</el-button>
        </el-upload>
        <el-tabs type="border-card" class="intro-wrapper">
            <el-tab-pane label="简介">
                <my-eidtable-div class="intro" v-model="info.zh.intro" :editable="true"></my-eidtable-div>
            </el-tab-pane>
            <el-tab-pane label="intro">
                <my-eidtable-div class="intro" v-model="info.en.intro" :editable="true"></my-eidtable-div>
            </el-tab-pane>
            <el-tab-pane label="プロフ帐">
                <my-eidtable-div class="intro" v-model="info.jp.intro" :editable="true"></my-eidtable-div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import axios from 'axios'

    import EditableDiv from './EditableDiv.vue'

    const { axiosBaseURL } = require('../../../config/index')

    axios.defaults.baseURL = axiosBaseURL

    export default {
        props: {
            data: {
                required: true
            },
            isNewItem: {
                default: false
            }
        },
        data() {
            return {
                hasToUpdate: {
                    cover: false,
                    info: false
                },
                cover: JSON.parse(JSON.stringify(this.data.cover)),
                info: JSON.parse(JSON.stringify(this.data.info))
            }
        },
        components: {
            myEidtableDiv: EditableDiv
        },
        computed: {
            ...mapState({
                lang: state => state.Lang.lang
            })
        },
        watch: {
            info: {
                deep: true,
                handler() {
                    this.hasToUpdate.info = true
                }
            },
            cover: {
                deep: true,
                handler() {
                    this.hasToUpdate.cover = true
                }
            }
        },
        methods: {
            close() {
                this.$emit('closeEB', false)
            },
            check() {
                if (this.isNewItem) {
                    this.addItem()
                } else {
                    this.updateItem()
                }
            },
            del() {
                this.deleteItem()
            },
            coverChange(file) {
                this.cover = file
            },
            addItem() {
                const formdata = new FormData()
                if (this.hasToUpdate.cover) {
                    formdata.append('cover', this.cover.raw)
                }
                if (this.hasToUpdate.info) {
                    formdata.append('info', JSON.stringify(this.info))
                }
                formdata.append('type', this.data.type)
                axios.post('/services', formdata, {
                    headers: {
                        'Content-Type': 'multipart/formdata'
                    }
                }).then(() => {
                    alert('Add successfully')
                    this.$emit('closeEB', true)
                }).catch((err) => {
                    if (err.response.status === 401) {
                        this.$router.push('/login')
                    }
                })
            },
            updateItem() {
                const { id } = this.data
                const formdata = new FormData()
                if (this.hasToUpdate.cover) {
                    formdata.append('cover', this.cover.raw)
                }
                if (this.hasToUpdate.info) {
                    formdata.append('info', JSON.stringify(this.info))
                }
                axios.put(`/services/${id}`, formdata, {
                    headers: {
                        'Content-Type': 'multipart/formdata'
                    }
                }).then(() => {
                    alert('Update successfully')
                    this.data.cover.url = this.cover.url
                    this.data.info = this.info
                    this.$emit('closeEB', false)
                }).catch((err) => {
                    if (err.response.status === 401) {
                        this.$router.push('/login')
                    }
                })
            },
            deleteItem() {
                const { id } = this.data
                axios.delete(`/services/${id}`)
                    .then(() => {
                        alert('Delete successfully')
                        this.$emit('closeEB', true)
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            this.$router.push('/login')
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        margin-top: 3rem;
        width: 400px;
        color: #fff;
        .btn {
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #b5b5b5;
            .inactive {
                background: grey;
                border-color: grey;
                cursor: not-allowed;
            }
        }
        .title {
            margin: 1rem auto;
            padding-left: 0.5rem;
            font-size: 0.9rem;
            font-weight: 700;
            line-height: 2rem;
            background: #f5f7fa;
            color: #909399;
        }
        .cover {
            width: 400px;
            height: 240px;
        }
        .intro-wrapper {
            margin-top: 1rem;
        }
        .intro {
            overflow: auto;
            height: 200px;
            font-size: 0.75rem;
            font-weight: 700;
            line-height: 1.5rem;
            white-space: pre-line;
            background: #fff;
            color: #8696aa;
        }
    }

</style>

