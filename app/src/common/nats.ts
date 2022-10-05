import { useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { NatsError } from "nats.ws";
import { Msg, StringCodec } from "nats.ws";
import {
  NatsMessage,
  queueInfo,
  stateNats,
  stateRollHistory,
  stateSessionData,
} from "./state";

export const topicInfo = "TopicInfo";
export const topicConnect = "TopicConnect";
export const topicRoll = "TopicRoll";

export const useNats = () => {
  const sc = StringCodec();
  const [, setQInfo] = useAtom(queueInfo);
  const nats = useAtomValue(stateNats);
  const sessionData = useAtomValue(stateSessionData);
  const [, setRollHistory] = useAtom(stateRollHistory);

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
      console.error("NATS connection not ready");
      return;
    }
    const m: NatsMessage = {
      sender: sessionData.browserID,
      data: JSON.stringify(data),
    };
    const tp = getTopic(topic);
    nats.connection.publish(tp, packNatsMsg(m));
  };

  return {
    unpackNatsMsg,
    packNatsMsg,
    processIncoming,
    getTopic,
    publish,
  };
};
