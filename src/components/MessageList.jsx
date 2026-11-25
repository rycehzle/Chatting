import cfg from '../config/appConfig.js';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MessageBubble from './MessageBubble.jsx';
import { ArrowDownIcon } from './Icons.jsx';
import { DUMMY_USERS } from '../data/dummy.js';
import s from './MessageList.module.css';

const nameOf = (uid) => Object.values(DUMMY_USERS).find((u) => u.uid === uid)?.name || 'Pengguna';

export default function MessageList({ messages, currentUid }) {
  const scrollRef = useRef(null);
  const firstRun = useRef(true);
  const [atBottom, setAtBottom] = useState(true);
  const lastMine = messages[messages.length - 1]?.sender === currentUid;

  const toBottom = (smooth = true) => {
    const el = scrollRef.current;
    el?.scrollTo({ top: el.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
  };
  const onScroll = (e) => {
    const el = e.currentTarget;
    setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 80);
  };

  useLayoutEffect(() => toBottom(false), []);
  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    if (atBottom || lastMine) toBottom();
  }, [messages.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (messages.length === 0) {
    return <div className={s.empty}><h2>{cfg.labels.emptyTitle}</h2><p>{cfg.labels.emptyText}</p></div>;
  }
  return (
    <div className={s.wrap}>
      <div className={s.scroll} ref={scrollRef} onScroll={onScroll}>
        <div className={s.inner}>
          {messages.map((m, i) => (
            <MessageBubble key={m.id} message={m} mine={m.sender === currentUid} senderName={nameOf(m.sender)} first={messages[i - 1]?.sender !== m.sender} />
          ))}
        </div>
      </div>
      {!atBottom && <button className={s.down} onClick={() => toBottom()} aria-label="Ke pesan terbaru"><ArrowDownIcon /></button>}
    </div>
  );
}
