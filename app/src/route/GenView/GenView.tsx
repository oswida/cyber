import { useI18n } from "@solid-primitives/i18n";
import {
  FaSolidFileExport,
  FaSolidFileImport,
  FaSolidList,
  FaSolidPlay,
  FaSolidTrashCan,
} from "solid-icons/fa";
import { createEffect, createSignal, For, Match, Switch } from "solid-js";
import { deleteCorpo, generateCorpo } from "~/actions";
import {
  corporationData,
  exportData,
  extractQueryParam,
  genPage,
  importData,
  inodGenCorporationKey,
  loadGenCorporations,
  prettyToday,
  saveGenericData,
  setCorporationData,
  setGenPage,
  useAppData,
} from "~/common";
import { Button, Flex, Texte } from "~/component";
import { messages_corporation_en } from "~/locales/en/corporation";
import { messages_corporation_pl } from "~/locales/pl/corporation";
import { GenCard } from "./GenCard";
import { GenSelect } from "./GenSelect";
import { LayoutContentStyle, LayoutRootStyle, NavbarStyle } from "./styles.css";

let mode = "Corporation";
const modeparam = extractQueryParam("mode");
if (modeparam && modeparam != "") {
  mode = modeparam;
}
setGenPage(mode);

export const GenView = () => {
  const [t, { add }] = useI18n();
  const apd = useAppData();
  const [gs, setGs] = createSignal(false);

  const corporation_dicts: Record<string, any> = {
    en: messages_corporation_en,
    pl: messages_corporation_pl,
  };

  Object.keys(corporation_dicts).forEach((key) => {
    add(key, corporation_dicts[key]);
  });

  createEffect(() => {
    switch (genPage()) {
      case "Corporation":
        loadGenCorporations();
        break;
    }
  });

  const generate = () => {
    switch (genPage()) {
      case "Corporation":
        generateCorpo(apd, t);
        break;
    }
  };

  const clean = () => {
    switch (genPage()) {
      case "Corporation":
        setCorporationData([]);
        saveGenericData(inodGenCorporationKey, []);
        break;
    }
  };

  const exportGen = () => {
    switch (genPage()) {
      case "Corporation":
        const filename = `corporation-${prettyToday()}.json`;
        exportData(corporationData(), filename);
        break;
    }
  };

  const importGen = () => {
    importData((data: any) => {
      switch (genPage()) {
        case "Corporation":
          setCorporationData(data);
          saveGenericData(inodGenCorporationKey, data);
          break;
      }
    });
  };

  return (
    <>
      <div class={LayoutRootStyle}>
        <div class={NavbarStyle}>
          <Flex>
            <Texte color="pink" weight={700} style={{ "align-self": "center" }}>
              {t(genPage())}
            </Texte>
            <Button title={t("Generator")} onClick={() => setGs(true)}>
              <FaSolidList />
            </Button>
          </Flex>
          <Flex style={{ gap: "15px" }}>
            <Button title={t("Generate")} border="standard" onClick={generate}>
              <FaSolidPlay />
            </Button>
            <Button title={t("Clean")} onClick={clean}>
              <FaSolidTrashCan />
            </Button>
            <Button title={t("Export")} onClick={exportGen}>
              <FaSolidFileExport />
            </Button>
            <Button title={t("Import")} onClick={importGen}>
              <FaSolidFileImport />
            </Button>
          </Flex>
        </div>
        <div class={LayoutContentStyle}>
          <Switch>
            <Match when={genPage() === "Corporation"}>
              <For each={corporationData()}>
                {(it, idx) => (
                  <GenCard
                    index={idx()}
                    titlecolor="blue"
                    color="pink"
                    title={it.name}
                    subtitle={""}
                    onDelete={() => deleteCorpo(it.id)}
                  />
                )}
              </For>
            </Match>
          </Switch>
          {/* Content */}
        </div>
      </div>
      <GenSelect open={gs} setOpen={setGs} />
    </>
  );
};
