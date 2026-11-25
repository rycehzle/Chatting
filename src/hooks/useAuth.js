import { useCallback, useEffect, useState } from 'react';
import { isFirebaseConfigured } from '../firebase/firebase.js';
import { DUMMY_USERS } from '../data/dummy.js';
import * as authService from '../services/authService.js';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!isFirebaseConfigured) return undefined;
    return authService.watchAuth((u, msg) => {
      setUser(u);
      if (msg) setNotice(msg);
      setLoading(false);
    });
  }, []);

  // Mengembalikan string pesan error, atau '' jika berhasil.
  const login = useCallback(async (username, password) => {
    setNotice('');
    if (!isFirebaseConfigured) {
      const u = DUMMY_USERS[username.trim().toLowerCase()];
      if (!u || u.password !== password) return 'Username atau password salah.';
      setUser(u);
      return '';
    }
    try {
      await authService.login(username, password);
      return '';
    } catch {
      return 'Username atau password salah.'; // pesan sama untuk semua kegagalan
    }
  }, []);

  const logout = useCallback(() => (isFirebaseConfigured ? authService.logout() : setUser(null)), []);

  return { user, loading, notice, login, logout };
}
