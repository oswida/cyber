export type CorpoType = {
  id: string;
  name: string;
  operations: string[];
  slogan: string;
};

export type NodeType = {
  id: string;
  name: string;
  node_class: string;
  hp: number;
  inf: number;
  security: string;
  ice: string;
  black_ice: boolean;
  more_security: string;
  data: string;
  look: string;
};

export type NpcType = {
  id: string;
  name: string;
  surname: string;
  traits: string[];
  occupation: string;
  goal: string;
  look: string;
  gear: string;
};
