import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">About DevVault</h1>
        <p className="text-muted mt-2 text-base">
          A centralized, developer-first hub for capturing, organizing, and discovering code snippets.
        </p>
      </div>

      <div className="space-y-8 text-foreground/90 leading-relaxed text-sm sm:text-base">
        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3 text-foreground">Our Mission</h2>
          <p className="text-muted">
            Developers write and discover brilliant solutions every day, but keeping track of them across gists, browser bookmarks, and local scratchpads is chaotic. DevVault was created to give engineers a clean, fast, and organized vault to save their most valuable snippets with full syntax support and AI-assisted workflows.
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2">Lightning Fast Organization</h3>
            <p className="text-muted text-sm">
              Tag, filter, and search across languages seamlessly with zero clutter. Find whatever solution you need in milliseconds.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2"> AI-Powered Intelligence</h3>
            <p className="text-muted text-sm">
              Integrated with Google Gemini to auto-suggest relevant tags and provide instant, accurate explanations for complex code fragments.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2"> Secure & Seamless Auth</h3>
            <p className="text-muted text-sm">
              Effortless single sign-on with GitHub and Google OAuth alongside traditional password authentication.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2"> Developer-First UI</h3>
            <p className="text-muted text-sm">
              Engineered with a high-contrast dark theme, monospace syntax support, and keyboard-friendly navigation.
            </p>
          </div>
        </section>

        <section className="bg-card border border-border rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-foreground">Ready to streamline your code library?</h3>
            <p className="text-muted text-sm mt-1">Get started in seconds for free.</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/register"
              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-md hover:bg-secondary/80 transition"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
