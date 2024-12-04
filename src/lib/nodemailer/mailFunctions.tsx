"use server";

import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { NewSurvey } from "./templates";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const newSurveyEmail = async (link: string, subject: string) => {
  try {
    const html = await render(<NewSurvey dashlink={link} />);
    const text = await render(<NewSurvey dashlink={link} />, {
      plainText: true,
    });

    await transporter.sendMail({
      to: "jacob.lee.jordan@gmail.com",
      subject: subject,
      text: text,
      html: html,
      // attachments: [
      //   {
      //     filename: "SO-logo.png",
      //     path: process.cwd() + "/public/SO-logo.png",
      //     cid: "logo",
      //   },
      // ],
    });

    console.log("Email sent!");
  } catch (err) {
    console.log(err);
  }
};
