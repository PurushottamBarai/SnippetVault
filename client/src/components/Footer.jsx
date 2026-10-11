import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto m-3 pt-3 pb-2 px-4 sm:px-6 text-[12px] text-muted flex flex-col sm:flex-row items-center justify-between gap-2">
      <div>Developer Snippet Vault &copy; 2026. Built with React, Express and Google Gemini.</div>
      <div className="flex flex-wrap items-center gap-4">
        <Link to="/about" className="hover:text-foreground transition">About</Link>
        <Link to="/privacy" className="hover:text-foreground transition">Privacy</Link>
        <Link to="/terms" className="hover:text-foreground transition">Terms</Link>
        <Link to="/contact" className="hover:text-foreground transition">Contact</Link>
        <span className="text-border">|</span>
        <Link to="/login" className="hover:text-foreground transition">Log in</Link>
        <Link to="/register" className="hover:text-foreground transition">Sign up</Link>
      </div>
    </footer>
  );
}
