import * as StompJs from '@stomp/stompjs';
import logUtil from '../utils/logUtil';

let host = null;
if (window.location.port == '') {
  host = window.location.hostname;
} else {
  host = `${window.location.hostname}:${window.location.port}`;
}

const client = new StompJs.Client({
  brokerURL: `wss://${host}/mcs/v0400/event`,
  reconnectDelay: 60000,
});

client.onConnect = (frames) => {
  logUtil.consoleLogger(
    'StompService',
    stringUtils.stringFormat('Successfully connect \n frame = {0}', [frames])
  );
};

client.onStompError = (frames) => {
  logUtil.consoleLogger(
    'StompService',
    stringUtils.stringFormat('Occur error \n frame = {0}', [frames])
  );
};

client.onDisconnect = (frames) => {
  logUtil.consoleLogger(
    'StompService',
    stringUtils.stringFormat('Disconnect. Occur error  \n frame = {0}', [frames])
  );
  console.warn(frames);
};

client.onWebSocketClose = (frames) => {
  logUtil.consoleLogger(
    'StompService',
    stringUtils.stringFormat('Successfully disconnected  \n frame = {0}', [frames])
  );
  console.warn(frames);
};

client.onUnhandledMessage = (frames) => {
  logUtil.consoleLogger(
    'StompService',
    stringUtils.stringFormat('Arrive unhandled message  \n fream = {0}', [frames])
  );
};

export default client;
