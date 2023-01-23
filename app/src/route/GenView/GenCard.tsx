import { useI18n } from "@solid-primitives/i18n";
import { FaSolidSkull, FaSolidTrash } from "solid-icons/fa";
import { ComponentProps, createMemo, Match, Show, Switch } from "solid-js";
import {
  CorpoInfo,
  corporationData,
  genPage,
  inodeData,
  NodeInfo,
  npcData,
  NpcInfo,
  squadData,
  SquadInfo,
  themeVars,
} from "~/common";
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
          {t("Objective")}
        </Texte>
        <Texte>{item.objective}</Texte>
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

const GenInode = ({ item }: { item: NodeInfo }) => {
  const [t] = useI18n();
  return (
    <>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Class")}
        </Texte>
        <Texte>{item.node_class}</Texte>
      </div>
      <div class={CardRowStyle}>
        <Flex center style={{ gap: "20px" }}>
          <Flex>
            <Texte color="yellow" size="bigger">
              {t("HP")}
            </Texte>
            <Texte size="bigger">{item.hp}</Texte>
          </Flex>
          <Flex>
            <Texte color="yellow" size="bigger">
              {t("INF")}
            </Texte>
            <Texte size="bigger">{item.inf}</Texte>
          </Flex>
          <Flex>
            <Texte color="yellow" size="bigger">
              {t("ICE")}
            </Texte>
            <Flex>
              <Texte size="bigger" title={t("BLACK_ICE")}>
                {item.ice}
              </Texte>
              <Show when={item.black_ice}>
                <FaSolidSkull />
              </Show>
            </Flex>
          </Flex>
          <Flex>
            <Texte color="yellow" size="bigger" title={t("activation_desc")}>
              {t("ACTIV")}
            </Texte>
            <Texte size="bigger">{item.activation}</Texte>
          </Flex>
        </Flex>
      </div>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Shape")}
        </Texte>
        <Texte>{item.shape}</Texte>
      </div>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Color")}
        </Texte>
        <Texte>{item.color}</Texte>
      </div>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Detail")}
        </Texte>
        <Texte>{item.detail}</Texte>
      </div>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Data")}
        </Texte>
        <Texte>{item.data}</Texte>
      </div>
    </>
  );
};

const GenSquad = ({ item }: { item: SquadInfo }) => {
  const [t] = useI18n();
  return (
    <>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Type")}
        </Texte>
        <Texte>{item.squad_type}</Texte>
      </div>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Leader")}
        </Texte>
        <Texte>{item.leader}</Texte>
      </div>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Group")}
        </Texte>
        <Texte>{item.group}</Texte>
      </div>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Additional_weapon")}
        </Texte>
        <Texte>{item.weapon}</Texte>
      </div>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Detail")}
        </Texte>
        <Texte>{item.detail}</Texte>
      </div>
    </>
  );
};

const GenNpc = ({ item }: { item: NpcInfo }) => {
  const [t] = useI18n();
  return (
    <>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Traits")}
        </Texte>
        <Texte>
          {item.positive_trait}, {item.negative_trait}
        </Texte>
      </div>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Look")}
        </Texte>
        <Texte>{item.look}</Texte>
      </div>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Gear")}
        </Texte>
        <Texte>{item.gear}</Texte>
      </div>
      <div class={CardRowStyle}>
        <Texte size="small" color="yellow">
          {t("Goal")}
        </Texte>
        <Texte>{item.goal}</Texte>
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

  const cardHeight = createMemo(() => {
    switch (genPage()) {
      case "Squad":
        return "300px";
      case "Npc":
        return "270px";
      default:
        return undefined;
    }
  });

  return (
    <div
      class={CardRootStyle({ color: color })}
      style={{ height: cardHeight() }}
    >
      <div class={CardTitleStyle({ color: titlecolor })}>
        <FaSolidTrash
          color={themeVars.colors.pink}
          style={{
            height: "12px",
            width: "12px",
            "align-self": "center",
            cursor: "pointer",
          }}
          onClick={onDelete}
        />
        <Flex type="column">
          <Texte align="right" color={titlecolor}>
            {title}
          </Texte>
          <Texte align="right" size="small" color="blue">
            {subtitle}
          </Texte>
        </Flex>
      </div>
      <Switch>
        <Match when={genPage() === "Corporation"}>
          <GenCorpo item={corporationData()[index]} />
        </Match>
        <Match when={genPage() === "Infosphere"}>
          <GenInode item={inodeData()[index]} />
        </Match>
        <Match when={genPage() === "Squad"}>
          <GenSquad item={squadData()[index]} />
        </Match>
        <Match when={genPage() === "Npc"}>
          <GenNpc item={npcData()[index]} />
        </Match>
      </Switch>
    </div>
  );
};
