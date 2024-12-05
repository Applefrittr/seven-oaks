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
  Section,
  Button,
} from "@react-email/components";

type NewSurveyEmailProps = {
  code: string;
  partyName: string;
};

export default function NewSurveyEmail({
  code,
  partyName,
}: NewSurveyEmailProps) {
  const baseUrl = process.env.HOST_URL ? `https://${process.env.HOST_URL}` : ``;

  console.log(baseUrl);

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className={`bg-white font-sans`}>
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto px-[20px] pt-[20px] max-w-[465px]">
            <Section
              className={`flex flex-col gap-4 items-center justify-center p-4`}
            >
              <Section className={`text-center`}>
                <Img
                  src={`${baseUrl}/SO-logo.png`}
                  alt="Seven Oaks Logo"
                  className={`w-20 h-auto mx-auto`}
                />
                <Heading as="h2">New Survey Recieved</Heading>
              </Section>
              <Hr />
              <Text>
                The <strong>{partyName}</strong> Party has submitted a new
                survey.
              </Text>
              <Text>
                Click the following link to see details in the Seven Oaks
                Dashboard:
              </Text>
              <Section className={`text-center`}>
                <Button
                  className={`px-4 py-2 rounded-md bg-slate-400 text-white text-center`}
                  href={`${baseUrl}/dashboard/surveys/${code}`}
                >
                  Go To Dashboard
                </Button>
              </Section>
              <Text className={`text-center text-slate-500 text-xs mb-0`}>
                Seven Oaks - 196 Fuselier Rd - Arnaudville, LA
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
