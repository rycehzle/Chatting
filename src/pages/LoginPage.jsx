import { useState } from 'react';
import Brand from '../components/common/Brand.jsx';
import cfg from '../config/appConfig.js';
import { isFirebaseConfigured } from '../firebase/firebase.js';
import s from './LoginPage.module.css';

export default function LoginPage({ onLogin, notice }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const msg = await onLogin(username, password);
    setBusy(false);
    if (msg) setError(msg);
  };

  return (
    <div className={s.page}>
      <form className={s.card} onSubmit={submit}>
        <div className={s.mark}><Brand part="logo" size={44} /></div>
        <h1>{cfg.login.title}</h1>
        <p>{cfg.login.subtitle}</p>
        <label>Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" autoCapitalize="none" autoFocus required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
        </label>
        {(error || notice) && <div className={s.error} role="alert">{error || notice}</div>}
        <button type="submit" className={s.submit} disabled={busy}>{busy ? 'Memproses…' : 'Masuk'}</button>
        {!isFirebaseConfigured && <small className={s.demo}>Mode demo: <b>admin</b> atau <b>member</b>, password <b>demo</b></small>}
      </form>
    </div>
  );
}
