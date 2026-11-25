import Brand from '../common/Brand.jsx';
import cfg from '../../config/appConfig.js';
import { useState } from 'react';
import Avatar from '../common/Avatar.jsx';
import RoomMenu from './RoomMenu.jsx';
import { ChevronIcon, ExploreIcon, ImagesIcon, LibraryIcon, LogoutIcon, MoonIcon, NewChatIcon, PanelIcon, PluginsIcon, ScheduledIcon, SearchIcon, SunIcon } from '../common/Icons.jsx';
import { formatRelative } from '../../utils/format.js';
import s from './Sidebar.module.css';

const NAV_ICONS = { images: ImagesIcon, scheduled: ScheduledIcon, library: LibraryIcon, plugins: PluginsIcon, explore: ExploreIcon };

export default function Sidebar({ user, rooms, activeId, theme, onToggleTheme, onSelect, onNew, onRename, onArchive, onDelete, onLogout, onClose, onCollapse }) {
  const [editingId, setEditingId] = useState(null);
  const [showArchive, setShowArchive] = useState(false);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const match = (r) => !q || `${r.title} ${r.lastMessage}`.toLowerCase().includes(q);
  const active = rooms.filter((r) => !r.archived && match(r));
  const archived = rooms.filter((r) => r.archived && match(r));

  const renderRoom = (r) => (
    <li key={r.id}>
      <div
        className={`${s.room} ${r.id === activeId ? s.active : ''}`}
        title={`${r.title}\n${formatRelative(r.updatedAt)} · ${r.lastMessage || 'Belum ada pesan'}`}
        onDoubleClick={() => setEditingId(r.id)}
        onClick={() => { if (editingId !== r.id) { onSelect(r.id); onClose?.(); } }}
      >
        {editingId === r.id ? (
          <input
            className={s.edit} autoFocus defaultValue={r.title}
            onClick={(e) => e.stopPropagation()}
            onBlur={(e) => { onRename(r.id, e.target.value); setEditingId(null); }}
            onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); if (e.key === 'Escape') setEditingId(null); }}
          />
        ) : (
          <span className={s.title}>{r.title}</span>
        )}
        <RoomMenu
          room={r}
          onRename={() => setEditingId(r.id)}
          onArchive={() => onArchive(r.id)}
          onDelete={() => window.confirm(`Hapus "${r.title}" untuk semua orang?`) && onDelete(r.id)}
        />
      </div>
    </li>
  );

  return (
    <aside className={s.sidebar}>
      <div className={s.top}>
        <span className={s.brand}><Brand /></span>
        {cfg.features.search && <button className={s.iconBtn} onClick={() => { setSearching((v) => !v); setQuery(''); }} aria-label="Cari percakapan"><SearchIcon /></button>}
        <button className={s.iconBtn} onClick={onCollapse} aria-label="Tutup sidebar"><PanelIcon /></button>
      </div>

      {searching && (
        <input className={s.search} autoFocus placeholder="Cari percakapan…" value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Escape' && (setSearching(false), setQuery(''))} />
      )}

      <button className={s.nav} onClick={() => { onNew(); onClose?.(); }}><NewChatIcon /> {cfg.labels.newChat}</button>
      {(cfg.navItems || []).map((n) => {
        const Icon = NAV_ICONS[n.icon];
        return Icon && <button key={n.id} className={s.nav} title="Segera hadir"><Icon /> {n.label}</button>;
      })}

      <nav className={s.list} aria-label="Riwayat percakapan">
        <p className={s.label}>{cfg.labels.history}</p>
        {active.length === 0 && <p className={s.empty}>{q ? 'Tidak ada hasil.' : 'Belum ada percakapan.'}</p>}
        <ul>{active.map(renderRoom)}</ul>

        {archived.length > 0 && (
          <>
            <button className={s.archiveToggle} onClick={() => setShowArchive((v) => !v)} aria-expanded={showArchive}>
              <ChevronIcon width={14} height={14} style={{ transform: showArchive || q ? 'none' : 'rotate(-90deg)' }} /> {cfg.labels.archive} ({archived.length})
            </button>
            {(showArchive || q) && <ul>{archived.map(renderRoom)}</ul>}
          </>
        )}
      </nav>

      <div className={s.footer}>
        <div className={s.me}>
          <Avatar name={user.name} />
          <div><strong>{user.name}</strong><small>{user.role === 'admin' ? 'Admin' : 'Member'}</small></div>
        </div>
        <button className={s.iconBtn} onClick={onToggleTheme} aria-label="Ganti tema">{theme === 'light' ? <MoonIcon /> : <SunIcon />}</button>
        <button className={s.iconBtn} onClick={onLogout} aria-label="Keluar"><LogoutIcon /></button>
      </div>
    </aside>
  );
}
