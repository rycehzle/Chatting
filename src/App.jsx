import { useEffect } from 'react';
import cfg from './config/appConfig.js';
import LoginPage from './pages/LoginPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import useAuth from './hooks/useAuth.js';

export default function App() {
  useEffect(() => { document.title = cfg.appName; }, []);
  const { user, loading, notice, login, logout } = useAuth();

  if (loading) {
    return <div style={{ height: '100dvh', display: 'grid', placeItems: 'center', color: 'var(--text-3)' }}>Memuat…</div>;
  }
  return user ? <ChatPage user={user} onLogout={logout} /> : <LoginPage onLogin={login} notice={notice} />;
}
