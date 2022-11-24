import { Component, createMemo } from "solid-js";
import { TrackInfo, useAppData } from "~/common";
import { Flex, Texte } from "~/component";
import { ListItemStyle } from "./styles.css";

type Props = {
  item: TrackInfo | undefined;
  onClick?: () => void;
};

export const TrackItem: Component<Props> = ({ item, onClick }) => {
  const apd = useAppData();
  const isSelected = createMemo(() => item?.id === apd?.selectedTrack()?.id);
  return (
    <div class={ListItemStyle({ selected: isSelected() })} onClick={onClick}>
      <Texte>{item?.name}</Texte>
    </div>
  );
};
