import cfg from '../config/appConfig.js';
import { CheckAllIcon, CheckIcon, ClockIcon } from './Icons.jsx';
import { formatTime } from '../utils/format.js';
import s from './MessageBubble.module.css';

const STATUS = {
  sending: { icon: <ClockIcon width={13} height={13} />, label: 'Mengirim' },
  sent: { icon: <CheckIcon width={13} height={13} />, label: 'Terkirim' },
  read: { icon: <CheckAllIcon width={13} height={13} />, label: 'Dibaca' },
};

export default function MessageBubble({ message, mine, senderName, first }) {
  const st = STATUS[message.status];
  return (
    <div className={`${s.row} ${mine ? s.mine : ''} ${first ? s.first : ''} ${!mine && cfg.features.otherBubble ? s.boxed : ''}`}>
      {!mine && first && <span className={s.name}>{senderName}</span>}
      <div className={s.bubble}>{message.text}</div>
      <span className={s.meta}>
        {cfg.features.timestamps && formatTime(message.createdAt)}
        {mine && st && cfg.features.status && <span className={`${s.status} ${message.status === 'read' ? s.read : ''}`} title={st.label}>{st.icon}</span>}
      </span>
    </div>
  );
}
