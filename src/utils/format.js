export const formatTime = (ts) =>
  new Date(ts).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

export function formatRelative(ts) {
  const min = Math.floor((Date.now() - ts) / 60000);
  if (min < 1) return 'Baru saja';
  if (min < 60) return `${min} mnt lalu`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} jam lalu`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} hari lalu`;
  return new Date(ts).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
