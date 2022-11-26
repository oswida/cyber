import { Client, Message } from "paho-mqtt";
import { createSignal } from "solid-js";
import { inodRollsKey, saveGenericData } from "~/common";
import { AppDataType, sessionData } from "./signals";
import { inodBoardKey, inodPlayersKey } from "./storage";
import {
  ConnectionInfo,
  MqttMessage,
  NoteInfo,
  PcInfo,
  RollInfo,
} from "./types";
import { compressData64, decompressData64, notify, prettyNow } from "./util";

export const topicConnect = "TopicConnect";
export const topicRoll = "TopicRoll";
export const topicBoard = "TopicBoard";
export const topicChars = "TopicChars";
export const topicDraw = "TopicDraw";

export const [mqttConnectionStatus, setMqttConnectionStatus] =
  createSignal(false);

export const mqttPack = (sender: string, payload: any) => {
  const msg: MqttMessage = {
    sender: sender,
    data: payload,
  };
  return compressData64(msg);
};

export const mqttUnpack = (payload: any) => {
  const d = decompressData64(payload);
  return d as MqttMessage;
};

export const mqttTopic = (name: string) => {
  let prefix = undefined;
  if (sessionData().hosting) {
    prefix = sessionData().browserID;
  } else {
    prefix = sessionData().remote;
  }
  return `${prefix}/${name}`;
};

export const mqttPublish = (
  sender: string,
  client: Client,
  topic: string,
  payload: any
) => {
  
  const msg = new Message(mqttPack(sender, payload));
  msg.destinationName = topic;
  client.send(msg);
};

export const mqttProcess = (apd: AppDataType, msg: Message) => {
  if (!apd) {
    return;
  }
  
  const m = mqttUnpack(msg.payloadString);
  if (m.sender == sessionData().browserID) return; // own message
  switch (msg.destinationName) {
    case mqttTopic(topicConnect):
      const info = m.data as ConnectionInfo;
      const nst = { ...apd.connections() };
      if (!nst[m.sender]) {
        nst[m.sender] = {
          username: info.username,
          count: 1,
          connected_at: prettyNow(),
          last_seen_at: prettyNow(),
        };
      }
      apd.setConnections(nst);
      notify(apd, `User ${info.username} connected`, 5000);
      const cl = apd.mqttClient();
      if (!cl) break;
      if (sessionData().hosting) {
        const chars = Object.values(apd.charData).filter((it) => it.shared);
        mqttPublish(sessionData().browserID, cl, mqttTopic(topicChars), chars);
        mqttPublish(
          sessionData().browserID,
          cl,
          mqttTopic(topicBoard),
          Object.values(apd.boardData())
        );
      }
      break;
    case mqttTopic(topicRoll):
      const data = m.data as RollInfo[];
      const newState = [...data, ...apd.rollHistory()];
      apd.setRollHistory(newState);
      saveGenericData(inodRollsKey, newState);
      break;
    case mqttTopic(topicChars):
      const chars = m.data as PcInfo[];
      const newState2 = { ...apd.charData };
      chars.forEach((cr) => {
        newState2[cr.id] = cr;
      });
      apd.setCharData({ ...newState2 });
      saveGenericData(inodPlayersKey, newState2);
      notify(apd, "Character created/updated", 10000);
      break;
    case mqttTopic(topicBoard):
      const notes = m.data as NoteInfo[];
      const newState3 = { ...apd.boardData() };
      notes.forEach((note) => {
        newState3[note.id] = note;
      });
      apd.setBoardData(newState3);
      saveGenericData(inodBoardKey, newState3);
      notify(apd, "Board note created/updated", 10000);
      break;
    case mqttTopic(topicDraw):
      apd.setDrawCache(m.data);
      notify(apd, "Drawing updated", 10000);
      break;
    default:
      console.log("Message for unknown topic", m.sender, m.data);
  }
  const nst = { ...apd.connections() };
  const usr = nst[m.sender];
  if (usr) {
    usr.last_seen_at = prettyNow();
    usr.count = usr.count ? usr.count + 1 : 1;
    apd.setConnections(nst);
  }
};

export const mqttConnect = (apd: AppDataType) => {
  if (!apd) return;

  if (!sessionData().nats || sessionData().nats.trim() == "") return;
  if (
    !sessionData().hosting &&
    (!sessionData().remote || sessionData().remote.trim() == "")
  )
    return;

  const client = new Client(sessionData().nats, sessionData().browserID);
  if (client.isConnected()) {
    client.disconnect();
  }
  let un = undefined;
  let pw = undefined;
  if (sessionData().nats_token) {
    const parts = sessionData().nats_token.split(":");
    un = parts[0];
    pw = parts[1];
  }
  client.connect({
    userName: un,
    password: pw,
    onFailure: (e) => {
      console.error(e.errorMessage);
    },
    onSuccess: (e) => {
      console.log("Connected to MQTT server", e);
      client.subscribe(mqttTopic("+"), {
        onFailure: (e) => {
          console.log(`subscription to ${mqttTopic("+")} failed`, e);
        },
        onSuccess: () => {
          apd.setMqttClient(client);
          mqttPublish(
            sessionData().browserID,
            client,
            mqttTopic(topicConnect),
            {
              username: sessionData().username,
            } as ConnectionInfo
          );
          setMqttConnectionStatus(true);
        },
      });
    },
  });

  client.onMessageArrived = (msg) => {
    mqttProcess(apd, msg);
  };

  client.onConnectionLost = (msg) => {
    console.log("Connection lost", msg);
    setMqttConnectionStatus(false);
  };
};

export const mqttClientLink = () => {
  if (!sessionData().hosting) return "";
  const obj = {
    nats: sessionData().nats,
    token: sessionData().nats_token,
    remote: sessionData().browserID,
  };
  return `${window.location}connect?data=${encodeURIComponent(
    compressData64(obj)
  )}`;
};
