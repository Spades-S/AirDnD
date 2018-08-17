// Created by Spades<spadesge@gmail.com> on 18/06/13

const crypto = require('crypto')
const nodemailer = require('nodemailer')

const { User } = require('../model/index')

async function updateVerifyCode(verifycode) {
    const hash = crypto.createHash('sha256')
    hash.update('admin')
    if (!(await User.findOneAndUpdate({ id: 0 }, { verifycode }).exec())) {
        const user = new User({
            id: 0,
            username: 'admin',
            password: hash.digest('hex'),
            mailbox: '',
            verifycode
        })
        await user.save()
    }
}

async function checkLogin(data) {
    const { username, psw, verifycode } = data
    if (!(await User.findOne({ verifycode }).exec())) {
        throw new Error('0')
    }
    const user = await User.findOne({ id: 0 }, 'username password').exec()
    const hash = crypto.createHash('sha256')
    hash.update(psw)
    if (user.username !== username || hash.digest('hex') !== user.password) {
        throw new Error('1')
    }
}

async function updatePassword(data) {
    const { oldpsw, newpsw, verifycode } = data
    if (!(await User.findOne({ verifycode }).exec())) {
        throw new Error('0')
    }
    const user = await User.findOne({ id: 0 }, 'password').exec()
    const hash = crypto.createHash('sha256')
    hash.update(oldpsw)
    if (hash.digest('hex') !== user.password) {
        throw new Error('1')
    }
    const hash1 = crypto.createHash('sha256')
    hash1.update(newpsw)
    try {
        await User.findOneAndUpdate({ id: 0 }, { password: hash1.digest('hex') }).exec()
    } catch (err) {
        throw new Error('2')
    }
}

async function findMailBox() {
    const res = await User.findOne({ id: 0 }, 'mailbox').exec()
    return res
}

async function updateMailBox(data) {
    await User.findOneAndUpdate({ id: 0 }, data).exec()
}

function sendMail(data, receiver) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            pool: true,
            host: 'smtp.163.com',
            port: 465,
            secure: true, // use TLS
            auth: {
                user: 'xidanminsu@163.com',
                pass: '1qaz2wsx'
            }
        })
        transporter.sendMail({
            from: 'xidanminsu@163.com',
            to: receiver,
            subject: 'Reset Password',
            text: `Curent password is ${data}, please update password as soon as possible!`
        }, (err, info) => {
            if (err) {
                reject(err)
            }
            resolve(info)
        })
    })
}

async function forgetPassword() {
    const { mailbox } = await findMailBox()
    let newpsw = ''
    for (let i = 0; i < 9; i++) {
        newpsw += parseInt(Math.random() * 10, 10)
    }
    const hash = crypto.createHash('sha256')
    hash.update(newpsw)
    await User.findOneAndUpdate({ id: 0 }, { password: hash.digest('hex') }).exec()
    await sendMail(newpsw, mailbox)
}


module.exports = {
    checkLogin,
    findMailBox,
    forgetPassword,
    updateMailBox,
    updateVerifyCode,
    updatePassword
}
