import { useAtomValue, useSetAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { RollHistoryEntry } from "~/common";

import {
  connect,
  Msg,
  NatsConnection,
  StringCodec,
  Subscription,
} from "nats.ws";
import {
  NatsMessage,
  NoteType,
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
  const setRollHistory = useSetAtom(stateRollHistory);
  const setNats = useSetAtom(stateNats);
  const setBoardState = useSetAtom(stateBoardNotes);
  const cnats = useAtomCallback(
    useCallback(
      (get, set) => {
        return get(stateNats);
      },
      [stateNats]
    )
  );
  const crollHistory = useAtomCallback(
    useCallback(
      (get, set) => {
        return get(stateRollHistory);
      },
      [stateRollHistory]
    )
  );
  const cboardState = useAtomCallback(
    useCallback(
      (get, set) => {
        return get(stateBoardNotes);
      },
      [stateBoardNotes]
    )
  );

  const unpackNatsMsg = (msg: Msg): NatsMessage => {
    return JSON.parse(sc.decode(msg.data));
  };

  const packNatsMsg = (msg: NatsMessage) => {
    return sc.encode(JSON.stringify(msg));
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

  const publish = (
    connection: NatsConnection | null,
    topic: string,
    data: any
  ) => {
    if (connection === null) {
      console.log(
        "NATS connection not ready, ignoring",
        connection,
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
    const nats = await cnats();
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
      const cn = await cnats();
      const rollHistory = await crollHistory();
      const boardState = await cboardState();
      if (msg.subject === getTopic(topicConnect)) {
        if (sessionData.hosting) {
          publish(cn.connection, topicRoll, Object.values(rollHistory));
          publish(cn.connection, topicBoard, Object.values(boardState));
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
