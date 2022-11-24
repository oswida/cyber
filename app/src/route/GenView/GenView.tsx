import { useI18n } from "@solid-primitives/i18n";
import {
  corporationData,
  exportData,
  genPage,
  importData,
  inodGenCorporationKey,
  loadGenCorporations,
  prettyToday,
  saveGenericData,
  setCorporationData,
  useAppData,
} from "~/common";
import { Button, Flex, Texte } from "~/component";
import { LayoutContentStyle, LayoutRootStyle, NavbarStyle } from "./styles.css";
import {
  FaSolidFileExport,
  FaSolidFileImport,
  FaSolidPlay,
  FaSolidTrashCan,
} from "solid-icons/fa";
import { For, Match, Switch } from "solid-js";
import { GenCard } from "./GenCard";
import { deleteCorpo, generateCorpo } from "~/actions";
import { messages_corporation_en } from "~/locales/en/corporation";
import { messages_corporation_pl } from "~/locales/pl/corporation";

export const GenView = () => {
  const [t, { add, locale }] = useI18n();
  const apd = useAppData();

  const corporation_dicts: Record<string, any> = {
    en: messages_corporation_en,
    pl: messages_corporation_pl,
  };

  Object.keys(corporation_dicts).forEach((key) => {
    add(key, corporation_dicts[key]);
  });

  loadGenCorporations();

  const generate = () => {
    generateCorpo(apd, t);
  };

  const clean = () => {
    switch (genPage()) {
      case "Corporation":
        setCorporationData([]);
        saveGenericData(apd, inodGenCorporationKey, []);
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
      setCorporationData(data);
      saveGenericData(apd, inodGenCorporationKey, data);
    });
  };

  return (
    <div class={LayoutRootStyle}>
      <div class={NavbarStyle}>
        <Texte color="pink" weight={700}>
          {t(genPage())}
        </Texte>
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
  );
};
