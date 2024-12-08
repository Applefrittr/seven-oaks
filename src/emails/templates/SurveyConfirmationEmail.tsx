import {
  Html,
  Body,
  Head,
  Tailwind,
  Heading,
  Hr,
  Container,
  Img,
  Text,
  Row,
  Section,
} from "@react-email/components";
import { SurveyData } from "@/db/dataTypes";

type SurveyConfirmationEmailProps = {
  surveyData: SurveyData;
};

export default function SurveyConfirmationEmail({
  surveyData,
}: SurveyConfirmationEmailProps) {
  const baseUrl = process.env.HOST_URL ? `https://${process.env.HOST_URL}` : ``;

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className={`bg-white font-sans`}>
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto px-[20px] pt-[20px] max-w-[465px]">
            <Section
              className={`flex flex-col gap-[16px] items-center justify-center p-[16px]`}
            >
              <Section className={`text-center`}>
                <Img
                  src={`${baseUrl}/SO-logo.png`}
                  alt="Seven Oaks Logo"
                  className={`w-20 h-auto mx-auto`}
                />
                <Heading as="h2">
                  {`Copy of Visitor's Survey - The ${surveyData?.name ?? "BLANK"} Party`}
                </Heading>
              </Section>
              <Hr />
              <Text>
                {`Thank you for submitted a visitor's survey to Seven Oaks. We
                look forward to seeing you!`}
              </Text>
              <Text>
                {`Below you will find a copy of the survey to keep for your
                records.`}
              </Text>
              <Section className="p-[12px] text-[0.95rem]">
                <Row>
                  {`Name : `}
                  <i>{`${surveyData?.name ?? "NAME"}`}</i>
                </Row>
                <Row>
                  {`Date of Arrival : `}
                  <i>{`${surveyData?.date ?? "DATE"}`}</i>
                </Row>
                <Row>
                  {`Length of Stay : `}
                  <i>{`${surveyData?.length ?? "LENGTH"} days`}</i>
                </Row>
                <Row>
                  {`Beverage Preference : `}
                  <i>{`${surveyData?.beverage ?? "BEVERAGE"}`}</i>
                </Row>
                <Row>
                  {`Allergies and/or Dietary Restrictions : `}
                  <br />
                  <i>{`${surveyData?.diet ?? "DIET"}`}</i>
                </Row>
                <Row>
                  {`Other accommodations : `}
                  <br />
                  <i>{`${surveyData?.other ?? "OTHER"}`}</i>
                </Row>
              </Section>
              <Text>
                {`If you have any questions or concerns regarding your upcoming
                visit, please feel free to reply to this email directly.`}
              </Text>
              <Text className={`text-center text-slate-500 text-xs mb-0`}>
                {`Seven Oaks - 196 Fuselier Rd - Arnaudville, LA`}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
