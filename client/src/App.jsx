import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SnippetNew from './pages/SnippetNew';
import SnippetDetail from './pages/SnippetDetail';
import SnippetEdit from './pages/SnippetEdit';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import About from './pages/About';
import PrivacyPolicy from './pages/LegalPrivacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import ProtectedRoute from './routes/ProtectedRoute';
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <div className="flex-1 w-full flex flex-col">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snippets/new"
            element={
              <ProtectedRoute>
                <SnippetNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snippets/:id"
            element={
              <ProtectedRoute>
                <SnippetDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snippets/:id/edit"
            element={
              <ProtectedRoute>
                <SnippetEdit />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Landing />} />
        </Routes>
      </div>
      <Footer />
      <Analytics />
    </div>
  );
}
