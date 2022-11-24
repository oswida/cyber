import { createContextProvider } from "@solid-primitives/context";
import { Client } from "paho-mqtt";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import {
  CorpoInfo,
  emptyPcInfo,
  emptySessionInfo,
  emptyTrackInfo,
  initialWhiteboardState,
  NoteInfo,
  NotificationInfo,
  PcInfo,
  RollInfo,
  SessionInfo,
  TrackInfo,
  WhiteboardState,
} from "./types";

// Generator state
export const [genPage, setGenPage] = createSignal("Corporation");
export const [corporationData, setCorporationData] = createSignal<CorpoInfo[]>(
  []
);

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
  const [storageSize, setStorageSize] = createSignal(0);
  const [sessionData, setSessionData] = createSignal<SessionInfo>(
    emptySessionInfo()
  );
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
    storageSize,
    setStorageSize,
    sessionData,
    setSessionData,
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
  };
});

export type AppDataType = ReturnType<typeof useAppData>;
