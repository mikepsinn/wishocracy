import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"

interface SignupConfirmationEmailProps {
  userName?: string
  url: string
  orgName?: string
}

export const SignupConfirmationEmail = ({
  userName = "",
  url,
  orgName,
}: SignupConfirmationEmailProps) => {

  return (
    <Html>
      <Head />
      <Preview>Confirm your Wishocracy sign-in and keep your allocations saved.</Preview>
      <Body
        style={{
          backgroundColor: "#ffffff",
          fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Section style={{ marginBottom: "30px" }}>
            <Text
              style={{
                color: "#000000",
                fontSize: "16px",
                lineHeight: "1.6",
                margin: "0 0 20px 0",
              }}
            >
              {userName ? `Hi ${userName},` : "Hi there,"}
            </Text>
            <Text
              style={{
                color: "#000000",
                fontSize: "16px",
                lineHeight: "1.6",
                margin: "0 0 20px 0",
              }}
            >
              Thanks for using Wishocracy.
            </Text>
            <Text
              style={{
                color: "#000000",
                fontSize: "16px",
                lineHeight: "1.6",
                margin: "0 0 30px 0",
              }}
            >
              Confirm your sign-in by clicking the button below so we can save your allocations and referral link:
            </Text>
          </Section>

          <Section style={{ textAlign: "center", marginBottom: "20px" }}>
            <Button
              href={url}
              style={{
                backgroundColor: "#000000",
                borderRadius: "4px",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "600",
                textDecoration: "none",
                padding: "12px 24px",
                display: "inline-block",
              }}
            >
              Confirm My Sign-In
            </Button>
            <Text
              style={{
                color: "#666666",
                fontSize: "12px",
                margin: "10px 0 0 0",
              }}
            >
              Takes 1–2 seconds.
            </Text>
            <Text
              style={{
                color: "#666666",
                fontSize: "12px",
                margin: "5px 0 0 0",
                fontStyle: "italic",
              }}
            >
              (This link expires in 24 hours.)
            </Text>
          </Section>

          <Section style={{ marginTop: "30px", marginBottom: "20px" }}>
            <Text
              style={{
                color: "#000000",
                fontSize: "14px",
                lineHeight: "1.6",
                margin: "0 0 20px 0",
              }}
            >
              Your saved results and referral tracking will not be connected to your account until you confirm.
            </Text>
          </Section>

          <Section style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #e0e0e0" }}>
            <Text
              style={{
                color: "#666666",
                fontSize: "12px",
                lineHeight: "1.6",
                margin: "0",
              }}
            >
              If you didn't request this email, you can ignore it.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default SignupConfirmationEmail

