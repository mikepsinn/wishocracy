import Layout from "@/components/layout"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getSiteConfig } from "@/lib/site-config"

export default function TermsPage() {
  const config = getSiteConfig()
  return (
    <Layout>
      <div className="min-h-screen bg-background px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-center mb-8">
            TERMS OF SERVICE
          </h1>

          <p className="text-center text-lg mb-12 max-w-2xl mx-auto">Last Updated: March 11, 2026</p>

          <Card className="p-8 border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="space-y-8 text-foreground">
              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">1. ACCEPTANCE OF TERMS</h2>
                <p className="leading-relaxed">
                  By accessing and using Wishocracy (the "Website"), you accept and agree to be bound by these Terms of
                  Service ("Terms"). If you do not agree to these Terms, please do not use the Website. {config.title} ({config.name}, "we", "us", or "our") reserves the right to modify these Terms at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">2. DESCRIPTION OF SERVICE</h2>
                <p className="leading-relaxed">
                  Wishocracy is a comparison and allocation tool that helps people express priorities across different public goods. The Website allows users to complete comparisons, save results, and share referral links.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">3. USER ACCOUNTS</h2>
                <h3 className="text-xl font-bold mb-2">Account Creation</h3>
                <p className="leading-relaxed mb-4">
                  To access certain features, you may need to create an account. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>

                <h3 className="text-xl font-bold mb-2 mt-6">Account Termination</h3>
                <p className="leading-relaxed">
                  We reserve the right to suspend or terminate your account if you violate these Terms or engage in
                  fraudulent, abusive, or illegal activity.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">4. USER CONDUCT</h2>
                <p className="leading-relaxed mb-4">You agree NOT to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use the Website for any illegal purpose or in violation of any laws</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation</li>
                  <li>Interfere with or disrupt the Website or servers</li>
                  <li>Attempt to gain unauthorized access to any portion of the Website</li>
                  <li>Upload viruses, malware, or any malicious code</li>
                  <li>Harvest or collect information about other users</li>
                  <li>Use automated systems (bots, scrapers) without permission</li>
                  <li>Use the service to spam, manipulate referral tracking, or mislead others</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">5. REFERRAL PROGRAM</h2>
                <p className="leading-relaxed">
                  Our referral tracking system allows you to share your unique referral link and track how many people
                  create accounts through your link. You agree not to engage in fraudulent referral
                  activities, including but not limited to creating fake accounts, using automated systems, or
                  misleading others about the nature of the referral program.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">6. INTELLECTUAL PROPERTY</h2>
                <h3 className="text-xl font-bold mb-2">Our Content</h3>
                <p className="leading-relaxed mb-4">
                  All content on the Website, including text, graphics, logos, images, and software, is the property of
                  {config.title} or its licensors and is protected by copyright, trademark, and other intellectual property laws.
                </p>

                <h3 className="text-xl font-bold mb-2">Your Content</h3>
                <p className="leading-relaxed mb-4">
                  When you submit content to the Website, you grant {config.title} a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display that content in connection with operating the Website.
                </p>

                <h3 className="text-xl font-bold mb-2">Sharing and Attribution</h3>
                <p className="leading-relaxed">
                  We encourage sharing of your referral link and public-facing information about the project, provided you do not misrepresent the service or claim endorsements that do not exist.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">7. DISCLAIMERS</h2>
                <p className="leading-relaxed mb-4">
                  THE WEBSITE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                  IMPLIED. WE DO NOT WARRANT THAT:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The Website will be uninterrupted, secure, or error-free</li>
                  <li>The information provided is accurate, complete, or current</li>
                  <li>Any defects will be corrected</li>
                  <li>The Website is free of viruses or harmful components</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  The information on this Website is for informational purposes only and does not constitute medical,
                  legal, or financial advice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">8. LIMITATION OF LIABILITY</h2>
                <p className="leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, {config.name.toUpperCase()} SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                  CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR
                  INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF
                  THE WEBSITE.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">9. INDEMNIFICATION</h2>
                <p className="leading-relaxed">
                  You agree to indemnify, defend, and hold harmless {config.title} and its officers, directors, employees, and
                  agents from any claims, liabilities, damages, losses, and expenses (including legal fees) arising out
                  of your use of the Website, violation of these Terms, or violation of any rights of another.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">10. GOVERNING LAW</h2>
                <p className="leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in
                  which {config.title} is registered, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">11. DISPUTE RESOLUTION</h2>
                <p className="leading-relaxed">
                  Any disputes arising from these Terms or your use of the Website shall be resolved through binding
                  arbitration, except that either party may seek injunctive relief in court for intellectual property
                  infringement or violation of confidentiality obligations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">12. SEVERABILITY</h2>
                <p className="leading-relaxed">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall be
                  limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in
                  full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">13. CONTACT INFORMATION</h2>
                <p className="leading-relaxed">If you have questions about these Terms, please contact us at:</p>
                <div className="mt-4 p-4 bg-brutal-yellow border-4 border-primary">
                  <p className="font-bold">{config.title}</p>
                  <p>Email: {config.email}</p>
                  <p>Website: {config.domain}</p>
                </div>
              </section>
            </div>
          </Card>

          <div className="mt-10 flex justify-center">
            <Link href="/">
              <Button className="h-14 px-8 text-lg font-black uppercase bg-brutal-cyan text-foreground border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                Back to Wishocracy
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
