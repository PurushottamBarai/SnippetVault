import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Code2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import OAuthButtons from '../components/OAuthButtons';

export default function Register() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      setLoading(true);
      await register(name, email, password);
      showToast('Account created successfully');
      navigate('/dashboard');
    } catch (err) {
      const errData = err.response?.data?.error;
      const msg = typeof errData === 'string' ? errData : errData?.message || 'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex">
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-surface text-foreground p-12 border-r border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-semibold text-[16px] tracking-tight">Snippet Vault</span>
        </div>

        <div className="space-y-4 max-w-md">
          <h2 className="text-[28px] font-semibold tracking-tight text-foreground leading-tight">
            Stop losing snippets across scattered chats and gists.
          </h2>
          <p className="text-[14px] text-muted leading-relaxed">
            Create an account to build your private, searchable engineering knowledge base with AI auto-tagging.
          </p>
        </div>

        <div className="text-[12px] text-muted font-mono">
          Developer-focused • Zero boilerplate • Instant indexing
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-90 space-y-6">
          <div>
            <h1 className="text-[24px] font-semibold text-foreground tracking-tight">Create account</h1>
            <p className="text-[13px] text-muted mt-1">Get started with your developer vault.</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 text-[13px] text-destructive bg-destructive-subtle border border-destructive/20 rounded-md">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <OAuthButtons />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-foreground mb-1.5">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Linus Torvalds"
                required
                className="w-full h-9 px-3 text-[14px] bg-background border border-strong rounded-md text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-foreground mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full h-9 px-3 text-[14px] bg-background border border-strong rounded-md text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  className="w-full h-9 px-3 pr-10 text-[14px] bg-background border border-strong rounded-md text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2.5 top-2 text-muted hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[12px] text-muted mt-1">Must be at least 8 characters.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-9 bg-primary text-primary-foreground font-medium text-[13px] rounded-md hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <p className="text-[13px] text-center text-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
