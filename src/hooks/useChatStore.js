import { useCallback, useMemo, useState } from 'react';
import { INITIAL_ROOMS } from '../data/dummy.js';
import { uid } from '../utils/format.js';

// Store dummy di memori. Di Phase 4 hook ini diganti listener Firestore
// dengan API yang sama, jadi komponen UI tidak perlu diubah.
export default function useChatStore(currentUser) {
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [activeId, setActiveId] = useState(INITIAL_ROOMS[0].id);

  const withMeta = useMemo(
    () =>
      rooms
        .map((r) => {
          const last = r.messages[r.messages.length - 1];
          return { ...r, lastMessage: last?.text || '', updatedAt: last?.createdAt || r.createdAt };
        })
        .sort((a, b) => b.updatedAt - a.updatedAt),
    [rooms]
  );

  const patch = (id, fn) => setRooms((rs) => rs.map((r) => (r.id === id ? fn(r) : r)));
  const setStatus = (roomId, msgId, status) =>
    patch(roomId, (r) => ({ ...r, messages: r.messages.map((x) => (x.id === msgId ? { ...x, status } : x)) }));

  const createRoom = useCallback(() => {
    const room = { id: uid(), title: 'Percakapan baru', createdBy: currentUser.uid, archived: false, createdAt: Date.now(), messages: [] };
    setRooms((rs) => [room, ...rs]);
    setActiveId(room.id);
  }, [currentUser.uid]);

  const renameRoom = (id, title) => title.trim() && patch(id, (r) => ({ ...r, title: title.trim() }));
  const toggleArchive = (id) => patch(id, (r) => ({ ...r, archived: !r.archived }));
  const deleteRoom = (id) => {
    setRooms((rs) => rs.filter((r) => r.id !== id));
    setActiveId((cur) => (cur === id ? null : cur));
  };

  const sendMessage = (id, text) => {
    const msg = { id: uid(), sender: currentUser.uid, text, createdAt: Date.now(), status: 'sending' };
    patch(id, (r) => ({ ...r, messages: [...r.messages, msg] }));
    setTimeout(() => setStatus(id, msg.id, 'sent'), 500);
    setTimeout(() => setStatus(id, msg.id, 'read'), 1800);
  };

  return {
    rooms: withMeta,
    activeRoom: withMeta.find((r) => r.id === activeId) || null,
    setActiveId, createRoom, renameRoom, toggleArchive, deleteRoom, sendMessage,
  };
}
