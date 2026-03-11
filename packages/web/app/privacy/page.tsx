import Layout from "@/components/layout"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getSiteConfig, getEmail } from "@/lib/site-config"

export default function PrivacyPage() {
  const config = getSiteConfig()
  return (
    <Layout>
      <div className="min-h-screen bg-background px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-center mb-8">
            PRIVACY POLICY
          </h1>

          <p className="text-center text-lg mb-12 max-w-2xl mx-auto">Last Updated: March 11, 2026</p>

          <Card className="p-8 border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="space-y-8 text-foreground">
              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">1. INTRODUCTION</h2>
                <p className="leading-relaxed">
                  {config.title} ({config.name}, "we", "us", or "our") is committed to protecting your
                  privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                  when you use Wishocracy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">2. INFORMATION WE COLLECT</h2>
                <h3 className="text-xl font-bold mb-2">Personal Information</h3>
                <p className="leading-relaxed mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Create or sign in to an account</li>
                  <li>Save budget allocations</li>
                  <li>Use or share referral links</li>
                  <li>Subscribe to updates</li>
                  <li>Contact us directly</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  This information may include your name, email address, referral metadata, and any information you choose to send us.
                </p>

                <h3 className="text-xl font-bold mb-2 mt-6">Automatically Collected Information</h3>
                <p className="leading-relaxed">
                  We automatically collect basic usage and device information needed to run the site, secure accounts,
                  and understand how people use the comparison flow.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">3. HOW WE USE YOUR INFORMATION</h2>
                <p className="leading-relaxed mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, operate, and maintain our website and services</li>
                  <li>Save your allocations and sync them across sessions</li>
                  <li>Generate and track referral links</li>
                  <li>Send sign-in and onboarding emails</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve and optimize our website and services</li>
                  <li>Prevent fraud and enhance security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">4. SHARING YOUR INFORMATION</h2>
                <p className="leading-relaxed mb-4">
                  We do not sell your personal information. We may share your information in the following
                  circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>With your consent:</strong> When you deliberately share your referral link or exported results
                  </li>
                  <li>
                    <strong>Service providers:</strong> With vendors who help us run authentication, email delivery, analytics, and hosting
                  </li>
                  <li>
                    <strong>Legal requirements:</strong> When required by law or to protect our rights
                  </li>
                  <li>
                    <strong>Aggregated data:</strong> We may share anonymized statistics about collective allocation patterns
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">5. COOKIES AND TRACKING</h2>
                <p className="leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and hold certain
                  information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                  sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">6. YOUR RIGHTS</h2>
                <p className="leading-relaxed mb-4">Depending on your location, you may have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Access:</strong> Request access to your personal information
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of inaccurate information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal information
                  </li>
                  <li>
                    <strong>Opt-out:</strong> Opt out of marketing communications
                  </li>
                  <li>
                    <strong>Data portability:</strong> Request a copy of your data in a portable format
                  </li>
                </ul>
                <p className="leading-relaxed mt-4">To exercise these rights, please contact us at {getEmail()}</p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">7. DATA SECURITY</h2>
                <p className="leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal
                  information. However, no method of transmission over the Internet or electronic storage is 100%
                  secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">8. CHILDREN'S PRIVACY</h2>
                <p className="leading-relaxed">
                  Our website is not intended for children under 13 years of age. We do not knowingly collect personal
                  information from children under 13. If you believe we have collected information from a child under
                  13, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">9. INTERNATIONAL TRANSFERS</h2>
                <p className="leading-relaxed">
                  Your information may be transferred to and maintained on computers located outside of your state,
                  province, country, or other governmental jurisdiction where data protection laws may differ. By using
                  our website, you consent to such transfers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">10. CHANGES TO THIS POLICY</h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this
                  Privacy Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black uppercase mb-4 text-brutal-pink">11. CONTACT US</h2>
                <p className="leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
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
