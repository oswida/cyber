import { useI18n } from "@solid-primitives/i18n";
import { Match, Switch } from "solid-js";
import {
  emptyPcInfo,
  inodPlayersKey,
  mqttPublish,
  topicChars,
  useAppData,
  useEditCharacter,
} from "~/common";
import { Button, Flex, Texte } from "~/component";
import { CharFormStatSection } from "./forms/CharFormStatSection";
import { SubEditRootStyle } from "./styles.css";
import { saveGenericData } from "~/common";
import { CharFormBasicSection } from "./forms/CharFormBasicSection";
import { CharFormInventorySection } from "./forms/CharFormInventorySection";
import { CharFormModSection } from "./forms/CharFormModSection";

export const SubEdit = () => {
  const apd = useAppData();
  const [t] = useI18n();
  const editor = useEditCharacter();

  const save = () => {
    if (!editor || !apd) return;

    const ec = editor.editCharacter();
    const newState = { ...apd.charData, [ec.id]: editor.editCharacter() };
    apd.setCharData(newState);
    apd.setSelectedChar(emptyPcInfo);
    saveGenericData(apd, inodPlayersKey, newState);
    apd.setSubeditOpen("");
    if (ec.shared) {
      const cl = apd.mqttClient();
      if (cl !== undefined) {
        mqttPublish(apd.sessionData().browserID, cl, topicChars, [ec]);
      }
    }
  };

  return (
    <div class={SubEditRootStyle}>
      <Flex type="column" center>
        <Flex
          style={{
            "justify-content": "space-between",
            width: "100%",
            padding: "5px",
            "padding-left": "15px",
            "align-items": "center",
          }}
        >
          <Texte color="green" size="bigger">
            {apd?.selectedChar().name}
          </Texte>
          <Button border="none" onClick={() => apd?.setSubeditOpen("")}>
            <Texte color="pink" size="bigger">
              ×
            </Texte>
          </Button>
        </Flex>
        <Flex
          center
          style={{
            "margin-top": "20px",
            "margin-bottom": "20px",
            padding: "10px",
            flex: 1,
            height: "calc(100vh - 120px)",
          }}
        >
          {/* Content */}
          <Switch>
            <Match when={apd?.subeditOpen() === "stat"}>
              <CharFormStatSection />
            </Match>
            <Match when={apd?.subeditOpen() === "basic"}>
              <CharFormBasicSection />
            </Match>
            <Match when={apd?.subeditOpen() === "inv"}>
              <CharFormInventorySection />
            </Match>
            <Match when={apd?.subeditOpen() === "cybermods"}>
              <CharFormModSection isDeck={false} />
            </Match>
            <Match when={apd?.subeditOpen() === "cyberdeck"}>
              <CharFormModSection isDeck={true} />
            </Match>
          </Switch>
        </Flex>
        <Button onClick={save}>{t("Save")}</Button>
      </Flex>
    </div>
  );
};
