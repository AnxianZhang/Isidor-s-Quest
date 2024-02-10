const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
const mongoose = require('mongoose')
var localStorage = require('localStorage')
const { FA2, expirationMinutes } = require("../Models/Model")
const { isAllUnder50Character, containSpeCaracters } = require('../Models/Utile')

const hasUserAlreadyASecret = async pseudo => {
    const user2FA = await FA2.findOne({ pseudo: pseudo }).exec()
    return {
        value: user2FA !== null,
        user2FA : user2FA,
    }
}

const saveSecretToDataBase = async (secret, pseudo) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/DatabaseIsidor')

    if ((await hasUserAlreadyASecret(pseudo)).value) {
        await FA2.updateOne(
            { pseudo: pseudo },
            { $set: { ascii: secret.ascii, expirationDate: new Date(Date.now() + expirationMinutes * 60 * 1000) } }
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

    if (req.session.pseudo){
        return res.status(402).send("already connected")
    }

    if (!req.session.canGoTo2FA || !reqData.pseudo) {
        return res.status(401).send('shoudnt be in 2FA') // si status alors should have send !!!!!
    }

    try {
        const secret = speakeasy.generateSecret({
            name: "Isidor's Quest Devs" // changer le nom secret par un random
        })

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

const verif2FA = async (req, res) => {
    const reqData = req.body

    if (!isAllUnder50Character(reqData))
        return res.status(406).send("input doivent etre <= 64")

    if (containSpeCaracters(reqData)) {
        return res.status(408).send("forbiden carac")
    }

    const user2FA = (await hasUserAlreadyASecret(reqData.pseudo)).user2FA
    
    if (!user2FA){
        return res.status(402).send("Le code à expirer")
    }
    
    const verified = speakeasy.totp.verify({
        secret: user2FA.ascii,
        encoding: 'ascii',
        token: reqData.code,
    })

    if (!verified)
        return res.status(401).send("le code e correspond pas")

    console.log("will be connected")

    req.session.canGoTo2FA = false
    req.session.pseudo = reqData.pseudo
    localStorage.setItem('isConnect', JSON.stringify({ pseudo: reqData.pseudo }))

    return res.status(200).send("Authentification réussi")
}

module.exports = {
    get2FAQRcode,
    verif2FA,
}