import { t } from "@lingui/macro";

export const genTitles: Record<string, string> = {
  npc: `Non-player character`,
  corpo: `Corporation`,
  node: `Infosphere node`,
  place: `Place`,
  job: `Job`,
  operations: `Operations`,
  gossip: `Gossip`,
};

export const translateObject = (obj: any) => {
  const result: any = {};
  Object.keys(obj).forEach((k) => {
    result[k] = t`${obj[k]}`;
  });
  return result;
};
