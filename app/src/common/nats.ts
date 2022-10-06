import { Button } from "./../component/Button/Button";
import { useAtom, useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { compareStringTime, RollHistoryEntry } from "~/common";

import { connect, Msg, NatsError, StringCodec } from "nats.ws";
import {
  NatsMessage,
  NatsType,
  queueInfo,
  sessionDataType,
  stateNats,
  stateRollHistory,
  stateSessionData,
} from "./state";

export const topicInfo = "TopicInfo";
export const topicConnect = "TopicConnect";
export const topicRoll = "TopicRoll";
// 03c2ba5c-c834-4afa-ac1b-355ae5ce7a1b

export const useNats = () => {
  const sc = StringCodec();
  const [, setQInfo] = useAtom(queueInfo);
  const sessionData = useAtomValue(stateSessionData);
  const [rollHistory, setRollHistory] = useAtom(stateRollHistory);
  const [nats, setNats] = useAtom(stateNats);
  const currentNats = useAtomCallback(
    useCallback((get) => {
      return get(stateNats);
    }, [])
  );
  const currentRollHistory = useAtomCallback(
    useCallback((get) => {
      return get(stateRollHistory);
    }, [])
  );

  const unpackNatsMsg = (msg: Msg): NatsMessage => {
    return JSON.parse(sc.decode(msg.data));
  };

  const packNatsMsg = (msg: NatsMessage) => {
    return sc.encode(JSON.stringify(msg));
  };

  const processIncoming = (err: NatsError | null, msg: Msg) => {
    if (err) console.error(err);
    const m = unpackNatsMsg(msg);
    if (m.sender === sessionData.browserID) return;
    switch (msg.subject) {
      case getTopic(topicInfo):
        console.log("info", m.data, m.sender);
        setQInfo((state) => [...state, m]);
        break;
      case getTopic(topicConnect):
        // on connect host resends roll history
        if (sessionData.hosting) {
          publish(topicRoll, Object.values(currentRollHistory()));
        }
        break;
      case getTopic(topicRoll):
        const rolls = JSON.parse(m.data) as RollHistoryEntry[];
        const newState = { ...rollHistory };
        rolls.forEach((roll) => {
          newState[roll.id] = roll;
        });
        setRollHistory(newState);
        break;
    }
  };

  const getTopic = useCallback(
    (suffix: string) => {
      if (sessionData.hosting) {
        return `${sessionData.browserID}.${suffix}`;
      } else {
        return `${sessionData.remote}.${suffix}`;
      }
    },
    [sessionData]
  );

  const publish = (topic: string, data: any) => {
    const cn = currentNats() as NatsType;
    if (cn.connection === null) {
      console.log("NATS connection not ready, ignoring", cn, topic, data);
      return;
    }
    const m: NatsMessage = {
      sender: sessionData.browserID,
      data: JSON.stringify(data),
    };
    const tp = getTopic(topic);
    cn.connection.publish(tp, packNatsMsg(m));
  };

  const connectServer = async (data: sessionDataType) => {
    if (data.nats.trim() === "") return;
    if (nats.connection != null) {
      nats.connection.drain();
      nats.connection.close();
    }
    const nc = await connect({
      servers: data.nats,
      token: data.nats_token !== "" ? data.nats_token : undefined,
    });
    const m: NatsMessage = {
      sender: sessionData.browserID,
      data: JSON.stringify("connected"),
    };
    const tp = getTopic(topicConnect);
    nc.publish(tp, packNatsMsg(m));

    const subscription = nc.subscribe(getTopic("*"), {
      callback: processIncoming,
    });
    setNats({
      connection: nc,
      sub: subscription,
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
