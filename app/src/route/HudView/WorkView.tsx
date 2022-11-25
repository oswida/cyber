import { useI18n } from "@solid-primitives/i18n";
import { useAppData } from "~/common";
import { Tabs, TabsDesc } from "~/component";
import { Whiteboard } from "~/component/Whiteboard";
import { CharView } from "../CharView";
import { NoteView } from "../NoteView";
import { TrackView } from "../TrackView";
import { WorkViewRootStyle } from "./styles.css";

export const WorkView = () => {
  const [t] = useI18n();
  const apd = useAppData();

  const items: TabsDesc[] = [
    {
      label: t("Characters"),
      value: "characters",
      content: <CharView />,
    },
    {
      label: t("Draw"),
      value: "draw",
      content: <Whiteboard />,
    },
    {
      label: t("Messages"),
      value: "messages",
      content: <NoteView isShared={true} />,
    },
    {
      label: t("Notes"),
      value: "notes",
      content: <NoteView isShared={false} />,
    },
    // {
    //   label: t("Tracker"),
    //   value: "tracker",
    //   content: <TrackView />,
    // },
  ];

  return (
    <div class={WorkViewRootStyle}>
      <Tabs
        items={items}
        onTabChange={(name: string) => {
          apd?.setSelectedNote(undefined);
        }}
      />
    </div>
  );
};
