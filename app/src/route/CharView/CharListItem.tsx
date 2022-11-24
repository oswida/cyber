import { useI18n } from "@solid-primitives/i18n";
import { FaSolidEarthEurope } from "solid-icons/fa";
import { createMemo, Show } from "solid-js";
import { themeVars, useAppData, useEditCharacter } from "~/common";
import { Flex, Texte } from "~/component";
import { SelectableItemStyle } from "./styles.css";

export const CharListItem = ({ id }: { id: string }) => {
  const apd = useAppData();
  const editor = useEditCharacter();

  const item = createMemo(() => {
    if (!apd) return;
    return apd.charData[id];
  });

  const isSelected = createMemo(() => {
    if (!apd) return;
    const c = apd.selectedChar();
    const it = item();
    if (!c || !it) return false;
    return it.id === c.id;
  });

  const [t] = useI18n();

  const select = () => {
    if (!apd) return;
    apd.setSelectedChar(apd.charData[id]);
  };

  const subedit = (name: string) => {
    const it = item();
    if (!apd || !it || !editor || it?.id.trim() === "") return;

    editor.setEditCharacter({ ...it });
    apd.setSubeditOpen(name);
  };

  return (
    <div
      class={SelectableItemStyle({ selected: isSelected() })}
      onClick={select}
    >
      <Flex type="column" style={{ width: "100%" }}>
        <Flex style={{ "justify-content": "space-between" }}>
          <Texte color="green" size="bigger" onClick={() => subedit("basic")}>
            {item()?.name}
          </Texte>
          <Show when={item()?.shared === true}>
            <FaSolidEarthEurope
              style={{
                "align-self": "center",
                fill: themeVars.colors.blue,
                "margin-right": "10px",
              }}
            />
          </Show>
        </Flex>
        <Flex style={{ gap: "25px" }}>
          <Flex>
            <Texte color="yellow" onClick={() => subedit("stat")}>
              {t("BIO")}:
            </Texte>
            <Texte>
              {item()?.bio[0]}/{item()?.bio[1]}
            </Texte>
          </Flex>
          <Flex>
            <Texte color="yellow" onClick={() => subedit("stat")}>
              {t("PSY")}:
            </Texte>
            <Texte>
              {item()?.psy[0]}/{item()?.psy[1]}
            </Texte>
          </Flex>
          <Flex>
            <Texte color="yellow" onClick={() => subedit("stat")}>
              {t("INF")}:
            </Texte>
            <Texte>
              {item()?.inf[0]}/{item()?.inf[1]}
            </Texte>
          </Flex>
          <Flex>
            <Texte color="yellow" onClick={() => subedit("stat")}>
              {t("HP")}:
            </Texte>
            <Texte>
              {item()?.hp[0]}/{item()?.hp[1]}
            </Texte>
          </Flex>
          <Flex>
            <Texte color="yellow" onClick={() => subedit("stat")}>
              {t("Armor")}:
            </Texte>
            <Texte>{item()?.armor}</Texte>
          </Flex>
          <Flex>
            <Show when={item()?.deprived}>
              <Texte color="pink" onClick={() => subedit("stat")}>
                {t("Deprived")}
              </Texte>
            </Show>
          </Flex>
        </Flex>
        <Flex style={{ gap: "25px" }}>
          <Flex>
            <Texte color="yellow" onClick={() => subedit("basic")}>
              {t("Credits")}:
            </Texte>
            <Texte>{item()?.credits}</Texte>
          </Flex>
          <Flex>
            <Texte color="yellow" onClick={() => subedit("inv")}>
              {t("Inventory")}:
            </Texte>
            <Texte>
              {item()?.inventory.filter((it) => it.fatigue).length}{" "}
              {t("inventory_fatigued")} /
            </Texte>
            <Texte>
              {item()?.inventory.length} {t("inventory_total")}
            </Texte>
          </Flex>
        </Flex>

        <Flex style={{ gap: "25px" }}>
          <Flex>
            <Texte color="yellow" onClick={() => subedit("cybermods")}>
              {t("Cybermods")}:
            </Texte>
            <Texte>
              {item()?.cybermods.filter((it) => it.activated).length}{" "}
              {t("activated")} /
            </Texte>
            <Texte>
              {item()?.cybermods.length} {t("total")}
            </Texte>
          </Flex>
          <Flex>
            <Texte color="yellow" onClick={() => subedit("cyberdeck")}>
              {t("Programs")}:
            </Texte>
            <Texte>
              {item()?.cyberdeck.filter((it) => it.activated).length}{" "}
              {t("activated")} /
            </Texte>
            <Texte>
              {item()?.cyberdeck.length} {t("total")}
            </Texte>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};
