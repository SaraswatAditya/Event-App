import nodemailer from "nodemailer";
import Mailgen from "mailgen";

import ENV from "../config.js";

//https://ethereal.email/create
/**
  let nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: ENV.EMAIL, // generate ethereal user
    pass: ENV.PASSWORD, //generated ethereal password
  },
};
 */

//gmail
let nodeConfig = {
  service : "gmail",
  secure : "true",
  port : 465,
  auth: {
    user: ENV.EMAIL, 
    pass: ENV.PASSWORD, 
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js",
  },
});

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : ""
}
*/
export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  //body of the email
  var email = {
    body: {
      name: username,
      intro: text || "Welcome to the world of Lights",
      outro:
        "Need help , or any Question just reply to the mail and we will be there to assist you!",
    },
  };

  var emailBody = MailGenerator.generate(email);

  let message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || "Signup Successful",
    html: emailBody,
  };

  //send mail
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You should recive an email from us." });
    })
    .catch((error) => res.status(500).send({ error }));
};
