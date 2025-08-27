import * as StompJs from "@stomp/stompjs";
import logUtil from "app/common/utils/logUtil";
import Button from "components/button/Button";
import DropBox from "components/dropBox/DropBox";
import Textarea from "components/input/Textarea";
import TextInput from "components/input/TextInput";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import WebSocketUI from "./design";
import "./StompSettingBody.css";

const StompSettingBody = () => {
  const [protocol, setProtocol] = useState("ws");
  const [host, setHost] = useState("");
  const [token, setToken] = useState("");
  const [subDestination, setSubDestination] = useState("");
  const [pubDestination, setPubDestination] = useState("");
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

    clientRef.current = new StompJs.Client({
      brokerURL: `${protocol}://${data.host}`,
      reconnectDelay: 60000,
      connectHeaders: header,
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
    return (
      <div className="border rounded-lg p-6 shadow-sm">
        <h3 className="text-md font-semibold mb-2">Subscribe</h3>
        <label className="block text-sm font-medium mb-1">Destination</label>
        <input
          type="text"
          className="border rounded px-2 py-1 w-full mb-3"
          value={subDestination}
          onChange={(e) => setSubDestination(e.target.value)}
        />
        <button className="bg-teal-600 text-white px-4 py-1 rounded w-full">
          Subscribe
        </button>
      </div>
    );
  };

  const PublishBox = () => {};

  return (
    <>
      <div className="max-w-6xl mx-auto p-2 space-y-6 font-sans">
        <WebSocketUI />
        <ConnectionSettingBox />
        <div className="grid grid-cols-2 gap-6">
          <SubscribeBox />
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
