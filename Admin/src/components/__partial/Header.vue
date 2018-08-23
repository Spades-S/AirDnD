<!--Created by Spades<spadesge@gmail.com> on 18/08/17-->
<template>
    <header>
        <div class="lang">
            <span class="item" :class="{active:lang==='zh'}" @click="changeLang('zh')">中文</span>
            <span>/</span>
            <span class="item" :class="{active:lang==='en'}" @click="changeLang('en')">English</span>
            <span>/</span>
            <span class="item" :class="{active:lang==='jp'}" @click="changeLang('jp')">Japanese</span>
        </div>
        <div class="control">
            <el-dropdown class="d-menu" @command="handleCommand">
                      <span class="el-dropdown-link">
                        {{struct[lang].control}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                <el-dropdown-menu slot="dropdown">
                    <template v-for="command in commands">
                        <el-dropdown-item :command="command">{{struct[lang][command]}}</el-dropdown-item>
                    </template>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="title">{{struct[lang].name}}</div>
        <el-menu :default-active="activeIndex" class="menu" mode="horizontal" @select="handleSelect">
            <template v-for="(nav,index) in navs ">
                <el-menu-item :index="index+1+''">
                    {{struct[lang][nav]}}
                </el-menu-item>
            </template>
        </el-menu>
    </header>
</template>

<script>
    import { mapState } from 'vuex'
    import Cookie from '../../utils/cookie'

    export default {
        name: 'Header',
        data() {
            return {
                commands: ['logout', 'changepsw', 'bindmailbox'],
                mailbox: 'no mailbox',
                navs: ['rent', 'sale', 'guide', 'about']
            }
        },
        created() {
            this.$api.user.fetchMB()
                .then((res) => {
                    if (res.data.mailbox) {
                        this.mailbox = res.data.mailbox
                    }
                })
        },
        computed: {
            ...mapState({
                activeIndex: state => state.Menu.activeIndex,
                lang: state => state.Lang.lang,
                struct: state => state.struct
            })
        },
        methods: {
            changeLang(lang) {
                this.$store.dispatch('langChange', lang)
            },
            handleCommand(command) {
                switch (command) {
                    case 'logout':
                        Cookie.removeCookie('TOKEN')
                        this.$router.push('/login')
                        break
                    case 'changepsw':
                        this.$router.push('/changepsw')
                        break
                    case 'bindmailbox':
                        this.$prompt(`Current: ${this.mailbox}, Change to`, 'Bind MailBox', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                            inputErrorMessage: '邮箱格式不正确'
                        }).then(({ value }) => {
                            this.updateMailbox({ mailbox: value })
                        }).catch(() => {
                        })
                        break
                    default:
                        break
                }
            },
            handleSelect(key) {
                switch (key) {
                    case '1':
                        this.$router.push('/list/0')
                        break
                    case '2':
                        this.$router.push('/list/1')
                        break
                    case '3':
                        this.$router.push('/guide')
                        break
                    case '4':
                        this.$router.push('/about')
                        break
                    default:
                        break
                }
            },
            updateMailbox(data) {
                this.$api.user.updateMB(data)
                    .then(() => {
                        this.mailbox = data.mailbox
                        this.$notify({
                            title: 'MailBox',
                            message: 'Update successfully',
                            type: 'success'
                        });
                    })
                    .catch(() => {
                        this.$notify.error({
                            title: 'MailBox',
                            message: 'Update failed'
                        });
                    })
            }
        }
    }
</script>
<style lang="scss" scoped>
    header {
        position: fixed;
        height: 85px;
        width: 100%;
        min-width: 990px;
        padding: 20px;
        top: 0;
        z-index: 1000;
        background: #fff;
        .lang {
            position: absolute;
            right: 230px;
            top: 0px;
            z-index: 1000;
            font-size: 0.7rem;
            font-weight: 700;
            line-height: 85px;
            color: #76a2bf;
            .active {
                color: #2b4557;
            }
            .item {
                cursor: pointer;
                &:hover {
                    color: #2b4557;
                }
            }

        }
        .title {
            position: absolute;
            left: 1rem;
            top: 0;
            line-height: 85px;
            font-weight: 700;
            color: #707070;
            z-index: 9999;
        }
        .menu {
            padding-left: 200px;
        }
        .control {
            position: absolute;
            right: 40px;
            top: 0;
            line-height: 85px;
            z-index: 5000;
            .d-menu {
            }

        }
    }
</style>