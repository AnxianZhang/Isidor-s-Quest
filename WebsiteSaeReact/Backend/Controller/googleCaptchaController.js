const axios = require("axios");
const CaptchaGoogle = async (req, res) => {
    try {
      const token = req.query.token;
      console.log(token)
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=6LdTH2IpAAAAACCHdjFtGp7xhFTzH9gsyyXFDuZt&response=${token}`
      );
      if (response.data.success) {
        return res.status(200).send("Humain");
      } else {
        return res.status(401).send("Robot");
      } 

    } catch (error) {
      console.error(error);
      return res.status(500).send("Error verifying reCAPTCHA");
     }
  };

module.exports = {
    CaptchaGoogle
}