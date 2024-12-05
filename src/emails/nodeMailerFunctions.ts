import nodemailer from "nodemailer";
import NewSurvey from "./templates/NewSurvey";
import { render } from "@react-email/components";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const newSurveyEmail = async (link: string, partyName: string) => {
  try {
    const html = await render(NewSurvey({ link }));
    await transporter.sendMail({
      to: "jacob.lee.jordan@gmail.com",
      subject: `${partyName} Submitted a New Survey - Seven Oaks`,
      text: "Hello World",
      html: html,
    });

    console.log("Email sent!");
  } catch (err) {
    console.log(err);
  }
};
