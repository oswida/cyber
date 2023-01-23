import { useI18n } from "@solid-primitives/i18n";
import { Accessor, Setter } from "solid-js";
import { setGenPage } from "~/common";
import { Button, Dialog, Flex, Texte } from "~/component";

type Props = {
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
};

const re = new RegExp(`mode=[a-zA-Z0-9]+`, "i");

export const GenSelect = ({ open, setOpen }: Props) => {
  const [t] = useI18n();

  const selectGen = (page: string) => {
    setGenPage(page);
    setOpen(false);
    let s = window.location.href;
    window.location.replace(s.replace(re, `mode=${page}`));
    window.location.reload();
  };

  return (
    <Dialog open={open} setOpen={setOpen} title={t("Select_generator")}>
      <Flex type="column" style={{ width: "20%", "align-self": "center" }}>
        <Button onClick={() => selectGen("Corporation")}>
          <Texte>{t("Corporation")}</Texte>
        </Button>
        <Button onClick={() => selectGen("Infosphere")}>
          <Texte>{t("Infosphere")}</Texte>
        </Button>
        <Button onClick={() => selectGen("Squad")}>
          <Texte>{t("Squad")}</Texte>
        </Button>
        <Button onClick={() => selectGen("Npc")}>
          <Texte>{t("Non_player_character")}</Texte>
        </Button>
      </Flex>
    </Dialog>
  );
};
