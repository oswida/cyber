import { useI18n } from "@solid-primitives/i18n";
import { Accessor, Component, createEffect, Setter } from "solid-js";
import {
  inodBoardKey,
  inodNotesKey,
  mqttPublish,
  NoteInfo,
  saveGenericData,
  topicBoard,
  useAppData,
  mqttTopic,
  sessionData,
} from "~/common";
import { Button, Dialog, Flex, Input, TextArea, Texte } from "~/component";

type Props = {
  isShared: boolean;
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
  item: Accessor<NoteInfo | undefined>;
};

export const NoteEdit: Component<Props> = ({
  isShared,
  open,
  setOpen,
  item,
}) => {
  var titleRef: HTMLInputElement;
  var contentRef: HTMLDivElement;
  const apd = useAppData();

  createEffect(() => {
    const it = item();
    if (!open() || !it || !titleRef || !contentRef) return;
    titleRef.value = it.title;
    contentRef.innerText = it.content;
  });

  const save = () => {
    if (!apd) return;
    const it = item();
    if (!titleRef || !contentRef || !it) return;
    const newState: Record<string, NoteInfo> = isShared
      ? { ...apd.boardData() }
      : { ...apd.noteData() };
    it.title = titleRef.value;
    it.content = contentRef.innerText;
    newState[it.id] = { ...it };
    if (isShared) {
      apd.setBoardData(newState);
      saveGenericData(inodBoardKey, newState);
      const cl = apd.mqttClient();
      if (cl !== undefined) {
        mqttPublish(
          sessionData().browserID,
          cl,
          mqttTopic(topicBoard),
          Object.values(apd.boardData())
        );
      }
    } else {
      apd.setNoteData(newState);
      saveGenericData(inodNotesKey, newState);
    }
    apd.setSelectedNote(undefined);
    setOpen(false);
  };

  const [t] = useI18n();

  return (
    <Dialog open={open} setOpen={setOpen} title={t("Note")} opacity="more">
      <Flex
        type="column"
        style={{
          width: "80%",
          "align-self": "center",
          gap: "10px",
        }}
      >
        <Texte size="small" color="yellow">
          {t("Title")}
        </Texte>
        <Input
          ref={(el) => {
            titleRef = el;
          }}
          style={{ flex: 1 }}
        />
        <Texte size="small" color="yellow">
          {t("Content")}
        </Texte>
        <TextArea
          ref={(el) => {
            contentRef = el;
          }}
          small
          contentEditable={true}
          border="none"
          style={{
            flex: 1,
            "white-space": "pre-wrap",
            "min-height": "400px",
            "max-height": "400px",
          }}
        />
        <Button style={{ "align-self": "end" }} onClick={save}>
          {t("Save")}
        </Button>
      </Flex>
    </Dialog>
  );
};
