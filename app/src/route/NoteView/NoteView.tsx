import { useI18n } from "@solid-primitives/i18n";
import {
  FaSolidDeleteLeft,
  FaSolidFileExport,
  FaSolidFileImport,
  FaSolidPencil,
  FaSolidPlus,
  FaSolidTrash,
} from "solid-icons/fa";
import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  Show,
} from "solid-js";
import { createNote, deleteNote } from "~/actions/note";
import {
  inodBoardKey,
  inodNotesKey,
  NoteInfo,
  saveGenericData,
  useAppData,
} from "~/common";
import { Button, Confirm, Flex, Input, TextArea, Texte } from "~/component";
import { NoteEdit } from "./NoteEdit";
import { NoteListItem } from "./NoteListItem";
import { ListRootStyle, PreviewRootStyle } from "./styles.css";

type Props = {
  isShared: boolean;
};

export const NoteView: Component<Props> = ({ isShared }) => {
  const [dialogOpen, setDialogOpen] = createSignal(false);
  const [filter, setFilter] = createSignal("");
  const [t] = useI18n();
  const [editItem, setEditItem] = createSignal<NoteInfo>();
  let filterRef: HTMLInputElement;
  const [confirm, setConfirm] = createSignal(false);
  const apd = useAppData();

  createEffect(() => {
    if (!apd) return;
    if (Object.values(apd.noteData()).length > 0) {
      apd.setSelectedNote(Object.values(apd.noteData())[0]);
    }
  });

  const selectNote = (it: NoteInfo) => {
    if (!apd) return;
    apd.setSelectedNote(it);
  };

  const change = (b: any) => {
    setFilter(b.target.value);
  };

  const clearFilter = () => {
    if (!filterRef) return;
    setFilter("");
    filterRef.value = "";
  };

  const add = () => {
    const note = createNote(apd);
    setEditItem(note);
    setDialogOpen(true);
  };

  const edit = () => {
    if (!apd) return;
    const item = apd.selectedNote();
    if (!item) return;
    setEditItem(item);
    setDialogOpen(true);
  };

  const deleteItem = () => {
    if (!apd) return;
    const item = apd.selectedNote();
    if (!item) return;
    const newState = deleteNote(apd, item);
    if (isShared) saveGenericData(apd, inodBoardKey, newState);
    else saveGenericData(apd, inodNotesKey, newState);
  };

  const confirmMessage = createMemo(() => {
    if (!apd) return "";
    return `${t("Really_delete_message")} ${apd.selectedNote()?.title}?`;
  });

  const previewData = createMemo(() => {
    if (!apd) return "";
    return apd.selectedNote()?.content;
  });

  const noteList = createMemo(() => {
    if (!apd) return [];
    return Object.values(isShared ? apd.boardData() : apd.noteData())
      .filter((it) => filter() === "" || it.title.includes(filter()))
      .sort((a, b) => a.title.localeCompare(b.title));
  });

  const exportNotes = () => {};

  const importNotes = () => {};

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
          onClick={() => setConfirm(true)}
        >
          <FaSolidTrash />
        </Button>
        <Button
          title={t("Export")}
          style={{ "margin-left": "15px" }}
          onClick={exportNotes}
        >
          <FaSolidFileExport />
        </Button>
        <Button title={t("Import")} onClick={importNotes}>
          <FaSolidFileImport />
        </Button>
      </Flex>
      <div class={ListRootStyle}>
        <For each={noteList()}>
          {(it) => <NoteListItem item={it} onClick={() => selectNote(it)} />}
        </For>
      </div>
      <div class={PreviewRootStyle}>
        <Show when={apd?.selectedNote()}>
          <TextArea
            contentEditable={false}
            border="none"
            style={{
              flex: 1,
              "white-space": "pre-wrap",
              "background-color": "transparent",
            }}
          >
            {previewData}
          </TextArea>
        </Show>
      </div>
      <NoteEdit
        isShared={isShared}
        open={dialogOpen}
        setOpen={setDialogOpen}
        item={editItem}
      />
      <Confirm
        title={t("Delete_item")}
        open={confirm}
        setOpen={setConfirm}
        accept={deleteItem}
      >
        <Texte>{confirmMessage}</Texte>
      </Confirm>
    </Flex>
  );
};
