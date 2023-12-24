const nodemailer = require("nodemailer");

const contactEmail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'isidorquest@gmail.com',
        pass: 'qbimqevwqdqgviaz',
    },
    tls: {
    // more security avec true (certificat TLS)
    rejectUnauthorized: false
    }
});

const mailSend = async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const mail = {
        from: '"no-reply" <foo@example.com>',
        to: "isidorquest@gmail.com",
        subject: "Contact Form Submission",
        html: `<p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Message: ${message}</p>`,
    };
    const mailCli = {
        from: '"no-reply" <foo@example.com>', // Sender address
        to: email, // Receiver address from req.body.email
        subject: 'Confirmation du message pour Isidor\'s Team',
        html: `<p>Madame, Monsieur,<br>Nous vous informons de la bonne réception de votre message.</p>
                <p>---<br>Isidor\'s Team<br>=========================================================================================================</p>
                <p>Voici, pour votre information, le contenu du message que vous avez saisi :</p>
                <p>Votre identité :<br>${name}</p>
                <p>Votre message :<br>${message}</p>`,
    };

    try {
        await contactEmail.sendMail(mailCli);
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