import { useState } from 'react';
import { PanelIcon } from '../components/common/Icons.jsx';
import s from './AppLayout.module.css';

export default function AppLayout({ renderSidebar, title, children }) {
  const [open, setOpen] = useState(false);          // drawer (mobile)
  const [collapsed, setCollapsed] = useState(false); // sidebar tertutup (desktop)

  return (
    <div className={s.shell}>
      <div className={`${s.side} ${collapsed ? s.collapsed : ''} ${open ? s.open : ''}`}>
        <div className={s.sideInner}>
          {renderSidebar({ closeDrawer: () => setOpen(false), collapse: () => { setOpen(false); setCollapsed(true); } })}
        </div>
      </div>
      {open && <div className={s.scrim} onClick={() => setOpen(false)} />}
      <main className={s.main}>
        <header className={s.header}>
          <button className={`${s.burger} ${collapsed ? s.show : ''}`} onClick={() => { setOpen(true); setCollapsed(false); }} aria-label="Buka sidebar"><PanelIcon /></button>
          <h1>{title}</h1>
        </header>
        {children}
      </main>
    </div>
  );
}
