import cfg from '../config/appConfig.js';
import AppLayout from '../layouts/AppLayout.jsx';
import Sidebar from '../components/sidebar/Sidebar.jsx';
import MessageList from '../components/chat/MessageList.jsx';
import MessageInput from '../components/chat/MessageInput.jsx';
import useChatStore from '../hooks/useChatStore.js';
import useTheme from '../hooks/useTheme.js';

export default function ChatPage({ user, onLogout }) {
  const store = useChatStore(user);
  const [theme, toggleTheme] = useTheme();
  const room = store.activeRoom;

  return (
    <AppLayout
      title={room?.title || cfg.appName}
      renderSidebar={({ closeDrawer, collapse }) => (
        <Sidebar
          user={user} rooms={store.rooms} activeId={room?.id} theme={theme} onToggleTheme={toggleTheme}
          onSelect={store.setActiveId} onNew={store.createRoom} onRename={store.renameRoom}
          onArchive={store.toggleArchive} onDelete={store.deleteRoom} onLogout={onLogout} onClose={closeDrawer} onCollapse={collapse}
        />
      )}
    >
      {room ? (
        <>
          <MessageList key={room.id} messages={room.messages} currentUid={user.uid} />
          <MessageInput onSend={(t) => store.sendMessage(room.id, t)} disabled={room.archived} />
        </>
      ) : (
        <div style={{ flex: 1, display: 'grid', placeContent: 'center', textAlign: 'center', color: 'var(--text-2)' }}>
          <p>Pilih percakapan di sidebar atau buat Chat baru.</p>
        </div>
      )}
    </AppLayout>
  );
}
