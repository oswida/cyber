import { useI18n } from "@solid-primitives/i18n";
import { fabric } from "fabric";
import {
  FaRegularCircle,
  FaRegularSquare,
  FaSolid1,
  FaSolid2,
  FaSolid3,
  FaSolid4,
  FaSolidArrowPointer,
  FaSolidEraser,
  FaSolidFileExport,
  FaSolidFileImport,
  FaSolidFont,
  FaSolidLinesLeaning,
  FaSolidPencil,
  FaSolidShareNodes,
  FaSolidTrash,
} from "solid-icons/fa";
import { Component, createEffect, createSignal } from "solid-js";
import {
  exportData,
  importData,
  inodDrawKey,
  loadDraw,
  mqttPublish,
  mqttTopic,
  notify,
  prettyToday,
  runtimeColors,
  saveGenericData,
  sessionData,
  topicDraw,
  useAppData,
} from "~/common";
import { Button } from "../Button";
import { Flex } from "../Flex";
import { clearCanvas, initCanvas } from "./canvas";
import { WhiteboardRootStyle, WhiteboardToolsStyle } from "./styles.css";
import { ColorSwitchButton, SizeSwitchButton, ToolSwitchButton } from "./Tools";

export const Whiteboard: Component = () => {
  let [canvas, setCanvas] = createSignal<fabric.Canvas>();
  let boardRoot: HTMLDivElement;

  const [t] = useI18n();
  const apd = useAppData();

  const keySupport = (e: any) => {
    const cnv = canvas();
    if (!cnv) return;
    const el = document.getElementById("whiteboardCanvas");
    if (!el) return;
    const style = window.getComputedStyle(el);
    console.log("key", style.visibility);
  };

  const save = (e: any) => {
    if (!apd) return;
    const cnv = canvas();
    if (!cnv) return;
    const draw = cnv.toJSON();
    saveGenericData(inodDrawKey, draw);
  };

  createEffect(() => {
    window.removeEventListener("keypress", keySupport);
    const cnv = initCanvas("whiteboardCanvas", 1920, 1080);
    setCanvas(cnv);
    const data = loadDraw();
    cnv.loadFromJSON(data, () => {});
    cnv.on("object:added", save);
    cnv.on("object:modified", save);
    cnv.on("object:removed", save);
    cnv.on("canvas:cleared", save);
    window.addEventListener("keypress", keySupport);
  });

  createEffect(() => {
    const data = apd?.drawCache();
    const cnv = canvas();
    if (!data || Object.keys(data).length == 0 || !cnv) return;
    cnv.loadFromJSON(data, () => {});
    saveGenericData(inodDrawKey, data);
  });

  const importImage = () => {
    importData(async (data: any) => {
      canvas()?.loadFromJSON(data, () => {});
    });
  };

  const exp = () => {
    const data = canvas()?.toJSON();
    const filename = `draw-${prettyToday()}.json`;
    exportData(data, filename);
  };

  const share = () => {
    if (!apd) return;
    const cl = apd.mqttClient();
    if (!cl) return;
    const cnv = canvas();
    if (!cnv) return;
    const draw = cnv.toJSON();
    mqttPublish(sessionData().browserID, cl, mqttTopic(topicDraw), draw);
    notify(apd, "Drawing published", 3000);
  };

  return (
    <Flex type="column">
      <div class={WhiteboardToolsStyle}>
        <Flex>
          <ToolSwitchButton canvas={canvas} tool="select" title={t("Select")}>
            <FaSolidArrowPointer />
          </ToolSwitchButton>
          <ToolSwitchButton canvas={canvas} tool="pencil">
            <FaSolidPencil title="Pencil" />
          </ToolSwitchButton>
          <ToolSwitchButton canvas={canvas} tool="line">
            <FaSolidLinesLeaning title="Line" />
          </ToolSwitchButton>
          <ToolSwitchButton canvas={canvas} tool="rect">
            <FaRegularSquare title="Rect" />
          </ToolSwitchButton>
          <ToolSwitchButton canvas={canvas} tool="circle">
            <FaRegularCircle title="Circle" />
          </ToolSwitchButton>
          <ToolSwitchButton canvas={canvas} tool="text">
            <FaSolidFont title="Text" />
          </ToolSwitchButton>
          <ToolSwitchButton canvas={canvas} tool="eraser">
            <FaSolidEraser title="Eraser" />
          </ToolSwitchButton>
          <Button
            onClick={() => clearCanvas(canvas())}
            style={{ "margin-left": "20px" }}
          >
            <FaSolidTrash title="Clear" />
          </Button>
        </Flex>

        <Flex>
          <ColorSwitchButton canvas={canvas} color="white" />
          <ColorSwitchButton canvas={canvas} color={runtimeColors.blue} />
          <ColorSwitchButton canvas={canvas} color={runtimeColors.yellow} />
          <ColorSwitchButton canvas={canvas} color={runtimeColors.green} />
          <ColorSwitchButton canvas={canvas} color={runtimeColors.pink} />
        </Flex>

        <Flex>
          <SizeSwitchButton canvas={canvas} index={0}>
            <FaSolid1 />
          </SizeSwitchButton>
          <SizeSwitchButton canvas={canvas} index={1}>
            <FaSolid2 />
          </SizeSwitchButton>
          <SizeSwitchButton canvas={canvas} index={2}>
            <FaSolid3 />
          </SizeSwitchButton>
          <SizeSwitchButton canvas={canvas} index={3}>
            <FaSolid4 />
          </SizeSwitchButton>
        </Flex>

        <Flex>
          <Button onClick={share} border="none" title={t("Share")}>
            <FaSolidShareNodes />
          </Button>
          <Button onClick={importImage} border="none" title={t("Import")}>
            <FaSolidFileImport />
          </Button>
          <Button onClick={exp} border="none" title={t("Export")}>
            <FaSolidFileExport />
          </Button>
        </Flex>
      </div>
      <div class={WhiteboardRootStyle} ref={(el) => (boardRoot = el)}>
        <canvas id="whiteboardCanvas" width={1920} height={1080} />
      </div>
    </Flex>
  );
};
