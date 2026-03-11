import { ROUTES } from '@/lib/routes'

export default function VerifyRequest() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] p-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-2">Check your email</h1>
          <div className="mx-auto my-6 h-1 w-20 bg-black"></div>
          <p className="text-lg">
            A sign-in link has been sent to your email address.
          </p>
        </div>

        <div className="space-y-4 text-center">
          <div className="rounded-xl bg-[#FDFD96] p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-bold mb-2">📧 Check your inbox</p>
            <p className="text-sm">
              Click the link in the email to sign in to your account. The link will expire in 24 hours.
            </p>
          </div>

          <div className="text-sm text-gray-600">
            <p>Didn't receive an email?</p>
            <p>Check your spam folder or try signing in again.</p>
          </div>

          <a
            href={ROUTES.signIn}
            className="inline-block mt-4 px-6 py-3 bg-black text-white font-bold rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  )
}
