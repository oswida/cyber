import { useI18n } from "@solid-primitives/i18n";
import { createEffect, Match, Switch } from "solid-js";
import { produce } from "solid-js/store";
import { useEditCharacter } from "~/common";

import { Button, Flex, Input, Texte } from "~/component";

export const CharFormStatSection = () => {
  const [t] = useI18n();
  const editor = useEditCharacter();
  var bioRef1: HTMLInputElement;
  var bioRef2: HTMLInputElement;
  var psyRef1: HTMLInputElement;
  var psyRef2: HTMLInputElement;
  var infRef1: HTMLInputElement;
  var infRef2: HTMLInputElement;
  var hpRef1: HTMLInputElement;
  var hpRef2: HTMLInputElement;
  var armorRef: HTMLInputElement;

  const changeStat = (name: string, index: number) => {
    let num = 0;
    switch (name) {
      case "bio":
        if (index == 0) {
          num = Number.parseInt(bioRef1.value);
          if (num !== NaN)
            editor?.setEditCharacter((prev) => ({
              ...prev,
              bio: [num, prev.bio[1]],
            }));
        } else {
          num = Number.parseInt(bioRef2.value);
          if (num !== NaN)
            editor?.setEditCharacter((prev) => ({
              ...prev,
              bio: [prev.bio[0], num],
            }));
        }
        break;
      case "psy":
        if (index == 0) {
          num = Number.parseInt(psyRef1.value);
          if (num !== NaN)
            editor?.setEditCharacter((prev) => ({
              ...prev,
              psy: [num, prev.psy[1]],
            }));
        } else {
          num = Number.parseInt(psyRef2.value);
          if (num !== NaN)
            editor?.setEditCharacter((prev) => ({
              ...prev,
              psy: [prev.psy[0], num],
            }));
        }
        break;
      case "inf":
        if (index == 0) {
          num = Number.parseInt(infRef1.value);
          if (num !== NaN)
            editor?.setEditCharacter((prev) => ({
              ...prev,
              inf: [num, prev.inf[1]],
            }));
        } else {
          num = Number.parseInt(infRef2.value);
          if (num !== NaN)
            editor?.setEditCharacter((prev) => ({
              ...prev,
              inf: [prev.inf[0], num],
            }));
        }
        break;
      case "hp":
        if (index == 0) {
          num = Number.parseInt(hpRef1.value);
          if (num !== NaN)
            editor?.setEditCharacter((prev) => ({
              ...prev,
              hp: [num, prev.hp[1]],
            }));
        } else {
          num = Number.parseInt(hpRef2.value);
          if (num !== NaN)
            editor?.setEditCharacter((prev) => ({
              ...prev,
              hp: [prev.hp[0], num],
            }));
        }
        break;
      case "armor":
        num = Number.parseInt(armorRef.value);
        if (num !== NaN) {
          editor?.setEditCharacter((prev) => ({ ...prev, armor: num }));
        }
        break;
      case "deprived":
        if (index == 0) {
          editor?.setEditCharacter((prev) => ({ ...prev, deprived: false }));
        } else {
          editor?.setEditCharacter((prev) => ({ ...prev, deprived: true }));
        }
        break;
      case "shared":
        if (index == 0) {
          editor?.setEditCharacter((prev) => ({ ...prev, shared: false }));
        } else {
          editor?.setEditCharacter((prev) => ({ ...prev, shared: true }));
        }
        break;
    }
  };

  createEffect(() => {
    if (
      !bioRef1 ||
      !bioRef2 ||
      !psyRef1 ||
      !psyRef2 ||
      !infRef1 ||
      !infRef2 ||
      !hpRef1 ||
      !hpRef2 ||
      !armorRef ||
      !editor
    )
      return;
    bioRef1.value = editor.editCharacter().bio[0].toString();
    bioRef2.value = editor.editCharacter().bio[1].toString();
    psyRef1.value = editor.editCharacter().psy[0].toString();
    psyRef2.value = editor.editCharacter().psy[1].toString();
    infRef1.value = editor.editCharacter().inf[0].toString();
    infRef2.value = editor.editCharacter().inf[1].toString();
    hpRef1.value = editor.editCharacter().hp[0].toString();
    hpRef2.value = editor.editCharacter().hp[1].toString();
    armorRef.value = editor.editCharacter().armor.toString();
  });

  return (
    <Flex
      style={{
        width: "90%",
        gap: "10px",
        "align-self": "center",
        "justify-content": "space-evenly",
        "flex-wrap": "wrap",
      }}
    >
      <Flex style={{ gap: "35px", "flex-wrap": "wrap" }}>
        {/* BIO */}
        <Flex type="column">
          <Texte
            size="middle"
            color="yellow"
            style={{ "align-self": "center" }}
          >
            {t("BIO")}
          </Texte>
          <Flex vcenter>
            <Input
              ref={(el) => (bioRef1 = el)}
              center
              style={{ width: "2em" }}
              onChange={() => changeStat("bio", 0)}
            />
            /
            <Input
              center
              ref={(el) => (bioRef2 = el)}
              style={{ width: "2em" }}
              onChange={() => changeStat("bio", 1)}
            />
          </Flex>
        </Flex>
        {/* PSY */}
        <Flex type="column">
          <Texte
            size="middle"
            color="yellow"
            style={{ "align-self": "center" }}
          >
            {t("PSY")}
          </Texte>
          <Flex vcenter>
            <Input
              ref={(el) => (psyRef1 = el)}
              center
              style={{ width: "2em" }}
              onChange={() => changeStat("psy", 0)}
            />
            /
            <Input
              center
              ref={(el) => (psyRef2 = el)}
              style={{ width: "2em" }}
              onChange={() => changeStat("psy", 1)}
            />
          </Flex>
        </Flex>
        {/* INF */}
        <Flex type="column">
          <Texte
            size="middle"
            color="yellow"
            style={{ "align-self": "center" }}
          >
            {t("INF")}
          </Texte>
          <Flex vcenter>
            <Input
              ref={(el) => (infRef1 = el)}
              center
              style={{ width: "2em" }}
              onChange={() => changeStat("inf", 0)}
            />
            /
            <Input
              center
              ref={(el) => (infRef2 = el)}
              style={{ width: "2em" }}
              onChange={() => changeStat("inf", 1)}
            />
          </Flex>
        </Flex>
        {/* HP */}
        <Flex type="column">
          <Texte
            size="middle"
            color="yellow"
            style={{ "align-self": "center" }}
          >
            {t("HP")}
          </Texte>
          <Flex vcenter>
            <Input
              ref={(el) => (hpRef1 = el)}
              center
              style={{ width: "2em" }}
              onChange={() => changeStat("hp", 0)}
            />
            /
            <Input
              center
              ref={(el) => (hpRef2 = el)}
              style={{ width: "2em" }}
              onChange={() => changeStat("hp", 1)}
            />
          </Flex>
        </Flex>
        {/* ARM */}
        <Flex type="column">
          <Texte
            size="middle"
            color="yellow"
            style={{ "align-self": "center" }}
          >
            {t("Armor")}
          </Texte>
          <Flex>
            <Input
              ref={(el) => (armorRef = el)}
              center
              style={{ width: "2em" }}
              onChange={() => changeStat("armor", 0)}
            />
          </Flex>
        </Flex>
        {/* DEP */}
        <Flex type="column" style={{ "align-self": "end" }}>
          <Switch>
            <Match when={editor?.editCharacter().deprived}>
              <Button
                style={{ "align-self": "end" }}
                color="filled"
                onClick={() => changeStat("deprived", 0)}
              >
                {t("Deprived")}
              </Button>
            </Match>
            <Match when={!editor?.editCharacter().deprived}>
              <Button
                style={{ "align-self": "end" }}
                onClick={() => changeStat("deprived", 1)}
              >
                {t("Deprived")}
              </Button>
            </Match>
          </Switch>
        </Flex>
        {/* SHARED */}
        <Flex type="column" style={{ "align-self": "end" }}>
          <Switch>
            <Match when={editor?.editCharacter().shared}>
              <Button
                style={{ "align-self": "end" }}
                color="filled"
                size="small"
                onClick={() => changeStat("shared", 0)}
              >
                {t("Shared")}
              </Button>
            </Match>
            <Match when={!editor?.editCharacter().shared}>
              <Button
                size="small"
                style={{ "align-self": "end" }}
                onClick={() => changeStat("shared", 1)}
              >
                {t("Shared")}
              </Button>
            </Match>
          </Switch>
        </Flex>
      </Flex>
    </Flex>
  );
};
