import { useEffect, useRef, useState } from 'react';
import { MoreIcon } from './Icons.jsx';
import s from './RoomMenu.module.css';

export default function RoomMenu({ room, onRename, onArchive, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const act = (fn) => (e) => { e.stopPropagation(); setOpen(false); fn(); };

  return (
    <div className={s.wrap} ref={ref}>
      <button className={s.trigger} aria-label="Opsi percakapan" onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}>
        <MoreIcon />
      </button>
      {open && (
        <div className={s.menu} role="menu">
          <button role="menuitem" onClick={act(onRename)}>Ubah judul</button>
          <button role="menuitem" onClick={act(onArchive)}>{room.archived ? 'Keluarkan dari arsip' : 'Arsipkan'}</button>
          <button role="menuitem" className={s.danger} onClick={act(onDelete)}>Hapus</button>
        </div>
      )}
    </div>
  );
}
