import { v4 as uuidv4 } from "uuid";

export type CorpoInfo = {
  id: string;
  name: string;
  sectors: string[];
  gossip: string;
  resources: string[];
  employeeProfile: string;
};

export type ConnectionInfo = {
  username: string;
};

export type NodeInfo = {
  id: string;
  name: string;
  node_class: string;
  hp: number;
  inf: number;
  ice: string;
  black_ice: boolean;
  activation: number;
  data: string;
  shape: string;
  color: string;
  detail: string;
};

export type PcSlot = {
  description: string;
  fatigue: boolean;
};

export type PcMod = {
  id: string;
  name: string;
  description: string;
  activated: boolean;
  need_activation: boolean;
};

export type PcInfo = {
  id: string;
  player: string;
  name: string;
  background: string;
  bio: [number, number];
  psy: [number, number];
  inf: [number, number];
  hp: [number, number];
  armor: number;
  subscription: string;
  credits: number;
  inventory: PcSlot[];
  cybermods: PcMod[];
  cyberdeck: PcMod[];
  shared: boolean;
  deprived?: boolean;
};

export const emptyPcInfo: PcInfo = {
  id: "",
  player: "",
  name: "",
  background: "",
  bio: [0, 0],
  psy: [0, 0],
  inf: [0, 0],
  hp: [0, 0],
  armor: 0,
  subscription: "",
  credits: 0,
  inventory: [],
  cybermods: [],
  cyberdeck: [],
  shared: false,
  deprived: false,
};

export type PcInfoKeys = keyof PcInfo;

export type RollInfo = {
  id: string;
  user: string;
  time: string;
  comment: string;
  data: string;
  color: string;
};

export type SessionInfo = {
  username: string;
  browserID: string;
  remote: string;
  hosting: boolean;
  nats: string;
  nats_token: string;
  lang?: string;
  color?: string;
};

export const emptySessionInfo = () => {
  return {
    username: "Noname",
    browserID: uuidv4(),
    hosting: false,
    remote: "",
    nats: "",
    nats_token: "",
    lang: "en",
    color: "#fff",
  };
};

export type NoteInfo = {
  id: string;
  title: string;
  content: string;
  author: string;
};

export type WhiteboardState = {
  tool: string;
  brush: string;
  fill: string;
  width: number;
};

export const initialWhiteboardState: WhiteboardState = {
  tool: "select",
  brush: "white",
  fill: "transparent",
  width: 1,
};

export type TrackInfo = {
  id: string;
  name: string;
  symbol: string;
  bio: [number, number];
  psy: [number, number];
  inf: [number, number];
  hp: [number, number];
  armor: number;
  dmgdice: number;
  description: string;
  state: string;
};

export const emptyTrackInfo = (generate?: boolean): TrackInfo => {
  return {
    id: generate ? uuidv4() : "",
    name: generate ? "some track" : "",
    symbol: "",
    bio: generate ? [10, 10] : [0, 0],
    psy: generate ? [10, 10] : [0, 0],
    inf: generate ? [10, 10] : [0, 0],
    hp: generate ? [3, 3] : [0, 0],
    armor: 0,
    dmgdice: 0,
    description: "",
    state: "",
  };
};

export type MqttMessage = {
  sender: string;
  data: any;
};

export type NotificationInfo = {
  msg: string;
  delay: number;
};
