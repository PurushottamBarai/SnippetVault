export default function Terms() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Terms and Conditions</h1>
        <p className="text-muted mt-2 text-sm">
          Last updated: October 2026
        </p>
      </div>

      <div className="space-y-6 text-foreground/90 leading-relaxed text-sm bg-card border border-border rounded-lg p-6 sm:p-8">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
          <p className="text-muted">
            By creating an account, browsing, or utilizing DevVault, you agree to comply with and be bound by these Terms of Service. If you disagree with any portion of these terms, you should immediately cease use of the service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">2. Accounts and Authentication</h2>
          <p className="text-muted">
            You are responsible for maintaining the confidentiality of your account credentials (including passwords and linked OAuth providers) and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">3. Content Ownership & Rights</h2>
          <p className="text-muted">
            You retain 100% full ownership, rights, and intellectual property over any code snippets, documentation, and notes you create or upload to DevVault. DevVault does not claim any ownership over your code.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">4. Acceptable Use</h2>
          <p className="text-muted mb-2">You agree not to use DevVault to:</p>
          <ul className="list-disc list-inside text-muted space-y-1">
            <li>Store or distribute malicious code, malware, viruses, or illegal material.</li>
            <li>Attempt to breach, exploit, or bypass system rate limits or server infrastructure.</li>
            <li>Abuse automated scraping tools or reverse engineer the service without written consent.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">5. Disclaimer of Warranties</h2>
          <p className="text-muted">
            DevVault is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. While we strive for maximum uptime and reliability, we do not guarantee uninterrupted or error-free operation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">6. Limitation of Liability</h2>
          <p className="text-muted">
            To the maximum extent permitted by law, DevVault shall not be liable for any indirect, incidental, or consequential damages resulting from your use of or inability to use the service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">7. Contact Information</h2>
          <p className="text-muted">
            For questions about these Terms, reach out to us at{' '}
            <a href="mailto:devvault@onshare.me" className="text-primary hover:underline">
              devvault@onshare.me
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
