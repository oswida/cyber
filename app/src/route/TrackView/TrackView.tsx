import { useI18n } from "@solid-primitives/i18n";
import {
  FaSolidDeleteLeft,
  FaSolidFileExport,
  FaSolidFileImport,
  FaSolidPencil,
  FaSolidPlus,
  FaSolidTrash,
} from "solid-icons/fa";
import { Component, createMemo, createSignal, For } from "solid-js";
import {
  emptyTrackInfo,
  inodTrackKey,
  saveGenericData,
  TrackInfo,
  useAppData,
} from "~/common";
import { Button, Confirm, Flex, Input, Texte } from "~/component";
import { TrackViewRootStyle } from "./styles.css";
import { TrackItem } from "./TrackItem";
import { deleteTrack } from "~/actions";

export const TrackView: Component = () => {
  const apd = useAppData();
  const [t] = useI18n();
  const [filter, setFilter] = createSignal("");
  let filterRef: HTMLInputElement;
  const [confirm, setConfirm] = createSignal(false);

  const trackList = createMemo(() => {
    if (!apd) return [];
    return Object.values(apd.trackData());
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
    saveGenericData(apd, inodTrackKey, newState);
    //TODO: publish ?
  };

  const change = () => {
    // TODO
  };

  const edit = () => {};

  const deleteItem = () => {
    if (!apd) return;
    const item = apd.selectedTrack();
    if (!item) return;
    const newState = deleteTrack(apd, item);
    saveGenericData(apd, inodTrackKey, newState);
  };

  const clearFilter = () => {
    if (!filterRef) return;
    setFilter("");
    filterRef.value = "";
  };

  const confirmMessage = createMemo(() => {
    if (!apd) return "";
    return `${t("Really_delete_message")} ${apd.selectedTrack()?.name}?`;
  });

  const exportTracks = () => {};

  const importTracks = () => {};

  return (
    <Flex center type="column">
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
          title={t("Delete_selected")}
          style={{ "margin-left": "15px" }}
          onClick={() => setConfirm(true)}
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
