import nodemailer from "nodemailer";
import NewSurveyEmail from "./templates/NewSurveyEmail";
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

export const newSurveyEmail = async (
  code: string,
  partyName: string,
  adminEmail: string
) => {
  try {
    const html = await render(NewSurveyEmail({ code, partyName }));
    await transporter.sendMail({
      from: `Seven Oaks <${process.env.GMAIL_USER}>`,
      to: adminEmail,
      subject: `${partyName} Submitted a New Survey - Seven Oaks`,
      text: "Hello World",
      html: html,
    });

    console.log("Email sent!");
  } catch (err) {
    console.log(err);
  }
};
