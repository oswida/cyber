import { useI18n } from "@solid-primitives/i18n";
import {
  FaSolidCopy,
  FaSolidDeleteLeft,
  FaSolidFileExport,
  FaSolidFileImport,
  FaSolidPlus,
  FaSolidTrash,
} from "solid-icons/fa";
import { Component, createMemo, createSignal, For } from "solid-js";
import { deleteTrack } from "~/actions";
import {
  emptyTrackInfo,
  exportData,
  importData,
  inodTrackKey,
  prettyToday,
  saveGenericData,
  TrackInfo,
  useAppData,
} from "~/common";
import { Button, Confirm, Flex, Input, Texte } from "~/component";
import { TrackViewRootStyle } from "./styles.css";
import { TrackItem } from "./TrackItem";
import { v4 as uuidv4 } from "uuid";

export const TrackView: Component = () => {
  const apd = useAppData();
  const [t] = useI18n();
  const [filter, setFilter] = createSignal("");
  let filterRef: HTMLInputElement;
  const [confirm, setConfirm] = createSignal(false);

  const trackList = createMemo(() => {
    if (!apd) return [];
    return Object.values(apd.trackData()).filter(
      (it) =>
        filter().trim() === "" ||
        it.name.toLowerCase().includes(filter().toLowerCase())
    );
  });

  const selectTrack = (it: TrackInfo) => {
    if (!apd) return;
    apd.setSelectedTrack(it);
  };

  const add = () => {
    if (!apd) return;
    const item = emptyTrackInfo(true);
    const newState = { ...apd.trackData(), [item.id]: item };

    apd.setTrackData(newState);
    saveGenericData(inodTrackKey, newState);
  };

  const deleteItem = () => {
    if (!apd) return;
    const item = apd.selectedTrack();
    if (!item || item.id.trim() === "") return;
    const newState = deleteTrack(apd, item);
    saveGenericData(inodTrackKey, newState);
    apd.setSelectedTrack(emptyTrackInfo());
  };

  const copy = () => {
    if (!apd) return;
    const item = apd.selectedTrack();
    if (!item || item.id.trim() === "") return;
    const newEntry = { ...item, id: uuidv4() };
    const newState = { ...apd.trackData(), [newEntry.id]: newEntry };
    apd.setTrackData(newState);
    saveGenericData(inodTrackKey, newState);
  };

  const clearFilter = () => {
    if (!filterRef) return;
    setFilter("");
    filterRef.value = "";
  };

  const confirmDelete = () => {
    if (!apd) return;
    const item = apd.selectedTrack();
    if (!item || item.id.trim() === "") return;
    setConfirm(true);
  };

  const confirmMessage = createMemo(() => {
    if (!apd) return "";
    return `${t("Really_delete_track")} ${apd.selectedTrack()?.name}?`;
  });

  const exportTracks = () => {
    const filename = `trackers-${prettyToday()}.json`;
    exportData(apd?.trackData(), filename);
  };

  const importTracks = () => {
    importData((data: any) => {
      apd?.setTrackData(data);
    });
  };

  return (
    <Flex center type="column">
      <Flex style={{ width: "95%" }}>
        <Button title={t("Add")} onClick={add}>
          <FaSolidPlus />
        </Button>
        <Input
          onInput={() => setFilter(filterRef.value)}
          underline="blue"
          style={{ flex: 1 }}
          ref={(el) => (filterRef = el)}
        />
        <Button title={t("Clear")} onClick={clearFilter}>
          <FaSolidDeleteLeft />
        </Button>

        <Button
          title={t("Copy")}
          style={{ "margin-left": "15px" }}
          onClick={copy}
        >
          <FaSolidCopy />
        </Button>

        <Button
          title={t("Delete_selected")}
          style={{ "margin-left": "15px" }}
          onClick={confirmDelete}
        >
          <FaSolidTrash />
        </Button>
        <Button
          title={t("Export")}
          style={{ "margin-left": "15px" }}
          onClick={exportTracks}
        >
          <FaSolidFileExport />
        </Button>
        <Button title={t("Import")} onClick={importTracks}>
          <FaSolidFileImport />
        </Button>
      </Flex>
      <div class={TrackViewRootStyle}>
        <For each={trackList()}>
          {(it) => <TrackItem item={it} onClick={() => selectTrack(it)} />}
        </For>
      </div>
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
