const speakeasy = require('speakeasy')
const qrcode = require('qrcode');

const get2FAQRcode = async (req, res) =>{

    try{
        const secret = speakeasy.generateSecret({
          name: "Isidor's Quest Devs"
        })
        
        qrcode.toDataURL(secret.otpauth_url, (err, data) =>{
            if (err) throw err
            return res.status(200).send(data)
        })
    }catch(err){
        console.log("An error occured in get2FAQRcode with: " + err)
        res.status(500).send("An error occured in the backend of the application")
    }
}

module.exports = {
    get2FAQRcode
}