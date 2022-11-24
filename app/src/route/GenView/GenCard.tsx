import { useI18n } from "@solid-primitives/i18n";
import { FaSolidTrash } from "solid-icons/fa";
import { ComponentProps, Match, Switch } from "solid-js";
import { CorpoInfo, corporationData, genPage, themeVars } from "~/common";
import { Flex, Texte } from "~/component";
import { CardRootStyle, CardRowStyle, CardTitleStyle } from "./styles.css";
type Props = {
  title: string;
  subtitle?: string;
  onDelete: () => void;
  color?: "yellow" | "pink" | "green" | "blue";
  titlecolor?: "yellow" | "pink" | "green" | "blue";
  index: number;
};

const GenCorpo = ({ item }: { item: CorpoInfo }) => {
  const [t] = useI18n();
  return (
    <>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Sector")}
        </Texte>
        <Texte>{item.sectors.join(", ")}</Texte>
      </div>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Gossip")}
        </Texte>
        <Texte>{item.gossip}</Texte>
      </div>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Resources")}
        </Texte>
        <Texte>{item.resources.join(", ")}</Texte>
      </div>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Employee_profile")}
        </Texte>
        <Texte>{item.employeeProfile}</Texte>
      </div>
    </>
  );
};

export const GenCard = ({
  title,
  subtitle,
  onDelete,
  color,
  titlecolor,
  index,
}: ComponentProps<"div"> & Props) => {
  const [t] = useI18n();
  return (
    <div class={CardRootStyle({ color: color })}>
      <div class={CardTitleStyle({ color: titlecolor })}>
        <FaSolidTrash
          color={themeVars.colors.pink}
          style={{ height: "12px", width: "12px", "align-self": "center" }}
          onClick={onDelete}
        />
        <Flex type="column">
          <Texte color={titlecolor}>{title}</Texte>
          <Texte align="right" size="small" color="blue">
            {subtitle}
          </Texte>
        </Flex>
      </div>
      <Switch>
        <Match when={genPage() === "Corporation"}>
          <GenCorpo item={corporationData()[index]} />
        </Match>
      </Switch>
    </div>
  );
};
