import { useI18n } from "@solid-primitives/i18n";
import { createSign } from "crypto";
import {
  FaSolidPlus,
  FaSolidDeleteLeft,
  FaSolidPencil,
  FaSolidTrash,
  FaSolidFileExport,
  FaSolidFileImport,
} from "solid-icons/fa";
import { createMemo, createSignal, For, Show } from "solid-js";
import { newCharacter } from "~/actions/character";
import {
  exportData,
  importData,
  inodPlayersKey,
  prettyToday,
  saveGenericData,
  useAppData,
  useEditCharacter,
} from "~/common";
import { Flex, Button, Input, Confirm, Texte } from "~/component";
import { CharEdit } from "./CharEdit";
import { CharListItem } from "./CharListItem";
import { ListRootStyle } from "./styles.css";
import { SubEdit } from "./SubEdit";

export const CharView = () => {
  const [charDlgOpen, setCharDlgOpen] = createSignal(false);
  const [filter, setFilter] = createSignal("");
  const [t] = useI18n();
  const editor = useEditCharacter();
  const apd = useAppData();

  let filterRef: HTMLInputElement;
  const [confirm, setConfirm] = createSignal(false);

  const add = () => {
    const c = newCharacter(true);
    editor?.setEditCharacter(c);
    setCharDlgOpen(true);
  };

  const edit = () => {
    if (!apd) return;
    const c = apd.selectedChar();
    if (!c || !editor || c.id.trim() === "") return;
    editor.setEditCharacter({ ...c });
    setCharDlgOpen(true);
  };

  const change = (b: any) => {
    setFilter(b.target.value);
  };

  const clearFilter = () => {
    if (!filterRef) return;
    setFilter("");
    filterRef.value = "";
  };

  const confirmMessage = createMemo(
    () => `${t("Really_delete_character")} ${apd?.selectedChar()?.name}?`
  );

  const deleteItem = () => {
    if (!apd) return;
    const item = apd.selectedChar();
    if (!item || item.id === "") return;
    const newState = { ...apd.charData, [item.id]: undefined };
    saveGenericData(inodPlayersKey, newState);
    apd.setCharData(newState);
  };

  const characters = createMemo(() => {
    if (!apd) return [];
    return Object.values(apd.charData);
  });

  const exportChars = () => {
    const filename = `characters-${prettyToday()}.json`;
    exportData(apd?.charData, filename);
  };

  const importChar = () => {
    importData((data: any) => {
      apd?.setCharData(data);
      // TODO: publish
      // if (sessionData.hosting) {
      //   publish(nats.connection, topicChars, [Object.values(data)]);
      // }
    });
  };

  return (
    <Flex
      type="column"
      center
      style={{
        width: "100%",
        height: "calc(100vh - 100px)",
        "margin-top": "10px",
      }}
    >
      <Flex style={{ width: "95%" }}>
        <Button title={t("Add")} onClick={add}>
          <FaSolidPlus />
        </Button>
        <Input
          onInput={change}
          underline="blue"
          style={{ flex: 1 }}
          ref={(el) => (filterRef = el)}
        />
        <Button title={t("Clear")} onClick={clearFilter}>
          <FaSolidDeleteLeft />
        </Button>

        <Button
          title={t("Edit")}
          style={{ "margin-left": "15px" }}
          onClick={edit}
        >
          <FaSolidPencil />
        </Button>
        <Button
          title={t("Delete_selected")}
          style={{ "margin-left": "15px" }}
          onClick={() => {
            if (apd?.selectedChar().id !== "") setConfirm(true);
          }}
        >
          <FaSolidTrash />
        </Button>
        <Button
          title={t("Export")}
          style={{ "margin-left": "15px" }}
          onClick={exportChars}
        >
          <FaSolidFileExport />
        </Button>
        <Button title={t("Import")} onClick={importChar}>
          <FaSolidFileImport />
        </Button>
      </Flex>
      <div class={ListRootStyle}>
        <For
          each={characters()
            .filter((it) => filter() === "" || it.name.includes(filter()))
            .sort((a, b) => a.name.localeCompare(b.name))}
        >
          {(it) => <CharListItem id={it.id} />}
        </For>
      </div>
      <CharEdit setOpen={setCharDlgOpen} open={charDlgOpen} />
      <Show when={apd?.subeditOpen() !== ""}>
        <SubEdit />
      </Show>
      <Confirm
        title={t("Delete_character")}
        open={confirm}
        setOpen={setConfirm}
        accept={deleteItem}
      >
        <Texte>{confirmMessage}</Texte>
      </Confirm>
    </Flex>
  );
};
