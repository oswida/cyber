import { useNotify } from "./notify";
import { useStorage } from "~/common/storage";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { useCallback } from "react";
import { Note, PcInfo, RollHistoryEntry, SessionInfo } from "~/common";

import {
  connect,
  Msg,
  NatsConnection,
  StringCodec,
  Subscription,
} from "nats.ws";
import {
  NatsMessage,
  stateBoardNotes,
  stateDrawCache,
  stateNats,
  statePlayers,
  stateRollHistory,
  stateSessionData,
} from "./state";

export const topicInfo = "TopicInfo";
export const topicConnect = "TopicConnect";
export const topicRoll = "TopicRoll";
export const topicBoard = "TopicBoard";
export const topicChars = "TopicChars";
export const topicBoardDelete = "TopicBoardDelete";
export const topicDraw = "TopicDraw";
// 03c2ba5c-c834-4afa-ac1b-355ae5ce7a1b

export const useNats = () => {
  const sc = StringCodec();
  const sessionData = useAtomValue(stateSessionData);
  const setRollHistory = useSetAtom(stateRollHistory);
  const setNats = useSetAtom(stateNats);
  const setPlayers = useSetAtom(statePlayers);
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
  const cPlayers = useAtomCallback(
    useCallback(
      (get, set) => {
        return get(statePlayers);
      },
      [statePlayers]
    )
  );
  const { saveBoardNotes, savePlayers } = useStorage();
  const { notify } = useNotify();
  const [, setDrawCache] = useAtom(stateDrawCache);

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

  const connectNats = async (data: SessionInfo) => {
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

  const processIncoming = async (sub: Subscription, data: SessionInfo) => {
    for await (const msg of sub) {
      const m = unpackNatsMsg(msg);
      if (m.sender === sessionData.browserID) {
        continue;
      }
      const cn = await cnats();
      const rollHistory = await crollHistory();
      const boardState = await cboardState();
      const playerState = await cPlayers();
      if (msg.subject === getTopic(topicConnect)) {
        if (sessionData.hosting) {
          publish(cn.connection, topicRoll, rollHistory);
          publish(cn.connection, topicBoard, Object.values(boardState));
          publish(
            cn.connection,
            topicChars,
            Object.values(playerState).filter((it) => it?.shared)
          );
          notify("New client connected", 10000);
        }
      } else if (msg.subject === getTopic(topicRoll)) {
        const rolls = JSON.parse(m.data) as RollHistoryEntry[];
        const st = [...rolls, ...rollHistory];
        let newState: RollHistoryEntry[] = [];
        // remove duplicates
        if (rolls.length > 1) {
          const c: Record<string, boolean> = {};
          st.forEach((it) => {
            if (!c[it.id]) {
              c[it.id] = true;
              newState.push(it);
            }
          });
        } else {
          newState = st;
        }
        setRollHistory(newState);
        notify("New dice roll registered", 10000);
      } else if (msg.subject === getTopic(topicBoard)) {
        const notes = JSON.parse(m.data) as Note[];
        const newState = { ...boardState };
        notes.forEach((note) => {
          newState[note.id] = note;
        });
        setBoardState(newState);
        saveBoardNotes(newState);
        notify("Board note created/updated", 10000);
      } else if (msg.subject === getTopic(topicChars)) {
        const chars = JSON.parse(m.data) as PcInfo[];
        const newState = { ...playerState };
        chars.forEach((cr) => {
          newState[cr.id] = cr;
        });
        setPlayers(newState);
        savePlayers(newState);
        notify("Character created/updated", 10000);
      } else if (msg.subject === getTopic(topicBoardDelete)) {
        const notes = JSON.parse(m.data) as Note[];
        const newState = { ...boardState };
        notes.forEach((note) => {
          newState[note.id] = undefined;
        });
        setBoardState(newState);
        saveBoardNotes(newState);
        notify("Board note created/updated", 10000);
      } else if (msg.subject === getTopic(topicDraw)) {
        const img = JSON.parse(m.data);
        setDrawCache(img.data);
        notify("Image updated", 10000);
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
