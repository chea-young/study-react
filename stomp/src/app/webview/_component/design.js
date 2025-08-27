// WebSocketUI.jsx
import { useState } from 'react';

export default function WebSocketUI() {
  const [subscribeDestination, setSubscribeDestination] = useState('/topic/messages');
  const [publishDestination, setPublishDestination] = useState('/app/send');
  const [publishMessage, setPublishMessage] = useState(`{
  "type": "greeting",
  "message": "Hello STOMP!"
}`);
  const [logs, setLogs] = useState([
    '[00:00:01] INFO: App initialized. Ready to connect.',
    '[00:00:05] SENT: CONNECT {protocol: ws, host: localhost:8080/websocket}',
    '[00:00:06] REC: CONNECTED {session: user-123}',
    '[00:00:07] INFO: WebSocket connection established.',
    '[00:00:10] SENT: SUBSCRIBE {destination: /topic/messages}',
    '[00:00:12] REC: MESSAGE {destination: /topic/messages, payload: {"type": "greeting", "message": "Welcome to the channel!"}}',
    '[00:00:15] SENT: PUBLISH {destination: /app/send, payload: {"type": "ping", "data": "heartbeat"}}',
  ]);

  const handleClearLogs = () => setLogs([]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 font-sans">
      {/* Subscribe & Publish */}
      <div className="grid grid-cols-2 gap-6">
        {/* Subscribe */}
        <div className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-md font-semibold mb-2">Subscribe</h3>
          <label className="block text-sm font-medium mb-1">Destination</label>
          <input
            type="text"
            className="border rounded px-2 py-1 w-full mb-3"
            value={subscribeDestination}
            onChange={(e) => setSubscribeDestination(e.target.value)}
          />
          <button className="bg-teal-600 text-white px-4 py-1 rounded w-full">Subscribe</button>
        </div>

        {/* Publish */}
        <div className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-md font-semibold mb-2">Publish</h3>
          <label className="block text-sm font-medium mb-1">Destination</label>
          <input
            type="text"
            className="border rounded px-2 py-1 w-full mb-3"
            value={publishDestination}
            onChange={(e) => setPublishDestination(e.target.value)}
          />
          <label className="block text-sm font-medium mb-1">Message (JSON)</label>
          <textarea
            className="border rounded px-2 py-1 w-full h-32 mb-3 font-mono text-sm"
            value={publishMessage}
            onChange={(e) => setPublishMessage(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-1 rounded w-full">Publish</button>
        </div>
      </div>

      {/* Real-time Log */}
      <div className="border rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-semibold">Real-time Log</h3>
          <button
            onClick={handleClearLogs}
            className="border px-2 py-1 rounded text-sm hover:bg-gray-100"
          >
            Clear Log
          </button>
        </div>
        <div className="bg-gray-100 p-3 h-64 overflow-y-auto rounded font-mono text-sm">
          {logs.map((log, idx) => (
            <div key={idx}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
