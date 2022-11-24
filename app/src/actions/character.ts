import { PcInfo, useAppData } from "~/common";
import { v4 as uuidv4 } from "uuid";
import { describe } from "node:test";

export const newCharacter = (genid?: boolean) => {
  const result: PcInfo = {
    id: genid ? uuidv4() : "",
    name: "",
    player: "",
    background: "",
    bio: [0, 0],
    psy: [0, 0],
    inf: [0, 0],
    hp: [0, 0],
    armor: 0,
    subscription: "bronze",
    credits: 0,
    inventory: [],
    cybermods: [],
    cyberdeck: [],
    shared: false,
    deprived: false,
  };
  return result;
};

export const newCharMod = (name?: string) => {
  return {
    id: uuidv4(),
    name: name ? name : "name",
    description: "description",
    activated: false,
    need_activation: false,
  };
};

export const copyCharacter = (src: PcInfo, dest: PcInfo) => {
  dest.id = src.id;
  dest.name = src.name;
  dest.armor = src.armor;
  dest.background = src.background;
  dest.bio = src.bio;
  dest.credits = src.credits;
  dest.cyberdeck = src.cyberdeck;
  dest.cybermods = src.cybermods;
  dest.deprived = src.deprived;
  dest.hp = src.hp;
};
