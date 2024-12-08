import "server-only";
import nodemailer from "nodemailer";
import NewSurveyEmail from "./templates/NewSurveyEmail";
import SurveyConfirmationEmail from "./templates/SurveyConfirmationEmail";
import { render } from "@react-email/components";
import { SurveyData } from "@/db/dataTypes";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function newSurveyEmail(
  code: string,
  partyName: string,
  adminEmail: string
) {
  try {
    const html = await render(NewSurveyEmail({ code, partyName }));
    await transporter.sendMail({
      from: `Seven Oaks <${process.env.GMAIL_USER}>`,
      to: adminEmail,
      subject: `${partyName} Submitted a New Survey - Seven Oaks`,
      html: html,
    });

    console.log("Email sent!");
  } catch (err) {
    console.log(err);
  }
}

export async function confirmationEmail(surveyData: SurveyData, email: string) {
  try {
    console.log({ surveyData, email });
    const html = await render(SurveyConfirmationEmail({ surveyData }));
    await transporter.sendMail({
      from: `Seven Oaks <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Survey Confirmation for The ${surveyData.name} Party - Seven Oaks - (${surveyData.code})`,
      html: html,
    });
  } catch (err) {
    console.log(err);
  }
}
