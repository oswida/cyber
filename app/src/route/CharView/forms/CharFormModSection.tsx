import { useI18n } from "@solid-primitives/i18n";
import {
  FaSolidBoltLightning,
  FaSolidGears,
  FaSolidMinus,
  FaSolidPlay,
  FaSolidPlus,
  FaSolidRotate,
} from "solid-icons/fa";
import { createSignal, For, Match, Show, Switch } from "solid-js";
import { newCharMod } from "~/actions/character";
import { runtimeColors, useEditCharacter } from "~/common";
import { Button, Flex, Input, Texte } from "~/component";
import { SelectableItemStyle } from "../styles.css";

export const CharFormModSection = ({ isDeck }: { isDeck: boolean }) => {
  const [t] = useI18n();
  const editor = useEditCharacter();
  const [sel, setSel] = createSignal(-1);

  const add = () => {
    if (isDeck)
      editor?.setEditCharacter((prev) => ({
        ...prev,
        cyberdeck: [...prev.cyberdeck, newCharMod()],
      }));
    else
      editor?.setEditCharacter((prev) => ({
        ...prev,
        cybermods: [...prev.cybermods, newCharMod()],
      }));
  };

  const del = () => {
    const s = sel();
    if (s < 0) return;
    editor?.setEditCharacter((prev) => {
      if (isDeck) {
        const t = [...prev.cyberdeck];
        t.splice(s, 1);
        return { ...prev, cyberdeck: [...t] };
      } else {
        const t = [...prev.cybermods];
        t.splice(s, 1);
        return { ...prev, cybermods: [...t] };
      }
    });
  };

  const changeName = (ev: any) => {
    const s = sel();
    if (s < 0) return;
    const data = ev.target.value;
    editor?.setEditCharacter((prev) => {
      if (isDeck) {
        const t = prev.cyberdeck;
        t[s] = { ...t[s], name: data };
        return { ...prev, cyberdeck: [...t] };
      } else {
        const t = prev.cybermods;
        t[s] = { ...t[s], name: data };
        return { ...prev, cybermods: [...t] };
      }
    });
  };

  const changeDesc = (ev: any) => {
    const s = sel();
    if (s < 0) return;
    const data = ev.target.value;
    editor?.setEditCharacter((prev) => {
      if (isDeck) {
        const t = prev.cyberdeck;
        t[s] = { ...t[s], description: data };
        return { ...prev, cyberdeck: [...t] };
      } else {
        const t = prev.cybermods;
        t[s] = { ...t[s], description: data };
        return { ...prev, cybermods: [...t] };
      }
    });
  };

  const toggleNeedActivation = (index: number, value: boolean) => {
    editor?.setEditCharacter((prev) => {
      if (isDeck) {
        const t = [...prev.cyberdeck];
        t[index] = { ...t[index], need_activation: value };
        return { ...prev, cyberdeck: [...t] };
      } else {
        const t = [...prev.cybermods];
        t[index] = { ...t[index], need_activation: value };
        return { ...prev, cybermods: [...t] };
      }
    });
  };

  const toggleActivated = (index: number, value: boolean) => {
    //TODO: compute
    const ec = editor?.editCharacter();
    if (!ec) return;
    let firstFreeSlot = -1;
    for (let i = 0; i < ec.inventory.length; i++) {
      if (ec.inventory[i].fatigue === false) {
        firstFreeSlot = i;
        break;
      }
    }
    const freeSlots = ec.inventory.filter((it) => it.fatigue === false);
    if (firstFreeSlot < 0 && value === true) {
      alert(
        "Cyberware overuse! Cannot activate mod or program because character does not have free inventory slots."
      );
      return;
    }
    let overuse = false;
    if (freeSlots?.length === 1 && value === true) {
      alert(
        "Marking last inventory slot requires reducing PSY ability because of cyberware overuse."
      );
      overuse = true;
    }

    editor?.setEditCharacter((prev) => {
      const reduced = prev.psy[0] > 0 ? prev.psy[0] - 1 : 0;
      const inv = [...prev.inventory];
      if (value === true)
        inv[firstFreeSlot] = { ...inv[firstFreeSlot], fatigue: true };

      if (isDeck) {
        const t = [...prev.cyberdeck];
        t[index] = { ...t[index], activated: value };
        if (overuse === true) {
          return {
            ...prev,
            cyberdeck: [...t],
            psy: [reduced, prev.psy[1]],
            inventory: [...inv],
          };
        } else {
          return { ...prev, cyberdeck: [...t], inventory: [...inv] };
        }
      } else {
        const t = [...prev.cybermods];
        t[index] = { ...t[index], activated: value };
        if (overuse === true) {
          return {
            ...prev,
            cybermods: [...t],
            psy: [reduced, prev.psy[1]],
            inventory: [...inv],
          };
        } else {
          return { ...prev, cybermods: [...t], inventory: [...inv] };
        }
      }
    });
  };

  return (
    <Flex type="column" center style={{ width: "90%", "align-self": "center" }}>
      <Flex vcenter style={{ "margin-bottom": "10px" }}>
        <Button border="underline" onClick={del}>
          <FaSolidMinus />
        </Button>
        <Texte color="yellow" size="middle">
          {isDeck ? `${t("Cyberdeck")} (` : `${t("Cybermods")} (`}
          {editor &&
            (isDeck
              ? Object.keys(editor.editCharacter().cyberdeck).length
              : Object.keys(editor.editCharacter().cybermods).length)}
          {")"}
        </Texte>
        <Button border="underline" onClick={add}>
          <FaSolidPlus />
        </Button>
      </Flex>
      <Flex
        type="column"
        style={{
          width: "70%",
          "align-self": "center",
          "min-width": "350px",
          "max-height": "calc(100vh - 300px)",
          overflow: "auto",
        }}
      >
        <For
          each={
            isDeck
              ? editor?.editCharacter().cyberdeck
              : editor?.editCharacter().cybermods
          }
        >
          {(it, idx) => (
            <Flex vcenter>
              <div
                onClick={() => setSel(idx())}
                style={{ "flex-wrap": "wrap" }}
                class={SelectableItemStyle({ selected: sel() === idx() })}
              >
                <Flex style={{ width: "100%" }}>
                  <Input
                    onBlur={changeName}
                    middle
                    style={{ "background-color": "transparent", width: "100%" }}
                    underline="blue"
                    value={it.name}
                  />

                  <Switch>
                    <Match when={it.need_activation === true}>
                      <Button
                        onClick={() => toggleNeedActivation(idx(), false)}
                        border="none"
                      >
                        <FaSolidGears
                          style={{
                            cursor: "pointer",
                            fill: runtimeColors.pink,
                          }}
                        />
                      </Button>
                    </Match>
                    <Match when={it.need_activation === false}>
                      <Button
                        border="none"
                        onClick={() => toggleNeedActivation(idx(), true)}
                      >
                        <FaSolidRotate
                          style={{
                            cursor: "pointer",
                            fill: runtimeColors.green,
                          }}
                        />
                      </Button>
                    </Match>
                  </Switch>
                </Flex>

                <Flex style={{ width: "100%" }}>
                  <Input
                    onBlur={changeDesc}
                    middle
                    style={{ "background-color": "transparent", width: "100%" }}
                    underline="blue"
                    value={it.description}
                  />
                  <Show when={it.need_activation === true}>
                    <Switch>
                      <Match when={it.activated === true}>
                        <Button
                          border="none"
                          onClick={() => toggleActivated(idx(), false)}
                        >
                          <FaSolidBoltLightning
                            style={{
                              cursor: "pointer",
                              fill: runtimeColors.pink,
                            }}
                          />
                        </Button>
                      </Match>
                      <Match when={it.activated === false}>
                        <Button
                          border="none"
                          onClick={() => toggleActivated(idx(), true)}
                        >
                          <FaSolidPlay
                            style={{
                              cursor: "pointer",
                              fill: runtimeColors.green,
                            }}
                          />
                        </Button>
                      </Match>
                    </Switch>
                  </Show>
                </Flex>
              </div>
            </Flex>
          )}
        </For>
      </Flex>
    </Flex>
  );
};
