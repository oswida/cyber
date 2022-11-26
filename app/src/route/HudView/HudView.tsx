import { useI18n } from "@solid-primitives/i18n";
import { FaSolidGears, FaSolidPlug, FaSolidServer } from "solid-icons/fa";
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
  sessionData,
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

  loadRolls(apd);
  loadNotes(apd, false);
  loadNotes(apd, true);
  loadChars(apd);
  loadTracks(apd);

  createEffect(() => {
    if (!apd) return;
    const data = sessionData();
    if (!data || data.browserID.trim() == "") return;
    mqttConnect(apd);
  });

  const notification = createMemo(() => {
    if (!apd) return "";
    return apd.notification().msg;
  });

  const usercolor = createMemo(() => {
    if (!apd) return "#fff";
    return sessionData().color;
  });

  const userInfo = createMemo(() => {
    if (!apd) return "";
    const lines: string[] = [];
    Object.keys(apd.connections()).forEach((key) => {
      lines.push(
        `${apd.connections()[key].username} [${
          apd.connections()[key].connected_at
        },${apd.connections()[key].last_seen_at}]`
      );
    });
    return lines.join("\n");
  });

  return (
    <EditCharacterProvider>
      <div class={HudRootStyle}>
        <Flex type="column">
          <div class={HudNavbarStyle}>
            <Flex>
              <Dynamic
                component={"Texte"}
                title={userInfo()}
                color="blue"
                style={{ "align-self": "center", "margin-right": "10px" }}
              >
                Cyber RPG
              </Dynamic>
              <Switch>
                <Match when={mqttConnectionStatus() === true}>
                  <FaSolidPlug style={{ "align-self": "center" }} />
                </Match>
              </Switch>
              <Show when={sessionData().hosting}>
                <FaSolidServer style={{ "align-self": "center" }} />
              </Show>
            </Flex>
            <Show when={sessionData().username !== "Noname"}>
              <Dynamic
                component={"Texte"}
                style={{
                  "align-self": "center",
                  color: `${usercolor()}`,
                }}
              >
                {sessionData().username}
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
