import { useI18n } from "@solid-primitives/i18n";
import { FaSolidGears, FaSolidNetworkWired, FaSolidPlug } from "solid-icons/fa";
import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  Match,
  Show,
  Switch,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import {
  EditCharacterProvider,
  loadChars,
  loadNotes,
  loadRolls,
  loadTracks,
  useAppData,
} from "~/common";
import { mqttConnect, mqttConnectionStatus } from "~/common/mqtt";
import { Button, Flex, Texte } from "~/component";
import { ConfigView } from "./ConfigView";
import { DiceView } from "./DiceView";
import { HudNavbarStyle, HudRootStyle } from "./styles.css";
import { WorkView } from "./WorkView";

export const HudView: Component = () => {
  const apd = useAppData();
  const [t] = useI18n();
  const [configOpen, setConfigOpen] = createSignal(false);

  mqttConnect(apd);

  loadRolls(apd);
  loadNotes(apd, false);
  loadNotes(apd, true);
  loadChars(apd);
  loadTracks(apd);

  const notification = createMemo(() => {
    if (!apd) return "";
    return apd.notification().msg;
  });

  const usercolor = createMemo(() => {
    if (!apd) return "#fff";
    return apd.sessionData().color;
  });

  return (
    <EditCharacterProvider>
      <div class={HudRootStyle}>
        <Flex type="column">
          <div class={HudNavbarStyle}>
            <Flex>
              <Texte
                color="blue"
                style={{ "align-self": "center", "margin-right": "10px" }}
              >
                Cyber RPG
              </Texte>
              <Switch>
                <Match when={mqttConnectionStatus() === true}>
                  <FaSolidPlug style={{ "align-self": "center" }} />
                </Match>
              </Switch>
            </Flex>
            <Show when={apd?.sessionData().username !== "Noname"}>
              <Dynamic
                component={"Texte"}
                style={{
                  "align-self": "center",
                  color: `${usercolor()}`,
                }}
              >
                {apd?.sessionData().username}
              </Dynamic>
            </Show>
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
