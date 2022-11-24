import { useI18n } from "@solid-primitives/i18n";
import { createMatcher } from "@solidjs/router/dist/utils";
import { debounce } from "debounce";
import {
  Accessor,
  Component,
  createEffect,
  createMemo,
  Setter,
} from "solid-js";
import { newCharacter } from "~/actions/character";
import {
  emptyPcInfo,
  inodPlayersKey,
  mqttPublish,
  saveGenericData,
  topicChars,
  useAppData,
  useEditCharacter,
} from "~/common";
import { Button, Dialog, Flex } from "~/component";
import { CharFormBasicSection } from "./forms/CharFormBasicSection";
import { CharFormInventorySection } from "./forms/CharFormInventorySection";
import { CharFormModSection } from "./forms/CharFormModSection";
import { CharFormNoteSection } from "./forms/CharFormNoteSection";
import { CharFormStatSection } from "./forms/CharFormStatSection";

type Props = {
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
};

export const CharEdit: Component<Props> = ({ open, setOpen }) => {
  const [t] = useI18n();
  const editor = useEditCharacter();
  const apd = useAppData();

  const save = () => {
    if (!editor || !apd) return;

    const ec = editor.editCharacter();
    const newState = { ...apd.charData, [ec.id]: editor.editCharacter() };
    apd.setCharData(newState);
    apd.setSelectedChar(emptyPcInfo);
    saveGenericData(apd, inodPlayersKey, newState);
    setOpen(false);
    if (ec.shared) {
      const cl = apd.mqttClient();
      if (cl !== undefined) {
        mqttPublish(apd.sessionData().browserID, cl, topicChars, [ec]);
      }
    }
  };

  const cid = createMemo(() => {
    return editor?.editCharacter()?.id;
  });

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      title={`${t("Character")} ${cid()}`}
      opacity="more"
    >
      <Flex type="column" center>
        <Flex
          type="column"
          style={{
            height: "calc(100vh - 120px)",
            width: "calc(100vw - 30px)",
            overflow: "auto",
            gap: "25px",
            "margin-bottom": "20px",
            "align-self": "center",
          }}
        >
          <CharFormBasicSection />
          <CharFormStatSection />
          <CharFormInventorySection />
          <CharFormModSection isDeck={false} />
          <CharFormModSection isDeck={true} />
          <CharFormNoteSection />
        </Flex>
        <Flex center>
          <Button onClick={save}>{t("Save")}</Button>
        </Flex>
      </Flex>
    </Dialog>
  );
};
