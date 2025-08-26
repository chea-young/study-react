import Button from "components/button/Button";
import Textarea from "components/input/Textarea";
import TextInput from "components/input/TextInput";
import { useRef, useState } from "react";
import WebSocketUI from "./design";
import "./StompSettingBody.css";
import DropBox from "components/dropBox/DropBox";
import * as StompJs from "@stomp/stompjs";
import logUtil from "app/common/utils/logUtil";

const StompSettingBody = () => {
  const [protocol, setProtocol] = useState("ws");
  const [host, setHost] = useState("");
  const [token, setToken] = useState("");
  const [subDestination, setSubDestination] = useState("");
  const [pubDestination, setPubDestination] = useState("");
  const clientRef = useRef();
  const [log, setLog] = useState("");

  // 시간 포맷 함수
  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-GB", { hour12: false }); // 00:00:15 형태
  };

  // 로그 추가 유틸
  const appendLog = (prefix, message) => {
    const timestamp = formatTime();
    setLog((prev) => `${prev}\n[${timestamp}] ${prefix}: ${message}`);
  };

  const handleConnect = () => {
    clientRef.current = new StompJs.Client({
      brokerURL: `${protocol}://${host}`,
      reconnectDelay: 60000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    connectEvent();
    clientRef.current.activate();
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
                label="Host URL"
                value={host}
                onChange={(value) => setHost(value)}
                placeholder="localhost:8080/websocket"
              />
            </div>
            <div>
              <TextInput
                label="Auth Token (Optional)"
                value={token}
                onChange={(value) => setToken(value)}
                placeholder="Bearer token..."
              />
            </div>
            <div className="col-span-4 flex justify-start space-x-4 mt-2">
              <Button
                className="bg-blue-600 text-white px-4 py-1 rounded"
                label="Connect"
                onClick={handleConnect}
              />
              <Button
                className="px-3 py-1 bg-red-100 text-red-600 rounded"
                label="Disconnected"
                onClick={handleDisconnect}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-2 space-y-6 font-sans">
        <WebSocketUI />
        <ConnectionSettingBox />
        <div id="sub">
          {"sub"}
          <TextInput
            label={"Destination"}
            value={subDestination}
            onChange={(changeValue) => {
              setSubDestination(changeValue);
            }}
          />
          <Button label="Subscribe" onClick={() => {}} />
        </div>
        <div id="pub">
          {"pub"}
          <TextInput
            label={"Destination"}
            value={pubDestination}
            onChange={(changeValue) => {
              setPubDestination(changeValue);
            }}
          />
          <Button label="Publish" onClick={() => {}} />
        </div>
        <div id="log">
          {"Log"}

          <div>
            <Textarea value={log} disabled />
          </div>
        </div>
      </div>
    </>
  );
};

export default StompSettingBody;
