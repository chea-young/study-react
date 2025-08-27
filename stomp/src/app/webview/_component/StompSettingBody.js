import * as StompJs from "@stomp/stompjs";
import logUtil from "app/common/utils/logUtil";
import Button from "components/button/Button";
import DropBox from "components/dropBox/DropBox";
import TextInput from "components/input/TextInput";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./StompSettingBody.css";

const StompSettingBody = () => {
  const [protocol, setProtocol] = useState("ws");
  const clientRef = useRef();
  const [log, setLog] = useState("");
  const { register, handleSubmit } = useForm();

  // 로그 추가 유틸
  const appendLog = (prefix, message) => {
    const timestamp = logUtil.formatTime();
    setLog((prev) => `${prev}\n[${timestamp}] ${prefix}: ${message}`);
  };

  const handleConnect = (data) => {
    let header = {};
    if (data.token != null) {
      header.Authorization = `Bearer ${data.token}`;
    }

    try {
      clientRef.current = new StompJs.Client({
        brokerURL: `${protocol}://${data.host}`,
        reconnectDelay: 60000,
        connectHeaders: header,
      });

      connectEvent();
      clientRef.current.activate();
    } catch (e) {
      appendLog("ERROR", e.message);
    }
  };

  const connectEvent = () => {
    clientRef.current.onConnect = (frames) => {
      appendLog("CONNECTED", `frame = ${JSON.stringify(frames)}`);
    };

    clientRef.current.onStompError = (frames) => {
      appendLog("ERROR", `frame = ${JSON.stringify(frames)}`);
    };

    clientRef.current.onDisconnect = (frames) => {
      appendLog("DISCONNECTED", `frame = ${JSON.stringify(frames)}`);
    };

    clientRef.current.onWebSocketClose = (frames) => {
      appendLog("CLOSED", `frame = ${JSON.stringify(frames)}`);
    };

    clientRef.current.onUnhandledMessage = (frames) => {
      appendLog("UNHANDLED", `frame = ${JSON.stringify(frames)}`);
    };
  };

  const handleDisconnect = () => {
    if (clientRef.current && clientRef.current.active) {
      clientRef.current.deactivate();
    }
  };

  const ConnectionSettingBox = () => {
    return (
      <div id="connection-setting">
        <form onSubmit={handleSubmit((e) => handleConnect(e))}>
          <div className="border rounded-lg p-6 space-y-4 shadow-sm">
            <h2 className="text-lg font-semibold">Connection Settings</h2>
            <div className="grid grid-cols-4 gap-4 items-center">
              <div>
                <DropBox
                  label="Protocol"
                  value={protocol}
                  onChange={(value) => setProtocol(value)}
                  options={["WS", "WSS"]}
                />
              </div>

              <div className="col-span-2">
                <TextInput
                  name="host"
                  label="Host URL"
                  placeholder="localhost:8080/websocket"
                  type="text"
                  {...register("host")}
                />
              </div>
              <div>
                <TextInput
                  name="token"
                  label="Auth Token (Optional)"
                  placeholder="Bearer token..."
                  type="text"
                  {...register("token")}
                />
              </div>
              <div className="col-span-4 flex justify-start space-x-4 mt-2">
                <Button
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                  label="Connect"
                  type="submit"
                />
                <Button
                  className="px-3 py-1 bg-red-100 text-red-600 rounded"
                  label="Disconnected"
                  onClick={handleDisconnect}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const SubscribeBox = () => {
    const [subDestination, setSubDestination] = useState("");

    const handleSubscribe = () => {
      if (!clientRef.current || !clientRef.current.active) {
        return;
      }

      appendLog("SUBSCRIBE", `destination = ${subDestination}`);

      clientRef.current.subscribe(subDestination, (message) => {
        let payload = message.body;

        try {
          payload = JSON.stringify(JSON.parse(message.body), null, 2);
        } catch (e) {
          console.error(e);
        }

        appendLog(
          "MESSAGE",
          `destination=${message.headers.destination}\n` +
            `message-id=${message.headers["message-id"]}\n` +
            `subscription=${message.headers.subscription}\n` +
            `payload=\n${payload}`
        );
      });
    };

    return (
      <div className="border rounded-lg p-6 shadow-sm">
        <h3 className="text-md font-semibold mb-2">Subscribe</h3>
        <label className="block text-sm font-medium mb-1">Destination</label>
        <input
          type="text"
          className="border rounded px-2 py-1 w-full mb-3"
          placeholder="/topic/messages"
          value={subDestination}
          onChange={(e) => setSubDestination(e.target.value)}
        />
        <Button
          className="bg-teal-600 text-white px-4 py-1 rounded w-full"
          label="Subscribe"
          onClick={handleSubscribe}
        />
      </div>
    );
  };

  const PublishBox = () => {
    const [pubDestination, setPubDestination] = useState("");
    const [publishMessage, setPublishMessage] = useState("");

    const handlePublish = () => {
      if (!clientRef.current || !clientRef.current.active) {
        return;
      }

      // 로그 기록
      appendLog(
        "PUBLISH",
        `destination=${pubDestination}\n` + `payload=\n${publishMessage}`
      );

      // 실제 메시지 발행
      clientRef.current.publish({
        destination: pubDestination,
        body: publishMessage,
      });
    };

    return (
      <div className="border rounded-lg p-6 shadow-sm">
        <h3 className="text-md font-semibold mb-2">Publish</h3>
        <label className="block text-sm font-medium mb-1">Destination</label>
        <input
          type="text"
          className="border rounded px-2 py-1 w-full mb-3"
          value={pubDestination}
          onChange={(e) => setPubDestination(e.target.value)}
        />
        <label className="block text-sm font-medium mb-1">Message (JSON)</label>
        <textarea
          className="border rounded px-2 py-1 w-full h-32 mb-3 font-mono text-sm"
          value={publishMessage}
          onChange={(e) => setPublishMessage(e.target.value)}
        />
        <Button
          className="bg-blue-600 text-white px-4 py-1 rounded w-full"
          label="Publish"
          onClick={handlePublish}
        />
      </div>
    );
  };

  const LogBox = () => {
    const handleClearLogs = () => {
      setLog("");
    };

    return (
      <div className="border rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-semibold">Real-time Log</h3>
          <Button
            className="border px-2 py-1 rounded text-sm hover:bg-gray-100"
            label="Clear Log"
            onClick={handleClearLogs}
          />
        </div>
        <div className="bg-gray-100 p-3 h-64 overflow-y-auto rounded font-mono text-sm">
          {log.split("\n").map((line, index) => {
            return <div key={index}>{line}</div>;
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-2 space-y-6 font-sans">
        <ConnectionSettingBox />
        <div className="grid grid-cols-2 gap-6">
          <SubscribeBox />
          <PublishBox />
        </div>
        <LogBox />
      </div>
    </>
  );
};

export default StompSettingBody;
