import { useState, useEffect } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Contact() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || ''
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/contact', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim()
      });
      setSubmitted(true);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Failed to deliver message through the server. You can also email us directly at devvault@onshare.me'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Contact Us</h1>
        <p className="text-muted mt-2 text-sm sm:text-base">
          Have questions or need help with DevVault? Reach out directly or send us a message below.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Direct Email Card */}
        <div className="md:col-span-2 bg-card border border-border rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Get in Touch</h2>
            <p className="text-muted text-sm leading-relaxed mb-4">
              We respond quickly to all feedback, bug reports, and inquiries.
            </p>

            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-xs uppercase tracking-wider text-muted font-mono">Email Support</span>
                <a
                  href="mailto:devvault@onshare.me"
                  className="text-primary font-medium hover:underline break-all text-sm"
                >
                  devvault@onshare.me
                </a>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-muted font-mono">Response Time</span>
                <span className="text-muted text-sm">Within 24–48 hours</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border mt-6 text-xs text-muted">
            For technical bug reports, please include steps to reproduce in your message.
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-3 bg-card border border-border rounded-lg p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h3 className="text-lg font-semibold text-foreground">Message Sent!</h3>
              <p className="text-muted text-sm leading-relaxed">
                Thank you, <span className="text-foreground font-medium">{formData.name}</span>. Your message has been sent to our team at{' '}
                <strong className="text-foreground">devvault@onshare.me</strong>. We will get back to you at{' '}
                <span className="text-foreground font-medium">{formData.email}</span> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    message: ''
                  });
                }}
                className="mt-4 px-4 py-2 bg-secondary text-secondary-foreground text-xs font-medium rounded-md hover:bg-secondary/80 transition"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm bg-destructive/10 border border-destructive/20 text-destructive rounded-md">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1">
                  Name <span className="text-primary">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-muted/60 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1">
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-muted/60 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-muted/60 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition text-sm cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending message...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
