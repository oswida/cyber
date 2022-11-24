import { AppDataType } from "./signals";
import { DiceRoll, DiceRoller } from "@dice-roller/rpg-dice-roller";
import {
  compress,
  decompress,
  compressToBase64,
  decompressFromBase64,
} from "@eonasdan/lz-string";

export const loadTranslation = async (lang: string, filename?: string) => {
  var name = `../locales/${lang}/${lang}.json`;
  if (filename && filename.trim() !== "") {
    name = `../locales/${lang}/${filename}.json`;
  }
  const messages = await import(/* @vite-ignore */ name);
  const result: Record<string, string> = {};
  Object.keys(messages).forEach((it) => {
    result[it] = messages[it];
  });
  return result;
};

export const extractQueryParam = (name: string) => {
  const re = new RegExp(`.*(${name}=[a-zA-Z]+).*`, "i");
  const res = window.location.href.match(re);
  if (res && res[1]) {
    const l = res[1].replace(`${name}=`, "").trim();
    return l;
  }
  return "";
};

export const compressData = (data: any) => {
  return compress(JSON.stringify(data));
};

export const compressData64 = (data: any) => {
  return compressToBase64(JSON.stringify(data));
};

export const decompressData = (data: any) => {
  const d = decompress(data);
  return JSON.parse(d);
};

export const decompressData64 = (data: any) => {
  const d = decompressFromBase64(data);
  return JSON.parse(d);
};

const roller = new DiceRoller();

export const rollSingle = (roll: string) => {
  return roller.roll(roll) as DiceRoll;
};

export const rollFrom = (source: string[]) => {
  const num = rollSingle(`1d${source.length}`).total;
  return source[num - 1];
};

export const rollIndexFrom = (source: string[]) => {
  const num = rollSingle(`1d${source.length}`).total;
  return num - 1;
};

export const exportData = (data: any, filename: string) => {
  if (!data) return;
  const print = JSON.stringify(data, null, "\t");
  const link = document.createElement("a");
  link.download = filename;
  link.href = "data:text/json;charset=utf-8," + encodeURIComponent(print);
  link.click();
};

export const importData = (callback: (data: any) => void) => {
  const el = document.createElement("input");
  el.setAttribute("type", "file");
  el.setAttribute("accept", "application/json");
  el.addEventListener("change", function () {
    if (!this.files || this.files.length === 0) return;
    const reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      callback(JSON.parse(event.target.result));
    });
    reader.readAsText(this.files[0]);
  });
  el.click();
};

export const prettyNow = () => {
  var date = new Date();
  return date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const prettyToday = () => {
  var date = new Date();
  return date
    .toLocaleTimeString(navigator.language, {
      day: "2-digit",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replaceAll(",", "_")
    .replaceAll(" ", "_");
};

export const notify = (apd: AppDataType, msg: string, delay: number) => {
  if (!apd) return;
  apd.setNotification({
    msg: msg,
    delay: delay,
  });
  console.log("nitification om");
  setTimeout(() => {
    console.log("nitification off");

    apd.setNotification({ msg: "", delay: 0 });
  }, delay);
};
