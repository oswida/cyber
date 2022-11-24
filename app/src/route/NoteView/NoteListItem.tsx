import { Component, createMemo } from "solid-js";
import { NoteInfo, useAppData } from "~/common";
import { Texte } from "~/component";
import { ListItemStyle } from "./styles.css";

type Props = {
  item: NoteInfo | undefined;
  onClick?: () => void;
};

export const NoteListItem: Component<Props> = ({ item, onClick }) => {
  const apd = useAppData();
  const isSelected = createMemo(() => item?.id === apd?.selectedNote()?.id);

  return (
    <div class={ListItemStyle({ selected: isSelected() })} onClick={onClick}>
      <Texte>{item?.title}</Texte>
    </div>
  );
};
