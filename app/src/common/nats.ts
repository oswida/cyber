import { useAtom, useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useCallback, useEffect } from "react";
import { RollHistoryEntry } from "~/common";

import {
  connect,
  Msg,
  NatsConnection,
  NatsError,
  StringCodec,
  Subscription,
} from "nats.ws";
import {
  NatsMessage,
  NatsType,
  NoteType,
  queueInfo,
  sessionDataType,
  stateBoardNotes,
  stateNats,
  stateRollHistory,
  stateSessionData,
} from "./state";

export const topicInfo = "TopicInfo";
export const topicConnect = "TopicConnect";
export const topicRoll = "TopicRoll";
export const topicBoard = "TopicBoard";
// 03c2ba5c-c834-4afa-ac1b-355ae5ce7a1b

export const useNats = () => {
  const sc = StringCodec();
  const sessionData = useAtomValue(stateSessionData);
  const [rollHistory, setRollHistory] = useAtom(stateRollHistory);
  const [nats, setNats] = useAtom(stateNats);
  const [boardState, setBoardState] = useAtom(stateBoardNotes);

  const unpackNatsMsg = (msg: Msg): NatsMessage => {
    return JSON.parse(sc.decode(msg.data));
  };

  const packNatsMsg = (msg: NatsMessage) => {
    return sc.encode(JSON.stringify(msg));
  };

  // const processIncoming = (err: NatsError | null, msg: Msg) => {
  //   if (err) console.error(err);
  //   const m = unpackNatsMsg(msg);
  //   if (m.sender === sessionData().browserID) return;
  //   switch (msg.subject) {
  //     case getTopic(topicInfo):
  //       console.log("info", m.data, m.sender);
  //       setQInfo((state) => [...state, m]);
  //       break;
  //     case getTopic(topicConnect):
  //       console.log("client connected");

  //       // on connect host resends roll history
  //       if (sessionData.hosting) {
  //         publish(topicRoll, Object.values(currentRollHistory()));
  //       }
  //       break;
  //     case getTopic(topicRoll):
  //       const rolls = JSON.parse(m.data) as RollHistoryEntry[];
  //       const newState = { ...rollHistory };
  //       rolls.forEach((roll) => {
  //         newState[roll.id] = roll;
  //       });
  //       setRollHistory(newState);
  //       break;
  //   }
  // };

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

  const publish = (
    connection: NatsConnection | null,
    topic: string,
    data: any
  ) => {
    if (connection === null) {
      console.log(
        "NATS connection not ready, ignoring",
        nats.connection,
        topic,
        data
      );
      return;
    }
    const m: NatsMessage = {
      sender: sessionData.browserID,
      data: JSON.stringify(data),
    };
    const tp = getTopic(topic);
    connection.publish(tp, packNatsMsg(m));
  };

  const connectNats = async (data: sessionDataType) => {
    if (data.nats.trim() === "") return;
    if (nats.connection !== null && nats.connection.getServer() === data.nats)
      return;
    if (nats.connection !== null) {
      nats.connection.drain();
      nats.connection.close();
    }
    const nc = await connect({
      servers: data.nats,
      token: data.nats_token !== "" ? data.nats_token : undefined,
    });
    const sub = nc.subscribe(getTopic("*"));
    processIncoming(sub, sessionData);

    const m: NatsMessage = {
      sender: sessionData.browserID,
      data: JSON.stringify("connected"),
    };
    const tp = getTopic(topicConnect);
    nc.publish(tp, packNatsMsg(m));
    setNats({
      connection: nc,
      sub: sub,
    });
  };

  const processIncoming = async (sub: Subscription, data: sessionDataType) => {
    for await (const msg of sub) {
      const m = unpackNatsMsg(msg);
      if (m.sender === sessionData.browserID) {
        continue;
      }
      if (msg.subject === getTopic(topicConnect)) {
        if (sessionData.hosting) {
          publish(nats.connection, topicRoll, Object.values(rollHistory));
          publish(nats.connection, topicBoard, Object.values(boardState));
        }
        continue;
      }
      if (msg.subject === getTopic(topicRoll)) {
        const rolls = JSON.parse(m.data) as RollHistoryEntry[];
        const newState = { ...rollHistory };
        rolls.forEach((roll) => {
          newState[roll.id] = roll;
        });
        setRollHistory(newState);
        continue;
      }
      if (msg.subject === getTopic(topicBoard)) {
        const notes = JSON.parse(m.data) as NoteType[];
        const newState = { ...boardState };
        notes.forEach((note) => {
          newState[note.id] = note;
        });
        setBoardState(newState);
        continue;
      }
    }
  };

  return {
    unpackNatsMsg,
    packNatsMsg,
    processIncoming,
    getTopic,
    publish,
    connectNats,
  };
};
