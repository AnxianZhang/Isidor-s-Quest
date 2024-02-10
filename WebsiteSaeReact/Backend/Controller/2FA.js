const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
const mongoose = require('mongoose')
const { FA2, expirationMinutes} = require("../Models/Model")

const hasUserAlreadyASecret = async pseudo => {
    const user2FA = await FA2.findOne({ pseudo: pseudo }).exec()
    return user2FA !== null
}

const saveSecretToDataBase = async (secret, pseudo) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor')

    if (await hasUserAlreadyASecret(pseudo)) {
        await FA2.updateOne(
            {pseudo: pseudo},
            {$set: {ascii: secret.ascii, expirationDate: new Date(Date.now() + expirationMinutes * 60 * 1000)}}
        )
    }
    else {
        await new FA2({
            ascii: secret.ascii,
            expirationDate: new Date(Date.now() + expirationMinutes * 60 * 1000),
            pseudo: pseudo,
        }).save()
    }
}

const get2FAQRcode = async (req, res) => {
    const reqData = req.body

    console.log("in get 2FA qr code")

    if (!req.session.canGoTo2FA || !reqData.pseudo){
        console.log("nop")
        return res.status(401).send('shoudnt be in 2FA')
    }

    console.log("yas")

    try {
        const secret = speakeasy.generateSecret({
            name: "Isidor's Quest Devs" // changer le nom secret par un random
        })

        console.log(secret)

        qrcode.toDataURL(secret.otpauth_url, async (err, data) => {
            if (err) throw err

            await saveSecretToDataBase(secret, reqData.pseudo)

            return res.status(200).json({ qrCode: data })
        })
    } catch (err) {
        console.log("An error occured in get2FAQRcode with: " + err)
        res.status(500).send("An error occured in the backend of the application")
    }
}

const verif2FA = async (req, res) =>{
    const data = req.body
    req.session.canGoTo2FA = false
    req.session.pseudo = reqData.pseudo
    localStorage.setItem('isConnect', JSON.stringify({ pseudo: data.pseudo }))
}

module.exports = {
    get2FAQRcode,
    verif2FA,
}