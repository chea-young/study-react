import * as StompJs from "@stomp/stompjs";
import logUtil from "../utils/logUtil";

let client = new StompJs.Client({
  //brokerURL: `wss://${host}/mcs/v0400/event`,
  reconnectDelay: 60000,
});

client.onConnect = (frames) => {
  logUtil.consoleLogger(
    "StompService",
    `Successfully connect \n frame = ${frames}`
  );
};

client.onStompError = (frames) => {
  logUtil.consoleLogger("StompService", `Occur error \n frame = ${frames}`);
};

client.onDisconnect = (frames) => {
  logUtil.consoleLogger(
    "StompService",
    `Disconnect. Occur error  \n frame = ${frames}`
  );
};

client.onWebSocketClose = (frames) => {
  logUtil.consoleLogger(
    "StompService",
    `Successfully disconnected  \n frame = ${frames}`
  );
};

client.onUnhandledMessage = (frames) => {
  logUtil.consoleLogger(
    "StompService",
    `Arrive unhandled message  \n frame = ${frames}`
  );
};

export default client;
