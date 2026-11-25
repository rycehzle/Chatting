import cfg from '../config/appConfig.js';
// Data dummy untuk Phase 2. Akan diganti Firestore di Phase 4.
export const DUMMY_USERS = {
  admin: { uid: 'u-admin', username: 'admin', name: cfg.profiles.admin, role: 'admin', password: 'demo' },
  member: { uid: 'u-member', username: 'member', name: cfg.profiles.member, role: 'member', password: 'demo' },
};

const m = (id, sender, text, minsAgo, status = 'read') => ({
  id, sender, text, createdAt: Date.now() - minsAgo * 60000, status,
});

export const INITIAL_ROOMS = [
  {
    id: 'r1', title: 'Rencana liburan', createdBy: 'u-admin', archived: false,
    createdAt: Date.now() - 86400000 * 3,
    messages: [
      m('m1', 'u-admin', 'Jadi weekend ini jadi ke pantai?', 190),
      m('m2', 'u-member', 'Jadi dong 🏖️ aku udah cek cuacanya cerah.', 185),
      m('m3', 'u-admin', 'Mantap. Berangkat jam 7 ya.', 180),
    ],
  },
  {
    id: 'r2', title: 'Catatan belanja', createdBy: 'u-member', archived: false,
    createdAt: Date.now() - 86400000,
    messages: [
      m('m4', 'u-member', 'Titip beli telur sama susu ya.', 1500),
      m('m5', 'u-admin', 'Oke, ada lagi?', 1490),
    ],
  },
  {
    id: 'r3', title: 'Proyek lama', createdBy: 'u-admin', archived: true,
    createdAt: Date.now() - 86400000 * 20,
    messages: [m('m6', 'u-admin', 'Semua sudah selesai, kita arsipkan.', 28800)],
  },
];
