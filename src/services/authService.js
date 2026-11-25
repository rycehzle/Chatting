import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase.js';

const ALIAS_DOMAIN = import.meta.env.VITE_AUTH_ALIAS_DOMAIN || 'pa.example.com';
const USERNAME_RE = /^[a-z0-9._-]{2,30}$/;

// Username dipetakan ke email alias internal. Tidak ada lookup ke database.
export function toAuthEmail(username) {
  const u = String(username).trim().toLowerCase();
  if (!USERNAME_RE.test(u)) throw new Error('INVALID_USERNAME');
  return `${u}@${ALIAS_DOMAIN}`;
}

// Role dibaca dari users/{uid}. Dokumen ini hanya bisa dibuat lewat Firebase Console,
// dan Security Rules melarang klien mengubah role.
async function loadProfile(fbUser) {
  const snap = await getDoc(doc(db, 'users', fbUser.uid));
  if (!snap.exists()) throw new Error('NOT_AUTHORIZED');
  const d = snap.data();
  return { uid: fbUser.uid, username: d.username, name: d.displayName, role: d.role === 'admin' ? 'admin' : 'member' };
}

export const login = (username, password) => signInWithEmailAndPassword(auth, toAuthEmail(username), password);
export const logout = () => signOut(auth);

export function watchAuth(callback) {
  return onAuthStateChanged(auth, async (fbUser) => {
    if (!fbUser) return callback(null);
    try {
      callback(await loadProfile(fbUser));
    } catch {
      await signOut(auth);
      callback(null, 'Akun ini tidak diotorisasi.');
    }
  });
}
