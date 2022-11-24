import { useI18n } from "@solid-primitives/i18n";
import {
  FaSolidLock,
  FaSolidLockOpen,
  FaSolidMinus,
  FaSolidPlus,
} from "solid-icons/fa";
import { createSignal, For, Match, Switch } from "solid-js";
import { runtimeColors, useEditCharacter } from "~/common";
import { Button, Flex, Input, Texte } from "~/component";
import { SelectableItemStyle } from "../styles.css";

export const CharFormInventorySection = () => {
  const [selInv, setSelInv] = createSignal(-1);
  const [t] = useI18n();
  const editor = useEditCharacter();

  const add = () => {
    if (!editor) return;
    editor?.setEditCharacter((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        inventory: [
          ...prev.inventory,
          { description: "new item", fatigue: false },
        ],
      };
    });
  };

  const del = () => {
    const sel = selInv();
    if (sel < 0) return;
    editor?.setEditCharacter((prev) => {
      if (!prev) return prev;
      const inv = [...prev.inventory];
      inv.splice(sel, 1);
      return { ...prev, inventory: inv };
    });
  };

  const change = (ev: any) => {
    const sel = selInv();
    if (sel < 0) return;
    const data = ev.target.value;
    console.log("setting ", data, "on ", sel);

    editor?.setEditCharacter((prev) => {
      if (!prev) return prev;
      const inv = [...prev.inventory];
      inv[sel] = { ...inv[sel], description: data };
      return { ...prev, inventory: [...inv] };
    });
  };

  const lock = (index: number, value: boolean) => {
    editor?.setEditCharacter((prev) => {
      if (!prev) return prev;
      const inv = [...prev.inventory];
      inv[index] = { ...inv[index], fatigue: value };
      return { ...prev, inventory: [...inv] };
    });
  };

  return (
    <Flex type="column" center style={{ width: "90%", "align-self": "center" }}>
      <Flex vcenter style={{ "margin-bottom": "10px" }}>
        <Button border="underline" onClick={del}>
          <FaSolidMinus />
        </Button>
        <Texte color="yellow" size="middle">
          {`${t("Inventory")} (`}
          {editor?.editCharacter()?.inventory.length}
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
          "min-width": "350px",
          "align-self": "center",
          "max-height": "calc(100vh - 300px)",
          overflow: "auto",
        }}
      >
        <For each={editor?.editCharacter()?.inventory}>
          {(it, idx) => (
            <Flex vcenter>
              <div
                onClick={() => setSelInv(idx())}
                class={SelectableItemStyle({ selected: selInv() === idx() })}
              >
                <Input
                  onChange={change}
                  middle
                  style={{ "background-color": "transparent", width: "100%" }}
                  underline="blue"
                  value={it.description}
                />

                <Switch>
                  <Match when={it.fatigue === true}>
                    <Button onClick={() => lock(idx(), false)} border="none">
                      <FaSolidLock
                        style={{
                          cursor: "pointer",
                          fill: runtimeColors.pink,
                        }}
                      />
                    </Button>
                  </Match>
                  <Match when={it.fatigue === false}>
                    <Button onClick={() => lock(idx(), true)} border="none">
                      <FaSolidLockOpen
                        style={{
                          cursor: "pointer",
                        }}
                      />
                    </Button>
                  </Match>
                </Switch>
              </div>
            </Flex>
          )}
        </For>
      </Flex>
    </Flex>
  );
};
