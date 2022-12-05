import { useI18n } from "@solid-primitives/i18n";
import { FaSolidFloppyDisk } from "solid-icons/fa";
import { Component, createMemo } from "solid-js";
import { inodTrackKey, saveGenericData, TrackInfo, useAppData } from "~/common";
import { Button, Flex, Input, TextArea, Texte } from "~/component";
import { ListItemStyle } from "./styles.css";

type Props = {
  item: TrackInfo | undefined;
  onClick?: () => void;
};

export const TrackItem: Component<Props> = ({ item, onClick }) => {
  const apd = useAppData();
  const fields: Record<string, HTMLInputElement> = {};
  let descRef: HTMLDivElement;
  const isSelected = createMemo(() => item?.id === apd?.selectedTrack()?.id);
  const [t] = useI18n();

  const change = (field: string) => {
    const fld = fields[field];
    if (!apd || !item || !fld) return;
    switch (field) {
      case "name":
        item.name = fld.value;
        break;
      case "symbol":
        item.symbol = fld.value;
        break;
      case "dmgdice":
        item.dmgdice = Number.parseInt(fld.value);
        break;

      case "hp":
        item.hp = Number.parseInt(fld.value);
        break;
      case "bio":
        item.bio = Number.parseInt(fld.value);
        break;
      case "psy":
        item.psy = Number.parseInt(fld.value);
        break;
      case "inf":
        item.inf = Number.parseInt(fld.value);
        break;
      case "armor":
        item.armor = Number.parseInt(fld.value);
        break;
    }
    const newState = { ...apd.trackData(), [item.id]: { ...item } };
    apd.setTrackData(newState);
    saveGenericData(inodTrackKey, newState);
  };

  const changeDesc = () => {
    if (!apd || !descRef || !item) return;
    item.description = descRef.innerText;
    const newState = { ...apd.trackData(), [item.id]: { ...item } };
    apd.setTrackData(newState);
    saveGenericData(inodTrackKey, newState);
  };

  return (
    <div class={ListItemStyle({ selected: isSelected() })} onClick={onClick}>
      <Flex
        style={{
          gap: "15px",

          width: "100%",
        }}
      >
        <Flex type="column" style={{ gap: "15px" }}>
          <Flex
            vcenter
            style={{
              gap: "10px",
              "flex-wrap": "wrap",
              "justify-content": "space-between",
            }}
          >
            <Input
              underline="blue"
              value={item?.name}
              transparent
              onBlur={() => change("name")}
              ref={(el) => (fields["name"] = el)}
            />
            <Texte size="small" color="blue">
              Symbol
            </Texte>
            <Input
              transparent
              center
              middle
              underline="blue"
              value={item?.symbol}
              style={{ width: "2em" }}
              onBlur={() => change("symbol")}
              ref={(el) => (fields["symbol"] = el)}
            />
            <Texte size="small" color="blue">
              {t("dmg_dice").toUpperCase()}
            </Texte>
            <Input
              transparent
              center
              middle
              underline="blue"
              value={item?.dmgdice}
              style={{ width: "2em" }}
              onBlur={() => change("dmgdice")}
              ref={(el) => (fields["dmgdice"] = el)}
            />
          </Flex>
          <Flex style={{ "flex-wrap": "wrap", gap: "25px" }}>
            {/* HP */}
            <Flex vcenter>
              <Texte color="yellow" size="small">
                {t("HP")}
              </Texte>
              <Input
                transparent
                middle
                center
                underline="blue"
                value={item?.hp}
                style={{ width: "2em" }}
                onBlur={() => change("hp")}
                ref={(el) => (fields["hp"] = el)}
              />
            </Flex>
            {/* BIO */}
            <Flex vcenter>
              <Texte color="yellow" size="small">
                BIO
              </Texte>
              <Input
                middle
                transparent
                center
                underline="blue"
                value={item?.bio}
                style={{ width: "2em" }}
                onBlur={() => change("bio")}
                ref={(el) => (fields["bio"] = el)}
              />
            </Flex>

            {/* PSY */}
            <Flex vcenter>
              <Texte color="yellow" size="small">
                PSY
              </Texte>
              <Input
                middle
                transparent
                center
                underline="blue"
                value={item?.psy}
                style={{ width: "2em" }}
                onBlur={() => change("psy")}
                ref={(el) => (fields["psy"] = el)}
              />
            </Flex>
            {/* INF */}
            <Flex vcenter>
              <Texte color="yellow" size="small">
                INF
              </Texte>
              <Input
                middle
                transparent
                center
                underline="blue"
                value={item?.inf}
                style={{ width: "2em" }}
                onBlur={() => change("inf")}
                ref={(el) => (fields["inf"] = el)}
              />
            </Flex>
            {/* ARMOR */}
            <Flex vcenter>
              <Texte color="yellow" size="small">
                {t("Armor").toUpperCase()}
              </Texte>
              <Input
                middle
                transparent
                center
                underline="blue"
                value={item?.armor}
                style={{ width: "2em" }}
                onBlur={() => change("armor")}
                ref={(el) => (fields["armor"] = el)}
              />
            </Flex>
          </Flex>
        </Flex>
        {/* desc */}

        <TextArea
          contentEditable
          border="none"
          small
          style={{ "max-height": "4em", flex: 1 }}
          ref={(el) => (descRef = el)}
          onBlur={changeDesc}
        >
          {item?.description}
        </TextArea>
      </Flex>
    </div>
  );
};
