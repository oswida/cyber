import { TrackInfo } from "./../common/types";

export const deleteTrack = (apd: any, item: TrackInfo) => {
  const newState: Record<string, TrackInfo> = {};
  Object.values(apd.trackData()).forEach((it: any) => {
    if (it.id !== item.id) {
      newState[it.id] = it;
    }
  });
  apd.setTrackData(newState);
  return newState;
};
