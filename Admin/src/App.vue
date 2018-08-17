<!-- Created by Spades<spadesge@gmail.com> on 18/05/23-->

<template>
    <div id="app">

        <div class="main">
            <router-view></router-view>
        </div>

    </div>

</template>

<script>
    import axios from 'axios'
    import { mapState } from 'vuex'

    const { axiosBaseURL } = require('../config/index')

    axios.defaults.baseURL = axiosBaseURL

    export default {
        name: 'App',
        data() {
            return {
                mailbox: 'no mailbox',
                struct: {

                }
            }
        },
        computed: {
            ...mapState({
                lang: state => state.Lang.lang,
                activeIndex: state => state.Menu.activeIndex
            })
        },
        created() {
            axios.get('/user/mailbox')
                .then((res) => {
                    if (res.data.mailbox) {
                        this.mailbox = res.data.mailbox
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        methods: {

            updateMailbox(data) {
                axios.put('/user/mailbox', data)
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
                            title: 'MailOBx',
                            message: 'Update failed'
                        });
                    })
            }
        }
    }
</script>

<style lang="scss">

    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;

    }

    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        font-size: 20px;
    }

    #app {
        height: 100%;
        padding-top: 85px;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }



    .main {
        min-height: calc(100% - 230px);

    }



</style>
<style lang="scss" scoped>

</style>
