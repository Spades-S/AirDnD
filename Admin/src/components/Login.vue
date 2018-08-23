<template>
    <div>
        <div class="container">
        </div>
        <div class="title">
            AirDnD
        </div>
        <div class="content" v-if="isLogin">
            <div class="tip">Welcome</div>
            <input type="text" placeholder="username" v-model.trim="loginData.username" key="l-username">
            <input type="text" placeholder="password" v-model.trim="loginData.psw" key="l-psw"><br>
            <div class="verify-code">
                <div class="img-container">
                    <img :src="verifyCode" alt="">
                    <div class="vc-change" @click="getVerifyCode">看不清，换一张</div>
                </div>
                <input type="text" placeholder="请输入验证码" v-model.trim="loginData.verifycode" key="l-verifycode">
            </div>
            <input type="button" :value="loginData.msg" @click="login">
            <div class="forget" @click="forget"> Forget password</div>
        </div>
        <div class="content change" v-else>
            <div class="tip">Change password</div>
            <input type="text" placeholder="old password" v-model.trim="changePSW.oldpsw">
            <input type="text" placeholder="new password" v-model.trim="changePSW.newpsw" key="c-psw">
            <input type="text" placeholder="new password" v-model.trim="changePSW.repeat">
            <div class="verify-code">
                <div class="img-container">
                    <img :src="verifyCode" alt="">
                    <div class="vc-change" @click="getVerifyCode">看不清，换一张</div>
                </div>
                <input type="text" placeholder="请输入验证码" v-model.trim="changePSW.verifycode" key="c-verifycode">
            </div>
            <input type="button" :value="changePSW.msg" @click="changePassword">
        </div>
    </div>
</template>

<script>

    import Cookie from '../utils/cookie'

    export default {
        props: ['isLogin'],
        data() {
            return {
                changePSW: {
                    msg: '更改密码',
                    oldpsw: '',
                    newpsw: '',
                    repeat: '',
                    verifycode: ''
                },
                loginData: {
                    msg: '登录',
                    username: '',
                    psw: '',
                    verifycode: ''
                },
                verifyCode: ''
            }
        },
        created() {
            this.getVerifyCode()
        },
        methods: {
            changePassword(e) {
                const option = this.changePSW
                if (!option.oldpsw) {
                    this.addBuzz(e.target, '请输入原密码', false)
                    return
                } else if (!option.newpsw) {
                    this.addBuzz(e.target, '请输入新密码', false)
                    return
                } else if (!option.repeat) {
                    this.addBuzz(e.target, '请再次输入新密码', false)
                    return
                } else if (!option.verifycode) {
                    this.addBuzz(e.target, '请输入验证码', false)
                    return
                }

                if (option.newpsw !== option.repeat) {
                    this.addBuzz(e.target, '两次输入的新密码不一致', false)
                    this.getVerifyCode()
                    return
                }
                this.$api.user.updatePSW({
                    oldpsw: option.oldpsw,
                    newpsw: option.newpsw,
                    verifycode: option.verifycode
                }).then(() => {
                    this.addBuzz(e.target, '密码修改成功', false, false)
                    Cookie.removeCookie('TOKEN')
                    setTimeout(() => {
                        this.$router.push('/login')
                        this.getVerifyCode()
                    }, 1000)
                }).catch((err) => {
                    if (err.response.status === 401) {
                        this.addBuzz(e.target, err.response.data.error, false)
                        this.getVerifyCode()
                    }
                })
            },
            forget() {
                this.$api.user.forgetPSW()
                    .then(() => {
                        this.$notify({
                            title: 'MailBox',
                            message: 'Reset successfully, Please check your mailbox',
                            type: 'success'
                        });
                    })
            },
            login(e) {
                const option = this.loginData
                if (!option.username) {
                    this.addBuzz(e.target, '用户名为空', true)
                    return
                } else if (!option.psw) {
                    this.addBuzz(e.target, '密码为空', true)
                    return
                } else if (!option.verifycode) {
                    this.addBuzz(e.target, '验证码为空', true)
                    return
                }
                this.$api.user.login({
                    username: option.username,
                    psw: option.psw,
                    verifycode: option.verifycode
                }).then((res) => {
                    if (res.status === 200) {
                        this.$router.push('/')
                    }
                }).catch((err) => {
                    if (err.response.status === 401) {
                        this.addBuzz(e.target, err.response.data.error, true)
                        this.getVerifyCode()
                    }
                })
            },
            getVerifyCode() {
                this.$api.verifycode.fetch()
                    .then((res) => {
                        this.verifyCode = res.data
                    })
            },
            addBuzz(ele, msg, isLogin, isErr = true) {
                if (isLogin) {
                    this.loginData.msg = msg
                } else {
                    this.changePSW.msg = msg
                }
                ele.classList.add('shake')
                if (!isErr) {
                    ele.classList.add('green')
                }
                setTimeout(() => {
                    ele.classList.remove('shake')
                    if (!isErr) {
                        ele.classList.remove('green')
                    }
                    if (isLogin) {
                        this.loginData.msg = '登录'
                    } else {
                        this.changePSW.msg = '更改密码'
                    }
                }, 1000)
            }
        }
    }
</script>

<style lang="scss" scoped>
    $contentBackground: #373a3d;
    $borderColor: #757272;
    .container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        filter: blur(6px);
        background: linear-gradient(#8ccad9, #d6c3ac);
    }

    .title {
        position: absolute;
        top: 10%;
        left: 0;
        right: 0;
        font-size: 1.5rem;
        text-align: center;
        color: #fff;
    }

    .content {
        position: absolute;
        top: calc(50% - 12.5rem);
        left: calc(50% - 9rem);
        width: 18rem;
        height: 25rem;
        text-align: center;
        background: rgba(145, 156, 167, 0.7215686274509804);
        border-radius: 0.6rem;
        color: #fff;
        .tip {
            margin-top: 2rem;
            font-size: 1rem;
            font-weight: 400;
        }
        input {
            box-sizing: border-box;
            border: none;
            margin-top: 2rem;
            height: 2rem;
            width: 12rem;
            font-size: 0.8rem;
            background: rgba(212, 223, 234, 0.2784313725490196);
            border: 1px solid #a9b7d2;
            border-radius: 1rem;
            color: #fff;
            outline: none;
            &[type="text"] {
                padding-left: 0.9rem;
                padding-right: 0.9rem;

            }
            &[type="button"] {
                margin-top: 1rem;
                color: #fff;
                cursor: pointer;
                &:hover {
                    border-color: #fff;
                }
            }
            &:focus {
                border-color: #fff;
            }
            &::placeholder {
                color: #e0e0e0;
            }
        }
        &.change input {
            margin-top: 1.5rem;
        }
        .ch-pw {
            display: inline-block;
            margin-top: 1rem;
            font-size: 0.5rem;
            border-bottom: 1px solid #a9b7d2;
            cursor: pointer;
        }

        .verify-code {
            display: inline-block;
            width: 12rem;
            padding-top: 1.3rem;
            padding-left: 0.8rem;
            .img-container {
                display: inline-block;
                float: left;
                width: 5rem;
                img {
                    display: inline-block;
                    width: 5rem;
                    height: 1.7rem;
                }
                .vc-change {
                    border-bottom: 1px solid;
                    margin: 0 0.7rem;
                    font-size: 10px;
                    text-align: center;
                    -moz-user-select: none;
                    -webkit-user-select: none;
                    -ms-user-select: none;
                    -khtml-user-select: none;
                    user-select: none;
                }
                .vc-change:hover {
                    cursor: pointer;
                }
            }

            input {
                -webkit-border-radius: 0;
                -moz-border-radius: 0;
                border-radius: 0;
                width: 5rem;
                height: 1.7rem;
                margin-top: 0;
                padding-left: 0.4rem;
                padding-right: 0.4rem;
                font-size: 13px;

            }

        }
        .forget {
            width: 9rem;
            margin: 1rem auto;
            font-size: 0.8rem;
            border-bottom: 1px solid #a9b7d2;
            cursor: pointer;
        }
        input.shake {
            animation: buzz-out 1s ease;
            color: #ff0000;
            &.green {
                color: #1dab1d;
            }
        }
        @keyframes buzz-out {
            0% {
                transform: translateX(3px);
            }
            5% {
                transform: translateX(-3px);
            }
            10% {
                transform: translateX(3px);
            }
            15% {
                transform: translateX(-3px);
            }
            20% {
                transform: translateX(3px);
            }
            25% {
                transform: translateX(0px);
            }
            100% {
                transform: translateX(0px);
            }
        }
    }


</style>