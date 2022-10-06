import { useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";

import {
  NatsMessage,
  queueInfo,
  sessionDataType,
  stateNats,
  stateRollHistory,
  stateSessionData,
} from "./state";
import { connect, Msg, NatsError, StringCodec } from "nats.ws";

export const topicInfo = "TopicInfo";
export const topicConnect = "TopicConnect";
export const topicRoll = "TopicRoll";
// 03c2ba5c-c834-4afa-ac1b-355ae5ce7a1b

export const useNats = () => {
  const sc = StringCodec();
  const [, setQInfo] = useAtom(queueInfo);
  const sessionData = useAtomValue(stateSessionData);
  const [, setRollHistory] = useAtom(stateRollHistory);
  const [nats, setNats] = useAtom(stateNats);

  const unpackNatsMsg = (msg: Msg): NatsMessage => {
    return JSON.parse(sc.decode(msg.data));
  };

  const packNatsMsg = (msg: NatsMessage) => {
    return sc.encode(JSON.stringify(msg));
  };

  const processIncoming = useCallback(
    (err: NatsError | null, msg: Msg) => {
      if (err) console.error(err);
      const m = unpackNatsMsg(msg);
      if (m.sender === sessionData.browserID) return;
      switch (msg.subject) {
        case getTopic(topicInfo):
          setQInfo((state) => [...state, m]);
          break;
        case getTopic(topicConnect):
          break;
        case getTopic(topicRoll):
          const roll = JSON.parse(m.data);
          setRollHistory((state) => [...state, roll]);
          break;
      }
    },
    [nats.sub, sessionData]
  );

  const getTopic = (suffix: string) => {
    if (sessionData.hosting) {
      return `${sessionData.browserID}.${suffix}`;
    } else {
      return `${sessionData.remote}.${suffix}`;
    }
  };

  const publish = (topic: string, data: any) => {
    if (nats.connection === null || nats.sub === null) {
      console.log("NATS connection not ready, ignoring");
      return;
    }
    const m: NatsMessage = {
      sender: sessionData.browserID,
      data: JSON.stringify(data),
    };
    const tp = getTopic(topic);
    nats.connection.publish(tp, packNatsMsg(m));
  };

  const connectServer = async (data: sessionDataType) => {
    if (data.nats.trim() === "") return;
    if (nats.connection != null) {
      nats.connection.drain();
      nats.connection.close();
      setNats({ connection: null, sub: null });
    }
    const nc = await connect({
      servers: data.nats,
      token: data.nats_token !== "" ? data.nats_token : undefined,
    });
    setNats({
      connection: nc,
      sub: nc.subscribe(getTopic(topicRoll), { callback: processIncoming }),
    });
  };

  return {
    unpackNatsMsg,
    packNatsMsg,
    processIncoming,
    getTopic,
    publish,
    connectServer,
  };
};
