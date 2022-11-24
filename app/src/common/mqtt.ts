import { Client, Message } from "paho-mqtt";
import { createMemo } from "solid-js";
import { inodRollsKey, saveGenericData } from "~/common";
import { AppDataType, useAppData } from "./signals";
import { inodBoardKey, inodPlayersKey } from "./storage";
import { MqttMessage, NoteInfo, PcInfo, RollInfo } from "./types";
import { compressData64, decompressData64, notify } from "./util";

// cyberusr BusloadOverpassSlightingGrimace

export const topicInfo = "TopicInfo";
export const topicConnect = "TopicConnect";
export const topicRoll = "TopicRoll";
export const topicBoard = "TopicBoard";
export const topicChars = "TopicChars";
export const topicBoardDelete = "TopicBoardDelete";
export const topicDraw = "TopicDraw";

var options = {
  hostname: "74b475ef8ff348ff821ef7e23aac0509.s2.eu.hivemq.cloud",
  port: 8884,
  userName: "inode",
  password: "inodinod",
  path: "/mqtt",
  ssl: true,
};

// var options = {
//   hostname: "cloud.uplogic.pl",
//   port: 4223,
//   userName: undefined, //"cyberusr",
//   password: undefined, //"BusloadOverpassSlightingGrimace",
//   // "$6$n6awMJmqkALjgAUc$EF5xlYIBpkbnX67DZSUFIjK6uaOdMPksstE5oWOIwJVYekLwBBYdLhonERJQDu19LeW5+xNodmWIuIzu08GIUg==",
//   path: "/",
//   ssl: false,
// };

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
    console.log("Cannot access app state");
    return;
  }
  const m = mqttUnpack(msg.payloadString);
  if (m.sender == apd.sessionData().browserID) return; // own message
  switch (msg.destinationName) {
    case topicConnect:
      notify(apd, m.data, 5000);
      const cl = apd.mqttClient();
      if (!cl) break;
      if (apd.sessionData().hosting) {
        mqttPublish(apd.sessionData().browserID, cl, topicChars, apd.charData);
      }
      break;
    case topicRoll:
      const data = m.data as RollInfo[];
      const newState = [...data, ...apd.rollHistory()];
      apd.setRollHistory(newState);
      saveGenericData(apd, inodRollsKey, newState);
      break;
    case topicChars:
      const chars = m.data as PcInfo[];
      const newState2 = { ...apd.charData };
      chars.forEach((cr) => {
        newState2[cr.id] = cr;
      });
      apd.setCharData(newState2);
      saveGenericData(apd, inodPlayersKey, newState2);
      notify(apd, "Character created/updated", 10000);
      break;
    case topicBoard:
      const notes = m.data as NoteInfo[];
      const newState3 = { ...apd.boardData() };
      notes.forEach((note) => {
        newState3[note.id] = note;
      });
      apd.setBoardData(newState3);
      saveGenericData(apd, inodBoardKey, newState3);
      notify(apd, "Board note created/updated", 10000);
      break;
    default:
      console.log("Message for unknown topic", m.sender, m.data);
  }
};

export const mqttConnect = (apd: AppDataType) => {
  if (!apd) return;
  console.log("Trying to connect");

  const client = new Client(
    options.hostname,
    options.port,
    options.path,
    apd.sessionData().browserID
  );
  client.connect({
    userName: options.userName,
    password: options.password,
    useSSL: options.ssl,
    onFailure: (e) => {
      console.error(e.errorMessage);
    },
    onSuccess: (e) => {
      console.log("Connected to MQTT server", e);
      client.subscribe("+", {
        onFailure: (e) => {
          console.log("subscription failed", e);
        },
        onSuccess: () => {
          apd.setMqttClient(client);
          mqttPublish(
            apd.sessionData().browserID,
            client,
            topicConnect,
            `connected ${apd.sessionData().username}`
          );
        },
      });
    },
  });

  client.onMessageArrived = (msg) => {
    mqttProcess(apd, msg);
  };
};

export const currentMqttClient = createMemo(() => {
  const apd = useAppData();
  if (!apd) return;
  console.log("client memo", apd.mqttClient());

  return apd.mqttClient();
});
