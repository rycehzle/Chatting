import cfg from '../../config/appConfig.js';
import { useRef, useState } from 'react';
import { SendIcon } from '../common/Icons.jsx';
import s from './MessageInput.module.css';

export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState('');
  const ref = useRef(null);

  const resize = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 180) + 'px';
  };

  const submit = () => {
    const value = text.trim();
    if (!value || disabled) return;
    onSend(value);
    setText('');
    requestAnimationFrame(resize);
  };

  return (
    <div className={s.wrap}>
      <div className={s.box}>
        <textarea
          ref={ref}
          rows={1}
          value={text}
          placeholder={disabled ? 'Percakapan diarsipkan' : cfg.labels.placeholder}
          disabled={disabled}
          maxLength={4000}
          onChange={(e) => { setText(e.target.value); resize(); }}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); submit(); } }}
        />
        <button className={s.send} onClick={submit} disabled={!text.trim() || disabled} aria-label="Kirim pesan"><SendIcon /></button>
      </div>
      {cfg.features.hint && <p className={s.hint}>{cfg.labels.hint}</p>}
    </div>
  );
}
