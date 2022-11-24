import { useI18n } from "@solid-primitives/i18n";
import { FaSolidGears } from "solid-icons/fa";
import { Component, createMemo, createSignal } from "solid-js";
import {
  EditCharacterProvider,
  loadChars,
  loadNotes,
  loadRolls,
  loadTracks,
  useAppData,
} from "~/common";
import { mqttConnect } from "~/common/mqtt";
import { Button, Flex, Texte } from "~/component";
import { ConfigView } from "./ConfigView";
import { DiceView } from "./DiceView";
import { HudNavbarStyle, HudRootStyle } from "./styles.css";
import { WorkView } from "./WorkView";

export const HudView: Component = () => {
  const apd = useAppData();
  const [t] = useI18n();
  const [configOpen, setConfigOpen] = createSignal(false);

  loadRolls(apd);
  loadNotes(apd, false);
  loadNotes(apd, true);
  loadChars(apd);
  loadTracks(apd);
  mqttConnect(apd);

  const notification = createMemo(() => {
    if (!apd) return "";
    console.log("create Memo notification", apd.notification().msg);
    return apd.notification().msg;
  });

  return (
    <EditCharacterProvider>
      <div class={HudRootStyle}>
        <Flex type="column">
          <div class={HudNavbarStyle}>
            <Texte color="blue" style={{ "align-self": "center" }}>
              Cyber RPG
            </Texte>
            <Flex vcenter>
              <Texte
                color="pink"
                size="small"
                style={{ "margin-right": "10px", opacity: 0.7 }}
              >
                {notification()}{" "}
              </Texte>
              <Button
                title={t("Configuration")}
                onClick={() => setConfigOpen(true)}
              >
                <FaSolidGears />
              </Button>
            </Flex>
          </div>
          <Flex>
            <DiceView />
            <WorkView />
          </Flex>
        </Flex>
        <ConfigView open={configOpen} setOpen={setConfigOpen} />
      </div>
    </EditCharacterProvider>
  );
};
