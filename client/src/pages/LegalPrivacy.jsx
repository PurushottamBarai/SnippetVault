export default function PrivacyPolicy() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
        <p className="text-muted mt-2 text-sm">
          Last updated: October 2026
        </p>
      </div>

      <div className="space-y-6 text-foreground/90 leading-relaxed text-sm bg-card border border-border rounded-lg p-6 sm:p-8">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">1. Overview</h2>
          <p className="text-muted">
            DevVault (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you access or use DevVault.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">2. Information We Collect</h2>
          <ul className="list-disc list-inside text-muted space-y-1">
            <li><strong className="text-foreground">Account Information:</strong> When registering, we collect your name and email address. If using OAuth (Google or GitHub), we receive your verified email, public name, and avatar URL provided by that service.</li>
            <li><strong className="text-foreground">User Content:</strong> Code snippets, titles, tags, descriptions, and language metadata you save inside DevVault.</li>
            <li><strong className="text-foreground">Usage Data:</strong> Basic technical logs such as IP address, browser type, and interaction metrics to maintain server reliability and security.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">3. How We Use Your Information</h2>
          <p className="text-muted mb-2">We use collected information solely to:</p>
          <ul className="list-disc list-inside text-muted space-y-1">
            <li>Provide, maintain, and authenticate your access to DevVault.</li>
            <li>Store and organize your personal code snippets and favorites.</li>
            <li>Provide optional AI explanations and tag recommendations via Google Gemini.</li>
            <li>Ensure security and prevent abuse or unauthorized access.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">4. Third-Party Integrations</h2>
          <p className="text-muted">
            We integrate with reputable third-party services:
          </p>
          <ul className="list-disc list-inside text-muted space-y-1 mt-2">
            <li><strong className="text-foreground">Google OAuth & GitHub OAuth:</strong> For single sign-on authentication. We only request basic public profile and email permissions.</li>
            <li><strong className="text-foreground">Google Gemini API:</strong> When you invoke AI features (explanation or auto-tagging), snippet text is processed to generate suggestions.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">5. Data Retention & Deletion</h2>
          <p className="text-muted">
            Your snippets and account data remain stored until you modify or delete them. You can delete individual snippets or request full account removal at any time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">6. Contact Us</h2>
          <p className="text-muted">
            If you have questions or concerns regarding this policy, please email us at{' '}
            <a href="mailto:devvault@onshare.me" className="text-primary hover:underline">
              devvault@onshare.me
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
