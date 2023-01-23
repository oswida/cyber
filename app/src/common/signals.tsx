import { createContextProvider } from "@solid-primitives/context";
import { Client } from "paho-mqtt";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import {
  ConnectionInfo,
  CorpoInfo,
  emptyPcInfo,
  emptySessionInfo,
  emptyTrackInfo,
  initialWhiteboardState,
  NodeInfo,
  NoteInfo,
  NotificationInfo,
  NpcInfo,
  PcInfo,
  RollInfo,
  SessionInfo,
  SquadInfo,
  TrackInfo,
  WhiteboardState,
} from "./types";

// Generator state
export const [genPage, setGenPage] = createSignal("Corporation");
export const [corporationData, setCorporationData] = createSignal<CorpoInfo[]>(
  []
);
export const [inodeData, setInodeData] = createSignal<NodeInfo[]>([]);
export const [squadData, setSquadData] = createSignal<SquadInfo[]>([]);
export const [npcData, setNpcData] = createSignal<NpcInfo[]>([]);

// Main session data
export const [sessionData, setSessionData] = createSignal<SessionInfo>(
  emptySessionInfo()
);
export const [storageSize, setStorageSize] = createSignal(0);

// Edited character state
export const [EditCharacterProvider, useEditCharacter] = createContextProvider(
  () => {
    const [editCharacter, setEditCharacter] = createSignal<PcInfo>(emptyPcInfo);
    return { editCharacter, setEditCharacter };
  }
);

// Application data
export const [AppDataProvider, useAppData] = createContextProvider(() => {
  const [charData, setCharData] = createStore<Record<string, PcInfo>>({});
  const [wbState, setWbState] = createSignal<WhiteboardState>(
    initialWhiteboardState
  );
  const [rollHistory, setRollHistory] = createSignal<RollInfo[]>([]);
  const [noteData, setNoteData] = createSignal<Record<string, NoteInfo>>({});
  const [boardData, setBoardData] = createSignal<Record<string, NoteInfo>>({});
  const [trackData, setTrackData] = createSignal<Record<string, TrackInfo>>({});

  const [mqttClient, setMqttClient] = createSignal<Client>();

  const [drawCache, setDrawCache] = createSignal<any>({});
  const [notification, setNotification] = createSignal<NotificationInfo>({
    msg: "",
    delay: 0,
  });

  const [selectedDice, setSelectedDice] = createSignal("1d4");
  const [selectedNote, setSelectedNote] = createSignal<NoteInfo>();
  const [selectedChar, setSelectedChar] = createSignal<PcInfo>(emptyPcInfo);
  const [selectedTrack, setSelectedTrack] = createSignal<TrackInfo>(
    emptyTrackInfo()
  );

  const [connections, setConnections] = createSignal<
    Record<string, ConnectionInfo>
  >({});

  const [subeditOpen, setSubeditOpen] = createSignal("");

  return {
    charData,
    setCharData,
    wbState,
    setWbState,
    rollHistory,
    setRollHistory,
    noteData,
    setNoteData,
    selectedDice,
    setSelectedDice,
    selectedNote,
    setSelectedNote,
    drawCache,
    setDrawCache,
    selectedChar,
    setSelectedChar,
    boardData,
    setBoardData,
    subeditOpen,
    setSubeditOpen,
    trackData,
    setTrackData,
    selectedTrack,
    setSelectedTrack,
    mqttClient,
    setMqttClient,
    notification,
    setNotification,
    connections,
    setConnections,
  };
});

export type AppDataType = ReturnType<typeof useAppData>;
