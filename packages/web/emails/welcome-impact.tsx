import { Body, Button, Container, Head, Html, Preview, Section, Text } from "@react-email/components"
import * as React from "react"

interface WelcomeImpactEmailProps {
  userName: string
  referralLink: string
  orgName?: string
  primaryColor?: string
}

export const WelcomeImpactEmail = ({
  userName,
  referralLink,
  orgName = "Wishocracy",
  primaryColor = "#FF6B9D",
}: WelcomeImpactEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Wishocracy account is ready. Save results and share your referral link.</Preview>
      <Body
        style={{
          backgroundColor: "#f5f5f5",
          fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            border: "4px solid #000000",
            margin: "0 auto",
            maxWidth: "600px",
            padding: "40px",
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: "36px",
              fontWeight: "900",
              margin: "0 0 24px 0",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            Welcome to {orgName}
          </Text>

          <Text
            style={{
              color: "#000000",
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "1.7",
              margin: "0 0 18px 0",
            }}
          >
            Hi {userName},
          </Text>

          <Text
            style={{
              color: "#000000",
              fontSize: "16px",
              lineHeight: "1.7",
              margin: "0 0 24px 0",
            }}
          >
            Your account is ready. You can now keep your allocations synced across sessions and share a referral link with other people who want to compare their priorities.
          </Text>

          <Section
            style={{
              backgroundColor: "#00D4FF",
              border: "4px solid #000000",
              marginBottom: "24px",
              padding: "24px",
            }}
          >
            <Text
              style={{
                color: "#000000",
                fontSize: "22px",
                fontWeight: "900",
                margin: "0 0 12px 0",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Your referral link
            </Text>
            <Text
              style={{
                backgroundColor: "#ffffff",
                border: "3px solid #000000",
                color: "#000000",
                fontSize: "16px",
                fontWeight: "700",
                lineHeight: "1.7",
                margin: "0",
                padding: "16px",
                wordBreak: "break-word",
              }}
            >
              {referralLink}
            </Text>
          </Section>

          <Section
            style={{
              backgroundColor: "#FFE66D",
              border: "4px solid #000000",
              marginBottom: "24px",
              padding: "24px",
            }}
          >
            <Text
              style={{
                color: "#000000",
                fontSize: "22px",
                fontWeight: "900",
                margin: "0 0 12px 0",
                textTransform: "uppercase",
              }}
            >
              Next steps
            </Text>
            <Text
              style={{
                color: "#000000",
                fontSize: "16px",
                lineHeight: "1.7",
                margin: "0 0 10px 0",
              }}
            >
              1. Keep comparing until your allocation feels representative.
            </Text>
            <Text
              style={{
                color: "#000000",
                fontSize: "16px",
                lineHeight: "1.7",
                margin: "0 0 10px 0",
              }}
            >
              2. Compare your budget against the community average and current government spending.
            </Text>
            <Text
              style={{
                color: "#000000",
                fontSize: "16px",
                lineHeight: "1.7",
                margin: "0",
              }}
            >
              3. Share your link so more people can add their priorities to the dataset.
            </Text>
          </Section>

          <Button
            href="https://wishocracy.org/"
            style={{
              backgroundColor: primaryColor,
              border: "4px solid #000000",
              color: "#000000",
              display: "inline-block",
              fontSize: "16px",
              fontWeight: "900",
              padding: "14px 22px",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            Go to Wishocracy
          </Button>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeImpactEmail
