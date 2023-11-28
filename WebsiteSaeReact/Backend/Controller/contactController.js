const nodemailer = require("nodemailer");

const contactEmail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        // user: 'isidorquest@gmail.com',
        // pass: 'qbimqevwqdqgviaz',
        user: 'xingtonglin011016@gmail.com',
        pass: 'afzf kclj qoml wwry',
    },
    tls: {
    // more security avec true (certificat TLS)
    rejectUnauthorized: false
    }
});

const verifyContactEmail = async () => {
    try {
        await contactEmail.verify();
        console.log("Ready to Send");
    } catch (error) {
        console.error("Error verifying email:", error);
    }
};

const mailSend = async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const mail = {
        from: '"no-reply" <foo@example.com>',
        // to: "isidorquest@gmail.com",
        to: "xingtonglin011016@gmail.com",
        subject: "Contact Form Submission",
        html: `<p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Message: ${message}</p>`,
    };
    try {
        await contactEmail.sendMail(mail);
        res.json({ status: "Message Sent" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.json({ status: "ERROR" });
    }
};

module.exports = {
    mailSend
};